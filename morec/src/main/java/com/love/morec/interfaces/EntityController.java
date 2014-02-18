package com.love.morec.interfaces;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.love.morec.application.channel.ChannelService;
import com.love.morec.application.entity.EntityCommentService;
import com.love.morec.application.entity.EntityDescService;
import com.love.morec.application.entity.EntityService;
import com.love.morec.domain.channel.Channel;
import com.love.morec.domain.channel.ChannelTree;
import com.love.morec.domain.entity.Entity;
import com.love.morec.domain.entity.EntityComment;
import com.love.morec.domain.entity.EntityDesc;
import com.love.morec.domain.entity.MoreLikeThis;
import com.love.morec.domain.entity.Tag;
import com.love.morec.infrastruture.util.AnchorTextUtil;
import com.love.morec.infrastruture.util.ShortLinkUtils;
import com.loveme.core.orm.Page;
import com.loveme.core.web.AjaxUtils;
import com.loveme.core.web.controller.CrudControllerSupport;
import com.loveme.core.web.exception.ResourceNotFoundException;
import com.loveme.util.EntityUtils;

@Controller
public class EntityController extends CrudControllerSupport<String, Entity> {
	
	Logger log = LoggerFactory.getLogger(EntityController.class);
	private static final String REDIRECT_LIST = "redirect:/entity/list";
	private static final int anchorTextsNumber = 3;

	@Autowired
	private EntityService entityService;
	@Autowired
	private EntityCommentService entityCommentService;
	@Autowired
	private EntityDescService entityDescService;
	@Autowired
	private ChannelService channelService;

	@RequestMapping(value = {"/show/{id}.html","/show/{id}"}, method = RequestMethod.GET)
	public String show(@PathVariable("id") String id, Model model) {
		return showHtml(id, model);
	}

	@RequestMapping(value = "/{id}.html", method = RequestMethod.GET)
	public String showHtml(@PathVariable("id") String id, Model model) {
		
		MoreLikeThis moreLikeThis = entityService.queryMoreLikeThis(id);
		Entity entity = moreLikeThis.getMatchAsSingle();
		if (null == entity) {
			throw new ResourceNotFoundException();
		}
		EntityDesc entityDesc=entityDescService.get(entity.getProductid());
		
		Channel channel = channelService.queryUniqueByName(entity.getClassify());

		List<Entity> samePrice = new ArrayList<Entity>();
		if (channel!= null) {
			samePrice = entityService.samePrice(entity.getPrice(), channel.getName());
		}else{
			samePrice = entityService.samePrice(entity.getPrice(), "*:*");
		}
		List<Channel> brotherChannels=channelService.queryBrotherChannels(channel.getFather().getId());
		
		Page<EntityComment> commentPage=new Page<EntityComment>();
		commentPage=getEntityCommentPage(entity,commentPage);
		
		//List<Channel> channels = channelService.queryTop();		
		//createAnchorsIfNeccessary(channel,entity);
		//Neighbour neighbour = entityService.queryNeighbour(entity);
		//model.addAttribute("neighbour", neighbour).addAttribute("channels", channels)
		//
		
		model.addAttribute("entity", entity).addAttribute("entityDesc", entityDesc)
				.addAttribute("channel",channel)				
				.addAttribute("samePriceEntities", samePrice)
				.addAttribute("brotherChannels", brotherChannels)
				.addAttribute("moreLikeThis", moreLikeThis.getMoreLikeThis())
				.addAttribute("commentPage", commentPage);
		return "WEB-INF/front/template/entity";
	}
	
	private Page<EntityComment> getEntityCommentPage(Entity entity,Page<EntityComment> commentPage) {
		commentPage.setPageSize(30).setPageNo(0);
		String queryString=String.format("entityId:%s",entity.getId());
		commentPage=entityCommentService.queryPage(queryString, commentPage);
		return commentPage;
	}

	private void createAnchorsIfNeccessary(Channel channel, Entity entity) {
		
		if(null == channel || StringUtils.isBlank(channel.getAnchorText())){
			return;
		}
		Map<String, String> anchorTextAndLink = new HashMap<String,String>();
		if(StringUtils.isNotBlank(entity.getDescr())){
			List<String> anchorTexts = Arrays.asList(channel.getAnchorText().split(";"));
			List<Integer> indexs = AnchorTextUtil.getIndexs(anchorTexts,entity.getDescr());
			if(indexs.size()>anchorTextsNumber){
				indexs = AnchorTextUtil.chooseAnchorText(indexs,entity);//筛选关键词
			}
			for(int index=0;index<indexs.size();index++){
				Entity linkEntity = entityService.similarTitle(anchorTexts.get(indexs.get(index)), entity);
				String link = "";
				if(linkEntity!=null){
					link = linkEntity.getId();
					anchorTextAndLink.put(anchorTexts.get(indexs.get(index)), link);
					//entity.setDescr(AnchorTextUtil.addATag(entity.getDescr(), anchorTexts.get(indexs.get(index)), link));
				}
			}
			entity.setProps(AnchorTextUtil.addAnchorTextLink(entity.getProps(), anchorTextAndLink));
		}
	}
	
	

	/**
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/show/{id}/tags", method = RequestMethod.GET)
	@ResponseBody
	public List<Tag> showTags(@PathVariable("id") String id,
			@RequestHeader("X-Requested-With") String requestWith) {
		if (!AjaxUtils.isAjaxRequest(requestWith)) {
			return null;
		}

		Entity entity = entityService.get(id);
		return entityService.queryTags(entity);
	}

	/**
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/go/{id}", method = RequestMethod.GET)
	public String go(@PathVariable("id") String id) {

		Entity entity = entityService.get(id);
		if (null == entity) {
			throw new ResourceNotFoundException();
		}

		return String.format("redirect:%s", entity.getLoc());
	}

	/**
	 * 编辑
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "entity/{id}/edit", method = RequestMethod.GET)
	public String edit(@PathVariable("id") String id, Model model) {
		Entity entity = entityService.get(id);
		model.addAttribute(entity).addAttribute("_method", "PUT");
		return formView();
	}

	/**
	 * 编辑提交
	 * @param id
	 * @param request
	 * @return
	 */
	@Override
	@RequestMapping(value = "entity/{id}/edit", method = RequestMethod.PUT)
	public String edit(@PathVariable("id") String id, HttpServletRequest request) {
		try {
			Entity entity=entityService.get(id);
			bind(request, entity);
			entityService.save(entity);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return REDIRECT_LIST;
	}
	
	@Override
	public String delete(@PathVariable("id") String id) {
      return null;
	}
	
	/*删除数据
	 * (non-Javadoc)
	 * 
	 * @see com.loveme.core.web.controller.CrudControllerSupport#delete(javax.servlet.http.HttpServletRequest)
	 */
	@Override
	@RequestMapping(value = "entity/delete", method = RequestMethod.DELETE)
	public String delete(HttpServletRequest request) {
		String[] items = EntityUtils.nullSafe(
				request.getParameterValues("items"), new String[] {});
		try{
		   for (String item : items) {
				entityService.delete(item);
		    }
		}
		catch(Exception exception)
		{
			exception.printStackTrace();
			return REDIRECT_LIST;
		}
		return REDIRECT_LIST;
	}
	
	@RequestMapping(value = "entity/list", method = RequestMethod.GET)
	public String list(Page<Entity> page, HttpServletRequest request, Model model) {
		String path = request.getParameter("path");
		String searchText = request.getParameter("q");
		String filed = request.getParameter("filed");
		String tages = null;
		if ("".equals(path) || null == path) {
			if ("".equals(searchText) || null == searchText) {
				tages = "*:*";
				page = entityService.queryPage(tages, page);
			} else {
				tages = searchText;
				page = entityService.queryPage(String.format(filed + ":%s",tages), page);
			}
		} else {
			Channel channel = channelService.queryUniqueByPath(path);
			if (null == channel) {
				throw new ResourceNotFoundException();
			}
			tages = channel.getTags();
			page = entityService.queryPage(String.format("classify:%s", tages),page);
		}

		model.addAttribute(page);
		return listView();
	}
	
	@RequestMapping(value = "entity/centre", method = RequestMethod.GET)
	public String centre() {
		return "entity/centre";
	}
	
	@Override
	@RequestMapping(value = "entity/create", method = RequestMethod.GET)
	public String create(Model model) {
		model.addAttribute(new Entity());
		return formView();
	}
	
	@Override
	@RequestMapping(value = "entity/create", method = RequestMethod.PUT)
	public String create(Entity entity, BindingResult result) {
		if (result.hasErrors()) {
			return null;
		}
		Long lo=System.currentTimeMillis();
		entity.setId(ShortLinkUtils.shortUrl(entity.getLoc())[0]);
		entity.setIdAsHash(entityService.hash(entity.getId()));
		entity.setTags(entityService.analyzeTitle(entity.getTitle()));
		entity.setCreateTime(lo);
		entityService.save(entity);
		return REDIRECT_LIST;
	}
	
	@RequestMapping(value = "entity/left", method = RequestMethod.GET)
	public String left(Model model) {
		return "entity/left";
	}

	@Override
	protected String getViewPackage() {
		return "entity";
	}
	/**
	 * 
	 * @param model
	 * @return
	 */
	
	@RequestMapping(value = "entity/tree", method = RequestMethod.GET)
	@ResponseBody
	public List<ChannelTree> channelTree(Model model) {
		List<Channel> channels = channelService.queryChannels();
		List<ChannelTree> channelTrees = new ArrayList<ChannelTree>();
		for(Channel channel:channels){
			ChannelTree channelTree = new ChannelTree();
			if(channel.getFather()==null){
				channelTree.setFatherId(0);
			}else{
				channelTree.setFatherId(Integer.parseInt(channel.getFather().getId()));
			}
			channelTree.setClickUrl("list?path="+channel.getPath()+"&q=");
			channelTree.setId(Integer.parseInt(channel.getId()));
			channelTree.setName(channel.getName());
			channelTrees.add(channelTree);
		}
		return channelTrees;
	}

	
}

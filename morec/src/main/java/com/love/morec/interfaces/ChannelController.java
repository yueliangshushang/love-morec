package com.love.morec.interfaces;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.love.morec.application.channel.ChannelService;
import com.love.morec.application.entity.EntityService;
import com.love.morec.application.template.TemplateService;
import com.love.morec.domain.Configure;
import com.love.morec.domain.channel.Channel;
import com.love.morec.domain.channel.ChannelFacetQuery;
import com.love.morec.domain.channel.ChannelQuery;
import com.love.morec.domain.channel.ChannelTree;
import com.love.morec.domain.entity.Entity;
import com.love.morec.interfaces.exception.BadRequestException;
import com.love.morec.interfaces.exception.QueryAlarmException;
import com.loveme.core.orm.Page;
import com.loveme.core.web.controller.CrudControllerSupport;
import com.loveme.core.web.exception.ResourceNotFoundException;
import com.loveme.util.EntityUtils;
import com.loveme.util.FileUtils;
import com.loveme.util.SensitiveWordFilter;

@Controller
@RequestMapping("/channel")
public class ChannelController extends CrudControllerSupport<String, Channel> implements InitializingBean {

	private static final String REDIRECT_LIST = "redirect:/channel/0/list";
	private static final int MAX_PAGE_NO = 2000;
	@Autowired
	private ChannelService channelService;
	@Autowired
	private EntityService entityService;
	@Autowired
	private TemplateService templateService;
	
	private final List<String> queryAlarmWords = Arrays.asList(new String[] {
			"idAsHash", "randomRegion", "price",
			"asc", "desc", "createTime"
		}
	);
	private final SensitiveWordFilter queryAlarmFilter = new SensitiveWordFilter() {
		@Override
		protected boolean beforeFilter(String text, String replacement) {
			if (StringUtils.isBlank(text)) {
				throw new QueryAlarmException();
			}
			if (text.length() > 16) {
				throw new QueryAlarmException();
			}
			
			return true;
		}
		
		/*
		 * (non-Javadoc)
		 * 
		 * @see com.loveme.util.SensitiveWordFilter#afterFilter(java.util.List, java.lang.String, java.lang.String)
		 */
		@Override
		protected void afterFilter(List<String> hitWords, String text, String replacement) {
			if (hitWords.size() != 1) {
				throw new QueryAlarmException();
			}
		}
	};


	@RequestMapping(value = "/{path}", method = RequestMethod.GET)
	public String view(@PathVariable("path") String path, Model model) {
		return view(path, 1, model);
	}
	@RequestMapping(value = "/{path}/page/{pageNo}", method = RequestMethod.GET)
	public String view(@PathVariable("path") String path, @PathVariable("pageNo") int pageNo, Model model) {
		return view(path, pageNo, "randomRegion", "asc", model);
	}

	/**
	 * 栏目前端页面的具体控制方法
	 * @param path
	 * @param pageNo
	 * @param orderBy
	 * @param order
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/{path}/page/{pageNo}/{orderBy}/{order}", method = RequestMethod.GET)
	public String view(@PathVariable("path") String path, @PathVariable("pageNo") int pageNo,
						@PathVariable("orderBy") String orderBy, @PathVariable("order") String order,
						Model model) {
		List<Channel> channels = channelService.queryTop();
		Channel channel = channelService.queryUniqueByPath(path);
		if (null == channel) {
			throw new ResourceNotFoundException();
		}
		// prevent malicious request
		if (isAlarmingOnUserRequest(orderBy, order)) {
			throw new BadRequestException();
		}
		Page<Entity> page = new Page<Entity>().setPageNo(pageNo).setPageSize(32).setOrderBy(orderBy).setOrder(order);
		ensurePageAcceptable(page);
		if (channel.hasChildren()) {
			List<ChannelQuery> childrenQueries = channel.getChildrenQuery();
			ChannelFacetQuery channelQueryFacet = new ChannelFacetQuery(childrenQueries);
			page = entityService.queryPageWithFacet(channel.getTags(), page, channelQueryFacet);
			model.addAttribute("channelQueryFacet", channelQueryFacet.getFacetQueryResult());
		} else {			
			page = entityService.queryPage(String.format("classify:%s",channel.getTags()), page);
			model.addAttribute("channelQueryFacet", Collections.emptyMap());
		}
		List<Entity> hotSale= entityService.hotSale(channel.getName()+" AND 热",new java.util.Random().nextInt(100),8);
		model.addAttribute(channel).addAttribute(page)
		                           .addAttribute("hotKeyWord", channelService.hotKeyWord(channel))
		                           .addAttribute("hotSale", hotSale)
		                           .addAttribute("channels", channels);
		
		Configure conf = Configure.get();
		String viewPath = FileUtils.joinPaths(conf.getTemplatePath(), channel.getTemplate().getPhysicalUrl());
		return FileUtils.getMajorName(viewPath);
	}
	/**
	 * 限定页数 2000页以内
	 * @param page
	 */
	private void ensurePageAcceptable(Page<Entity> page) {
		if (page.getPageNo() <= 0) {
			page.setPageNo(1);
		}else if (page.getPageNo() > MAX_PAGE_NO) {
			page.setPageNo(MAX_PAGE_NO);
		}
	}


	private boolean isAlarmingOnUserRequest(String orderBy, String order) {
		try {
			// validate orderby
			queryAlarmFilter.doFilter(orderBy, "*");
			// validate order
			queryAlarmFilter.doFilter(order, "*");
		} catch (QueryAlarmException e) {
			return true;
		}
		
		return false;
	}
	/**
	 * 
	 * @param page
	 * @param model
	 * @return
	 */
	/*@RequestMapping(value = "/list", method = RequestMethod.GET)
	public String list(Page<Channel> page, Model model) {

		page = channelService.queryPage(page);
		model.addAttribute(page);
		return listView();
	}*/

	/**
	 * 
	 * @param page
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/{id}/list", method = RequestMethod.GET)
	public String list(@PathVariable("id") String id, Model model,Page<Channel> page) {
		if(id.equals("0")){
			page = channelService.queryPageTop(page);
		}else{
			page = channelService.queryPageChildById(page,id);
		}
		model.addAttribute(page);
		return listView();
	}
	
	/*
	 * (non-Javadoc)
	 * 
	 * @see com.loveme.core.web.controller.CrudControllerSupport#create(org.springframework.ui.Model)
	 */
	@Override
	@RequestMapping(value = "/create", method = RequestMethod.GET)
	public String create(Model model) {

		model.addAttribute(new Channel())
			 .addAttribute("channelNames", channelService.queryChannels())
			 .addAttribute("template", templateService.queryTemplates());
		return formView();
	}
	
	/*
	 * (non-Javadoc)
	 * 
	 * @see com.loveme.core.web.controller.CrudControllerSupport#create(java.lang.Object,
	 * org.springframework.validation.BindingResult)
	 */
	@RequestMapping(value = "/create", method = RequestMethod.PUT)
	public String create(Channel channel, BindingResult result,HttpServletRequest request) {
		if (result.hasErrors()) {
			return null;
		}
		Channel fatherChannel = channelService.get(request.getParameter("belongChannel"));
		channel.setFather(fatherChannel);
		channel.setTemplate(templateService.get(request.getParameter("belongTemplate")));
		try{
			channelService.save(channel);
		}
		catch(NullPointerException exception){
			exception.printStackTrace();
		}
		if(fatherChannel!=null){
			return "redirect:/channel/"+fatherChannel.getId()+"/list";
		}else{
			return "redirect:/channel/0/list";
		}
	}
	
	
	
	/*
	 * (non-Javadoc)
	 * 
	 * @see com.loveme.core.web.controller.CrudControllerSupport#delete(java.lang.Object)
	 */
	@Override
	@RequestMapping(value = "/{id}/delete", method = RequestMethod.DELETE)
	public String delete(@PathVariable("id") String id) {
		try{
			channelService.delete(id);
		}
		catch(Exception exception)
		{
			exception.printStackTrace();
			return null;
		}
		return REDIRECT_LIST;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.loveme.core.web.controller.CrudControllerSupport#delete(javax.servlet.http.HttpServletRequest)
	 */
	@Override
	@RequestMapping(value = "/delete", method = RequestMethod.DELETE)
	public String delete(HttpServletRequest request) {
		String[] items = EntityUtils.nullSafe(request.getParameterValues("items"), new String[] {});

		for (String item : items) {
			delete(item);
		}

		return REDIRECT_LIST;
	}
	/*
	 * (non-Javadoc)
	 * 
	 * @see com.loveme.core.web.controller.CrudControllerSupport#edit(java.lang.Object, org.springframework.ui.Model)
	 */
	@Override
	@RequestMapping(value = "/{id}/edit", method = RequestMethod.GET)
	public String edit(@PathVariable("id") String id, Model model) {
		Channel channel = channelService.get(id);
		model.addAttribute(channel)
			 .addAttribute("child", channelService.queryChildById(id))
			 .addAttribute("channelNames", channelService.queryChannels())
			 .addAttribute("template", templateService.queryTemplates());
		return formView();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.loveme.core.web.controller.CrudControllerSupport#edit(java.lang.Object,
	 * javax.servlet.http.HttpServletRequest)
	 */
	@Override
	@RequestMapping(value = "/{id}/edit", method = RequestMethod.PUT)
	public String edit(@PathVariable("id") String id, HttpServletRequest request) {
		try {
			Channel channel = channelService.get(id);
			channel.setFather(channelService.get(request.getParameter("belongChannel")));
			channel.setTemplate(templateService.get(request.getParameter("belongTemplate")));
			bind(request, channel);
			channelService.update(channel);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

		return REDIRECT_LIST;
	}
	@RequestMapping(value = "/centre", method = RequestMethod.GET)
	public String centre() {
		return "channel/centre";
	}
	@RequestMapping(value = "/left", method = RequestMethod.GET)
	public String left(Model model) {
		return "channel/left";
	}
	
	@RequestMapping(value = "/tree", method = RequestMethod.GET)
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
			if(channel.hasChildren()){
				channelTree.setClickUrl(channel.getId()+"/list");
			}else {
				channelTree.setClickUrl(channel.getId()+"/edit");
			}
			channelTree.setId(Integer.parseInt(channel.getId()));
			channelTree.setName(channel.getName());
			channelTrees.add(channelTree);
		}
		return channelTrees;
	}
	
	/*
	 * (non-Javadoc)
	 * 
	 * @see com.loveme.core.web.controller.CrudControllerSupport#getViewPackage()
	 */
	@Override
	protected String getViewPackage() {
		return "channel";
	}

	@Override
	public String create(Channel arg0, BindingResult arg1)
	{
		return null;
	}
	@Override
	public final void afterPropertiesSet() throws Exception {
		queryAlarmFilter.addFilterWords(queryAlarmWords);
	}

}

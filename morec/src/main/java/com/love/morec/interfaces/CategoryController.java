package com.love.morec.interfaces;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.love.morec.application.channel.ChannelService;
import com.love.morec.application.entity.EntityService;
import com.love.morec.application.template.TemplateService;
import com.love.morec.domain.channel.Channel;
import com.love.morec.domain.entity.Entity;
import com.love.morec.domain.urlparam.URLParam;
import com.love.morec.interfaces.exception.QueryAlarmException;

import com.loveme.core.orm.Page;
import com.loveme.core.web.exception.ResourceNotFoundException;
import com.loveme.util.SensitiveWordFilter;

@Controller
public class CategoryController {
	
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

	//channelID - 价格区间 - 视图 - 排序显示 - 未知5 - 只显示当日发货 - 第几页 - 筛选条件，可累加 - 未知9.html
	//channelID - 价格区间 - 视图 - 排序显示 - 第几页 - 筛选条件，可累加.html
	//channelID-byPrice-viewMode-sortType-pageNo-catsChoose.html
	//1-0-11-0-1-0
	@RequestMapping(value = "/category/{channelID}-{byPrice}-{viewMode}-{sortType}-{pageNo}-{catsChoose}.html", method = RequestMethod.GET)
	public String list(Model model,HttpServletRequest request,
			@PathVariable("channelID")String channelID,@PathVariable("byPrice")String byPrice,
			@PathVariable("viewMode") String viewMode,@PathVariable("sortType")String sortType,
			@PathVariable("pageNo")int pageNo,@PathVariable("catsChoose")String catsChoose) {
		return view(model, request, channelID, byPrice, viewMode, sortType, pageNo, catsChoose);
	}
	
	private String view(Model model,HttpServletRequest request,String channelID,String byPrice
						,String viewMode,String sortType,int pageNo,String catsChoose) {
		String orderBy,order;
/*		System.out.println("channelID:"+channelID);
		System.out.println("byPrice:"+byPrice);
		System.out.println("viewMode:"+viewMode);
		System.out.println("pageNo:"+pageNo);
		System.out.println("catsChoose:"+catsChoose);*/
		
		URLParam urlParam=new URLParam();
		urlParam.setPageNo(pageNo).setOrderBy("randomRegion").setOrder("asc").setByPrice("0");
		orderBy = urlParam.getOrderBy();
		order = urlParam.getOrder();
		
		Channel channel=channelService.get(channelID);
			
		if (null == channel) {
			throw new ResourceNotFoundException();
		}
		// prevent malicious request
		/*if (isAlarmingOnUserRequest(orderBy, order)) {
			throw new BadRequestException();
		}*/
		//Map<String,List<Channel>>  channelList = new HashMap<String, List<Channel>>();
		//Map<String,List<Channel>> allChannel = new HashMap<String, List<Channel>>();
				
		//channelList = changeChannel(fatherPath, allChannel,channels);		
		
		if (channel.getChildren().isEmpty()){
			Map<String ,String> channelFather = new HashMap<String,String>();
			channelFather  = channelService.classfiyToChannelname();		
			/*father.id or father.father.id*/
			String fatherId = channelFather.get(channel.getId());
			Channel navigationChannel = channelService.get(fatherId);
			channel.getFather().setFather(navigationChannel);
			List<Channel> brotherChannels=channelService.queryBrotherChannels(channel.getFather().getId());
			model.addAttribute("brotherChannels", brotherChannels);
		}
		
		
		Page<Entity> page = new Page<Entity>().setPageNo(urlParam.getPageNo()).setPageSize(24).setOrderBy(orderBy).setOrder(order);
		ensurePageAcceptable(page);
		if (channel.hasChildren()) {
			//List<ChannelQuery> childrenQueries = channel.getChildrenQuery();
			//ChannelFacetQuery channelQueryFacet = new ChannelFacetQuery(childrenQueries);
			//page = entityService.queryPageWithFacet(channel.getTags(), page, channelQueryFacet);			
			//model.addAttribute("channelQueryFacet", channelQueryFacet.getFacetQueryResult());
			page=entityService.queryPage(String.format("classify:%s",channel.getTags()), page);
		} else {			
			page = entityService.queryPage(String.format("classify:%s",channel.getTags()), page);
			model.addAttribute("channelQueryFacet", Collections.emptyMap());
		}
		List<Channel> childChannels=channelService.queryChildById(channel.getId());
		List<Entity> hotSale = entityService.hotSale(channel.getTags(),new java.util.Random().nextInt(100), 10);
		List<Entity> newSale = entityService.newSale(channel.getTags(),new java.util.Random().nextInt(100), 3);
		
		model.addAttribute(channel).addAttribute(page).addAttribute("childChannels", childChannels)
			 .addAttribute("hotSale", hotSale).addAttribute("newSale", newSale);
		return "/WEB-INF/front/template/list";
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
	public Map<String, List<Channel>> changeChannel(String channelPath,Map<String, List<Channel>> allChannel ,List<Channel> channels) {
		Map<String, List<Channel>> channelList = new HashMap<String, List<Channel>>();		
		for (int i = 0; i < channels.size(); i++) {
			if (channelPath.equals(channels.get(i).getPath())) {
				if(i == channels.size()-1){
					channelList.put(channels.get(0).getName(), allChannel.get(channels.get(0).getPath()));
				}else{
					channelList.put(channels.get(i+1).getName(), allChannel.get(channels.get(i+1).getPath()));
				}			
			}
		}
		return channelList;
	}
}

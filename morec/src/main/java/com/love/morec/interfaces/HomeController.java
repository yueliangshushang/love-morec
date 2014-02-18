package com.love.morec.interfaces;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.love.morec.application.channel.ChannelService;
import com.love.morec.application.entity.EntityCommentService;
import com.love.morec.application.entity.EntityService;
import com.love.morec.domain.channel.Channel;
import com.love.morec.domain.channel.ChannelGroupQuery;
import com.love.morec.domain.channel.ChannelQuery;
import com.love.morec.domain.entity.Entity;
import com.love.morec.domain.entity.EntityComment;
import com.loveme.core.orm.Page;

@Controller
public class HomeController {
	
	Logger log = LoggerFactory.getLogger(HomeController.class);
	
	@Autowired
	private ChannelService channelService;
	@Autowired
	private EntityService entityService;
	@Autowired
	private EntityCommentService entityCommentService;

	@RequestMapping(value = { "/", "welcome" }, method = RequestMethod.GET)
	public String welcome(Model model) {
		/*List<Channel> channels = channelService.queryTop();
		
		List<ChannelQuery> channelQueries = new ArrayList<ChannelQuery>();
		for (Channel channel : channels) {
			channelQueries.add(channel.getSelfQuery());
		}
		System.out.println("channelQueries size: "+channelQueries.size());
		ChannelGroupQuery channelGroupQuery = new ChannelGroupQuery(channelQueries);
		Map<String, List<Entity>> channelGroupResult = entityService.queryByGroup(channelGroupQuery);
		model.addAttribute("channelGroupResult", channelGroupResult)
			.addAttribute("channels",channels);*/
		
		String newProductNokiaStr="classify:手机 AND title:诺基亚LUMIA";
		Page<Entity> newProductNokiaPgae=new Page<Entity>();
		newProductNokiaPgae.setPageSize(1).setOrderBy("createTime").setOrder("DESC");
		newProductNokiaPgae=entityService.queryPage(newProductNokiaStr, newProductNokiaPgae);
		
		String newProductSamsungStr="classify:手机 AND title:三星 Galaxy S3";
		Page<Entity> newProductSamsungPgae=new Page<Entity>();
		newProductSamsungPgae.setPageSize(1).setOrderBy("createTime").setOrder("DESC");
		newProductSamsungPgae=entityService.queryPage(newProductSamsungStr, newProductSamsungPgae);
		
		String newProductCoffeeStr="classify:手机 AND title:美的咖啡机";
		Page<Entity> newProductCoffeePage=new Page<Entity>();
		newProductCoffeePage.setPageSize(1).setOrderBy("createTime").setOrder("DESC");
		newProductCoffeePage=entityService.queryPage(newProductCoffeeStr, newProductCoffeePage);
		
		String todayPushStr="*:*";
		Page<Entity> todayPushPage=new Page<Entity>();
		todayPushPage.setPageSize(12).setOrderBy("createTime").setOrder("DESC");
		todayPushPage=entityService.queryPage(todayPushStr, todayPushPage);
		
		String groupDealStr="classify:手机 AND title:小米";
		Page<Entity> groupDealPage=new Page<Entity>();
		groupDealPage.setPageSize(2).setOrderBy("createTime").setOrder("DESC");
		groupDealPage=entityService.queryPage(groupDealStr, groupDealPage);
		
		String phoneAndCameraStr="classify:手机 OR classify:单反相机";
		Page<Entity> phoneAndCameraPage=new Page<Entity>();
		phoneAndCameraPage.setPageSize(8).setOrderBy("createTime").setOrder("DESC");
		phoneAndCameraPage=entityService.queryPage(phoneAndCameraStr, phoneAndCameraPage);
				
		String phoneAndCameraHotStr="classify:手机";
		Page<Entity> phoneAndCameraHotPage=new Page<Entity>();
		phoneAndCameraHotPage.setPageSize(5).setOrderBy("createTime,commentCount").setOrder("DESC,ASC");
		phoneAndCameraHotPage=entityService.queryPage(phoneAndCameraHotStr, phoneAndCameraHotPage);
		
		String phoneAndCameraCommentStr="classify:手机";
		Page<Entity> phoneAndCameraCommentPage=new Page<Entity>();
		phoneAndCameraCommentPage.setPageSize(3).setOrderBy("commentCount,createTime").setOrder("ASC,DESC");
		phoneAndCameraCommentPage=entityService.queryPage(phoneAndCameraCommentStr, phoneAndCameraCommentPage);
		Map<String, EntityComment> phoneAndCameraCommentMap=getEntityCommentForPage(phoneAndCameraCommentPage);
		
		
		String pcHardwareStr="classify:笔记本电脑 OR classify:平板电脑 OR classify:台式整机";
		Page<Entity> pcHardwarePage=new Page<Entity>();
		pcHardwarePage.setPageSize(8).setOrderBy("createTime").setOrder("DESC");
		pcHardwarePage=entityService.queryPage(pcHardwareStr, pcHardwarePage);
				
		String pcHardwareHotStr="classify:笔记本电脑 OR classify:平板电脑";
		Page<Entity> pcHardwareHotPage=new Page<Entity>();
		pcHardwareHotPage.setPageSize(3).setOrderBy("createTime,commentCount").setOrder("DESC,ASC");
		pcHardwareHotPage=entityService.queryPage(pcHardwareHotStr, pcHardwareHotPage);
		
		String pcHardwareCommentStr="classify:笔记本电脑 OR classify:键盘";
		Page<Entity> pcHardwareCommentPage=new Page<Entity>();
		pcHardwareCommentPage.setPageSize(2).setOrderBy("commentCount,createTime").setOrder("ASC,DESC");
		pcHardwareCommentPage=entityService.queryPage(pcHardwareCommentStr, pcHardwareCommentPage);
		Map<String, EntityComment> pcHardwareCommentMap=getEntityCommentForPage(pcHardwareCommentPage);
		
		
		String homeAppliancesStr="classify:冰箱 OR classify:平板电视 OR classify:空调";
		Page<Entity> homeAppliancesPage=new Page<Entity>();
		homeAppliancesPage.setPageSize(8).setOrderBy("createTime").setOrder("DESC");
		homeAppliancesPage=entityService.queryPage(homeAppliancesStr, homeAppliancesPage);
		
		String homeAppliancesHotStr="classify:平板电视";
		Page<Entity> homeAppliancesHotPage=new Page<Entity>();
		homeAppliancesHotPage.setPageSize(3).setOrderBy("createTime,commentCount").setOrder("DESC,ASC");
		homeAppliancesHotPage=entityService.queryPage(homeAppliancesHotStr, homeAppliancesHotPage);
		
		String homeAppliancesCommentStr="classify:消毒柜";
		Page<Entity> homeAppliancesCommentPage=new Page<Entity>();
		homeAppliancesCommentPage.setPageSize(2).setOrderBy("commentCount,createTime").setOrder("ASC,DESC");
		homeAppliancesCommentPage=entityService.queryPage(homeAppliancesCommentStr, homeAppliancesCommentPage);
		Map<String, EntityComment> homeAppliancesCommentMap=getEntityCommentForPage(homeAppliancesCommentPage);
		
		
		String officeSuppliesStr="classify:打印机 OR classify:传真机 OR classify:复印机";
		Page<Entity> officeSuppliesPage=new Page<Entity>();
		officeSuppliesPage.setPageSize(8).setOrderBy("createTime").setOrder("DESC");
		officeSuppliesPage=entityService.queryPage(officeSuppliesStr, officeSuppliesPage);
		
		
		String automotiveStr="车载 OR GPS导航";
		Page<Entity> automotivePage=new Page<Entity>();
		automotivePage.setPageSize(8).setOrderBy("createTime").setOrder("DESC");
		automotivePage=entityService.queryPage(automotiveStr, automotivePage);
		
		String specialStr="特价";
		Page<Entity> specialPage=new Page<Entity>();
		specialPage.setPageSize(5).setOrderBy("createTime").setOrder("DESC");
		specialPage=entityService.queryPage(specialStr, specialPage);
		
		
		model.addAttribute("newProductNokiaPgae",newProductNokiaPgae)
			 .addAttribute("newProductSamsungPgae",newProductSamsungPgae)
			 .addAttribute("newProductCoffeePage",newProductCoffeePage)
			 .addAttribute("todayPushPage", todayPushPage)
			 .addAttribute("groupDealPage", groupDealPage)
			 .addAttribute("phoneAndCameraPage", phoneAndCameraPage)
			 .addAttribute("phoneAndCameraHotPage", phoneAndCameraHotPage)
			 .addAttribute("phoneAndCameraCommentPage", phoneAndCameraCommentPage)
			 .addAttribute("phoneAndCameraCommentMap", phoneAndCameraCommentMap)
			 .addAttribute("pcHardwarePage", pcHardwarePage)
			 .addAttribute("pcHardwareHotPage", pcHardwareHotPage)
			 .addAttribute("pcHardwareCommentPage", pcHardwareCommentPage)
			 .addAttribute("pcHardwareCommentMap", pcHardwareCommentMap)
			 .addAttribute("homeAppliancesPage", homeAppliancesPage)
			 .addAttribute("homeAppliancesHotPage", homeAppliancesHotPage)
			 .addAttribute("homeAppliancesCommentPage", homeAppliancesCommentPage)
			 .addAttribute("homeAppliancesCommentMap", homeAppliancesCommentMap)
			 .addAttribute("officeSuppliesPage", officeSuppliesPage)
			 .addAttribute("automotivePage", automotivePage)
			 .addAttribute("specialPage", specialPage);
		
		return "/WEB-INF/front/template/welcome";
	}

	private Map<String, EntityComment> getEntityCommentForPage(Page<Entity> page){
		Map<String,EntityComment> entityCommentMap=new HashMap<String, EntityComment>();
		for(Entity entity : page.getResult()){
			EntityComment entityComment=entityCommentService.getOneEntityComment(entity.getId());
			entityCommentMap.put(entity.getId(), entityComment);
		}
		return entityCommentMap;
	}
	
	@RequestMapping(value = { "/about","/about.html" }, method = RequestMethod.GET)
	public String about(Model model) {
		List<Channel> channels = channelService.queryTop();
		model.addAttribute("channels", channels);
		return "about";
	}
	
	@RequestMapping(value = { "/contact","/contact.html" }, method = RequestMethod.GET)
	public String contact(Model model) {
		List<Channel> channels = channelService.queryTop();
		model.addAttribute("channels", channels);
		return "contact";
	}

	@RequestMapping(value = { "/sitemap","/sitemap.html" }, method = RequestMethod.GET)
	public String sitemap(Model model) {
		List<Channel> channels = channelService.queryTop();
		model.addAttribute("channels", channels);
		return "sitemap";
	}
}
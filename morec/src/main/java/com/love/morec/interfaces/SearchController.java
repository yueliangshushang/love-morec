package com.love.morec.interfaces;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.love.morec.application.channel.ChannelService;
import com.love.morec.application.entity.EntityService;
import com.love.morec.domain.channel.Channel;
import com.love.morec.domain.entity.Entity;
import com.love.morec.interfaces.exception.QueryAlarmException;
import com.loveme.core.orm.Page;
import com.loveme.util.SensitiveWordFilter;

@Controller
public class SearchController implements InitializingBean {

	private static final int MAX_PAGE_NO = 2000;

	private String defaultOrederBy="createTime";
	private String defaultOreder="DESC";
	
	@Autowired
	private EntityService entityService;

	@Autowired
	private ChannelService channelService;

	private final List<String> queryAlarmWords = Arrays.asList(new String[] {
			"&lt;", "&gt;", "&apos", "&quot", "<", ">", "'", "\"", ":", "+",
			"-", ";", "or", "and", "&&", "||", "[", "]", "{", "}", "." });
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

		@Override
		protected void afterFilter(List<String> hitWords, String text,
				String replacement) {
			if (!hitWords.isEmpty()) {
				throw new QueryAlarmException();
			}
		}
	};

	/*@RequestMapping(value = "/search", method = RequestMethod.GET)
	public String search(@RequestParam("keyword") String keyword,@RequestParam("pageNo") int pageNo, Model model) {
		//return view(keyword, pageNo, "idAsHash", "asc", model);
		
	}*/
	
	/*
	 * /search?keyword=### & pageNo=# & orderBy=# & order=#
	 */
	@RequestMapping(value = "/search", method = RequestMethod.GET)
	public String view(@RequestParam("keyword") String keyword,Model model,HttpServletRequest request) {
		
		int pageNo=disposePageNoParm(request.getParameter("pageNo"));
		String orderBy=request.getParameter("orderBy");
		String order=request.getParameter("order");
		
		orderBy=StringUtils.isEmpty(orderBy)?defaultOrederBy:orderBy;
		order=StringUtils.isEmpty(order)?defaultOreder:order;
		
		List<Channel> channels = channelService.queryTop();
		Page<Entity> page = new Page<Entity>().setPageNo(pageNo).setPageSize(32).setOrderBy(orderBy).setOrder(order);
		
		if (isAlarmingOnUserRequest(keyword)) {
			model.addAttribute("alarm", true)
					.addAttribute("channels", channels).addAttribute("keyword", "")
					.addAttribute(page)
					.addAttribute("hotSale", Collections.<Entity> emptyList());
			return "WEB-INF/front/template/search";
		}
		
		ensurePageAcceptable(page);
		page = entityService.queryPage(keyword, page);
		// Channel channel = channelService.getMostSimilar(q);
		List<Entity> hotSale = entityService.hotSale(keyword + "",new java.util.Random().nextInt(100), 10);
		List<Entity> newSale = entityService.newSale(keyword + "",new java.util.Random().nextInt(100), 3);
		model.addAttribute("keyword", keyword).addAttribute(page)
				.addAttribute("alarm", false).addAttribute("hotSale", hotSale)
				.addAttribute("newSale", newSale).addAttribute("channels", channels);
		return "WEB-INF/front/template/search";

	}

	private int disposePageNoParm(String pageNo){
		return StringUtils.isEmpty(pageNo)?0:Integer.valueOf(pageNo);
	}
	
	private boolean isAlarmingOnUserRequest(String q) {
		try {
			queryAlarmFilter.doFilter(q, "*");
		} catch (QueryAlarmException e) {
			return true;
		}
		return false;
	}

	private void ensurePageAcceptable(Page<Entity> page) {
		if (page.getPageNo() <= 0) {
			page.setPageNo(1);
		} else if (page.getPageNo() > MAX_PAGE_NO) {
			page.setPageNo(MAX_PAGE_NO);
		}
	}

	@Override
	public void afterPropertiesSet() throws Exception {
		queryAlarmFilter.addFilterWords(queryAlarmWords);
	}

}
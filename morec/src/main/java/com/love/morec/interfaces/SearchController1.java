package com.love.morec.interfaces;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.love.morec.application.channel.ChannelService;
import com.love.morec.application.entity.EntityService;
import com.love.morec.domain.channel.Channel;
import com.love.morec.domain.entity.Entity;
import com.love.morec.interfaces.exception.QueryAlarmException;
import com.loveme.core.orm.Page;
import com.loveme.util.SensitiveWordFilter;

@Controller
public class SearchController1 implements InitializingBean {

	private static final int MAX_PAGE_NO = 2000;

	@Autowired
	private EntityService entityService;

	@Autowired
	private ChannelService channelService;

	private final List<String> queryAlarmWords = Arrays.asList(new String[] {
			"&lt;", "&gt;", "&apos", "&quot", "<", ">", "'", "\"", ":", "+",
			"-", ";", "or", "and", "&&", "||", "[", "]", "{", "}", "." });
	private final SensitiveWordFilter queryAlarmFilter = new SensitiveWordFilter() {
		/*
		 * (non-Javadoc)
		 * 
		 * @see
		 * com.loveme.util.SensitiveWordFilter#beforeFilter(java.lang.String,
		 * java.lang.String)
		 */
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
		 * @see com.loveme.util.SensitiveWordFilter#afterFilter(java.util.List,
		 * java.lang.String, java.lang.String)
		 */
		@Override
		protected void afterFilter(List<String> hitWords, String text,
				String replacement) {
			if (!hitWords.isEmpty()) {
				throw new QueryAlarmException();
			}
		}
	};


	//@RequestMapping(value = "/search/{q}", method = RequestMethod.GET)
	public String search(@PathVariable("q") String q, Model model) {
		return search(q, 1, model);
	}

	//@RequestMapping(value = "/search/{q}/page/{pageNo}", method = RequestMethod.GET)
	public String search(@PathVariable("q") String q,
			@PathVariable("pageNo") int pageNo, Model model) {
		return search(q, pageNo, "idAsHash", "asc", model);
	}

	/**
	 * 具体搜索方法
	 * 
	 * @param q
	 * @param pageNo
	 * @param orderBy
	 * @param order
	 * @param model
	 * @return
	 */
	//@RequestMapping(value = "/search/{q}/page/{pageNo}/{orderBy}/{order}", method = RequestMethod.GET)
	public String search(@PathVariable("q") String q,
			@PathVariable("pageNo") int pageNo,
			@PathVariable("orderBy") String orderBy,
			@PathVariable("order") String order, Model model) {
		List<Channel> channels = channelService.queryTop();
		Page<Entity> page = new Page<Entity>().setPageNo(pageNo)
				.setPageSize(32).setOrderBy(orderBy).setOrder(order);
		if (isAlarmingOnUserRequest(q)) {
			model.addAttribute("alarm", true)
					.addAttribute("channels", channels).addAttribute("q", "")
					.addAttribute(page)
					.addAttribute("hotSale", Collections.<Entity> emptyList());
			return "WEB-INF/front/template/search";
		}
		ensurePageAcceptable(page);
		page = entityService.queryPage(q, page);
		// Channel channel = channelService.getMostSimilar(q);
		List<Entity> hotSale = entityService.hotSale(q + " AND 热",
				new java.util.Random().nextInt(100), 8);
		model.addAttribute("q", q).addAttribute(page)
				.addAttribute("alarm", false).addAttribute("hotSale", hotSale)
				.addAttribute("channels", channels);
		System.out.println(q);
		return "WEB-INF/front/template/search";

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

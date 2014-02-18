package com.love.morec.interfaces.cms;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.love.morec.domain.log.Log;
import com.love.morec.infrastruture.persist.LogRepository;
import com.loveme.core.orm.Page;
import com.loveme.core.web.controller.CrudControllerSupport;
import com.loveme.util.EntityUtils;

@Controller
@RequestMapping(value = "/log")
public class LogController extends CrudControllerSupport<String, Log> {

	private static final String REDIRECT_LIST = "redirect:/log/list";

	@Autowired
	// private LogService logService;
	private LogRepository logRepository;

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public String list(Page<Log> page, Model model) {

		page = logRepository.queryPage(page);

		model.addAttribute(page);

		return listView();
	}

	/* 按日期查询 */

	@RequestMapping(value = "{date}/search", method = RequestMethod.GET)
	public String dataLists(@PathVariable("date") String date, Page<Log> page,
			Model model) {

		page = logRepository.queryLogsByDate(page, date);

		model.addAttribute(page);

		return listView();
	}

	@Override
	@RequestMapping(value = "/{id}/delete", method = RequestMethod.GET)
	public String delete(@PathVariable("id") String id) {

		logRepository.delete(id);

		return REDIRECT_LIST;
	}

	@Override
	@RequestMapping(value = "/delete", method = RequestMethod.DELETE)
	public String delete(HttpServletRequest req) {
		String[] items = EntityUtils.nullSafe(req.getParameterValues("items"),
				new String[] {});
		for (String item : items) {
			delete(item);
		}

		return REDIRECT_LIST;
	}

	@Override
	public String edit(String id, Model model) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String edit(String id, HttpServletRequest req) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	protected String getViewPackage() {
		// TODO Auto-generated method stub
		return "log";
	}

	@RequestMapping(value = "/centre", method = RequestMethod.GET)
	public String centre() {
		return "log/centre";
	}

	@RequestMapping(value = "/left", method = RequestMethod.GET)
	public String left() {
		return "log/left";
	}

	@Override
	public String create(Model model) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String create(Log log, BindingResult req) {
		// TODO Auto-generated method stub
		return null;
	}

}

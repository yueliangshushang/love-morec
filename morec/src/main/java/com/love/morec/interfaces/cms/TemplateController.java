package com.love.morec.interfaces.cms;

import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.love.morec.application.template.TemplateService;
import com.love.morec.domain.Configure;
import com.love.morec.domain.template.Template;
import com.love.morec.interfaces.util.ConfigureOnWeb;
import com.loveme.core.orm.Page;
import com.loveme.core.web.controller.CrudControllerSupport;
import com.loveme.util.EntityUtils;

/**
 * 
 * @author loudyn
 * 
 */
@Controller
@RequestMapping("/template")
public class TemplateController extends CrudControllerSupport<String, Template> {

	private static final String REDIRECT_LIST = "redirect:/template/list";
	@Autowired
	private TemplateService templateService;
	@Autowired
	private ConfigureOnWeb confOnWeb;

	/**
	 * 
	 * @param page
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public String list(Page<Template> page, Model model) {
		page = templateService.queryPage(page);
		model.addAttribute(page);
		return listView();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.youboy.core.web.controller.CrudControllerSupport#create(org.springframework.ui.Model)
	 */
	@Override
	@RequestMapping(value = "/create", method = RequestMethod.GET)
	public String create(Model model) {
		model.addAttribute(new Template());
		return formView();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.youboy.core.web.controller.CrudControllerSupport#create(java.lang.Object,
	 * org.springframework.validation.BindingResult)
	 */
	@Override
	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public String create(Template template, BindingResult result) {

		Configure conf = confOnWeb.wrap(Configure.get());
		templateService.save(conf, template);
		return REDIRECT_LIST;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.youboy.core.web.controller.CrudControllerSupport#delete(java.lang.Object)
	 */
	@Override
	@RequestMapping(value = "/{id}/delete", method = RequestMethod.DELETE)
	public String delete(@PathVariable("id") String id) {
		try {

			Configure conf = confOnWeb.wrap(Configure.get());
			templateService.delete(conf, templateService.get(id));
		} catch (Exception exception) {
			return REDIRECT_LIST;
		}
		return REDIRECT_LIST;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.youboy.core.web.controller.CrudControllerSupport#delete(javax.servlet.http.HttpServletRequest)
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
	 * @see com.youboy.core.web.controller.CrudControllerSupport#edit(java.lang.Object, org.springframework.ui.Model)
	 */
	@Override
	@RequestMapping(value = "/{id}/edit", method = RequestMethod.GET)
	public String edit(@PathVariable("id") String id, Model model) {
		Template template = templateService.get(id);
		model.addAttribute(template).addAttribute("_method", "PUT");
		return formView();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.youboy.core.web.controller.CrudControllerSupport#edit(java.lang.Object,
	 * javax.servlet.http.HttpServletRequest)
	 */
	@Override
	@RequestMapping(value = "/{id}/edit", method = RequestMethod.PUT)
	public String edit(@PathVariable("id") String id, HttpServletRequest request) {
		try {

			Template template = templateService.get(id);
			bind(request, template);

			Configure conf = confOnWeb.wrap(Configure.get());
			templateService.update(conf, template);
		} catch (Exception e) {
			return null;
		}

		return REDIRECT_LIST;
	}

	@Override
	protected String getViewPackage() {
		return "template";
	}

	@RequestMapping(value = "/centre", method = RequestMethod.GET)
	public String centre() {
		return "template/centre";
	}

	@RequestMapping(value = "/left", method = RequestMethod.GET)
	public String left() {
		return "template/left";
	}
}

package com.love.morec.interfaces.cms;

import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.love.morec.application.site.SiteService;
import com.love.morec.domain.site.Site;
import com.loveme.core.orm.Page;
import com.loveme.core.web.controller.CrudControllerSupport;
import com.loveme.util.EntityUtils;

/**
 * 
 * @author tanjianna
 * 
 */
@Controller
@RequestMapping("/site")
public class SiteController extends CrudControllerSupport<String, Site> {

	private static final String REDIRECT_LIST = "redirect:/site/list";
	@Autowired
	private SiteService siteService;

	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public String list(Page<Site> page, Model model) {
		page = siteService.queryPage(page);
		model.addAttribute(page);
		return listView();
	}

	@Override
	@RequestMapping(value = "/create", method = RequestMethod.GET)
	public String create(Model model) {
		model.addAttribute(new Site());
		return formView();
	}

	@Override
	@RequestMapping(value = "/create", method = RequestMethod.PUT)
	public String create(Site site, BindingResult result) {
		siteService.save(site);
		return REDIRECT_LIST;
	}

	@Override
	@RequestMapping(value = "/{id}/delete", method = RequestMethod.DELETE)
	public String delete(@PathVariable("id") String id) {
		try{
			siteService.delete(id);
		}catch(Exception exception){
			exception.printStackTrace();
			return REDIRECT_LIST;
		}
		return REDIRECT_LIST;
	}

	@Override
	@RequestMapping(value = "/delete", method = RequestMethod.DELETE)
	public String delete(HttpServletRequest request) {
		String[] items = EntityUtils.nullSafe(request.getParameterValues("items"), new String[] {});
		for (String item : items) {
			delete(item);
		}
		
		return REDIRECT_LIST;
	}

	@Override
	@RequestMapping(value = "/{id}/edit", method = RequestMethod.GET)
	public String edit(@PathVariable("id") String id, Model model) {
		Site site = siteService.get(id);
		model.addAttribute(site);
		return formView();
	}

	@Override
	@RequestMapping(value = "/{id}/edit", method = RequestMethod.PUT)
	public String edit(@PathVariable("id") String id, HttpServletRequest request) {
		try {
			Site site = siteService.get(id);
			bind(request, site);
			siteService.update(site);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return REDIRECT_LIST;
	}

	@Override
	protected String getViewPackage() {
		return "site";
	}
	@RequestMapping(value = "/centre", method = RequestMethod.GET)
	public String centre() {
		return "site/centre";
	}
	@RequestMapping(value = "/left", method = RequestMethod.GET)
	public String left() {
		return "site/left";
	}
}

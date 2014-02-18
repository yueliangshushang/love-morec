package com.love.morec.interfaces.cms;

import java.util.Properties;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * 
 * @author loudyn
 *
 */
@Controller
@RequestMapping(value = "/admin")
public class AdminController {

	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String login() {
		return "admin/login";
	}

	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public String index() {
		return "admin/index";
	}

	@RequestMapping(value = "/deny", method = RequestMethod.GET)
	public String deny() {
		return "admin/deny";
	}

	@RequestMapping(value="/logout")
	public String logout(){
		
		Subject subject = SecurityUtils.getSubject();
		subject.logout();
		return "redirect:/admin/login";
	}

	@RequestMapping(value="/head")
	public String head(){
		return "admin/head";
	}
	@RequestMapping(value="/foot")
	public String foot(){
		return "admin/foot";
	}
	@RequestMapping(value = "/centre", method = RequestMethod.GET)
	public String centre() {
		return "admin/centre";
	}
	@RequestMapping(value="/left")
	public String left(){
		return "admin/left";
	}
	@RequestMapping(value="/right")
	public String right(Model model){
		Properties props = System.getProperties();
		model.addAttribute("props", props);
		return "admin/right";
	}
}

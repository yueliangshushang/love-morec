package com.love.morec.interfaces.cms;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.love.morec.application.resource.RecycleService;
import com.love.morec.application.resource.ResourceService;
import com.love.morec.domain.Configure;
import com.love.morec.domain.resource.ResourceBean;
import com.love.morec.interfaces.util.ConfigureOnWeb;
import com.loveme.core.orm.Page;
import com.loveme.util.FileUtils;

@Controller
@RequestMapping(value = "/recycle")
public class RecycleController {
	
	@Autowired
	private RecycleService recycleService;
	@Autowired
	private ResourceService resourceService;
	@Autowired
	private ConfigureOnWeb confOnWeb;
	
	/**
	 * 
	 * @return
	 */
	@RequestMapping(value = "/centre", method = RequestMethod.GET)
	public String resource() {
		return "recycle/centre";
	}

	/**
	 * 
	 * @return
	 */
	@RequestMapping(value = "/left")
	public String left() {
		return "recycle/left";
	}
	
	@RequestMapping(value = "/list")
	public String list(Page<ResourceBean> page,Model model){
		page = recycleService.queryPage(page);
		model.addAttribute("page", page);
		return "recycle/list";
	}
	
	@RequestMapping(value = "/recover",method = RequestMethod.POST)
	public String recover(@RequestParam(value = "id" , required = true )String id,Model model){
		
		ResourceBean bean =  recycleService.get(id);
		Configure conf = confOnWeb.wrap(Configure.get());
		String sourcePath = FileUtils.joinPaths(conf.getRecyclePath(), getUniquenessName(bean));
		String targetPath = FileUtils.joinPaths(conf.getResourcePath(), bean.getPath());
		resourceService.cutFileToRecycle(sourcePath, targetPath);
		recycleService.delete(id);
		return "recycle/list";
	}
	
	private String getUniquenessName(ResourceBean bean){
		return bean.getName() + "." + bean.getLastModified();
	}
	
}

package com.love.morec.application.template;

import java.util.List;

import com.love.morec.domain.Configure;
import com.love.morec.domain.template.Template;
import com.loveme.core.orm.Page;

/**
 * 模板逻辑层
 * 
 * @author tanjianna
 * 
 */
public interface TemplateService {

	/**
	 * 
	 * @param conf
	 * @param template
	 */
	void save(Configure conf, Template template);

	/**
	 * 
	 * @param conf
	 * @param template
	 */
	void delete(Configure conf, Template template);

	/**
	 * 
	 * @param page
	 * @return
	 */
	Page<Template> queryPage(Page<Template> page);

	/**
	 * 
	 * @param id
	 * @return
	 */
	Template get(String id);

	/**
	 * 
	 * @param conf
	 * @param template
	 */
	void update(Configure conf, Template template);

	/**
	 * 
	 * @return
	 */
	List<Template> queryTemplates();
}

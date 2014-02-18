package com.love.morec.infrastruture.persist;

import java.util.List;

import com.love.morec.domain.template.Template;
import com.loveme.core.orm.Page;

/**
 * 
 * @author tanjianna
 * 
 */
public interface TemplateRepository {
	/**
	 * 
	 * @param template
	 */
	void save(Template template);

	/**
	 * 
	 * @param template
	 */
	void delete(Template template);

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
	 * @param template
	 */
	void update(Template template);

	/**
	 * 
	 * @return
	 */
	List<Template> queryTemplates();
}

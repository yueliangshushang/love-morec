package com.love.morec.application.template.impl;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.love.morec.application.template.TemplateService;
import com.love.morec.domain.Configure;
import com.love.morec.domain.template.Template;
import com.love.morec.infrastruture.annotation.Auditable;
import com.love.morec.infrastruture.persist.TemplateRepository;
import com.loveme.core.orm.Page;
import com.loveme.util.FileUtils;
import com.loveme.util.filecommand.FileCommandInvoker;
import com.loveme.util.filecommand.impl.DeleteFileCommand;
import com.loveme.util.filecommand.impl.MakeFileCommand;
import com.loveme.util.filecommand.impl.WriteStringToFileCommand;

/**
 * 
 * @author tanjianna
 * 
 */
@Transactional
@Service
public class TemplateServiceImpl implements TemplateService {

	private TemplateRepository templateRepository;

	/**
	 * 
	 * @param templateRepository
	 */
	@Autowired
	public void setSiteRepository(TemplateRepository templateRepository) {
		this.templateRepository = templateRepository;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.youboy.morec.application.template.TemplateService#queryPage(com.youboy.core.orm.Page)
	 */
	@Override
	public Page<Template> queryPage(Page<Template> page) {
		return templateRepository.queryPage(page);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.youboy.morec.application.template.TemplateService#get(java.lang.String)
	 */
	@Override
	public Template get(String id) {
		return templateRepository.get(id);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.youboy.morec.application.template.TemplateService#save(com.youboy.morec.domain.Configure,
	 * com.youboy.morec.domain.template.Template)
	 */
	@Auditable(action="添加模板")
	public void save(Configure conf, Template template) {
		String physicalUrl = String.format("%s.ftl", template.getMajorName());
		String actualTemplatePath = FileUtils.joinPaths(conf.getTemplatePath(), physicalUrl);
		template.setPhysicalUrl(physicalUrl).modify();
		
		templateRepository.save(template);
		// create the physical file
		new WriteStringToFileCommand(actualTemplatePath, template.getContent(), "utf-8").execute();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.youboy.morec.application.template.TemplateService#delete(com.youboy.morec.domain.Configure,
	 * com.youboy.morec.domain.template.Template)
	 */
	@Auditable(action="删除模板")
	public void delete(Configure conf, Template template) {
		String actualTemplatePath = FileUtils.joinPaths(conf.getTemplatePath(), template.getPhysicalUrl());
		templateRepository.delete(template);
		new DeleteFileCommand(actualTemplatePath).execute();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.youboy.morec.application.template.TemplateService#update(com.youboy.morec.domain.Configure,
	 * com.youboy.morec.domain.template.Template)
	 */
	@Auditable(action="更新模板")
	public void update(Configure conf, Template template) {

		String oldActualTemplatePath = FileUtils.joinPaths(conf.getTemplatePath(), template.getPhysicalUrl());
		String newPhysicalUrl = String.format("%s.ftl", template.getMajorName());
		String newActualTemplatePath = FileUtils.joinPaths(conf.getTemplatePath(), newPhysicalUrl);

		template.setPhysicalUrl(newPhysicalUrl).modify();
		templateRepository.update(template);
		
		new FileCommandInvoker().command(new DeleteFileCommand(new File(oldActualTemplatePath)))
								.command(new MakeFileCommand(newActualTemplatePath))
								.command(new WriteStringToFileCommand(newActualTemplatePath, template.getContent(), "utf-8"))
								.invoke();

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.youboy.morec.application.template.TemplateService#queryTemplates()
	 */
	@Override
	public List<Template> queryTemplates() {
		return templateRepository.queryTemplates();
	}

}

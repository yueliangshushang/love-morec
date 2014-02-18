package com.love.morec.interfaces.util;

import javax.servlet.ServletContext;

import org.springframework.stereotype.Component;
import org.springframework.web.context.ServletContextAware;

import com.love.morec.domain.Configure;
import com.loveme.util.AssertUtils;
import com.loveme.util.FileUtils;

/**
 * 
 * @author loudyn
 * 
 */
@Component
public final class ConfigureOnWeb implements ServletContextAware {
	private ServletContext context;

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.springframework.web.context.ServletContextAware#setServletContext(javax.servlet.ServletContext)
	 */
	@Override
	public final void setServletContext(ServletContext servletContext) {
		this.context = servletContext;
	}

	/**
	 * 
	 * @param conf
	 * @return
	 */
	public final Configure wrap(Configure conf) {
		String templatePath = FileUtils.joinPaths(getServletContextPath(), conf.getTemplatePath());
		String resourcePath = FileUtils.joinPaths(getServletContextPath(), conf.getResourcePath());
		String recyclePate = FileUtils.joinPaths(getServletContextPath(), conf.getRecyclePath());
		
		return conf.setTemplatePath(templatePath).setResourcePath(resourcePath).setRecyclePath(recyclePate).setRootPath(getServletContextPath());
	}

	private String getServletContextPath() {
		AssertUtils.notNull(this.context);
		return context.getRealPath("/");
	}

}

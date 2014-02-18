package com.love.morec.domain;

import java.io.FileOutputStream;
import java.io.Serializable;
import java.net.URL;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.apache.commons.lang.StringUtils;

import com.loveme.util.AssertUtils;
import com.loveme.util.EntityUtils;
import com.loveme.util.ExceptionUtils;

/**
 * 
 * @author loudyn
 * 
 */
public class Configure implements Serializable {

	private static final long serialVersionUID = 1L;
	private static final String CONFIGURE_SER = "/META-INF/conf.ser";

	private static final Configure DEFAULT = new Configure().setTemplatePath("WEB-INF/front/template")
															.setResourcePath("resources")
															.setRecyclePath("recycle")
															.setAllowedResourceTypes("jpg,jpeg,bmp,gif,png,ico;txt,doc,docx,ppt,xls;js,css,xml")
															.setMaxResourceSize(5 * 1024 * 1024);

	public static Configure get() {

		Configure conf = null;
		try {
			URL url = Configure.class.getResource(CONFIGURE_SER);
			conf = (Configure) EntityUtils.deserialize(url.openStream());
		} catch (Exception e) {
			// ignore this exception,it always occur when never save configure
		}

		// always return a clone object
		Configure clone = (Configure) EntityUtils.clone(DEFAULT);
		return EntityUtils.nullSafe(conf, clone);
	}

	/**
	 * @return
	 */
	public final Configure put() {
		try {

			String file = Configure.class.getResource(CONFIGURE_SER).getFile();
			EntityUtils.serialize(this, new FileOutputStream(file));
			return this;
		} catch (Exception e) {
			throw ExceptionUtils.toUnchecked(e);
		}
	}

	private String rootPath;
	private String templatePath;
	private String resourcePath;
	private String recyclePath;
	private String allowedResourceTypes;
	private long maxResourceSize;

	
	public String getRecyclePath() {
		return recyclePath;
	}

	public Configure setRecyclePath(String recyclePath) {
		this.recyclePath = recyclePath;
		return this;
	}

	public String getRootPath() {
		return rootPath;
	}

	public Configure setRootPath(String rootPath) {
		this.rootPath = rootPath;
		return this;
	}

	public String getTemplatePath() {
		return templatePath;
	}

	public Configure setTemplatePath(String templatePath) {
		this.templatePath = templatePath;
		return this;
	}

	public String getResourcePath() {
		return resourcePath;
	}

	public Configure setResourcePath(String resourcePath) {
		this.resourcePath = resourcePath;
		return this;
	}

	public String getAllowedResourceTypes() {
		return allowedResourceTypes;
	}

	/**
	 * 
	 * @return
	 */
	public List<String> getAllowedResourceTypesAsList() {
		if (StringUtils.isBlank(getAllowedResourceTypes())) {
			return Collections.emptyList();
		}

		String[] types = getAllowedResourceTypes().toLowerCase().split("[\\s;,]");
		return Arrays.asList(types);
	}

	public Configure setAllowedResourceTypes(String allowedResourceTypes) {
		this.allowedResourceTypes = allowedResourceTypes;
		return this;
	}

	/**
	 * 
	 * @param type
	 * @return
	 */
	public boolean isAllowedResourceTypes(String type) {
		AssertUtils.hasLength(type);
		return getAllowedResourceTypesAsList().contains(type.toLowerCase());
	}

	public long getMaxResourceSize() {
		return maxResourceSize;
	}

	public Configure setMaxResourceSize(long maxResourceSize) {
		this.maxResourceSize = maxResourceSize;
		return this;
	}

	/**
	 * 
	 * @param bytes
	 * @return
	 */
	public boolean isOverflowResourceSize(long bytes) {
		return bytes > getMaxResourceSize();
	}
}

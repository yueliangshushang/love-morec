package com.love.morec.domain.template;

import java.util.Date;

import com.loveme.core.domain.AbstractDomain;
import com.loveme.util.FileUtils;

/**
 * 模板
 * 
 * @author tanjianna
 * 
 */
public class Template extends AbstractDomain {

	private static final long serialVersionUID = 1L;
	private String name;
	private String fileName;
	private String content;
	private String physicalUrl;
	private int sort;
	private Date updateTime;

	public int getSort() {
		return sort;
	}

	public void setSort(int sort) {
		this.sort = sort;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getPhysicalUrl() {
		return physicalUrl;
	}

	public Template setPhysicalUrl(String physicalUrl) {
		this.physicalUrl = physicalUrl;
		return this;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public Template setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
		return this;
	}

	public String getMajorName() {
		return FileUtils.getMajorName(getFileName());
	}

	public Template modify() {
		return setUpdateTime(new Date());
	}
}

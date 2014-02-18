package com.love.morec.domain.resource;

import com.loveme.core.domain.AbstractDomain;

/**
 * 回收站
 * @author Linxiaosheng
 */
public class Recycle extends AbstractDomain{
	
	private static final long serialVersionUID = 1L;
	private String name;
	private String physicalUrl;
	private String time;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPhysicalUrl() {
		return physicalUrl;
	}
	public void setPhysicalUrl(String physicalUrl) {
		this.physicalUrl = physicalUrl;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	

}

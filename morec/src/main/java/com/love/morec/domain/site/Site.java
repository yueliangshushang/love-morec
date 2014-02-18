package com.love.morec.domain.site;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.love.morec.domain.channel.Channel;
import com.loveme.core.domain.AbstractDomain;
/**
 * 站点
 * @author tanjianna
 *
 */
public class Site extends AbstractDomain{

	private static final long serialVersionUID = 1L;
	
    private List<Channel> channels = new ArrayList<Channel>();
	private String name;
	private String descr;
	private String copyRight;

	public List<Channel> getChannels() {
		if (null == this.channels) {
			return Collections.emptyList();
		}
		return channels;
	}
	public void setChannels(List<Channel> channels) {
		this.channels = channels;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescr() {
		return descr;
	}
	public void setDescr(String descr) {
		this.descr = descr;
	}
	public String getCopyRight() {
		return copyRight;
	}
	public void setCopyRight(String copyRight) {
		this.copyRight = copyRight;
	}
}

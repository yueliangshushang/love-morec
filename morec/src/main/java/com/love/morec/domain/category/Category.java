package com.love.morec.domain.category;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.codehaus.jackson.annotate.JsonIgnore;

import com.love.morec.domain.channel.Channel;
import com.loveme.core.domain.AbstractDomain;

public class Category extends AbstractDomain{
	private static final long serialVersionUID = 1L;
	private Category father;
	private String name;
	private String path;
	private Channel channel;
	private List<Category> children = new ArrayList<Category>();
	private List<Category> categoryNames = new ArrayList<Category>();
	
	@JsonIgnore
	public Category getFather() {
		return father;
	}
	public void setFather(Category father) {
		this.father = father;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public Channel getChannel() {
		return channel;
	}
	public void setChannel(Channel channel) {
		this.channel = channel;
	}
	public List<Category> getChildren() {
		if (null == this.children) {
			return Collections.emptyList();
		}		
		return children;
	}
	public void setChildren(List<Category> children) {
		this.children = children;
	}
	public List<Category> getCategoryNames() {
		return categoryNames;
	}
	public void setCategoryNames(List<Category> categoryNames) {
		this.categoryNames = categoryNames;
	}

}

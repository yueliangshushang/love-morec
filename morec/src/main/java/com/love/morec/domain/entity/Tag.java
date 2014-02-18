package com.love.morec.domain.entity;

import org.apache.solr.client.solrj.beans.Field;

/**
 * 
 * @author loudyn
 * 
 */
public class Tag {
	private String tag;
	@Field
	private String image;

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

}

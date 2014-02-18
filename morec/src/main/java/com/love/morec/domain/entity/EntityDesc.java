package com.love.morec.domain.entity;

import java.io.Serializable;

import org.apache.solr.client.solrj.beans.Field;

public class EntityDesc implements Serializable {
	
	private static final long serialVersionUID = 1L;
	@Field
	private String productId;
	@Field
	private String entityId;
	@Field
	private String desc;
	@Field
	private String creatTime;

	public String getProductId() {
		return productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}

	public String getEntityId() {
		return entityId;
	}

	public void setEntityId(String entityId) {
		this.entityId = entityId;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public String getCreatTime() {
		return creatTime;
	}

	public void setCreatTime(String creatTime) {
		this.creatTime = creatTime;
	}

}

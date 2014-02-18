package com.love.morec.domain.entity;

import java.io.Serializable;

import org.apache.commons.lang.StringUtils;
import org.apache.solr.client.solrj.beans.Field;

/**
 * 评价
 */
public class EntityComment implements Serializable {

	private static final long serialVersionUID = 1L;
	@Field
	private String id;
	@Field
	private String entityId;
	@Field
	private String productId;
	@Field
	private String username;
	@Field
	private String userid;
	@Field
	private String content;
	@Field
	private String score;// 1 好评 0中评 -1 差评
	@Field
	private String created;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getEntityId() {
		return entityId;
	}

	public void setEntityId(String entityId) {
		this.entityId = entityId;
	}

	public String getProductId() {
		return productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getUserid() {
		return (StringUtils.isEmpty(this.userid)) ? "000000" : this.userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getScore() {
		return (StringUtils.isEmpty(this.score)) ? "1" : this.score;
	}

	public void setScore(String score) {
		this.score = score;
	}

	public String getCreated() {
		return created;
	}

	public void setCreated(String created) {
		this.created = created;
	}

	public String getPercentum() {
		String scoreNum = (StringUtils.isEmpty(this.score)) ? "1" : this.score;
		if (StringUtils.equals("1" , scoreNum)) {
			return "100%";
		}else if(StringUtils.equals("0",scoreNum)){
			return "50%";
		}else{
			return "25%";
		}
	}
	public String getScoretum() {
		String scoreNum = (StringUtils.isEmpty(this.score)) ? "1" : this.score;
		if (StringUtils.equals("1" , scoreNum)) {
			return "100";
		}else if(StringUtils.equals("0",scoreNum)){
			return "50";
		}else{
			return "25";
		}
	}
	public String getSatisfaction() {
		String scoreNum = (StringUtils.isEmpty(this.score)) ? "1" : this.score;
		if (StringUtils.equals("1" , scoreNum)) {
			return "满意";
		}else if(StringUtils.equals("0",scoreNum)){
			return "中评";
		}else{
			return "差评";
		}
	}
}

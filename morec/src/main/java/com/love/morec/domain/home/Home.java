package com.love.morec.domain.home;

import java.util.Date;

import com.love.morec.domain.channel.Channel;
import com.loveme.core.domain.AbstractDomain;

/**
 * 
 * @author tanjianna
 *
 */
public class Home extends AbstractDomain {
	
	private static final long serialVersionUID = 1L;
	
	private String url;
	private String title;
	private String image;
	private Double price;
	private Integer sort;
	private Channel channel;
	private Integer isDisplay;
	private Integer isIdentify;
	private Date createTime;
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	public Integer getSort() {
		return sort;
	}
	public void setSort(Integer sort) {
		this.sort = sort;
	}
	public Channel getChannel() {
		return channel;
	}
	public void setChannel(Channel channel) {
		this.channel = channel;
	}
	public Integer getIsDisplay() {
		return isDisplay;
	}
	public void setIsDisplay(Integer isDisplay) {
		this.isDisplay = isDisplay;
	}
	public Integer getIsIdentify() {
		return isIdentify;
	}
	public void setIsIdentify(Integer isIdentify) {
		this.isIdentify = isIdentify;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

}

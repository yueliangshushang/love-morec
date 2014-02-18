package com.love.morec.domain.log;

import java.util.Date;

import com.loveme.core.domain.AbstractDomain;
/**
 * 
 * @author shuye
 *
 */
public class Log extends AbstractDomain{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String user;
	private Date date;
	private String content;
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	

}

package com.love.morec.domain.attribute;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import com.loveme.core.domain.AbstractDomain;

public class Attribute extends AbstractDomain{

	private static final long serialVersionUID = 1L;
	private String attr_name;
	private String attr_number;
	private String father_number;
	private String attr_value;
	private List<Attribute> children = new ArrayList<Attribute>();
	
	public String getAttr_name() {
		return attr_name;
	}
	public void setAttr_name(String attr_name) {
		this.attr_name = attr_name;
	}
	
	public String getAttr_number() {
		return attr_number;
	}
	public void setAttr_number(String attr_number) {
		this.attr_number = attr_number;
	}
	
	public String getFather_number() {
		return father_number;
	}
	public void setFather_number(String father_number) {
		this.father_number = father_number;
	}
	
	public String getAttr_value() {
		return attr_value;
	}
	public void setAttr_value(String attr_value) {
		this.attr_value = attr_value;
	}
	
	public List<Attribute> getChildren() {
		if (null == this.children) {
			return Collections.emptyList();
		}
		
		return children;
	}
	public void setChildren(List<Attribute> children) {
		this.children = children;
	}
	
	
}

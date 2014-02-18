package com.love.morec.application.attribute;

import java.util.List;
import java.util.Map;

import com.love.morec.domain.attribute.Attribute;

public interface AttributeService {
	/**
	 * 
	 * @param attr
	 * @return
	 */
	Attribute get(Integer id);

	/**
	 * 
	 * @param attr
	 */
	void save(Attribute attr);

	/**
	 * 
	 * @param attr
	 */
	void update(Attribute attr);

	/**
	 * 
	 * @param id
	 */
	void delete(Integer id);

	Attribute queryTopAttr(String attr_number);
	
	List<Attribute> queryAttrs(Map<String,String> attrQuery);
}

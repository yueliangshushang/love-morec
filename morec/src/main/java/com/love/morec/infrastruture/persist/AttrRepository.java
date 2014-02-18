package com.love.morec.infrastruture.persist;

import java.util.List;
import java.util.Map;

import com.love.morec.domain.attribute.Attribute;
import com.loveme.core.orm.Page;


public interface AttrRepository {
	/**
	 * 
	 * @param id
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
	
	Page<Attribute> queryChildPage(Page<Attribute> page,String father_number);
	
	Page<Attribute> queryPageByQ(Page<Attribute> page);

}

package com.love.morec.application.attribute.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.love.morec.application.attribute.AttributeService;
import com.love.morec.domain.attribute.Attribute;
import com.love.morec.infrastruture.annotation.Auditable;
import com.love.morec.infrastruture.persist.AttrRepository;

@Transactional
@Service
public class AttributeServiceImpl implements AttributeService{
	
	private AttrRepository attrRepository;
	
	@Autowired
	public void setAttrRepository(AttrRepository attrRepository) {
		this.attrRepository = attrRepository;
	}
	
	@Override
	public Attribute get(Integer id) {
		return attrRepository.get(id);
	}


	@Override
	@Auditable(action="添加属性")
	public void save(Attribute attr) {
		attrRepository.save(attr);
	}

	@Override
	@Auditable(action="更新属性")
	public void update(Attribute attr) {
		attrRepository.update(attr);
		
	}
	
	@Override
	@Auditable(action="删除属性")
	public void delete(Integer id) {
		attrRepository.delete(id);
	}
	
	@Override
	public  Attribute queryTopAttr(String attr_number){
		return attrRepository.queryTopAttr(attr_number);
	}
	
	@Override
	public List<Attribute> queryAttrs(Map<String,String> attrQuery){
		return attrRepository.queryAttrs(attrQuery);		
	}
	
}

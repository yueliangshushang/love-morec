package com.love.morec.infrastruture.persist.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.love.morec.domain.attribute.Attribute;
import com.love.morec.infrastruture.persist.AttrRepository;
import com.loveme.core.orm.Page;
import com.loveme.core.orm.mybatis.MybatisRepositorySupport;


@Repository
public class MybatisAttrRepository extends MybatisRepositorySupport<String, Attribute>
		implements AttrRepository {

	@Override
	protected String getNamespace() {
		return "com.love.morec.attribute";
	}
	
	@Override
	public Attribute get(Integer id){
		return (Attribute) getSqlSession().selectOne(getNamespace() + ".get", id);
	}
	@Override
	public void update(Attribute attribute) {
		getSqlSession().update(getNamespace() + ".update", attribute);
	}
	
	@Override
	public void delete(Integer id) {
		getSqlSession().delete(getNamespace() + ".deleteById", id);
	}

	@Override
	public Attribute queryTopAttr(String attr_number) {
		return (Attribute) getSqlSession().selectOne(getNamespace() + ".queryTopAttr",attr_number);
	}
	
	@Override
	public List<Attribute> queryAttrs(Map<String,String> attrQuery){
		List<Attribute> attrs = new ArrayList<Attribute>();
        Iterator<?> it = attrQuery.entrySet().iterator();
        while (it.hasNext()) {
            @SuppressWarnings("rawtypes")
			Map.Entry entry = (Map.Entry) it.next();
            Object key = entry.getKey();
            Object value = entry.getValue();
            Map<String,String> param = new HashMap<String,String>();
            param.put("attr_number", value.toString());
            param.put("father_number", key.toString());
            Attribute attr =  (Attribute)getSqlSession().selectOne(getNamespace() + ".queryAttrs",param);
            if(null != attr)
            	attrs.add(attr);
        }
        return attrs;	
	}
	
	@Override
	public Page<Attribute> queryChildPage(Page<Attribute> page,String father_number){		
		page.getParams().put("father",father_number);
		@SuppressWarnings("unchecked")
		List<Attribute> result = getSqlSession().selectList(getNamespace() + ".queryPageByFather", page);
		page.setResult(result);
		return page;		
	}
	
	@Override
	public Page<Attribute> queryPageByQ(Page<Attribute> page){
		@SuppressWarnings("unchecked")
		List<Attribute> result = getSqlSession().selectList(getNamespace() + ".queryPageByQ", page);
		page.setResult(result);
		return page;		
	}
	
}

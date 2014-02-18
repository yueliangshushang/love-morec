package com.love.morec.infrastruture.persist.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.love.morec.domain.resource.ResourceBean;
import com.love.morec.infrastruture.persist.RecycleRepository;
import com.loveme.core.orm.Page;
import com.loveme.core.orm.mybatis.MybatisRepositorySupport;

@Repository
public class MybatisRecycleRepositoryImpl extends MybatisRepositorySupport<String, ResourceBean> implements RecycleRepository{

	@Override
	protected String getNamespace() {
		return "com.love.morec.resourcebean";
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ResourceBean> query(Page<ResourceBean> page) {
		 return getSqlSession().selectList(getNamespace() + ".query");
	}

	@Override
	public void delete(String id) {
		getSqlSession().delete(getNamespace()+".delete",id);
	}

}

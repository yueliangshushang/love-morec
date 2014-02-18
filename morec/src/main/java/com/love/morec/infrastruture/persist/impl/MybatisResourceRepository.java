package com.love.morec.infrastruture.persist.impl;

import org.springframework.stereotype.Repository;

import com.love.morec.domain.resource.ResourceBean;
import com.love.morec.infrastruture.persist.ResourceRepository;
import com.loveme.core.orm.mybatis.MybatisRepositorySupport;

@Repository
public class MybatisResourceRepository extends MybatisRepositorySupport<String, ResourceBean> implements ResourceRepository {

	@Override
	protected String getNamespace() {
		return "com.love.morec.resourcebean";
	}
	
	@Override
	public void save(ResourceBean resourceBean) {

		getSqlSession().insert(getNamespace()+".save", resourceBean);
	}
	


}

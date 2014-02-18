package com.love.morec.infrastruture.persist.impl;

import org.springframework.stereotype.Repository;

import com.love.morec.domain.site.Site;
import com.love.morec.infrastruture.persist.SiteRepository;
import com.loveme.core.orm.mybatis.MybatisRepositorySupport;

@Repository
public class MybatisSiteRepository extends MybatisRepositorySupport<String, Site> implements SiteRepository {
	
	@Override
	protected String getNamespace() {
		return "com.love.morec.site";
	}
	@Override
	public void delete(String id) {
		getSqlSession().delete(getNamespace()+".deleteById", id);
	}
}

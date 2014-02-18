package com.love.morec.infrastruture.persist.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.love.morec.domain.taobao.TaobaoCrawlTask;
import com.love.morec.infrastruture.persist.TaobaoCrawlTaskRepository;
import com.loveme.core.orm.mybatis.MybatisRepositorySupport;

public class MybatisTaobaoCrawlTaskRepository extends MybatisRepositorySupport<String, TaobaoCrawlTask> implements TaobaoCrawlTaskRepository{
	
	@Override
	protected String getNamespace() {
		return "com.love.morec.taobao";
	}
	@SuppressWarnings("unchecked")
	@Override
	public List<TaobaoCrawlTask> query() {
		return getSqlSession().selectList(getNamespace() + ".query");
	}

	@Override
	public void save(TaobaoCrawlTask collect) {
		getSqlSession().insert(getNamespace() + ".save", collect);
	}

	@Override
	public void update(TaobaoCrawlTask collect) {
		getSqlSession().update(getNamespace() + ".update", collect);

	}

	@Override
	public void delete(String id) {
		getSqlSession().delete(getNamespace() + ".delete", id);
	}
	
	@Override
	public void updateTaobaoCrawlTaskStatus() {
		getSqlSession().update(getNamespace() + ".updateStatus");
	}
	

}

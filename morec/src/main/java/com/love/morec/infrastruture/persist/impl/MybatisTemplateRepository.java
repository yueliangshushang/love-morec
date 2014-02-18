package com.love.morec.infrastruture.persist.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.love.morec.domain.template.Template;
import com.love.morec.infrastruture.persist.TemplateRepository;
import com.loveme.core.orm.mybatis.MybatisRepositorySupport;

@Repository
public class MybatisTemplateRepository extends MybatisRepositorySupport<String, Template> implements TemplateRepository {

	@Override
	protected String getNamespace() {
		return "com.love.morec.template";
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Template> queryTemplates() {
		return getSqlSession().selectList(getNamespace() + ".queryTemplates");
	}

}

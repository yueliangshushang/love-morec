package com.love.morec.infrastruture.persist.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.love.morec.domain.log.Log;
import com.love.morec.infrastruture.persist.LogRepository;
import com.loveme.core.orm.Page;
import com.loveme.core.orm.mybatis.MybatisRepositorySupport;

@Repository
public class MybatisLogRepository extends MybatisRepositorySupport<String, Log> implements LogRepository {

	@Override
	protected String getNamespace() {
		return "com.love.morec.log";
	}

	@Override
	public void delete(String id) {
		// TODO Auto-generated method stub
		getSqlSession().delete(getNamespace() + ".deleteById", id);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Log> queryLogs() {
		// TODO Auto-generated method stub
		return getSqlSession().selectList(getNamespace() + ".queryLogs");
	}

	/**
	 * 按日期查询所有日志
	 */
	@SuppressWarnings("unchecked")
	public Page<Log> queryLogsByDate(Page<Log> page, String date) {
		page.getParams().put("startDate", "'" + date + " 00:00:00" + "'");
		page.getParams().put("endDate", "'" + date + " 23:59:59" + "'");
		List<Log> logs = getSqlSession().selectList(
				getNamespace() + ".queryLogsByDate", page);
		page.setResult(logs);
		return page;
	}

}

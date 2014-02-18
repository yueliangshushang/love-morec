package com.love.morec.infrastruture.persist;

import java.util.List;

import com.love.morec.domain.log.Log;
import com.loveme.core.orm.Page;

public interface LogRepository {
	/**
	 * 
	 * @param page
	 * @return
	 */
	Page<Log> queryPage(Page<Log> page);

	/**
	 * 
	 * @param id
	 * @return
	 */
	Log get(String id);

	/**
	 * 
	 * @param log
	 */
	void save(Log log);

	/**
	 * 
	 * @param log
	 */
	void update(Log log);

	/**
	 * 
	 * @param id
	 */
	void delete(String id);

	List<Log> queryLogs();

	/**
	 * 
	 * @return 日期查询的所有日志
	 */
	Page<Log> queryLogsByDate(Page<Log> page, String date);

}

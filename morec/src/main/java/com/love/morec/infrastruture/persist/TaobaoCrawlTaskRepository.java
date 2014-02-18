package com.love.morec.infrastruture.persist;

import java.util.List;

import com.love.morec.domain.taobao.TaobaoCrawlTask;
import com.loveme.core.orm.Page;

/**
 * @author Linxiaosheng
 */
public interface TaobaoCrawlTaskRepository {

	/**
	 * 
	 * @param id
	 * @return
	 */
	TaobaoCrawlTask get(String id);
	
	/**
	 * 
	 * @return
	 */
	List<TaobaoCrawlTask> query();

	/**
	 * 
	 * @param channel
	 */
	void save(TaobaoCrawlTask collect);

	/**
	 * 
	 * @param channel
	 */
	void update(TaobaoCrawlTask collect);
	/**
	 * 
	 * @param id
	 */
	void delete(String id);

	/**
	 * 
	 * @return
	 */
	Page<TaobaoCrawlTask> queryPage(Page<TaobaoCrawlTask> page);
	
	
	/**
	 * 
	 */
	void updateTaobaoCrawlTaskStatus();
}

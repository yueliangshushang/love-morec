package com.love.morec.application.site;


import com.love.morec.domain.site.Site;
import com.loveme.core.orm.Page;

public interface SiteService {
	/**
	 * 添加
	 * @param site
	 */
	void save(Site site);
	/**
	 * 删除
	 * @param id
	 */
	void delete(String id);
	/**
	 * 分页查询
	 * @param page
	 * @return
	 */
	Page<Site> queryPage(Page<Site> page);
	/**
	 * 根据id查询Site
	 * @param id
	 * @return
	 */
	Site get(String id);

	/**
	 * 更新
	 * @param site
	 */
	void update(Site site);
}

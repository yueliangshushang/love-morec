package com.love.morec.infrastruture.persist;


import com.love.morec.domain.site.Site;
import com.loveme.core.orm.Page;
/**
 * 
 * @author tanjianna
 *
 */
public interface SiteRepository {
	
	void save(Site site);
	
	void delete(String id);

	Page<Site> queryPage(Page<Site> page);

	Site get(String id);

	void update(Site site);
}

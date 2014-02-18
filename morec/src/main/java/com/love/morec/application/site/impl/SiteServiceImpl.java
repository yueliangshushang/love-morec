package com.love.morec.application.site.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.love.morec.application.site.SiteService;
import com.love.morec.domain.site.Site;
import com.love.morec.infrastruture.annotation.Auditable;
import com.love.morec.infrastruture.persist.SiteRepository;
import com.loveme.core.orm.Page;

/**
 * 
 * @author tanjianna
 * 
 */
@Transactional
@Service
public class SiteServiceImpl implements SiteService {

	private SiteRepository siteRepository;
	
	@Autowired
	public void setSiteRepository(SiteRepository siteRepository) {
		this.siteRepository = siteRepository;
	}

	@Override
	public Page<Site> queryPage(Page<Site> page) {
		return siteRepository.queryPage(page);
	}

	@Override
	public Site get(String id) {
		return siteRepository.get(id);
	}

	@Auditable(action="更新站点")
	public void update(Site site) {
		siteRepository.update(site);
	}

	@Auditable(action="添加站点")
	public void save(Site site) {
		siteRepository.save(site);
	}

	@Auditable(action="删除站点")
	public void delete(String id) {
		siteRepository.delete(id);
		
	}
	

}

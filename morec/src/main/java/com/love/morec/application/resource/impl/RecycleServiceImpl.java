package com.love.morec.application.resource.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.love.morec.application.resource.RecycleService;
import com.love.morec.domain.resource.ResourceBean;
import com.love.morec.infrastruture.persist.RecycleRepository;
import com.loveme.core.orm.Page;

@Service
public class RecycleServiceImpl implements RecycleService{

	@Autowired
	private RecycleRepository recycleRepository;
	
	@Override
	public Page<ResourceBean> queryPage(Page<ResourceBean> page) {
		return recycleRepository.queryPage(page);
	}

	@Override
	public ResourceBean get(String id) {
		return recycleRepository.get(id);
	}

	@Override
	public void delete(String id) {
		recycleRepository.delete(id);
	}
	
}

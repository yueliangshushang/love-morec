package com.love.morec.infrastruture.persist;

import java.util.List;

import com.love.morec.domain.resource.ResourceBean;
import com.loveme.core.orm.Page;

public interface RecycleRepository {

	
	List<ResourceBean> query(Page<ResourceBean> page);

	Page<ResourceBean> queryPage(Page<ResourceBean> page);

	ResourceBean get(String id);

	void delete(String id);
	
}

package com.love.morec.application.resource;

import com.love.morec.domain.resource.ResourceBean;
import com.loveme.core.orm.Page;

public interface RecycleService {

	Page<ResourceBean> queryPage(Page<ResourceBean> page);
	
	ResourceBean get(String id);

	void delete(String id);

}

package com.love.morec.infrastruture.persist;

import com.love.morec.domain.resource.ResourceBean;

/**
 * 
 * @author Linxiaosheng
 */
public interface ResourceRepository {
	
	public void save(ResourceBean resourceBean);
	
}

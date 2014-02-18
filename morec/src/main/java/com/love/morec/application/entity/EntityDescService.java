package com.love.morec.application.entity;

import com.love.morec.domain.entity.EntityDesc;

public interface EntityDescService {
	
	/**
	 * 根据id查询描述信息
	 * @param id
	 * @return
	 */
	EntityDesc get(String id);
}

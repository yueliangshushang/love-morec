package com.love.morec.application.resource;

import com.love.morec.domain.Configure;
import com.love.morec.domain.resource.ResourceBean;
import com.loveme.core.orm.Page;

/**
 * 
 * @author loudyn
 * 
 */
public interface ResourceService {

	/**
	 * 
	 * @param conf
	 * @param pathname
	 * @return
	 */
	ResourceBean get(Configure conf, String pathname);

	/**
	 * 
	 * @param conf
	 * @param pathname
	 * @param page 
	 * @return
	 */
	Page<ResourceBean> query(Configure conf, String pathname, Page<ResourceBean> page);

	/**
	 * 
	 * @param bean
	 */
	void recycle(ResourceBean bean);

	/**
	 * 
	 * @param sourcePath
	 * @param targerPath
	 */
	void cutFileToRecycle(String sourcePath, String targerPath);
	
}

package com.love.morec.infrastruture.persist;

import java.util.List;

import com.love.morec.domain.category.Category;
import com.loveme.core.orm.Page;


public interface CategoryRepository {

	/**
	 * 
	 * @param path
	 * @return
	 */
	Category queryUniqueByID(String id);
	
	/**
	 * 
	 * @param name
	 * @return
	 */
	Category queryUniqueByName(String name);

	/**
	 * 
	 * @param page
	 * @return
	 */
	Page<Category> queryPage(Page<Category> page);

	/**
	 * 
	 * @param id
	 * @return
	 */
	Category get(String id);
	

	/**
	 * 
	 * @param category
	 */
	void save(Category category);

	/**
	 * 
	 * @param category
	 */
	void update(Category category);
	/**
	 * 
	 * @param id
	 */
	void delete(String id);

	/**
	 * 
	 * @return
	 */
	List<Category> queryTop();
	/**
	 * 
	 * @return
	 */
	Page<Category> queryPageTop(Page<Category> page);

	/**
	 * 
	 * @param object
	 * @return
	 */
	List<Category> query(Object object);
	
	/**
	 * 
	 * @param id
	 * @return
	 */
	List<Category> queryChildById(String id);
	/**
	 * 
	 * @param id
	 * @return
	 */
	Page<Category> queryPageChildById(Page<Category> page ,String id);
	
	/**
	 * 
	 * @return
	 */
	List<Category> queryCategorys();
	
}

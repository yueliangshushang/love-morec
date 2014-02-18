package com.love.morec.application.category;

import java.util.List;

import com.love.morec.domain.category.Category;
import com.loveme.core.orm.Page;


public interface CategoryService {

	/**
	 * 
	 * @param id
	 * @return
	 */
	Category get(String id);
	
	/**
	 * 
	 * @param path
	 * @return
	 */
	Category queryUniqueByID(String path);
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
	 * @param category
	 */
	void save(Category category);

	/**
	 * 
	 * @param id
	 */
	void delete(String id);

	/**
	 * 
	 * @param category
	 */
	void update(Category category);

	/**
	 * 
	 * @param object
	 * @return
	 */
	List<Category> query(Object object);

	/**
	 * 
	 * @param category
	 * @return
	 */
	List<String> hotKeyWord(Category category);
	
	/**
	 * 
	 * @param id
	 * @return
	 */
	Page<Category> queryPageChildById(Page<Category> page,String id);
	/**
	 * 
	 * @param page
	 * @param id
	 * @return
	 */
	List<Category> queryChildById(String id);
	
	/**
	 * 
	 * @return
	 */
	List<Category> queryCategorys();
}

package com.love.morec.application.category.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.love.morec.application.category.CategoryService;
import com.love.morec.domain.category.Category;
import com.love.morec.infrastruture.annotation.Auditable;
import com.love.morec.infrastruture.persist.CategoryRepository;
import com.loveme.core.orm.Page;


@Transactional
@Service

public class CategoryServiceImpl implements CategoryService {

	private CategoryRepository categoryRepository;

	/**
	 * 
	 * @param categoryRepository
	 */
	@Autowired
	public void setCategoryRepository(CategoryRepository categoryRepository) {
		this.categoryRepository = categoryRepository;
	}

	/*
	 * (non-Javadoc)
	 * @see com.youboy.morec.application.channel.CategoryService#queryUniqueByPath(java.lang.String)
	 */
	@Override
	public Category queryUniqueByID(String id) {
		return categoryRepository.queryUniqueByID(id);
	}
	
	/*
	 * (non-Javadoc)
	 * @see com.youboy.morec.application.channel.CategoryService#queryUniqueByName(java.lang.String)
	 */
	@Override
	public Category queryUniqueByName(String name) {
		return categoryRepository.queryUniqueByName(name);
	}
	

	/*
	 * (non-Javadoc)
	 * @see com.youboy.morec.application.channel.CategoryService#queryPage(com.youboy.core.orm.Page)
	 */
	@Override
	public Page<Category> queryPage(Page<Category> page) {
		return categoryRepository.queryPage(page);
	}

	/*
	 * (non-Javadoc)
	 * @see com.youboy.morec.application.channel.CategoryService#get(java.lang.String)
	 */
	@Override
	public Category get(String id) {
		return categoryRepository.get(id);
	}

	/*
	 * (non-Javadoc)
	 * @see com.youboy.morec.application.channel.CategoryService#save(com.youboy.morec.domain.channel.Channel)
	 */
	@Override
	@Auditable(action="添加栏目")
	public void save(Category category) {
		categoryRepository.save(category);
	}

	/*
	 * (non-Javadoc)
	 * @see com.youboy.morec.application.channel.CategoryService#update(com.youboy.morec.domain.channel.Channel)
	 */
	@Auditable(action="更新栏目")
	public void update(Category category) {
		categoryRepository.update(category);
		
	}

	/*
	 * (non-Javadoc)
	 * @see com.youboy.morec.application.channel.CategoryService#delete(java.lang.String)
	 */
	@Auditable(action="删除栏目")
	public void delete(String id) {
		categoryRepository.delete(id);
	}

	/*
	 * (non-Javadoc)
	 * @see com.youboy.morec.application.channel.CategoryService#queryTop()
	 */
	@Override
	public List<Category> queryTop() {
		
		List<Category> categories = categoryRepository.queryTop();
		for (int i = 0; i < categories.size(); i++) {
			for (int j = 0; j < categories.get(i).getChildren().size(); j++){
				categories.get(i).getChildren().get(j).setChildren(queryUniqueByID(categories.get(i).getChildren().get(j).getId()).getChildren());				
			}	
		}
		return categories;
	}
	
	
	@Override
	public Page<Category> queryPageTop(Page<Category> page) {
		return categoryRepository.queryPageTop(page);
	}
	

	/*
	 * (non-Javadoc)
	 * @see com.youboy.morec.application.channel.CategoryService#query(java.lang.Object)
	 */
	@Override
	public List<Category> query(Object object) {
		return categoryRepository.query(object);
	}
	

	@Override
	public Page<Category> queryPageChildById(Page<Category> page,String id)
	{
		return categoryRepository.queryPageChildById(page,id);
	}
	
	
	@Override
	public List<Category> queryChildById(String id)
	{
		return categoryRepository.queryChildById(id);
	}


	@Override
	public List<Category> queryCategorys()
	{
		return categoryRepository.queryCategorys();
	}

	@Override
	public List<String> hotKeyWord(Category category) {
		return null;
	}
}

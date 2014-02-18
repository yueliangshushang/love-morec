package com.love.morec.infrastruture.persist.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.love.morec.domain.category.Category;
import com.love.morec.infrastruture.persist.CategoryRepository;
import com.loveme.core.orm.Page;
import com.loveme.core.orm.mybatis.MybatisRepositorySupport;

@Repository
public class MybatisCategoryRepository extends MybatisRepositorySupport<String, Category> implements CategoryRepository {

	@Override
	protected String getNamespace() {
		return "com.love.morec.category";
	}

	@Override
	public Category queryUniqueByID(String id) {
		return (Category) getSqlSession().selectOne(getNamespace() + ".queryUniqueByID", id);
	}

	@Override
	public Category queryUniqueByName(String name) {
		return (Category) getSqlSession().selectOne(getNamespace() + ".queryUniqueByName", name);
	}

	@SuppressWarnings("unchecked")
	@Override
	public void delete(String id) {
		List<Category> list =getSqlSession().selectList(getNamespace() + ".delbefore", id);
		System.out.println(list.size());
		if(list.size()>0){
			for(int j=0;j<list.size();j++){
				List<Category> list2 = list.get(0).getChildren();
				for (Category category : list2) {
					getSqlSession().delete(getNamespace() + ".deleteById", category.getId());
				}
			}
			getSqlSession().delete(getNamespace() + ".deleteById", id);
		}else{

			getSqlSession().delete(getNamespace() + ".deleteById", id);
			
		}
		
	}
	
	@Override
	public void update(Category category){
		getSqlSession().update(getNamespace()+".update",category);
	
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Category> queryTop() {
		return getSqlSession().selectList(getNamespace() + ".queryTop");
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public Page<Category> queryPageTop(Page<Category> page) {
		List<Category> channels = getSqlSession().selectList(getNamespace() + ".queryPageTop",page);
		page.setResult(channels);
		return page;
	}



	@SuppressWarnings("unchecked")
	@Override
	public List<Category> queryChildById(String id)
	{
		return getSqlSession().selectList(getNamespace() + ".queryChildById",id);
	}
	
	@SuppressWarnings("unchecked")
	public Page<Category> queryPageChildById(Page<Category> page,String id)
	{
		page.getParams().put("id", id);
		List<Category> categories = getSqlSession().selectList(getNamespace() + ".queryPageChildById",page);
		page.setResult(categories);
		return page;
	}


	@SuppressWarnings("unchecked")
	@Override
	public List<Category> queryCategorys()
	{
		return getSqlSession().selectList(getNamespace()+".queryCategorys");
	}


}

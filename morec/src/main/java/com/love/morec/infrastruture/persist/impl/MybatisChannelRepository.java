package com.love.morec.infrastruture.persist.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.love.morec.domain.channel.Channel;
import com.love.morec.infrastruture.persist.ChannelRepository;
import com.loveme.core.orm.Page;
import com.loveme.core.orm.mybatis.MybatisRepositorySupport;

@Repository
public class MybatisChannelRepository extends MybatisRepositorySupport<String, Channel> implements ChannelRepository {

	@Override
	protected String getNamespace() {
		return "com.love.morec.channel";
	}

	@Override
	public Channel queryUniqueByPath(String path) {
		return (Channel) getSqlSession().selectOne(getNamespace() + ".queryUniqueByPath", path);
	}

	@Override
	public Channel queryUniqueByName(String name) {
		return (Channel) getSqlSession().selectOne(getNamespace() + ".queryUniqueByName", name);
	}

	@SuppressWarnings("unchecked")
	@Override
	public void delete(String id) {
		List<Channel> list =getSqlSession().selectList(getNamespace() + ".delbefore", id);
		System.out.println(list.size());
		if(list.size()>0){
			for(int j=0;j<list.size();j++){
				List<Channel> list2 = list.get(0).getChildren();
				for (Channel channel : list2) {
					getSqlSession().delete(getNamespace() + ".deleteById", channel.getId());
				}
			}
			getSqlSession().delete(getNamespace() + ".deleteById", id);
		}else{

			getSqlSession().delete(getNamespace() + ".deleteById", id);
			
		}
		
	}
	
	@Override
	public void update(Channel channel){
		getSqlSession().update(getNamespace()+".update",channel);
	
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Channel> queryTop() {
		return getSqlSession().selectList(getNamespace() + ".queryTop");
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public Page<Channel> queryPageTop(Page<Channel> page) {

		List<Channel> channels = getSqlSession().selectList(getNamespace() + ".queryPageTop",page);
		page.setResult(channels);
		return page;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Channel> queryChildById(String id)
	{
		return getSqlSession().selectList(getNamespace() + ".queryChildById",id);
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public Page<Channel> queryPageChildById(Page<Channel> page,String id)
	{
		page.getParams().put("id", id);
		List<Channel> channels = getSqlSession().selectList(getNamespace() + ".queryPageChildById",page);
		page.setResult(channels);
		return page;
	}


	@SuppressWarnings("unchecked")
	@Override
	public List<Channel> queryChannels()
	{
		return getSqlSession().selectList(getNamespace()+".queryChannels");
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Channel> queryBrotherChannels(String fatherId) {
		return getSqlSession().selectList(getNamespace()+".queryBrotherChannels",fatherId);
	}


}

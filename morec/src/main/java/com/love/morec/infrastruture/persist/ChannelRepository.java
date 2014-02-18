package com.love.morec.infrastruture.persist;

import java.util.List;

import com.love.morec.domain.channel.Channel;
import com.loveme.core.orm.Page;


public interface ChannelRepository {

	Channel queryUniqueByPath(String path);
	Channel queryUniqueByName(String name);
	Page<Channel> queryPage(Page<Channel> page);
	Channel get(String id);
	void save(Channel channel);
	void update(Channel channel);
	void delete(String id);
	List<Channel> queryTop();
	Page<Channel> queryPageTop(Page<Channel> page);
	List<Channel> query(Object object);
	List<Channel> queryChildById(String id);
	Page<Channel> queryPageChildById(Page<Channel> page ,String id);
	List<Channel> queryChannels();
	List<Channel> queryBrotherChannels(String fatherId);
}

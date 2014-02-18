package com.love.morec.application.channel;

import java.util.List;
import java.util.Map;

import com.love.morec.domain.channel.Channel;
import com.loveme.core.orm.Page;

public interface ChannelService {
	Channel get(String id);
	Channel queryUniqueByPath(String path);
	Channel queryUniqueByName(String name);
	Page<Channel> queryPage(Page<Channel> page);
	List<Channel> queryTop();
	Page<Channel> queryPageTop(Page<Channel> page);
	void save(Channel channel);
	void delete(String id);
	void update(Channel channel);
	//Channel getMostSimilar(String title);
	List<Channel> query(Object object);
	List<String> hotKeyWord(Channel channel);
	Page<Channel> queryPageChildById(Page<Channel> page,String id);
	List<Channel> queryChildById(String id);
	List<Channel> queryChannels();
	List<Channel> queryBrotherChannels(String fatherId);
	Map<String, String> classfiyToChannelname();
}

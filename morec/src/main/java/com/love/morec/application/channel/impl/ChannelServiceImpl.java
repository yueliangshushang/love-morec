package com.love.morec.application.channel.impl;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.love.morec.application.channel.ChannelClassifierPopulator;
import com.love.morec.application.channel.ChannelService;
import com.love.morec.domain.channel.Channel;
import com.love.morec.infrastruture.ChannelClassifier;
import com.love.morec.infrastruture.annotation.Auditable;
import com.love.morec.infrastruture.persist.ChannelRepository;
import com.loveme.core.orm.Page;

@Transactional
@Service
public class ChannelServiceImpl implements ChannelService {
	
	private ChannelRepository channelRepository;
    @Autowired
    public void setChannelRepository(ChannelRepository channelRepository) {
          this. channelRepository = channelRepository;
   }

    //private ChannelClassifierPopulator populator;

    /**
    *
    * @param populator
    */
   // @Autowired
   // public void setPopulator(ChannelClassifierPopulator populator) {
    //      this. populator = populator;
  // }

	@Override
	public Channel queryUniqueByPath(String path) {
		return channelRepository.queryUniqueByPath(path);
	}

	@Override
	public Channel queryUniqueByName(String name) {
		return channelRepository.queryUniqueByName(name);
	}

	@Override
	public Page<Channel> queryPage(Page<Channel> page) {
		return channelRepository.queryPage(page);
	}

	@Override
	public Channel get(String id) {
		return channelRepository.get(id);
	}

	@Override
	@Auditable(action = "添加栏目")
	public void save(Channel channel) {
		channelRepository.save(channel);
	}

	@Auditable(action = "更新栏目")
	public void update(Channel channel) {
		channelRepository.update(channel);
	}

	@Auditable(action = "删除栏目")
	public void delete(String id) {
		channelRepository.delete(id);
	}

	//@Override
	//public Channel getMostSimilar(String title) {
		//ChannelClassifier classifier = populator.populate();
		//return classifier.classify(title);
	//}

	@Override
	public List<Channel> queryTop() {
		return channelRepository.queryTop();
	}

	@Override
	public Page<Channel> queryPageTop(Page<Channel> page) {
		return channelRepository.queryPageTop(page);
	}

	@Override
	public List<Channel> query(Object object) {
		return channelRepository.query(object);
	}

	@Override
	public List<String> hotKeyWord(Channel channel) {
		String[] hotWords = channel.getHotKeyWord().split(";");
		return Arrays.asList(hotWords);
	}

	@Override
	public Page<Channel> queryPageChildById(Page<Channel> page, String id) {
		return channelRepository.queryPageChildById(page, id);
	}

	@Override
	public List<Channel> queryChildById(String id) {
		return channelRepository.queryChildById(id);
	}

	@Override
	public List<Channel> queryChannels() {
		return channelRepository.queryChannels();
	}

	@Override
	public List<Channel> queryBrotherChannels(String fatherId) {
		return channelRepository.queryBrotherChannels(fatherId);
	}
	
	private Map<String,String> queryChannels;
	
	@Override
	public Map<String,String> classfiyToChannelname(){
		Channel navheader=null;		
		if(this.queryChannels!=null){
			return this.queryChannels;
		}
		List<Channel> allQuerys = this.queryChannels();
		this.queryChannels=new HashMap<String, String>();
		for (Channel channel : allQuerys) {
			if(channel.getFather()!=null){
					Channel channelFather = this.queryUniqueByName(channel.getFather().getName());
					navheader = channel.getFather();
				if(channelFather!=null && channelFather.getFather()!=null){
					Channel fatherchannels = this.queryUniqueByName(channelFather.getFather().getName());
					navheader = fatherchannels;
				}
				this.queryChannels.put(channel.getId(), navheader.getId());
				//this.queryChannels.put(channel.getName(), navheader.getPath());
			}else{
				this.queryChannels.put(channel.getId(), channel.getId());
				//this.queryChannels.put(channel.getName(), channel.getPath());
			}
			
		}
		return queryChannels;		
	}
}

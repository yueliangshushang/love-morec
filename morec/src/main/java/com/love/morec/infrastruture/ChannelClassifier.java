package com.love.morec.infrastruture;

import java.util.List;

import com.love.morec.domain.channel.Channel;

public interface ChannelClassifier {

	Channel classify(String title);

	Channel classify(List<String> tags);
}

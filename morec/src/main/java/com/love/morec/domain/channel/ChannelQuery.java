package com.love.morec.domain.channel;

/**
 * 栏目 与  对应栏目的标签
 * @author loudyn
 *
 */
public class ChannelQuery {
	private final String query;
	private final Channel channel;

	/**
	 * 
	 * @param channel 栏目
	 * @param query 栏目标签
	 */
	public ChannelQuery(Channel channel, String query) {
		this.channel = channel;
		this.query = query;
	}

	/**
	 * 
	 * @return
	 */
	public String getQuery() {
		return this.query;
	}

	/**
	 * 
	 * @return
	 */
	public Channel getChannel() {
		return this.channel;
	}

}

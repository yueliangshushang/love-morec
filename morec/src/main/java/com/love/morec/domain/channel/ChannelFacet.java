package com.love.morec.domain.channel;

/**
 * 栏目 与  对应 栏目中的商品个数
 */
public class ChannelFacet {
	
	private final Channel channel;
	private Integer number;
	/**
	 * 
	 * @param channel 栏目
	 * @param query 栏目中的商品个数
	 */
	public ChannelFacet(Channel channel, Integer number) {
		this.channel = channel;
		this.number = number;
	}
	public Integer getNumber() {
		return number;
	}
	public void setNumber(Integer number) {
		this.number = number;
	}
	public Channel getChannel() {
		return channel;
	}
}

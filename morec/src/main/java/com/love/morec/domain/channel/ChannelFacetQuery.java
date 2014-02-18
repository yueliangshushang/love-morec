package com.love.morec.domain.channel;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import com.loveme.util.AssertUtils;

public class ChannelFacetQuery {

	/**
	 * 标签  > 栏目
	 */
	private Map<String, Channel> channelFacetQueryTable = new HashMap<String, Channel>();
	/**
	 * 栏目  > 栏目个数
	 */
	private Map<String, ChannelFacet> channelFacetResult = new TreeMap<String, ChannelFacet>();

	/**
	 * 
	 * @param channelQueries
	 */
	public ChannelFacetQuery(List<ChannelQuery> channelQueries) {
		AssertUtils.notEmpty(channelQueries);
		
		for (ChannelQuery query : channelQueries) {
			channelFacetQueryTable.put(query.getQuery(), query.getChannel());
		}
	}

	/**
	 * 
	 * @param query
	 * @param facetCount
	 * @return
	 */
	public ChannelFacetQuery updateQueryResult(String query, int facetCount) {
		if (!channelFacetQueryTable.containsKey(query)) {
			throw new UnsupportedOperationException("Make sure the query has submitted on this request!");
		}
		Channel channel = channelFacetQueryTable.get(query);
		channelFacetResult.put(channel.getId(),
						new ChannelFacet(channel, facetCount));
		return this;
	}

	public String[] getFacetQueries() {
		return channelFacetQueryTable.keySet().toArray(new String[] {});
	}

	public Map<String, ChannelFacet> getFacetQueryResult() {
		return channelFacetResult;
	}

}

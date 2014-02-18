package com.love.morec.domain.channel;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import com.love.morec.domain.entity.Entity;
import com.loveme.util.AssertUtils;

/**
 * 
 * @author loudyn
 *
 */
public class ChannelGroupQuery {
	/**
	 * 标签  > 栏目
	 */
	private Map<String, Channel> channelGroupQueryTable = new HashMap<String, Channel>();
	/**
	 * 栏目Id > 商品信息
	 */
	private Map<String, List<Entity>> channelGroupResult = new TreeMap<String, List<Entity>>();

	/**
	 * 
	 * @param channelQueries
	 */
	public ChannelGroupQuery(List<ChannelQuery> channelQueries) {
		AssertUtils.notEmpty(channelQueries);

		for (ChannelQuery query : channelQueries) {
			channelGroupQueryTable.put(query.getQuery(), query.getChannel());
		}

	}

	/**
	 * 
	 * @param query
	 * @param clothings
	 * @return
	 */
	public ChannelGroupQuery updateQueryResult(String query, List<Entity> entitys) {
		if (!channelGroupQueryTable.containsKey(query)) {
			throw new UnsupportedOperationException("Make sure the query has submitted on this request!");
		}
		channelGroupResult.put(channelGroupQueryTable.get(query).getId(), entitys);
		return this;
	}

	/**
	 * 
	 * @return
	 */
	public String[] getGroupQueries() {
		return channelGroupQueryTable.keySet().toArray(new String[] {});
	}

	/**
	 * 
	 * @return
	 */
	public Map<String, List<Entity>> getGroupQueryResult() {
		return channelGroupResult;
	}

}

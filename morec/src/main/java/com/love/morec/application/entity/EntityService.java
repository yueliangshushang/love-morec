package com.love.morec.application.entity;

import java.util.List;
import java.util.Map;

import com.love.morec.domain.channel.ChannelFacetQuery;
import com.love.morec.domain.channel.ChannelGroupQuery;
import com.love.morec.domain.entity.Entity;
import com.love.morec.domain.entity.MoreLikeThis;
import com.love.morec.domain.entity.Neighbour;
import com.love.morec.domain.entity.Tag;
import com.loveme.core.orm.Page;

public interface EntityService {

	/**
	 * 根据关键词搜索查询
	 * @param queryString
	 * @param page
	 * @return
	 */
	Page<Entity> queryPage(String queryString, Page<Entity> page);

	/**
	 * 
	 * @param queryString
	 * @param page
	 * @param queryFacet
	 * @return
	 */
	Page<Entity> queryPageWithFacet(String queryString, Page<Entity> page, ChannelFacetQuery queryFacet);

	/**
	 * 主要用于首页
	 * 栏目id > 商品信息
	 * 和 mysql 的group by 意思相近
	 * @param channelGroupQuery
	 * @return
	 */
	Map<String, List<Entity>> queryByGroup(ChannelGroupQuery channelGroupQuery);

	/**
	 * 根据id查询信息
	 * @param id
	 * @return
	 */
	Entity get(String id);

	/**
	 * 添加信息
	 * @param cosmetic
	 */
	void save(Entity entity);
	/**
	 * 添加信息List
	 * @param entitys
	 */
	void save(List<Entity> entitys);

	/**
	 * 删除信息
	 * @param id
	 */
	void delete(String id);

	/**
	 * MoreLikeThis 根据id查找相关信息
	 * @param id
	 * @return
	 */
	MoreLikeThis queryMoreLikeThis(String id);

	List<Tag> queryTags(Entity entity);

	Neighbour queryNeighbour(Entity entity);

	public List<Entity> samePrice(Double price, String queryString);

	/**
	 * 热卖推荐
	 * @param queryString
	 * @return
	 */
	List<Entity> hotSale(String queryString,Integer start,Integer limit);
	
	/**
	 * 新卖推荐
	 * @param queryString
	 * @return
	 */
	List<Entity> newSale(String queryString,Integer start,Integer limit);
	/**
	 * 根据title分词 打标签
	 * @param title
	 * @return
	 */
	String analyzeTitle(String title);
	/**
	 * 哈希码
	 * @param id
	 * @return
	 */
	int hash(String id);
	/**
	 * 
	 * @param queryString
	 * @param entity
	 * @return
	 */
	Entity similarTitle(String queryString,Entity entity);
}

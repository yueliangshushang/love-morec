package com.love.morec.application.entity.impl;

import java.io.StringReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.analysis.TokenStream;
import org.apache.lucene.analysis.tokenattributes.CharTermAttribute;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrQuery.ORDER;
import org.apache.solr.client.solrj.impl.CommonsHttpSolrServer;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.wltea.analyzer.lucene.IKAnalyzer;

import com.love.morec.application.entity.EntityService;
import com.love.morec.domain.channel.ChannelFacetQuery;
import com.love.morec.domain.channel.ChannelGroupQuery;
import com.love.morec.domain.entity.AsyncNeighbour;
import com.love.morec.domain.entity.Entity;
import com.love.morec.domain.entity.MoreLikeThis;
import com.love.morec.domain.entity.Neighbour;
import com.love.morec.domain.entity.Tag;
import com.love.morec.infrastruture.annotation.Auditable;
import com.love.morec.infrastruture.solr.GroupQueryResponse;
import com.love.morec.infrastruture.solr.MoreLikeThisQueryResponse;
import com.love.morec.infrastruture.solr.SolrQueryBuilder;
import com.love.morec.infrastruture.task.AsyncAction;
import com.love.morec.infrastruture.task.AsyncActionAdapter;
import com.love.morec.infrastruture.task.AsyncActionAssigner;
import com.love.morec.infrastruture.task.AsyncActionAssigner.AsyncToken;
import com.loveme.core.orm.Page;
import com.loveme.util.AssertUtils;
import com.loveme.util.ExceptionUtils;
import com.loveme.util.SensitiveWordFilter;

public class EntityServiceImpl implements EntityService {

	private final String queryNeighbourField = "idAsHash";
	private final List<String> luceneKeywords = Arrays.asList(new String[] {
			"+", "-", "\"", "!", "(", ")", "{", "}", "[", "]", "^", "~", "*",
			"?", ":", "\\", });
	private final SensitiveWordFilter luceneKeywordFilter = new SensitiveWordFilter()
			.addFilterWords(luceneKeywords);
	private CommonsHttpSolrServer solrServer;
	private int moreLikeThisQueryCount = 15;
	private int groupQueryCount = 12;
	private int rangeScope = 8192;
	private int anchorLinkSearchScope = 1000;
	private long joinQueryRequestMilliSeconds = 1000;

	private static final int MAX_TAGS_LENGTH = 20;
	private final Analyzer analyzer = new IKAnalyzer(true);

	@Autowired
	public void setSolrServer(CommonsHttpSolrServer solrServer) {
		this.solrServer = solrServer;
	}
	public void setMoreLikeThisQueryCount(int moreLikeThisQueryCount) {
		AssertUtils.isTrue(moreLikeThisQueryCount > 0);
		this.moreLikeThisQueryCount = moreLikeThisQueryCount;
	}
	public void setGroupQueryCount(int groupQueryCount) {
		AssertUtils.isTrue(groupQueryCount > 0);
		this.groupQueryCount = groupQueryCount;
	}
	public void setRangeScope(int rangeScope) {
		AssertUtils.isTrue(rangeScope > 0);
		this.rangeScope = rangeScope;
	}
	public void setAnchorLinkSearchScope(int anchorLinkSearchScope) {
		AssertUtils.isTrue(anchorLinkSearchScope > 0);
		this.anchorLinkSearchScope = anchorLinkSearchScope;
	}
	public void setJoinQueryRequestMilliSeconds(
			long joinQueryRequestMilliSeconds) {
		AssertUtils.isTrue(joinQueryRequestMilliSeconds > 0);
		this.joinQueryRequestMilliSeconds = joinQueryRequestMilliSeconds;
	}

	@Override
	public Page<Entity> queryPage(String queryString, Page<Entity> page) {

		try {

			SolrQueryBuilder builder = new SolrQueryBuilder()
					.withQueryString(queryString)
					.withOffset(page.getFirst() - 1)
					.withSize(page.getPageSize())
					.withSort(page.getOrder(), page.getOrderBy());

			QueryResponse response = solrServer.query(builder.build());
			if (isEmptyResult(response)) {
				return page.setResult(Collections.<Entity> emptyList());
			}

			page.setResult(getBeans(response)).setTotalCount(
					getTotalCount(response));

		} catch (Exception e) {
			e.printStackTrace();
			page.setResult(Collections.<Entity> emptyList());
		}

		return page;
	}

	private List<Entity> getBeans(QueryResponse response) {
		return response.getBeans(Entity.class);
	}

	private long getTotalCount(QueryResponse response) {
		return response.getResults().getNumFound();
	}


	@Override
	public Page<Entity> queryPageWithFacet(String queryString,Page<Entity> page, ChannelFacetQuery queryFacet) {
		try {
			SolrQueryBuilder builder = new SolrQueryBuilder()
					.withFacetQueries(queryFacet.getFacetQueries())
					.withQueryString(String.format("classify:%s", "(" + queryString + ")")).withOffset(page.getFirst() - 1)
					.withSize(page.getPageSize())
					.withSort(page.getOrder(), page.getOrderBy());

			QueryResponse response = solrServer.query(builder.build());
			updateChannelFacetQueries(response, queryFacet);

			if (isEmptyResult(response)) {
				return page.setResult(Collections.<Entity> emptyList());
			}

			page.setResult(getBeans(response)).setTotalCount(getTotalCount(response));
		} catch (Exception e) {
			ExceptionUtils.toUnchecked(e);
			page.setResult(Collections.<Entity> emptyList());
		}

		return page;
	}

	private void updateChannelFacetQueries(QueryResponse response,
			ChannelFacetQuery facetQuery) {
		Map<String, Integer> facetQueryResult = response.getFacetQuery();

		for (Map.Entry<String, Integer> entry : facetQueryResult.entrySet()) {
			facetQuery.updateQueryResult(entry.getKey(), entry.getValue());
		}
	}

	@Override
	public Map<String, List<Entity>> queryByGroup(ChannelGroupQuery channelGroupQuery) {

		try {

			SolrQueryBuilder builder = new SolrQueryBuilder().withOffset(0)
					.withQueryString("*:*")
					.withGroupLimit(this.groupQueryCount)
					.withGroupSort("randomRegion", "desc")
					.withGroupQueries(channelGroupQuery.getGroupQueries());

			// create a groupQueryResponse to extract the group result
			GroupQueryResponse groupQueryResponse = new GroupQueryResponse(
					solrServer.query(builder.build()));
			for (String query : channelGroupQuery.getGroupQueries()) {
				List<Entity> entitys = groupQueryResponse.getGroupResult(query,
						Entity.class);
				channelGroupQuery.updateQueryResult(query, entitys);
			}

			return channelGroupQuery.getGroupQueryResult();
		} catch (Exception e) {
			e.printStackTrace();
			throw ExceptionUtils.toUnchecked(e);
		}
	}

	@Override
	public Entity get(String id) {
		assertIdFriendly(id);
		try {

			// to use filterCache,we use q="*:*"&fq=id:?
			SolrQueryBuilder builder = new SolrQueryBuilder()
					.withQueryString("*:*")
					.withFilterQuery(String.format("id:%s", id)).withOffset(0)
					.withSize(1);

			QueryResponse response = solrServer.query(builder.build());
			if (isEmptyResult(response)) {
				return null;
			}

			return getBeansAsSingle(response);
		} catch (Exception e) {
			throw ExceptionUtils.toUnchecked(e);
		}
	}

	private Entity getBeansAsSingle(QueryResponse response) {
		return response.getBeans(Entity.class).get(0);
	}

	private boolean isEmptyResult(QueryResponse response) {
		if (null == response.getResults()) {
			return true;
		}

		return response.getResults().getNumFound() <= 0;
	}

	@Auditable(action = "添加实体")
	public void save(Entity entity) {
		try {
			solrServer.addBean(entity);
			solrServer.commit();
		} catch (Exception e) {
			throw ExceptionUtils.toUnchecked(e);
		}
	}

	@Auditable(action = "添加多个实体")
	public void save(List<Entity> entitys) {
		try {
			solrServer.addBeans(entitys);
			solrServer.commit();
		} catch (Exception e) {
			throw ExceptionUtils.toUnchecked(e);
		}
	}

	@Auditable(action = "删除实体")
	public void delete(String id) {

		assertIdFriendly(id);
		try {

			solrServer.deleteById(id);
			solrServer.commit();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@Override
	public MoreLikeThis queryMoreLikeThis(String id) {
		assertIdFriendly(id);
		try {

			SolrQueryBuilder builder = new SolrQueryBuilder()
					.withQueryString(String.format("id:%s", id))
					.withOffset(0)
					.withMoreLikeThisFields(new String[] { "sitename", "brand" })
					.withMoreLikeThisDocCount(this.moreLikeThisQueryCount);

			MoreLikeThisQueryResponse response = new MoreLikeThisQueryResponse(solrServer.query(builder.build()));

			return new MoreLikeThis(response.getMatchBeans(Entity.class),response.getMoreLikeThisBeans(Entity.class));
		} catch (Exception e) {
			throw ExceptionUtils.toUnchecked(e);
		}
	}

	@Override
	public Neighbour queryNeighbour(Entity entity) {
		try {
			AsyncNeighbour neighbour = new AsyncNeighbour();
			AsyncToken token = forkQueryRequest(neighbour, entity);
			joinQueryRequest(token);
			return neighbour;
		} catch (Exception e) {
			throw ExceptionUtils.toUnchecked(e);
		}
	}

	private AsyncToken forkQueryRequest(final AsyncNeighbour neighbour,final Entity entity) {
		AsyncAction queryPrevAction = new AsyncActionAdapter() {
			@Override
			public void execute() throws Exception {
				neighbour.setPrev(queryPrevMoreCCC(entity));
			}
		};
		AsyncAction queryNextAction = new AsyncActionAdapter() {
			@Override
			public void execute() throws Exception {
				neighbour.setNext(queryNextMoreCCC(entity));
			}
		};
		return AsyncActionAssigner.compoAssign(queryPrevAction, queryNextAction);
	}

	private void joinQueryRequest(AsyncToken token) {
		try {
			token.awaitTerminal(joinQueryRequestMilliSeconds,TimeUnit.MILLISECONDS);
		} catch (Exception e) {
			// ingore this exception
		}
	}

	private Entity queryPrevMoreCCC(Entity entity) {
		try {
			int idAsHash = entity.getIdAsHash();
			// the cosmetic did not has a sequence field,to find prev and next
			// ,we must divide into two request
			String prevQuery = String.format("%s:{%s TO %s}",queryNeighbourField, idAsHash - rangeScope, idAsHash);
			// we find the list that idAsHash lt current cosmetic'idAsHash,use
			// desc sort
			SolrQuery query = new SolrQuery().setQuery("*:*")
					.addFilterQuery(prevQuery)
					.setSortField(queryNeighbourField, ORDER.desc)
					.setStart(0)
					.setRows(1);

			QueryResponse response = solrServer.query(query);
			if (isEmptyResult(response)) {
				return null;
			}

			return getBeansAsSingle(response);
		} catch (Exception e) {
			throw ExceptionUtils.toUnchecked(e);
		}
	}

	private Entity queryNextMoreCCC(Entity entity) {
		try {
			int idAsHash = entity.getIdAsHash();
			String nextQuery = String.format("%s:{%s TO %s}",queryNeighbourField, idAsHash, idAsHash + rangeScope);
			// we find the list that idAsHash lt current cosmetic'idAsHash,use
			// desc sort
			SolrQuery query = new SolrQuery().setQuery("*:*")
					.addFilterQuery(nextQuery)
					.setSortField(queryNeighbourField, ORDER.asc).setStart(0)
					.setRows(1);
			QueryResponse response = solrServer.query(query);
			if (isEmptyResult(response)) {
				return null;
			}

			return getBeansAsSingle(response);
		} catch (Exception e) {
			throw ExceptionUtils.toUnchecked(e);
		}
	}

	@Override
	public List<Tag> queryTags(Entity entity) {
		try {

			List<String> tagsQueries = createTagsQueries(entity);

			// query cosmetic'tag has one result at least,we skip the first(the
			// first may be current cosmetic)
			// one group query result is enough
			SolrQueryBuilder builder = new SolrQueryBuilder()
					.withQueryString("*:*")
					.withReturnFields(new String[] { "image" })
					.withGroupQueries(tagsQueries.toArray(new String[] {}))
					.withOffset(1).withGroupLimit(1);

			// create a groupQueryReponse to extract the group query result.
			GroupQueryResponse groupQueryResponse = new GroupQueryResponse(
					solrServer.query(builder.build()));
			return extractAsTagClothings(groupQueryResponse, entity);
		} catch (Exception e) {
			throw ExceptionUtils.toUnchecked(e);
		}
	}

	private List<Tag> extractAsTagClothings(GroupQueryResponse groupQueryResponse, Entity clothing) {
		List<Tag> result = new ArrayList<Tag>();

		for (String tagQuery : clothing.getTagAsList()) {

			// get one is enough
			Tag tagClothing = groupQueryResponse.getGroupResultAsSingle(
					convertTagQuery(tagQuery), Tag.class);

			if (null != tagClothing && !result.contains(tagClothing)) {
				tagClothing.setTag(tagQuery);
				result.add(tagClothing);
			}
		}

		return result;
	}

	private List<String> createTagsQueries(Entity clothing) {
		List<String> result = new ArrayList<String>();

		for (String tag : clothing.getTagAsList()) {
			result.add(convertTagQuery(tag));
		}

		return result;
	}

	private String convertTagQuery(String tagQuery) {
		return luceneKeywordFilter.doFilter(tagQuery, "");
	}

	private void assertIdFriendly(String id) {
		// to prevent malicious request,we must check the id
		AssertUtils.isTrue(id.matches("[0-9a-zA-Z]+"),
				"Make sure the id is friendly!");
	}

	public List<Entity> samePrice(Double price, String queryString) {
		try {
			Double priceFactor = price / 10.0;
			String samePriceQuery = String.format("%s:{%s TO %s}", "price", price - priceFactor, price + priceFactor);
			SolrQuery query = new SolrQuery().setQuery(queryString)
					.addFilterQuery(samePriceQuery).setStart(0).setRows(10);
			QueryResponse response = solrServer.query(query);
			if (isEmptyResult(response)) {
				return Collections.<Entity> emptyList();
			}
			return response.getBeans(Entity.class);
		} catch (Exception e) {
			throw ExceptionUtils.toUnchecked(e);
		}
	}

	public Entity similarTitle(String queryString, Entity entity) {
		try {
			String similarTitleQuery = String.format("%s:%s", "title",
					queryString);
			SolrQuery query = new SolrQuery().setQuery(queryString)
					.addFilterQuery(similarTitleQuery).setStart(0)
					.setRows(anchorLinkSearchScope);
			QueryResponse response = solrServer.query(query);
			if (isEmptyResult(response)) {
				return null;
			}
			return response.getBeans(Entity.class).get(
					getLinkEntityIndex(response, entity));
		} catch (Exception e) {
			throw ExceptionUtils.toUnchecked(e);
		}
	}

	public int getLinkEntityIndex(QueryResponse response, Entity entity) {
		int idAsHash = entity.getIdAsHash();
		return Integer.parseInt(idAsHash % Math.min(anchorLinkSearchScope, response.getResults().getNumFound()) + "");
	}
	
	@Override
	public List<Entity> hotSale(String queryString, Integer start, Integer limit) {
		List<Entity> list = new ArrayList<Entity>();
		try {
			SolrQuery query = new SolrQuery().setQuery(queryString)
					.setStart(start).setRows(limit).setSortField("commentCount", ORDER.desc);
			QueryResponse response = solrServer.query(query);
			if (isEmptyResult(response)) {
				return Collections.<Entity> emptyList();
			}
			list = response.getBeans(Entity.class);
			return list;
		} catch (Exception e) {
			throw ExceptionUtils.toUnchecked(e);
		}
	}

	public String analyzeTitle(String title) {
		StringBuilder buf = new StringBuilder();
		try {
			TokenStream token = analyzer.tokenStream(title, new StringReader(
					title));
			token.addAttribute(CharTermAttribute.class);

			while (token.incrementToken()) {
				CharTermAttribute termAttribute = token
						.getAttribute(CharTermAttribute.class);
				if (buf.length() > MAX_TAGS_LENGTH) {
					break;
				}

				if (termAttribute.length() < 2) {
					continue;
				}

				if (buf.length() > 0) {
					buf.append(";");
				}

				buf.append(new String(termAttribute.buffer(), 0, termAttribute
						.length()));
			}

		} catch (Exception e) {
			throw ExceptionUtils.toUnchecked(e);
		}

		return buf.toString();
	}

	public int hash(String id) {
		int h = id.hashCode();
		h ^= (h >>> 20) ^ (h >>> 12);
		return (h ^ (h >>> 7) ^ (h >>> 4)) & 0x7FFFFFFF;
	}
	
	@Override
	public List<Entity> newSale(String queryString, Integer start, Integer limit) {
		List<Entity> list = new ArrayList<Entity>();
		try {
			SolrQuery query = new SolrQuery().setQuery(queryString)
					.setStart(start).setRows(limit).setSortField("createTime", ORDER.desc);
			QueryResponse response = solrServer.query(query);
			if (isEmptyResult(response)) {
				return Collections.<Entity> emptyList();
			}
			list = response.getBeans(Entity.class);
			return list;
		} catch (Exception e) {
			throw ExceptionUtils.toUnchecked(e);
		}
	}

}

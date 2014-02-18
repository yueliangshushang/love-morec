package com.love.morec.infrastruture.solr;

import org.apache.commons.lang.StringUtils;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrQuery.ORDER;
import org.apache.solr.common.params.GroupParams;
import org.apache.solr.common.params.MoreLikeThisParams;

import com.loveme.util.AssertUtils;

/**
 * 
 * @author loudyn
 * 
 */
public class SolrQueryBuilder {
	private SolrQuery solrQuery = new SolrQuery();

	/**
	 * 
	 * @param queryString
	 * @return
	 */
	public SolrQueryBuilder withQueryString(String queryString) {
		this.solrQuery.setQuery(queryString);
		return this;
	}
	
	/**
	 * 
	 * @param query
	 * @return
	 */
	public SolrQueryBuilder withFilterQuery(String query) {
		this.solrQuery.addFilterQuery(query);
		return this;
	}

	/**
	 * 
	 * @param queryType
	 * @return
	 */
	public SolrQueryBuilder withQueryType(String queryType) {
		this.solrQuery.setQueryType(queryType);
		return this;
	}
	
	/**
	 * 
	 * @param fields
	 * @return
	 */
	public SolrQueryBuilder withReturnFields(String[] fields) {

		for (String field : fields) {
			this.solrQuery.addField(field);
		}

		return this;
	}

	/**
	 * 
	 * @param facetQueries
	 * @return
	 */
	public SolrQueryBuilder withFacetQueries(String[] facetQueries) {
		
		this.solrQuery.setFacet(true).setFacetLimit(20).setFacetMinCount(0);
		for (String facetQuery : facetQueries) {
			this.solrQuery.addFacetQuery(facetQuery);
		}

		return this;
	}

	public SolrQueryBuilder withQueryParams(String[] paramName, Object[] paramValues) {

		AssertUtils.isTrue(paramName.length == paramValues.length);
		for (int i = 0; i < paramName.length; i++) {

			Object paramValue = paramValues[i];

			if (paramValue instanceof String[]) {
				String[] paramValueAsArray = (String[]) paramValue;
				this.solrQuery.set(paramName[i], paramValueAsArray);
			} else {
				this.solrQuery.set(paramName[i], paramValue.toString());
			}
		}
		
		return this;
	}

	/**
	 * 
	 * @param highlightFields
	 * @return
	 */
	public SolrQueryBuilder withHighlightFields(String[] highlightFields) {
		for (String highlightField : highlightFields) {
			this.solrQuery.addHighlightField(highlightField);
		}

		return this;
	}

	/**
	 * 
	 * @param offset
	 * @return
	 */
	public SolrQueryBuilder withOffset(int offset) {
		this.solrQuery.setStart(offset);
		return this;
	}

	/**
	 * 
	 * @param size
	 * @return
	 */
	public SolrQueryBuilder withSize(int size) {
		this.solrQuery.setRows(size);
		return this;
	}

	/**
	 * 
	 * @param orderString
	 * @param orderByString
	 * @return
	 */
	public SolrQueryBuilder withSort(String orderString, String orderByString) {
		if (StringUtils.isBlank(orderString) || StringUtils.isBlank(orderByString)) {
			return this;
		}

		String[] orders = StringUtils.split(orderString, ",");
		String[] orderBys = StringUtils.split(orderByString, ",");
		AssertUtils.isTrue(orders.length == orderBys.length);

		for (int i = 0; i < orderBys.length; i++) {
			this.solrQuery.addSortField(orderBys[i], asOrder(orders[i]));
		}

		return this;
	}

	/**
	 * 
	 * @param order
	 * @return
	 */
	private ORDER asOrder(String order) {

		if (StringUtils.equalsIgnoreCase("asc", order)) {
			return ORDER.asc;
		}

		return ORDER.desc;
	}

	/**
	 * 
	 * @return
	 */
	public SolrQuery build() {
		return this.solrQuery;
	}
	
	public SolrQueryBuilder withMoreLikeThisFields(String[] fields){
		
		// must set the MATCH_INCLUDE eq true,thus we can get match docs and moreLikeThis docs on single result
		this.solrQuery.setQueryType("/"+MoreLikeThisParams.MLT)
						.set(MoreLikeThisParams.MLT, true)
						.set(MoreLikeThisParams.MIN_DOC_FREQ, 1)
						.set(MoreLikeThisParams.MIN_TERM_FREQ, 1)
						.set(MoreLikeThisParams.SIMILARITY_FIELDS, fields);
		
		return this;
	}
	
	public SolrQueryBuilder withMoreLikeThisDocCount(int docCount){
		// must set rows param
		this.solrQuery.setRows(docCount).set(MoreLikeThisParams.DOC_COUNT, docCount);
		return this;
	}

	public SolrQueryBuilder withGroupQueries(String[] queries) {
		
		this.solrQuery.set(GroupParams.GROUP, true)
						.set(GroupParams.GROUP_MAIN, false)
						.set(GroupParams.GROUP_QUERY, queries);
		
		return this;
	}
	
	public SolrQueryBuilder withGroupLimit(int limit){
		this.solrQuery.setRows(limit).set(GroupParams.GROUP_LIMIT, limit);
		return this;
	}

	public SolrQueryBuilder withGroupSort(String orderByString, String orderString ) {
		if (StringUtils.isBlank(orderString) || StringUtils.isBlank(orderByString)) {
			return this;
		}

		String[] orders = StringUtils.split(orderString, ",");
		String[] orderBys = StringUtils.split(orderByString, ",");
		AssertUtils.isTrue(orders.length == orderBys.length);
		
		for (int i = 0; i < orderBys.length; i++) {
			this.solrQuery.set(GroupParams.GROUP_SORT, String.format("%s %s", orderBys[i],asOrder(orders[i])));
		}
		return this;
	}

}

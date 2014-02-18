package com.love.morec.infrastruture.solr;

import java.util.Collections;
import java.util.List;

import org.apache.solr.client.solrj.SolrServer;
import org.apache.solr.client.solrj.beans.DocumentObjectBinder;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocumentList;
import org.apache.solr.common.util.NamedList;
import com.loveme.util.ReflectionUtils;

/**
 * 
 * @author loudyn
 *
 */
public class MoreLikeThisQueryResponse {
	//private static final Logger logger = LoggerFactory.getLogger(MoreLikeThisQueryResponse.class);
	
	private QueryResponse queryResponse;
	private SolrDocumentList matchResult;

	/**
	 * 
	 * @param queryResponse
	 */
	public MoreLikeThisQueryResponse(QueryResponse queryResponse) {
		this.queryResponse = queryResponse;

		NamedList<Object> res = this.queryResponse.getResponse();
		for (int i = 0; i < res.size(); i++) {
			String name = res.getName(i);
			if ("match".equals(name)) {
				this.matchResult = (SolrDocumentList) res.getVal(i);
			}
		}
	}

	/**
	 * 
	 * @param clazz
	 * @return
	 */
	public <T> List<T> getMatchBeans(Class<T> clazz) {
		if (null == this.matchResult) {
			throw new UnsupportedOperationException("Make sure it use a mlt request and mlt.match.include is true!");
		}

		return getSolrServer() == null ? 
										new DocumentObjectBinder().getBeans(clazz, this.matchResult) :
										getSolrServer().getBinder().getBeans(clazz, this.matchResult);
	}

	private SolrServer getSolrServer() {
		return (SolrServer) ReflectionUtils.getFieldValue(this.queryResponse, "solrServer");
	}

	/**
	 * 
	 * @param clazz
	 * @return
	 */
	public <T> List<T> getMoreLikeThisBeans(Class<T> clazz) {
		try {
			return this.queryResponse.getBeans(clazz);
		} catch (Exception e) {
			return Collections.emptyList();
		}
		
	}

}

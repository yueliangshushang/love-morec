package com.love.morec.application.entity.impl;

import org.apache.solr.client.solrj.impl.CommonsHttpSolrServer;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.springframework.beans.factory.annotation.Autowired;

import com.love.morec.application.entity.EntityDescService;
import com.love.morec.domain.entity.EntityDesc;
import com.love.morec.infrastruture.solr.SolrQueryBuilder;
import com.loveme.util.AssertUtils;
import com.loveme.util.ExceptionUtils;

public class EntityDescServiceImpl implements EntityDescService {
	
	private CommonsHttpSolrServer descSolrServer;
	
	@Autowired
	public void setDescSolrServer(CommonsHttpSolrServer descSolrServer) {
		this.descSolrServer = descSolrServer;
	}

	@Override
	public EntityDesc get(String id) {
		assertIdFriendly(id);
		try {
			// to use filterCache,we use q="*:*"&fq=id:?
			SolrQueryBuilder builder = new SolrQueryBuilder()
					.withQueryString("*:*")
					.withFilterQuery(String.format("productid:%s", id)).withOffset(0)
					.withSize(1);

			QueryResponse response = descSolrServer.query(builder.build());
			if (isEmptyResult(response)) {
				return null;
			}

			return getBeansAsSingle(response);
		} catch (Exception e) {
			throw ExceptionUtils.toUnchecked(e);
		}
	}

	private void assertIdFriendly(String id) {
		// to prevent malicious request,we must check the id
		AssertUtils.isTrue(id.matches("[0-9a-zA-Z]+"),
				"Make sure the id is friendly!");
	}
	private EntityDesc getBeansAsSingle(QueryResponse response) {
		return response.getBeans(EntityDesc.class).get(0);
	}

	private boolean isEmptyResult(QueryResponse response) {
		if (null == response.getResults()) {
			return true;
		}
		return response.getResults().getNumFound() <= 0;
	}
}

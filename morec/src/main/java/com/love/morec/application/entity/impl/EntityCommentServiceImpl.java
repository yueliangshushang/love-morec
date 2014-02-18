package com.love.morec.application.entity.impl;

import java.util.Collections;
import java.util.List;

import org.apache.solr.client.solrj.impl.CommonsHttpSolrServer;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.springframework.beans.factory.annotation.Autowired;

import com.love.morec.application.entity.EntityCommentService;
import com.love.morec.domain.entity.EntityComment;
import com.love.morec.infrastruture.solr.SolrQueryBuilder;
import com.loveme.core.orm.Page;

public class EntityCommentServiceImpl implements EntityCommentService {

	private CommonsHttpSolrServer commentSolrServer;

	@Autowired
	public void setCommentSolrServer(CommonsHttpSolrServer commentSolrServer) {
		this.commentSolrServer = commentSolrServer;
	}

	@Override
	public Page<EntityComment> queryPage(String queryString,Page<EntityComment> page) {
		try {

			SolrQueryBuilder builder = new SolrQueryBuilder()
					.withQueryString(queryString)
					.withOffset(page.getFirst() - 1)
					.withSize(page.getPageSize())
					.withSort(page.getOrder(), page.getOrderBy());

			QueryResponse response = commentSolrServer.query(builder.build());
			if (isEmptyResult(response)) {
				return page.setResult(Collections.<EntityComment> emptyList());
			}

			page.setResult(getBeans(response)).setTotalCount(getTotalCount(response));

		} catch (Exception e) {
			e.printStackTrace();
			page.setResult(Collections.<EntityComment> emptyList());
		}

		return page;

	}

	private List<EntityComment> getBeans(QueryResponse response) {
		return response.getBeans(EntityComment.class);
	}

	private long getTotalCount(QueryResponse response) {
		return response.getResults().getNumFound();
	}

	private boolean isEmptyResult(QueryResponse response) {
		if (null == response.getResults()) {
			return true;
		}

		return response.getResults().getNumFound() <= 0;
	}

	@Override
	public EntityComment getOneEntityComment(String entityid) {
		EntityComment comment=new EntityComment();
		try {

			SolrQueryBuilder builder = new SolrQueryBuilder()
					.withQueryString(String.format("entityId:%s", entityid));

			QueryResponse response = commentSolrServer.query(builder.build());
			if (isEmptyResult(response)) {
				return null;
			}

			comment=getBeans(response).get(0);

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

		return comment;
	}

}

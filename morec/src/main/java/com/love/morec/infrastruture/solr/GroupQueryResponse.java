package com.love.morec.infrastruture.solr;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.solr.client.solrj.SolrServer;
import org.apache.solr.client.solrj.beans.DocumentObjectBinder;
import org.apache.solr.client.solrj.response.Group;
import org.apache.solr.client.solrj.response.GroupCommand;
import org.apache.solr.client.solrj.response.GroupResponse;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocumentList;

import com.loveme.util.ReflectionUtils;

/**
 * 
 * @author loudyn
 *
 */
public class GroupQueryResponse {
	private QueryResponse queryResponse;
	private Map<String, List<SolrDocumentList>> resultMap = new HashMap<String, List<SolrDocumentList>>();

	/**
	 * 
	 * @param queryResponse
	 */
	public GroupQueryResponse(QueryResponse queryResponse) {

		this.queryResponse = queryResponse;

		GroupResponse groupResponse = queryResponse.getGroupResponse();
		for (GroupCommand command : groupResponse.getValues()) {
			
			if(isNotEmpyValueCommand(command)){
				
				List<SolrDocumentList> docs = new ArrayList<SolrDocumentList>();
				for (Group group : command.getValues()) {
					docs.add(group.getResult());
				}
				
				resultMap.put(command.getName(), docs);
			}
		}
	}

	private boolean isNotEmpyValueCommand(GroupCommand command) {
		return null != command.getValues() && (!command.getValues().isEmpty());
	}

	/**
	 * 
	 * @param groupQueryName
	 * @param clazz
	 * @return
	 */
	public <T> List<T> getGroupResult(String groupQueryName, Class<T> clazz) {
		List<T> result = new ArrayList<T>();
		if (resultMap.containsKey(groupQueryName)) {
			for (SolrDocumentList docList : resultMap.get(groupQueryName)) {
				result.addAll(extractAsBeans(docList, clazz));
			}
		}
		
		return result;
	}

	/**
	 * 
	 * @param groupQueryName
	 * @param clazz
	 * @return
	 */
	public <T> T getGroupResultAsSingle(String groupQueryName, Class<T> clazz) {
		List<T> result = getGroupResult(groupQueryName, clazz);
		if (result.isEmpty()) {
			return null;
		}

		return result.get(0);
	}

	private <T> List<T> extractAsBeans(SolrDocumentList docList, Class<T> clazz) {

		return getSolrServer() == null ?
				new DocumentObjectBinder().getBeans(clazz, docList) :
				getSolrServer().getBinder().getBeans(clazz, docList);
	}

	private SolrServer getSolrServer() {
		return (SolrServer) ReflectionUtils.getFieldValue(this.queryResponse, "solrServer");
	}

}

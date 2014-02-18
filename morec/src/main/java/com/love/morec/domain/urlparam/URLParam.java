package com.love.morec.domain.urlparam;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.jsoup.helper.StringUtil;

import com.love.morec.domain.channel.Channel;

public class URLParam {
	private int channelID;
	private Integer pageNo;
	private String orderBy;
	private String order;
	private String byPrice;
	private String condition;
	private Map<String,String> attrQuery = new HashMap<String,String>();
	private String attr = "";
	private Channel queryChannel;
	
	public String getOrderBy() {
		return orderBy;
	}
	public URLParam setOrderBy(String orderBy) {
		this.orderBy = orderBy;
		return this;
	}
	public int getChannelID() {
		return channelID;
	}
	public URLParam setChannelID(int channelID) {
		this.channelID = channelID;
		return this;
	}
	public Integer getPageNo() {
		return pageNo;
	}
	public URLParam setPageNo(Integer pageNo) {
		this.pageNo = pageNo;
		return this;
	}
	
	public String getOrder() {
		return order;
	}
	public URLParam setOrder(String order) {
		this.order = order;
		return this;
	}
	
	public String getByPrice() {
		return byPrice;
	}
	public URLParam setByPrice(String byPrice) {
		this.byPrice = byPrice;
		return this;
	}
	
	public String getCondition() {
		return condition;
	}
	public URLParam setCondition(String condition) {
		this.condition = condition;
		return this;
	}
		
	public String priceFilter(String priceFilter){
		if(priceFilter.matches("[0-9]+,([0-9]+|\\*)")){
			String[] price = StringUtils.split(priceFilter, ',');
			String lowPrice = price[0];
			String highPrice = price[1];
			String priceQuery = String.format("%s:[%s TO %s]", "price", lowPrice, highPrice);
			return " AND "+priceQuery;
		}else{
			return "";
		}
	}
	
	public String doCondition(String condition,Channel channel)
	{
		String conditionQuery = "";
		List<String> allConditions = new ArrayList<String>();
		String[] otherConditions = {
				"欧式", "田园", 
				"美式乡村", "简约现代", "地中海", "北欧宜家", "东南亚", "新古典后现代", 
				"明清古典", "日式", "韩式", "现代中式", "复古怀旧"
		};
		for(String otherCondition : otherConditions){
			allConditions.add(otherCondition);
		}
		if(StringUtil.isBlank(condition)){
			conditionQuery = "";
		}else {	
			for(int i = 0; i < condition.split(";").length;i++){
				for(String allCondition  : allConditions){
					if(condition.split(";")[i].equals(allCondition)){
						conditionQuery = conditionQuery + " AND "+condition.split(";")[i];
						break;
					}else{
						conditionQuery = conditionQuery + "";
					}
				}
			}
		}
		return conditionQuery;
	}
	
	public Map<String, String> getAttrQuery() {
		return attrQuery;
	}
	public String getAttr(){
		return attr;
	}
	
	public void setAttrQuery(String attribute,String matchAttr) {
		Map<String,String> attrQuery = new HashMap<String,String>();
		if(attribute.matches("^([0-9]+:[0-9]+;)+$")){
			String[] attrs = attribute.split(";");
			for(int i=0; i<attrs.length;i++){
				if(matchAttr.indexOf(attrs[i].split(":")[0]) != -1)
					attrQuery.put(attrs[i].split(":")[0], attrs[i].split(":")[1]);
			}
			this.attr = attribute;
			this.attrQuery = attrQuery;
		}else{
			this.attrQuery = null;		
		}
	}
	public Channel getQueryChannel() {
		return queryChannel;
	}
	public URLParam setQueryChannel(Channel queryChannel) {
		this.queryChannel = queryChannel;
		return this;
	}
}

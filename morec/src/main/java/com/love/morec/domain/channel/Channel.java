package com.love.morec.domain.channel;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.codehaus.jackson.annotate.JsonIgnore;

import com.love.morec.domain.template.Template;
import com.loveme.core.domain.AbstractDomain;
/**
 * 栏目
 * @author tanjianna
 *
 */
public class Channel extends AbstractDomain implements Comparable<Channel> {

	private static final long serialVersionUID = 1L;
	private Channel father;
	private List<Channel> children = new ArrayList<Channel>();
	private String name;
	private String path;
	private int sort;
	private String title;
	private String metaKeyWord;
	private String metaDescr;
	private String tags;
	private String hotKeyWord;
	private String metaTitle;
	private String anchorText;
	private Template template;
	private String attributes;
	private List<Channel> channelNames = new ArrayList<Channel>();
	
	public Template getTemplate() {
		return template;
	}

	public void setTemplate(Template template) {
		this.template = template;
	}
	
	public String getAnchorText() {
		return anchorText;
	}

	public void setAnchorText(String anchorText) {
		this.anchorText = anchorText;
	}
	
	public String getMetaTitle()
	{
		return metaTitle;
	}

	public void setMetaTitle(String metaTitle)
	{
		this.metaTitle = metaTitle;
	}

	public List<Channel> getChannelNames()
	{
		return channelNames;
	}

	public void setChannelNames(List<Channel> channelNames)
	{
		this.channelNames = channelNames;
	}

	public String getHotKeyWord() {
		return hotKeyWord;
	}

	public void setHotKeyWord(String hotKeyWord) {
		this.hotKeyWord = hotKeyWord;
	}
	@JsonIgnore
	public Channel getFather() {
		return father;
	}
    
	public void setFather(Channel father) {
		this.father = father;
	}

	public List<Channel> getChildren() {
		if (null == this.children) {
			return Collections.emptyList();
		}
		
		return children;
	}

	public void setChildren(List<Channel> children) {
		this.children = children;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public int getSort() {
		return sort;
	}

	public void setSort(int sort) {
		this.sort = sort;
	}
	
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getMetaKeyWord() {
		return metaKeyWord;
	}

	public void setMetaKeyWord(String metaKeyword) {
		this.metaKeyWord = metaKeyword;
	}

	public String getMetaDescr() {
		return metaDescr;
	}

	public void setMetaDescr(String metaDescr) {
		this.metaDescr = metaDescr;
	}

	public String getTags() {
		return tags;
	}

	public void setTags(String tags) {
		this.tags = tags;
	}

	public String getAttributes() {
		return attributes;
	}

	public void setAttributes(String attributes) {
		this.attributes = attributes;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Comparable#compareTo(java.lang.Object)
	 */
	@Override
	public int compareTo(Channel other) {
		return this.getSort() - other.getSort();
	}

	public boolean hasChildren() {
		return null != getChildren() && (!getChildren().isEmpty());
	}
	
	/**
	 * 
	 * @return
	 */
	@JsonIgnore
	public ChannelQuery getSelfQuery(){
		return new ChannelQuery(this, this.getTags());
	}

	/**
	 * 
	 * @return
	 */
	public List<ChannelQuery> getChildrenQuery() {

		List<ChannelQuery> result = new ArrayList<ChannelQuery>();
		for (Channel channel : getChildren()) {
			result.add(new ChannelQuery(channel,String.format("classify:%s","("+channel.getTags()+")")));
		}

		return result;
	}

}

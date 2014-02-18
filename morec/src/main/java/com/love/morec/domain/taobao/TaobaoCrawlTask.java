package com.love.morec.domain.taobao;

import java.util.ArrayList;
import java.util.List;

import com.love.morec.domain.channel.Channel;
import com.loveme.core.annotation.ThreadSafe;
import com.loveme.core.domain.AbstractDomain;
import com.loveme.util.AssertUtils;

/**
 * @author Linxiaosheng
 */
public class TaobaoCrawlTask extends AbstractDomain {

	/**
	 * 
	 * @author loudyn
	 * 
	 */
	public interface TaobaoTaskCrawlListener {

		/**
		 * 
		 */
		public void beforeExecute(TaobaoCrawlTask current);

		/**
		 * 
		 */
		public void afterExecute(TaobaoCrawlTask current);
	}

	private static final long serialVersionUID = 1L;
	/**
	 * 名称
	 */
	private String name;

	/**
	 * 在淘宝开放平台上对应的类目ID值
	 */
	private String cid;
	
	/**
	 * 所属分类
	 */
	private Channel channel;
	
	/**
	 * 采集状态
	 */
	private Status status = Status.STOPED;
	
	/**
	 * 采集CRON定时表达式
	 */
	private String cron;

	public static enum Status {
		RUNNING, STOPED
	}

	private List<TaobaoTaskCrawlListener> listeners = new ArrayList<TaobaoCrawlTask.TaobaoTaskCrawlListener>();

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCid() {
		return cid;
	}

	public void setCid(String cid) {
		this.cid = cid;
	}
	
	public Channel getChannel() {
		return channel;
	}

	public void setChannel(Channel channel) {
		this.channel = channel;
	}
	
	public String getCron() {
		return cron;
	}

	public void setCron(String cron) {
		this.cron = cron;
	}

	/**
	 * 
	 * @param listener
	 * @return
	 */
	@ThreadSafe
	public TaobaoCrawlTask addTaskCrawlListener(TaobaoTaskCrawlListener listener) {
		AssertUtils.notNull(listener);
		synchronized (this) {
			this.listeners.add(listener);
		}

		return this;
	}

	/**
	 * 
	 * @return
	 */
	public boolean isRunning() {
		return getStatus() == Status.RUNNING;
	}

	/**
	 * 
	 */
	public void begin() {
		setStatus(Status.RUNNING);
		for (TaobaoTaskCrawlListener lisener : getTaskCrawlListenerAsSnopshot()) {
			lisener.beforeExecute(this);
		}
	}

	/**
	 * 
	 */
	public void end() {
		setStatus(Status.STOPED);
		for (TaobaoTaskCrawlListener lisener : getTaskCrawlListenerAsSnopshot()) {
			lisener.afterExecute(this);
		}
	}

	private TaobaoTaskCrawlListener[] getTaskCrawlListenerAsSnopshot() {
		TaobaoTaskCrawlListener[] snopshot = null;
		synchronized (this) {
			snopshot = this.listeners.toArray(new TaobaoTaskCrawlListener[] {});
		}
		return snopshot;
	}

}

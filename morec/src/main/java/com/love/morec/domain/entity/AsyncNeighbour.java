package com.love.morec.domain.entity;

import java.util.Map;

import com.loveme.core.annotation.ThreadSafe;

/**
 * 
 * @author loudyn
 *
 */
@ThreadSafe
public class AsyncNeighbour implements Neighbour {
	private volatile Entity prev;
	private volatile Entity next;
	private volatile Map<String, Entity> others;

	public Entity getPrev() {
		return prev;
	}

	public void setPrev(Entity prev) {
		this.prev = prev;
	}

	public Entity getNext() {
		return next;
	}

	public void setNext(Entity next) {
		this.next = next;
	}

	public Map<String, Entity> getOthers() {
		return others;
	}

	public void setOthers(Map<String, Entity> others) {
		this.others = others;
	}
	
}

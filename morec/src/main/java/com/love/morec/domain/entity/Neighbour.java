package com.love.morec.domain.entity;

import java.util.Map;

public interface Neighbour {
	public Entity getPrev();
	public Entity getNext();
	public Map<String, Entity> getOthers();
}

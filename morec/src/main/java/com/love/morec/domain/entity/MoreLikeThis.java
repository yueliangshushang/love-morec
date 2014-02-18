package com.love.morec.domain.entity;

import java.util.List;

public class MoreLikeThis {
	private final List<Entity> matchResult;
	private final List<Entity> moreLikeThisResult;

	/**
	 * 
	 * @param matchResult
	 * @param moreLikeThisResult
	 */
	public MoreLikeThis(List<Entity> matchResult, List<Entity> moreLikeThisResult) {
		this.matchResult = matchResult;
		this.moreLikeThisResult = moreLikeThisResult;
	}

	public List<Entity> getMatch() {
		return this.matchResult;
	}

	public Entity getMatchAsSingle() {
		if (this.matchResult.isEmpty()) {
			return null;
		}

		return this.matchResult.get(0);
	}

	public List<Entity> getMoreLikeThis() {
		return this.moreLikeThisResult;
	}
}

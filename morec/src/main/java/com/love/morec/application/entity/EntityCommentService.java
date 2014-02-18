package com.love.morec.application.entity;

import com.love.morec.domain.entity.EntityComment;
import com.loveme.core.orm.Page;

public interface EntityCommentService {

	Page<EntityComment> queryPage(String queryString, Page<EntityComment> page);
	
	EntityComment getOneEntityComment(String entityid);
}

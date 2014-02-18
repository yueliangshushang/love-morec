package com.love.morec.infrastruture.persist.impl;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;

import com.love.morec.domain.taobao.TaobaoCrawlTask;
import com.love.morec.domain.taobao.TaobaoCrawlTask.Status;

public class MybatisTaobaoCrawlTaskStatusTypeHandler extends BaseTypeHandler<TaobaoCrawlTask.Status> {

	@Override
	public void setNonNullParameter(PreparedStatement ps, int i, Status parameter, JdbcType jdbcType) throws SQLException {
		ps.setString(i, parameter.toString());
	}


	@Override
	public Status getNullableResult(ResultSet rs, String columnName) throws SQLException {
		String status = rs.getString(columnName);
		return Enum.valueOf(TaobaoCrawlTask.Status.class, status);
	}

	@Override
	public Status getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
		String status = cs.getString(columnIndex);
		return Enum.valueOf(TaobaoCrawlTask.Status.class, status);
	}

}

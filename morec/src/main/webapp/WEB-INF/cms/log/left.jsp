<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="/common/cms/taglibs.jsp" %>
<%@include file="/common/cms/common-header.jsp" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body>
<div class="sideBar" id="firstpane">
<shiro:hasRole name="admin">
 <div class="mainNav table">
	<h5 class="menu_head"><div class="side_link" onclick="openShutManager(this,'box4',false,'-','+')">
		<a href="#">-</a>
	</div>
		<span style="width:auto;">日志管理</span>
	</h5>
  		<ul class="menu_body" id="box4">
          <li><a href="${ctx }/log/list" target="main"><span class="allIco ico15"></span>日志管理</a></li>
        </ul>
   </div>
</shiro:hasRole>
</div>
</body>
</html>

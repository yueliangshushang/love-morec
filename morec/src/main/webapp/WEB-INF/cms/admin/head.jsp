<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page import="org.apache.shiro.SecurityUtils" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<%@include file="/common/cms/taglibs.jsp" %>
<%@include file="/common/cms/common-header.jsp" %>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script>
$(document).ready(function(){      
	 $('.rb ul li').click(function(){
	  	$(this).addClass('bluebg');
	 });
	 $('.rb').mousedown(function(){
		  $('.rb ul li').removeClass('bluebg');
	});
});
</script>
</head>
<body>
<div class="head">
  <div class="imgCont"><img src="${ctx }/resources/images/lglogo.gif"/></div>
  <div class="loginbar">
  <p class="floatl"><span>欢迎你：<strong ><%= SecurityUtils.getSubject().getPrincipal().toString() %></strong>&nbsp;&nbsp;
  	<a href="${ctx}/admin/logout" target="_parent" class="a_exit"><strong style="color:#004aba;">安全退出</strong></a>
 <!--  -->
 <div class="rb">
 <ul>
	<li class="bluebg"><a target="centre" href="${ctx}/admin/centre">首页</a></li>
	<li><a target="centre" href="${ctx}/channel/centre" >栏目</a></li>
	<li><a target="centre" href="${ctx}/entity/centre">内容</a></li>
	<li><a target="centre" href="${ctx}/template/centre">模板</a></li>
	<li><a target="centre" href="${ctx}/resource/centre">资源</a></li>
	<li><a target="centre" href="${ctx }/taobao-crawl-task/centre">数据</a></li>
	<li><a target="centre" href="${ctx }/log/centre">日志</a></li>
</ul>
</div>
  	</p>
  </div>
</div>
</body>
</html>

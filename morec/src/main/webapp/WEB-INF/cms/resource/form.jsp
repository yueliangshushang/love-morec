<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/cms/taglibs.jsp"%>
<%@include file="/common/cms/common-header.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" 
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body>
 <!--content start-->
<div class="content">
<div class="table">
<div class="contentNav"><h1><span class="allIco2 ico_6"></span>资源管理</h1></div>
 <div class="tips"><img src="${ctx}/resources/images/tips.gif" align="left" />所有带有<span class="red">*</span>为必填项</div>
<div class="info border">
<table cellpadding="0" cellspacing="0" border="0" width="100%">
<tbody>
<form action="${ctx }/resource/update" method="POST">
<center>
<h3>文件名：${name }</h3></br>
<textarea name="content" style="margin-top: 2px; margin-bottom: 2px; height: 245px; margin-left: 2px; margin-right: 2px; width: 776px;" >
${content }
</textarea>
<input type="hidden" name="directory" value="${fn:substring(directory,fn:indexOf(directory,'resource')+9,fn:length(directory))}"/>

<div class="contactBbutton">
<input id="ok" type="submit" value="提交" class="button1" />&nbsp;
<input id=“back” type="button" value="返回" class="button1" onclick="javascript:history.go(-1);"/>
</form>
</center>
</tbody>
</table>
</div>
</div>
</div></div>
</body>
</html>

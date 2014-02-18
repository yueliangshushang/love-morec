<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/cms/taglibs.jsp"%>
<%@include file="/common/cms/common-header.jsp" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" 

"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<script type="text/javascript">
	$(function(){
		$("#form").submit(function(){
			var channel = $("#channel").val();
			var path = $("#path").val();
			var sort = $("#sort").val();
			var tags = $("#tags").val();
			if("" === channel){
				alert("分类名不允许为空！");
				$("#channel").select();
				return false;
			}else if("" === path){
				alert("分类path不允许为空！");
				$("#path").select();
				return false;
			}else if("" === tags){
				alert("分类tags不允许为空！");
				$("#tags").select();
				return false;
			}else if(sort.search("^-?\\d+$")!=0){
				alert("分类排序必须为整数！");
				$("#sort").select();
				return false;
			}
			location.reload();
		});
	});
</script>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body>
<form:form method="post" modelAttribute="channel" id="form">
<input type="hidden" name="_method" value="put"></input>
 <!--content start-->
<div class="content">
<div class="table">
<div class="contentNav"><h1><span class="allIco2 ico_6"></span>栏目管理</h1></div>
 <div class="tips"><img src="${ctx}/resources/images/tips.gif" align="left" />所有带有<span class="red">*</span>为必填项</div>
<div class="info border">
<table cellpadding="0" cellspacing="0" border="0" width="100%">
<tbody>
<tr>
<td width="240" align="right" nowrap="nowrap"><span class="red">*</span>分类名：</td>
<td colspan="2">
	<form:input path="name" cssClass="input5 fontMar" id="channel"/>
</td>
</tr>
<tr>
<td width="240" align="right" nowrap="nowrap">所属分类：</td>
<td colspan="2">
<select name = "belongChannel">  
	<c:choose>
		<c:when test="${empty channel.father.id }">
			<option value="" selected>一级目录</option>
			<c:forEach items="${channelNames }" var="names">
				<c:if test="${empty names.father.id }">
					<option value="${names.id }">${names.name }</option>
					<c:forEach items="${names.children }" var="child">
						<option value="${child.id}" >- - - -${child.name }</option>
					</c:forEach>
				</c:if>
			</c:forEach>
		</c:when>
		<c:otherwise>
			<option value="" >一级目录</option>
			<c:forEach items="${channelNames }" var="names">
					<c:choose>
						<c:when test="${channel.father.id eq names.id }">
							<option value="${names.id }" selected>${names.name }</option>
						</c:when>
						<c:otherwise>
							<option value="${names.id }" >${names.name }</option>
						</c:otherwise>
					</c:choose>
					<c:forEach items="${names.children }" var="child">
						<option value="${child.id}" >- - - -${child.name }</option>
					</c:forEach>
			</c:forEach>
		</c:otherwise>
	</c:choose>
</select> 
</td>
</tr>

<td width="240" align="right" nowrap="nowrap">所属模版：</td>
<td colspan="2">
<select name = "belongTemplate">
	<c:forEach items="${template }" var="templates" varStatus="status">
		<c:choose>
			<c:when test="${templates.id eq channel.template.id }">
				<option value="${templates.id}"selected> ${templates.name }</option>
			</c:when>
			<c:otherwise>
				<option value="${templates.id}"> ${templates.name }</option>
			</c:otherwise>
		</c:choose>
	</c:forEach>
</select> 
</td>
</tr>

<td width="240" align="right" nowrap="nowrap">分类title：</td>
<td colspan="2">
	<form:textarea path="title" cssClass="input5 fontMar" style="margin-top: 2px; margin-bottom: 2px; height: 80px; margin-left: 2px; margin-right: 2px; width: 318px;"  />
</td>
</tr>
<td width="240" align="right" nowrap="nowrap">访问路径：</td>
<td colspan="2">
	<form:input path="path" cssClass="input6 fontMar" id="path"/>&nbsp;（如：aboutus）
</td>
</tr>
<td width="240" align="right" nowrap="nowrap">分类Tag：</td>
<td colspan="2">
	<form:textarea path="tags" cssClass="input5 fontMar" style="margin-top: 2px; margin-bottom: 2px; height: 80px; margin-left: 2px; margin-right: 2px; width: 318px;"  />&nbsp;注：关键词之间用&nbsp;;&nbsp;分开
</td>
</tr>
<td width="240" align="right" nowrap="nowrap">分类排序：</td>
<td colspan="2">
	<form:input path="sort" cssClass="input5 fontMar" id="sort"/>
</td>
</tr>
<c:if test="${not empty child }">
	<td width="240" align="right" nowrap="nowrap">二级分类：</td>
	<td colspan="2">
	<c:forEach items="${child}" var="childre">${childre.name } &nbsp;</c:forEach>
	</td>
	</tr>
</c:if>

<td width="240" align="right" nowrap="nowrap">hot_KeyWord：</td>
<td colspan="2">
	<form:textarea path="hotKeyWord" cssClass="input5 fontMar" style="margin-top: 2px; margin-bottom: 2px; height: 80px; margin-left: 2px; margin-right: 2px; width: 318px;"  />
</td>
</tr>
<td width="240" align="right" nowrap="nowrap">meta标题：</td>
<td colspan="2">
	<form:textarea path="metaTitle" cssClass="input5 fontMar" style="margin-top: 2px; margin-bottom: 2px; height: 80px; margin-left: 2px; margin-right: 2px; width: 318px;"  />
</td>
</tr>
<td width="240" align="right" nowrap="nowrap">meta描述：</td>
<td colspan="2">
	<form:textarea path="metaDescr" cssClass="input5 fontMar" style="margin-top: 2px; margin-bottom: 2px; height: 80px; margin-left: 2px; margin-right: 2px; width: 318px;"  />
</td>
</tr>
<td width="240" align="right" nowrap="nowrap">meta关键字：</td>
<td colspan="2">
	<form:textarea path="metaKeyWord" cssClass="input5 fontMar" style="margin-top: 2px; margin-bottom: 2px; height: 80px; margin-left: 2px; margin-right: 2px; width: 318px;"  />
</td>
</tr>
<tr>
<td width="240" align="right" nowrap="nowrap">锚文本：</td>
<td colspan="2">
	<form:textarea path="anchorText" cssClass="input5 fontMar" style="margin-top: 2px; margin-bottom: 2px; height: 80px; margin-left: 2px; margin-right: 2px; width: 318px;"  />
</td>
</tr>
</tbody>
</table>
</div>
<div class="contactBbutton">
<input id="ok" type="submit" value="提交" class="button1" />&nbsp;
<input id=“back” type="button" value="返回" class="button1" onclick="javascript:history.go(-1);"/>
</div>
  
</div></div>
</form:form>
</body>
</html>

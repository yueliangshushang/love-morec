<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/common/cms/taglibs.jsp"%>
<%@include file="/common/cms/common-header.jsp" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" 

"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<script type="text/javascript">
	$(function(){
		$("#form").submit(function(){
			var name = $("#name").val();
			var channel = $("#channel").val();
			if("" === name){
				alert("分类名不允许为空！");
				$("#name").select();
				return false;
			}else if("" === channel){
				alert("淘宝开放平台secret不允许为空！");
				$("#channel").select();
				return false;
			}
		});
		
		 
		$("select[id^='select_id']").change(function(){
			var _this=this;
			var temp= $(this).children('option:selected').val();
			$.ajax({
			   url:"${ctx}/taobao-crawl-task/"+temp+"/getchildren",
			   dataType:"json",
			   success: function(data){
				   var html="<option value=\"\">请选择</option>";
				   for(var i=0;i<data.length;i++)
					   html+="<option value ='"+data[i].path+"'>"+data[i].name+"</option>";
				var className=$(_this).attr("id")+"_item";
			    $("#"+className).html(html);
			   }
			});
	});
})
</script>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body>
 <!--content start-->
<div class="content">
<div class="table">
<div class="contentNav"><h1><span class="allIco2 ico_6"></span>采集管理</h1></div>
 <div class="tips"><img src="${ctx}/resources/images/tips.gif" align="left" />此栏目均为必填项！</div>
<div class="info border">
<table cellpadding="0" cellspacing="0" border="0" width="100%">
<tbody>

<form:form  commandName="taobaoCrawlTask" method="${_method }">
	<input type="hidden" value="${_method }" />
	<form:hidden path="status" />
 	<tr>
	<td width="240" align="right" nowrap="nowrap">采集站点名称：</td>
	<td colspan="2">
	<form:input path="name" id="name" /><br/>
	</td>
	</tr>
 	<tr>
	<td width="240" align="right" nowrap="nowrap">所属分类：</td>
	<td colspan="2">${taobaoCrawlTask.channel.name }
<%-- 	<form:select path="channel.name" id="select_id"> --%>
<%-- 		<form:options items="${channels}"  itemValue="path" itemLabel="name" /> --%>
<%-- 	</form:select> --%>
	<select name="channelpath" id="select_id">
	 <option value="">请选择</option>
		<c:forEach items="${channels }" var="channel">
			<option label="${channel.name }" value="${channel.path}">${channel.name}</option>
		</c:forEach>
	</select>
	<select name="childrenpath" id="select_id_item"></select>
	<select name="grandchildpath" id="select_id_item_item"></select>
	</td>
	</tr>
 	<tr>
	<td width="240" align="right" nowrap="nowrap">CronExpression：</td>
	<td colspan="2">
	<form:input path="cron"  id="cron"/>
	</td>
	</tr>
 	<tr>
	
	<td width="240" align="right" nowrap="nowrap">淘宝分类ID：</td>
	<td colspan="2">
	<form:input path="cid"  id="channel"/>&nbsp;<a href="http://api.taobao.com/apitools/apiPropTools.htm" target="_blank">查看淘宝开放平台分类ID</a><br/>
	</td>
	</tr>
	<tr>
	<input type="submit" value="提交" class="button1"/>
	<input id=“back” type="button" value="返回" class="button1" onclick="javascript:history.go(-1);"/>
	</tr>
</div>

</form:form>
</tbody>
</table>
  
</div></div>
</body>
</html>

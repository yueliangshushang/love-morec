<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="codec" uri="/WEB-INF/tld/codec.tld" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<%@include file="/common/cms/taglibs.jsp"%>
<%@include file="/common/cms/common-header.jsp" %>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script src="${ctx }/resources/js/jquery.form.js" type="text/javascript"></script>
<script type="text/javascript">
  $(function(){
	  
	  $(".del").each(function(){
		  
		 var $this = $(this);
		 $this.click(function(){
			 if(confirm("确定删除该数据吗？")){
				 var pathname = $this.attr("id");
				 var name = $this.attr("name");
				 $.ajax({
					 url : "${ctx}/resource/delete",
					 type : "POST",
					 data : {"pathname" : pathname , "_method" : "DELETE" ,"name" : name},
					 success : function(){
						 location.reload();
					 },
					 error : function(){
						 alert("无法删除该数据！");
					 }
				 });
			 }
			 
			 return false;
		 });
	  });
	  
	  $(".lastModified").each(function(){
		 var $this = $(this);
		 var lastModified = $this.text();
		 var date = new Date(parseInt(lastModified, 10));
		 var year = date.getFullYear();
		 var month = date.getMonth() + 1;
		 month = month >= 10 ? month.toString() : ("0" + month);
		 var day = date.getDate() >= 10 ? date.getDate() : ("0" + date.getDate());
		 var hours = date.getHours() >= 10 ? date.getHours().toString() : ("0" + date.getHours());
		 var minutes = date.getMinutes() >= 10 ? date.getMinutes().toString() : ("0" + date.getMinutes());
		 var seconds = date.getSeconds() >= 10 ? date.getSeconds().toString() : ("0" + date.getSeconds());
 		 $this.empty().append("".concat(year, "-", month, "-", day, " ", hours, ":", minutes, ":", seconds));
	  });
	  
	  $("#uploadFile").click(function(){
			$("#fileForm").ajaxSubmit({
				type : "POST",
				data : {"pathname" : "${param.pathname}"},
				dataType : "json",
				success:function(data){
					if(data && data.type && data.type.indexOf("SUCCESS") != -1){
						location.reload();
						return;
					}
					
					alert(data.message);
				},
				error : function(request, e){
					alert(e);
				}
			});
			
			// must return false
			return false;
		});
	});  
</script>
</head>
<body>
 <!--content start-->
<div class="content">
<div class="table">
  <div class="contentNav"><h1><span class="allIco2 ico_6"></span>资源管理</h1></div>
  <!--内容 start-->
<div class="function">
<ul>
  <form action="${ctx }/resource/upload" method="post" ENCTYPE="multipart/form-data" id="fileForm">  
  	 <li id="liNav">你可以：</li>
     <input type="file" name="file" />
     <shiro:hasPermission name="resource:upload">
     	<input id="uploadFile" type="submit" value=" 上传文件  "/>  
     </shiro:hasPermission>
  </form>
   <input id=“back” type="button" value="返回" class="button1" onclick="javascript:history.go(-1);"/>
</ul>
<div class="clear"></div>
</div>   
<form id="myForm" action="${ctx }/resource/list" method="get">
<input type="hidden" name="pathname" value="${param.pathname}"/>
<div class="addList">
  <table cellpadding="1" cellspacing="1"  class="table_bj">
    <tr class="table_top">
      <td class="dot" width="30%">文件名称</td>
      <td>文件路径</td>
      <td>文件最后修改时间</td>
      <td width="7%">操作</td>
    </tr>
     <c:forEach items="${page.result }" var="bean" varStatus="status">
		<tr class="table_con">
			<td class="dot">
			<c:choose>
				<c:when test="${bean.directory }">
				<a href="${ctx }/resource/list?pathname=${codec:urlEncode(bean.path)}"> [目录]&nbsp;${bean.name}</a>
				</c:when>
				<c:otherwise>
				[普通文件]&nbsp;${bean.name}
				</c:otherwise>
			</c:choose>
			&nbsp;
			</td>
			<td>${bean.path }&nbsp;</td>
			<td class="lastModified">${bean.lastModified }</td>
			<td>
				<shiro:hasPermission name="resource:delete">
					<c:choose>
						<c:when test="${!bean.directory }">
						<a href="javascript:void(0);" id ="${bean.path }" name="${bean.name }" class="del">删除</a>&nbsp;
						</c:when>
					</c:choose>
					<a href="${ctx }/resource/download?pathname=${codec:urlEncode(bean.path)}" >下载</a>&nbsp;
				</shiro:hasPermission>
			</td>
		</tr>
    </c:forEach>
  </table>
</div> 

<div class="contactBbutton">
	<jsp:include page="/common/cms/page.jsp" />
</div>

<!--list end--> 
<!--内容 end--> 
</form>
</div></div>
  <!--content end-->
</body>
</html>

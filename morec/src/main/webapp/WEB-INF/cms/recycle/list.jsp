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
	  
	  $(".recover").each(function(){
		  
		 var $this = $(this);
		 $this.click(function(){
			 if(confirm("确定恢复该数据吗？")){
				 var id = $this.attr("id");
				 $.ajax({
					 url : "${ctx}/recycle/recover",
					 type : "POST",
					 data : {"id" : id },
					 success : function(){
						 alert("恢复文件成功！");
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
<div class="clear"></div>
</div>   
<form id="myForm" action="${ctx }/resource/list" method="get">
<input type="hidden" name="pathname" value="${param.pathname}"/>
<div class="addList">
  <table cellpadding="1" cellspacing="1"  class="table_bj">
    <tr class="table_top">
      <td class="dot" width="30%">文件名称</td>
      <td>文件原始路径</td>
      <td>文件删除时间</td>
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
				<shiro:hasPermission name="recycle:recover">
						<a href="javascript:void(0);" id ="${bean.id }" class="recover">恢复</a>&nbsp;
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

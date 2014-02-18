<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<%@include file="/common/cms/taglibs.jsp"%>
<%@include file="/common/cms/common-header.jsp" %>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script type="text/javascript">

	function search(){
		var date = document.getElementById("datepicker").value;
		var patten =/^[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9]$/;
		
		if(!patten.test(date)){
			alert("请输入正确的日期格式!");
			document.getElementById("datepicker").focus();
			return false;
		}	
			location.href = "${ctx}/log/"+date+"/search";
	};
	
	$(function(){
			
	$(".deleteDATA").click(function(){
		
		if(!confirm("确定删除该条日志记录吗？")){
			return false;
		}
	});
	
	$("#bulkDel").click(function(){
			var items = youboy.select();
			if(items && items.length > 0 && confirm("你确定要删除这些日志内容吗?")){
				$('input[name="_method"]').remove();
				$("#myForm").attr("action", "${ctx}/log/delete")
							.attr("method","post")
							.append('<input type="hidden" name="_method" value="DELETE" />')
							.submit();
				
				return false;
			}
			
			alert("请先选择要删除的内容");
			return false;
		});
		
	
	
	$(function() {
		
		$('#datepicker').datepicker({  
           	dateFormat: 'yy-mm-dd',  
      		 prevText:'前一月',
      		 nextText:'后一月',
      		 monthNames:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
     		 currentText:' ',
        });  
		
	});


	
	
		
});
</script>
</head>
<body>
<form id="myForm" action="" method="get">
 <!--content start-->
<div class="content">
<div class="table">
  <div class="contentNav"><h1><span class="allIco2 ico_6"></span>日志管理</h1></div>

  <!--内容 start-->
<div class="function">
<ul>
  <li id="liNav">你可以：</li>
  
  <shiro:hasPermission name="site:bulkDelete">
  <li><a id="bulkDel" href="#">删除</a></li>
  </shiro:hasPermission>
  </ul>
  <div class="clear"></div>
  </div>   
  
  
 
  
  <!--信息搜索 start-->
    <div class="search"><ul>
    <li>日期： <input type="text" id="datepicker" value="">(格式:1970-01-01)</li>
	
   <li>
    <input id="searchLogs" name="searchLogs" type="button" value="查询" onclick="return search();"   />
   </li>
    </ul>
    
    <div class="clear"></div>
    </div>
   <!--信息搜索 end--> 
  
<div class="addList">
  <table cellpadding="1" cellspacing="1"  class="table_bj">
    <tr class="table_top">
     
      <td width="5%"><jsp:include page="/common/cms/checkall.jsp"></jsp:include>&nbsp;</td>
      <td>操作人</td>
      <td>详细信息</td>
      <td>时间</td>
      <td>操作</td>
    </tr>
    

   <c:forEach items="${page.result}" var="logs">
   	<tr class="table_con">
     
	      <td><input type="checkbox" name="items" id="checkbox" value="${logs.id}"/></td>
	      <td>${logs.user}</td>
	      <td>${logs.content}</td>
	      <td><fmt:formatDate value="${logs.date }" pattern="yyyy-MM-dd HH:mm:ss"/>&nbsp;</td>
     	<td>
     	<shiro:hasPermission name="log:delete">
			<a href="${ctx }/log/${logs.id}/delete" class="deleteDATA" id="${logs.id }">删除</a>&nbsp;
		</shiro:hasPermission>
		</td>
    </tr>
   </c:forEach>
   
  </table>
</div> 

<!--list end--> 

<div class="contactBbutton">
	<jsp:include page="/common/cms/page.jsp" />
</div>
<!--内容 end--> 
  
</div></div>
</form>
  <!--content end-->
</body>
</html>

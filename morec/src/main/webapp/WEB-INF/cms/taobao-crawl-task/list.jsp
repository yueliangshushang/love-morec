<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<%@include file="/common/cms/taglibs.jsp"%>
<%@include file="/common/cms/common-header.jsp" %>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script src="${ctx }/resources/js/jquery-timer.js" type="text/javascript"></script>
<script type="text/javascript">
$(function(){
	
	$("body").everyTime("30s","taskMonitor",function(){
		var number = Math.floor(Math.random()*50);
		$.ajax({
			url : "${ctx}/taobao-crawl-task/status?n="+number,
			dataType : "json",
			success : function(data){
				$(".taskStatus").each(function(){
					var $task = $(this);
					if(data && data.length > 0){
						$(data).each(function(index, runningTask){
							
							var currentTask = $task.attr("id");
							if(currentTask === runningTask.concat("status")){
								$task.empty().append("&nbsp;RUNNING");
							}
							else {
								$task.empty().append("&nbsp;STOPED");
							}
						});
						
						return;
					}
					else {
						$task.empty().append("&nbsp;STOPED");
					}
				});
			}
		});
	});
	
	$(".collect").click(function(){
		
		if(confirm("确定启动该采集数据吗？")){
			var $this = $(this);
			var id = $this.attr("id");
			
			$.ajax({
				url : "${ctx }/taobao-crawl-task/"+id+"/run",
				type : "POST",
				success : function(data){
					if(data && data.type && data.type.indexOf("ERROR") != -1){
						alert(data.message);
						return;
					}
					
					$("#" + id + "status").empty().append("&nbsp;RUNNING");
				}
			});			
		}
		
		return false;
	});
	
	$(".del").click(function(){
		if(confirm("确定删除该数据吗？")){
			var $this = $(this);
			var id = $this.attr("id");
			
			$.ajax({
				url : "${ctx }/taobao-crawl-task/" + id + "/delete",
				type : "GET",
				success : function(){
					alert("删除成功！");
					location.reload();
					return;
				},
				error : function(){
					alert("删除失败!");
				}
				
			});
		};
		return false;
	});
});
</script>
</head>
<body>
<form id="myForm" action="" method="get">
 <!--content start-->
<div class="content">
<div class="table">
  <div class="contentNav"><h1><span class="allIco2 ico_6"></span>采集管理</h1></div>

  <!--内容 start-->
<div class="function">
<ul>
  <li id="liNav">你可以：</li>
  <shiro:hasPermission name="collect:create">
  <li><a id="add" href="${ctx }/taobao-crawl-task/create">新增</a></li>
  </shiro:hasPermission>
  <shiro:hasPermission name="collect:bulkDelete">
  <li><a id="bulkDel" href="#">删除</a></li>
  </shiro:hasPermission>
  </ul>
  <div class="clear"></div>
  </div>   
  
  
   <!--信息搜索 start-->
    <div class="search"><ul>
    <li>名称： <input type="text" name="name" value="${param.name }" class="input1" /></li>
   <li>
    <div class="searcBbutton"><input id="search" name="search" type="submit" value="提交" class="button1" id="OK" />&nbsp;<input id="reset" name="reset" type="button" value="清空" class="button1" id="Reset" /></div></li>
    </ul>
    <div class="clear"></div>
    </div>
        <!--信息搜索 end--> 
   
<div class="addList">
  <table cellpadding="1" cellspacing="1"  class="table_bj">
    <tr class="table_top">
      <td width="5%"><jsp:include page="/common/cms/checkall.jsp"></jsp:include>&nbsp;</td>
      <td class="dot" width="20%">名称</td>
      <td width="10%">淘宝类别ID</td>
      <td width="10%">采集状态</td>
      <td width="10%">所属分类</td>
      <td width="20%">cron表达式</td>
      <td>操作</td>
    </tr>
    <c:forEach items="${page.result }" var="taobaoCrawlTask">
		<tr class="table_con">
			<td><input type="checkbox" name="items" id="checkbox" value="${taobaoCrawlTask.id}"/></td>
			<td class="dot">${taobaoCrawlTask.name }</td>
			<td>${taobaoCrawlTask.cid }</td>
			<td id="${taobaoCrawlTask.id }status" class="taskStatus">&nbsp;${taobaoCrawlTask.status }</td>
			<td>&nbsp;${taobaoCrawlTask.channel.name}</td>
			<td>&nbsp;${taobaoCrawlTask.cron }</td>
			<td>
				<shiro:hasPermission name="taobao-crawl-task:start">
					<a class="collect" id = ${taobaoCrawlTask.id } href="javascrip:void(0);">采集</a>&nbsp;&nbsp;
				</shiro:hasPermission>
				<shiro:hasPermission name="taobao-crawl-task:edit">
					<a href="${ctx }/taobao-crawl-task/${taobaoCrawlTask.id}/edit" >编辑</a>&nbsp;&nbsp;
				</shiro:hasPermission>
				<shiro:hasPermission name="taobao-crawl-task:delete">
					<a href="javascript:void(0)" class="del" id="${taobaoCrawlTask.id }">删除</a>&nbsp;&nbsp;
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

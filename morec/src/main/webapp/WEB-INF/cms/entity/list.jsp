<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<%@include file="/common/cms/taglibs.jsp"%>
<%@include file="/common/cms/common-header.jsp" %>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script type="text/javascript">
	$(function(){
		$("#add").click(function(){
			location.href = "${ctx}/entity/create";
		});
		
		$("#bulkDel").click(function(){
			var items = youboy.select();
			if(items && items.length > 0 && confirm("你确定要删除这些内容吗?")){
				$('input[name="_method"]').remove();
				$("#myForm").attr("action", "${ctx}/entity/delete")
							.attr("method","post")
							.append('<input type="hidden" name="_method" value="DELETE" />')
							.submit();
				
				return false;
			}
			
			alert("请先选择要删除的内容");
			return false;
		});
		
	});
</script>
<style>
.overflow {
     width: 150px;
     white-space: nowrap;
     text-overflow: ellipsis;
     -o-text-overflow: ellipsis;
     overflow: hidden;   
}
</style>
</head>
<body>
<form id="myForm" action="" method="get">
 <!--content start-->
<div class="content">
<div class="table">
  <div class="contentNav"><h1><span class="allIco2 ico_6"></span>栏目管理</h1></div>

  <!--内容 start-->
<div class="function">
<ul>
  <li id="liNav">你可以：</li>
  <shiro:hasPermission name="entity:create">
  <li><a id="add" href="#">新增</a></li>
  </shiro:hasPermission>
  <shiro:hasPermission name="entity:bulkDelete">
  <li><a id="bulkDel" href="#">删除</a></li>
  </shiro:hasPermission>
  </ul>
  <div class="clear"></div>
  </div>   
  
  
   <!--信息搜索 start-->
    <div class="search"><ul>
    <li>名称： <input type="text" name="q" value="${param.q}" class="input1" />
    <input type="hidden" name="path" value="" class="input1" />
    </li>
    <li>
    按 <td colspan="2"><select name="filed" id="filed">
      <option value="id" >id</option>
      <option value="title" >标题</option>
	</select>
</td>查询
    </li>
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
      <td>ID</td>
      <td>标题</td>
      <td>所属分类</td>
      <td>图片</td>
      <td>价格</td>
      <td>属性</td>
      <td>操作</td>
    </tr>
    <c:choose>
		<c:when test="${not empty page.result}">
			<c:forEach items="${page.result}" var="entity" begin="0">
				<tr class="table_con">
					<td><input type="checkbox" name="items" id="checkbox" value="${entity.id}"/></td>
					<td>${entity.id}</td>
					<td><div class="overflow" title="${fn:trim(entity.title)}"><a href="${entity.loc}" target="_blank">${fn:trim(entity.title)}</a></div></td>
					<td><div  title="${fn:trim(entity.classify)}">${fn:trim(entity.classify)}</div></td>
					<td><img width="50" height="50" src="${entity.image}" alt="" /></td>
					<td>${entity.price}</td>
					<td><div class="${entity.props==''? '':'overflow'}" title="${fn:trim(entity.props)}">${fn:trim(entity.props)}</div></td>	
					<td>
						<shiro:hasPermission name="entity:edit">
							<a href="${ctx }/entity/${entity.id}/edit" >编辑</a>&nbsp;
						</shiro:hasPermission>
					</td>
				</tr>
			</c:forEach>
		</c:when>
		<c:otherwise>
			<tr class="table_con"><td colspan="7" align="center"><b>暂无内容</b></td></tr>
		</c:otherwise>
	</c:choose>
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

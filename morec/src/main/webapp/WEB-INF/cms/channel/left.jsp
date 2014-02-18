<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="/common/cms/taglibs.jsp" %>
<%@include file="/common/cms/common-header.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

</head>


<body>
<script type="text/javascript">
var myTree = new dTree('myTree');
$.ajax({
	url:"${ctx}/channel/tree",
	dataType:"json",
	success:function(myData){
		myTree.add("0","-1","栏目管理","","栏目管理");
		for(var i=0;i<myData.length;i++){
			var obj=myData[i];
			myTree.add(obj.id,obj.fatherId,obj.name,obj.clickUrl,obj.name);	
		}
		//document.write(myTree);
		var i=myTree+"";
		$("#TT").append(i);

		$(".dTreeNode").first().addClass("y");
	}
});
myTree.config.target="main";
myTree.config.useCookies=false;
myTree.config.inOrder=true;
</script>
	<div id="TT" class="total">
	</div>
</body>
</html>

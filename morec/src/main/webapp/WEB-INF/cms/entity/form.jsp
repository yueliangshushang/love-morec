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
   <form:form method="post" modelAttribute="entity">
   <input type="hidden" name="_method" value="put"></input>
   <div class="content">
   <div class="table">
   <div class="contentNav"><h1><span class="allIco2 ico_6"></span>内容管理</h1></div>
   <div class="tips"><img src="${ctx}/resources/images/tips.gif" align="left" />所有带有<span class="red">*</span>为必填项</div>
   <div class="info border">
       <table cellpadding="0" cellspacing="0" border="0" width="100%">
           <tbody>
              <tr>
                 <td>标题</td><td><form:input path="title" cssClass="input5 fontMar"/></td>
              </tr>
              <tr>
                 <td>图片</td><td><form:input path="image" cssClass="input5 fontMar"/></td>
              </tr>
              <tr>
                 <td>价格</td><td><form:input path="price" cssClass="input5 fontMar"/></td>
              </tr>
              <tr>
                 <td>链接</td><td><form:input path="loc" cssClass="input5 fontMar"/></td>
              </tr>
              <tr>
                 <td>品牌</td><td><form:input path="brand" cssClass="input5 fontMar"/></td>
              </tr>
              <tr>
                 <td>名称</td><td><form:input path="sitename" cssClass="input5 fontMar"/></td>
              </tr>
              <tr>
                 <td>描述</td><td><form:textarea path="descr" cols="42" rows="10"></form:textarea></td>
              </tr>
              <tr>
                 <td>属性</td><td><form:textarea path="props" cols="42" rows="10"></form:textarea></td>
              </tr>
              <tr>
                 <td>附属图片</td><td><form:input path="moreImages" cssClass="input5 fontMar"/></td>
              </tr>
           </tbody>
       </table>
   
       </div>
       <div class="contactBbutton">
		<input id="ok" type="submit" value="提交" class="button1" />&nbsp;
		<input id=“back” type="button" value="返回" class="button1" onclick="javascript:history.go(-1);"/>
	   </div>
   </div>
   </div>
   </form:form>
</body>
</html>
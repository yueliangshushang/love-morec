<#include "/common/front/taglibs.ftl" />
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title><#if q?exists>${q }</#if>搜索结果页_一呼百应服装网购导航</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords" content="<#if q?exists>${q }</#if>，最新<#if q?exists>${q }</#if>，特价<#if q?exists>${q }</#if>，<#if q?exists>${q }</#if>搭配技巧，一呼百应服装网购导航" />
<meta name="description" content="一呼百应服装网购导航搜索到<#if q?exists>${q }</#if>相关的服装服饰共<#if page?exists>${page.totalCount}</#if>件，包含最新最热卖的<#if q?exists>${q }</#if>，特价<#if q?exists>${q }</#if>。" />
<#include "/WEB-INF/front/template/front-common-header.ftl">
<link href="${ctx}/resources/css/style.css" rel="stylesheet" type="text/css" />
<link href="${ctx}/resources/css/banner.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
$(function() {
	youboy.we().ready().whyNotSharing().wouldYouLoveMe().moreQueryMoreHappy("${ctx}/search");
});
</script>
</head>
<body scroll="no" style="overflow-x:hidden">
<#include "/WEB-INF/front/template/navigation.ftl" />
	<div class="main">
	<div class="partition">在搜索<a href="${ctx}/search/${q?url}"><#if q?exists>${q }</#if></a> 时找到商品 <strong>${page.totalCount}</strong> 件</div>
		<div class="share">
			<div class="share-seco" id="ckepop">
				<span class="jiathis_txt">分享到:</span>
				<a href="#" id="fxwb" class="weibo" title="分享到QQ空间" rel="nofollow"><img alt="分享到QQ空间" src="${ctx}/resources/images/share/ico_qs.gif" />QQ空间</a><a href="#" id="fxsina" class="weibo" title="分享到新浪微博"rel="nofollow"><img alt="分享到新浪微博"src="${ctx}/resources/images/share/ico_sina.gif" />新浪微博</a><a href="#" id="fxqw" class="weibo" title="分享到腾讯微博" rel="nofollow"> <img alt="分享到腾讯微博" src="${ctx}/resources/images/share/ico_qw.gif" />腾讯微博</a>
				<div class="clear"></div>
			</div>
		</div>
    </div>
	</div>
	<div class="seek">
		<ul class="seek-ul">
			<li class="pink_bg"><a href="#" title="一周热卖${q?url}排行"><span class="hotest"><span class="hotest-icon"></span>7天最热</span></a></li>
			<li class="gray_bg">
				<#if page.order == 'asc'>
				      <a href="${ctx}/search/${q?url}/page/${page.pageNo}/createTime/desc" class="new" title="最新上架${q}排行" ><span class="new-icon"></span>最新上架</a>
				<#else>
				      <a href="${ctx}/search/${q?url}/page/${page.pageNo}/createTime/asc" class="new" title="最新上架${q}排行"><span class="new-icon"></span>最新上架</a>     
				</#if>				
			</li>
			<li class="gray_bg">
				<#if page.order == 'asc'>
				      <a href="${ctx}/search/${q?url}/page/${page.pageNo}/price/desc" class="seek-price" title="按价格降序排行" ><span class="price-icon"></span>价格</a>
				<#else>
				      <a href="${ctx}/search/${q?url}/page/${page.pageNo}/price/asc" class="seek-price" title="按价格升序排行"><span class="price-icon"></span>价格</a>      
				</#if>
			</li>
		</ul>
	</div>
	<div class="clear"></div>
	<div class="list1"></div>
	<div class="content">
		<div class="sider"><br/>
			<dl class="gadget-area">
				<dt class="tian">
					<span class="title1"><span class="nvzhuang">${q}热卖</span>推荐
					</span>
				</dt>
				<dd>
				   <ul>
				     <#if hotSale?size gt 0>
				     	<#list hotSale as entity>
					    	<li>
					    	   <a href="${ctx}/show/${entity.id}.html" target="_blank"><img src="${entity.image}" title="${entity.title?trim}" alt="${entity.title?trim}" />
					    	   <strong>${entity.title?trim}</strong>
					    	   </a>
					    	</li>
					 	</#list>
					 <#else>
					          暂时没找到哦！
					 </#if>
					</ul>
				</dd>
			</dl>
		</div>
	<div class="container">
	<div class="images-list">
		  <#if alarm>
		       <div class="images-list notes">
		         <p>你好，系统检测到你提交的关键词有误！</p>
		         <dl class="gadget-area">
		            <dt>建议您：</dt>
		            <dd>检查输入文字是否包含特殊符号</dd>
		            <dd>按F5刷新试试</dd><dd>换个搜索词再试试</dd>
		        </dl>
		       </div>
		       <#else>
		         <ul>
					<#list page.result as entity>
						<li>
							<a href="${ctx}/show/${entity.id}.html" target="_blank"><img class="lazy" original="${entity.image}" src="${ctx }/resources/images/loading.gif" alt="${entity.title?trim}" title="${entity.title}"/></a>
							<span class="price">￥${entity.price}</span>
							<a target="_blank" href="${ctx}/show/${entity.id}.html" class="desc" alt="${entity.title}" title="${entity.title}">${entity.title}</a>
						</li>
					</#list>
		        </ul>
		  </#if>  
	<div class="clear"></div>
	</div>
	        <#assign pagingUrl="${ctx}/search/${q?url}">
			<#include  "/WEB-INF/front/template/paging.ftl">
	</div>
		<div class="clear"></div>
	</div>
	<div id="returntop"></div>
	<div class="cl" id="snow"></div>
	<#include "/WEB-INF/front/template/footer.ftl">
</body>
</html>
<#include "/common/front/taglibs.ftl" />
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>${channel.name }频道_${channel.name }网购|一呼百应服装网购导航</title>
<meta name="keywords" content="热卖${channel.name }，特价${channel.name }，${channel.name }搭配，流行${channel.name } " />
<meta name="description" content="一呼百应服装网购导航${channel.name }频道，为你提供当前最流行的${channel.name }，${channel.name }搭配推荐，网购${channel.name }首选一呼百应服装网购导航。 "  />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<#include "/WEB-INF/front/template/front-common-header.ftl">
<script language="javascript" src="${ctx}/resources/js/DD_roundies_min.js"></script>
<script type="text/javascript">
$(function() {
	youboy.we().ready().whyNotSharing().wouldYouLoveMe().moreQueryMoreHappy("${ctx}/search");
	var $path = $("#<#if channel?exists>${channel.path}</#if>");
	if($path.length === 0){
		$path = $("#<#if channel.father?exists>${channel.father.path}</#if>");
	}
	$path.addClass("navheader1");
});
</script>
</head>
<body>
<#include "/WEB-INF/front/template/navigation.ftl" />
	<div class="main">
		<div class="partition">
			<strong><a href="${ctx }/">首页</a></strong>
			<#if channel.father?exists>
				<#if channel.father.father?exists>
					&nbsp;&gt;<a href="${ctx }/channel/${channel.father.father.path}" >${channel.father.father.name}</a>
				</#if>
				&nbsp;&gt;<a href="${ctx }/channel/${channel.father.path}">${channel.father.name}</a>
			</#if>
			&nbsp;&gt;<strong><a href="${ctx }/channel/${channel.path}">${channel.name}</a> </strong>分类下 
			<#if page.totalCount lt 0>暂没有商品<#else>找到商品 <strong>${page.totalCount}</strong>件</#if>
		   </div>
		<div class="share">
			<div class="share-seco" id="ckepop">
				<span class="jiathis_txt">分享到：</span>
				<a href="#" id="fxwb" class="weibo" title="分享到QQ空间" rel="nofollow"><img alt="分享到QQ空间" src="${ctx}/resources/images/share/ico_qs.gif" />QQ空间</a>
				<a href="#" id="fxsina" class="weibo" title="分享到新浪微博"rel="nofollow"><img alt="分享到新浪微博"src="${ctx}/resources/images/share/ico_sina.gif" />新浪微博</a>
				<a href="#" id="fxqw" class="weibo" title="分享到腾讯微博" rel="nofollow"> <img alt="分享到腾讯微博" src="${ctx}/resources/images/share/ico_qw.gif" />腾讯微博</a>
				<div class="clear"></div>
			</div>
		</div>
		<dl class="allgoods">
		 	<#if channelQueryFacet?size gt 0>
		 		<dd class="first_li">
		 			<#list channelQueryFacet?keys as channelKeys>
		 				<strong class="text-content"><a href="${ctx}/channel/${channelQueryFacet[channelKeys].channel.path}" title="${channelQueryFacet[channelKeys].channel.title}">${channelQueryFacet[channelKeys].channel.name}</a><span>(${channelQueryFacet[channelKeys].number})</span></strong>
					</#list>
				</dd>
			</#if>
		</dl>
	</div>
	<div class="seek">
		<ul class="seek-ul">
			<li class="pink_bg"><a href="#" title="一周热卖${channel.name}排行"><span class="hotest"><span class="hotest-icon"></span>7天最热</span></a></li>
			<li class="gray_bg">
				<#if page.order=="asc">
					<a href="${ctx}/channel/${channel.path}/page/${page.pageNo}/createTime/desc" class="new" title="最新上架${channel.name}排行"><span class="new-icon"></span>最新上架</a>
				<#else>
					<a href="${ctx}/channel/${channel.path}/page/${page.pageNo}/createTime/asc" class="new" title="最新上架${channel.name}排行"><span class="new-icon"></span>最新上架</a>
				</#if>
			</li>
			<li class="gray_bg">
				<#if page.order=="asc">
					<a href="${ctx}/channel/${channel.path}/page/${page.pageNo}/price/desc" class="seek-price" title="按价格降序排行"><span class="price-icon"></span>价格</a>
				<#else>
					<a href="${ctx}/channel/${channel.path}/page/${page.pageNo}/price/asc" class="seek-price" title="按价格升序排行"><span class="price-icon"></span>价格</a>
				</#if>
			</li>
			</li>
		</ul>
	</div>
	<div class="clear"></div>
	<div class="list1"></div>
	<div class="content">
		<div class="sider">
			<#if hotKeyWord?size gt 0>
				<dl class="buzzword-area">
				<dt class="tian"><span class="title"><span class="nvzhuang">${channel.name}</span>热门关键词</span></dt>
					<#if hotKeyWord?size gt 15>
						<#list hotKeyWord[0..15] as keyWord>
							<dd class="bd-radius"><a href="${ctx }/search/${keyWord?url}">${keyWord}</a></dd>
						</#list>
					<#else>
						<#list hotKeyWord as keyWord>
							<dd class="bd-radius"><a href="${ctx }/search/${keyWord?url}">${keyWord}</a></dd>
						</#list>
					</#if>
				</dl>
			</#if>
			<dl class="gadget-area">
				<dt class="tian"><span class="title"><span class="nvzhuang">${channel.name}热卖</span>推荐</span></dt>
				<dd>
					<ul>
					<#if hotSale?size gt 0>
						<#list hotSale as entity>
							<li><a href="${ctx}/show/${entity.id}.html" target="_blank"><img src="${entity.image}" title="${entity.title?trim}" alt="${entity.title?trim}" /><strong>${entity.title?trim}</strong></a></li>
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
				<ul>
					<#list page.result as entity>
						<li>
							<a href="${ctx}/show/${entity.id}.html" target="_blank"><img class="lazy" original="${entity.image}" src="${ctx }/resources/images/loading.gif" alt="${entity.title?trim}" title="${entity.title}"/></a>
							<span class="price">￥${entity.price}</span>
							<a target="_blank" href="${ctx}/show/${entity.id}.html" class="desc" alt="${entity.title}" title="${entity.title}">${entity.title}</a>
						</li>
					</#list>
				</ul>
				<div class="clear"></div>
			</div>
			<#assign pagingUrl="${ctx}/channel/${channel.path}">
			<#include  "/WEB-INF/front/template/paging.ftl">
		</div>
		<div class="clear"></div>
	</div>
	<div id="returntop"></div>
<#include "/WEB-INF/front/template/footer.ftl">
</body>
</html>


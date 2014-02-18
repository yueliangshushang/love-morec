<#include "/common/front/taglibs.ftl" />
<!DOCTYPE html PUBLIC "-/W3C/DTD XHTML 1.0 Transitional/EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>${entity.title?trim}</title>
<meta name="keywords" content="<#if entity.tagAsList?size gt 0><#list entity.tagAsList as tag>${tag} </#list>，</#if>一呼百应服装网购导航" />
<meta name="description" content="${entity.title?trim}，价格：${entity.price }元，信息来自一呼百应服装网购导航" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<#include "/WEB-INF/front/template/front-common-header.ftl">
<script language="javascript" src="${ctx}/resources/js/DD_roundies_min.js"></script>
<script type="text/javascript">DD_roundies.addRule('.websjy', '15px 15px 15px 15px', true);</script>
<script type="text/javascript">
$(function(){
	youboy.we().ready().whyNotSharing().wouldYouLoveMe().moreQueryMoreHappy("${ctx}/search").moreTagMoreFunny("${ctx}/show/${entity.id}/tags").showMenu();
});
</script>
</head>
<body>
<#include "/WEB-INF/front/template/navigation.ftl" />
<div class="navy">
<ul class="navsecond">
	<li class="navall">
		<a href="#">所有分类</a>
		<div class="menuSub" id="menu1">
			<#list channels as channels>
				<dl><dt><strong><a href="${ctx}/search/${channels.name?url}">${channels.name}</a></strong></dt>
					<dd>
						<#list channels.children as channel>
							<a href="${ctx}/channel/${channel.path}" title="${channel.title}">${channel.name}</a>
						</#list>
					</dd>
				</dl>
			</#list>
		</div>
	</li>
	<li><a href="${ctx}/search/${'日韩'?url}" title="日韩" >日韩一族</a><a href="${ctx}/search/${'意大利'?url}" title="意大利">情迷意大利</a><a href="${ctx}/search/${'英伦风'?url}" title="英伦风">英伦风格</a><a href="${ctx}/search/${'甜蜜'?url}" title="甜蜜教主">甜蜜教主</a><a href="${ctx}/search/${'波西米亚'?url}" title="波西米亚风潮">波西米亚风潮</a></li>
</ul>
</div>

<div class="main">
	<div class="partition">
		<a href="${ctx }/">首页</a>
			<#if channel?exists>
				<#if channel.father?exists>&nbsp;&gt; <a href="${ctx }/channel/${channel.father.path}">${channel.father.name}</a></#if>
				&nbsp;&gt; <a href="${ctx }/channel/${channel.path}">${channel.name}</a>
			</#if>
		&nbsp;&gt; ${entity.title?trim}
	</div>
</div>

<div class="c_main">
		<div class="c_left">
			<h1>${entity.title?trim}<span id="hot_img_bg"></span></h1>
			${entity.descr?trim}
			<div class="c_380">
			<#if neighbour.prev?exists>
				<a href="${ctx }/show/${neighbour.prev.id }.html" class="c_lbt" alt="上一个" title="上一个"><img src="${ctx}/resources/images/c_l.gif" /></a>
			</#if>
			<div class="c_img">
					<img src="${entity.image }" width="450px" height="430px" title="${entity.title?trim}" alt="${entity.title?trim}"/>
			</div>
			<#if neighbour.next?exists>
				<a href="${ctx }/show/${neighbour.next.id }.html" class="c_rbt" alt="下一个" title="下一个"><img src="${ctx}/resources/images/c_r.gif" /></a>
			</#if>
			<div class="clear"></div>
			</div>
			<div class="link">
				<div class="links">
					<p class="relative"><label>标签：</label>
					<#if entity.tagAsList?size gt 0>
						<#if entity.tagAsList?size gt 5>
							<#list entity.tagAsList[1..5] as tag>
								<a href="${ctx }/search/${tag}" title="试试以${tag }关键词搜索" class="websjy">${tag}</a>
							</#list>
						<#else>
							<#list entity.tagAsList as tag>
								<a href="${ctx }/search/${tag}" title="试试以${tag }关键词搜索" class="websjy">${tag}</a>
							</#list>
						</#if>
					</#if>
					
						
					</p>
					<div class="clear"></div>
					<div class="share">
						<div class="share-seco" id="ckepop">
						<p>信息来自：一呼百应服装网购导航  <a href="${ctx }/">http://clothing.youboy.com</a></p> 
							<span class="jiathis_txt">分享到：</span>
							<a href="#" id="fxwb" class="weibo" title="分享到QQ空间" rel="nofollow"><img alt="分享到QQ空间" src="${ctx}/resources/images/share/ico_qs.gif" />QQ空间</a> 
							<a href="#" id="fxsina" class="weibo" title="分享到新浪微博" rel="nofollow"><img alt="分享到新浪微博" src="${ctx}/resources/images/share/ico_sina.gif" /> 新浪微博</a>
							<a href="#" id="fxqw" class="weibo" title="分享到腾讯微博" rel="nofollow"><img alt="分享到腾讯微博" src="${ctx}/resources/images/share/ico_qw.gif" />腾讯微博</a>
							<div class="clear"></div> 
						</div>
					</div>
					</p>
				</div>
				<div class="price">
					${entity.sitename }
					<p>￥<span>${entity.price }</span>&nbsp<a href="${entity.loc}" class="purchase" rel="nofollow" target="_blank">去购买</a></p>
				</div>
			</div>
			<div class="clear"></div>
			<div class="fashion">
				<p class="title">同类型服装推荐</p>
				<ul class="catogry">
					<#if entity.tagAsList?size gt 0>
						<#if entity.tagAsList?size gt 5>
							<#list entity.tagAsList[1..5] as tag>
							<li>
								<a class="list" href="${ctx }/search/${tag}" target="_blank"><img class="${tag }" title="试试以${tag }关键词搜索" src="${ctx }/resources/images/loading.gif" /></a>
								<p><a href="${ctx }/search/${tag}" title="试试以${tag }关键词搜索" target="_blank">${tag}</a></p>
							</li>
							</#list>
						<#else>
							<#list entity.tagAsList as tag>
							<li>
								<a class="list" href="${ctx }/search/${tag}" target="_blank"><img class="${tag }" title="试试以${tag }关键词搜索" src="${ctx }/resources/images/loading.gif" /></a>
								<p><a href="${ctx }/search/${tag}" title="试试以${tag }关键词搜索" target="_blank">${tag}</a></p>
							</li>
							</#list>
						</#if>
					</#if>
					
				</ul>
			</div>
			<div class="clear"></div>
			<div class="like">
				<p class="likes">喜欢此款服装的人还喜欢……</p>
				<ul class="catogry">
					<#if moreLikeThis?size gt 15>
						<#list moreLikeThis[0..15] as moreLikeThis>
							<li>
								<a target="_blank" class="list" href="${ctx }/show/${moreLikeThis.id }.html" title="${moreLikeThis.title }"><img class="lazy" original="${moreLikeThis.image}" src="${ctx}/resources/images/loading.gif" alt="${moreLikeThis}"></a>
								<p><a target="_blank" href="${ctx }/show/${moreLikeThis.id }.html" title="${moreLikeThis.title}">${moreLikeThis.title}</a></p>
							</li>
						</#list>
					<#else>
						<#list moreLikeThis as moreLikeThis>
							<li>
								<a target="_blank" class="list" href="${ctx }/show/${moreLikeThis.id }.html" title="${moreLikeThis.title }"><img class="lazy" original="${moreLikeThis.image}" src="${ctx}/resources/images/loading.gif" alt="${moreLikeThis}"></a>
								<p><a target="_blank" href="${ctx }/show/${moreLikeThis.id }.html" title="${moreLikeThis.title}">${moreLikeThis.title}</a></p>
							</li>
						</#list>
					</#if>
				</ul>
			</div>
		</div>
	  <div class="c_right">
      <div class="info">
      <p class="care">同价位<span><#if channel?exists>${channel.name}<#else>单品</#if></span>推荐</p>
      	<ul>
      	
      	<#if samePrice?size gt 0>
      		<#if samePrice?size gt 7>
				<#list samePrice[0..7] as samePrice>
					<li><a target="_blank" href="${ctx }/show/${samePrice.id}.html" >${samePrice.title}</a></li>
				</#list>
			<#else>
				<#list samePrice as samePrice>
					<li><a target="_blank" href="${ctx }/show/${samePrice.id}.html" >${samePrice.title}</a></li>
				</#list>
			</#if>
      	<#else>
      		暂时没找到哦！
      	</#if>
        </ul>
      </div>
      <div><script type="text/javascript"> var cpro_id = 'u727949';</script><script src="http://cpro.baidu.com/cpro/ui/c.js" type="text/javascript"></script></div>
      </div><div class="clear"></div>
	</div>
	<#include "/WEB-INF/front/template/footer.ftl">
</body>
</html>
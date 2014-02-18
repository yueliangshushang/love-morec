<#include "/common/front/taglibs.ftl" />
<link href="${ctx}/resources/css/banner.css" rel="stylesheet" type="text/css" />
<div class="cell">
			<div id="logo">
				<a href="${ctx }/" title="一呼百应服装网导航"><img src="${ctx}/resources/images/logo.gif" width="190" height="53" title="一呼百应服装网购导航" alt="一呼百应服饰导航"/></a>
		  </div>
            <div class="midheader">
			<div class="search">
                <input type="text" class="write" value="<#if q?exists>${q }</#if>" maxlength="20">
		        <input type="button" class="bt" value="搜索" id="search">
		    <div class="clear"></div>
            </div>
            <p>
			 	<a href="${ctx}/search/${'礼物'?url}">新年礼物</a>
			 	<a href="${ctx}/search/${'军装风'?url}">军装风</a>
                <a href="${ctx}/search/${'河智苑同款'?url}">河智苑同款</a>
			 	<a href="${ctx}/search/${'情侣'?url}">情侣</a>
			 	<a href="${ctx}/search/${'GUESS'?url}">GUESS</a>
			 	<a href="${ctx}/search/${'party'?url}">party</a>
			</p>
		</div> 
            <span class="collect_head"><a id="favorite" href="#" title="收藏一呼百应服饰导航">收藏本页</a>|<a href="${ctx}/" title="一呼百应服装导航">首页</a></span>
	</div>
	<div class="nav">
			<ul class="navfirst">
				<li id="home"><a href="${ctx}/" title="首页">首页</a></li>
				<#list channels as channel>
					<li id="${channel.path}"><a href="${ctx}/channel/${channel.path}" title="${channel.name}">${channel.name}</a></li>
				</#list>
			</ul>
	</div>
	
<#include "/common/front/taglibs.ftl" />
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>一呼百应服装网购导航-女装、男装、童装、内衣专业网购平台</title>
<meta name="keywords" content="一呼百应服装网购导航，服装搭配，流行服饰，特价服装，热卖服装品牌，男装，女装，童装，内衣" />
<meta name="description" content="一呼百应服装网购导航包含女装、男装、童装、内衣四大服装网购频道，为你推荐最流行的、最热门的服装服饰品牌与搭配技巧" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<#include "/WEB-INF/front/template/front-common-header.ftl">
<script src="${ctx}/resources/js/jquery.KinSlideshow-1.2.1.min.js" type="text/javascript"></script>
<script type="text/javascript">
$(function() {
	youboy.we().ready().wouldYouLoveMe().moreQueryMoreHappy("${ctx}/search").showMenu();
	$('#home').addClass("navheader1");
	$("#KinSlideshow").KinSlideshow({
		moveStyle:"down",
		intervalTime:8,
		mouseEvent:"mouseover",
		titleFont:{TitleFont_size:14,TitleFont_color:"#FF0000"}
	});
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
   <div class="banner">
      <div class="bleft">
      	<#--图片轮回广告-->
         <div class="flash">
		      <div id="KinSlideshow" style="visibility:hidden;">
		        <a href="${ctx}/search/${'女装'?url}" target="_blank"><img src="${ctx}/resources/flashimages/01.jpg" alt="时尚女装" width="690" height="300" /></a>
		        <a href="${ctx}/search/${'男装'?url}" target="_blank"><img src="${ctx}/resources/flashimages/02.jpg" alt="超酷男装" width="690" height="300" /></a>
		        <a href="${ctx}/search/${'内衣'?url}" target="_blank"><img src="${ctx}/resources/flashimages/03.jpg" alt="风情内衣" width="690" height="300" /></a>
		        <a href="${ctx}/search/${'童装'?url}" target="_blank"><img src="${ctx}/resources/flashimages/04.jpg" alt="可爱童装" width="690" height="300" /></a>
		    </div> 
         </div>
         <div class="brand">
            <p>分类</p>
            <ul>
            	<#list channels as channels>
            		<li>
            			<span>${channels.name}</span>
						<span class="flcon">
							<#list channels.children as channel>
								<a href="${ctx}/channel/${channel.path}" title="${channel.title}">${channel.name}</a>
							</#list>
							<a href="${ctx}/channel/${channels.path}" title="查看更多${channels.name}" class="mores">更多>></a><div class="clear"></div>
						</span>
					</li>
				</#list>
              	
            </ul>
            <div class="clear"></div>
         </div>
      </div>
      <div class="bright">
         <div class="tuijian"><a href="${ctx }/channel/women/page/1/createTime/asc"><img src="${ctx}/resources/images/tuijian.jpg" width="295" height="282"  alt="推荐商品"/></a></div>
         <div class="brbottom">
            <dl>
               <dt>购物推荐</dt>
               <dd><a href="${ctx}/search/${'新款羽绒服'?url}" title="年年新款羽绒服，年年焕然新感觉！">年年新款羽绒服，年年焕然新感觉！</a></dd>
               <dd><a href="${ctx}/search/${'保暖外套'?url}" title="要风度也要温度，保暖外套汇总！">要风度也要温度，保暖外套汇总！</a></dd>
               <dd><a href="${ctx}/search/${'围巾'?url}" title="可爱的你，赶快寻找一款暖暖的围巾吧！">可爱的你，赶快寻找一款暖暖的围巾吧！</a></dd>
               <dd><a href="${ctx}/search/${'豹纹'?url}" title="豹纹内衣，豹纹皮衣...全系豹纹肿么办？">豹纹内衣，豹纹皮衣...全系豹纹肿么办？</a></dd>
            </dl>
         </div>
      </div>
      <div class="clear"></div>
   </div>
   
<#if channelGroupResult?size gt 0>
	<#list channelGroupResult?keys as channelGroupKeys>
<#if channelGroupKeys?number == 19>
	<#assign entityLists = channelGroupResult[channelGroupKeys]>   
   <div class="list women">
      <div class="fonts"><h2>女式服装<span>women</span></h2></div>
      <ul class="pinpai">
 <li>热门女装品牌：
 <a href="${ctx }/search/${'女佐丹奴'?url}" title="佐丹奴">佐丹奴</a>
 <a href="${ctx }/search/${'女唐狮'?url} " title="唐狮">唐狮</a>
 <a href="${ctx }/search/${'女太平鸟'?url}" title="太平鸟">太平鸟</a>
 <a href="${ctx }/search/${'女乔伊思'?url}" title="乔伊思">乔伊思</a>
 <a href="${ctx }/search/${'女香奈儿'?url}" title="香奈儿">香奈儿</a>
 <a href="${ctx }/search/${'女欧时力'?url}" title="欧时力">欧时力</a>
 <a href="${ctx }/search/${'女真维斯'?url}" title="真维斯">真维斯</a>
 <a href="${ctx }/search/${'女阿玛尼'?url}" title="阿玛尼">阿玛尼</a>
 <a href="${ctx }/search/${'女爱美丽'?url}" title="爱美丽">爱美丽</a>
 <a href="${ctx }/search/${'女美特斯邦威'?url}" title="美特斯邦威">美特斯邦威</a>
 <a href="${ctx }/search/${'女东京着衣'?url}" title="东京">东京着衣</a></li>
     </ul>
      <div class="left">
         <ul class="show">
         	<li class="show1"><a href="${ctx}/channel/women"><img src="${ctx}/resources/images/goods/pic1.gif" width="252" height="365"  alt="女装" title="女装"/></a></li>
		 		<#if entityLists?size gt 0>
		 			<#if entityLists?size lt 5>
				 		<#list entityLists as entity>
				 			 <li class="show2"><a href="${ctx}/show/${entity.id}.html" title="${entity.title?trim}" alt="${entity.title?trim}" target="_blank"><img src="${entity.image}" width="180" height="181" title="${entity.title?trim}" alt="${entity.title?trim}"/></a></li>
				 		</#list>
				 	<#else>
				 		<#list entityLists[0..5] as entity>
				 			 <li class="show2"><a href="${ctx}/show/${entity.id}.html" title="${entity.title?trim}" alt="${entity.title?trim}" target="_blank"><img src="${entity.image}" width="180" height="181" title="${entity.title?trim}" alt="${entity.title?trim}"/></a></li>
				 		</#list>
			 		</#if>
		 		</#if>
         </ul>
      </div>
      <div class="right">
          <div class="cd1">
              <ul>
                <li><a class="ac0" title="女式T恤" href="${ctx }/search/${'女装T恤'?url}">T恤</a></li>
                <li><a class="ac1" title="女式裙子" href="${ctx }/search/${'裙子'?url}">裙子</a></li>
                <li><a class="ac2" title="女式衬衫" href="${ctx }/search/${'女装衬衫'?url}">衬衫</a></li>
                <li><a class="ac3" title="女式针织" href="${ctx }/search/${'女装针织'?url}">针织</a></li>
                <li><a class="ac4" title="女式西装" href="${ctx }/search/${'女士西装'?url}">西装</a></li>
                <li><a class="ac5"  title="女式风衣" href="${ctx }/search/${'女装风衣'?url}">风衣</a></li>
                <li><a class="ac6"  title="女式羽绒服" href="${ctx }/search/${'女装羽绒服'?url}">羽绒服</a></li>
                <li><a class="ac7" title="女式皮衣" href="${ctx }/search/${'女装皮衣'?url}">皮衣</a></li>
                <li><a class="ac8"  title="女式毛衣" href="${ctx }/search/${'女装毛衣'?url}">毛衣</a></li>
                <li><a class="ac9" title="女式外套" href="${ctx }/search/${'女装外套'?url}">外套</a></li>
                <li><a class="ac10"  title="女式牛仔裤" href="${ctx }/search/${'女装牛仔裤'}">牛仔裤</a></li>
                <li><a class="ac11"  title="女式卫衣" href="${ctx }/search/${'女装卫衣'?url}">卫衣</a></li>
                <li><a class="ac12"  title="孕妇装" href="${ctx }/search/${'孕妇装'?url}">孕妇装</a></li>
            </ul>
        </div>
     </div><div class="clear"></div>
   </div>
</#if>
<#if channelGroupKeys?number == 20>
	<#assign entityLists = channelGroupResult[channelGroupKeys]>   
    <div class="list man">
     <div class="fonts"><h2>男式服装<span>men</span></h2></div>
     <ul class="pinpai">
       <li>热门男装品牌：
       <a href="${ctx }/search/${'男堡狮龙'?url}" title="堡狮龙">堡狮龙</a>
       <a href="${ctx }/search/${'男卡顿'?url}" title="卡顿">卡顿</a>
       <a href="${ctx }/search/${'男七匹狼'?url}" title="七匹狼">七匹狼</a>
       <a href="${ctx }/search/${'零号男'?url}" title="零号男">零号男</a>
       <a href="${ctx }/search/${'男奥派阿西'?url}" title="奥派阿西">奥派阿西</a>
       <a href="${ctx }/search/${'男耐克'?url}" title="耐克">耐克</a>
       <a href="${ctx }/search/${'男彪马'?url}" title="彪马">彪马</a>
       <a href="${ctx }/search/${'男李宁'?url}" title="李宁">李宁</a>
       <a href="${ctx }/search/${'男佐丹奴'?url}" title="佐丹奴">佐丹奴</a>
       <a href="${ctx }/search/${'男真维斯'?url}" title="真维斯">真维斯</a>
       <a href="${ctx }/search/${'劲霸男装'?url}" title="劲霸男装">劲霸男装</a></li>
     </ul>
      <div class="left">
         <ul class="show">
         	<li class="show8"><a href="${ctx}/channel/man"><img src="${ctx}/resources/images/goods/pic8.gif" width="252" height="365"  alt="西装" title="西装"/></a></li>
		 		<#if entityLists?size gt 0>
		 			<#if entityLists?size lt 5>
				 		<#list entityLists as entity>
				 			 <li class="show2"><a href="${ctx}/show/${entity.id}.html" title="${entity.title?trim}" alt="${entity.title?trim}" target="_blank"><img src="${entity.image}" width="180" height="181" title="${entity.title?trim}" alt="${entity.title?trim}"/></a></li>
				 		</#list>
				 	<#else>
				 		<#list entityLists[0..5] as entity>
				 			 <li class="show2"><a href="${ctx}/show/${entity.id}.html" title="${entity.title?trim}" alt="${entity.title?trim}" target="_blank"><img src="${entity.image}" width="180" height="181" title="${entity.title?trim}" alt="${entity.title?trim}"/></a></li>
				 		</#list>
			 		</#if>
		 		</#if>
         </ul>
      </div>
      <div class="right">
          <div class="cd2">
              <ul>
                <li><a class="ac0" title="男式T恤" href="${ctx }/search/${'男式T恤'?url}">T恤</a></li>
                <li><a class="ac1" title="男式羊绒衫" href="${ctx }/search/${'男装羊绒衫'?url}">羊绒衫</a></li>
                <li><a class="ac2" title="男式衬衫" href="${ctx }/search/${'男装衬衫'?url}">衬衫</a></li>
                <li><a class="ac3" title="男式针织衫" href="${ctx }/search/${'男装针织衫'?url}">针织衫</a></li>
                <li><a class="ac4" title="男式西装" href="${ctx }/search/${'男装西装'?url}">西装</a></li>
                <li><a class="ac5"  title="男式夹克" href="${ctx }/search/${'男装夹克'?url}">夹克</a></li>
                <li><a class="ac6"  title="男式羽绒服" href="${ctx }/search/${'男装羽绒服'?url}">羽绒服</a></li>
                <li><a class="ac7" title="男式皮衣" href="${ctx }/search/${'男装皮衣'?url}">皮衣</a></li>
                <li><a class="ac8"  title="男式毛衣" href="${ctx }/search/${'男装毛衣'?url}">毛衣</a></li>
                <li><a class="ac9" title="男式外套" href="${ctx }/search/${'男装外套'?url}">外套</a></li>
                <li><a class="ac10"  title="男式牛仔裤" href="${ctx }/search/${'男装牛仔裤'?url}">牛仔裤</a></li>
                <li><a class="ac11"  title="男式卫衣" href="${ctx }/search/${'男装卫衣'?url}">卫衣</a></li>
            </ul>
		 </div>
      </div>
      <div class="clear"></div>
   </div>
 </#if>
 <#if channelGroupKeys?number == 21>
	<#assign entityLists = channelGroupResult[channelGroupKeys]>   
    <div class="list children">
     <div class="fonts"><h2>童装<span>children</span></h2></div>
     <ul class="pinpai">
       <li>热门童装品牌：<a href="${ctx }/search/${'迪士尼'?url}" title="小虎宝儿">Disney迪士尼</a>
       <a href="${ctx }/search/${'小虎宝儿'?url}" title="小虎宝儿">小虎宝儿</a>
       <a href="${ctx }/search/${'安宝儿'?url}" title="安宝儿">安宝儿</a>
       <a href="${ctx }/search/${'童装佐丹奴'?url}" title="Giordano佐丹奴">Giordano佐丹奴</a>
       <a href="${ctx }/search/${'童装阿杰邦尼'?url}" title="阿杰邦尼">阿杰邦尼</a>
       <a href="${ctx }/search/${'童装瓢虫之家'?url}" title="瓢虫之家">瓢虫之家</a></li>
     </ul>
      <div class="left">
         <ul class="show">
        	<li class="show15"><a href="${ctx}/channel/child"><img src="${ctx}/resources/images/goods/pic15.gif" width="252" height="365"  alt="外套" title="外套"/></a></li>
		 		<#if entityLists?size gt 0>
		 			<#if entityLists?size lt 5>
				 		<#list entityLists as entity>
				 			 <li class="show2"><a href="${ctx}/show/${entity.id}.html" title="${entity.title?trim}" alt="${entity.title?trim}" target="_blank"><img src="${entity.image}" width="180" height="181" title="${entity.title?trim}" alt="${entity.title?trim}"/></a></li>
				 		</#list>
				 	<#else>
				 		<#list entityLists[0..5] as entity>
				 			 <li class="show2"><a href="${ctx}/show/${entity.id}.html" title="${entity.title?trim}" alt="${entity.title?trim}" target="_blank"><img src="${entity.image}" width="180" height="181" title="${entity.title?trim}" alt="${entity.title?trim}"/></a></li>
				 		</#list>
			 		</#if>
		 		</#if>
         </ul>
      </div>
      <div class="right">
           <div class="cd1">
              <ul>
               <li><a class="ac0" title="童装T恤" href="${ctx }/search/${'童装T恤'?url}">T恤</a></li>
                <li><a class="ac1" title="童装裙子" href="${ctx }/search/${'童装裙子'?url}">裙子</a></li>
                <li><a class="ac2" title="童装衬衫" href="${ctx }/search/${'童装衬衫'?url}">衬衫</a></li>
                <li><a class="ac3" title="童装针织" href="${ctx }/search/${'童装针织'?url}">针织</a></li>
                <li><a class="ac4" title="童装西装" href="${ctx }/search/${'童装西装'?url}">西装</a></li>
                <li><a class="ac5"  title="童装风衣" href="${ctx }/search/${'童装风衣'?url}">风衣</a></li>
                <li><a class="ac6"  title="童装羽绒服" href="${ctx }/search/${'童装羽绒服'?url}">羽绒服</a></li>
                <li><a class="ac7" title="童装皮衣" href="${ctx }/search/${'童装皮衣'?url}">皮衣</a></li>
                <li><a class="ac8"  title="童装毛衣" href="${ctx }/search/${'童装毛衣'?url}">毛衣</a></li>
                <li><a class="ac9" title="童装外套" href="${ctx }/search/${'童装外套'?url}">外套</a></li>
                <li><a class="ac10"  title="童装牛仔裤" href="${ctx }/search/${'童装牛仔裤'?url}">牛仔裤</a></li>
                <li><a class="ac11"  title="童装卫衣" href="${ctx }/search/${'童装卫衣'?url}">卫衣</a></li>
            </ul>
          </div>
      </div>
      <div class="clear"></div>
   </div>
 </#if>
 <#if channelGroupKeys?number == 38>
	<#assign entityLists = channelGroupResult[channelGroupKeys]>   
   <div class="list underwear">
     <div class="fonts"><h2>内衣<span>underwear</span></h2></div>
     <ul class="pinpai">
       <li>热门内衣品牌：<a href="${ctx }/search/${'浪莎'?url}" title="浪莎">浪莎</a>
       			  <a href="${ctx }/search/${'纤丝鸟'?url}" title="纤丝鸟">纤丝鸟</a>
       			  <a href="${ctx }/search/${'恒源祥'?url}" title="恒源祥">恒源祥</a>
       			  <a href="${ctx }/search/${'北极绒'?url}" title="北极绒">北极绒</a>
       			  <a href="${ctx }/search/${'兰缪'?url}" title="兰缪">兰缪</a>
       			  <a href="${ctx }/search/${'欧美'?url}" title="欧美">欧美</a></li>
     </ul>
       <div class="left">
         <ul class="show">
          	<li class="show22"><a href="${ctx}/channel/underwear"><img src="${ctx}/resources/images/goods/pic22.gif" width="252" height="365"  alt="保暖内衣" title="保暖内衣"/></a></li>
		 		<#if entityLists?size gt 0>
		 			<#if entityLists?size lt 5>
				 		<#list entityLists as entity>
				 			 <li class="show2"><a href="${ctx}/show/${entity.id}.html" title="${entity.title?trim}" alt="${entity.title?trim}" target="_blank"><img src="${entity.image}" width="180" height="181" title="${entity.title?trim}" alt="${entity.title?trim}"/></a></li>
				 		</#list>
				 	<#else>
				 		<#list entityLists[0..5] as entity>
				 			 <li class="show2"><a href="${ctx}/show/${entity.id}.html" title="${entity.title?trim}" alt="${entity.title?trim}" target="_blank"><img src="${entity.image}" width="180" height="181" title="${entity.title?trim}" alt="${entity.title?trim}"/></a></li>
				 		</#list>
			 		</#if>
		 		</#if>
         </ul>
      </div>
      <div class="right">
         <div class="cd4">
              <ul>
                <li ><a class="ac0" title="文胸"  href="${ctx }/search/${'文胸'?url}">文胸</a></li>
                <li><a class="ac1" title="内裤" href="${ctx }/search/${'内裤'?url}">内裤</a></li>
                <li><a class="ac2" title="袜子" href="${ctx }/search/${'袜子'?url}袜子"></a></li>
                <li><a class="ac3" title="保暖内衣" href="${ctx }/search/${'保暖内衣'?url}">保暖内衣</a></li>
                <li><a class="ac4" title="打底裤" href="${ctx }/search/${'打底裤'?url}">打底裤</a></li>
                <li><a class="ac5"  title="睡衣" href="${ctx }/search/${'睡衣'?url}">睡衣</a></li>
             </ul>
		 </div>
     </div>
     <div class="clear"></div>
   </div>
   </#if>
 </#list>
</#if>
   <div class="hot">
      <h3>热卖服饰</h3>
<div id=featureContainer>
<div id=feature>
<div id=block>
<div id=botton-scroll>
<ul class=featureUL>
  <li class=featureBox>
  <div class=box><a href="${ctx }/show/ZfIZre.html" target="_blank"><img alt="推荐款！2011夏装 新款女装黑/白简约V领修身短袖T恤..."  src="http://img02.taobaocdn.com/bao/uploaded/i2/T1I5iaXcNhXXaasjo9_103823.jpg_b.jpg" width="240" height="150" /></a></div>
  </li>
    <li class=featureBox>
  <div class=box><a href="${ctx }/show/6nA7F3.html" target="_blank"><img alt="2011秋冬新款男士日韩版修身林弯弯条纹开衫play外套..."  src="http://img04.taobaocdn.com/bao/uploaded/i4/T1B7x7XeBAXXaZLUEW_024841.jpg_b.jpg" width="240" height="150" /></a></div>
  </li>
    <li class=featureBox>
  <div class=box><a href="${ctx }/show/z6nyuy.html" target="_blank"><img alt="2011新款秋冬韩版驼色毛领毛呢加厚女装配腰带外套"  src="http://img04.taobaocdn.com/bao/uploaded/i8/T1co4RXcpGXXbYCR3T_013006.jpg_b.jpg" width="240" height="150" /></a></div>
  </li>
    <li class=featureBox>
  <div class=box><a href="${ctx }/show/VfmyYj.html" target="_blank"><img alt="2011冬装 韩版童装 宝宝男童女童 羊羔绒棉衣棉服"  src="http://img02.taobaocdn.com/bao/uploaded/i2/T1wGWuXbtCXXbK6GEY_025411.jpg_b.jpg" width="240" height="150" /></a></div>
  </li>
   <li class=featureBox>
  <div class=box><a href="${ctx }/show/u2aEby.html" target="_blank"><img alt="VIVI 充满爱意桃心款 可爱日韩少女内衣套装文胸套装..."  src="http://img01.taobaocdn.com/bao/uploaded/i1/T1ja9mXfFuXXb5ugrb_093832.jpg_b.jpg" width="240" height="150" /></a></div>
  </li>
   <li class=featureBox>
  <div class=box><a href="${ctx }/show/FR3qQj.html" target="_blank"><img alt="㊣2011瑞丽秋冬新款韩版淑女上衣 风情镂空钩织挖背背.."  src="http://img02.taobaocdn.com/bao/uploaded/i6/T1P5lNXf4hXXbXgeI1_040725.jpg_b.jpg" width="240" height="150" /></a></div>
  </li>
  
</ul></div></div><a class=prev href="javascript:void();">Previous</a><a class=next href="javascript:void();">Next</a> 
</div>
</div>
   </div>
</div>
	<div id="returntop"></div>
<link rel=stylesheet type=text/css href="${ctx}/resources/css/lrtk.css" />
<script type=text/javascript charset=utf-8 src="${ctx}/resources/js/lrscroll.js"></script>
<#include "/WEB-INF/front/template/footer.ftl">
	</body>
</html>
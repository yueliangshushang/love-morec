<#include "/common/front/taglibs.ftl" />
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8">
		<title><#if keyword?exists>${keyword}</#if>搜索结果页_<#if keyword?exists>${keyword}</#if>网购-3C信息网 <#if page.pageNo gt 1>第${page.pageNo}页</#if></title>
		<meta name="keywords" content="<#if keyword?exists>${keyword}</#if>,<#if keyword?exists>${keyword}</#if>介绍,<#if keyword?exists>${keyword}</#if>价格,<#if keyword?exists>${keyword}</#if>图片,<#if keyword?exists>${keyword}</#if>网购">
		<meta name="description" content="3C信息网提供<#if keyword?exists>${keyword}</#if>相关介绍、价格、图片等购物信息">
		<link href="${ctx}/resources/front/css/header_full.css" rel="stylesheet" type="text/css">
		<link href="${ctx}/resources/front/css/package_v1.css" rel="stylesheet" type="text/css">
		<link href="${ctx}/resources/front/css/gb.css" rel="stylesheet" type="text/css">
		<link href="${ctx}/resources/front/css/search.css" rel="stylesheet" type="text/css">
		
		<script type="text/javascript" src="${ctx}/resources/front/js/jquery-1.7.1.js" charset="UTF-8"></script>
		<script type="text/javascript" src="${ctx}/resources/front/js/global.js" charset="UTF-8"></script>
		<script type="text/javascript" src="${ctx}/resources/front/js/list.js" charset="UTF-8"></script>
		<script type="text/javascript" src="${ctx}/resources/front/js/list_visithistory.js" charset="UTF-8"></script>
	</head>
	<body class="more3c_1280">
		<#include "/WEB-INF/front/template/navigation.ftl" />
		<div id="container" class="main">
			<div class="crumbs">
				您搜索的是:<a href="${ctx}/">首页</a>&gt;<span><#if keyword?exists>${keyword}</#if></span>
			</div>
			<div class="content">
				<div class="mod_price" id="list">
					<#--
					<dl>
						<dt>
							价格：
						</dt>
						<dd>
							<a class="current" href="">全部</a>
							<a href="">500元以下</a><a href="">500-1000</a>
							<a href="">1000-1500</a><a href="">1500-2000</a>
							<a href="">2000-3000</a><a href="">3000-4000</a>
						</dd>
					</dl>
					<p class="split"></p>
					
					<div id="price_panel" class="custom">
						<div class="init">
							<span>￥</span>
							<input type="text" value="最低价" d="最低价">
							<span>至￥</span>
							<input type="text" value="最高价" d="最高价">
						</div>
						<div class="foused" style="display: none;">
							<p>
								<a class="btn_common" onClick="return false;" href="">清除</a>
								<a class="btn_strong" onClick="return false;" href="">确定</a>
							</p>
						</div>
					</div>					
					<p class="today">
						<label>
							<input type="checkbox" onClick="YouBoy3C.app.list.todayShipper(this)">
							只显示当日发货
						</label>
					</p>
					-->
				</div>
				<#--
				<script>YouBoy3C.app.list.initPriceRange();</script>
				<div class="mod_order">
					<span class="sortstyle"><strong>显示：</strong>
					<span class="viewmode status_pic"><a class="icon_pic" href=""><b></b>图片</a><a class="icon_list" href=""><b></b>列表</a></span></span>
					<span class="orderlist"><strong>排列：</strong>
					<span class="con_secure "><a class="title" href="javascript:;" id="current_sort_type">默认排序<b></b></a>
					<span class="secure" id="sort_type_select" style="display: none;">
						<a href="" lg="1004" pos="1">价格从低到高</a>
						<a href="" lg="1004" pos="2">价格从高到低</a>
						<a href="" lg="1004" pos="3">销量从高到低</a>
						<a href="" lg="1004" pos="4">评论从高到低</a>
						<a href="" lg="1004" pos="5" >默认排序</a>
					</span></span> 
					<script type="text/javascript">YouBoy3C.app.list.initHoverEvent(document.getElementById('current_sort_type'), document.getElementById('sort_type_select'));</script>
					<span class="con_list"><a pos="2" class="order_up" href=""><b></b>价格</a> <a class="order_down" href=""><b></b>销量</a> <a class="order_down" href=""><b></b>评论</a> </span> </span>
				</div>
				-->
				<div class="mod_goods id_pic">
					<ul class="list_goods">
						<#if page.result?size gt 0>
						<#list page.result as entity>
						<li class="item_list">
							<div class="wrap_attr"></div>
							<a class="link_pic" href="${ctx}/${entity.id}.html" target="_blank"><img src="${entity.image}_200x200.jpg" alt="${entity.title?trim}" title="${entity.title?trim}">
							<#--<i class="mark_xinpin">特价</i>-->
							</a>
							<div class="wrap_info">
								<h4 class="link_name">
									<a target="_blank" href="${ctx}/${entity.id}.html" title="${entity.title?trim}">${entity.title?trim}</a>
								</h4>
								<p class="hot"></p>
								<p class="comment">
									评论 ：
									<span class="icon_star"><b style="width: 100%"></b></span>(${entity.commentCount}条)
								</p>
							</div>
							<div class="wrap_price">
								<p class="price_market">
									市场价：
									<del>￥${entity.oldprice}.00</del>
								</p>
								<p class="price_icson">
									商城价：
									<strong class="hot">￥${entity.price}.00</strong>
								</p>
							</div>
							<div class="wrap_btn">
								<a target="_blank" href="${ctx}/${entity.id}.html"class="btn_strong">去看看</a><#--<a class="btn_compare" href="" onClick=""><span>加入对比</span></a>-->								
							</div>
							
						</li>
						</#list>
						</#if>
					</ul>
				</div>
				<#-- page include s-->
				<#assign pagingUrl="${ctx}/search?keyword=${keyword}&pageNo=">
				<#assign pagingUrlSuffix="&orderBy=createTime&order=asc">
				<#include  "/WEB-INF/front/template/front-common-paging.ftl">
				<#-- page include e -->
			</div>
			<div class="sidebar">
				<#--
				<div class="mod_blue sort_product">
					<div class="inner">
						<div class="hd">
							<h3>
								产品分类
							</h3>
						</div>
						<div class="bd">
							<!-- BEGIN category_second_block ->
							<h4 class="tit">
								手机通讯
							</h4>
							<div class="con">
								<dl class="list_sort">
									<dd>
										<a ytag="47000" lg="1001" title="对讲机" href="">对讲机</a>
									</dd>
									<dd>
										<a ytag="47001" class="sel" lg="1001" title="手机" href="">手机</a>
									</dd>
								</dl>
							</div>
							<!-- END category_second_block ->
						</div>
					</div>
				</div>
				-->
				<div id="g_tuan_list">
					<div class="mod_aider id_group">
						<div class="inner">
							<div class="hd">
								<h3>本期新推广<#--<span>进行中</span>--></h3>
								<#--
								<div class="time">
									<i class="btn_left"></i>
									<label id="i_tuan_clock">
										<span>16</span>时
										<span>17</span>分
										<span>58.3</span>秒
									</label>
									<i class="btn_right"></i>
								</div>
								-->
							</div>
							<div class="bd">
								<ul class="list">
									<#list newSale as newEnity>
									<li pid="223051">
										<a href="${ctx}/${newEnity.id}.html" target="_blank" class="img_wrap"><img
												alt="${newEnity.title}"
												src="${newEnity.image}_160x160.jpg"><#--<i class="mark_tuangou"><span>1</span>0折</i>--></a>
										<p class="name">
											<a title="${newEnity.title}"
												href="${ctx}/${newEnity.id}.html" target="_blank">${newEnity.title}</a>
										</p>
										<p class="strong"></p>
										<p class="price_wrap">
											<span class="i_price">￥${newEnity.price}</span>
											<span class="nor">市场价：<del>￥${newEnity.oldprice}</del></span>
										</p>
										<#--
										<p class="stock nor">
											库存：
											<span class="stock_enough"><span class="stock_enough_inner" style="width: 92%;"></span></span>
										</p>
										-->
										<p class="buyed nor">
											<span class="nu">${newEnity.commentCount}</span>人已购买
										</p>
										<p class="btn_wrap">
											<a href="${ctx}/${newEnity.id}.html" target="_blank" class="btn_buy">立即看看</a>
										</p>
									</li>
									</#list>									
								</ul>
							</div>
							<#--
							<div style="float: right; margin-right: 10px; margin-bottom: 10px;">
								<a href="" target="_blank" style="color: #085C9B">更多团购商品&gt;&gt;</a>
							</div>
							-->
						</div>
					</div>
				</div>
				<div class="mod_aider id_sameprice">
					<div class="inner">
						<div class="hd">
							<h3>
								本周热销榜
							</h3>
						</div>
						<div class="bd">
							<ul class="list_goods list_pic_left">
								<#list hotSale as hotEntity>
								<li class="top">
									<b class="aid">${hotEntity_index+1}</b><a href="${ctx}/${hotEntity.id}.html" target="_blank">
									<span class="img"><img src="${hotEntity.image}_60x60.jpg"></span></a>
									<span class="link_info"><a href="${ctx}/${hotEntity.id}.html" target="_blank">
									<strong class="name">${hotEntity.title}</strong></a>
									<span class="price"><span class="strong">￥${hotEntity.price}.00</span></span>
									</span>
								</li>
								</#list>
							</ul>
						</div>
					</div>
				</div>
				<!-- S 最近浏览过的 -->
				<div class="mod_aider id_saw">
					<div class="inner">
						<div class="hd"><h3>最近浏览过的</h3></div>
						<div class="bd" id="visitList">
							<ul class="visit_list_goods list_goods list_pic_left">
								<#--<li>
									<a href="" target="_blank" class="img">
										<img src="${ctx}/resources/resource/images/list/43-017-250.jpg" alt=""
											class=""> </a>
									<span class="link_info"><a href="" target="_blank">
											<strong class="name">Panasonic 松下 TH-P55VT31C
												55英寸等离子电视</strong> </a> <span class="price strong"> ￥10799.00 </span> </span>
								</li>-->
							</ul>
							<div class="clear_jilu">
								<a href="" onClick="return false" t="clearHistory">清除浏览历史</a>
								<p></p>
							</div>
						</div>
					</div>
				</div>
				<!-- E 最近浏览过的-->
			</div>
		</div>
		<div id="visitList_tpl" style="display: none"></div>
		<#include "/WEB-INF/front/template/footer.ftl" />
		<script type="text/javascript"> window.yPageId = '3112'; window.yPageLevel = '3';</script>
		<script type="text/javascript">
			YouBoy3C = YouBoy3C || {};
			YouBoy3C.logic.header.loginStatus();
			YouBoy3C.page = YouBoy3C.age || {};
			YouBoy3C.page.defaultSearch = [];
			YouBoy3C.logic.header.initDefaultSearch();
		</script>
	</body>
</html>
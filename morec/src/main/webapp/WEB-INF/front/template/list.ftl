<#include "/common/front/taglibs.ftl" />
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8">
		<title>${channel.name}-3C信息网 <#if page.pageNo gt 1>第${page.pageNo}页</#if></title>
		<meta name="keywords" content="${channel.name},${channel.name}报价,${channel.name}价格,${channel.name}行情,${channel.name}网购,${channel.name}导购">
		<meta name="description" content="3C信息网${channel.name}频道提供${channel.name}介绍、报价、图片等购物信息">
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
				<a href="">首页</a> &gt;	
				<#if channel.father?exists>
				<#if channel.father.father?exists>
				<a href="${ctx }/category/${channel.father.father.id}-0-0-0-1-0.html" id="${channel.father.father.id}">${channel.father.father.name}</a> &gt;
				</#if>
				<a href="${ctx }/category/${channel.father.id}-0-0-0-1-0.html" id="${channel.father.id}">${channel.father.name}</a> &gt;
				</#if><span>${channel.name}</span>
			</div>
			<div class="content">
				
				<div class="ft_cond">
					<!-- 2.4.筛选属性 start -->
					
					<div class="catschoose">
						<#--
						<ul class="operation_area" hotname="I.LIST.FILTER">

							<li>
								<dl>
									<dt>
										品牌：
									</dt>
									<dd>
										<dl>
											<dt>
												<strong><a ytag="41000" href="" class="current">全部</a>
												</strong>
											</dt>
											<dd>
												<a ytag="41001" lg="1022" href="">Samsung 三星</a>
											</dd>
											<dd>
												<a ytag="41002" lg="1022" href="">Nokia 诺基亚</a>
											</dd>
											<dd>
												<a ytag="41003" lg="1022" href="">Motorola 摩托罗拉</a>
											</dd>
											<dd>
												<a ytag="41004" lg="1022" href="">HTC</a>
											</dd>
											<dd>
												<a ytag="41005" lg="1022" href="">Sony Ericsson 索尼爱立信</a>
											</dd>
											<dd>
												<a ytag="41006" lg="1022" href="">Coolpad 酷派</a>
											</dd>
											<dd>
												<a ytag="41007" lg="1022" href="">Apple 苹果</a>
											</dd>
											<dd>
												<a ytag="41008" lg="1022" href="">Sharp 夏普</a>
											</dd>
											<dd>
												<a ytag="41009" lg="1022" href="">LG</a>
											</dd>
											<dd>
												<a ytag="41010" lg="1022" href="">Huawei 华为</a>
											</dd>
											<dd>
												<a ytag="41011" lg="1022" href="">Lenovo 联想</a>
											</dd>
											<dd>
												<a ytag="41012" lg="1022" href="">ZTE 中兴</a>
											</dd>
											<dd>
												<a ytag="41013" lg="1022" href="">K-Touch 天语</a>
											</dd>
											<dd>
												<a ytag="41014" lg="1022" href="">HYUNDAI 现代</a>
											</dd>
											<dd>
												<a ytag="41015" lg="1022" href="">Philips 飞利浦</a>
											</dd>
											<dd>
												<a ytag="41016" lg="1022" href="">Sony 索尼</a>
											</dd>
											<dd>
												<a ytag="41017" lg="1022" href="">Alcatel-Lucent 阿尔卡特</a>
											</dd>
											<dd>
												<a ytag="41018" lg="1022" href="">首信</a>
											</dd>
											<dd>
												<a ytag="41019" lg="1022" href="">TCL 王牌</a>
											</dd>
											<dd>
												<a ytag="41020" lg="1022" href="">Blackberry 黑莓</a>
											</dd>
											<dd>
												<a ytag="41021" lg="1022" href="">Haier 海尔</a>
											</dd>
											<dd>
												<a ytag="41022" lg="1022" href="">小米</a>
											</dd>
											<dd>
												<a ytag="41023" lg="1022" href="">Hisense 海信</a>
											</dd>
											<dd>
												<a ytag="41024" lg="1022" href="">AUX 奥克斯</a>
											</dd>
											<dd>
												<a ytag="41025" lg="1022" href="">Amoi 夏新</a>
											</dd>
										</dl>
									</dd>
								</dl>
							</li>
							<li>
								<dl>
									<dt>
										外观设计：
									</dt>
									<dd>
										<dl>
											<dt>
												<strong><a ytag="41026" href="" class="current">全部</a>
												</strong>
											</dt>
											<dd>
												<a ytag="41027" lg="1022" href="">直板</a>
											</dd>
											<dd>
												<a ytag="41028" lg="1022" href="">翻盖</a>
											</dd>
											<dd>
												<a ytag="41029" lg="1022" href="">滑盖</a>
											</dd>
											<dd>
												<a ytag="41030" lg="1022" href="">侧滑</a>
											</dd>
											<dd>
												<a ytag="41031" lg="1022" href="">旋盖</a>
											</dd>
											<dd>
												<a ytag="41032" lg="1022" href="">折叠式</a>
											</dd>
										</dl>
									</dd>
								</dl>
							</li>
							<li>
								<dl>
									<dt>
										操作系统：
									</dt>
									<dd>
										<dl>
											<dt>
												<strong><a ytag="41033" href="" class="current">全部</a>
												</strong>
											</dt>
											<dd>
												<a ytag="41034" lg="1022" href="">Android2.1及以下</a>
											</dd>
											<dd>
												<a ytag="41035" lg="1022" href="">Android 2.2</a>
											</dd>
											<dd>
												<a ytag="41036" lg="1022" href="">Android 2.3</a>
											</dd>
											<dd>
												<a ytag="41037" lg="1022" href="">Android 4.0</a>
											</dd>
											<dd>
												<a ytag="41038" lg="1022" href="">Windows Phone</a>
											</dd>
											<dd>
												<a ytag="41039" lg="1022" href="">iPhone OS</a>
											</dd>
											<dd>
												<a ytag="41040" lg="1022" href="">Symbian^3</a>
											</dd>
											<dd>
												<a ytag="41041" lg="1022" href="">Symbian 4.0</a>
											</dd>
											<dd>
												<a ytag="41042" lg="1022" href="">Symbian 6.0</a>
											</dd>
											<dd>
												<a ytag="41043" lg="1022" href="">bada</a>
											</dd>
											<dd>
												<a ytag="41044" lg="1022" href="">Ophone OS</a>
											</dd>
											<dd>
												<a ytag="41045" lg="1022" href="">WindowsMobile</a>
											</dd>
											<dd>
												<a ytag="41046" lg="1022" href="">BlackBerry OS</a>
											</dd>
											<dd>
												<a ytag="41047" lg="1022" href="">点心OS</a>
											</dd>
											<dd>
												<a ytag="41048" lg="1022" href="">OMS</a>
											</dd>
											<dd>
												<a ytag="41049" lg="1022" href="">非智能系统</a>
											</dd>
											<dd>
												<a ytag="41050" lg="1022" href="">Symbian Anna</a>
											</dd>
											<dd>
												<a ytag="41051" lg="1022" href="">MeeGo</a>
											</dd>
											<dd>
												<a ytag="41052" lg="1022" href="">Symbian Belle</a>
											</dd>
											<dd>
												<a ytag="41053" lg="1022" href="">阿里云OS</a>
											</dd>
											<dd>
												<a ytag="41054" lg="1022" href="">Android 2.3点心OS</a>
											</dd>
										</dl>
									</dd>
								</dl>
							</li>
							<li>
								<dl>
									<dt>
										网络设定：
									</dt>
									<dd>
										<dl>
											<dt>
												<strong><a ytag="41055" href="" class="current">全部</a>
												</strong>
											</dt>
											<dd>
												<a ytag="41056" lg="1022" href="">GSM手机</a>
											</dd>
											<dd>
												<a ytag="41057" lg="1022" href="">CDMA手机</a>
											</dd>
											<dd>
												<a ytag="41058" lg="1022" href="">联通3G</a>
											</dd>
											<dd>
												<a ytag="41059" lg="1022" href="">电信3G</a>
											</dd>
											<dd>
												<a ytag="41060" lg="1022" href="">移动3G</a>
											</dd>
											<dd>
												<a ytag="41061" lg="1022" href="">双模</a>
											</dd>
											<dd>
												<a ytag="41062" lg="1022" href="">双卡手机</a>
											</dd>
										</dl>
									</dd>
								</dl>
							</li>
							<li class="hidden">
								<dl>
									<dt>
										CPU频率区间：
									</dt>
									<dd>
										<dl>
											<dt>
												<strong><a ytag="41063" href="" class="current">全部</a>
												</strong>
											</dt>
											<dd>
												<a ytag="41064" lg="1022" href="">600MHz以下</a>
											</dd>
											<dd>
												<a ytag="41065" lg="1022" href="">600MHz-1GHz</a>
											</dd>
											<dd>
												<a ytag="41066" lg="1022" href=" ">1GHz以上</a>
											</dd>
										</dl>
									</dd>
								</dl>
							</li>
							<li class="hidden">
								<dl>
									<dt>
										屏幕尺寸范围：
									</dt>
									<dd>
										<dl>
											<dt>
												<strong><a ytag="41067" href="" class="current">全部</a>
												</strong>
											</dt>
											<dd>
												<a ytag="41068" lg="1022" href="">2.4及以下</a>
											</dd>
											<dd>
												<a ytag="41069" lg="1022" href="">2.5-2.8</a>
											</dd>
											<dd>
												<a ytag="41070" lg="1022" href="">2.9-3.4</a>
											</dd>
											<dd>
												<a ytag="41071" lg="1022" href="">3.5-3.9</a>
											</dd>
											<dd>
												<a ytag="41072" lg="1022" href="">4.0-4.9</a>
											</dd>
											<dd>
												<a ytag="41073" lg="1022" href="">5.0及以上</a>
											</dd>
										</dl>
									</dd>
								</dl>
							</li>
							<li class="hidden">
								<dl>
									<dt>
										屏幕分辨率：
									</dt>
									<dd>
										<dl>
											<dt>
												<strong><a ytag="41074" href="" class="current">全部</a>
												</strong>
											</dt>
											<dd>
												<a ytag="41075" lg="1022" href="">176 x 220</a>
											</dd>
											<dd>
												<a ytag="41076" lg="1022" href="">240 x 320</a>
											</dd>
											<dd>
												<a ytag="41077" lg="1022" href="">240 x 400</a>
											</dd>
											<dd>
												<a ytag="41078" lg="1022" href="">320 x 480</a>
											</dd>
											<dd>
												<a ytag="41079" lg="1022" href="">360 x 640</a>
											</dd>
											<dd>
												<a ytag="41080" lg="1022" href="">480 x 800</a>
											</dd>
											<dd>
												<a ytag="41081" lg="1022" href="">480 x 854</a>
											</dd>
											<dd>
												<a ytag="41082" lg="1022" href="">960 x 540</a>
											</dd>
											<dd>
												<a ytag="41083" lg="1022" href="">960 x 640</a>
											</dd>
											<dd>
												<a ytag="41084" lg="1022" href="">1280 x 800</a>
											</dd>
											<dd>
												<a ytag="41085" lg="1022" href="">1280 x 720</a>
											</dd>
											<dd>
												<a ytag="41086" lg="1022" href="">其它分辨率</a>
											</dd>
											<dd>
												<a ytag="41087" lg="1022" href="">640 x 480</a>
											</dd>
										</dl>
									</dd>
								</dl>
							</li>
							<li class="hidden">
								<dl>
									<dt>
										像素区间：
									</dt>
									<dd>
										<dl>
											<dt>
												<strong><a ytag="41088" href="" class="current">全部</a>
												</strong>
											</dt>
											<dd>
												<a ytag="41089" lg="1022" href="">300万以下</a>
											</dd>
											<dd>
												<a ytag="41090" lg="1022" href="">300万-500万</a>
											</dd>
											<dd>
												<a ytag="41091" lg="1022" href="">501万-800万</a>
											</dd>
											<dd>
												<a ytag="41092" lg="1022" href="">800万以上</a>
											</dd>
										</dl>
									</dd>
								</dl>
							</li>
							<li class="hidden">
								<dl>
									<dt>
										适用场景：
									</dt>
									<dd>
										<dl>
											<dt>
												<strong><a ytag="41093" href="" class="current">全部</a>
												</strong>
											</dt>
											<dd>
												<a ytag="41094" lg="1022" href="">美女机</a>
											</dd>
											<dd>
												<a ytag="41095" lg="1022" href="">老人机</a>
											</dd>
											<dd>
												<a ytag="41096" lg="1022" href="">情侣机</a>
											</dd>
											<dd>
												<a ytag="41097" lg="1022" href="">学生机</a>
											</dd>
											<dd>
												<a ytag="41098" lg="1022" href="">商务机</a>
											</dd>
											<dd>
												<a ytag="41099" lg="1022" href="">游戏机</a>
											</dd>
											<dd>
												<a ytag="41100" lg="1022" href="">社交机</a>
											</dd>
										</dl>
									</dd>
								</dl>
							</li>
						</ul>
						-->
						<span class="bod_mask"></span>
					</div>
					<#--
					<div class="wrap_close status_down">
						<p>
							<a class="btn_click" href=""
								onClick="YouBoy3C.app.list.switchFilter(this, &#39;s&#39;);return false"
								morestr="CPU频率区间 屏幕尺寸范围 屏幕分辨率 像.."><b></b>更多<span class="m">（CPU频率区间
									屏幕尺寸范围 屏幕分辨率 像..）</span></a>
						</p>
					</div>
					-->
				</div>
				
				<#--
				<div class="mod_price" id="list">
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
				</div>
				-->
				<#--
				<script>YouBoy3C.app.list.initPriceRange();</script>
				<div class="mod_order">
					<span class="sortstyle"> <strong>显示：</strong><span
						class="viewmode status_pic"><a class="icon_pic" href=""><b></b>图片</a><a class="icon_list" href=""><b></b>列表</a></span></span>
					<span class="orderlist"> <strong>排列：</strong> <span
						class="con_secure "> <a class="title" href="javascript:;"
							id="current_sort_type">默认排序<b></b> </a> <span class="secure"
							id="sort_type_select" style="display: none;"> <a href=""
								lg="1004" pos="1">价格从低到高</a> <a href="" lg="1004"
								pos="2">价格从高到低</a> <a href="" lg="1004" pos="3">销量从高到低</a> <a href="" lg="1004" pos="4"
								>评论从高到低</a> <a href="" lg="1004" pos="5"
								>默认排序</a> </span></span> 
								<script type="text/javascript">YouBoy3C.app.list.initHoverEvent(document.getElementById('current_sort_type'), document.getElementById('sort_type_select'));</script>
						<span class="con_list"> <a pos="2"
							class="order_up" href=""><b></b>价格</a> <a class="order_down" href=""><b></b>销量</a> <a class="order_down" href=""><b></b>评论</a> </span> </span>
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
				<#assign pagingUrl="${ctx}/category/${channel.id}-0-0-0-0-">
				<#assign pagingUrlSuffix="-0.html">
				<#include  "/WEB-INF/front/template/front-common-paging.ftl">
				<#-- page inclu -->
			</div>
			<div class="sidebar">
				<div class="mod_blue sort_product">
					<div class="inner">
						<div class="hd">
							<h3>产品分类</h3>
						</div>
						<div class="bd">
							<!-- BEGIN category_second_block -->
							<h4 class="tit"><#if channel.father?exists>${channel.father.name}</#if></h4>
							<div class="con">
								<dl class="list_sort">	
									<#if channel.children?size gt 0>
				                    <#list childChannels as childChannel>	            					
									<dd>
										<a <#if channel.id == childChannel.id>class="sel"</#if> title="${childChannel.name}" href="${ctx }/category/${childChannel.id}-0-0-0-1-0.html">${childChannel.name}</a>
									</dd>									
									</#list>
				                    <#else>
	            					<#list brotherChannels as brotherChannel>	            					
									<dd>
										<a <#if channel.id == brotherChannel.id>class="sel"</#if> title="${brotherChannel.name}" href="${ctx }/category/${brotherChannel.id}-0-0-0-1-0.html">${brotherChannel.name}</a>
									</dd>									
									</#list>
									</#if>
								</dl>
							</div>
							<!-- END category_second_block -->
						</div>
					</div>
				</div>

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
									<a href="" target="_blank" class="img"><img src="${ctx}/resources/resource/images/list/43-017-250.jpg" alt="" class=""></a>
									<span class="link_info"><a href="" target="_blank"><strong class="name">Panasonic 松下 TH-P55VT31C 55英寸等离子电视</strong></a><span class="price strong">￥10799.00</span></span>
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

		<script type="text/javascript">window.yPageId = '3112'; window.yPageLevel = '3';</script>
		<script type="text/javascript">
			YouBoy3C = YouBoy3C || {};
			YouBoy3C.logic.header.loginStatus();
			YouBoy3C.page = YouBoy3C.age || {};
			YouBoy3C.page.defaultSearch = [];
			YouBoy3C.logic.header.initDefaultSearch();
		</script>
	</body>
</html>
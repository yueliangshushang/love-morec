<#include "/common/front/taglibs.ftl" />
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8">
		<title>3C信息网-最新最全手机电脑数码电子产品导航平台</title>
		<meta name="keywords" content="数码产品,电子产品,3C信息网" />
		<meta name="description" content="3C信息网提供最新手机、电脑、数码产品、外设产品、办公产品、网络产品等报价；我们提供专业及时的3C产品报价，图片，行情，资料为您选购3C产品提供全方位的服务。" />
		<link href="${ctx}/resources/front/css/header_full.css" rel="stylesheet" type="text/css">
		<link href="${ctx}/resources/front/css/package_v1.css" rel="stylesheet" type="text/css">
		<link href="${ctx}/resources/front/css/gb.css" rel="stylesheet" type="text/css">
		<link href="${ctx}/resources/front/css/index.css" rel="stylesheet" type="text/css">
		<script type="text/javascript" src="${ctx}/resources/front/js/jquery-1.7.1.js" charset="UTF-8"></script>
		<script type="text/javascript" src="${ctx}/resources/front/js/global.js" charset="UTF-8"></script>
		<script type="text/javascript" src="${ctx}/resources/front/js/index.js" charset="UTF-8"></script>
		<script type="text/javascript" src="${ctx}/resources/front/js/init_index.js" charset="UTF-8"></script>
		<script type="text/javascript" src="${ctx}/resources/front/js/lazyload.js" charset="UTF-8"></script>
	</head>
	<body class="more3c_1280">
		<!--toolbar-->
		<div id="PageToolbar" class="more3c_top_toolbar">
			<div class="more3c_wrap">
				<p class="tel">
					<i class="dot_tel"></i>136-6053-8268
				</p>					
				<ul id="PageLoginStatusbar" class="toolbar_nav">
					<li class="item"><a href="">我要收藏</a></li>
					<li class="item">
					<a target="_blank" href="" class="t_qq" title="关注3C信息网官方腾讯微博"><span class="hide_clip">腾讯微博</span></a>
					<a target="_blank" href="" class="t_qq t_sina" title="关注3C信息网官方新浪微博"><span class="hide_clip">新浪微博</span></a>
					</li>
					<li id="PageContactServiceLi" class="item last"><a
						target="_blank"
						href="http://b.qq.com/webc.htm?new=0&sid=4008286699&eid=218808P8z8p8x8z8y8x8z&o=http://www.51buy.com&q=7"
						><i class="dot_listen"></i>在线客服</a>
					</li>
				</ul>
			</div>
		</div>
		<!--/toolbar-->
		<!--header-->
		<div class="more3c_head more3c_wrap">
			<div class="logo">
				<h1>
					<a href="${ctx}/" class="logo_bd" title="3C数码信息网"><span class="hide_clip">3C数码信息网</span></a>
				</h1>
			</div>
			<a target="_blank" href="${ctx}/"><div class="stand "><span class="hide_clip">数码导购商城推广</span></div></a>
			<div class="search">
				<div class="search_bd">
					<h2 class="hide_clip">
						搜索
					</h2>
					<form onSubmit="return YouBoy3C.logic.header.query()" name="search" action="${ctx}/search" target="_top">
						<input type="text" id="q_show" name="keyword" autocomplete="off"
							value="" x-webkit-speech="" class="mod_search_txt no_cur">
						<button class="search_submit"><span class="hide_clip">搜索</span></button>
					</form>
				</div>
				<div id="i_keyword" class="hot_keywords">
					<a href="${ctx}/search?keyword=夏普8298" target="_blank">夏普8298</a> &nbsp;&nbsp;
					<a href="${ctx}/search?keyword=空调扇" target="_blank">空调扇</a> &nbsp;&nbsp;
					<a href="${ctx}/search?keyword=HTC One" target="_blank">HTC One</a> &nbsp;&nbsp;
					<a href="${ctx}/search?keyword=家用投影仪" target="_blank">家用投影仪</a> &nbsp;&nbsp;
					<a href="${ctx}/search?keyword=智器Ten3" target="_blank">智器Ten3</a>
				</div>
			</div>
		</div>
		<!--/header-->
		<!--nav-->
		<div class="more3c_nav">
			<div class="more3c_wrap">
				<div class="more3c_cate  i_status_on" id="category_container">
					<h3 class="cate_hd">
						<a href="">全部分类<i class="dot_cate"></i></a>
					</h3>
					<div class="cate_bd cate_bd_bj" id="category_panel">
						<div id="i_sort_list">
							<div class="cate_normal">
							    <@cms_category_list path='';categories>
							    <#list categories as category>
								<div cateid="${category_index}" class="item">
									<div class="item_hd">
										<dl>
											<dt class="top_cate">
												<a href="${ctx}/category${category.path !""}.html" style="cursor: pointer">${category.name}<i class="dot_cate"></i></a>
											</dt>
											<dd class="sub_cate">
												<a href="${ctx}/search?keyword=三星">三星</a><a href="${ctx}/search?keyword=moto">MOTO</a><a href="">HTC</a><a href="${ctx}/search?keyword=合约购机">合约购机</a>
											</dd>
										</dl>
									</div>									
									<div class="item_bd" style="top: -2px;">
										<div class="list">
										<#list category.children as children>
										<dl>
											<dt class="t">${children.name!""}</dt>
											<dd>
											    <#list children.children as child><a href="${ctx}/${child.path!""}">${child.name}</a></#list>
											</dd>
										</dl>																			
									    </#list>
										</div>
										<div class="hot">
											<p class="t">热门</p>
											<ul>
												<li><a href="${ctx}/search?keyword=诺基亚">诺基亚lumia立减再送电源</a></li>
											</ul>
										</div>
									</div>
								</div>
								</#list>
								</@cms_category_list>								
							</div>							
						</div>
					</div>
				</div>
				<div class="nav_bd">
					<ul class="i_nav_list">
						<li class="current" id="nav_home"><a href="${ctx}/">首页</a></li>
						<#--
						<li id="nav_top"><a href="" target="_blank">TOP</a></li>
						<li id="nav_diy"><a href="">装机宝</a></li>
						<li id="nav_morning_market"><a href="">早市<i class="dot_hot"><span class="hide_clip">热</span></i></a></li>
						<li id="nav_nightcountdown"><a href="">天黑黑</a></li>
						<li id="nav_second"><a href="">二手特卖</a></li>
						<li id="nav_groupbuy"><a href="">团购</a></li>
						-->
					</ul>
				</div>
			</div>
		</div>
		<!--/nav-->

		<div class="more3c_content more3c_wrap lazy_box">
			<div class="first_screen">
				<div class="center_wrap">
					<div class="row_center">
						<div class="mod_slide">
							<div class="mod_slide" id="mod_slide">
								<div id="slide" class="main_slide">
									<ul class="body_slide" style="">

									</ul>
									<div class="bor_slide">
										<ul class="ctrl">
											<li class="item0 item0_hover"></li>
											<li class="item1"></li>
											<li class="item2"></li>
											<li class="item3"></li>
											<li class="item4"></li>
										</ul>
									</div>
								</div>
							</div>
							<script>
YouBoy3C.app.index.slidePlay( [ {
	"href" : "",
	"text" : "端午节大狂欢",
	"img_b" : "${ctx}/resources/front/images/advert/1001_big20120615055339460156.jpg",
	"img_s" : "1001_small20120615055339460156.jpg",
	"hotName" : "index_slide_play_new"
}, {
	"href" : "",
	"text" : "轰六月 炸低价",
	"img_b" : "${ctx}/resources/front/images/advert/1001_big20120619035336312599.jpg",
	"img_s" : "1001_small20120619035336312599.jpg",
	"hotName" : "index_slide_play_new"
}, {
	"href" : "",
	"text" : "相机秒杀周",
	"img_b" : "${ctx}/resources/front/images/advert/1001_big20120615054703710892.jpg",
	"img_s" : "1001_small20120615054703725569.jpg",
	"hotName" : "index_slide_play_new"
}, {
	"href" : "",
	"text" : "闪存大让利",
	"img_b" : "${ctx}/resources/front/images/advert/1001_big20120619034951610758.jpg",
	"img_s" : "1001_small20120619034951626905.jpg",
	"hotName" : "index_slide_play_new"
}, {
	"href" : "",
	"text" : "抢智能3D手机 抽奖游日本",
	"img_b" : "${ctx}/resources/front/images/advert/1001_big20120620023419865471.jpg",
	"img_s" : "small20120620023419865471.jpg",
	"hotName" : "index_slide_play_new"
} ]);</script>
						</div>

						<div class="mod_quickbuy">
							<div class="mod_quickbuy_hd">
								<div class="mod_day">
									<div class="col_left">
										<p>
											<i class="dot_day"></i><span class="title">今日推荐</span><#--9时开抢-->
										</p>
										<#--<p id="qianggou_clock" class="countdown"><span>16</span><span>30</span><span>09</span></p>-->
										<#--<script>YouBoy3C.app.index.qianggou($("#qianggou_clock"), "1340266917")</script>-->
										<p class="dot"></p>
									</div>
									<div class="col_right">
										<i class="dot_day dot_night"></i><span>商铺畅销</span>
									</div>
								</div>
								<div style="display: none;" class="mod_day mod_night">
									<div class="col_left">
										<p>
											<i class="dot_day dot_night"></i><span class="title">商铺畅销</span><#--敬请期待-->
										</p>
										<p class="dot"></p>
									</div>
									<div class="col_right">
										<i class="dot_day"></i><span>今日推荐</span>
									</div>
								</div>
								<a id="qb_btn" hidefocus="true" class="control"
									onClick="YouBoy3C.app.index.quickBuy(&#39;500&#39;);return false;"
									href="javascript:;"><span class="hide_clip">推荐商铺畅销切换</span> </a>
							</div>
							<div class="mod_quickbuy_bd">
								<div class="bd_inner">
									<ul>
										<#if todayPushPage.result?size gt 0>
										<#list todayPushPage.result as todayPushEntityOne>
										<#if todayPushEntityOne_index lt 6>
										<li>
											<div class="pic_wrap">
												<a href="${ctx}/${todayPushEntityOne.id}.html" target="_blank"><img
														_src="${todayPushEntityOne.image}_120x120.jpg"
														alt="${todayPushEntityOne.title?trim}"></a>
											</div>
											<div class="txt_wrap">
												<div class="price">
													<span>￥</span>${todayPushEntityOne.price}.0
												</div>
												<div class="change">
													<i class="dot_down"></i>￥ ${todayPushEntityOne.oldprice}.0
												</div>
												<div class="name">
													<a href="${ctx}/${todayPushEntityOne.id}.html" target="_blank">${todayPushEntityOne.title?trim}</a>
												</div>
												<div class="more3c_stock">
													库存：<span class="more3c_stock_enough"><span style="width: 20%;" class="more3c_stock_inner" w="80"></span></span>
												</div>
												<div class="buy ">
													<a title="立即看看" target="_blank" href="${ctx}/${todayPushEntityOne.id}.html">立即看看</a>
												</div>
											</div>
										</li>
										</#if>
										</#list>
										</#if>										
									</ul>
									<ul>
										<#if todayPushPage.result?size gt 0>
										<#list todayPushPage.result as todayPushEntityTwo>
										<#if todayPushEntityTwo_index gte 6>
										<li>
											<div class="pic_wrap">
												<a href="${ctx}/${todayPushEntityTwo.id}.html" target="_blank"><img
														_src="${todayPushEntityTwo.image}_120x120.jpg"
														alt="${todayPushEntityTwo.title?trim}"></a>
											</div>
											<div class="txt_wrap">
												<div class="wait"><span>￥</span>${todayPushEntityTwo.price}.0</div>
												<div class="name">
													<a href="${ctx}/${todayPushEntityTwo.id}.html" target="_blank">${todayPushEntityTwo.title?trim}</a>
												</div>
												<div class="more3c_stock"></div>
												<div class="buy<#--buy_nor-->">
													<a target="_blank" title="立即看看" href="${ctx}/${todayPushEntityTwo.id}.html">立即看看</a>
												</div>
											</div>
										</li>
										</#if>
										</#list>
										</#if>										
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="row_sidebar">
					<div class="trans_slogan" title="广告合作联系QQ：1315076986 注明来之3C数码信息网">
						<dl>
							<dt><a href="" target="_blank">联系QQ：</a></dt>
							<dd><a href="" target="_blank">1315076986</a></dd>
						</dl>
					</div>

					<div id="moveTabs2" class="mod_gb mod_new">
						<ul class="tab_hd">
							<li class="current">
								<a href="javascript:void('0');">1</a>
							</li>
							<li>
								<a href="javascript:void('0');">2</a>
							</li>
							<li>
								<a href="javascript:void('0');">3</a>
							</li>
						</ul>
						<div class="tab_bd">
							<ul>
								<li>									
									<p>
										<a href="<#if newProductNokiaPgae.result?size gt 0><#list newProductNokiaPgae.result as newProductNokiaEntity>${ctx}/${newProductNokiaEntity.id}.html</#list><#else>${ctx}/search?keyword=诺基亚</#if>" target="_blank"><img alt="诺基亚LUMIA 900耀世首发 "
												_src="${ctx}/resources/resource/images/index/1001_big20120612055652163617.jpg">
										</a>
									</p>
									<h3><a href="<#if newProductNokiaPgae.result?size gt 0><#list newProductNokiaPgae.result as newProductNokiaEntity>${ctx}/${newProductNokiaEntity.id}.html</#list><#else>${ctx}/search?keyword=诺基亚</#if>" target="_blank">诺基亚LUMIA 900耀世首发 </a></h3>
								</li>
							</ul>
							<ul>
								<li>
									<p>
										<a href="<#if newProductSamsungPgae.result?size gt 0><#list newProductSamsungPgae.result as newProductSamsungEntity>${ctx}/${newProductSamsungEntity.id}.html</#list><#else>${ctx}/search?keyword=三星</#if>" target="_blank"><img alt="三星盖世3震撼首发"
												_src="${ctx}/resources/resource/images/index/1001_big20120613041522085407.jpg">
										</a>
									</p>
									<h3><a href="<#if newProductSamsungPgae.result?size gt 0><#list newProductSamsungPgae.result as newProductSamsungEntity>${ctx}/${newProductSamsungEntity.id}.html</#list><#else>${ctx}/search?keyword=三星</#if>" target="_blank">三星盖世3震撼首发</a></h3>
								</li>
							</ul>
							<ul>
								<li>
									<p>
										<a href="<#if newProductCoffeePage.result?size gt 0><#list newProductCoffeePage.result as newProductCoffeeEntity>${ctx}/${newProductCoffeeEntity.id}.html</#list><#else>${ctx}/search?keyword=美的</#if>" target="_blank"><img alt="美的D002A咖啡机香浓首发"
												src="${ctx}/resources/resource/images/index/1001_big20120612062549100275.jpg">
										</a>
									</p>
									<h3><a href="<#if newProductCoffeePage.result?size gt 0><#list newProductCoffeePage.result as newProductCoffeeEntity>${ctx}/${newProductCoffeeEntity.id}.html</#list><#else>${ctx}/search?keyword=美的</#if>" target="_blank">美的D002A咖啡机香浓首发</a></h3>
								</li>
							</ul>
						</div>
						<div class="mod_gb_hd">
							<dl>
								<dt><span class="hide_clip">新品首发</span></dt>
								<dd>NEW LAUNCH</dd>
							</dl>
						</div>
					</div>

					<div class="mod_gb mod_tuan">
						<div class="mod_gb_hd">
							<dl>
								<dt><span class="hide_clip">热荐</span></dt>
								<dd>GROUP DEAL</dd>
							</dl>
							<#--
							<div class="countdown">
								<span id="hour">79</span><span id="minute">29</span><span id="second">33</span>
							</div>
							-->
						</div>
						<div class="mod_tuan_bd">
							<ul>
								<#if groupDealPage.result?size gt 0>
								<#list groupDealPage.result as groupDealEntity>
								<#if groupDealEntity_index=0>
								<li class="pic_wrap">
									<a href="${ctx}/${groupDealEntity.id}.html" target="_blank"><img
											alt="${groupDealEntity.title?trim}"
											_src="${groupDealEntity.image}_160x160.jpg"></a>
								</li>
								<li class="name_wrap">
									<a href="${ctx}/${groupDealEntity.id}.html" target="_blank">${groupDealEntity.title?trim}</a>
								</li>
								<li class="price_wrap">
									<span class="arrow"></span>
									<div class="inner">
										<p class="price">
											<span class="rmb">￥</span>${groupDealEntity.price}.00
										</p>
										<a title="去看看" class="go" href="${ctx}/${groupDealEntity.id}.html" target="_blank">去看看</a>
									</div>
								</li>
								<li class="data_list">
									<div class="inner">
										<dl>
											<dt>市场价</dt>
											<dd><span class="price_ago">￥${groupDealEntity.oldprice}.0</span></dd>
										</dl>
										<dl>
											<dt>节省</dt>
											<dd>￥${groupDealEntity.spreadPirce}</dd>
										</dl>
										<dl>
											<dt>已售出</dt>
											<dd>${groupDealEntity.commentCount}件</dd>
										</dl>
									</div>
								</li>
								</#if>
								</#list>
								</#if>
							</ul>
						</div>
					</div>
				</div>

				<div class="row_left row_left_bj">
					<div class="cate_area"></div>
					<div class="recon">
						<#if groupDealPage.result?size gt 0><#list groupDealPage.result as groupDealEntityFoot><#if groupDealEntityFoot_index=1>
						<a href="${ctx}/${groupDealEntityFoot.id}.html" target="_blank"><img _src="${ctx}/resources/resource/images/index/1001_big20120531075319536387.jpg"></a>
						</#if></#list><#else>
						<a href="${ctx}/search?keyword=小米" target="_blank"><img _src="${ctx}/resources/resource/images/index/1001_big20120531075319536387.jpg"></a>
						</#if>
					</div>
				</div>
			</div>
			<!-- 手机数码 -->
			<div class="mod_floor f2">
				<div class="floor_hd">
					<h3>
						<span class="name"><i class="hide_clip">手机数码</i></span>
						<span class="name_en">PHONE CAMERA &amp; ELECTRONICS</span>
					</h3>

				</div>
				<div class="floor_bd">
					<div class="goods_wrap">
						<div class="goods_list">
							<ul>
								<#if phoneAndCameraPage.result?size gt 0>
								<#list phoneAndCameraPage.result as phoneAndCameraEntity>
								<li class="goods <#if phoneAndCameraEntity_index == 3 >last</#if>">
									<div class="pic_wrap">
										<a class="litpic" target="_blank" href="${ctx}/${phoneAndCameraEntity.id}.html"><img
												alt="${phoneAndCameraEntity.title?trim}"
												_src="${phoneAndCameraEntity.image}_160x160.jpg">
												<#--<i class="ss_tejia" title="特价"></i>--></a>
									</div>
									<div class="price_wrap">
										<p class="price">
											<span>￥</span>${phoneAndCameraEntity.price}
										</p>
									</div>
									<div class="title_wrap">
										<a target="_blank" title="${phoneAndCameraEntity.title?trim}" href="">${phoneAndCameraEntity.title?trim}</a>
										<#--<a class="sum_wrap" target="_blank" title="" href=""></a>-->
									</div>
								</li>
								</#list>
								</#if>
							</ul>
						</div>
					</div>
					<div class="col_left">
						<p>
							<a href="${ctx}/search?keyword=单反相机" target="_blank"><img width="202" height="271" alt="单反相机拍摄技巧"
									_src="${ctx}/resources/resource/images/index/1001_big20120413114023466965.jpg">
							</a>
						</p>
						<ul>
							<li>
								<a href="${ctx}/search?keyword=三星手机" target="_blank"><img alt="三防智能 跌破2000元"
										_src="${ctx}/resources/resource/images/index/1001_big20120413120723294829.jpg">
								</a>
							</li>
							<li>
								<a href="${ctx}/search?keyword=苹果手机" target="_blank"><img alt="果粉必备 全网最低"
										_src="${ctx}/resources/resource/images/index/1001_big20120413120243560939.jpg">
								</a>
							</li>
							<li>
								<a href="${ctx}/search?keyword=佳能 相机" target="_blank"><img alt="相机劲爆价 特价等你来"
										_src="${ctx}/resources/resource/images/index/1001_big20120413120135466966.jpg">
								</a>
							</li>
						</ul>
					</div>
					<div class="col_right">
						<!-- 热销榜 & 精华评论 -->
						<div id="hideTab0" class="mod_tab">
							<div class="tab_hd">
								<ul>
									<li class="current">热销榜</li>
									<li class="">精华评论</li>
								</ul>
							</div>
							<div class="tab_bd">
								<ul class="sale_hot" style="display: block;">
									<#if phoneAndCameraHotPage.result?size gt 0>
									<#list phoneAndCameraHotPage.result as phoneAndCameraHotEntity>
									<li>
										<div class="pic_wrap">
											<a href="${ctx}/${phoneAndCameraHotEntity.id}.html" target="_blank"><img
													alt="${phoneAndCameraHotEntity.title?trim}"
													_src="${phoneAndCameraHotEntity.image}_80x80.jpg"></a>
											<i class="<#if phoneAndCameraHotEntity_index lte 2>dot_first</#if> <#if phoneAndCameraHotEntity_index=1>dot_secend<#elseif phoneAndCameraHotEntity_index=2>dot_third</#if>"><span class="hide_clip">${phoneAndCameraHotEntity_index+1}</span></i>
										</div>
										<div class="txt_wrap">
											<p class="price">
												<span>￥</span>${phoneAndCameraHotEntity.price}
											</p>
											<p class="name">
												<a href="${ctx}/${phoneAndCameraHotEntity.id}.html" target="_blank">${phoneAndCameraHotEntity.title?trim}</a>
											</p>
											<p class="feedback">
												<span class="rank"><span class="rank_inner"></span></span>
												<a href="${ctx}/${phoneAndCameraHotEntity.id}.html" target="_blank">${phoneAndCameraHotEntity.commentCount}</a>条
											</p>
										</div>
									</li>
									</#list>
									</#if>									
								</ul>
								<ul class="sale_hot best_feed" style="display: none;">
									<#if phoneAndCameraCommentPage.result?size gt 0>
									<#list phoneAndCameraCommentPage.result as phoneAndCameraCommentEntity>
									<li>
										<div class="goods_info">
											<div class="pic_wrap">
												<a href="${ctx}/${phoneAndCameraCommentEntity.id}.html" title="${phoneAndCameraCommentEntity.title?trim}"
													target="_blank"><img alt="${phoneAndCameraCommentEntity.title?trim}"
														style="" _src="${phoneAndCameraCommentEntity.image}_60x60.jpg">
												</a>
											</div>
											<div class="txt_wrap">
												<p class="name">
													<a href="${ctx}/${phoneAndCameraCommentEntity.id}.html" target="_blank"
														title="${phoneAndCameraCommentEntity.title?trim}">${phoneAndCameraCommentEntity.title?trim}</a>
												</p>
												<p class="feedback">
													<span class="rank"><span class="rank_inner"></span></span>
													<a href="${ctx}/${phoneAndCameraCommentEntity.id}.html"
														title="${phoneAndCameraCommentEntity.title?trim}"
														target="_blank">${phoneAndCameraCommentEntity.commentCount}</a>条
												</p>
											</div>
										</div>
										<div class="feed_info">
											<dl>
												<dt><i class="dot_feed"></i>${phoneAndCameraCommentMap[phoneAndCameraCommentEntity.id].content!"年前拍的，马上就发货了，但是这边快递没上班，等了很久，总体不错！"}</dt>
												<dd>会员：${phoneAndCameraCommentMap[phoneAndCameraCommentEntity.id].username!"伞***朵"}</dd>
											</dl>
										</div>
									</li>
									</#list>
									</#if>
								</ul>
							</div>
						</div>
						<#--
						<div id="mod_recharge" class="mod_recharge">
							<div class="bd">手机充值</div>
							<div class="hd">
								<ul>
									<li class="row">
										<label>手机号：</label>
										<div class="num_option" id="recharge_num">
											<p><input type="text" id="mobile"><a href="" id="mobile_btn" class="btn_select"><span class="hide_clip">选择号码</span> </a></p>
											<ul class="mod_recharge_list" id="mod_recharge_list"></ul>
										</div>
									</li>
									<li class="row">
										<label>归属地：</label>
										<p id="mobile_area" class="where">---</p>
									</li>
									<li class="row">
										<label>面 值：</label>
										<div class="num_option" id="recharge_value">
											<p><input type="text" id="card" value="100"><a href="javascript:void('#');" id="card_btn" class="btn_select"><span class="hide_clip">选择面值</span></a>	</p>
											<ul class="mod_recharge_list" id="mod_recharge_cardlist">
												<li class="odd"><a href="javascript:;">10</a></li>
												<li class="even"><a href="javascript:;" hidefocus="true">20</a></li>
												<li class="odd"><a href="javascript:;" hidefocus="true">30</a></li>
												<li class="even"><a href="javascript:;" hidefocus="true">50</a></li>
												<li class="odd"><a href="javascript:;" hidefocus="true">100</a></li>
												<li class="odd"><a href="javascript:;" hidefocus="true">300</a></li>
											</ul>
										</div>
									</li>
									<li class="row"><label>价 格：</label><p class="price"><span id="money">---</span><span id="moneyYuan"> 元</span></p></li>
									<li class="row row_submit"><label>&nbsp;</label><button id="gotoVirualPayBtn" class="btn_submit">点此充值</button></li>
								</ul>
							</div>
						</div>
						-->
					</div>
				</div>

				<div class="mod_brand clearfix">
					<div class="mod_brand">
						<div class="hd">
							<p class="hide_clip">
								知名品牌专卖
							</p>
						</div>
						<div class="bd">
							<p>
								<img alt="知名品牌专卖"
									_src="${ctx}/resources/resource/images/index/1001_big20120612040733867484.jpg">
							</p>
							<ul>
								<li>
									<a href="${ctx}/search?keyword=苹果" target="_blank" title="苹果"><span class="hide_clip">苹果</span></a>
								</li>
								<li>
									<a href="${ctx}/search?keyword=三星" target="_blank" title="三星"><span class="hide_clip">三星</span></a>
								</li>
								<li>
									<a href="${ctx}/search?keyword=佳能" target="_blank" title="佳能"><span class="hide_clip">佳能</span></a>
								</li>
								<li>
									<a href="${ctx}/search?keyword=索尼" target="_blank" title="索尼"><span class="hide_clip">索尼</span></a>
								</li>
								<li>
									<a href="${ctx}/search?keyword=诺基亚" target="_blank" title="诺基亚"><span class="hide_clip">诺基亚</span></a>
								</li>
								<li>
									<a href="${ctx}/search?keyword=IT-CEO" target="_blank" title="IT-CEO"><span class="hide_clip">IT-CEO</span></a>
								</li>
								<li>
									<a href="${ctx}/search?keyword=nikon" target="_blank" title="Nikon"><span class="hide_clip">Nikon</span></a>
								</li>
								<li>
									<a href="${ctx}/search?keyword=htc" target="_blank" title="HTC"><span class="hide_clip">HTC</span></a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<!-- 电脑办公 -->
			<div class="mod_floor f3 f3_gd">
				<div class="floor_hd">
					<h3>
						<span class="name"><i class="hide_clip">电脑</i></span>
						<span class="name_en">PC HARDWARE</span>
					</h3>

				</div>
				<div class="floor_bd">
					<div class="goods_wrap">
						<div class="goods_list">
							<ul>
								<#if pcHardwarePage.result?size gt 0>
								<#list pcHardwarePage.result as pcHardwareEntity>
								<li class="goods <#if pcHardwareEntity_index == 3 >last</#if>">
									<div class="pic_wrap">
										<a class="litpic" target="_blank" href="${ctx}/${pcHardwareEntity.id}.html"><img
												alt="${pcHardwareEntity.title?trim}"
												_src="${pcHardwareEntity.image}_160x160.jpg">
												<#--
													<i class="ss_tejia" title="特价"></i>
													<i class="ss_xianshi" title="限时"></i>
													<i class="ss_xinpin" title="新品"></i>
													<i class="ss_renqi" title="人气"></i>
												--></a>
									</div>
									<div class="price_wrap">
										<p class="price">
											<span>￥</span>${pcHardwareEntity.price}
										</p>
									</div>
									<div class="title_wrap">
										<a target="_blank" title="${pcHardwareEntity.title?trim}" href="">${pcHardwareEntity.title?trim}</a>
										<#--<a class="sum_wrap" target="_blank" title="" href=""></a>-->
									</div>
								</li>
								</#list>
								</#if>									
							</ul>
						</div>
					</div>
					<div class="col_left">
						<p>
							<a href="${ctx}/search?keyword=笔记本" target="_blank"><img width="202" height="271" alt="笔记本真正的性价比"
									_src="${ctx}/resources/resource/images/index/1001_big20120413021148044501.jpg">
							</a>
						</p>
						<ul>
							<li>
								<a href="${ctx}/search?keyword=主板 映泰" target="_blank"><img alt="映泰主板特卖场"
										_src="${ctx}/resources/resource/images/index/1001_big20120523075245208629.jpg">
								</a>
							</li>
							<li>
								<a href="${ctx}/search?keyword=键鼠套装" target="_blank"><img alt="键鼠套装 冰点价回馈"
										_src="${ctx}/resources/resource/images/index/1001_big20120413115644247226.jpg">
								</a>
							</li>
							<li>
								<a href="${ctx}/search?keyword=硬盘" target="_blank"><img alt="硬盘价格 跌破眼球"
										_src="${ctx}/resources/resource/images/index/1001_big20120413115506591196.jpg">
								</a>
							</li>
						</ul>
					</div>
					<div class="col_right">
						<!-- 热销榜 & 精华评论 -->
						<div id="hideTab1" class="mod_tab">
							<div class="tab_hd">
								<ul>
									<li class="current">热销榜</li>
									<li class="">精华评论</li>
								</ul>
							</div>
							<div class="tab_bd">
								<ul class="sale_hot" style="display: block;">
									<#if pcHardwareHotPage.result?size gt 0>
									<#list pcHardwareHotPage.result as pcHardwareHotEntity>
									<li>
										<div class="pic_wrap">
											<a href="${ctx}/${pcHardwareHotEntity.id}.html" target="_blank"><img
													alt="${pcHardwareHotEntity.title?trim}"
													_src="${pcHardwareHotEntity.image}_80x80.jpg"></a>
											<i class="dot_first <#if pcHardwareHotEntity_index=1>dot_secend<#elseif pcHardwareHotEntity_index=2>dot_third</#if>"><span class="hide_clip">${pcHardwareHotEntity_index+1}</span></i>
										</div>
										<div class="txt_wrap">
											<p class="price">
												<span>￥</span>${pcHardwareHotEntity.price}
											</p>
											<p class="name">
												<a href="${ctx}/${pcHardwareHotEntity.id}.html" target="_blank">${pcHardwareHotEntity.title?trim}</a>
											</p>
											<p class="feedback">
												<span class="rank"><span class="rank_inner"></span></span>
												<a href="${ctx}/${pcHardwareHotEntity.id}.html" target="_blank">${pcHardwareHotEntity.commentCount}</a>条
											</p>
										</div>
									</li>
									</#list>
									</#if>
								</ul>
								<ul class="sale_hot best_feed" style="display: none;">
									<#if pcHardwareCommentPage.result?size gt 0>
									<#list pcHardwareCommentPage.result as pcHardwareCommentEntity>
									<li>
										<div class="goods_info">
											<div class="pic_wrap">
												<a href="${ctx}/${pcHardwareCommentEntity.id}.html" title="${pcHardwareCommentEntity.title?trim}"
													target="_blank"><img alt="${pcHardwareCommentEntity.title?trim}"
														style="" _src="${pcHardwareCommentEntity.image}_60x60.jpg">
												</a>
											</div>
											<div class="txt_wrap">
												<p class="name">
													<a href="${ctx}/${pcHardwareCommentEntity.id}.html" target="_blank"
														title="${pcHardwareCommentEntity.title?trim}">${pcHardwareCommentEntity.title?trim}</a>
												</p>
												<p class="feedback">
													<span class="rank"><span class="rank_inner"></span>
													</span>
													<a href="${ctx}/${pcHardwareCommentEntity.id}.html" title="${pcHardwareCommentEntity.title?trim}"
														target="_blank">${pcHardwareCommentEntity.commentCount}</a>条
												</p>
											</div>
										</div>
										<div class="feed_info">
											<dl>
												<dt><i class="dot_feed"></i>${(pcHardwareCommentMap[pcHardwareCommentEntity.id].content)!"很快就送到家了很高兴，开来看了也不错！点赞"}</dt>
												<dd>会员：${(pcHardwareCommentMap[pcHardwareCommentEntity.id].username)!"88****A"}</dd>
											</dl>
										</div>
									</li>
									</#list>
									</#if>
								</ul>
							</div>
						</div>
						<div class="mod_recon">
							<ul>
								<li>
									<a href="${ctx}/search?keyword=网络设备" target="_blank"><img alt="网络设备 超值热卖"
											_src="${ctx}/resources/resource/images/index/1001_big20120413120027935879.jpg">
									</a>
								</li>
								<li>
									<a href="${ctx}/search?keyword=电脑 小Y" target="_blank"><img alt="无敌小Y 给力价"
											_src="${ctx}/resources/resource/images/index/1001_big20120413115912372901.jpg">
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="mod_brand clearfix">
					<div class="mod_brand">
						<div class="hd">
							<p class="hide_clip">知名品牌专卖</p>
						</div>
						<div class="bd">
							<p>
								<img alt="知名品牌专卖"
									_src="${ctx}/resources/resource/images/index/1001_big20120412094135544483.jpg">
							</p>
							<ul>
								<li>
									<a href="${ctx}/search?keyword=电脑 联想" target="_blank" title="联想"><span class="hide_clip">联想</span> </a>
								</li>
								<li>
									<a href="${ctx}/search?keyword=电脑 宏碁" target="_blank" title="宏碁"><span class="hide_clip">宏碁</span> </a>
								</li>
								<li>
									<a href="${ctx}/search?keyword=电脑 Thinkpad" target="_blank" title="Thinkpad"><span class="hide_clip">Thinkpad</span></a>
								</li>
								<li>
									<a href="${ctx}/search?keyword=电脑 微软" target="_blank" title="微软"><span class="hide_clip">微软</span></a>
								</li>
								<li>
									<a href="${ctx}/search?keyword=电脑 巴法络" target="_blank" title="巴法络"><span class="hide_clip">巴法络</span></a>
								</li>
								<li>
									<a href="${ctx}/search?keyword=电脑 Dell" target="_blank" title="格之格"><span class="hide_clip">格之格</span></a>
								</li>
								<li>
									<a href="${ctx}/search?keyword=电脑 " target="_blank" title="Dell"><span class="hide_clip">Dell</span></a>
								</li>
								<li>
									<a href="${ctx}/search?keyword=电脑 惠普" target="_blank" title="惠普"><span class="hide_clip">惠普</span></a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<!-- 家用电器 -->
			<div class="mod_floor f4">
				<div class="floor_hd">
					<h3>
						<span class="name"><i class="hide_clip">家用电器</i></span>
						<span class="name_en">HOME APPLIANCES</span>
						<#--<a class="dot_call" target="_blank" href=""></a>-->
					</h3>
					<ul class="hotwords">
						<li><a href="${ctx}/search?keyword=美的" target="_blank">美的</a></li>
						<li><a href="${ctx}/search?keyword=九阳" target="_blank">九阳</a></li>
						<li><a href="${ctx}/search?keyword=飞利浦" target="_blank">飞利浦</a></li>
						<li><a href="${ctx}/search?keyword=苏泊尔" target="_blank">苏泊尔</a></li>
						<li><a href="${ctx}/search?keyword=奔腾" target="_blank">奔腾</a></li>
					</ul>
				</div>
				<div class="floor_bd">
					<div class="goods_wrap">
						<div class="goods_list">
							<ul>
								<#if homeAppliancesPage.result?size gt 0>
								<#list homeAppliancesPage.result as homeAppliancesEntity>
								<li class="goods <#if homeAppliancesEntity_index == 3 >last</#if>">
									<div class="pic_wrap">
										<a class="litpic" target="_blank" href="${ctx}/${homeAppliancesEntity.id}.html"><img
												alt="${homeAppliancesEntity.title?trim}"
												_src="${homeAppliancesEntity.image}_160x160.jpg"></a>
									</div>
									<div class="price_wrap">
										<p class="price">
											<span>￥</span>${homeAppliancesEntity.price}
										</p>
									</div>
									<div class="title_wrap">
										<a target="_blank" title="${homeAppliancesEntity.title?trim}" href="">${homeAppliancesEntity.title?trim}</a>
									</div>
								</li>
								</#list>
								</#if>
							</ul>
						</div>
					</div>
					<div class="col_left">
						<p>
							<a href="${ctx}/search?keyword=电压锅" target="_blank"><img width="202" height="271" alt="电压锅 料理达人速成记"
									_src="${ctx}/resources/resource/images/index/1001_big20120414031906451799.jpg">
							</a>
						</p>
						<ul>
							<li>
								<a href="${ctx}/search?keyword=美的 咖啡机" target="_blank"><img alt="美的三重奏"
										_src="${ctx}/resources/resource/images/index/1001_big20120614033408132882.jpg">
								</a>
							</li>
							<li>
								<a href="${ctx}/search?keyword=美的 电饭锅" target="_blank"><img alt="美的电饭锅 畅销热卖 最低价格"
										_src="${ctx}/resources/resource/images/index/1001_big20120413124140872979.jpg">
								</a>
							</li>
							<li>
								<a href="${ctx}/search?keyword=苏泊尔 电水壶" target="_blank"><img alt="苏泊尔电水壶 健康生活 从喝水开始"
										_src="${ctx}/resources/resource/images/index/1001_big20120413121154076965.jpg">
								</a>
							</li>
						</ul>
					</div>
					<div class="col_right">
						<!-- 热销榜 & 精华评论 -->
						<div id="hideTab2" class="mod_tab">
							<div class="tab_hd">
								<ul>
									<li class="current">热销榜</li>
									<li class="">精华评论</li>
								</ul>
							</div>
							<div class="tab_bd">
								<ul class="sale_hot" style="display: block;">
									<#if homeAppliancesHotPage.result?size gt 0>
									<#list homeAppliancesHotPage.result as homeAppliancesHotEntity>
									<li>
										<div class="pic_wrap">
											<a href="${ctx}/${homeAppliancesHotEntity.id}.html" target="_blank"><img alt="${homeAppliancesHotEntity.title?trim}"
													_src="${homeAppliancesHotEntity.image}_80x80.jpg"></a>
											<i class="dot_first <#if homeAppliancesHotEntity_index=1>dot_secend<#elseif homeAppliancesHotEntity_index=2>dot_third</#if>"><span class="hide_clip">${homeAppliancesHotEntity_index+1}</span></i>
										</div>
										<div class="txt_wrap">
											<p class="price">
												<span>￥</span>${homeAppliancesHotEntity.price}.0
											</p>
											<p class="name">
												<a href="${ctx}/${homeAppliancesHotEntity.id}.html" target="_blank">${homeAppliancesHotEntity.title?trim}</a>
											</p>
											<p class="feedback">
												<span class="rank"><span class="rank_inner"></span></span>
												<a href="" target="_blank">${homeAppliancesHotEntity.commentCount}</a>条
											</p>
										</div>
									</li>
									</#list>
									</#if>									
								</ul>
								<ul class="sale_hot best_feed" style="display: none;">
									<#if homeAppliancesCommentPage.result?size gt 0>
									<#list homeAppliancesCommentPage.result as homeAppliancesCommentEntity>
									<li>
										<div class="goods_info">
											<div class="pic_wrap">
												<a href="${ctx}/${homeAppliancesCommentEntity.id}.html" title="${homeAppliancesCommentEntity.title?trim}" target="_blank"><img
														alt="${homeAppliancesCommentEntity.title?trim}" style=""
														_src="${homeAppliancesCommentEntity.image}_60x60.jpg"></a>
											</div>
											<div class="txt_wrap">
												<p class="name">
													<a href="${ctx}/${homeAppliancesCommentEntity.id}.html" target="_blank"
														title="${homeAppliancesCommentEntity.title?trim}">${homeAppliancesCommentEntity.title?trim}</a>
												</p>
												<p class="feedback">
													<span class="rank"><span class="rank_inner"></span></span>
													<a href="" title="${homeAppliancesCommentEntity.title?trim}" target="_blank">${homeAppliancesCommentEntity.commentCount}</a>条
												</p>
											</div>
										</div>
										<div class="feed_info">
											<dl>
												<dt><i class="dot_feed"></i>${(homeAppliancesCommentMap[homeAppliancesCommentEntity.id].content)!"质量不错，服务很好，卖家诚信。"}</dt>
												<dd>会员：${(homeAppliancesCommentMap[homeAppliancesCommentEntity.id].username)!"就***子"}</dd>
											</dl>
										</div>
									</li>
									</#list>
									</#if>
								</ul>
							</div>
						</div>
						<div class="mod_recon">
							<ul>
								<li>
									<a href="${ctx}/search?keyword=海美迪 3D播放机" target="_blank"><img alt="海美迪3D播放机"
											_src="${ctx}/resources/resource/images/index/1001_big20120613041323710494.jpg">
									</a>
								</li>
								<li>
									<a href="${ctx}/search?keyword=电吹风" target="_blank"><img alt="电吹风 安全放心"
											_src="${ctx}/resources/resource/images/index/1001_big20120413125035888168.jpg">
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="mod_brand clearfix">
					<div class="mod_brand">
						<div class="hd">
							<p class="hide_clip">
								知名品牌专卖
							</p>
						</div>
						<div class="bd">
							<p>
								<img alt="知名品牌专卖"
									_src="${ctx}/resources/resource/images/index/1001_big20120412094335560126.jpg">
							</p>
							<ul>
								<li>
									<a href="${ctx}/search?keyword=夏普" target="_blank" title="夏普"><span class="hide_clip">夏普</span></a>
								</li>
								<li>
									<a href="${ctx}/search?keyword=松下" target="_blank" title="松下"><span class="hide_clip">松下</span></a>
								</li>
								<li>
									<a href="${ctx}/search?keyword=九阳" target="_blank" title="九阳"><span class="hide_clip">九阳</span></a>
								</li>
								<li>
									<a href="${ctx}/search?keyword=美的" target="_blank" title="美的"><span class="hide_clip">美的</span></a>
								</li>
								<li>
									<a href="${ctx}/search?keyword=飞利浦" target="_blank" title="飞利浦"><span class="hide_clip">飞利浦</span></a>
								</li>
								<li>
									<a href="${ctx}/search?keyword=西门子" target="_blank" title="西门子"><span class="hide_clip">西门子</span></a>
								</li>
								<li>
									<a href="${ctx}/search?keyword=苏泊尔" target="_blank" title="苏泊尔"><span class="hide_clip">苏泊尔</span></a>
								</li>
								<li>
									<a href="${ctx}/search?keyword=格兰仕" target="_blank" title="格兰仕"><span class="hide_clip">格兰仕</span></a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<div class="mod_floor_unit clearfix">
				<!-- 办公-->
				<div class="mod_floor f5 f5_gd">
					<div class="floor_hd">
						<h3>
							<span class="name"><i class="hide_clip">办公</i></span>
							<span class="name_en">OFFICE SUPPLIES</span>
						</h3>
					</div>
					<div class="floor_bd">
						<div id="moveTabs0" class="goods_list">
							<ul class="tab_hd">
								<li class="current">
									<a href="javascript:;">1</a>
								</li>
								<li class="">
									<a href="javascript:;">2</a>
								</li>
								<li class="">
									<a href="javascript:;">3</a>
								</li>
							</ul>

							<div class="tab_bd" style="left: 0px;">
								<ul>
									<#if officeSuppliesPage.result?size gt 0>
									<#list officeSuppliesPage.result as officeSuppliesEntityOne>
									<#if officeSuppliesEntityOne_index lt 2>
									<li class="goods">
										<div class="pic_wrap">
											<a class="litpic" target="_blank" href="${ctx}/${officeSuppliesEntityOne.id}.html"><img
													alt="${officeSuppliesEntityOne.title?trim}"
													_src="${officeSuppliesEntityOne.image}_160x160.jpg"></a>
										</div>
										<div class="price_wrap">
											<p class="price">
												<span>￥</span>${officeSuppliesEntityOne.price}
											</p>
										</div>
										<div class="title_wrap">
											<a target="_blank" href="${ctx}/${officeSuppliesEntityOne.id}.html">${officeSuppliesEntityOne.title?trim}</a>
											<#--<a class="sum_wrap" target="_blank" href="">绝对低价</a>-->
										</div>
									</li>
									</#if>
									</#list>
									</#if>									
								</ul>
								<ul>
									<#if officeSuppliesPage.result?size gt 0>
									<#list officeSuppliesPage.result as officeSuppliesEntityTwo>
									<#if officeSuppliesEntityTwo_index gte 2 && officeSuppliesEntityTwo_index lt 4>
									<li class="goods">
										<div class="pic_wrap">
											<a class="litpic" target="_blank" href="${ctx}/${officeSuppliesEntityTwo.id}.html"><img
													alt="${officeSuppliesEntityTwo.title?trim}"
													_src="${officeSuppliesEntityTwo.image}_160x160.jpg"> </a>
										</div>
										<div class="price_wrap">
											<p class="price">
												<span>￥</span>${officeSuppliesEntityTwo.price}
											</p>
										</div>
										<div class="title_wrap">
											<a target="_blank" href="${ctx}/${officeSuppliesEntityTwo.id}.html">${officeSuppliesEntityTwo.title?trim}</a>											
										</div>
									</li>
									</#if>
									</#list>
									</#if>
								</ul>
								<ul>
									<#if officeSuppliesPage.result?size gt 0>
									<#list officeSuppliesPage.result as officeSuppliesEntityThree>
									<#if officeSuppliesEntityThree_index gte 4 && officeSuppliesEntityThree_index lt 6>
									<li class="goods">
										<div class="pic_wrap">
											<a class="litpic" target="_blank" href="${ctx}/${officeSuppliesEntityThree.id}.html"><img
													alt="${officeSuppliesEntityThree.title?trim}"
													_src="${officeSuppliesEntityThree.image}_160x160.jpg"></a>
										</div>
										<div class="price_wrap">
											<p class="price">
												<span>￥</span>${officeSuppliesEntityThree.price}
											</p>
										</div>
										<div class="title_wrap">
											<a target="_blank" href="${ctx}/${officeSuppliesEntityThree.id}.html">${officeSuppliesEntityThree.title?trim}</a>
										</div>
									</li>
									</#if>
									</#list>
									</#if>
								</ul>
							</div>
						</div>
						<div class="col_left">
							<ul>
								<li>
									<a href="${ctx}/search?keyword=爱普生" target="_blank"><img alt="爱普生 特惠专场"
											_src="${ctx}/resources/resource/images/index/1001_big20120606054759300131.jpg">
									</a>
								</li>
								<li>
									<a href="${ctx}/search?keyword=办公设备" target="_blank"><img alt="办公设备 买到就是赚到"
											_src="${ctx}/resources/resource/images/index/1001_big20120413010439935600.jpg">
									</a>
								</li>
								<li>
									<a href="${ctx}/search?keyword=办公耗材" target="_blank"><img alt="办公耗材 价格就是便宜"
											_src="${ctx}/resources/resource/images/index/1001_big20120413010203185751.jpg">
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div class="mod_brand clearfix">
						<div class="mod_brand">
							<div class="hd">
								<p class="hide_clip">
									知名品牌专卖
								</p>
							</div>
							<div class="bd">
								<p>
									<img alt="知名品牌专卖"
										 _src="${ctx}/resources/resource/images/index/1001_big20120412094914872865.jpg">
								</p>
								<ul>
									<li>
										<a href="${ctx}/search?keyword=佳能" target="_blank" title="佳能"><span
											class="hide_clip">佳能</span></a>
									</li>
									<li>
										<a href="${ctx}/search?keyword=惠普" target="_blank" title="惠普"><span
											class="hide_clip">惠普</span></a>
									</li>
									<li>
										<a href="${ctx}/search?keyword=兄弟" target="_blank" title="兄弟"><span
											class="hide_clip">兄弟</span></a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				<!-- 汽配 -->
				<div class="mod_floor f6 f6_gd">
					<div class="floor_hd">
						<h3>
							<span class="name"><i class="hide_clip">汽配</i> </span>
							<span class="name_en">AUTOMOTIVE</span>
						</h3>
					</div>
					<div class="floor_bd">
						<div id="moveTabs1" class="goods_list">
							<ul class="tab_hd">
								<li class="">
									<a href="javascript:;">1</a>
								</li>
								<li class="current">
									<a href="javascript:;">2</a>
								</li>
								<li class="">
									<a href="javascript:;">3</a>
								</li>
							</ul>
							
							<div class="tab_bd" style="left: -404px;">
								<ul>
									<#if automotivePage.result?size gt 0>
									<#list automotivePage.result as automotiveEntityOne>
									<#if automotiveEntityOne_index lt 2>
									<li class="goods">
										<div class="pic_wrap">
											<a class="litpic" target="_blank" href="${ctx}/${automotiveEntityOne.id}.html"><img
													alt="${automotiveEntityOne.title?trim}"
													_src="${automotiveEntityOne.image}_160x160.jpg"></a>
										</div>
										<div class="price_wrap">
											<p class="price">
												<span>￥</span>${automotiveEntityOne.price}
											</p>
										</div>
										<div class="title_wrap">
											<a target="_blank" href="${ctx}/${automotiveEntityOne.id}.html">${automotiveEntityOne.title?trim}</a>
										</div>
									</li>
									</#if>
									</#list>
									</#if>
								</ul>
								<ul>
									<#if automotivePage.result?size gt 0>
									<#list automotivePage.result as automotiveEntityTwo>
									<#if automotiveEntityTwo_index gte 2  && automotiveEntityTwo_index lt 4>									
									<li class="goods">
										<div class="pic_wrap">
											<a class="litpic" target="_blank" href="${ctx}/${automotiveEntityTwo.id}.html"><img
													alt="${automotiveEntityTwo.title?trim}"
													_src="${automotiveEntityTwo.image}_160x160.jpg"></a>
										</div>
										<div class="price_wrap">
											<p class="price">
												<span>￥</span>${automotiveEntityTwo.price}
											</p>
										</div>
										<div class="title_wrap">
											<a target="_blank" href="${ctx}/${automotiveEntityTwo.id}.html">${automotiveEntityTwo.title?trim}</a>
										</div>
									</li>
									</#if>
									</#list>
									</#if>
								</ul>
								<ul>
									<#if automotivePage.result?size gt 0>
									<#list automotivePage.result as automotiveEntityThree>
									<#if automotiveEntityThree_index gte 4  && automotiveEntityThree_index lt 6>
									<li class="goods">
										<div class="pic_wrap">
											<a class="litpic" target="_blank" href="${ctx}/${automotiveEntityThree.id}.html"><img
													alt="${automotiveEntityThree.title?trim}"
													_src="${automotiveEntityThree.image}_160x160.jpg"></a>
										</div>
										<div class="price_wrap">
											<p class="price">
												<span>￥</span>${automotiveEntityThree.price}
											</p>
										</div>
										<div class="title_wrap">
											<a target="_blank" href="${ctx}/${automotiveEntityThree.id}.html">${automotiveEntityThree.title?trim}</a>
										</div>
									</li>
									</#if>
									</#list>
									</#if>
								</ul>
							</div>
						</div>

						<div class="col_left">
							<ul>
								<li>
									<a href="${ctx}/search?keyword=智能GPS" target="_blank"><img alt="智能GPS 特价直降"
											_src="${ctx}/resources/resource/images/index/1001_big20120413125706435492.jpg">
									</a>
								</li>
								<li>
									<a href="${ctx}/search?keyword=汽车 清洁套装" target="_blank"><img alt="给力套装 清凉一夏"
											_src="${ctx}/resources/resource/images/index/1001_big20120413125558138566.jpg">
									</a>
								</li>
								<li>
									<a href="${ctx}/search?keyword=美孚机油" target="_blank"><img alt="美孚机油 省钱有理由"
											_src="${ctx}/resources/resource/images/index/1001_big20120413125419638470.jpg">
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div class="mod_brand clearfix">
						<div class="mod_brand">
							<div class="hd">
								<p class="hide_clip">
									知名品牌专卖
								</p>
							</div>
							<div class="bd">
								<p>
									<img alt="知名品牌专卖"
										_src="${ctx}/resources/resource/images/index/1001_big20120412094814076768.jpg">
								</p>
								<ul>
									<li>
										<a href="${ctx}/search?keyword=美孚" target="_blank" title="美孚"><span class="hide_clip">美孚</span></a>
									</li>
									<li>
										<a href="${ctx}/search?keyword=壳牌" target="_blank" title="壳牌"><span class="hide_clip">壳牌</span></a>
									</li>
									<li>
										<a href="${ctx}/search?keyword=博世" target="_blank" title="博世"><span class="hide_clip">博世</span></a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- 特价专区 -->
			<div class="mod_floor f7">
				<div class="floor_hd">
					<h3>
						<span class="name"><i class="hide_clip">特价专区</i></span><span class="name_en">SPECIAL</span>
					</h3>
				</div>
				<div class="floor_bd">
					<div class="goods_wrap">
						<div class="goods_list">
							<ul>		
								<#if specialPage.result?size gt 0>
								<#list specialPage.result as specialEntity>
								<li class="goods <#if specialEntity_index == 3 >last</#if>">
									<div class="pic_wrap">
										<a class="litpic" target="_blank" href="${ctx}/${specialEntity.id}.html"><img
												alt="${specialEntity.title?trim}"
												_src="${specialEntity.image}_160x160.jpg"></a>
									</div>
									<div class="price_wrap">
										<p class="price"><span>￥</span>${specialEntity.price}</p>
									</div>
									<div class="title_wrap">
										<a target="_blank" title="${specialEntity.title?trim}" href="">${specialEntity.title?trim}</a>
										<#--<a class="sum_wrap" target="_blank" title="欢乐暑假游戏  在家尽享" href="">欢乐暑假游戏 在家尽享</a>-->
									</div>
								</li>
								</#list>
								</#if>
							</ul>
						</div>
					</div>
					<div class="col_left">
						<p>
							<a href="${ctx}/search?keyword=清仓" target="_blank"><img width="202" height="271"
									alt="百货清仓1折起 满100减20"
									_src="${ctx}/resources/resource/images/index/1001_big20120606053832800976.jpg">
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>

		<div class="backtop" id="backtop" style="right: 74px; display: none;">
			<a href="#top" hidefocus="true">回顶部</a>
		</div>
		<#include "/WEB-INF/front/template/footer.ftl" />
<script type="text/javascript">
(function(w) {
	var _uls = $("#moveTabs1").children("ul");
	if (w.screen.availWidth >= 1280) {
		_uls.eq(0).show();
		_uls.eq(1).hide();
		YouBoy3C.app.index.moveTabs("#moveTabs1", 400, 4000);
	} else {
		_uls.eq(0).hide();
		_uls.eq(1).show();
		YouBoy3C.app.index.tabsNarrow(200, 4000);
	}
})(window);
</script>
<script type="text/javascript">window.yPageId = '1000';window.yPageLevel = '1';</script>
<script type="text/javascript">
	YouBoy3C = YouBoy3C || {};
	YouBoy3C.logic.header.loginStatus();
	YouBoy3C.page = YouBoy3C.age || {};
	YouBoy3C.page.defaultSearch = [];
	YouBoy3C.logic.header.initDefaultSearch();
	(function(w) {
	if (w.screen.availWidth >= 1280) {document.body.className = 'more3c_1280';}})(window);
	YouBoy3C.app.servertime = 1340266917;
	YouBoy3C.app.index.init();
</script>
	</body>
</html>
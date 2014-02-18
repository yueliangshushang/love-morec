<#include "/common/front/taglibs.ftl" />
<!DOCTYPE html PUBLIC "-/W3C/DTD XHTML 1.0 Transitional/EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>${entity.title?trim} 报价_参数_图片_论坛_评价-3C信息网</title>
<meta name="keywords" content="${entity.tags?trim}" />
<meta name="description" content="3C信息网为你提供${entity.title?trim}报价、参数、图片、论坛、评价等。" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<#--<#include "/WEB-INF/front/template/front-common-header.ftl">-->
<link href="${ctx}/resources/front/css/package_v1.css" rel="stylesheet" type="text/css">
<link href="${ctx}/resources/front/css/header_full.css" rel="stylesheet" type="text/css">
<link href="${ctx}/resources/front/css/detail_v1.css" rel="stylesheet" type="text/css">
<link href="${ctx}/resources/front/css/gb.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="${ctx}/resources/front/js/jquery-1.7.1.js" charset="UTF-8"></script>
<script type="text/javascript" src="${ctx}/resources/front/js/global.js" charset="UTF-8"></script>
<script type="text/javascript" src="${ctx}/resources/front/js/itemDetail.js" charset="UTF-8"></script>
<script type="text/javascript">
var itemInfo = {
	c3ids	: '${channel.id}',
	pid	: '${entity.id}',
	name	: '${entity.title?trim}',
	pic_num	: '${entity.moreImages?split(";")?size-1}',
	pic_url : '${entity.image}',
	c3name	: '${channel.name}',
	stock	: '${entity.shipAddress}',
	price	: '${entity.price}',
	status	: '1',
	min_price_id : '',
	min_price : ''
};
</script>
</head>
<body class="more3c_1280">
	<#include "/WEB-INF/front/template/navigation.ftl" />
	<div id="container" class="main">
		<div class="crumbs">
			<a href="${ctx}/">首页</a> &gt; 
			<#if channel?exists>
	            	<#if channel.father?exists>
	            		<#if channel.father.father?exists>
	           			 	<span><a href="${ctx }/category/${channel.father.father.id}-0-0-0-1-0.html" name="${channel.father.father.path}" id="${channel.father.father.id}">${channel.father.father.name}</a></span>&gt;
	           			</#if>
	           			<span><a href="${ctx }/category/${channel.father.id}-0-0-0-1-0.html" name="${channel.father.path}" id="${channel.father.id}">${channel.father.name}</a></span>&gt;
	           		</#if>
	           		<span><a href="${ctx }/category/${channel.id}-0-0-0-1-0.html" id="${channel.id}">${channel.name}</a></span>&gt;
	        </#if><span><#if entity.title?trim?default("")?length gt 22>${entity.title?trim?default("")[0..15]}...<#else>${entity.title?trim?default("")}</#if></span>
		</div>
		<div class="id_detail">
			<div class="picture">
				<!--图片展示区域-->
				<div id="imageViewerFrame" class="gallery">
					<div id="picpointer">
						<div id="picshower" style="height: 300px; width: 300px;">
							<img _src="${entity.image}_300x300.jpg" id="smallImage" idx="2">
							<#--
							<div style="width: 140px; height: 140px; left: 0px; top: 138px; display: none;" class="zoom_mouse"></div>
							<span style="display: none;" class="previewicon"></span>
							-->
						</div>
						<#--
						<div style="display: none; width: 373.3333333333333px; height: 373.3333333333333px; right: -395.3333333333333px;" id="zoomPic" class="zoom_pic">
							<div class="zoom_pic_wrap" id="zoomPicWrap"
								style="left: 0px; top: 0px;">
								<table>
									<tbody>
										<tr>
											<td><img
												src="${ctx}/resources/resource/images/detail/02-146-158-02(1).jpg"
												onload="YouBoy3C.util.ping.reportItemPicLoad(1340271638804, true);$(&#39;#zoomPic&#39;).css({width:(this.width*140/300)+&#39;px&#39;,height:(this.width*(140*140)/(300*140))+&#39;px&#39;,right:(-this.width*140/300-22)+&#39;px&#39;})"
												style=""></td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						-->
						<div id="pic_small_wrapper" class="pic_small">
							<a href="" onClick="return false" class="bt_before status_off" hidefocus="true"><b class="bt">◆</b></a>
							<div id="list_smallpic" class="list_smallpic">
								<ul style="width: 340px;">
									<#list entity.moreImages?split(";") as moreImage>
                 					<#if moreImage != "">
                 					<li idx="${moreImage_index}" <#if 0 == moreImage_index >class="status_on"</#if>><a title="" href="" onClick="return false" hidefocus="true"><img psrc="${moreImage}" _src="${moreImage}_50x50.jpg"></a></li>
                 					</#if>
                 					</#list>
								</ul>
							</div>
							<a href="" onClick="return false" class="bt_next" hidefocus="true"><b class="bt">◆</b></a>
						</div>						
					</div>
				</div>
			</div>
			<div class="property id_promotion">
				<h1>
					${entity.title?trim}<span>推广时间：${entity.formatCreateTime}</span>
				</h1>
				<p class="goods_info">
					<span class="strong">发货地址：${entity.shipAddress}</span>
				</p>
				<p class="goods_pingfen" id="product_pingfen" style="">
					买家评级：<span class="icon_star"><b style="width: 93%;"></b></span>(<a href="review_box">共${entity.commentCount}条评论</a>)
				</p>
				<ul class="goods_detail mate" id="goods_detail_mate">
					<li class="li item_market"><span class="t">市场价格：</span><del>￥${entity.oldprice}</del></li>
					<li class="li item_icson"><span class="t">现卖价格：</span><span class="i_yuan">￥</span><strong class="price_font">${entity.price}.00</strong>节省了${entity.spreadPirce}元&nbsp;</li>
					<li class="li stock"><span class="t">宝贝品牌：</span>${entity.brand}</li>
					<li class="li"><span class="t">商铺名称：</span>${entity.shopFullName}</li>
					<#--
					<li class="li free" id="good_detai_gift" style="display: none;">
						<span class="t">赠 品：</span>
						<ul class="list_goods list_pic_left" id="good_detai_gift_list"></ul>
					</li>
					<li class="li" id="good_detai_com" style="display: none;">
						<span class="t">组 件：</span>
						<ul class="list_goods list_pic_left" id="good_detai_com_list"></ul>
					</li>
					-->
				</ul>
				<#--
				<div id="gift_tpl" style="display: none;"></div>
				<div id="com_tpl" style="display: none;"></div>
				-->
				<ul class="goods_detail buyinfo" id="goods_detail_buyinfo">
					<li class="li"><span class="t">累计卖出：</span>
					${entity.totalSales}<#--<span class="input_mini"><input type="text" maxlength="2" maxnumlimit="999" id="order_num" value="1"></span>-->件 <span class="tips_buy">&nbsp;</span>
					</li>
					<li class="li">
						<div class="wrap_btn">
							<a class="btn_cart" href="${entity.loc}" target="_blank" rel="nofollow">去购买</a>
							<#--
							| <a href="" onClick="return false" id="btn_installment">分期付款</a>
							| <a href="" target="_blank">价格举报</a>
							-->
							<#--
							<div class="mod_share id_stage" id="mod_installment"
								style="display: none">
								<p class="hd">本商品支持以下分期付款:</p>
								<div class="bd">
									<table class="table_nor">
										<colgroup>
											<col width="20%">
											<col width="26%">
											<col width="26%">
											<col width="26%">
										</colgroup>
										<thead>
											<tr>
												<th>银行</th>
												<th>3期</th>
												<th>6期</th>
												<th>12期</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>招商银行</td>
												<td><span class="strong"><span class="i_yuan">￥</span>312.15</span>
													X 3期</td>
												<td><span class="strong"><span class="i_yuan">￥</span>157.72</span>
													X 6期</td>
												<td>-</td>
											</tr>
											<tr>
												<td>平安银行</td>
												<td><span class="strong"><span class="i_yuan">￥</span>312.15</span>
													X 3期</td>
												<td><span class="strong"><span class="i_yuan">￥</span>157.72</span>
													X 6期</td>
												<td>-</td>
											</tr>
										</tbody>
									</table>
									<div class="wrap_btn">
										<a class="check_notice"
											href=""
											target="_blank">查看分期付款说明</a> <a
											href="" class="btn_strong"
											onClick="YouBoy3C.app.itemDetail.addToCart(true);return false"><strong>申请分期付款</strong></a>
									</div>
								</div>
								
								<b class="icon_jian"></b>
							</div>-->
						</div>
					</li>
				</ul>

				<div class="mod_faver wrap_btn">
					<a class="favorite" href="" onClick="YouBoy3C.app.itemDetail.addToFavor(this.href,itemInfo.name);return false">收藏</a>
					<!-- <p class="para_inb para_right favorites"> <span class="icon icon_msg0 icon_msg0_right"></span><span id="altertext" class="msg-title">收藏成功！</span> </p> -->
					<a id="mod_share_btn" class="share" href="" onClick="return false">分享</a>
					<div class="mod_share" id="mod_share" style="display: none">
						<p class="hd"></p>
						<div class="bd">
							<ul class="list_share">
								<!--
							<li><a href="#"><b class="logo_renren"></b>人人网</a></li>
							<li><a href="#"><b class="logo_qzone"></b>QQ空间</a></li>
							<li><a href="#"><b class="logo_kaixin"></b>开心网</a></li>
							-->
								<li><a 
									href="http://v.t.qq.com/share/share.php?title=%E6%88%91%E5%9C%A8%E6%98%93%E8%BF%85%E7%BD%91%E7%9C%8B%E5%88%B0AOC%20%E5%86%A0%E6%8D%B7%20I2351FE%2023%E8%8B%B1%E5%AF%B8%E5%AE%BD%E5%B1%8F%E6%B6%B2%E6%99%B6%E6%98%BE%E7%A4%BA%E5%99%A8%2C%E5%B8%82%E5%9C%BA%E4%BB%B71039.00%E5%85%83%EF%BC%8C%E6%98%93%E8%BF%85%E5%8F%AA%E8%A6%81899.00%E5%85%83%EF%BC%8C%E8%BF%98%E7%AD%89%E4%BB%80%E4%B9%88%EF%BC%8C%E5%A4%A7%E5%AE%B6%E5%BF%AB%E6%9D%A5%E6%8A%A2%E5%90%A7%EF%BC%81%20%40%E6%98%93%E8%BF%85%E7%BD%91%20&url=http%3A%2F%2Fitem.51buy.com%2Fitem-243056.html%3FLS%3Dtqq&appkey=0cb44fae2de1437a81b846a9d45180f4&site=http://www.51buy.com&pic=http://img2.icson.com/product/mm/02/146/02-146-158.jpg"
									onClick="return false" id="share_tx_weibo" target="_blank"><b
										class="logo_tx_weibo"></b>腾讯微博</a></li>
								<li><a 
									href="http://v.t.sina.com.cn/share/share.php?content=%E6%88%91%E5%9C%A8%E6%98%93%E8%BF%85%E7%BD%91%E7%9C%8B%E5%88%B0AOC%20%E5%86%A0%E6%8D%B7%20I2351FE%2023%E8%8B%B1%E5%AF%B8%E5%AE%BD%E5%B1%8F%E6%B6%B2%E6%99%B6%E6%98%BE%E7%A4%BA%E5%99%A8%2C%E5%B8%82%E5%9C%BA%E4%BB%B71039.00%E5%85%83%EF%BC%8C%E6%98%93%E8%BF%85%E5%8F%AA%E8%A6%81899.00%E5%85%83%EF%BC%8C%E8%BF%98%E7%AD%89%E4%BB%80%E4%B9%88%EF%BC%8C%E5%A4%A7%E5%AE%B6%E5%BF%AB%E6%9D%A5%E6%8A%A2%E5%90%A7%EF%BC%81%20%40%E6%98%93%E8%BF%85%E7%BD%91%E5%AE%98%E7%BD%91%20&title=%E6%88%91%E5%9C%A8%E6%98%93%E8%BF%85%E7%BD%91%E7%9C%8B%E5%88%B0AOC%20%E5%86%A0%E6%8D%B7%20I2351FE%2023%E8%8B%B1%E5%AF%B8%E5%AE%BD%E5%B1%8F%E6%B6%B2%E6%99%B6%E6%98%BE%E7%A4%BA%E5%99%A8%2C%E5%B8%82%E5%9C%BA%E4%BB%B71039.00%E5%85%83%EF%BC%8C%E6%98%93%E8%BF%85%E5%8F%AA%E8%A6%81899.00%E5%85%83%EF%BC%8C%E8%BF%98%E7%AD%89%E4%BB%80%E4%B9%88%EF%BC%8C%E5%A4%A7%E5%AE%B6%E5%BF%AB%E6%9D%A5%E6%8A%A2%E5%90%A7%EF%BC%81%20%40%E6%98%93%E8%BF%85%E7%BD%91%E5%AE%98%E7%BD%91%20&url=http%3A%2F%2Fitem.51buy.com%2Fitem-243056.html%3FLS%3Dtqq&appkey=2992571369&site=http://www.51buy.com&pic=http://img2.icson.com/product/mm/02/146/02-146-158.jpg"
									onClick="return false" id="share_sina_weibo" target="_blank"><b
										class="logo_sina_weibo"></b>新浪微博</a></li>
							</ul>
						</div>
						<b class="icon_jian"></b>
					</div>
				</div>
				<p class="tips">
					<span class="t">提示：</span>该数据于天猫淘宝商城，购买须在天猫和淘宝商城。
				</p>
			</div>
		</div>
		<!-- 基本信息 -->
		<#--
		<div class="mod_aider id_suiixinpei" id="easy_match" style="">
			<div class="inner">
				<div class="hd">
					<h3>随心配</h3>
				</div>
				<div class="bd">					
					<ul class="list_goods list_pic_left">
						<li class="status_aid"><label class="aid"><input name="easy_match_check" ordprice="9400" price="8200" type="checkbox" value="93072"></label>
								<a href="" target="_blank">
								<span class="img"><img
									src="${ctx}/resources/resource/images/detail/02-386-001.jpg"
									alt="Rapoo 雷柏 H1000 无线耳麦 黑色"></span> <span class="link_info">
									<strong class="name">Rapoo 雷柏 H1000 无线耳麦 黑色</strong> <span
									class="price">单卖价：<del>￥94.00</del></span> <span class="price">搭售价：<span
										class="strong">￥82.00</span></span>
							</span>
						</a></li>
						<li><label class="aid"><input name="easy_match_check" ordprice="6900" price="6200" type="checkbox" value="31071"></label>
							<a  href="" target="_blank">
								<span class="img"><img
									src="${ctx}/resources/resource/images/detail/01-386-046.jpg"
									alt="Rapoo雷柏 7100 无线鼠标 蓝光加强版 魅力红"></span> <span
								class="link_info"> <strong class="name">Rapoo雷柏
										7100 无线鼠标 蓝光加强版 魅力红</strong> <span class="price">单卖价：<del>￥69.00</del></span>
									<span class="price">搭售价：<span class="strong">￥62.00</span></span>
							</span>
						</a></li>
					</ul>
					<div class="info">
						<p>
							已搭配：<span id="pkg_num">0</span>件 [<a
								onClick="YouBoy3C.app.itemDetail.clearPkgCheck();return false">清除选择</a>]
						</p>
						<p>
							套餐价：<strong class="strong" ordprice="899.00" id="pkg_price">￥899.00</strong>
						</p>
						<p>
							节省了：<strong class="strong" id="save_pkg_price">￥0.00</strong>
						</p>
						<p class="tips">点击加入购物车一起搭配购买</p>
						<div class="wrap_btn">
							<a class="btn_strong" onClick="return false">加入购物车</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		-->
		<div class="wrap_info">
			<div class="content">
				<!-- S 产品介绍-->
				<div class="mod_goods_info" id="introduction">
					<ul class="hd">
						<li id="t_introduce" n="introduce" class="status_on">
							<h3>
								<a href="" onClick="return false" hidefocus="hidefocus">产品介绍</a>
							</h3>
						</li>
						<li id="t_parameters" n="parameters" class="">
							<h3>
								<a href="" onClick="return false" hidefocus="hidefocus">规格参数</a>
							</h3>
						</li>
						<li id="t_packinglist" n="packinglist">
							<h3>
								<a href="" onClick="return false" hidefocus="hidefocus">包装清单</a>
							</h3>
						</li>
						<li id="t_warranty" n="warranty">
							<h3>
								<a href="" onClick="return false" hidefocus="hidefocus">售后服务</a>
							</h3>
						</li>
					</ul>
					<div class="bd" id="intro-main_tab">
						<div class="intro-main" id="c_introduce" style="">
							${(entityDesc.desc)!"该商品在本站没有推广它的商品描述"}
							<#--
							<div id="c_ad" style="margin-bottom: 8px; display: none;"></div>
							<p><img class="" border="0" alt="" width="720" height="314" src="${ctx}/resources/resource/images/detail/A243056-02.jpg"></p>
							<p><img class="" alt="" width="720" height="1620" src="${ctx}/resources/resource/images/detail/A243056-03.jpg"></p>
							-->
						</div>
						<div class="intro-main intro-main-b" id="c_parameters" style="display: none;">
							<table cellpadding="0" cellspacing="0" class="specification">
								<tbody>
									<tr>
										<td colspan="2" class="title">部分参数</td>
									</tr>
									<#if entity.props?exists><#list entity.props?replace("[\\s]*","")?split("@") as props>
									<#if (props_has_next)>
									<tr>								
		                      			<#list props?split(":") as prop><#if prop_index==2><#break></#if><td class=<#if prop_index==0>"name"<#else>"desc"</#if>>${prop}</td></#list>
									</tr>
									</#if>
									</#list><#else>该商品在本站没有推广它的商品参数</#if>
								</tbody>
							</table>
						</div>
						<div class="intro-main intro-main-c id_warranty" id="c_warranty" style="display: none;"></div>
						<div class="intro-main" id="c_packinglist" style="display: none;"></div>
					</div>
				</div>
				<!-- E 产品介绍-->

				<!-- E 特别声明 -->
				<div class="mod_aider id_state">
					<div class="hd">
						<h3>特别声明</h3>
					</div>
					<div class="bd">
						<p class="strong state_cont">因推广商铺会在没有任何提前通知的情况下更改产品图片、价格或者一些参数，本站不能确保客户在此浏览到的商品与淘宝天猫等商城的图片、价格、详情说明完全一致。只能确保收有商品都正常来源天猫淘宝等商城的商品。另外商品的规格参数均以产品的官方网站为准，若官网有误或本站没有及时同步更新，请大家谅解！</p>
					</div>
				</div>
				<div class="clear"></div>
				<!-- S 特别声明 -->
				
				<!-- 商品介绍 -->

				<!-- S 买家评论-->
				<div class="mod_goods_info" id="review_box">
					<ul class="hd" id="review_header">
						<li t="0" class="status_on"><h3><a href="javascript:" onClick="return false" hidefocus="hidefocus">网友分享(${entity.commentCount})</a></h3></li>
						<#--
						<li t="1"><h3>
								<a href=""
									onClick="return false" hidefocus="hidefocus"
									>满意(861)</a>
							</h3></li>
						<li t="2"><h3>
								<a href=""
									onClick="return false" hidefocus="hidefocus"
									">一般(30)</a>
							</h3></li>
						<li t="3"><h3>
								<a href=""
									onClick="return false" hidefocus="hidefocus"
									">不满意(18)</a>
							</h3></li>
						<li t="4"><h3>
								<a href=""
									onClick="return false" hidefocus="hidefocus"
									>讨论(19)</a>
							</h3></li>
						-->
					</ul>
					<div class="bd" id="review_content">
						<div class="more">
							<a id="post_review" href="${entity.loc}" target="_blank" rel="nofollow"><span>查看所有评论</span></a>
						</div>
						<div class="comment_all">
							<div class="content">
								<ul class="list_comment">
									<#if commentPage.result?size gt 0><#list commentPage.result as entityComment>
									<li>
										<div class="user">
											<img width="60" height="60" _src="http://wwc.taobaocdn.com/avatar/getAvatar.do?userId=${entityComment.userid?trim}&width=60&height=60&type=sns" />
											<span class="name">${entityComment.username}</span><#--<span class="level">VI会员</span>-->
										</div>
										<div class="cont">
											<div class="title">
												<span class="comment_sort"><strong>[购买]</strong></span><span
													class="comment-txt"><span class="icon_star"><b style="width:${entityComment.percentum};"></b></span></span><span class="coment_tit">
													<strong>${entityComment.scoretum}分  ${entityComment.satisfaction}</strong></span><span class="date">${entityComment.created}</span>
											</div>
											<div class="text">${entityComment.content}</div>
											<#--
											<div class="wrap_btn">
												<a
													href=""
													class="btn_common" reply="5120458" rtype="1" uid="47357472"
													onClick="return false">回复</a> <a
													href=""
													rdown="5120458" onClick="return false">踩(0)</a> <a
													href=""
													rup="5120458" onClick="return false">顶(0)</a>
											</div>
											<div class="reply" id="replylist_1_5120458" total="0"
												open="0" style="display: none">
												<div class="arrow_top">
													<i>◆</i>
												</div>
												<p class="reply_more" style="display: none">
													<a
														href=""
														replylist="5120458" rtype="1" onClick="return false">查看全部0条回复&gt;&gt;</a>
												</p>
												<ul class="list_reply">

												</ul>
											</div>
											-->
										</div>
									</li>
									</#list></#if>
								</ul>
								<#--
								<div id="review_list_tpl" style="display: none"></div>
								<div id="review_reply_list_tpl" style="display: none"></div>
								<div class="page_wrap" style="display: block;">
									<div class="paginator" id="review_page">
										<span class="page-start"><b>&lt;</b>上一页</span><span
											class="page-this">1</span><a
											href=""
											onClick="showReviewPage(&#39;2&#39;);return false">2</a><a
											href=""
											onClick="showReviewPage(&#39;3&#39;);return false">3</a><a
											href=""
											onClick="showReviewPage(&#39;4&#39;);return false">4</a><a
											href=""
											onClick="showReviewPage(&#39;5&#39;);return false">5</a><span
											class="page-break">...</span><a
											href=""
											onClick="showReviewPage(&#39;93&#39;);return false">93</a><a
											href=""
											onClick="showReviewPage(&#39;2&#39;);return false"
											class="page-next">下一页<b>&gt;</b></a><span class="page-skip">
											到第<input type="text" value="1" maxlength="3" name="iptpage"
											onKeyDown="if(event.keyCode==13){$(&#39;button[name=go]&#39;,$(this).parent()).click();return false;}">页
											<button name="go" value="go"
												onClick="var a=parseInt($(&#39;input[name=iptpage]&#39;,$(this).parent()).val(),10);a=(!!a&amp;&amp;a&gt;0&amp;&amp;a&lt;=93)?a:1;$.globalEval(&#39;showReviewPage(\&#39;&#39;+a+&#39;\&#39;)&#39;);return false">确定</button>
										</span>
									</div>
								</div>
								-->
							</div>
						</div>
					</div>
				</div>
				<!-- E 买家评论-->

			</div>
			<div class="sidebar">
				<!-- S 同价位热销榜 -->
				<div class="mod_aider id_sameprice" id="product_price_hottop" style="">
					<div class="inner">
						<div class="hd">
							<h3>同价位热销榜</h3>
						</div>
						<div class="bd" id="product_price_hottop_list">
							<ul class="list_goods list_pic_left">
								<#list samePriceEntities as samePriceEntity>
								<li <#if samePriceEntity_index lte 2>class="top"</#if>><a href="${ctx}/${samePriceEntity.id}.html" 
											target="_blank"><b class="aid">${samePriceEntity_index+1}</b><span class="img">
											<img src="${samePriceEntity.image}_60x60.jpg"
											alt="${samePriceEntity.title?trim}"></span><span class="link_info"><strong
											class="name">${samePriceEntity.title?trim}</strong><span
											class="price"><span class="strong">￥${samePriceEntity.price}.00</span></span>
									</span>
								</a></li>
								</#list>
							</ul>
						</div>

					</div>
				</div>
				<!-- E 同价位热销榜-->
				<!-- S 同类商品 -->
				<div class="mod_aider id_same_goods" id="c3id_same" style="">
					<div class="inner">
						<div class="hd">
							<h3>相关分类</h3>
						</div>
						<div class="bd">
							<ul class="list_sort_txt">
								<#list brotherChannels as channel>
								<li><a href="${ctx}/category/${channel.id}-0-0-0-1-0.html" target="_blank">${channel.name}</a></li>
								</#list>			
							</ul>
						</div>
					</div>
				</div>
				<!-- E 同类商品-->

				<!-- S 最近浏览过的 -->
				<div class="mod_aider id_saw">
					<div class="inner">
						<div class="hd">
							<h3>最近浏览过的</h3>
						</div>
						<div class="bd" id="visitList">
							<ul class="visit_list_goods list_goods list_pic_left">
								<#--<li><a href="" target="_blank" class="img"><img
										src="${ctx}/resources/resource/images/detail/43-017-250.jpg"
										alt="" class="">
								</a><span class="link_info"><a href="" target="_blank">
											<strong class="name">Panasonic 松下 TH-P55VT31C
												55英寸等离子电视</strong>
									</a> <span class="price strong"> ￥10799.00 </span>
								</span></li>
								-->
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
	</div>
	<!-- 内容 结束 -->
	<div class="backtop" id="backtop">
		<a href="javascript:" title="回顶部">回顶部</a>
	</div>
	<#include "/WEB-INF/front/template/footer.ftl" />
	<script type="text/javascript">YouBoy3C.app.itemDetail.initPicPre({pic_num	: itemInfo.pic_num});</script>
	<script>(function(w){if(w.screen.availWidth>=1280)document.body.className = 'more3c_1280';})(window);</script>
	<script type="text/javascript">$(document).ready(function(){YouBoy3C.app.itemDetail.init();});</script>
	<script type="text/javascript">
	YouBoy3C = YouBoy3C || {};
	YouBoy3C.logic.header.loginStatus();
	YouBoy3C.page = YouBoy3C.age || {};
	YouBoy3C.page.defaultSearch = [];
	YouBoy3C.logic.header.initDefaultSearch();
	</script>
	<script type="text/javascript" src="${ctx}/resources/front/js/visithistory.js" charset="UTF-8"></script>
</body>
</html>
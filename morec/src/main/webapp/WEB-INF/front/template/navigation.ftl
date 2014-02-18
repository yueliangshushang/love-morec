<#include "/common/front/taglibs.ftl" />
	<!--toolbar-->
	<div id="PageToolbar" class="more3c_top_toolbar">
		<div class="more3c_wrap">
			<#--
			<ul id="QQBuyEntry" class="toolbar_nav toolbar_buy">
				<li class="item item_qqbuy"><a href="" target="_blank"><span class="hide_clip">QQ网购</span></a></li>
				<li class="item"><a href="" target="_blank">服饰</a></li>
				<li class="item"><a href="" target="_blank">运动</a></li>
				<li class="item"><a href="" target="_blank">珠宝</a></li>
				<li class="item"><a href="" target="_blank">超市</a></li>
				<li class="item item_more">
					<div class="menu">
						<a class="menu_hd" href="">更多<i class="dot_arrowdown"></i></a>
						<div class="menu_bd">
							<div class="mod_more">
								<ul>
									<li><a href="" target="_blank">数码</a></li>
									<li><a href="" target="_blank">美妆</a></li>
									<li><a href="" target="_blank">箱包</a></li>
									<li><a href="" target="_blank">电影</a></li>
									<li><a href="" target="_blank">机票</a></li>
									<li><a href="" target="_blank">充值</a></li>
								</ul>
							</div>
						</div>
					</div>
				</li>
			</ul>
			-->
			<p class="tel">
				<i class="dot_tel"></i>136-6053-8268
			</p>
			
			<ul id="PageLoginStatusbar" class="toolbar_nav">
				<#--
				<li id="PageLogin" class="item"><a href="">登录</a></li>
				<li id="PageLoginByQQBtn" class="item loginbyqq"><a href=""><i class="dot_qq"></i><span class="hide_clip">QQ登录</span></a></li>
				<li id="PageRegLi" class="item"><a id="PageRegBtn" href="">注册</a></li>
				-->
				<#-- login status holder -->
				<#--
				<li id="PageMyOrderLi" class="item item_order">
					<div class="menu">
						<a id="PageMyOrderLink" href="" class="menu_hd">我的订单<i class="dot_arrowdown"></i></a>
						<div class="menu_bd">
							<div class="mod_order">
								<p class="empty">
									<a href="">登录</a>后查看最近的订单信息
								</p>
							</div>
						</div>
					</div>
				</li>
				-->
				<li class="item"><a href="">我要收藏</a></li>
				<li class="item">
				<a target="_blank" href="" class="t_qq" title="关注3C信息网官方腾讯微博"><span class="hide_clip">腾讯微博</span></a>
				<a target="_blank" href="" class="t_qq t_sina" title="关注3C信息网官方新浪微博"><span class="hide_clip">新浪微博</span></a>
				</li>
				<#--<li class="item"><a href="">企业用户</a></li>-->
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
			<h1><a href="${ctx}/" class="logo_bd" title="3C信息网"><span class="hide_clip">3C信息网</span></a></h1>
		</div>
		<#--
		<div id="i_region" class="area_change">
			<a href="javascript:;" class="change">广东<i class="dot_change"></i></a>
			<div class="jump_city">
				<ul class="city">
					<li><a href="" onClick="return false" w="1">上海</a></li>
					<li><a href="" onClick="return false" w="2001">北京</a></li>
					<li><a href="" onClick="return false" w="3001">湖北</a></li>
				</ul>
				<div class="nor">其他地区用户请选择上海</div>
				<p class="load"></p>
				<p class="f">
					<span class="icon icon_msg0 icon_msg0_warn"></span>切换失败，请<a class="switch_fail_btn" href="">返回重试</a>
				</p>
			</div>
		</div>
		<div class="area_change_desc">
			<a id="i_shandiansong_desc" class="desc" target="_blank" href=""
				title="">晚上买明早到</a>
		</div>
		<div class="stand_trans">
			<a title="闪电送" target="_blank" href=""></a>
		</div>
		-->
		<a target="_blank" href="${ctx}/"><div class="stand "><span class="hide_clip">数码导购商城推广</span></div></a>
		<div class="search">
			<div class="search_bd">
				<h2 class="hide_clip">搜索</h2>
				<form onSubmit="return YouBoy3C.logic.header.query()" name="search" action="${ctx}/search" target="_top">
					<input type="text" id="q_show" name="keyword" autocomplete="off"
						value="<#if keyword?exists>${keyword}</#if>" x-webkit-speech=""
						class="mod_search_txt no_cur">
					<button class="search_submit">
						<span class="hide_clip">搜索</span>
					</button>
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
			<div class="more3c_cate" id="category_container">
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
											<a href="">三星</a><a href="">MOTO</a><a href="">HTC</a><a href="">合约购机</a>
										</dd>
									</dl>
								</div>									
								<div class="item_bd">
									<div class="list">
									<#list category.children as children>
										<dl>
											<dt class="t">
												${children.name!""}
											</dt>
											<dd>
											    <#list children.children as child>
												<a href="${ctx}/${child.path!""}.html">${child.name}</a>	
											    </#list>
											</dd>
										</dl>																			
								    </#list>											
									</div>
									<div class="hot">
										<p class="t">热门</p>
										<ul>
											<li><a href="">诺基亚lumia立减再送电源</a></li>
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
					<li id="nav_home"><a href="${ctx}/">首页</a></li>
					<#--
					<li id="nav_qqbuy"><a href="" target="_blank">QQ网购</a></li>
					<li id="nav_diy"><a href="">装机宝</a></li>
					<li id="nav_morning_market"><a href="">早市<i class="dot_hot"><span class="hide_clip">热</span></i></a></li>
					<li id="nav_nightcountdown"><a href="">天黑黑</a></li>
					<li id="nav_second"><a href="">二手特卖</a></li>
					<li id="nav_groupbuy"><a href="">团购</a></li> -->
				</ul>
			</div>
			<#--
			<div id="i_cart_info" class="cart_bd">
				<a class="cart_wrap cart_wrap_empty" href=""><i class="dot_cart"></i><span>购物车（0）件</span></a>
				<div class="cart_list" style="display: none">正在努力为您加载购物车信息…</div>
			</div>
			-->
		</div>
	</div>
	<!--/nav-->
YouBoy3C.app.itemDetail = {
	method : 0,
	initPicPre : function(c) {
		var e = c || {};
		if (!e.product_char_id || e.pic_num <= 0) {
			return
		}
		e.pic_num = e.pic_num || 1;
		var h = [];
		for ( var g = 0; g < e.pic_num; g++) {
			h
					.push('<li><a title="" href="#" onclick="return false" hidefocus="true"><img char_id="'
							+ e.product_char_id
							+ '" psrc="'
							+ YouBoy3C.logic.constants.getSSUrl(e.product_char_id, g)
							+ '" src="http://st.icson.com/static_v1/img/blank.gif"></a></li>')
		}
		var o = 68;
		$("#list_smallpic ul").html(h.join("")).width(o * e.pic_num);
		function m(p, i) {
			p.removeClass("status_off");
			if (!i) {
				p.addClass("status_off")
			}
		}
		function a(i) {
			$("#list_smallpic li a img").each(function(p) {
				if (p >= i && p < i + 4) {
					if ($(this).attr("psrc")) {
						$(this).attr("src", $(this).attr("psrc"));
						$(this).attr("psrc", "")
					}
				}
			})
		}
		var l = 0;
		var b = false;
		function k(i) {
			if (b) {
				return
			}
			b = true;
			if (i > 0) {
				if (l >= e.pic_num - 4) {
					return
				}
				l++
			} else {
				if (l <= 0) {
					return
				}
				l--
			}
			m($("#pic_small_wrapper .bt_next"), l < e.pic_num - 4);
			m($("#pic_small_wrapper .bt_before"), l > 0);
			a(l);
			$("#list_smallpic").animate({
				scrollLeft : l * o
			}, 100, "", function() {
				b = false
			})
		}
		m($("#pic_small_wrapper .bt_next"), 0 < e.pic_num - 4);
		m($("#pic_small_wrapper .bt_before"), false);
		a(0);
		$("#pic_small_wrapper .bt_before").click(function() {
			if ($(this).hasClass("status_off")) {
				return
			}
			k(-1)
		});
		$("#pic_small_wrapper .bt_next").click(function() {
			if ($(this).hasClass("status_off")) {
				return
			}
			k(1)
		});
		$("#list_smallpic li")
				.each(
						function(i) {
							$(this).attr("idx", i);
							$(this)
									.mouseenter(
											function() {
												$("#list_smallpic li").filter(
														".status_on")
														.removeClass(
																"status_on");
												$(this).addClass("status_on");
												var q = $(this).find("img")
														.attr("char_id"), p = $(
														this).attr("idx");
												$("#smallImage").attr(
														"char_id", q);
												$("#smallImage").attr("idx", p);
												$("#smallImage")
														.attr(
																"src",
																YouBoy3C.logic.constants
																		.getMMUrl(
																				q,
																				p))[0].onload = (function(
														r) {
													return function() {
														YouBoy3C.util.ping
																.reportItemPicLoad(
																		r,
																		false)
													}
												})((new Date()).getTime())
											})
						});
		var d = 140;
		var f = 140;
		var n = 300;
		$("#list_smallpic li:first").mouseenter();
		$("#picshower .zoom_mouse").css({
			width : d + "px",
			height : f + "px"
		});
		$("#picshower")
				.mouseenter(
						function() {
							$(this).children(".zoom_mouse").show();
							$(this).children(".previewicon").show();
							var i = (new Date()).getTime();
							$("#zoomPic td")
									.html(
											'<img src="'
													+ YouBoy3C.logic.constants
															.getBigUrl(
																	$(
																			"#smallImage")
																			.attr(
																					"char_id"),
																	$(
																			"#smallImage")
																			.attr(
																					"idx"))
													+ '" onload="YouBoy3C.util.ping.reportItemPicLoad('
													+ i
													+ ", true);$('#zoomPic').css({width:(this.width*"
													+ d
													+ "/"
													+ n
													+ ")+'px',height:(this.width*("
													+ d
													+ "*"
													+ f
													+ ")/("
													+ n
													+ "*"
													+ d
													+ "))+'px',right:(-this.width*"
													+ d + "/" + n
													+ "-22)+'px'})\"/>");
							$("#zoomPic").show()
						})
				.mousemove(
						function(u) {
							var x = $(this).children(".zoom_mouse");
							var y = d, r = f, A = $(this).width(), t = $(this)
									.height(), q = $(this).offset().left, i = $(
									this).offset().top;
							var z = u.clientX + $(document).scrollLeft() - q
									- y / 2;
							var s = u.clientY + $(document).scrollTop() - i - r
									/ 2;
							var v = (z > (A - y) ? (A - y) : (z < 0 ? 0 : z));
							var p = (s > (t - r) ? (t - r) : (s < 0 ? 0 : s));
							x.css({
								left : v + "px",
								top : p + "px"
							});
							$("#zoomPicWrap")
									.css(
											{
												left : ($("#smallImage")[0].offsetLeft - v)
														* $("#zoomPic td img")
																.width()
														/ n
														+ "px",
												top : ($("#smallImage")[0].offsetTop - p)
														* $("#zoomPic td img")
																.height()
														* d
														/ (f * n) + "px"
											})
						}).mouseleave(function() {
					$(this).children(".zoom_mouse").hide();
					$(this).children(".previewicon").hide();
					$("#zoomPic").hide()
				});
		h = [];
		for ( var g = 0; g < e.pic_num; g++) {
			h
					.push('<li><a title="" href="#" onclick="return false" hidefocus="true"><img src="'
							+ YouBoy3C.logic.constants.getSmallUrl(e.product_char_id,
									g) + '" /></a></li>')
		}
		var j = null;
		$(".zoom_mouse")
				.click(
						function() {
							if (!j) {
								j = YouBoy3C.ui.popup.create({
									width : 700,
									title : "Ԥ��",
									fullscreen : 1
								});
								j
										.paint(function(i) {
											$(i.content)
													.html(
															'<div class="wrap_gallery">	<div class="big_pic"></div>	<div class="small_list">		<p class="txt">���Сͼ���л�ͼƬ</p>		<ul class="list_smallpic">'
																	+ h
																			.join("")
																	+ '</ul>		<p class="txt">(ȫ����'
																	+ e.pic_num
																	+ '��ͼƬ)</p>		<div class="wrap_btn">			<a href="#" class="btn_strong" onclick="YouBoy3C.app.itemDetail.addToCart(false, this);return false">���빺�ﳵ</a>		</div>	</div></div>');
											$(i.content)
													.find(".list_smallpic li a")
													.each(
															function() {
																$(this)
																		.click(
																				function() {
																					$(
																							i.content)
																							.find(
																									".list_smallpic li")
																							.filter(
																									".status_on")
																							.removeClass(
																									"status_on");
																					$(
																							this)
																							.parent()
																							.addClass(
																									"status_on");
																					$(
																							i.content)
																							.find(
																									".big_pic")
																							.html(
																									'<img src="'
																											+ $(
																													this)
																													.find(
																															"img")
																													.attr(
																															"src")
																													.replace(
																															/\/small\//,
																															"/mpic/")
																											+ '" alt="" />')
																				})
															});
											$(i.content)
													.find(
															".list_smallpic li a:first")
													.click()
										});
								setTimeout(function() {
									j.show();
									j.resize()
								}, 100)
							} else {
								j.show()
							}
						})
	},
	getAd : function() {
		var a = (window.screen.availWidth >= 1280) ? 1 : 0;
		$.get("http://" + YouBoy3C.DOMAIN.ITEM_ICSON_COM
				+ "/json.php?mod=item&act=getad&pid=" + itemInfo.pid
				+ "&isWide=" + a, function(b) {
			if (b.data != "") {
				$("#c_ad").empty().html(b.data);
				$("#c_ad").show()
			} else {
				$("#c_ad").hide()
			}
		}, "jsonp")
	},
	initDetailTab : function(a) {
		$
				.each(
						[ "introduce", "parameters", "warranty", "packinglist" ],
						function(c, b) {
							$("#t_" + b).attr("n", b);
							$("#t_" + b)
									.click(
											function() {
												$("#introduction .hd li")
														.filter(".status_on")
														.removeClass(
																"status_on");
												$("#introduction .hd li")
														.filter(
																"#t_"
																		+ $(
																				this)
																				.attr(
																						"n"))
														.addClass("status_on");
												$("#introduction .bd")
														.children().filter(
																":visible")
														.hide();
												var d = $("#c_"
														+ $(this).attr("n"));
												if (b == "warranty") {
													$("#intro-main_tab")
															.addClass(
																	"id_warranty_wrap")
												} else {
													$("#intro-main_tab")
															.removeClass(
																	"id_warranty_wrap")
												}
												d.show();
												if (d.data("contentLoaded") != 1) {
													d.data("contentLoaded", 1);
													d
															.html('<span class="loading_58_58">���ڼ�����</span>');
													var e = $(this).attr("n");
													$
															.get(
																	"http://"
																			+ YouBoy3C.DOMAIN.ITEM_ICSON_COM
																			+ "/json.php?mod=item&act="
																			+ e
																			+ "&pid="
																			+ a,
																	function(h) {
																		if (h.errno == 0) {
																			if (e == "warranty") {
																				h.data = h.data
																						.replace(
																								/^\s+/,
																								"");
																				var g = "";
																				if (h.data == ""
																						|| h.data.length < 0) {
																					g = ""
																				} else {
																					g = '										<div class="mod_aider">											<div class="i_hd">												<h3>��������</h3>											</div>											<div class="i_bd"> 												 <p>'
																							+ h.data
																							+ "</p>											</div>										</div>"
																				}
																				var f = g
																						+ '			<div class="mod_aider">				<div class="i_hd">					<h3>�ۺ�����</h3>				</div>				<div class="i_bd">					<div class="mod_warranty id_deadline">						<div class="mod_warranty_hd"><h3>����ʱЧ</h3></div>						<div class="mod_warranty_bd">							<p>���Ʒ����ֹ�������涨�����ܹ��ϣ����ɳ���ָ������Լά�޵�ȷ�Ϲ���ȷʵ���ۺ���ʱЧ���£�</p>							<div class="deadline">								<div class="deadline_item"><div class="img img1"></div><p>7����,�����ѡ���˻�������������ѱ��ޡ�</p></div>								<div class="deadline_item"><div class="img img2"></div><p>��8������15����,�����ѡ�񻻻�������ѱ��ޡ�</p></div>								<div class="deadline_item noborder"><div class="img img3"></div><p>����15�ղ��ڱ�������,�����������ѱ��ޡ�</p></div>							</div>						</div>					</div>					<div class="mod_warranty id_promise">						<div class="mod_warranty_hd"><h3>��Ѹ��ŵ</h3></div>						<div class="mod_warranty_bd">							<dl class="promise">								<dd class="item"><dl><dt class="promise_i1">��Ʒ�л�</dt><dd>��Ѹ��������Ʒ���ɹ�Ӧ�̻������ṩ���л���Ʒ��</dd></dl>								<dd class="item"><dl><dt class="promise_i2">������</dt><dd>��Ѹ��������Ʒ�������ԭ�����޻�Ӧ���ṩ�ĸ�ά�޺ͱ�����񣻳��Һ͹�Ӧ��������������Ӧ���μ�����Ϊ�û��ṩ��Ӧ�ı��ޡ���ά�޺ͱ������</dd></dl>								<dd class="item"><dl><dt class="promise_i3">Ȩ��ά��</dt><dd>���û��򳧼һ�Ӧ����ȡ���Ȩ�漰Ӧ�з���ʱ����Ѹ������û���Ҫ�ĵ�һʱ���ṩ�йص���ϵ��Э������Э���û�ά���Լ�Ӧ�е�Ȩ�档</dd></dl>                                <dd class="item"><dl><dt class="promise_i4">��淢Ʊ</dt><dd>��Ѹ���Ϊ���пͻ����߷�Ʊ��Ϊ�ͻ����ʱ�ƾ֤����˿����б���ԭ����Ϊ�����ʱ�֮�衣</dd></dl>							</dl>						</div>					</div>					<div class="mod_warranty id_flow">						<div class="mod_warranty_hd"><h3>��������</h3></div>						<div class="mod_warranty_bd">							<img class="img2" src="http://st.icson.com/static_v1/img/icson/process_flow.png" width="873" height="285">							<img class="img1" src="http://st.icson.com/static_v1/img/icson/process_flow_985.png"  width="643" height="285">						</div>					</div>					<div class="mod_warranty id_way">						<div class="mod_warranty_hd"><h3>���?ʽ</h3></div>						<div class="mod_warranty_bd">							<div class="item way1"><div class="way_hd"><h4>��Ѹ��ȫ�����������ϱ���</h4></div><div class="way_bd"><p>��ֻ����뵽<span>���ҵ���Ѹ��-������/�˻�����</span>��ֱ���ύ����/�˻������뼴�ɣ����ǵĹ�����Ա����24Сʱ�����ȷ�ϣ��ڼ������ʱ����ܻ����ӳ٣��������?</p></div></div>							<div class="item way2"><div class="way_hd"><h4>��Ѹ���ۺ����绰</h4></div><div class="way_bd"><p>�ڲ�Ʒ�������ڣ���������ۺ�������Ҫ��ѯ���߰��?��ӭ������ǵĿͷ�����: </p><p><span>�Ϻ�վ��400-828-1878</span>����һ������9��00-18��00��</p><p><span>����վ��400-828-6699</span>����һ������9��00-18��00��</p><p><span>����վ��400-828-0055</span>����һ������9��00-18��00��</p></div></div>						</div>					</div>				</div>	  		</div>';
																				d
																						.data(
																								"contentLoaded",
																								1);
																				d
																						.html(f)
																			} else {
																				d
																						.data(
																								"contentLoaded",
																								1);
																				d
																						.html(h.data
																								.replace(
																										/^\s+/,
																										""))
																			}
																		} else {
																			d
																					.data(
																							"contentLoaded",
																							0);
																			d
																					.html("��ȡ���ʧ�ܣ����Ժ�����...")
																		}
																	}, "jsonp")
												}
											})
						})
	},
	loadProductGift : function(a) {
		$
				.get(
						"http://" + YouBoy3C.DOMAIN.ITEM_ICSON_COM
								+ "/json.php?mod=item&act=getgift&pid=" + a,
						function(e) {
							if (e.errno == 0) {
								var c = [];
								var d = [];
								var b = {
									gift : 0,
									com : 0
								};
								$
										.each(
												e.data,
												function(f, g) {
													g.pic = YouBoy3C.logic.constants
															.getSmallUrl(
																	g.product_char_id,
																	0);
													g.price_chn = g.price >= 99999900 ? ""
															: ('��ֵ��<span class="strong"><span class="i_yuan">&yen;</span>'
																	+ (g.price / 100)
																			.toFixed(2) + "</span>");
													if (g.type == 1) {
														if (b.com < 10) {
															g.ytag = "9001"
																	+ b.com
														}
														d.push(g);
														b.com++
													} else {
														if (b.gift < 10) {
															g.ytag = "9000"
																	+ b.gift
														}
														c.push(g);
														b.gift++
													}
												});
								if (c.length > 0) {
									YouBoy3C.ui.template.fillWithTPL(
											"good_detai_gift_list", {
												list : c
											}, "gift_tpl");
									$("#good_detai_gift").show()
								}
								if (d.length > 0) {
									YouBoy3C.ui.template.fillWithTPL(
											"good_detai_com_list", {
												list : d
											}, "com_tpl");
									$("#good_detai_com").show()
								}
							}
						}, "jsonp")
	},
	loadSameCate3 : function(a) {
		$.get("http://" + YouBoy3C.DOMAIN.ITEM_ICSON_COM
				+ "/json.php?mod=item&act=samecate3&c3id=" + a, function(d) {
			if (d.errno == 0) {
				var c = [ '<ul class="list_sort_txt">' ], b = 1;
				$.each(d.data.children, function(f, e) {
					c.push('<li><a ytag="' + (12 * 1000 + (b - 1) * 10 + 0)
							+ '" hotname="I.TEM.SAMECATE.' + b
							+ '" href="http://list.51buy.com/' + e.id
							+ '-0-5-11-20-0-1--.html" target="_blank">'
							+ e.name + "</a></li>");
					b++
				});
				c.push("</ul>");
				$("#c3id_same .bd").html(c.join(""));
				$("#c3id_same").show()
			} else {
				$("#c3id_same").hide()
			}
		}, "jsonp")
	},
	loadSamePrice : function() {
		YouBoy3C.logic.constants
				.getWhId(function(a) {
					$
							.get(
									"http://s.51buy.com/json.php?mod=commend&act=price&whid="
											+ a + "&cate3=" + itemInfo.c3ids
											+ "&price=" + itemInfo.price,
									function(c) {
										if (c.errno == 0) {
											var b = {
												list : []
											};
											$
													.each(
															c.data,
															function(f, e) {
																var d = b.list.length - 0 + 1;
																if (d <= 100) {
																	e.ytag = ' ytag="'
																			+ (11 * 1000 + (d - 1) * 10 + 0)
																			+ '"'
																}
																e.idx = d;
																		e.pic = YouBoy3C.logic.constants
																				.getPic60Url(
																						e.product_char_id,
																						0),
																		e.is_top = d <= 3 ? ' class="top"'
																				: "";
																e.name_q = e.name
																		.replace(
																				/('|")/g,
																				"\\$1");
																e.price_chn = (((e.price - 0) + (e.cash_back - 0)) / 100)
																		.toFixed(2);
																b.list.push(e)
															});
											if (b.list.length > 10) {
												b.list.length = 10
											}
											YouBoy3C.ui.template
													.fillWithTPL(
															"product_price_hottop_list",
															b);
											$("#product_price_hottop").show()
										} else {
											$("#product_price_hottop").hide()
										}
									}, "jsonp")
				})
	},
	loadWonderList : function(a) {
	},
	loadEasyMatch : function(a) {
		$
				.get(
						"http://" + YouBoy3C.DOMAIN.ITEM_ICSON_COM
								+ "/json.php?mod=item&act=easymatch&pid=" + a,
						function(e) {
							if (e.errno == 0) {
								var d = [], c = 1;
								$
										.each(
												e.data,
												function(g, f) {
													d
															.push('<li><label class="aid"><input hotname="I.ITEM.EASY_MATCH.CHECKBOX.'
																	+ c
																	+ '" name="easy_match_check" ordprice="'
																	+ f.price
																	+ '" price="'
																	+ f.discount_price
																	+ '" type="checkbox" value="'
																	+ f.product_id
																	+ '" /></label>							<a ytag="1001'
																	+ (c - 1)
																	+ '" hotname="I.ITEM.EASY_MATCH.LINK.'
																	+ c
																	+ '" href="/item-'
																	+ f.product_id
																	+ '.html" target="_blank">								<span class="img"><img src="'
																	+ YouBoy3C.logic.constants
																			.getSmallUrl(
																					f.product_char_id,
																					0)
																	+ '" alt="'
																	+ f.name
																	+ '" /></span>								<span class="link_info">									<strong class="name">'
																	+ f.name
																	+ '</strong>									<span class="price">�����ۣ�<del>&yen;'
																	+ (f.price / 100)
																			.toFixed(2)
																	+ '</del></span> <span class="price">���ۼۣ�<span class="strong">&yen;'
																	+ (f.discount_price / 100)
																			.toFixed(2)
																	+ "</span></span>								</span>							</a>						</li>");
													c++
												});
								if (d.length <= 0) {
									$("#easy_match").hide();
									return
								}
								var b = $(document.body).hasClass("more3c_1280") ? 8
										: 6;
								if (d.length > b) {
									d = d.slice(0, b)
								}
								$("#easy_match .bd ul").html(d.join(""));
								$(
										"#easy_match .bd input[name=easy_match_check]")
										.click(YouBoy3C.app.itemDetail.calcuPkgPrice);
								YouBoy3C.app.itemDetail.calcuPkgPrice();
								$("#easy_match").show()
							} else {
								$("#easy_match").hide()
							}
						}, "jsonp")
	},
	calcuPkgPrice : function() {
		$("#pkg_num").html($("#easy_match .bd input:checked").length);
		var b = $("#order_num").val();
		var c = parseFloat($("#pkg_price").attr("ordprice"), 10) * 100 * b - 0;
		var a = 0;
		$("#easy_match .bd input:checked").each(function() {
			c += $(this).attr("price") - 0;
			a += $(this).attr("ordprice") - $(this).attr("price") - 0
		});
		$("#easy_match .bd li").mouseover(function() {
			$(this).removeClass("status_aid").addClass("status_hover")
		}).mouseout(function() {
			$(this).removeClass("status_hover").addClass("status_aid")
		});
		$("#pkg_price").html("&yen;" + (c / 100).toFixed(2));
		$("#save_pkg_price").html("&yen;" + (a / 100).toFixed(2))
	},
	addToCart : function(g, d) {
		var f = YouBoy3C.app.itemDetail.checkOrderNum();
		if (f) {
			return YouBoy3C.ui.popup.showMsg(f, 2)
		}
		if (location.host == YouBoy3C.DOMAIN.ITEM_ICSON_COM
				&& /\/item-(\d)*-(\d)*/.test(location.pathname)) {
			var e = YouBoy3C.util.cookie.get("wsid"), c = location.pathname.split("-"), b = c[1];
			if (!YouBoy3C.logic.constants.allowedWhInfo[e]) {
				e = false
			}
			if (!YouBoy3C.logic.constants.allowedWhInfo[b]) {
				b = false
			}
			if (e && b && e != b) {
				var a = YouBoy3C.logic.constants.allowedWhInfo[b], h = "��Ǹ����ѡ���ĵ�ǰ��Ʒ����"
						+ a
						+ "վ���۵ģ����ڹ���ǰ���ȵ��<a href='javascript:;' onclick='YouBoy3C.app.itemDetail.switchSite("
						+ b + ");return false;'>������" + a + "վ��</a>";
				return YouBoy3C.ui.popup.showMsg(h, 1, function() {
					YouBoy3C.app.itemDetail.switchSite(b);
					return false
				}, function() {
				}, function() {
				}, "������Ѹ��-" + a + "վ", "��վ������")
			}
		}
		if (g) {
			YouBoy3C.logic.constants.goToCartWithThis(d, {
				pid : itemInfo.pid,
				pnum : $("#order_num").val()
			}, 1)
		} else {
			YouBoy3C.logic.constants.goToCartWithThis(d, {
				pid : itemInfo.pid,
				pnum : $("#order_num").val(),
				price_id : itemInfo.min_price_id
			}, 0)
		}
	},
	switchSite : function(c) {
		var b = arguments.callee;
		if (!this.xhr) {
			var a = 1.4;
			b.xhr = $.ajax({
				type : "GET",
				timeout : 30 * 1000,
				scriptCharset : "gb2312",
				url : "http://" + YouBoy3C.DOMAIN.ST_ICSON_COM
						+ "/static_v1/js/app/switchSite.js?v=" + a,
				dataType : "script",
				cache : true,
				crossDomain : true
			})
		}
		b.xhr.done(function() {
			YouBoy3C.app.switchSite.tryToSwitchTo(c, location.href)
		}).fail(function() {
			YouBoy3C.ui.popup.showMsg("��Ǹ���л���վʧ�ܣ������Ժ����ԡ�", 2)
		})
	},
	clearPkgCheck : function() {
		$("#easy_match .bd input:checked").each(function() {
			this.checked = false
		});
		this.calcuPkgPrice()
	},
	checkOrderNum : function() {
		var a = $("#order_num").val();
		var b = parseInt($("#order_num").attr("maxnumlimit"), 10);
		if (isNaN(b)) {
			b = 0
		}
		var c = "";
		if (!YouBoy3C.logic.validate.checkNumber(a) || a > 99) {
			a = parseInt(a);
			if (isNaN(a) || a <= 0) {
				a = 1
			}
			if (a > 99) {
				a = 99
			}
			$("#order_num").val(a);
			c = "�������������������������"
		} else {
			if (b > 0 && a > b) {
				c = "����������Ʒ�޹�����";
				$("#order_num").val(1)
			}
		}
		return c
	},
	setDropDown : function(c, d) {
		var b = null, a = function() {
			if (b) {
				clearTimeout(b);
				b = null
			}
			d.fadeIn(100)
		}, e = function() {
			b = setTimeout(function() {
				d.hide()
			}, 500)
		};
		c.hover(a, e);
		d.hover(a, e)
	},
	addMonitors : function() {
		var e = $("li.item_market del").html().replace(/[^0-9\.]/, ""), g = "������Ѹ��"
				+ itemInfo.name
				+ ",�г���"
				+ e
				+ "Ԫ����ѸֻҪ"
				+ (itemInfo.price / 100).toFixed(2)
				+ "Ԫ������ʲô����ҿ������ɣ� @��Ѹ�� ", a = "������Ѹ��"
				+ itemInfo.name + ",�г���" + e + "Ԫ����ѸֻҪ"
				+ (itemInfo.price / 100).toFixed(2)
				+ "Ԫ������ʲô����ҿ������ɣ� @��Ѹ����� ", d = "http://item.51buy.com/item-"
				+ itemInfo.pid + ".html?LS=tqq";
		g = encodeURIComponent(g);
		a = encodeURIComponent(a);
		d = encodeURIComponent(d);
		$("#share_tx_weibo")
				.attr(
						{
							href : "http://v.t.qq.com/share/share.php?title="
									+ g
									+ "&url="
									+ d
									+ "&appkey=0cb44fae2de1437a81b846a9d45180f4&site=http://www.51buy.com&pic="
									+ YouBoy3C.logic.constants.getMMUrl(
											itemInfo.p_char_id, 0),
							target : "_blank",
							onclick : ""
						});
		$("#share_sina_weibo")
				.attr(
						{
							href : "http://v.t.sina.com.cn/share/share.php?content="
									+ a
									+ "&title="
									+ a
									+ "&url="
									+ d
									+ "&appkey=2992571369&site=http://www.51buy.com&pic="
									+ YouBoy3C.logic.constants.getMMUrl(
											itemInfo.p_char_id, 0),
							target : "_blank",
							onclick : ""
						});
		YouBoy3C.app.itemDetail.setDropDown($("#mod_share_btn"), $("#mod_share"));
		YouBoy3C.app.itemDetail.setDropDown($("#btn_installment"),
				$("#mod_installment"));
		var c = null, h = function() {
			if (c) {
				clearTimeout(c);
				c = null
			}
			$("#mod_share").fadeIn(100)
		}, f = function() {
			c = setTimeout(function() {
				$("#mod_share").hide()
			}, 500)
		};
		$("#mod_share_btn").hover(h, f);
		$("#mod_share").hover(h, f);
		var b = null;
		$("#order_num").blur(
				function() {
					var i = YouBoy3C.app.itemDetail.checkOrderNum();
					if (i) {
						if (!b) {
							b = $(
									'<li class="li" style="display:none">'
											+ YouBoy3C.logic.constants.getTipStr(i, 1)
											+ "</li>").insertAfter(
									$(this).parent().parent());
							b.slideDown(200)
						} else {
							b.html(YouBoy3C.logic.constants.getTipStr(i, 1))
						}
					} else {
						YouBoy3C.app.itemDetail.calcuPkgPrice();
						if (b) {
							b.html(YouBoy3C.logic.constants.getTipStr("�����޸ĳɹ�", 3))
						}
					}
				})
	},
	showGiftPics : function(d, a) {
		if (!d) {
			return
		}
		if (!a) {
			a = 0
		}
		if (!this._giftPicPreview) {
			this._giftPicPreview = YouBoy3C.ui.popup.create({
				width : 700,
				title : "�鿴��ƷͼƬ",
				fullscreen : 1
			})
		}
		var c = [];
		for ( var b = 0; b < a; b++) {
			c
					.push('<li><a title="" href="#" onclick="return false" hidefocus="true"><img src="'
							+ YouBoy3C.logic.constants.getSmallUrl(d, b)
							+ '" /></a></li>')
		}
		this._giftPicPreview
				.paint(function(e) {
					$(e.content)
							.empty()
							.html(
									'<div class="wrap_gallery"><div class="big_pic"></div><div class="small_list">	<p class="txt">���Сͼ���л�ͼƬ</p>	<ul class="list_smallpic">'
											+ c.join("")
											+ '</ul>	<p class="txt">(ȫ����'
											+ a
											+ "��ͼƬ)</p></div></div>");
					$(e.content)
							.find(".list_smallpic li a")
							.each(
									function() {
										$(this)
												.click(
														function() {
															$(e.content)
																	.find(
																			".list_smallpic li")
																	.filter(
																			".status_on")
																	.removeClass(
																			"status_on");
															$(this)
																	.parent()
																	.addClass(
																			"status_on");
															$(e.content)
																	.find(
																			".big_pic")
																	.html(
																			'<img src="'
																					+ $(
																							this)
																							.find(
																									"img")
																							.attr(
																									"src")
																							.replace(
																									/\/small\//,
																									"/mpic/")
																					+ '" alt="" />')
														})
									});
					$(e.content).find(".list_smallpic li a:first").click()
				});
		setTimeout((function(e) {
			return function() {
				e.show();
				e.resize()
			}
		})(this._giftPicPreview), 100)
	},
	addToFavor : function(a) {
		if (YouBoy3C.logic.login.ifLogin(this, arguments) === false) {
			return
		}
		var b = YouBoy3C.logic.login.getLoginUid();
		YouBoy3C.util.post("http://" + YouBoy3C.DOMAIN.BASE_ICSON_COM
				+ "/json.php?mod=favor&act=add&uid=" + b, {
			pid : a
		}, function(c) {
			if (c && c.errno == 0) {
				YouBoy3C.ui.popup.showMsg("�ղسɹ���", 3)
			} else {
				if (c && c.errno == 404) {
					YouBoy3C.ui.popup.showMsg("��֮ǰ�Ѿ��ղع����Ʒ��", 3)
				} else {
					YouBoy3C.ui.popup.showMsg("�ղ�ʧ�ܣ�", 1)
				}
			}
		})
	},
	loadHistory : function() {
		YouBoy3C.app.itemDetail.visitHistory.getAll(function(c) {
			if (!c || $.isEmptyObject(c)) {
				$("#visitList").empty().html(
						'<div class="clear_jilu">��û��������κ���Ʒ��</div>')
			} else {
				var b = {
					list : []
				}, a = 0;
				$.each(c, function(d, e) {
					b.list.push({
						pid : e.pid,
						picurl : YouBoy3C.logic.constants.getPic60Url(e.p_char_id, 0),
						price : (e.price / 100).toFixed(2),
						name : e.name || "",
						time : e.time,
						ytagpic : a < 10 ? (' ytag="'
								+ (13 * 1000 + a * 10 + 0) + '"') : "",
						ytaglink : a < 10 ? (' ytag="'
								+ (13 * 1000 + a * 10 + 0) + '"') : ""
					});
					a++
				});
				b.list.sort(function(e, d) {
					return e.time < d.time ? 1 : -1
				});
				if (b.list.length > 5) {
					b.list.length = 5
				}
				YouBoy3C.ui.template.fillWithTPL("visitList", b);
				$("#visitList a[t=clearHistory]").click(function() {
					YouBoy3C.app.itemDetail.visitHistory.clear(function() {
						YouBoy3C.app.itemDetail.loadHistory()
					})
				})
			}
		})
	},
	_edmCookie : {
		_EDM_KEY : "edm",
		set : function(b, a) {
			var c = YouBoy3C.util.cookie.get(this._EDM_KEY);
			c += (c ? "," : "") + b + "_" + a;
			YouBoy3C.util.cookie.add(this._EDM_KEY, c, "/", 0, ".51buy.com")
		},
		remove : function() {
			YouBoy3C.util.cookie.del(this._EDM_KEY, ".51buy.com")
		}
	},
	init : function() {
		var b = YouBoy3C.app.itemDetail;
		$("#easy_match .info .btn_strong").click(function(h) {
			var g = [ itemInfo.pid + "|" + $("#order_num").val() + "|0" ];
			$("#easy_match .bd input:checked").each(function() {
				var i = $(this).val().split(",");
				if (i.length == 1) {
					g.push(i[0] + "|1|" + itemInfo.pid)
				}
			});
			YouBoy3C.logic.constants.goToCartWithThis(this, g.join(","))
		});
		if (itemInfo.stock.indexOf("�޻�") >= 0 || itemInfo.status != 1) {
		} else {
			b.loadEasyMatch(itemInfo.pid)
		}
		b.return_top();
		b.loadSameCate3(itemInfo.c3ids);
		b.loadSamePrice();
		b.addMonitors();
		b.loadProductGift(itemInfo.pid);
		b.initDetailTab(itemInfo.pid);
		$("#introduction .hd li a:first").click();
		setTimeout(function() {
		}, 1000);
		b.visitHistory.add(itemInfo);
		var f = false, a = false;
		var d = function(l) {
			var h = 100, g = $(window).scrollTop() + $(window).height(), i = $("div.id_satisfaction"), k = i
					.offset().top, j = $("#visitList"), m = j.offset().top;
			if (!f && (g + h >= k)) {
				f = true;
				b.review.init()
			}
			if (!a && (g + h >= m)) {
				a = true;
				b.loadHistory()
			}
			if (a && f) {
				$(window).unbind("scroll", d)
			}
		};
		$(window).bind("scroll", d);
		b.review.getReviewProperty(function() {
		});
		var c = YouBoy3C.util.parse.url(), e = c.hash.edm || c.hash.EDM
				|| c.search.edm || c.search.EDM;
		if (e) {
			YouBoy3C.app.itemDetail._edmCookie.set(e, itemInfo.pid)
		}
		b.multiplePrice()
	},
	_compareAdded : false,
	clearCompare : function() {
		YouBoy3C.app.itemDetail._compareAdded = false
	},
	addCompare : function(b) {
		if (window.goods_compare) {
			var a = Math.round((new Date()).getTime() / 1000);
			if (!this._compareAdded) {
				goods_compare.add({
					id : itemInfo.pid,
					name : itemInfo.name,
					tm : a + 1
				});
				this._compareAdded = true
			}
			b.tm = a;
			goods_compare.add(b)
		}
	},
	toNotify : function(a) {
		if (YouBoy3C.logic.login.ifLogin(this, arguments) === false) {
			return
		}
		YouBoy3C.logic.login
				.getLoginUser(
						function(e) {
							if (e === false) {
								YouBoy3C.ui.popup.showMsg("��û�е�¼");
								return
							}
							if (e && e.data && !$.trim(e.data.email)) {
								var d = '</h4><h4 class="layer_global_tit"></h4><p>����д������䣬���ǻὫ����֪ͨ����������</p><p><input type="text" class="input_long" id="enter_email"/><b class="icon icon_msg0 icon_msg0_right" id="enter_emailOK"></b><span class="strong" id="enter_emailNO"><b class="icon icon_msg0 icon_msg0_warn"></b>��������ȷ������</span></p>';
								YouBoy3C.ui.popup
										.showMsg(
												d,
												1,
												function() {
													var f = $("#enter_email")
															.val();
													if (!f
															|| !YouBoy3C.logic.validate
																	.checkEmail(f)) {
														$("#enter_emailNO")
																.css("display",
																		"");
														$("#enter_emailOK")
																.css("display",
																		"none");
														return false
													} else {
														YouBoy3C.util
																.post(
																		"http://"
																				+ YouBoy3C.DOMAIN.BASE_ICSON_COM
																				+ "/json.php?mod=mynotify&act=enterEmail",
																		{
																			email : f
																		},
																		function(
																				h) {
																			var g = '</h4><h4 class="layer_global_tit">����Ʒ������֪ͨ�����óɹ�!</h4><p>���ǻὫ������Ϣ��ʱ������������䣺</p><p>'
																					+ f
																					+ '<a class="nor btn" href="http://base.51buy.com/myprofile.html?notify" target="_blank">�޸�����</a></p>';
																			if (h
																					&& h.errno == 0) {
																				YouBoy3C.util
																						.post(
																								"http://"
																										+ YouBoy3C.DOMAIN.BASE_ICSON_COM
																										+ "/json.php?mod=mynotify&act=addMynotify",
																								{
																									pid : a,
																									email : f
																								},
																								function(
																										i) {
																									if (i
																											&& i.errno == 0) {
																										YouBoy3C.ui.popup
																												.showMsg(
																														g,
																														3,
																														function() {
																															location.href = "http://base.51buy.com/mynotify.html?pid="
																																	+ a
																														},
																														null,
																														null)
																												.paint(
																														function() {
																															$(
																																	this)
																																	.addClass(
																																			"id_goods_arrive")
																														})
																									} else {
																										YouBoy3C.ui.popup
																												.showMsg(
																														"��Ǹ,����Ʒ������֪ͨ������ʧ��!",
																														1)
																									}
																								})
																			}
																		})
													}
												}, null, null)
										.paint(
												function() {
													$(this).addClass(
															"id_goods_arrive");
													$("#enter_emailOK").css(
															"display", "none");
													$("#enter_emailNO").css(
															"display", "none");
													$("#enter_email")
															.bind(
																	"blur",
																	function() {
																		var f = $(
																				"#enter_email")
																				.val();
																		if (!f
																				|| !YouBoy3C.logic.validate
																						.checkEmail(f)) {
																			$(
																					"#enter_emailNO")
																					.css(
																							"display",
																							"");
																			$(
																					"#enter_emailOK")
																					.css(
																							"display",
																							"none");
																			return false
																		} else {
																			$(
																					"#enter_emailNO")
																					.css(
																							"display",
																							"none");
																			$(
																					"#enter_emailOK")
																					.css(
																							"display",
																							"")
																		}
																	})
												})
							} else {
								var b = '</h4><h4 class="layer_global_tit">����Ʒ������֪ͨ�����óɹ�!</h4><p>���ǻὫ������Ϣ��ʱ������������䣺</p><p>'
										+ e.data.email
										+ '<a class="nor btn" href="http://base.51buy.com/myprofile.html?notify" target="_blank">�޸�����</a></p>';
								var c = '</h4><h4 class="layer_global_tit">��֮ǰ�Ѿ����ù����ƷΪ����֪ͨ��</h4><p>���ǻὫ������Ϣ��ʱ������������䣺</p><p>'
										+ e.data.email
										+ '<a class="nor btn" href="http://base.51buy.com/myprofile.html?notify" target="_blank">�޸�����</a></p>';
								YouBoy3C.util
										.post(
												"http://"
														+ YouBoy3C.DOMAIN.BASE_ICSON_COM
														+ "/json.php?mod=mynotify&act=addMynotify",
												{
													pid : a,
													email : e.data.email
												},
												function(f) {
													if (f && f.errno == 0) {
														YouBoy3C.ui.popup
																.showMsg(b, 3)
																.paint(
																		function() {
																			$(
																					this)
																					.addClass(
																							"id_goods_arrive")
																		})
													} else {
														if (f && f.errno == 33) {
															YouBoy3C.ui.popup
																	.showMsg(c,
																			3)
																	.paint(
																			function() {
																				$(
																						this)
																						.addClass(
																								"id_goods_arrive")
																			})
														} else {
															YouBoy3C.ui.popup
																	.showMsg(
																			"��Ǹ,����Ʒ������֪ͨ������ʧ��!",
																			1)
														}
													}
												})
							}
						}, false, true)
	},
	review : {
		_num : {
			reviews : {},
			askings : {}
		},
		_c : {
			reviews : 0,
			askings : 0
		},
		_t : {
			reviews : {
				0 : [ "allreview", "ȫ������", [ "�����û��������ۡ�" ] ],
				1 : [
						"satisfiedexperience",
						"����",
						[
								"�����û���������������ۡ�",
								'ֻ�й�������Ʒ���û����ܷ����������ۡ�<a href="http://item.51buy.com/review-toaddexperience-{pid}.html" onclick="YouBoy3C.app.itemDetail.review.checkCanAddExperience();return false">��Ҫ������������>></a>' ] ],
				2 : [
						"generalexperience",
						"һ��",
						[
								"�����û���������������ۡ�",
								'ֻ�й�������Ʒ���û����ܷ����������ۡ�<a href="http://item.51buy.com/review-toaddexperience-{pid}.html" onclick="YouBoy3C.app.itemDetail.review.checkCanAddExperience();return false">��Ҫ������������>></a>' ] ],
				3 : [
						"unsatisfiedexperience",
						"������",
						[
								"�����û���������������ۡ�",
								'ֻ�й�������Ʒ���û����ܷ����������ۡ�<a href="http://item.51buy.com/review-toaddexperience-{pid}.html" onclick="YouBoy3C.app.itemDetail.review.checkCanAddExperience();return false">��Ҫ������������>></a>' ] ],
				4 : [ "discussion", "����", [ "�����û��������ۡ�" ] ]
			},
			askings : {
				0 : [ "allasking", "ȫ����ѯ", [ "���������ѯ��" ] ],
				1 : [ "asking", "��Ʒ��ѯ", [ "���������ѯ��" ] ],
				2 : [ "tranandpayasking", "����/֧��", [ "���������ѯ��" ] ],
				3 : [ "invoiceandmaintasking", "��Ʊ/����", [ "���������ѯ��" ] ]
			}
		},
		_tp : {
			1 : "����",
			2 : "һ��",
			3 : "������",
			4 : "����",
			5 : "��Ʒ��ѯ",
			6 : "����/֧��",
			7 : "��Ʊ/����"
		},
		_jhistory : {},
		_getEmptyReviewDesc : function(d) {
			var a = "", b = function(e) {
				return e.replace(/\{pid\}/g, itemInfo.pid)
			};
			if ($.type(d) == "array") {
				var c = d.shift();
				a = '<div class="tips_cont"><p><strong class="strong">' + b(c)
						+ "</strong></p>";
				$.each(d, function(e, f) {
					a += "<p>" + b(f) + "</p>"
				});
				a += "</div>";
				d.unshift(c)
			} else {
				a = '<div class="tips_cont"><p><strong class="strong">' + b(d)
						+ "</strong></p>"
			}
			return a
		},
		_getExpDesc : function(a) {
			if (a == 3) {
				return "һ��"
			}
			return a > 3 ? "����" : "������"
		},
		_parseUser : function(a) {
			a.user_level = a.user_level > 6 ? 6 : a.user_level;
			a.user_level_name = YouBoy3C.logic.constants.userLevelName[a.user_level];
			a.pic_order = (a.is_icson_reply == 1) ? "Icson"
					: (a.user_level - 0 + 1);
			a.user_name = a.is_icson_reply == 1 ? "��Ѹ��" : a.user_name
		},
		_printReviews : function(d) {
			var b = YouBoy3C.app.itemDetail.review, a = 0;
			$
					.each(
							d,
							function(h, g) {
								var i = g.type >= 1 && g.type <= 3 ? "����"
										: "����", j = (g.is_best == 1) ? '<a class="best" href="javascript:void(0);" title="����"></a>'
										: "", f = (g.is_top == 1) ? '<a class="top" href="javascript:void(0);" title="�ö�"></a>'
										: "", e = "";
								g = b._encode(g);
								g.type_chn = (g.type >= 1 && g.type <= 3) ? '<span class="comment_sort"><strong>[����]</strong></span>'
										: '<span class="comment_sort"><strong>[����]</strong>'
												+ j + f + "</span>";
								g.content = g.content.replace(/\n/g, "    ")
										.replace(/\s{4,}/g, "    ").replace(
												/ /g, "&nbsp;");
								g.create_time_chn = YouBoy3C.util.parse.timeFormat(
										g.create_time, "y-m-d h:i:s");
								g.stars = (g.type >= 1 && g.type <= 3) ? ('<span class="comment-txt"><span class="icon_star"><b style="width: '
										+ (20 * g.star)
										+ '%;"></b></span></span><span class="coment_tit"><strong>'
										+ g.star
										+ "�� "
										+ b._getExpDesc(g.star)
										+ "</strong>"
										+ j + f + "</span>")
										: "";
								b._parseUser(g);
								g.replies_all = [];
								$.each(g.replies, function(l, k) {
									k = b._encode(k);
									b._parseUser(k);
									k.content = k.content
											.replace(/\n/g, "    ").replace(
													/\s{4,}/g, "    ").replace(
													/ /g, "&nbsp;");
									k.reply_date_chn = YouBoy3C.util.parse.timeFormat(
											k.create_time, "y-m-d h:i:s");
									g.replies_all.push(k)
								});
								if (g.replies_all.length > 3) {
									g.replies_all.length = 3
								}
								if (g.replies_number <= 3) {
									g.ifkillReplyMore = ' style="display:none"'
								}
								if (g.replies_number <= 0) {
									g.attr_addition = ' style="display:none"'
								}
								d[h] = g;
								a++
							});
			if (a == 0) {
				$("#review_content .list_comment").empty().html(
						b._getEmptyReviewDesc(b._t.reviews[b._c.reviews][2]))
			} else {
				var c = $("#review_content .list_comment").empty().html(
						YouBoy3C.ui.template.fillWithTPL(false, {
							list : d
						}, "review_list_tpl"));
				$(".reply a[replylist]", c).click(b.loadReplyList);
				$(".wrap_btn a[reply]", c).click(b.toAddReviewReply);
				$(".wrap_btn a[rup]", c).click(b.setLike);
				$(".wrap_btn a[rdown]", c).click(b.setUnlike)
			}
		},
		_printReviewPage : function(c) {
			var a = YouBoy3C.app.itemDetail.review, b = Math
					.ceil(a._num.reviews[a._c.reviews] / 10);
			window.showReviewPage = a.getReviewsPage;
			if (b <= 1) {
				$("#review_page").empty().parent().hide()
			} else {
				$("#review_page").empty().html(
						YouBoy3C.ui.page("javascript:showReviewPage('{page}')", c, b,
								4)).parent().show()
			}
		},
		setLike : function() {
			var c = $(this).attr("rup"), b = $(this).attr("uid"), d = $(this)
					.attr("rtype"), a = YouBoy3C.app.itemDetail.review;
			if (a._jhistory[c] == 1) {
				YouBoy3C.ui.popup.showMsg("���Ѿ�Ͷ��Ʊ�ˡ�");
				return false
			}
			a._judgeReview(c, d, 1, $(this))
		},
		setUnlike : function() {
			var c = $(this).attr("rdown"), b = $(this).attr("uid"), d = $(this)
					.attr("rtype"), a = YouBoy3C.app.itemDetail.review;
			if (a._jhistory[c] == 1) {
				YouBoy3C.ui.popup.showMsg("���Ѿ�Ͷ��Ʊ�ˡ�");
				return false
			}
			a._judgeReview(c, d, 2, $(this))
		},
		checkCanAddExperience : function() {
			if (YouBoy3C.logic.login.ifLogin(this, arguments) === false) {
				return
			}
			var b = YouBoy3C.logic.login.getLoginUid(), a = itemInfo.pid;
			YouBoy3C.util
					.post(
							"http://"
									+ YouBoy3C.DOMAIN.ITEM_ICSON_COM
									+ "/json.php?mod=review&act=canaddexperience&fmt=1&uid="
									+ b,
							{
								pid : a
							},
							function(d) {
								if (d && d.errno != 0) {
									var c = {
										18 : "��û�й�������Ʒ���޷������������ۣ���ѡ�񷢱���Ʒ����",
										21 : "���Ѿ��Ը���Ʒ��������������ˣ�",
										23 : "������δ���⣬�޷������������ۣ�",
										24 : "��������24Сʱ֮�󷽿ɷ����������ۣ�",
										25 : "����ʱ�޷��Ը���Ʒ�����������ۣ�",
										26 : "�������Ʒ�Ѿ������˿����۵����ޣ�����Զ������֮�ڵĶ��������������۲���ȡ��֡���л�����Ѹ���һ������֧�֣�"
									};
									if ((d.errno - 0) in c) {
										return YouBoy3C.ui.popup.showMsg(c[d.errno])
									}
								}
								location.href = "http://item.51buy.com/review-toaddexperience-"
										+ a + ".html"
							})
		},
		_judgeReview : function(c, d, b, e) {
			if (YouBoy3C.logic.login.ifLogin(this, arguments) === false) {
				return
			}
			var a = YouBoy3C.logic.login.getLoginUid();
			YouBoy3C.util.post("http://" + YouBoy3C.DOMAIN.ITEM_ICSON_COM
					+ "/json.php?mod=review&act=judge&fmt=1&uid=" + a, {
				review_id : c,
				type : d,
				option : b,
				pid : itemInfo.pid
			}, function(h) {
				if (h && h.errno == 0) {
					YouBoy3C.app.itemDetail.review._jhistory[c] = 1;
					var f = /.*?\((\d+)\)\s*$/, g = e.html();
					if (f.test(g)) {
						e.html("��ͶƱ" + g.replace(f, function(i, j) {
							return "(" + (j - 0 + 1) + ")"
						}))
					}
				} else {
					return YouBoy3C.ui.popup.showMsg("�Բ��𣬲���ʧ��")
				}
			})
		},
		loadReplyList : function() {
			var a = YouBoy3C.app.itemDetail.review, b = $(this).attr("replylist"), c = $(
					this).attr("rtype");
			a._loadReplyList(b, c)
		},
		_loadReplyList : function(e, f, c) {
			var a = YouBoy3C.app.itemDetail.review, d = $("#replylist_" + f + "_" + e), b = c
					&& d.attr("open") != 1 ? "&begin=-4&quatity=4" : "";
			$.get("http://" + YouBoy3C.DOMAIN.ITEM_ICSON_COM
					+ "/json.php?mod=review&act=getreplylist&jsontype=str" + b,
					{
						review_id : e,
						type : f
					}, function(i) {
						$(".list_reply li", d).each(function() {
							if (!$(this).hasClass("reply_fabiao")) {
								$(this).remove()
							}
						});
						if (i && !i.errno) {
							var h = [], g = d.attr("total");
							$.each(i, function(j, l) {
								l = a._encode(l);
								a._parseUser(l);
								l.content = l.content.replace(/\n/g, "    ")
										.replace(/\s{4,}/g, "    ").replace(
												/ /g, "&nbsp;");
								l.reply_date_chn = YouBoy3C.util.parse.timeFormat(
										l.create_time, "y-m-d h:i:s");
								h.push(l)
							});
							if (c && d.attr("open") != 1) {
								if (h.length > 3) {
									h = h.slice(-3)
								}
								if (g > 3) {
									$(".reply_more", d).show()
								}
							} else {
								d.attr("open", 1);
								$(".reply_more", d).hide()
							}
							$(".list_reply", d).prepend(
									$(YouBoy3C.ui.template.fillWithTPL(false, {
										list : h
									}, "review_reply_list_tpl")))
						} else {
							YouBoy3C.ui.popup.showMsg("���ػظ�ʧ��")
						}
					}, "jsonp")
		},
		toChangeReviewReplyVCode : function(b) {
			var a = $(b.srcElement || b.target);
			a.prevAll("img").attr(
					"src",
					"http://item.51buy.com/json.php?jsontype=str&mod=review&act=vcode&_="
							+ Math.random());
			a.prevAll("input.verify_input").focus()
		},
		toAddReviewReply : function() {
			if (YouBoy3C.logic.login.ifLogin(this, arguments) === false) {
				return
			}
			var a = this;
			var b = arguments.callee;
			YouBoy3C.logic.login
					.getLoginUser(function(d) {
						if (d && d.data && (d.data.bindMobile == 0)) {
							var e = '</h4><h4 class="layer_global_tit">������ֻ���֤�ſ��Է���ظ���</h4><p class="todo_link"><a class="tit" href="http://base.51buy.com/myprofile.html" target="_blank">���ڽ�����֤ҳ��&gt;&gt;</a></p><br/>';
							var c = YouBoy3C.ui.popup
									.showMsg(
											e,
											1,
											function() {
												YouBoy3C.logic.login
														.getLoginUser(
																function(f) {
																	if (f
																			&& f.data
																			&& (f.data.bindMobile == 1)) {
																		c
																				.close();
																		YouBoy3C.app.itemDetail.review._toAddReviewReply
																				.apply(a)
																	} else {
																		c
																				.close();
																		setTimeout(
																				b,
																				200)
																	}
																}, false, true);
												return false
											}, null, null, "�������֤", "�ر�");
							return false
						} else {
							if (d && d.data && (d.data.exp_point) < 20) {
								return YouBoy3C.ui.popup
										.showMsg("��ľ���ֵ���㣬�޷�����ظ��������κ������������ѯ��")
							} else {
								YouBoy3C.app.itemDetail.review._toAddReviewReply
										.apply(a)
							}
						}
					})
		},
		_toAddReviewReply : function() {
			var d = YouBoy3C.logic.login.getLoginUid();
			var j = YouBoy3C.app.itemDetail.review, h = $(this).attr("reply"), g = $(
					this).attr("uid"), f = $(this).attr("rtype"), a = $("#replylist_"
					+ f + "_" + h), i = a.data("rp_target");
			if (!i) {
				var b = "http://item.51buy.com/json.php?jsontype=str&mod=review&act=vcode&_="
						+ Math.random();
				i = $('<li class="reply_fabiao"><textarea class="textarea_long" name="content"></textarea><div class="wrap_btn"><label class="todo_link wrap_verify"><span class="verify_w">��֤�룺</span><input type="text" class="verify_input" maxlength="4"/><img src="'
						+ b
						+ '" class="verify_img" /><span class="nor">�����壿</span><a href="javascript:;" onclick="YouBoy3C.app.itemDetail.review.toChangeReviewReplyVCode(event); return false;">��һ��</a></label><a href="#" onclick="return false" t="submit" class="btn_common">����</a><a href="#" onclick="return false" t="cancel">ȡ��</a><span class="info">0/500</span></div></li>');
				$(".list_reply", a).append(i);
				var e = "����������", c = YouBoy3C.ui.tips.swapInput({
					target : $("textarea[name=content]", i),
					defaultValue : e,
					focusClass : "",
					blurClass : "nor"
				}).keydown(function(k) {
					if (k.ctrlKey && (k.which == 13 || k.which == 10)) {
						$("a[t=submit]", i).click()
					}
				});
				setTimeout(function() {
					c && c.autoResize({
						extraSpace : 0,
						animate : false
					});
					c = null
				}, 1);
				YouBoy3C.logic.validate.lenMon({
					target : $("textarea[name=content]", i),
					minLen : 0,
					maxLen : 500,
					defaultValue : e,
					sucClass : "",
					failClass : "strong",
					tipCtrl : $(".info", i),
					charLenStyle : false
				}).focus();
				a.show();
				a.data("rp_target", i);
				$("a[t=cancel]", i).click({
					rid : h,
					ruid : g,
					rtype : f
				}, function(k) {
					a.data("rp_target").remove();
					a.removeData("rp_target")
				});
				$("a[t=submit]", i)
						.click(
								function() {
									if (YouBoy3C.logic.login.ifLogin(this, arguments) === false) {
										return
									}
									var k = arguments.callee, l = '</h4><h4 class="layer_global_tit">������ֻ���֤�ſ��Է���ظ���</h4><p class="todo_link"><a class="tit" href="http://base.51buy.com/myprofile.html" target="_blank">���ڽ�����֤ҳ��&gt;&gt;</a></p><br/>';
									YouBoy3C.logic.login
											.getLoginUser(
													function(s) {
														if (s
																&& s.data
																&& (s.data.bindMobile == 0)) {
															var p = YouBoy3C.ui.popup
																	.showMsg(
																			l,
																			1,
																			function() {
																				YouBoy3C.logic.login
																						.getLoginUser(
																								function(
																										o) {
																									if (o
																											&& o.data
																											&& (o.data.bindMobile == 1)) {
																										p
																												.close();
																										$(
																												"textarea[name=content]",
																												i)
																												.focus();
																										i
																												.show()
																									} else {
																										p
																												.close();
																										setTimeout(
																												k,
																												200)
																									}
																								},
																								false,
																								true);
																				return false
																			},
																			null,
																			null,
																			"�������֤",
																			"�ر�");
															return false
														} else {
															var n = YouBoy3C.logic.login
																	.getLoginUid(), m = $(
																	"input.verify_input",
																	a), q = m
																	.val(), r = $
																	.trim($(
																			"textarea[name=content]",
																			i)
																			.val());
															var t = function() {
																YouBoy3C.util
																		.post(
																				"http://"
																						+ YouBoy3C.DOMAIN.ITEM_ICSON_COM
																						+ "/json.php?mod=review&act=addreply&uid="
																						+ n,
																				{
																					review_id : h,
																					content : r,
																					ruid : g,
																					type : f,
																					codeNum : q
																				},
																				function(
																						x) {
																					if (x
																							&& x.errno == 0) {
																						var w = function() {
																							j
																									._loadReplyList(
																											h,
																											f,
																											true)
																						};
																						a
																								.attr(
																										"total",
																										a
																												.attr("total") - 0 + 1);
																						$(
																								".reply_more a",
																								a)
																								.empty()
																								.html(
																										"�鿴ȫ��"
																												+ a
																														.attr("total")
																												+ "���ظ�&gt;&gt;");
																						$(
																								"textarea[name=content]",
																								i)
																								.val(
																										"")
																								.keyup()
																								.focus();
																						$(
																								"label.wrap_verify input.verify_input",
																								i)
																								.val(
																										"");
																						$(
																								"label.wrap_verify a",
																								i)
																								.click();
																						w()
																					} else {
																						var v = {
																							777 : "���������ݿ��ܰ�������Ϣ�����ǻᾡ����ˣ�������Ա���ͨ������۽���ʾ��ҳ���С�",
																							600 : "��ķ���Ƶ�ʹ�죬���Ժ��ٷ���",
																							602 : "��ľ���ֵ���㣬�޷��������ۣ������κ������������ѯ��",
																							600 : "��ķ���Ƶ�ʹ�죬���Ժ��ٷ���",
																							776 : "����ظ��������к��в�ǡ������Ϣ��������������ٷ��?"
																						};
																						if (x
																								&& (x.errno - 0) in v) {
																							return YouBoy3C.ui.popup
																									.showMsg(v[x.errno])
																						} else {
																							if (x
																									&& (x.errno == 16 || x.errno == 17)) {
																								$(
																										"img.verify_img",
																										a)
																										.attr(
																												"src",
																												"http://item.51buy.com/json.php?jsontype=str&mod=review&act=vcode&_="
																														+ Math
																																.random());
																								YouBoy3C.ui.popup
																										.showMsg([ "��������ȷ����֤��." ])
																							} else {
																								if (x
																										&& x.errno == 15) {
																									var u = YouBoy3C.ui.popup
																											.showMsg(
																													l,
																													1,
																													function() {
																														YouBoy3C.logic.login
																																.getLoginUser(
																																		function(
																																				o) {
																																			if (o
																																					&& o.data
																																					&& (o.data.bindMobile == 1)) {
																																				u
																																						.close();
																																				$(
																																						"textarea[name=content]",
																																						i)
																																						.focus();
																																				i
																																						.show()
																																			} else {
																																				u
																																						.close();
																																				setTimeout(
																																						k,
																																						200)
																																			}
																																		},
																																		false,
																																		true);
																														return false
																													},
																													null,
																													null,
																													"�������֤",
																													"�ر�");
																									return false
																								} else {
																									YouBoy3C.ui.popup
																											.showMsg([ "����ظ�ʧ�ܣ�" ])
																								}
																							}
																						}
																					}
																				})
															};
															if (r == "����������") {
																r = ""
															}
															if (r.length <= 0) {
																YouBoy3C.ui.popup
																		.showMsg("���ݲ���Ϊ�գ�");
																return
															}
															if (q == ""
																	|| q.length != 4) {
																YouBoy3C.ui.popup
																		.showMsg("��������ȷ����֤��.");
																return
															}
															if (r.length > 500) {
																r = r.substr(0,
																		500);
																YouBoy3C.ui.popup
																		.showMsg(
																				"��ǰ��������ƣ��������ֽ����ضϣ�",
																				4,
																				t,
																				$.noop,
																				$.noop,
																				"ȷ��",
																				"ȡ��")
															} else {
																t()
															}
														}
													}, false, false);
									return false
								})
			}
			$("textarea[name=content]", i).focus();
			i.show()
		},
		getReviewsPage : function(b) {
			var a = YouBoy3C.app.itemDetail.review;
			try {
				$("#review_box")[0].scrollIntoView(true)
			} catch (c) {
			}
			a.getReviews(a._c.reviews, b)
		},
		getReviews : function(b, c) {
			var a = YouBoy3C.app.itemDetail.review;
			if (!(b in a._t.reviews)) {
				b = 0
			}
			if (!c || c < 1) {
				c = 1
			}
			$("#review_content .list_comment").empty().html(
					'<span class="loading_58_58">���ڼ�����</span>');
			$("#review_page").empty().parent().hide();
			$.get("http://" + YouBoy3C.DOMAIN.ITEM_ICSON_COM
					+ "/json.php?mod=review&act=getreviews&jsontype=str&pid="
					+ itemInfo.pid + "&type=" + a._t.reviews[b][0] + "&page="
					+ c, function(d) {
				if (d && !d.errno && !d.errCode) {
					a._c.reviews = b;
					a._printReviews(d);
					a._printReviewPage(c)
				} else {
					$("#review_content .list_comment").empty().html(
							a._getEmptyReviewDesc("������������ʧ��"))
				}
			}, "jsonp")
		},
		_updateReviewStatus : function(b) {
			var a = YouBoy3C.app.itemDetail.review;
			b = b || {};
			$.extend(a._num.reviews, {
				0 : b.total || 0,
				1 : b.satisfied || 0,
				2 : b.general || 0,
				3 : b.unsatisfied || 0,
				4 : b.discussion || 0
			});
			$.each(a._num.reviews, function(d, c) {
				$("#review_header li[t=" + d + "] a").html(
						a._t.reviews[d][1] + "(" + c + ")")
			})
		},
		getReviewProperty : function(b) {
			var a = YouBoy3C.app.itemDetail.review;
			$
					.get(
							"http://"
									+ YouBoy3C.DOMAIN.ITEM_ICSON_COM
									+ "/json.php?mod=review&act=getproperty&jsontype=str&pid="
									+ itemInfo.pid,
							function(g) {
								a._updateReviewStatus(g);
								var e = g.experience_number > 0 ? ((g.satisfaction || 0) / g.experience_number)
										.toFixed(1)
										: "";
								if (g.experience_number <= 0 || g.errno
										|| g.errCode) {
									$("#review_brief")
											.empty()
											.html(
													a
															._getEmptyReviewDesc([
																	"�����û�����,ֻ�й�������Ʒ���û��ſ��Խ������֡�",
																	'<a class="btn_strong" href="http://item.51buy.com/review-toaddexperience-{pid}.html" onclick="YouBoy3C.app.itemDetail.review.checkCanAddExperience();return false">������������</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="hot">���������������ͻ��(1���=0.1Ԫ)����Ϊ�������۸��ж����ֽ���</span>' ]))
								} else {
									var d = [];
									var c = "";
									$.each(g.top_users, function(h, i) {
										i.name = c + (i.name);
										d.push(a._encode(i));
										c = ", "
									});
									YouBoy3C.ui.template
											.fillWithTPL(
													"review_brief",
													{
														experience_number : g.experience_number,
														pingfen : e,
														pingfen_rate : (e * 20 - 1),
														rate : Math
																.round((g.satisfied || 0)
																		* 100
																		/ g.experience_number),
														top_users : d,
														pid : itemInfo.pid
													});
									$("#product_pingfen")
											.html(
													'Ѹ��������<span class="icon_star"><b style="width: '
															+ (e * 20 - 1)
															+ '%;"></b></span>(<a ytag="67001" hotname="I.ITEM.REVIEWCOUNT" href="#review_box">��'
															+ g.total
															+ "������</a>)")
											.show();
									var f = $("#review_brief .satisfaction")
											.width()
											* e
											* 20
											/ 100
											- 35
											- ($(
													"#review_brief .satisfaction .point")
													.width() / 2);
									$("#review_brief .satisfaction .point")
											.css("left", f + "px")
								}
								b()
							}, "jsonp")
		},
		_printAskings : function(d) {
			var b = YouBoy3C.app.itemDetail.review, a = 0;
			$
					.each(
							d,
							function(g, f) {
								f = b._encode(f);
								f.type_chn = b._tp[f.type] ? ('<span class="comment_sort"><strong>['
										+ b._tp[f.type] + "]</strong></span>")
										: "";
								f.content = f.content.replace(/\n/g, "    ")
										.replace(/\s{4,}/g, "    ").replace(
												/ /g, "&nbsp;");
								f.create_time_chn = YouBoy3C.util.parse.timeFormat(
										f.create_time, "y-m-d h:i:s");
								f.user_level = f.user_level > 6 ? 6
										: f.user_level;
								f.user_level_name = YouBoy3C.logic.constants.userLevelName[f.user_level];
								f.pic_order = f.user_level - 0 + 1;
								f.replies_all = [];
								$.each(f.replies, function(i, h) {
									h = b._encode(h);
									b._parseUser(h);
									h.content = h.content
											.replace(/\n/g, "    ").replace(
													/\s{4,}/g, "    ").replace(
													/ /g, "&nbsp;");
									h.reply_date_chn = YouBoy3C.util.parse.timeFormat(
											h.create_time, "y-m-d h:i:s");
									f.replies_all.push(h)
								});
								if (f.replies_all.length > 3) {
									f.replies_all.length = 3
								}
								var e = "";
								if (f.replies_number <= 3) {
									f.ifkillReplyMore = ' style="display:none"'
								}
								if (f.replies_number <= 0) {
									f.attr_addition = ' style="display:none"'
								}
								d[g] = f;
								a++
							});
			if (a == 0) {
				$("#asking_content .list_comment").empty().html(
						b._getEmptyReviewDesc(b._t.askings[b._c.askings][2]))
			} else {
				var c = $("#asking_content .list_comment").empty().html(
						YouBoy3C.ui.template.fillWithTPL(false, {
							list : d
						}, "asking_list_tpl"))
			}
		},
		_printAskingPage : function(c) {
			var a = YouBoy3C.app.itemDetail.review, b = Math
					.ceil(a._num.askings[a._c.askings] / 10);
			window.showAskingPage = a.getAskingsPage;
			if (b <= 1) {
				$("#asking_page").empty().parent().hide()
			} else {
				$("#asking_page").empty().html(
						YouBoy3C.ui.page("javascript:showAskingPage('{page}')", c, b,
								4)).parent().show()
			}
		},
		getAskingsPage : function(b) {
			var a = YouBoy3C.app.itemDetail.review;
			a.getAskings(a._c.askings, b)
		},
		getAskings : function(b, c) {
			var a = YouBoy3C.app.itemDetail.review;
			if (!(b in a._t.askings)) {
				b = 0
			}
			if (!c || c < 1) {
				c = 1
			}
			$("#asking_content .list_comment").empty().html(
					'<span class="loading_58_58">���ڼ�����</span>');
			$("#asking_page").empty().parent().hide();
			$.get("http://" + YouBoy3C.DOMAIN.ITEM_ICSON_COM
					+ "/json.php?mod=review&act=getaskings&jsontype=str&pid="
					+ itemInfo.pid + "&type=" + a._t.askings[b][0] + "&page="
					+ c, function(d) {
				if (d && !d.errno && !d.errCode) {
					a._c.askings = b;
					a._printAskings(d);
					a._printAskingPage(c);
					if (location.hash.indexOf("#asking_box") == 0
							&& !a.__located) {
						setTimeout(function() {
							$("#asking_box")[0].scrollIntoView(true)
						}, 1);
						a.__located = true
					}
				} else {
					$("#asking_content .list_comment").empty().html(
							a._getEmptyReviewDesc("������ѯ����ʧ��"))
				}
			}, "jsonp")
		},
		getAskingCount : function(b) {
			var a = YouBoy3C.app.itemDetail.review;
			$
					.get(
							"http://"
									+ YouBoy3C.DOMAIN.ITEM_ICSON_COM
									+ "/json.php?mod=review&act=getaskingcount&jsontype=str&pid="
									+ itemInfo.pid, function(d) {
								var c = d || {};
								$.extend(a._num.askings, {
									0 : c.total || 0,
									1 : c.asking || 0,
									2 : c.transport || 0,
									3 : c.invoice || 0
								});
								$.each(a._num.askings, function(f, e) {
									$("#asking_header li[t=" + f + "] a").html(
											a._t.askings[f][1] + "(" + e + ")")
								});
								b()
							}, "jsonp")
		},
		loadVoteInfo : function() {
			var a = YouBoy3C.app.itemDetail.review;
			$
					.get(
							"http://" + YouBoy3C.DOMAIN.ITEM_ICSON_COM
									+ "/json.php?mod=review&act=getvotes&pid="
									+ itemInfo.pid,
							function(f) {
								if (f && f.errno == 0 && !f.errCode) {
									var d = {};
									$.each(f.data, function(g, h) {
										if (!d[h.group_id]) {
											d[h.group_id] = {
												gid : h.group_id,
												name : h.option_name1,
												order : h.order,
												list : {}
											}
										}
										d[h.group_id].list[h.option_id] = {
											name : h.option_name2,
											score : h.score
										}
									});
									var e = [];
									$.each(d, function(h, g) {
										e.push(g)
									});
									e.sort(function(h, g) {
										return g.order - h.order
									});
									var c = [], b = true;
									$
											.each(
													e,
													function(h, g) {
														var j = [], i = 0;
														$
																.each(
																		g.list,
																		function(
																				l,
																				k) {
																			if (k.name == "һ��") {
																				return
																			}
																			i += k.score - 0
																		});
														if (b && i > 0) {
															b = false
														}
														$
																.each(
																		g.list,
																		function(
																				m,
																				l) {
																			var k = 0;
																			if (i != 0) {
																				k = Math
																						.round(l.score
																								* 100
																								/ i)
																			}
																			if (l.name == "����") {
																				j[0] = '<span class="good" style="height: '
																						+ (k || 1)
																						+ '%;"><span class="v">'
																						+ k
																						+ "%</span></span>"
																			} else {
																				if (l.name == "������") {
																					j[1] = '<span class="bad" style="height: '
																							+ (k || 1)
																							+ '%;"><span class="v">'
																							+ k
																							+ "%</span></span>"
																				}
																			}
																		});
														c
																.push('<li><div class="score">'
																		+ j
																				.join("")
																		+ "</div><p>"
																		+ g.name
																		+ "</p></li>")
													});
									if (!b) {
										$("#performance_list").empty().html(
												c.join(""));
										$("#performance_box").show()
									}
								}
							}, "jsonp")
		},
		init : function() {
			var b = YouBoy3C.app.itemDetail.review, a = $("#review_header li").each(
					function(c, d) {
						$(d).click(
								function() {
									$("#review_header li").removeClass(
											"status_on");
									b.getReviews($(this).addClass("status_on")
											.attr("t"), 1)
								})
					});
			b.getReviewProperty(function() {
				a.first().click()
			});
			$("#asking_header li").each(function(c, d) {
				$(d).click(function() {
					$("#asking_header li").removeClass("status_on");
					b.getAskings($(this).addClass("status_on").attr("t"), 1)
				})
			});
			b.getAskingCount(function() {
				$("#asking_box").show();
				$("#asking_header li:first").click()
			});
			$("#post_review")
					.attr(
							"href",
							"http://item.51buy.com/review-toadddiscussion-"
									+ itemInfo.pid + ".html")
					.click(
							function() {
								if (YouBoy3C.logic.login.ifLogin(this, arguments) === false) {
									return false
								}
								var c = arguments.callee, d = '</h4><h4 class="layer_global_tit">�����ͨ���ֻ���֤�ſ��Է������ۣ�</h4><p class="todo_link"><a class="tit" href="http://base.51buy.com/myprofile.html" target="_blank">���ڽ�����֤ҳ��&gt;&gt;</a></p><br/>';
								YouBoy3C.logic.login
										.getLoginUser(
												function(f) {
													if (f
															&& f.data
															&& (f.data.bindMobile) == 0) {
														var e = YouBoy3C.ui.popup
																.showMsg(
																		d,
																		1,
																		function() {
																			YouBoy3C.logic.login
																					.getLoginUser(
																							function(
																									g) {
																								if (g
																										&& g.data
																										&& g.data.bindMobile == 1) {
																									location.href = "http://item.51buy.com/review-toadddiscussion-"
																											+ itemInfo.pid
																											+ ".html"
																								} else {
																									e
																											.close();
																									setTimeout(
																											c,
																											200)
																								}
																							},
																							false,
																							true);
																			return false
																		},
																		null,
																		null,
																		"�������֤",
																		"�ر�");
														return false
													} else {
														if (f
																&& f.data
																&& (f.data.exp_point) < 20) {
															return YouBoy3C.ui.popup
																	.showMsg("��ľ���ֵ���㣬�޷��������ۣ������κ������������ѯ��")
														} else {
															$
																	.get(
																			"http://"
																					+ YouBoy3C.DOMAIN.ITEM_ICSON_COM
																					+ "/json.php?mod=review&act=canadddiscussion",
																			function(
																					h) {
																				if (h
																						&& h.errno == 600) {
																					return YouBoy3C.ui.popup
																							.showMsg("��ķ���Ƶ�ʹ�죬���Ժ��ٷ���")
																				}
																				if (h
																						&& h.errno == 601) {
																					return YouBoy3C.ui.popup
																							.showMsg("ϵͳ��æ�����Ժ����ԣ�")
																				}
																				if (h
																						&& h.errno == 602) {
																					return YouBoy3C.ui.popup
																							.showMsg("��ľ���ֵ���㣬�޷��������ۣ������κ������������ѯ��")
																				}
																				if (h
																						&& h.errno == 15) {
																					var g = YouBoy3C.ui.popup
																							.showMsg(
																									d,
																									1,
																									function() {
																										YouBoy3C.logic.login
																												.getLoginUser(
																														function(
																																i) {
																															if (i
																																	&& i.data
																																	&& i.data.bindMobile == 1) {
																																location.href = "http://item.51buy.com/review-toadddiscussion-"
																																		+ itemInfo.pid
																																		+ ".html"
																															} else {
																																g
																																		.close();
																																setTimeout(
																																		c,
																																		200)
																															}
																														},
																														false,
																														true);
																										return false
																									},
																									null,
																									null,
																									"�������֤",
																									"�ر�");
																					return false
																				}
																				location.href = "http://item.51buy.com/review-toadddiscussion-"
																						+ itemInfo.pid
																						+ ".html"
																			},
																			"jsonp")
														}
													}
												}, false, false);
								return false
							});
			$("#post_asking").attr(
					"href",
					"http://item.51buy.com/review-toaddasking-" + itemInfo.pid
							+ ".html");
			$("#post_asking")
					.click(
							function() {
								var c = arguments.callee;
								var d = '</h4><h4 class="layer_global_tit">������ֻ���֤�ſ��Է�����ѯ��</h4><p class="todo_link"><a class="tit" href="http://base.51buy.com/myprofile.html" target="_blank">���ڽ�����֤ҳ��&gt;&gt;</a></p><br/>';
								if (YouBoy3C.logic.login.ifLogin(this, arguments) === false) {
									return false
								}
								YouBoy3C.logic.login
										.getLoginUser(
												function(f) {
													if (f
															&& f.data
															&& (f.data.bindMobile == 0)) {
														var e = YouBoy3C.ui.popup
																.showMsg(
																		d,
																		1,
																		function() {
																			YouBoy3C.logic.login
																					.getLoginUser(
																							function(
																									g) {
																								if (g
																										&& g.data
																										&& (g.data.bindMobile == 1)) {
																									location.href = "http://item.51buy.com/review-toaddasking-"
																											+ itemInfo.pid
																											+ ".html"
																								} else {
																									e
																											.close();
																									setTimeout(
																											c,
																											200)
																								}
																							},
																							false,
																							true);
																			return false
																		},
																		null,
																		null,
																		"�������֤",
																		"�ر�");
														return false
													} else {
														$
																.get(
																		"http://"
																				+ YouBoy3C.DOMAIN.ITEM_ICSON_COM
																				+ "/json.php?mod=review&act=canaddasking",
																		function(
																				h) {
																			if (h
																					&& h.errno == 600) {
																				return YouBoy3C.ui.popup
																						.showMsg("��ķ���Ƶ�ʹ�죬���Ժ��ٷ���")
																			}
																			if (h
																					&& h.errno == 601) {
																				return YouBoy3C.ui.popup
																						.showMsg("ϵͳ��æ�����Ժ����ԣ�")
																			}
																			if (h
																					&& h.errno == 15) {
																				var g = YouBoy3C.ui.popup
																						.showMsg(
																								d,
																								1,
																								function() {
																									YouBoy3C.logic.login
																											.getLoginUser(
																													function(
																															i) {
																														if (i
																																&& i.data
																																&& (i.data.bindMobile == 1)) {
																															location.href = "http://item.51buy.com/review-toaddasking-"
																																	+ itemInfo.pid
																																	+ ".html"
																														} else {
																															g
																																	.close();
																															setTimeout(
																																	c,
																																	200)
																														}
																													},
																													false,
																													true);
																									return false
																								},
																								null,
																								null,
																								"�������֤",
																								"�ر�");
																				return false
																			}
																			location.href = "http://item.51buy.com/review-toaddasking-"
																					+ itemInfo.pid
																					+ ".html"
																		},
																		"jsonp")
													}
												}, false, false);
								return false
							});
			b.loadVoteInfo();
			YouBoy3C.logic.header.initTopAdvertise();
			YouBoy3C.app.itemDetail.group.init()
		},
		_encode : function(a) {
			var b = {};
			$.each(a, function(d, c) {
				b[d] = typeof c == "string" ? YouBoy3C.util.parse.encodeHtml(c) : c
			});
			return b
		}
	},
	visitHistory : {
		CACHE_KEY : "visithistory",
		_getCurrentHistory : function(a) {
			var b = a.getItem(YouBoy3C.app.itemDetail.visitHistory.CACHE_KEY) || [], c = {};
			$.each(b, function(d, e) {
				if (e.length < 3) {
					return
				}
				c[e[0]] = {
					pid : e[0],
					p_char_id : e[1],
					price : e[2],
					time : e[3] || 0,
					name : e[4] || ""
				}
			});
			return c
		},
		_setCurrentHistory : function(c, e) {
			var g = [];
			if (e) {
				$.each(e, function(h, i) {
					g.push([ i.pid, i.p_char_id, i.price, i.time, i.name ])
				});
				g.sort(function(i, h) {
					return i[3] < h[3] ? 1 : -1
				})
			}
			g = g.slice(0, 10);
			var f = "", b = "";
			for ( var d = 0, a = g.length; d < a && d < 6; d++) {
				f += (b + g[d][0]);
				b = ","
			}
			YouBoy3C.util.cookie.add("visited_pids", f, "/", 3600 * 24 * 365,
					"51buy.com");
			c.setItem(YouBoy3C.app.itemDetail.visitHistory.CACHE_KEY, g)
		},
		add : function(a, c) {
			var b = YouBoy3C.app.itemDetail.visitHistory;
			if (!a.pid) {
				return
			}
			YouBoy3C.util.localShare(function(d) {
				var e = b._getCurrentHistory(d);
				e[a.pid] = {
					pid : a.pid,
					p_char_id : a.p_char_id,
					price : a.price,
					name : a.name,
					time : Math.round((new Date()).getTime() / 1000)
				};
				b._setCurrentHistory(d, e);
				if ($.isFunction(c)) {
					c(e, d)
				}
			})
		},
		remove : function(b, c) {
			var a = YouBoy3C.app.itemDetail.visitHistory;
			a.getAll(function(e, d) {
				if (e[b]) {
					delete e[b];
					a._setCurrentHistory(d, e)
				}
				if ($.isFunction(c)) {
					c(e, d)
				}
			})
		},
		clear : function(b) {
			var a = YouBoy3C.app.itemDetail.visitHistory;
			YouBoy3C.util.localShare(function(c) {
				a._setCurrentHistory(c, null);
				if ($.isFunction(b)) {
					b(null, c)
				}
			})
		},
		getAll : function(b) {
			var a = YouBoy3C.app.itemDetail.visitHistory;
			YouBoy3C.util.localShare(function(c) {
				var d = a._getCurrentHistory(c);
				if ($.isFunction(b)) {
					b(d, c)
				}
			})
		}
	},
	group : {
		clock : function(c, a, e) {
			var b = this, c = new Date(parseInt(c, 10) * 1000), g = new Date()
					.getTime()
					- c, a = new Date(parseInt(a, 10) * 1000), d = $("#php_group_clock");
			function f() {
				var n = {}, j = new Date().getTime() - g, h = parseInt(a - j,
						10);
				if (h <= 0) {
					clearInterval(b.qianggouTimer);
					$.isFunction(e) && e.call(b);
					return
				}
				var l = [ "mill", "second", "minute", "hour" ];
				for ( var k in l) {
					var q = (k == 0 ? 1000 : (k == 3 ? 24 : 60));
					n[l[k]] = h % q;
					h = parseInt(h / q, 10)
				}
				l[4] = "day";
				n[l[4]] = h;
				var p = "", o = [ "����", "��", "��", "ʱ", "��" ];
				for ( var m = l.length, k = m - 1; k > 0; k--) {
					var r = l[k];
					if (k === (m - 1) && !n[r]) {
						continue
					}
					if (k !== (m - 1)) {
						n[r] = n[r] < 10 ? ("0" + n[r].toString()) : n[r];
						if (k === 1) {
							n[r] += "." + (parseInt(n.mill / 100, 10))
						}
					}
					p += '<span class="strong">' + n[r] + "</span>" + o[k]
				}
				p = '<span class="t">ʣ��ʱ�䣺</span>' + p;
				d[0].innerHTML = p
			}
			b.qianggouTimer = setInterval(f, 50)
		},
		init : function() {
			var b = $("#php_group_clock");
			if (b.length > 0) {
				function a() {
					b.html('<span class="t">ʣ��ʱ�䣺</span>�ѽ���')
				}
				this.clock(b.attr("now"), b.attr("end"), a)
			}
		}
	},
	multiplePrice : function() {
		var e = YouBoy3C.app.itemDetail, c = e.multiplePrice, a = $("#goods_detail_mate"), d = a
				.find("span.surplus_time"), b = a.find("li.priceful");
		if (b.length > 0) {
			$("#VipMultiplePriceLabel").bind("mouseover", function() {
				$(this.parentNode).find("div.layout_popup").show()
			}).bind("mouseout", function() {
				$(this.parentNode).find("div.layout_popup").hide()
			})
		}
		if (d.length > 0) {
			if (!$.isFunction(c.qianggou)) {
				c.qianggou = function(g, i) {
					var f = g.parentNode, j = $(g), h = new Date().getTime();
					i *= 1000;
					f.timeLimitTimer = setInterval(
							function() {
								h += 1000;
								var n = parseInt((i - h) / 1000), m = 0, l = [], k = Math
										.floor(n / 86400);
								n -= (k * 86400);
								while (m < 3) {
									l[m++] = (n % 60).toString().replace(
											/^(\d)$/, "0$1");
									n = parseInt((n - n % 60) / 60)
								}
								if (l[0] === "00" && l[1] === "00"
										&& l[2] === "00") {
									j.html("");
									clearInterval(f.timeLimitTimer)
								} else {
									j.html("ʣ�ࣺ" + (0 == k ? "" : (k + "��"))
											+ l[2] + "Сʱ" + l[1] + "��" + l[0]
											+ "��")
								}
							}, 1000)
				}
			}
			d.each(function() {
				var f = YouBoy3C.app.itemDetail.multiplePrice;
				if (parseInt($(this).attr("time_stamp")) > 0) {
					f.qianggou(this, $(this).attr("time_stamp"))
				}
			})
		}
	},
	return_top : function() {
		var a = ($.browser.msie && ($.browser.version == "6.0") && !$.support.style);
		$(window).bind(
				"scroll resize",
				function() {
					var c = $("#backtop"), f = $("body").attr("class"), e = $(
							window).width(), d = $(window).height(), g = $(
							document).height(), b, h;
					if ($(window).scrollTop() > d) {
						c.show();
						if (f && e >= 1300) {
							b = (e - 1225) / 2 - 25;
							c.css({
								right : b
							});
							if (a) {
								h = d - 167 + $(window).scrollTop();
								c.css({
									top : h
								})
							}
						} else {
							if (!f && e >= 1035) {
								b = (e - 985) / 2 - 25;
								c.css({
									right : b
								});
								if (a) {
									h = d - 167 + $(window).scrollTop();
									c.css({
										top : h
									})
								}
							} else {
								c.hide()
							}
						}
					} else {
						c.hide()
					}
				})
	}
};
(function(a) {
	a.fn.autoResize = function(b) {
		var c = a.extend({
			onResize : function() {
			},
			animate : true,
			animateDuration : 150,
			animateCallback : function() {
			},
			extraSpace : 20,
			limit : 1000
		}, b);
		this
				.filter("textarea")
				.each(
						function() {
							var e = a(this).css({
								resize : "none",
								"overflow-y" : "hidden"
							}), g = e.height(), h = (function() {
								var i = [ "height", "width", "lineHeight",
										"textDecoration", "letterSpacing" ], j = {};
								a.each(i, function(k, l) {
									j[l] = e.css(l)
								});
								return e.clone().removeAttr("id").removeAttr(
										"name").css({
									position : "absolute",
									top : 0,
									left : -9999
								}).css(j).attr("tabIndex", "-1")
										.insertBefore(e)
							})(), f = null, d = function() {
								h.height(0).val(a(this).val()).scrollTop(10000);
								var j = Math.max(h.scrollTop(), g)
										+ c.extraSpace, i = a(this).add(h);
								if (f === j) {
									return
								}
								f = j;
								if (j >= c.limit) {
									a(this).css("overflow-y", "");
									return
								}
								c.onResize.call(this);
								c.animate && e.css("display") === "block" ? i
										.stop()
										.animate({
											height : j
										}, c.animateDuration, c.animateCallback)
										: i.height(j)
							};
							e.unbind(".dynSiz").bind("keyup.dynSiz", d).bind(
									"keydown.dynSiz", d).bind("change.dynSiz",
									d)
						});
		return this
	}
})(jQuery);
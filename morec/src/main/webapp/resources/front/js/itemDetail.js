YouBoy3C.app.itemDetail = {
	method : 0,
	initPicPre : function(c) {
		var e = c || {};
		if (e.pic_num <= 0) {
			return
		}
		e.pic_num = e.pic_num || 1;
		var h = [];
		for ( var g = 0; g < e.pic_num; g++) {
			h.push('<li><a title="" href="#" onclick="return false" hidefocus="true"><img psrc="" src=""></a></li>')
		}
		var o = 68;
		//$("#list_smallpic ul").html(h.join("")).width(o * e.pic_num);
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
												$("#list_smallpic li").filter(".status_on").removeClass("status_on");
												$(this).addClass("status_on");
												var q = $(this).find("img").attr("char_id"), p = $(this).attr("idx");
												//$("#smallImage").attr("char_id", q);
												$("#smallImage").attr("idx", p);
												$("#smallImage").attr("src",$(this).find("img").attr("src")+"_300x300.jpg");
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
											'<img src="getBigUrl($("#smallImage").attr("char_id"),$("#smallImage").attr("idx"))'
													+'" onload="'
													+ "$('#zoomPic').css({width:(this.width*"
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
			h.push('<li><a title="" href="#" onclick="return false" hidefocus="true"><img src="" /></a></li>')
		}
		var j = null;
		$(".zoom_mouse")
				.click(
						function() {
							if (!j) {
								j = YouBoy3C.ui.popup.create({
									width : 700,
									title : "",
									fullscreen : 1
								});
								j
										.paint(function(i) {
											$(i.content)
													.html(
															'<div class="wrap_gallery"><div class="big_pic"></div><div class="small_list"><p class="txt">点击小图来切换图片</p>		<ul class="list_smallpic">'
																	+ h.join("")
																	+ '</ul><p class="txt">(全部共 '+ e.pic_num + '张图片)</p><div class="wrap_btn"><a href="#" class="btn_strong" onclick="YouBoy3C.app.itemDetail.addToCart(false, this);return false">加入购物车</a></div></div></div>');
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
	initDetailTab : function() {
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
														.removeClass("status_on");
												$("#introduction .hd li")
														.filter("#t_"+ $(this).attr("n"))
														.addClass("status_on");
												$("#introduction .bd")
														.children().filter(":visible")
														.hide();
												var d = $("#c_"+ $(this).attr("n"));
												if (b == "warranty") {
													$("#intro-main_tab")
															.addClass("id_warranty_wrap")
												} else {
													$("#intro-main_tab")
															.removeClass("id_warranty_wrap")
												}
												d.show();
											})
						})
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
		var e = $("li.item_market del").html().replace(/[^0-9\.]/, ""), 
			g = "我在3C数码导购网看到"+ itemInfo.name+ ",市场价"+ e+ "元，天猫淘宝只要"+ (itemInfo.price / 100).toFixed(2)+ "元，还等什么，大家快来抢吧！ @3C数码导购网", a = "我在3C数码导购网看到" + itemInfo.name + ",市场价" + e + "元，天猫淘宝只要"+ (itemInfo.price / 100).toFixed(2)+ "元，还等什么，大家快来抢吧！ @3C数码导购网 ",
			d = "http://www.moreccc.com/"+ itemInfo.pid + ".html?LS=tqq",
			item_pic_url=itemInfo.pic_url;
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
									+ "&appkey=0cb44fae2de1437a81b846a9d45180f4&site=http://www.moreccc.com/&pic="
									+ item_pic_url,
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
									+ "&appkey=2992571369&site=http://www.moreccc.com/&pic="
									+ item_pic_url,
							target : "_blank",
							onclick : ""
						});
		YouBoy3C.app.itemDetail.setDropDown($("#mod_share_btn"), $("#mod_share"));
		YouBoy3C.app.itemDetail.setDropDown($("#btn_installment"),$("#mod_installment"));
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
	},
	addToFavor : function(url,title) {
		try {
			window.external.addFavorite(url, title);
		} catch (e){
			try {
				window.sidebar.addPanel(title, url, '');
	        	} catch (e) {
				showDialog("请按 Ctrl+D 键添加到收藏夹", 'notice');
			}
		}
	},
	loadHistory : function() {
		YouBoy3C.app.itemDetail.visitHistory.getAll(function(c) {
			if (!c || $.isEmptyObject(c)) {
				$("#visitList").empty().html('<div class="clear_jilu">您还没有浏览过任何商品。</div>');
			} else {
				var b = { list : [] }, a = 0;
				$.each(c, function(d, e) {
					b.list.push({
						pid : e.pid,
						picurl : "",
						price : (e.price / 100).toFixed(2),
						name : e.name || "",
						time : e.time,
						ytagpic : a < 10 ? (' ytag="'+ (13 * 1000 + a * 10 + 0) + '"') : "",
						ytaglink : a < 10 ? (' ytag="'+ (13 * 1000 + a * 10 + 0) + '"') : ""
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
			YouBoy3C.util.cookie.add(this._EDM_KEY, c, "/", 0, "")
		},
		remove : function() {
			YouBoy3C.util.cookie.del(this._EDM_KEY, "")
		}
	},
	init : function() {
		var b = YouBoy3C.app.itemDetail;
		/*if (itemInfo.stock.indexOf("无货") >= 0 || itemInfo.status != 1) {
		} else {
			b.loadEasyMatch(itemInfo.pid)
		}*/
		b.return_top();
		b.addMonitors();
		b.initDetailTab();
		$("#introduction .hd li a:first").click();
		setTimeout(function() {}, 1000);
		//b.visitHistory.add(itemInfo);
		var f = false, a = false;
		var d = function(l) {
			var h = 100, g = $(window).scrollTop() + $(window).height()
				, m = $("#visitList").offset().top;
			if (!a && (g + h >= m)) {
				a = true;
				//b.loadHistory()
			}
			if (a && f) {
				$(window).unbind("scroll", d)
			}
		};
		$(window).bind("scroll", d);
		var c = YouBoy3C.util.parse.url(), e = c.hash.edm || c.hash.EDM || c.search.edm || c.search.EDM;
		if (e) {			
			YouBoy3C.app.itemDetail._edmCookie.set(e, itemInfo.pid);
		}
	},
	visitHistory : {
		CACHE_KEY : "visithistory",
		_getCurrentHistory : function(a) {
			//var b = a.getItem(YouBoy3C.app.itemDetail.visitHistory.CACHE_KEY) || [], c = {};
			var b = [], c = {};
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
			//YouBoy3C.util.cookie.add("visited_pids", f, "/", 3600 * 24 * 365,"");
			
			//c.setItem(YouBoy3C.app.itemDetail.visitHistory.CACHE_KEY, g)
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
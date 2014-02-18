YouBoy3C.app.list = {
	CACHEKEY : "visithistory",
	todayShipper : function(b) {
		var c = window.location.href.toString().split("/"), a = c[c.length - 1]
				.split("-");
		a[5] = b.checked ? 1 : 0;
		a[6] = 1;
		window.location.href = a.join("-")
	},
	add : function(b) {
		b = $(b);
		var a = b.attr("pid");
		YouBoy3C.logic.constants.goToCartWithThis(b, {
			pid : a
		});
		logStat.chkItem(b.attr("pos"), a);
		return false
	},
	initPriceRange : function() {
		var b = function(f, e) {
			f = $(f);
			if ($.browser.msie) {
				f.bind("keyup onpaste", function(g) {
					var h = this;
					g.preventDefault();
					setTimeout(function() {
						e.call(h)
					}, 10)
				})
			} else {
				f.each(function() {
					var g = this;
					this.addEventListener("input", function() {
						e.call(g)
					}, false)
				})
			}
		};
		var d = $("#price_panel"), a = d.find("input[type=text]");
		a.bind("focus", function(f) {
			var g = $(this), e = $.trim(g.val());
			if ((e == g.attr("d"))) {
				g.val("")
			}
			a.removeClass("on");
			g.addClass("on")
		}).bind("blur", function(h) {
			var g = $(this), f = $.trim(g.val());
			if (f == "") {
				g.val(g.attr("d"))
			}
			g.removeClass("on")
		}).bind("keydown", function(f) {
			if (f.keyCode == 13) {
				if (this == a[0]) {
					a[1].focus()
				} else {
					d.find(".btn_strong").click()
				}
			}
		});
		b(a, function() {
			this.value = $.trim(this.value).replace(/[^\d]/g, "")
		});
		d.find(".btn_strong").click(
				function() {
					var e = [];
					e.push(a[0].value.toString().replace(/[^\d]/g, ""));
					e.push(a[1].value.toString().replace(/[^\d]/g, ""));
					if (!e[0] && !e[1]) {
						a.get(e[0] ? 1 : 0).focus();
						return false
					}
					if (e[0] && e[1]
							&& (parseInt(e[1], 10) <= parseInt(e[0], 10))) {
						a[1].focus();
						return false
					}
					var f = window.location.href.toString(), g = f.replace(
							/^([^-]+)(-[^-]*)/, function(i, h, j) {
								return h + "-" + e[0] + "t" + e[1]
							});
					window.location.href = g
				});
		d.find(".btn_common").click(
				function() {
					var e = window.location.href.toString(), f = e.replace(
							/^([^-]+)(-[^-]*)/, function(h, g, i) {
								return g + "-"
							});
					if (e != f) {
						window.location.replace(f)
					} else {
						a.each(function() {
							this.value = this.getAttribute("d").toString()
						})[0].focus()
					}
				});
		var c = d.find(".foused");
		$(document)
				.bind(
						"click",
						function(f) {
							c.css("display", $(f.target)
									.parents("#price_panel").length ? "block"
									: "none")
						})
	},
	switchFilter : function(f, g) {
		var a = $(f).parents(".wrap_close:first"), c = [ "status_up",
				"status_down" ], b = !a.hasClass(c[0]), i = a.parents(
				".ft_cond:first").find(".operation_area>li"), e = 4;
		i.each(function(k) {
			k > e - 1 && (this.className = b ? "" : "hidden")
		});
		a.addClass(b ? c[0] : c[1]).removeClass(b ? c[1] : c[0]);
		var h = f.getAttribute("morestr").toString();
		f.innerHTML = "<b></b>"
				+ (b ? "收起"
						: ("更多" + (h ? ('<span class="m">（' + h + "）</span>")
								: "")));
		var d = window.location.href.toString().match(
				/^http:\/\/\w+\.51buy\.com\/(\d+).*$/);
		if (d && d[1]) {
			var j = (g ? g + "." : "list.") + "51buy.com";
			YouBoy3C.util.cookie.add("attr_show", d[1] + "_" + (b ? "1" : "0"), 0, j)
		}
	},
	initHoverEvent : function(b, a) {
		$(b).add(a).hover(function() {
			a.style.display = "block"
		}, function() {
			a.style.display = "none"
		})
	},
	bindGiftEvent : function() {
		var a = this, b = null;
		activeName = "status_on";
		$("li.item_list")
				.each(
						function() {
							(function(c) {
								c
										.find(".attr_zeng")
										.hover(
												function() {
													clearTimeout(a.giftTimer);
													b
															&& b
																	.removeClass(activeName);
													c.addClass(activeName);
													b = c;
													var d = c
															.find(".con_gifts");
													if (d.length === 0) {
														var e = '<div class="con_gifts con_zeng"> <b class="jian"></b>						              <h5 class="title">赠品</h5>									<span class="loading_82_21">正在请求...</span></div>';
														d = $(e)
																.appendTo(
																		c
																				.find(
																						".attr_zeng")
																				.parent());
														$
																.getJSON(
																		"http://item.51buy.com/json.php?mod=item&act=getgift&pid="
																				+ this
																						.getAttribute("pid")
																				+ "&callback=?",
																		function(
																				h) {
																			var k = '<ul class="list_gifts">', g = false;
																			for ( var f in h.data) {
																				g = true;
																				var j = h.data[f];
																				if (j.type !== 1) {
																					k += '<li><img src="'
																							+ YouBoy3C.logic.constants
																									.getMiddleUrl(
																											j.product_char_id,
																											0)
																							+ '"> <span class="goods_name">'
																							+ j.name
																							+ "</span>"
																							+ (j.price != 99999900 ? ('<span class="goods_price">价值：<span class="i_yuan">&yen;</span>'
																									+ Number(
																											j.price / 100)
																											.toFixed(
																													2) + "</span>")
																									: "")
																							+ "</li>"
																				}
																			}
																			if (false === g) {
																				k += "<li>赠品已送完</li>"
																			}
																			k += "</ul>";
																			d
																					.find(
																							".loading_82_21")
																					.remove();
																			d
																					.append(k)
																		});
														d
																.hover(
																		function() {
																			clearTimeout(a.giftTimer);
																			b
																					&& b
																							.removeClass(activeName);
																			c
																					.addClass(activeName);
																			b = c
																		},
																		function() {
																			c
																					.removeClass(activeName);
																			b = null;
																			d
																					.hide()
																		})
													}
													d.show()
												},
												function() {
													a.giftTimer = setTimeout(
															function() {
																c
																		.removeClass("status_on");
																c
																		.find(
																				".con_gifts")
																		.hide()
															}, 50)
												})
							})($(this))
						})
	},
	bindCpEvent : function() {
		var a = $(".attr_hua,.attr_wang");
		if (a.length == 0) {
			return
		}
		a.each(function() {
			(function(b) {
				b.hover(function() {
					b.parent().find(".con_hua").show()
				}, function() {
					b.parent().find(".con_hua").hide()
				})
			})($(this))
		})
	},
	init : function() {
		this.loadHistory();
		this.asideLink();
	},
	asideLink : function() {
		$(".sidebar .sort_product").click(
				function(a) {
					var c = $.trim($("#q_show").val());
					c = (c === YouBoy3C.logic.header._Q_SHOW_DEF_TEXT ? "" : c);
					var b = a.target;
					if (!b || b.nodeName.toUpperCase() !== "A"
							|| !/http:\/\/(?:list|s)/.test(b.href.toString())) {
						return true
					}
					if (c === "") {
						$(b).attr(
								"href",
								b.href.toString().replace(
										/^(http:\/\/)(?:list|s)([^\?]+).*$/,
										function(e, d, f) {
											return d + "list" + f
										}))
					} else {
						$("#q_show").parents("form").attr(
								"action",
								b.href.toString().replace(
										/^(http:\/\/)(?:list|s)([^\?]+).*$/,
										function(e, d, f) {
											return d + "s" + f
										})).submit();
						return false
					}
				})
	},
	tuan : function(b) {
		$.ajax({
			url : "",
			dataType : "script",
			success : function() {
				YouBoy3C.app.tuan.init({
					target : $("#g_tuan_list"),
					c1id : b
				})
			},
			cache : true
		})
	},
	loadHistory : function() {
		YouBoy3C.app.list.visitHistory.getAll(function(b) {
			if (!b || $.isEmptyObject(b)) {
				$("#visitList").empty().html(
						'<div class="clear_jilu">你还没有浏览过任何商品。</div>')
			} else {
				var a = {
					list : []
				}, c = 61;
				$.each(b, function(d, e) {
					a.list.push({
						tagpre : 1700 + (c - 61),
						pid : e.pid,
						pos : c++,
						picurl : YouBoy3C.logic.constants._getPicUrl(e.p_char_id,
								"pic60", 0),
						price : (e.price / 100).toFixed(2),
						name : e.name || "",
						time : e.time
					})
				});
				a.list.sort(function(e, d) {
					return e.time < d.time ? 1 : -1
				});
				if (a.list.length > 5) {
					a.list.length = 5
				}
				YouBoy3C.ui.template.fillWithTPL("visitList", a);
				$("#visitList a[t=clearHistory]").click(function() {
					YouBoy3C.app.list.visitHistory.clear(function() {
						YouBoy3C.app.list.loadHistory()
					})
				})
			}
		})
	},
	visitHistory : {
		CACHE_KEY : "visithistory",
		_getCurrentHistory : function(a) {
			var b = a.getItem(YouBoy3C.app.list.visitHistory.CACHE_KEY) || [], c = {};
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
		_setCurrentHistory : function(a, b) {
			var c = [];
			if (b) {
				$.each(b, function(d, e) {
					c.push([ e.pid, e.p_char_id, e.price, e.time, e.name ])
				});
				c.sort(function(e, d) {
					return e[3] < d[3] ? 1 : -1
				})
			}
			c = c.slice(0, 10);
			a.setItem(YouBoy3C.app.list.visitHistory.CACHE_KEY, c)
		},
		add : function(a, c) {
			var b = YouBoy3C.app.list.visitHistory;
			if (!a.pid) {
				return
			}
		},
		remove : function(b, c) {
			var a = YouBoy3C.app.list.visitHistory;
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
			var a = YouBoy3C.app.list.visitHistory;
		},
		getAll : function(b) {
			var a = YouBoy3C.app.list.visitHistory;
		}
	},
	selBrand : function() {
		var a = $("#brand").val();
		$.get("http://list.51buy.com/json.php?mod=list&act=getsel&type=2&id="
				+ a, function(e) {
			if (e.error == 0) {
				$("#catena").html('<option value="0">请选择系列</option>');
				for ( var b in e.data) {
					var c = e.data[b];
					var d = "<option value='" + c.id
							+ "' onclick='YouBoy3C.app.list.selCatena(" + c.id
							+ ");'>" + c.name + "</option>";
					$("#catena").append(d)
				}
				$("#model").html('<option value="0">请选择型号</option>')
			} else {
				$("#catena").html('<option value="0">请选择系列</option>');
				$("#model").html('<option value="0">请选择型号</option>')
			}
		}, "jsonp")
	},
	selCatena : function() {
		var a = $("#catena").val();
		$.get("http://list.51buy.com/json.php?mod=list&act=getsel&type=3&id="
				+ a, function(e) {
			if (e.error == 0) {
				$("#model").html('<option value="0">请选择型号</option>');
				for ( var b in e.data) {
					var c = e.data[b];
					var d = "<option value='" + c.id + "'>" + c.name
							+ "</option>";
					$("#model").append(d)
				}
			} else {
				$("#model").html('<option value="0">请选择型号</option>')
			}
		}, "jsonp")
	},
	loadMatchProduct : function() {
		var id = $("#brand").val();
		if (id == "0") {
			alert("请先选择品牌！");
			return
		}
		var id = $("#catena").val();
		if (id == "0") {
			alert("请先选择系列！");
			return
		}
		var id = $("#model").val();
		if (id == "0") {
			alert("请先选择型号！");
			return
		}
		var match = eval("/xmatchIdx/");
		g_url = g_url.replace(match, id);
		document.location.href = g_url
	},
	loadCarProduct : function() {
		var id = $("#brand").val();
		if (id == "0") {
			alert("请先选择品牌！");
			return
		}
		var id = $("#type").val();
		if (id == "0") {
			alert("请先选择类型！");
			return
		}
		var id = $("#model").val();
		if (id == "0") {
			alert("请先选择排量！");
			return
		}
		var id = $("#style").val();
		if (id == "0") {
			alert("请先选择年份！");
			return
		}
		var match = eval("/xmatchIdx/");
		g_url = g_carurl.replace(match, id);
		document.location.href = g_url
	},
	selCarBrand : function() {
		var a = $("#brand").val();
		$.get(
				"http://list.51buy.com/json.php?mod=list&act=getcarsel&type=2&id="
						+ a, function(e) {
					if (e.error == 0) {
						$("#type").html('<option value="0">请选择类型</option>');
						for ( var b in e.data) {
							var c = e.data[b];
							var d = "<option value='" + b
									+ "' onclick='YouBoy3C.app.list.selCarType(" + b
									+ ");'>" + c + "</option>";
							$("#type").append(d)
						}
					} else {
						$("#type").html('<option value="0">请选择类型</option>')
					}
					$("#model").html('<option value="0">请选择排量</option>');
					$("#style").html('<option value="0">请选择年份</option>')
				}, "jsonp")
	},
	selCarType : function() {
		var a = $("#type").val();
		$.get(
				"http://list.icson.com/json.php?mod=list&act=getcarsel&type=3&id="
						+ a, function(e) {
					if (e.error == 0) {
						$("#model").html('<option value="0">请选择排量</option>');
						for ( var b in e.data) {
							var c = e.data[b];
							var d = "<option value='" + b
									+ "' onclick='YouBoy3C.app.list.selCarModel(" + b
									+ ");'>" + c + "</option>";
							$("#model").append(d)
						}
					} else {
						$("#model").html('<option value="0">请选择排量</option>')
					}
					$("#style").html('<option value="0">请选择年份</option>')
				}, "jsonp")
	},
	selCarModel : function() {
		var a = $("#model").val();
		$.get(
				"http://list.icson.com/json.php?mod=list&act=getcarsel&type=4&id="
						+ a, function(e) {
					if (e.error == 0) {
						$("#style").html('<option value="0">请选择年份</option>');
						for ( var b in e.data) {
							var c = e.data[b];
							var d = "<option value='" + b + "'>" + c
									+ "</option>";
							$("#style").append(d)
						}
					} else {
						$("#model").html('<option value="0">请选择年份</option>')
					}
				}, "jsonp")
	}
};
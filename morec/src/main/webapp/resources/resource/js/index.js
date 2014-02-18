YouBoy3C.app.index = {
	_VP_Operator : null,
	_VP_Area : null,
	_VP_Mobile : null,
	init : function() {
		YouBoy3C.app.index.mobileHistory.getAll();
		$("#category_container .i_hd .more").remove();
		var b = "status_on", c = "on";
		var d = window.screen.availWidth >= 1280;
		$("img[bsrc], img[ssrc]").each(
						function() {
							var g = d ? "b" : "s", e = $(this)
									.attr(g + "width"), f = $(this).attr(
									g + "height"), i = $(this).attr(g + "src");
							if (e) {
								$(this).width(e)
							}
							if (f) {
								$(this).height(f)
							}
							if (i) {
								$(this).attr("_src", i)
							}
						});
		$.ajax( {
			url : "/resource/js/lazyload.js",
			dataType : "script",
			success : function() {
				YouBoy3C.app.lazyload.init( {
					target : ".lazy_box"
				})
			},
			cache : true
		});
		this.setStock();
		this.tabs("#hideTab0", 4000);
		this.tabs("#hideTab1", 4000);
		this.tabs("#hideTab2", 4000);
		this.moveTabs("#moveTabs0", 400, 4000);
		this.moveTabs("#moveTabs2", 200, 2000, false);
		this.checkQqBindStatus()
	},
	setStock : function() {
		setTimeout(function() {
			$(".mod_quickbuy_bd .yx_stock_inner").each(function() {
				var c = $(this), a = c.attr("w").toString();
				if (!a) {
					return
				}
				var b = parseInt(100 - parseInt(a, 10), 10) + "%";
				if ($.browser.webkit || $.browser.opera || $.browser.mozilla) {
					c.css("width", b)
				} else {
					c.animate( {
						width : b
					}, "slow")
				}
			})
		}, 500)
	},
	slidePlay : function(c) {
		var a = function() {
			var d = [], g = window.screen.availWidth;
			var f = {
				target : $("#mod_slide"),
				direction : 0,
				height : g >= 1280 ? 332 : 233,
				speed : 3000,
				duration : "slow",
				showLink : false,
				barNumber : false
			};
			for ( var e in c) {
				var h = c[e];
				d.push( {
					link : h.href,
					text : "",
					src : g >= 1280 ? h.img_b : h.img_s,
					hotName : "I.INDEX.INDEXSLIDEPLAY_" + e,
					ytag : h.ytag
				})
			}
			f.dataSource = d;

		};
		$.ajax( {
			url : "",
			dataType : "script",
			success : a,
			cache : true
		})
	},
	quickBuy : function(d) {
		var e = $(".mod_quickbuy_hd").children("div").eq(0);
		var c = $(".mod_quickbuy_hd").children("div").eq(1);
		var f = $(".mod_quickbuy_bd").children().eq(0);
		var i = $(".mod_quickbuy_bd").find("ul").eq(0);
		var a = e.children("div").eq(0);
		var h = c.children("div").eq(0);
		var b = a.width();
		var g = i.width();
		if (c.css("display") == "none") {
			f.stop(true, true).animate( {
				left : -1 * g
			}, d);
			a.stop(true, true).animate( {
				left : -1 * b
			}, d, function() {
				e.hide();
				c.show();
				h.css("left", "0px")
			})
		} else {
			i.css( {
				position : "relative",
				left : g * 2
			});
			f.stop(true, true).animate( {
				left : -1 * g * 2
			}, d, function() {
				f.css( {
					left : "0px"
				});
				i.css( {
					position : "",
					left : ""
				})
			});
			h.stop(true, true).animate( {
				left : -1 * b
			}, d, function() {
				c.hide();
				e.show();
				a.css("left", "0px")
			})
		}
	},
	tabsNarrowAction : function(d, c) {
		var b = $("#moveTabs1").children("ul").eq(1).find("li").eq(0);
		var a = $("#moveTabs1").children("ul").eq(1).find("li").eq(1);
		var e = $("#moveTabs1").children("div").eq(0);
		tabsBdlen = e.children("ul").length * 2 - 1;
		moveWidth = e.children("ul").width() / 2;
		e.stop(true, true).animate( {
			left : c * -moveWidth
		}, d, function() {
			a.removeClass("next_disabled");
			b.removeClass("prev_disabled");
			b.find("a").attr("title", "上一个");
			a.find("a").attr("title", "下一个");
			if (c == tabsBdlen) {
				a.addClass("next_disabled");
				a.find("a").attr("title", "木有了")
			}
			if (c == 0) {
				b.addClass("prev_disabled");
				b.find("a").attr("title", "木有了")
			}
		})
	},
	tabsNarrow : function(d, e) {
		var h = this;
		var i = $("#moveTabs1").children("ul").eq(1).find("li").eq(0);
		var a = $("#moveTabs1").children("ul").eq(1).find("li").eq(1);
		var c = $("#moveTabs1").children("div").eq(0);
		tabsBdlen = c.children("ul").length * 2 - 1;
		moveWidth = c.children("ul").width() / 2;
		var f = 0;
		var b = 1;
		var g = setInterval(function() {
			if (f == tabsBdlen) {
				b = -1
			} else {
				if (f == 0) {
					b = 1
				}
			}
			f = f + b;
			h.tabsNarrowAction(d, f)
		}, e);
		a.bind("click", function() {
			clearInterval(g);
			if (f < tabsBdlen) {
				f = f + 1;
				h.tabsNarrowAction(d, f)
			} else {
				return false
			}
		});
		i.bind("click", function() {
			clearInterval(g);
			if (f > 0) {
				f = f - 1;
				h.tabsNarrowAction(d, f)
			} else {
				return false
			}
		});
		a.hover(function() {
			clearInterval(g)
		}, function() {
			g = setInterval(function() {
				if (f == tabsBdlen) {
					b = -1
				} else {
					if (f == 0) {
						b = 1
					}
				}
				f = f + b;
				h.tabsNarrowAction(d, f)
			}, e)
		});
		i.hover(function() {
			clearInterval(g)
		}, function() {
			g = setInterval(function() {
				if (f == tabsBdlen) {
					b = -1
				} else {
					if (f == 0) {
						b = 1
					}
				}
				f = f + b;
				h.tabsNarrowAction(d, f)
			}, e)
		});
		c.hover(function() {
			clearInterval(g)
		}, function() {
			g = setInterval(function() {
				if (f == tabsBdlen) {
					b = -1
				} else {
					if (f == 0) {
						b = 1
					}
				}
				f = f + b;
				h.tabsNarrowAction(d, f)
			}, e)
		})
	},
	tabsAction : function(b, a) {
		var b = $(b);
		var d = b.children().eq(0).find("li");
		var c = b.children().eq(1).find("ul");
		d.removeClass("current");
		d.eq(a).addClass("current");
		c.hide();
		c.eq(a).fadeIn("fast")
	},
	tabs : function(e, d) {
		var a = this;
		var g = 0;
		var e = $(e);
		var h = e.children().eq(0).find("li");
		var f = e.children().eq(1).find("ul");
		var c = h.length - 1;
		var b = setInterval(function() {
			if (g < c) {
				g = g + 1
			} else {
				g = 0
			}
			a.tabsAction(e, g)
		}, d);
		h.each(function(j) {
			$(h[j]).hover(function() {
				clearInterval(b);
				a.tabsAction(e, j)
			}, function() {
				g = j;
				b = setInterval(function() {
					if (g < c) {
						g = g + 1
					} else {
						g = 0
					}
					a.tabsAction(e, g)
				}, d)
			})
		});
		f.each(function(j) {
			$(f[j]).hover(function() {
				clearInterval(b)
			}, function() {
				g = j;
				b = setInterval(function() {
					if (g < c) {
						g = g + 1
					} else {
						g = 0
					}
					a.tabsAction(e, g)
				}, d)
			})
		})
	},
	moveTabsAction : function(h, d, a) {
		var h = $(h);
		var c = h.children("ul").eq(0).find("li");
		var g = c.length;
		var b = g - 1;
		var f = h.children("div").eq(0);
		var e = f.find("ul").eq(0).width();
		c.removeClass("current");
		c.eq(d).addClass("current");
		f.stop(true, true).animate( {
			left : -1 * d * e
		}, a)
	},
	moveTabs : function(b, i, a, d) {
		var j = this;
		var b = $(b);
		var g = 0;
		var c = b.children("ul").eq(0).find("li");
		var f = c.length - 1;
		var e = b.children("div").eq(0);
		if (d || d == undefined) {
			var h = setInterval(function() {
				if (g < f) {
					g = g + 1
				} else {
					g = 0
				}
				j.moveTabsAction(b, g, i)
			}, a)
		}
		if (c.length > 1) {
			c.each(function(k) {
				$(c[k]).hover(function() {
					if (d || d == undefined) {
						clearInterval(h)
					}
					j.moveTabsAction(b, k, i)
				}, function() {
					if (d || d == undefined) {
						g = k;
						h = setInterval(function() {
							if (g < f) {
								g = g + 1
							} else {
								g = 0
							}
							j.moveTabsAction(b, g, i)
						}, a)
					}
				})
			});
			e.hover(function() {
				if (d || d == undefined) {
					clearInterval(h)
				}
			}, function() {
				if (d || d == undefined) {
					h = setInterval(function() {
						if (g < f) {
							g = g + 1
						} else {
							g = 0
						}
						j.moveTabsAction(b, g, i)
					}, a)
				}
			})
		} else {
			c.hide()
		}
	}
};
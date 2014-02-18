YouBoy3C.app.goodsCompare = function() {
	var a = this;
	this._goods_ = {};
	this.closeHandler = function() {
		a._close_()
	};
	this.clearHandler = function() {
		a._clear_()
	};
	this.deleteHandler = function(c) {
		var b = $(c.srcElement || c.target);
		if (!b.hasClass("act_del")) {
			return
		} else {
			a.remove(b.attr("pid"))
		}
	};
	this.compareHandler = function(d) {
		var e = [];
		$.each(a._goods_, function(h, i) {
			e.push(i)
		});
		if (e.length <= 1) {
			return false
		} else {
			var g = "";
			if (/item\.51buy\.com/.test(location.href) && window.itemInfo) {
				g = "item_" + itemInfo.pid
			} else {
				if (/list\.51buy\.com\/(\d+)-/.test(location.href)) {
					g = "list_" + RegExp.$1
				}
			}
			e.sort(function(i, h) {
				return i.tm - h.tm
			});
			var f = [];
			$.each(e, function(h, i) {
				f.push(i.id)
			});
			var c = $(d.srcElement || d.target), b = c.attr("href");
			b = b.replace(/compare.html(.*)/, "compare.html");
			c.attr("href", b + "?goods=" + f.join("_")
					+ (g ? ("&csrc=" + g) : ""))
		}
	}
};
YouBoy3C.app.goodsCompare.prototype = {
	_posGroup : {
		item : 1,
		list : 2,
		s : 2
	},
	_WINDOW_ID_ : "goods_compare_window",
	_GOODS_CID_ : "goods",
	_GOODS_SESSION_TIME_ : "cmpSid",
	_compare_window_fixed : false,
	_opt : {},
	init : function(b) {
		this._opt = b || {};
		if (!this._opt.noui) {
			var a = $("#" + this._WINDOW_ID_);
			if (a.length <= 0) {
				a = $(
						'<div class="layer_global pop_goods_compare" id="'
								+ this._WINDOW_ID_
								+ '" style="z-index:995">					<div class="layer_global_main">						<div class="layer_global_title">							<h3><span class="jian">&gt;</span><span id="">商品对比</span></h3>							<button title="关闭" t="btn_close"><span class="none">?</span></button>						</div>						<div class="layer_global_cont">							<div class="para_inb tip">最多可同时对比<span class="num">4</span>件商品。关闭浮层将清空所有商品。</div>							<div class="goods_list">							</div>							<div class="act">								<a href="http://item.51buy.com/compare.html" target="_blank" t="btn_compare" class="btn_strong">开始对比</a><a href="#" class="btn_clear" onclick="return false">清空</a>							</div>							<div class="nogoods" style="display:none">暂无对比商品</div>						</div>					</div>				</div>')
						.appendTo("body");
				if ($.browser.msie && $.browser.version <= 6) {
					G.ui.modal.create(a)
				}
				$("button[t=btn_close]", a).click(this.closeHandler);
				$("a.btn_clear", a).click(this.clearHandler);
				$("a[t=btn_compare]", a).click(this.compareHandler);
				$("div.goods_list").click(this.deleteHandler)
			}
		}
		this._loadCompare_((function(c) {
			return function() {
				c._update_()
			}
		})(this))
	},
	add : function(c) {
		if (!c || !c.id || !c.name) {
			return false
		}
		var b = this, a = 0;
		$.each(this._goods_, function(d, e) {
			a++
		});
		if (a >= 4) {
			G.ui.popup.showMsg("对不起，最多可同时对比4个商品，请删除其他商品后再试。");
			return false
		}
		c.tm = c.tm || Math.round((new Date()).getTime() / 1000);
		this._goods_[c.id] = c;
		this._saveCompare_((function(d) {
			return function() {
				d._update_()
			}
		})(this));
		return false
	},
	remove : function(a) {
		if (this._goods_.length <= 0) {
			return false
		}
		if (this._goods_[a]) {
			delete this._goods_[a]
		}
		this._saveCompare_((function(b) {
			return function() {
				b._update_()
			}
		})(this));
		return true
	},
	_clear_ : function() {
		this._goods_ = {};
		this._saveCompare_((function(a) {
			return function() {
				a._update_();
				if ($.isFunction(a._opt.onclose)) {
					a._opt.onclose.apply(a)
				}
			}
		})(this))
	},
	_close_ : function() {
		this._clear_();
		$("#" + this._WINDOW_ID_).css("display", "none")
	},
	_update_ : function() {
		var c = this;
		if (c._opt.noui) {
			return
		}
		var b = $("#" + c._WINDOW_ID_), d = "", e = [], a = 0;
		$.each(c._goods_, function(f, h) {
			e.push(h)
		});
		e.sort(function(g, f) {
			return g.tm - f.tm
		});
		$
				.each(
						e,
						function(g, f) {
							if (!c._opt.nocurrent && a == 0) {
								d += '<div class="item"><a href="http://item.51buy.com/item-'
										+ f.id
										+ '.html" class="goods_name">'
										+ f.name
										+ '</a><span class="now">当前商品</span></div>'
							} else {
								d += '<div class="item"><a href="http://item.51buy.com/item-'
										+ f.id
										+ '.html" class="goods_name">'
										+ f.name
										+ '</a><a href="#" pid="'
										+ f.id
										+ '" class="act_del" onclick="return false;">删除</a></div>'
							}
							a++
						});
		if (a <= 0) {
			$("div.goods_list, div.act", b).css("display", "none");
			$("div.nogoods", b).css("display", "")
		} else {
			$("div.goods_list", b).html(d);
			$("div.goods_list, div.act", b).css("display", "");
			$("div.nogoods", b).css("display", "none")
		}
		if (!c._compare_window_fixed) {
			b.css({
				right : 0
			}).fixedPosition({
				fixedTo : "top",
				fixedTop : 200
			});
			G.ui.drag.enable(b[0], $(".layer_global_title", b)[0], {
				fixed : true
			});
			c._compare_window_fixed = true;
			if (a >= 1) {
				b.css("display", "")
			} else {
				b.css("display", "none")
			}
		} else {
			b.css("display", "")
		}
	},
	_loadCompare_ : function(c) {
		var b = this;
		if (b._opt.nosave) {
			$.isFunction(c) && c();
			return
		}
		var a = G.util.cookie.get(b._GOODS_SESSION_TIME_);
		YouBoy3C.util
				.localShare(function(d) {
					var e = d.getItem(b._GOODS_CID_);
					if (e
							&& (e.sessionId != a || (b._opt.pos && b._posGroup[b._opt.pos] != b._posGroup[e.pos]))) {
						e = {}
					}
					$.each(e || {}, function(f, h) {
						if (!isNaN(parseInt(f))) {
							b.add({
								id : f,
								name : h.name,
								tm : h.tm
							})
						}
					});
					$.isFunction(c) && c()
				})
	},
	_saveCompare_ : function(c) {
		var a = this;
		if (a._opt.nosave) {
			$.isFunction(c) && c();
			return
		}
		var b = Math.round((new Date()).getTime() / 100);
		YouBoy3C.util.cookie.add(a._GOODS_SESSION_TIME_, b, "/", 0, ".51buy.com");
		YouBoy3C.util.localShare(function(e) {
			var d = {};
			$.each(a._goods_, function(f, h) {
				d[f] = {
					name : h.name,
					tm : h.tm
				}
			});
			if (a._opt.pos) {
				d.pos = a._opt.pos
			}
			d.sessionId = b;
			e.setItem(a._GOODS_CID_, d);
			$.isFunction(c) && c()
		})
	}
};
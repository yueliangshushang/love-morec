YouBoy3C.app.lazyload = (function(g, i, d) {
	var e = {
		threshold : 100,
		cachePosition : true,
		attributeName : "_src",
		target : null,
		container : i,
		show : function(k) {
			this.src = k
		}
	}, b = e.container === i, f = [], a = g(e.container);
	function j(l) {
		var k = [];
		g(l.target).find("img").each(function() {
			if (this.getAttribute(l.attributeName) !== null) {
				k.push( {
					obj : g(this)
				})
			}
		});
		return k
	}
	var c = function() {
		var o = [], l = g.extend( {
			width : a.width(),
			height : a.height()
		}, b ? {
			left : a.scrollLeft(),
			top : a.scrollTop()
		} : a.offset());
		for ( var n = 0, k = f.length; n < k; n++) {
			var q = f[n], r = h(q, l);
			if (!r.belowthefold && !r.rightoffold && !r.abovethetop
					&& !r.leftofbegin) {
				var p = q.obj[0], m = e.attributeName;
				e.show.call(p, p.getAttribute(m));
				p.removeAttribute(m);
				delete q.obj;
				q = null
			} else {
				o.push(q)
			}
		}
		if (o.length === 0) {
			a.unbind("scroll", arguments.callee)
		}
		f = o
	};
	var h = function(k, l) {
		if (!e.cachePosition || !k.cache) {
			var m = k.obj, n = m.offset();
			elePos = [ n.left, n.top, m.width(), m.height() ];
			if (e.cachePosition) {
				k.cache = elePos
			}
		} else {
			elePos = k.cache
		}
		return {
			belowthefold : l.height + l.top <= elePos[1] - e.threshold,
			abovethetop : l.top >= elePos[1] + e.threshold + elePos[3],
			rightoffold : l.width + l.left <= elePos[0] - e.threshold,
			leftofbegin : l.left >= elePos[0] + e.threshold + elePos[2]
		}
	};
	return {
		init : function(k) {
			g.extend(e, k || {});
			b = e.container === i, f = [], a = g(e.container);
			f = j(e);
			a.bind("scroll", c).triggerHandler("scroll")
		},
		refresh : function() {
			f = j(e);
			if (!a.data("events")["scroll"]) {
				a.bind("scroll", c)
			}
			f.length > 0 && a.triggerHandler("scroll")
		}
	}
})(jQuery, window);
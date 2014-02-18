$.extend($, {
    strlen: function(a) {
        if (typeof a != "string") {
            return 0
        }
        return a.replace(/[^\x00-\xff]/gi, "xx").length
    }
});
var YouBoy3C = {};
/*YouBoy3C.DOMAIN = {
    WWW_ICSON_COM: "www.51buy.com",
    ACT_ICSON_COM: "act.51buy.com",
    EVENT_ICSON_COM: "event.51buy.com",
    ITEM_ICSON_COM: "item.51buy.com",
    BUY_ICSON_COM: "buy.51buy.com",
    BASE_ICSON_COM: "base.51buy.com",
    S_ICSON_COM: "s.51buy.com",
    LIST_ICSON_COM: "list.51buy.com",
    ST_ICSON_COM: "st.51buy.com",
    ACT_ICSON_COM: "act.51buy.com"
};*/
YouBoy3C.prefix = {
    st: "http://localhost:8080/morec/",
    ssl: false,
    st_ssl: "http://localhost:8080/morec/"
};
YouBoy3C.createFnQueue = function(a) {
    var b = [];
    return {
        add: function(c) {
            if ($.isFunction(c)) {
                b.push(c)
            }
        },
        exec: function(f) {
            if (a !== false) {
                while (b.length > 0) {
                    b.shift()(f)
                }
            } else {
                for (var d = 0,
                c = b.length; d < c; d++) {
                    if (b[d](f) === false) {
                        return false
                    }
                }
            }
        },
        clear: function() {
            b.length = 0
        }
    }
};
YouBoy3C.app = {};
YouBoy3C.logic = {};
YouBoy3C.ui = {};
YouBoy3C.util = {};

if ($.browser.msie && parseInt($.browser.version, 10) < 7) {
    try {
        document.execCommand("BackgroundImageCache", false, true)
    } catch(e) {}
}

YouBoy3C.util.parse = {
    url: function() {
        var a = function(f) {
            var f = (f + "").replace(/(&amp;|\?)/g, "&").split("&");
            var g = {};
            var j = f.length;
            for (var d = 0; d < j; d++) {
                var h = f[d].indexOf("=");
                if ( - 1 == h) {
                    continue
                }
                g[f[d].substr(0, h).replace(/[^a-zA-Z0-9_]/g, "")] = unescape(f[d].substr(h + 1))
            }
            return g
        };
        var b = location.href.toString().indexOf("#");
        if (b < 0) {
            b = ""
        } else {
            b = location.href.toString().substring(b, location.href.toString().length)
        }
        return {
            search: a(location.search.substr(1)),
            hash: a(b)
        }
    },
    encodeHtml: function(a) {
        return a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#039;").replace(/"/g, "&quot;")
    },
    decodeHtml: function(a) {
        return a.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#0?39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&")
    },
    timeFormat: function(c, a) {
        var f = YouBoy3C.util.parse.getTimeInfo(c);
        var b = {
            y: f.year,
            m: f.month,
            d: f.date,
            h: f.hour,
            i: f.minute,
            s: f.sec,
            w: f.week
        };
        $.each(b,
        function(g, d) {
            if (g != "y" && d < 10) {
                b[g] = "0" + d
            }
        });
        return a.replace(/(?!\\)(y|m|d|h|i|s|w)/gi,
        function(g, d) {
            return b[d.toLowerCase()]
        })
    },
    getTimeInfo: function(b) {
        var a = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        var c = new Date(b * 1000);
        return {
            year: c.getFullYear(),
            month: c.getMonth() + 1,
            date: c.getDate(),
            hour: c.getHours(),
            minute: c.getMinutes(),
            sec: c.getSeconds(),
            week: a[c.getDay()]
        }
    }
};

 (function(a, c, d) {
    function b(f) {
        var w = function(C, i) {
            return (C && C.hasOwnProperty && (C instanceof i))
        };
        if (! (w(this, b))) {
            return new b(f)
        }
        f = jQuery.extend({},
        {
            position: "rightBottom",
            distance: 20,
            width: "120",
            html: "",
            target: null,
            buttons: null,
            group: null,
            className: "global_tip",
            time: null
        },
        f || {});
        var p = this,
        A = c(f.target),
        x = A.data("tipInstnace");
        if (x) {
            x.close()
        }
        b.instance = b.instance || [];
        if (f.group) {
            for (var t = 0,
            v = b.instance.length; t < v; t++) {
                if (b.instance[t].opt.group === f.group) {
                    b.instance[t].close()
                }
            }
        }
        var s = (f.buttons && !c.isArray(f.buttons)) || (c.isArray(f.buttons) && f.buttons.length > 0);
        this.element = c('<div class="' + f.className + '"><div class="content">' + f.html + "</div>" + (s ? '<div class="buttons"></div>': "") + '<span class="arrow">◆<span class="inner">◆</span></span></div>').css("width", f.width);
        this.opt = f;
        this.opt.id = new Date().getTime();
        if (s) {
            var r = c.map(c.isArray(f.buttons) ? f.buttons: [f.buttons],
            function(C, i) {
                return '<a href="#" onclick="return false" class="' + (i == 0 ? "btn_strong": "btn_common") + '">' + C + "</a>"
            }).join("");
            var u = this.element.find(".buttons");
            u.append(r);
            u.find("a").each(function(i) {
                c(this).click(function() {
                    if (p.element.triggerHandler("click_" + (i + 1)) !== false) {
                        p.close()
                    }
                })
            }).first().focus()
        }
        this.element.appendTo(document.body);
        if (!s && f.time) {
            this.timer = setTimeout(function() {
                p.close()
            },
            parseInt(f.time, 10))
        }
        var o = {},
        y = {},
        l = parseInt(f.distance, 10);
        var j = c.browser.mozilla ? 12 : (c.browser.webkit ? 12 : 13);
        var m = c.browser.mozilla ? 10 : (c.browser.webkit ? 10 : 10);
        switch (f.position) {
        case "leftTop":
            o = {
                bottom: -1 * j,
                right: l
            };
            y = {
                top: -1
            };
            break;
        case "rightTop":
            o = {
                left: l,
                bottom: -1 * j
            };
            y = {
                top: -1
            };
            break;
        case "leftBottom":
            o = {
                top: -1 * m,
                right: l
            };
            y = {
                top: 1
            };
            break;
        default:
            o = {
                top: -1 * m,
                left: l
            };
            y = {
                top: 1
            };
            break
        }
        var h = c(".arrow", this.element);
        h.css(o);
        c(".inner", this.element).css(y);
        var q = h.offset(),
        z = A.offset(),
        k,
        g;
        switch (f.position) {
        case "leftTop":
        case "rightTop":
            k = {
                x: parseInt(q.left, 10) + parseInt(h.width(), 10) / 2,
                y: parseInt(q.top, 10) + parseInt(h.height(), 10)
            };
            g = {
                x: parseInt(z.left, 10) + parseInt(A.width(), 10) / 2,
                y: parseInt(z.top, 10)
            };
            break;
        default:
            k = {
                x: parseInt(q.left, 10) + parseInt(h.width(), 10) / 2,
                y: parseInt(q.top, 10)
            };
            g = {
                x: parseInt(z.left, 10) + parseInt(A.width(), 10) / 2,
                y: parseInt(z.top, 10) + parseInt(A.height(), 10)
            };
            break
        }
        var n = this.element.position();
        this.element.css({
            left: parseInt(n.left) - k.x + g.x,
            top: parseInt(n.top) - k.y + g.y
        });
        var p = this;
        p._close = function() {
            p && p.close()
        };
        c(window).bind("resize", p._close);
        b.instance.push(this);
        A.data("tipInstnace", this);
        for (var B in f) {
            if (/^click_\d$/.test(B.toString())) {
                this.bind(B, f[B])
            }
        }
    }
    c.extend(b.prototype, {
        bind: function() {
            this.element.bind.apply(this.element, c.makeArray(arguments))
        },
        close: function() {
            clearTimeout(this.timer);
            c(window).unbind("resize", self._close);
            this.element.data("tipInstnace", null);
            for (var g = 0,
            f = b.instance.length; g < f; g++) {
                if (b.instance[g].opt.id == this.opt.id) {
                    b.instance.splice(g, 1);
                    break
                }
            }
            this.element.remove()
        },
        getButtons: function() {
            return this.element.find(".buttons>a")
        },
        getElement: function() {
            return this.element
        },
        isShow: function() {
            return this.element[0].style.display !== "none"
        },
        show: function() {
            this.element[0].style.display = "block"
        },
        hide: function() {
            this.element[0].style.display = "none"
        }
    });
    a.ui.arrowTip = b
})(YouBoy3C, jQuery); (function(a, c, f) {
    function d(g) {
        this.opt = c.extend({},
        {
            tpl: "",
            itemActiveClass: "",
            data: null,
            index: -1,
            url: ""
        },
        g || {});
        this.init()
    }
    d.prototype = {
        constructor: d,
        trigger: function() {
            this.element && this.element.triggerHandler.apply(this.element, Array.prototype.slice.call(arguments, 0, arguments.length))
        },
        bind: function() {
            this.element && this.element.bind.apply(this.element, Array.prototype.slice.call(arguments, 0, arguments.length))
        },
        init: function() {
            var h = this,
            g = this.opt.tpl.toString().replace(/{([^}]+)}/g,
            function(j, i) {
                return f === h.opt.data[i] ? "": h.opt.data[i]
            });
            this.element = c(g);
            this.element.hover(function() {
                h.active()
            },
            function() {
                h.unActive()
            }).click(function() {
                h.trigger("item_click", h.opt.data);
                return false
            })
        },
        active: function() {
            this.element && this.element.addClass(this.opt.itemActiveClass);
            this.mouseIn = true;
            this.trigger("active", this.opt.index)
        },
        unActive: function() {
            this.mouseIn = false;
            this.element && this.element.removeClass(this.opt.itemActiveClass);
            this.trigger("unactive")
        },
        remove: function() {
            this.element.remove()
        },
        isActive: function() {
            return !! this.mouseIn
        },
        getData: function() {
            return this.opt.data
        }
    };
    function b(g) {
        if (! (this.hasOwnProperty && this instanceof b)) {
            return new b(g)
        }
        this.opt = c.extend({},
        {
            target: null,
            listOnClass: "",
            delayTime: 200,
            elementClass: "autocomplete",
            cache: true,
            itemTPL: "<li>{label}</li>",
            itemActiveClass: "on",
            params: "",
            keyName: "kw",
            cache: true
        },
        g || {});
        var h = c(this.opt.target);
        if (h.length === 0) {
            return null
        }
        this.target = h.eq(0);
        this.items = [];
        this.init()
    }
    b.prototype = {
        constructor: b,
        keyCode: {
            ALT: 18,
            BACKSPACE: 8,
            CAPS_LOCK: 20,
            COMMA: 188,
            COMMAND: 91,
            COMMAND_LEFT: 91,
            COMMAND_RIGHT: 93,
            CONTROL: 17,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            INSERT: 45,
            LEFT: 37,
            MENU: 93,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SHIFT: 16,
            SPACE: 32,
            TAB: 9,
            UP: 38,
            WINDOWS: 91
        },
        resize: function() {
            var h = this.target,
            g = h.offset();
            this.element.css({
                left: (g.left || 0),
                top: (parseFloat(g.top, 10) || 0) + (parseFloat(h.outerHeight(), 10) || 0) - (parseFloat(h.css("border-bottom-width"), 10) || 0)
            })
        },
        init: function() {
            var g = this,
            j = this.target,
            i = this.opt,
            h = c('<ul class="' + i.elementClass + '"></ul>');
            this.element = h;
            c(a).bind("resize",
            function() {
                g.resize()
            });
            this.resize();
            this.items = [];
            this.target.click(function() {
                if (g.items.length > 0) {
                    g.show()
                }
            });
            this.target.bind("keydown.autocomplete",
            function(k) {
                g.bindKeyDown(k)
            });
            this.target.bind("keyup.autocomplete",
            function(l) {
                var k = l.keyCode,
                m = g.keyCode;
                if (k === m.UP || k === m.DOWN || k === m.ENTER || k === m.NUMPAD_ENTER || k === m.LEFT || k === m.RIGHT) {
                    return
                }
                g.queryDelaySend()
            });
            this.target.bind("enter.autocomplete",
            function() {
                g.hide()
            });
            this.target.bind("click.autocomplete",
            function() {
                g.hide()
            });
            this.target.bind("blur",
            function() {
                setTimeout(function() {
                    g.hide()
                },
                200)
            })
        },
        destory: function() {},
        ajax: function(h) {
            var g = this;
            g.hide();
            this.term = h;
            this.cache = this.cache || {};
            if (this.opt.cache && f !== g.cache[h]) {
                g.requestSuccess(g.cache[h])
            } else {
                var i = {};
                if (g.opt.keyName) {
                    i[g.opt.keyName] = h
                }
                g.xhr && g.xhr.abort();
                g.xhr = c.ajax({
                    url: g.opt.url,
                    data: c.extend(i, g.opt.params || {}),
                    async: true,
                    dataType: "jsonp",
                    cache: false,
                    crossDomain: true,
                    scriptCharset: "gb2312",
                    success: function(j) {
                        if (g.opt.cache) {
                            g.cache[h] = j
                        }
                        g.requestSuccess(j)
                    }
                })
            }
        },
        requestSuccess: function(m) {
            var j = this,
            h = {
                response: m
            };
            this.trigger("success", h);
            this.hide();
            if (c.isArray(h.response)) {
                for (var l = 0,
                g = h.response.length; l < g; l++) {
                    var k = new d({
                        data: h.response[l],
                        tpl: j.opt.itemTPL,
                        itemActiveClass: j.opt.itemActiveClass,
                        itemTPL: j.opt.itemTPL,
                        index: l
                    });
                    this.bindItem(k);
                    this.element.append(k.element);
                    this.items.push(k)
                }
                if (h.response.length > 0) {
                    this.show()
                }
            }
        },
        bindItem: function(h) {
            var g = this;
            h.bind("item_click",
            function(i, j) {
                g.target[0].value = j.value;
                g.hide();
                g.trigger("complete", {
                    from: "click",
                    index: h.opt.index
                })
            });
            h.bind("active",
            function(m, k) {
                for (var l = 0,
                j = g.items.length; l < j; l++) {
                    if (l !== k) {
                        g.items[l].unActive()
                    }
                }
            })
        },
        bindKeyDown: function(h) {
            var g = this,
            i = g.keyCode;
            switch (h.keyCode) {
            case i.UP:
                if (g.isActive()) {
                    g.prev();
                    h.preventDefault()
                }
                break;
            case i.DOWN:
                if (g.isActive()) {
                    g.next();
                    h.preventDefault()
                }
                break;
            case i.ENTER:
            case i.NUMPAD_ENTER:
                g.trigger("enter");
            case i.ESCAPE:
                g.hide(h);
                break;
            default:
                break
            }
        },
        queryDelaySend: function() {
            var g = this;
            clearTimeout(g.delayTimer);
            g.delayTimer = setTimeout(function() {
                var h = g.target[0].value;
                if (g.term !== h) {
                    if (c.trim(h) !== "") {
                        g.ajax(h)
                    } else {
                        g.term = "";
                        g.xhr && g.xhr.abort();
                        g.hide()
                    }
                }
            },
            g.opt.delayTime)
        },
        show: function() {
            this.resize();
            this.activeStatus = true;
            this.element && this.element.addClass(this.opt.listOnClass);
            this.element.appendTo("body");
            this.trigger("show")
        },
        hide: function() {
            this.activeStatus = false;
            this.element && this.element.removeClass(this.opt.listOnClass);
            this.element.detach();
            for (var h = 0,
            g = this.items.length; h < g; h++) {
                this.items[h].remove()
            }
            this.items = [];
            this.trigger("hide")
        },
        getActiveIndex: function() {
            var j = -1;
            for (var h = 0,
            g = this.items.length; h < g; h++) {
                if (true === this.items[h].isActive()) {
                    j = h;
                    break
                }
            }
            return j
        },
        prev: function() {
            var h = this.getActiveIndex();
            if ( - 1 !== h) {
                this.items[h].unActive();
                this.target.val(this.term)
            }
            h = (h === -1 ? this.items.length: h) - 1;
            if (h > -1) {
                var g = this.items[h];
                g.active();
                this.target.val(g.getData().value)
            }
        },
        next: function() {
            var h = this.getActiveIndex();
            if ( - 1 !== h) {
                this.items[h].unActive();
                this.target.val(this.term)
            }
            if (h + 1 < this.items.length) {
                var g = this.items[h + 1];
                g.active();
                this.target.val(g.getData().value)
            }
        },
        isActive: function() {
            return !! this.activeStatus
        },
        trigger: function() {
            this.element && this.element.triggerHandler.apply(this.element, Array.prototype.slice.call(arguments, 0, arguments.length))
        },
        bind: function() {
            this.element && this.element.bind.apply(this.element, Array.prototype.slice.call(arguments, 0, arguments.length))
        }
    };
    YouBoy3C.ui.autoComplete = b
})(window, jQuery); 
(YouBoy3C, jQuery, window);
YouBoy3C.ui.drag = (function() {
    var l = null;
    var j = null;
    var h = 0;
    var g = 0;
    var m = false;
    var k = false;
    var c = {};
    function f(q) {
        q.stopPropagation();
        q.preventDefault();
        if (!l || !j) {
            return
        }
        var o = $(window).scrollLeft();
        var p = $(window).scrollTop();
        var n = h + q.clientX + o;
        var r = g + q.clientY + p;
        n = Math.min(Math.max(n, o), $(window).width() - $(l).outerWidth() + o);
        r = Math.min(Math.max(r, p), $(window).height() - $(l).outerHeight() + p);
        if (n < 0) {
            n = 0
        }
        if (r < 0) {
            r = 0
        }
        if ($(l).css("position") == "fixed") {
            $(l).offset({
                left: n,
                top: r
            })
        } else {
            $(l).offset({
                left: n,
                top: r
            })
        }
        m = n;
        k = r
    }
    function b(p) {
        p.stopPropagation();
        p.preventDefault();
        if (!l || !j) {
            return
        }
        var n = $(window).scrollLeft();
        var o = $(window).scrollTop();
        h = l.offsetLeft - p.clientX - n;
        g = l.offsetTop - p.clientY - o;
        if ($(l).css("position") == "fixed") {
            h += n;
            g += o
        }
        m = false;
        k = false;
        var q = j && j.setCapture ? j: document;
        $(q).bind("mousemove.moving", f).bind("mouseup.stop", d);
        a(q)
    }
    function d(p) {
        if (!j) {
            return
        }
        var q = j && j.setCapture ? j: document;
        $(q).unbind("mousemove.moving");
        $(q).unbind("mouseup.stop");
        if (typeof c.onstop == "function") {
            c.onstop.apply(j)
        }
        if (c.fixed && m !== false && k !== false) {
            var n = $(window).scrollLeft();
            var o = $(window).scrollTop();
            $(l).fixedPosition({
                fixedTo: "top",
                fixedTop: k < o ? 0 : (k - o),
                fixedLeft: m < n ? 0 : (m - n)
            })
        }
        l = null;
        j = null;
        h = 0;
        g = 0;
        i(q)
    }
    function a(n) {
        if (n.setCapture) {
            n.setCapture()
        } else {
            if (window.captureEvents || document.captureEvents) { (window.captureEvents || document.captureEvents)(Event.MouseMove | Event.MouseUp)
            }
        }
    }
    function i(n) {
        if (n.releaseCapture) {
            n.releaseCapture()
        } else {
            if (window.releaseEvents || document.releaseEvents) { (window.releaseEvents || document.releaseEvents)(Event.MouseMove | Event.MouseUp)
            }
        }
    }
    return {
        enable: function(p, o, n) {
            if (typeof o == "string") {
                o = $("#" + o).get(0)
            }
            if (typeof p == "string") {
                if (!o) {
                    o = $("#" + p + "_head").get(0)
                }
                p = $("#" + p).get(0)
            }
            if (!p || !o) {
                return
            }
            c = n || {};
            $(o).mousedown(function(q) {
                l = p;
                j = o;
                b(q)
            })
        }
    }
})();
YouBoy3C.ui.droplist = {
    attach: function() {}
};
YouBoy3C.ui.modal = (function() {
    var a = null;
    return {
        create: function(c, b) {
            var d = null;
            if (!c) {
                d = a && a.length > 0 ? a: $('<iframe src="javascript:void(0)"></iframe>').css({
                    opacity: 0,
                    background: "#000",
                    left: "0",
                    display: "none",
                    zIndex: 1100,
                    top: "0",
                    position: "absolute"
                });
                d.css({
                    width: $(window).width() + "px",
                    height: $(window).height() + "px"
                });
                d.appendTo($("body")).show();
                if (b) {
                    d.fixedPosition({
                        fixedTo: "top",
                        fixedTop: 0,
                        fixedLeft: 0
                    })
                } else {
                    d.css({
                        left: $(window).scrollLeft(),
                        top: $(window).scrollTop()
                    })
                }
            } else {
                d = $('<iframe style="z-index:-1;width:' + $(c).innerWidth() + "px;height:" + $(c).innerHeight() + 'px" src="javascript:void(0)" frameborder="0" scrolling="no" width="100%" height="100%"></iframe>').css({
                    opacity: 0,
                    background: "#FFF",
                    left: "0",
                    top: "0",
                    position: "absolute"
                });
                d.appendTo(c)
            }
            return d
        }
    }
})();
YouBoy3C.ui.popup = {
    _cssLoaded: false,
    _loadCss: function() {
        if (this._cssLoaded) {
            return
        }
        this._cssLoaded = true;
        var a = YouBoy3C.prefix.st + "/resource/css/package_v1.css";
        if (YouBoy3C.prefix.ssl) {
            a = YouBoy3C.prefix.st_ssl + "/resource/css/package_v1.css"
        }
        var b = false;
        $("link").each(function() {
            if ($(this).attr("href") == a) {
                b = true;
                return false
            }
        });
        if (!b) {
            $('<link href="' + a + '" rel="stylesheet" type="text/css" charset="utf-8" />').appendTo($("head"))
        }
    },
    _zIndex: 1101,
    create: function(b) {
        this._loadCss();
        var j = null,
        h = null,
        f = b || {},
        g = f.height > 50;
        f.width = f.width || 500;
        f.fixed = f.fixed === false ? false: true;
        var c = $('<div style="box-shadow:2px 2px 4px rgba(0, 0, 0, 0.5);z-index:' + (++this._zIndex) + ";" + (g ? ("height:" + f.height + "px") : "") + ";width:" + f.width + 'px;" class="layer_global"><div class="layer_global_main"><div class="layer_global_title"><h3><span class="jian">&gt;</span>' + (f.title || "温馨提示") + '<span></span></h3><button title="关闭" ytag="84777"><span class="none">?</span></button></div><div class="layer_global_cont layer_cont_15"></div></div></div>');
        c.appendTo($("body"));
        if (f.fixed) {
            c.fixedPosition({
                fixedTo: "top"
            })
        }
        j = c.find(".layer_global_main .layer_global_title")[0];
        h = c.find(".layer_global_main .layer_global_cont")[0];
        if (b.contWidth == "30") {
            $(h).removeClass("layer_cont_15").addClass("layer_cont_30")
        }
        function i(k) {
            c.mIframe = YouBoy3C.ui.modal.create(k, c.ifFixedPosition())
        }
        function d(l, n) {
            if (null == l) {
                l = c.width()
            }
            if (null == n) {
                n = c.height()
            }
            var o = $(window).width(),
            k = $(window).height();
            var q = (f.fullscreen && o < l ? 0 : (o / 2 - l / 2)),
            m = (f.fullscreen && k < n ? 0 : (k / 2 - n / 2));
            if (c.ifFixedPosition()) {
                c.fixedPosition({
                    fixedTo: "top",
                    fixedLeft: q,
                    fixedTop: m
                })
            } else {
                c.css("left", $(window).scrollLeft() + q + "px");
                c.css("top", $(window).scrollTop() + m + "px")
            }
            if (f.fullscreen && !c.mDiv) {
                var p = $("<div></div>").css({
                    opacity: 0.05,
                    background: "#000",
                    display: "none",
                    zIndex: 1101,
                    width: $(window).width() + "px",
                    height: $(window).height() + "px"
                }).appendTo("body");
                if (c.ifFixedPosition()) {
                    p.fixedPosition({
                        fixedTo: "top",
                        fixedLeft: 0,
                        fixedTop: 0
                    })
                } else {
                    p.css({
                        left: $(window).scrollLeft(),
                        top: $(window).scrollTop(),
                        position: "absolute"
                    })
                }
                p.show();
                if (!c.ifFixedPosition()) {
                    if ($.browser.msie) {
                        $("html").css({
                            overflow: "hidden"
                        })
                    } else {
                        $("body").css({
                            overflow: "hidden"
                        })
                    }
                }
                c.mDiv = p
            }
            if ($.browser.msie && $.browser.version >= 6 && !c.mIframe) {
                i(f.fullscreen ? null: c)
            }
        }
        function a(k) {
            if (f.fullscreen && c.mDiv) {
                c.mDiv.remove();
                c.mDiv = null;
                if (c.mIframe) {
                    c.mIframe.remove();
                    c.mIframe = null
                }
                if (!c.ifFixedPosition()) {
                    if ($.browser.msie) {
                        $("html").css({
                            overflow: "scroll",
                            "overflow-x": "hidden"
                        })
                    } else {
                        $("body").css({
                            overflow: "scroll",
                            "overflow-x": "hidden"
                        })
                    }
                }
            }
            if (k !== false && $.isFunction(f.closeFn)) {
                f.closeFn.apply(null)
            }
            c.hide()
        }
        $(j).children("button").click(a); ! f.disableDrag && YouBoy3C.ui.drag.enable(c.get(0), j, {
            fixed: c.ifFixedPosition()
        });
        if (g) {
            d(f.width, g ? f.height: 300)
        } else {
            a()
        }
        return {
            onclose: function(k) {
                f.closeFn = k
            },
            close: a,
            hide: a,
            show: function() {
                c.show();
                d()
            },
            paint: function(k) {
                if (!$.isFunction(k)) {
                    return
                }
                var l = {
                    header: j,
                    content: h
                };
                return k.apply(c, [l])
            },
            setAtCenter: d,
            resize: function(k) {
                if (!$.isPlainObject(k)) {
                    return
                }
                if (k.width) {
                    c.css("width", k.width + "px")
                }
                if (k.height > 50) {
                    c.css("height", k.height + "px");
                    $(h).height(k.height - 50)
                }
                d()
            }
        }
    },
    _msgPopup: null,

};

YouBoy3C.ui.template = {
    fillWithTPL: function(g, h, f, a, b) {
        if (!h) {
            return
        }
        if (!f && f !== false) {
            f = g + "_tpl"
        }
        a = (f === false) ? (a || "") : $("#" + f).html().replace(/^\s*<!--/, "").replace(/-->\s*$/, "");
        var d = {};
        a = a.replace(/<@([0-9a-zA-Z_-]+)@>((.|\s)*?)<@_\1@>/g,
        function(k, j, i) {
            d[j] = i;
            return "[#" + j + "#]"
        });
        $.each(d,
        function(j, i) {
            var k = [],
            l = h[j];
            if (l) {
                $.each(l,
                function(m, n) {
                    k.push(YouBoy3C.ui.template.fillWithTPL(false, n, false, i.replace(/<_index_>/g, m - 0 + 1)))
                })
            }
            d[j] = k.join("")
        });
        var c = a.replace(/\{([0-9a-zA-Z_-]+)\}/g,
        function(j, i) {
            return h[i] !== undefined ? h[i] : ""
        }).replace(/\[#([0-9a-zA-Z_-]+)#\]/g,
        function(j, i) {
            return d[i] !== undefined ? d[i] : i
        }).replace(/^\s+/, "");
        if (b || g === false) {
            return c
        } else {
            $("#" + g).html(c)
        }
    }
};
YouBoy3C.ui.tips = {
    err: function(c, b, a) {
        this._set(c, 2, b, a)
    },
    info: function(c, b, a) {
        this._set(c, 0, b, a)
    },
    warn: function(c, b, a) {
        this._set(c, 1, b, a)
    },
    suc: function(c, b, a) {
        this._set(c, 3, b, a)
    },
    help: function(c, b, a) {
        this._set(c, 4, b, a)
    },
    none: function(b, a) {
        this._set(false, 0, b, a)
    },
    _set: function(h, b, f, d) {
        d = $.extend({
            autoHide: true,
            style: ""
        },
        d || {});
        if (d.style != "inner" && d.style != "bigtop") {
            d.style = ""
        }
        var a = "tips" + d.style,
        c = "tipstimeout" + d.style;
        if ($(f).data(c)) {
            clearTimeout($(f).data(c));
            $(f).removeData(c)
        }
        var g = $(f).data(a),
        j = d.style == "bigtop" ? "big": "";
        if (!g || g.parent().length == 0) {
            g = $(YouBoy3C.logic.constants.getTipStr(h, b, false, j));
            $(f).data(a, g);
            if (d.style == "inner") {
                f.empty().append(g)
            } else {
                if (d.style == "bigtop") {
                    g.insertBefore(f)
                } else {
                    g.insertAfter(f)
                }
            }
        }
        g.hide();
        if (h === false) {
            return
        }
        if (b == null || !(b in YouBoy3C.logic.constants.tipsLevel)) {
            b = 0
        }
        var i = "";
        if (d.style == "bigtop") {
            i = "para_blo para_" + YouBoy3C.logic.constants.tipsLevel[b]
        } else {
            i = "para_inb para_" + YouBoy3C.logic.constants.tipsLevel[b]
        }
        g.empty().html(YouBoy3C.logic.constants.getTipStr(h, b, true, j)).removeClass().addClass(i).fadeIn(200);
        if (d.autoHide) {
            $(f).data(c, setTimeout(function() {
                g && g.fadeOut(200)
            },
            $.type(d.autoHide) == "boolean" ? 5000 : d.autoHide))
        }
    },
    setLoading: function(a) {},
    unsetLoading: function(a) {},
    swapInput: function(a) {
        if (!a || !a.target) {
            return null
        }
        a.defaultValue = a.defaultValue || "";
        a.focusClass = a.focusClass || "";
        a.blurClass = a.blurClass || "";
        $(a.target).focus({
            opt: a
        },
        function(c) {
            var b = $(this).val(); (b == c.data.opt.defaultValue || b == "") && $(this).val("");
            $(this).removeClass(c.data.opt.blurClass).addClass(c.data.opt.focusClass)
        }).blur({
            opt: a
        },
        function(c) {
            var b = $(this).val();
            if (b == c.data.opt.defaultValue || b == "") {
                $(this).val(c.data.opt.defaultValue).removeClass(c.data.opt.focusClass).addClass(c.data.opt.blurClass)
            } else {
                $(this).removeClass(c.data.opt.blurClass).addClass(c.data.opt.focusClass)
            }
        });
        $(a.target).blur();
        return $(a.target)
    }
};
YouBoy3C.ui.page = function(a, k, d, g) {
    a += "";
    k -= 0;
    d -= 0;
    g = g || 3;
    if (d < 2) {
        return ""
    }
    var b = k - g,
    f = k + g;
    str = "";
    if (b <= 4) {
        b = 2
    }
    b = b > 1 ? b: 2;
    f = f < d ? (f < k ? k: f) : (d - 1);
    var l = "";
    if (a.indexOf("javascript:") == 0) {
        l = ' href="#" onclick="' + a.substr(11) + ';return false"'
    } else {
        l = ' href="' + a + '"'
    }
    str += k == 1 ? '<span class="page-start"><b>&lt;</b>上一页</span>': ("<a" + l.replace(/\{page\}/g, k - 1) + ' class="page-prev"><b>&lt;</b>上一页</a>');
    str += k == 1 ? '<span class="page-this">1</span>': ("<a" + l.replace(/\{page\}/g, 1) + ">1</a>");
    if (b != 2) {
        str += '<span class="page-break">...</span>'
    }
    for (var h = b; h < f + 1; h++) {
        if (h == k) {
            str += '<span class="page-this">' + k + "</span>"
        } else {
            str += "<a" + l.replace(/\{page\}/g, h) + ">" + h + "</a>"
        }
    }
    if (f != d - 1) {
        str += '<span class="page-break">...</span>'
    }
    str += k != d ? ("<a" + l.replace(/\{page\}/g, d) + ">" + d + "</a>") : ('<span class="page-this">' + d + "</span>");
    str += k != d ? ("<a" + l.replace(/\{page\}/g, k + 1) + ' class="page-next">下一页<b>&gt;</b></a>') : '<span class="page-end">下一页<b>&gt;</b></span>';
    var j = a.indexOf("javascript:") == 0 ? "$.globalEval('" + a.substr(11).replace(/'/g, "\\'").replace(/\{page\}/g, "'+a+'") + "')": ("location.href='" + a.replace(/'/g, "\\'").replace(/\{page\}/g, "'+a+'") + "'"),
    c = "var a=parseInt($('input[name=iptpage]',$(this).parent()).val(),10);a=(!!a&&a>0&&a<=" + d + ")?a:1;" + j + ";";
    str += '<span class="page-skip"> 到第<input type="text" value="' + k + '" maxlength="3" name="iptpage" onkeydown="if(event.keyCode==13){$(\'button[name=go]\',$(this).parent()).click();return false;}">页<button name="go" value="go" onclick="' + c + 'return false">确定</button></span>';
    return str
};
 
YouBoy3C.logic.validate = {
    checkURL: function(b) {
        var a = /^(https?:\/\/|ftp:\/\/)?(([a-z0-9\-]*\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel)|(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;\/]*)?)?(#[a-z][a-z0-9+_\-\.%=&amp;\/]*)?$/i;
        return a.test(b)
    },
    checkMobilePhone: function(b) {
        var a = /^((\(\d{3}\))|(\d{3}\-))?1\d{10}$/;
        return a.test(b)
    },
    checkEmail: function(a) {
        return /^[a-z0-9_\-]+(\.[_a-z0-9\-]+)*@([_a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel)$/i.test(a)
    },
    checkTelephone: function(d, a) {
        var c = /^([0-9]{3}|0[0-9]{3})-[1-9][0-9]{6,7}(-[0-9]{1,6})?$/,
        b = /^[0-9]{4}-([0-9]{3}|0[0-9]{3})-[0-9]{7,8}$/,
        a = a || (1 | 2);
        if (((a & 1) == 1) && c.test(d)) {
            return true
        }
        if (((a & 2) == 2) && b.test(d)) {
            return true
        }
        return false
    },
    checkPhone: function(a) {
        return this.checkTelephone(a) || this.checkMobilePhone(a)
    },
    checkNumber: function(a) {
        return /^[1-9]\d*$/.test(a)
    },
    checkChars: function(c, a) {
        var b = "^[";
        a = a || (1 | 2 | 4);
        if ((a & 1) == 1) {
            b += "\u4E00-\u9FA5"
        }
        if ((a & 2) == 2) {
            b += "a-zA-Z"
        }
        if ((a & 4) == 4) {
            b += "0-9"
        }
        b += "]*$";
        return (new RegExp(b, "")).test(c)
    },
    checkOrderId: function(a) {
        return a && a.length == 10 && YouBoy3C.logic.validate.checkNumber(a)
    },
    lenMon: function(b) {
        if (!b || !b.target) {
            return null
        }
        b = {
            target: b.target,
            minLen: b.minLen || 0,
            maxLen: b.maxLen || Infinity,
            sucClass: b.sucClass || "",
            failClass: b.failClass || "",
            defaultValue: b.defaultValue || "",
            tipCtrl: b.tipCtrl || null,
            charLenStyle: b.charLenStyle || false
        };
        function a() {
            var c = $(b.target).val(),
            d = b.charLenStyle ? $.strlen(c) : c.length;
            d = c == b.defaultValue ? 0 : d;
            if (b.tipCtrl) {
                $(b.tipCtrl).html("<b>" + d + "</b>/" + b.maxLen);
                if (d < b.minLen || d > b.maxLen) {
                    $("b", b.tipCtrl).removeClass(b.sucClass).addClass(b.failClass)
                } else {
                    $("b", b.tipCtrl).removeClass(b.failClass).addClass(b.sucClass)
                }
            }
        }
        a();
        return $(b.target).keyup(a).bind("paste", a)
    }
};
YouBoy3C.logic.header = {
    _Q_SHOW_DEF_TEXT: "输入品牌或商品进行搜索",
    loginStatus: function() {
        //YouBoy3C.logic.login.updateHead();
        YouBoy3C.ui.tips.swapInput({
            target: $("#q_show"),
            defaultValue: YouBoy3C.logic.header._Q_SHOW_DEF_TEXT,
            focusClass: "mod_search_txt",
            blurClass: "mod_search_txt no_cur"
        });
        if ($.browser.msie && $.browser.version == 6) {
            $("#q_show").next().click(function() {
                if (YouBoy3C.logic.header.query()) {
                    $(this).parents("form")[0].submit()
                }
            })
        }
        this.setBust();
        this.category.init();
        this.getHotKey();
        this.recordLs();
        this.autoComplete();
        $(function() {
            logStat.initStat()
        })
    },
    setBust: function() {
        try {
            if (window.top !== window.self) {
                try {
                    if (window.top.location.host) {} else {
                        this.bust()
                    }
                } catch(a) {
                    this.bust()
                }
            }
        } catch(a) {}
    },
    bust: function() {
        document.write = "";
        if (location.host == "admin.icson.com") {
            return
        }
        window.top.location = window.self.location;
        setTimeout(function() {
            document.body.innerHTML = ""
        },
        0);
        window.self.onload = function(a) {
            document.body.innerHTML = ""
        }
    },
    recordLs: function() {
        var a = YouBoy3C.util.parse.url();
        $.each(a,
        function(b, c) {
            $.each(c,
            function(f, d) {
                f = (f + "").toLowerCase();
                if (f == "ls" || f == "us") {
                    YouBoy3C.util.cookie.add(f, d, "/", 7 * 24 * 3600, ".51buy.com")
                }
            })
        })
    },
    autoComplete: function() {
        function a() {
            //YouBoy3C.logic.constants.getWhId(function(c) {})
        }
        $(a)
    },
    
    query: function() {
        var d = $("#q_show"),
        c = $.trim(d.val()),
        f = true,
        b = d.attr("_href");
        if (c === YouBoy3C.logic.header._Q_SHOW_DEF_TEXT && b) {
            window.location.href = b;
            f = false
        } else {
            if (c === "" || c === YouBoy3C.logic.header._Q_SHOW_DEF_TEXT) {
                d.focus();
                f = false
            }
        }
        if ($("#q_show").parents("form").find('input[name="YTAG"]').length === 0) {
            var a = (window.yPageLevel || 0) + "." + (window.yPageId || 0) + "02000";
            $("#q_show").parents("form").append($('<input type="hidden" name="YTAG" value="' + a + '" />'))
        }
        return f
    },
    getHotKey: function() {
        var c = $("#i_keyword");
        if (c.length === 0) {
            return
        }
       var b = "";
    },
    
    category: {
        config: {
            headIn: 10,
            headOut: 100,
            panelOut: 200,
            liIn: 100
        },
        ytag_base: 85,
        FIRSTTPL: '<div id="i_sort_list"><div class="cate_normal"><@first_list@><div cateid="{id}" class="item"><div class="item_hd""><dl><dt class="top_cate"><a href="{url}">{text}<i class="dot_cate"></i></a></dt><dd class="sub_cate"><@key_list@><a href="{url}">{name}</a><@_key_list@></dd></dl></div><div class="item_bd"></div></div><@_first_list@></div><div class="cate_easy"><@easy_list@><div cateid="{id}" class="item"><div class="item_hd"><dl><dt class="top_cate"><a href="{url}">{text}<i class="dot_cate"></i></a></dt></dl></div><div class="item_bd"></div></div><@_easy_list@></div></div>',
        SECONDTPL: '{iframe_str}<div class="list"><@second_list@><dl><dt class="t">{second_name}</dt><dd><@third_list@><a hotname="I.CATEGORY.SECOND.{index}" href="{url}" ytag="{ytag}">{name}</a><@_third_list@></dd></dl><@_second_list@></div>				<div class="hot">					<@recommend_list@>						<p class="t">{recommend_name}</p>					<ul>						<@recommend_link_list@><li><a hotname="I.CATEGORY.RECOMMEND.{index}" href="{recommend_link_url}">{recommend_link_name}</a></li><@_recommend_link_list@></ul><@_recommend_list@></div>',
        renderFirst: function() {
            var c = this,
            category_panel = $("#category_panel");
            if (category_panel.length == 0) {
                return
            }
            var category_configJS = window.CATEGORY_CONFIG,
            f = {
                first_list: [],
                easy_list: []
            };
            var d = 1;
            $.each(window.CATEGORY_CONFIG,
            function(h, k) {
                var l = {
                    id: h,
                    ytag: (c.ytag_base + d - 1) * 1000,
                    index: d,
                    url: k.url + (k.url === "#" ? '" onclick="return false': '" style="cursor:pointer'),
                    text: k.text,
                    key_list: [],
                    citem: ((d == 1) || (d == 2) || (d == 5)) ? 'class="item"': ""
                },
                g = l.index,
                j = 1;
                d++;
                k.keyword = k.keyword || [];
                $.each(k.keyword,
                function(i, m) {
                    l.key_list.push({
                        name: m.text,
                        url: m.url,
                        ytag: j > 10 ? "": ((c.ytag_base + g - 1) * 1000 + j * 100),
                        index: g + "." + j
                    });
                    j++ 
                });
                if (k.highlight) {
                    f.first_list.push(l)
                } else {
                    f.easy_list.push(l)
                }
            });
            category_panel.html(YouBoy3C.ui.template.fillWithTPL(false, f, false, c.FIRSTTPL));
            $("#i_sort_list .cate_easy>div:first-child").addClass("item_first");
            category_panel.mouseleave(function() {
                c.clearTimeout();
                c.panelOutTimer = setTimeout(function() {
                    $("#i_sort_list>div>div").removeClass("item_hover");
                    $("#i_sort_list>div>div .i_cont_iframe").css({
                        display: "none"
                    });
                    c.needSlide && $("#category_container").removeClass("i_status_on")
                },
                c.config.panelOut)
            })
        },
        clearTimeout: function() {
            this.headInTimer && clearTimeout(this.headInTimer);
            this.headOutTimer && clearTimeout(this.headOutTimer);
            this.panelOutTimer && clearTimeout(this.panelOutTimer);
            this.liInTimer && clearTimeout(this.liInTimer);
            this.headInTimer = 0;
            this.headOutTimer = 0;
            this.panelOutTimer = 0;
            this.liInTimer = 0
        },
        renderSecond: function(i) {
            var j = this,
            b = $(i).index();
            isIE6 = ($.browser.msie && $.browser.version == 6),
            iframe_str = isIE6 ? '<iframe class="i_cont_iframe" style="width:0px;height:0px"></iframe>': "",
            dataSource = {
                second_list: [],
                recommend_list: [],
                iframe_str: iframe_str
            },
            secondIndex = 1;
            $.each(window.CATEGORY_CONFIG[i.attr("cateid")]["list"],
            function(k, l) {
                var m = {
                    second_name: l.text,
                    third_list: []
                },
                n = 1;
                $.each(l.list,
                function(o, p) {
                    m.third_list.push({
                        name: p.text,
                        url: p.url,
                        ytag: n > 10 ? "": ((j.ytag_base + b) * 1000 + secondIndex * 10 + n - 1),
                        index: b + "." + secondIndex + "." + n
                    });
                    n++
                });
                dataSource.second_list.push(m);
                secondIndex++
            });
            secondIndex = 1;
            $.each(window.CATEGORY_CONFIG[i.attr("cateid")]["recommend"] || {},
            function(k, m) {
                var n = {
                    recommend_name: m.name,
                    recommend_link_list: []
                },
                l = m.list.length,
                o = 1;
                $.each(m.list,
                function(p, q) {
                    n.recommend_link_list.push({
                        recommend_link_name: q.text,
                        recommend_link_url: q.url,
                        index: b + "." + secondIndex + "." + o
                    });
                    o++
                });
                dataSource.recommend_list.push(n);
                secondIndex++
            });
            var g = i.find(".item_bd");
            g.html(YouBoy3C.ui.template.fillWithTPL(false, dataSource, false, this.SECONDTPL));
            isIE6 && g.find(".i_cont_iframe").css({
                width: g.width(),
                height: g.height()
            });
            var d = 7,
            a = parseFloat(i.offset()["top"], 10),
            f = parseFloat(i.outerHeight(), 10),
            c = parseFloat(g.outerHeight(), 10),
            h = parseFloat($("#category_panel").offset()["top"], 10);
            cateH = parseFloat($("#category_panel").outerHeight(), 10);
            panelTop = 0 - (c - f) / 2;
            if (panelTop < h - a) {
                panelTop = h - a - 2
            }
            g.css({
                top: panelTop + "px"
            })
        },
        mousehover: function(a) {
            $("#i_sort_list>div>div").removeClass("item_hover");
            $("#i_sort_list>div>div .i_cont_iframe").css({
                display: "none"
            });
            a.addClass("item_hover");
            a.find(".i_cont_iframe").css({
                display: ""
            });
            if (!a.data("rendered")) {
                a.data("rendered", true);
                this.renderSecond(a)
            }
        },
        showPanel: function() {
            var a = this;
            a.sendRequest(function() {
                a.renderFirst();
                $("#i_sort_list>div>div").mouseenter(function() {
                    var b = $(this);
                    a.clearTimeout();
                    a.liInTimer = setTimeout(function() {
                        if (false === b.hasClass("item_hover")) {
                            a.mousehover(b)
                        }
                    },
                    a.config.liIn)
                })
            })
        },
        sendRequest: function(b) {
            var a = this;
            a.callbackList = a.callbackList || [];
            if (window.CATEGORY_CONFIG === undefined) {
                a.callbackList.push(b);
                //YouBoy3C.logic.constants.getWhId(function(d) {})
            } else {
                b.call(a)
            }
        },
        init: function() {
            var b = this,
            category_container = $("#category_container");
            if (category_container.length === 0) {
                return
            }
            var c = b.needSlide = !category_container.hasClass("i_status_on");
            c && category_container.find(">h3:first-child").hover(function() {
                b.clearTimeout();
                b.headInTimer = setTimeout(function() {
                    category_container.addClass("i_status_on");
                    $("#i_sort_list>div>div").removeClass("item_hover");
                    $("#i_sort_list>div>div .i_cont_iframe").css({
                        display: "none"
                    });
                    b.showPanel()
                },
                b.config.headIn)
            },
            function() {
                b.clearTimeout();
                b.headOutTimer = setTimeout(function() {
                    category_container.removeClass("i_status_on")
                },
                b.config.headOut)
            }); ! c && b.showPanel()
        }
    },
    initDefaultSearch: function() {
        var f = window.YouBoy3C !== undefined && window.YouBoy3C.page !== undefined && window.YouBoy3C.page.defaultSearch != undefined && !$.isEmptyObject(YouBoy3C.page.defaultSearch);
        if (f === false) {
            return
        }
        var d = YouBoy3C.page.defaultSearch;
        var g = $.trim(YouBoy3C.page.defaultSearch.title);
        var b = $.trim(YouBoy3C.page.defaultSearch.href);
        if (!g || !b) {
            return
        }
        var a = $("#q_show"),
        c = a.data("events");
        if (!c || !c.focus) {
            return
        }
        a.data("events").focus[0].data.opt.defaultValue = g;
        YouBoy3C.logic.header._Q_SHOW_DEF_TEXT = g;
        a.val(g).attr("_href", b)
    }
};
logStat = {
    getLog: function(g) {
        var h = g.target,
        f, a, d, c, b;
        if (h.getAttribute("lg")) {
            d = h
        } else {
            if (h.parentNode && h.parentNode.tagName == "A" && h.parentNode.getAttribute("lg")) {
                d = h.parentNode
            }
        }
        if (d) {
            c = d.getAttribute("lg");
            c = c + (d.getAttribute("pos") ? "{|}" + d.getAttribute("pos") : "{|}1");
            if (d.getAttribute("href") && d.getAttribute("href").indexOf("#") == -1) {
                c = c + "{|}" + escape(d.getAttribute("href"))
            } else {
                if (d.getAttribute("title")) {
                    c = c + "{|}" + d.getAttribute("title")
                } else {
                    if (d.getAttribute("alt")) {
                        c = c + "{|}" + d.getAttribute("alt")
                    } else {
                        if (d.tagName == "INPUT" || d.tagName == "BUTTON" || d.innerText == "") {
                            b = (d.id) ? d.id: d.name;
                            b = (b) ? b: d.tagName;
                            c = c + "{|}" + b
                        } else {
                            c = c + "{|}" + d.innerText
                        }
                    }
                }
            }
            if (d.getAttribute("lgType")) {
                c = d.getAttribute("lgType") + "{|}" + c
            } else {
                if (d.getAttribute("target") === "_blank") {
                    c = "0{|}" + c
                } else {
                    c = "1{|}" + c
                }
            }         
        }
    },
    initStat: function(c) {
        if (c) {
            for (var a in c) {
                this[a] = c[a]
            }
        }
        $(document).bind("click", logStat.getLog);
        /*var b = YouBoy3C.util.cookie.get("lgStat");
        if (b) {
            setTimeout(function() {
                logStat.loadScript(b + "?t=" + (new Date).getTime());
                YouBoy3C.util.cookie.del("lgStat", ".51buy.com")
            },
            0)
        }*/
    },
    loadScript: function(a, c, b) {
        setTimeout(function() {
            var d = document.createElement("script"),
            f = new Date().getTime(),
            g = b || {},
            h = g.charset || "gb2312";
            c = c ? (c + f) : f,
            a = a;
            d.charset = h;
            d.id = c;
            document.getElementsByTagName("head")[0].appendChild(d);
            d.src = a;
            return d
        },
        0)
    }
};
if (!$.browser.msie) {
    HTMLElement.prototype.__defineGetter__("innerText",
    function() {
        var a = "";
        var c = this.childNodes;
        for (var b = 0; b < c.length; b++) {
            if (c[b].nodeType == 1) {
                a += c[b].innerText
            } else {
                if (c[b].nodeType == 3) {
                    a += c[b].nodeValue
                }
            }
        }
        return a
    })
};
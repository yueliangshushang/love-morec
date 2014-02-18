$.extend($, {
    strlen: function(a) {
        if (typeof a != "string") {
            return 0
        }
        return a.replace(/[^\x00-\xff]/gi, "xx").length
    }
});
var G = {};
G.DOMAIN = {
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
};
G.prefix = {
    st: "http://st.51buy.com/",
    ssl: false,
    st_ssl: "https://st.51buy.com/"
};
G.createFnQueue = function(a) {
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
G.app = {};
G.logic = {};
G.ui = {};
G.util = {};
if ($.browser.msie && parseInt($.browser.version, 10) < 7) {
    try {
        document.execCommand("BackgroundImageCache", false, true)
    } catch(e) {}
}
G.util.cookie = {
    get: function(b) {
        var c = new RegExp("(^|;|\\s+)" + b + "=([^;]*)(;|$)");
        var a = document.cookie.match(c);
        return (!a ? "": unescape(a[2]))
    },
    add: function(c, b, h, a, g) {
        var f = c + "=" + escape(b) + "; path=" + (h || "/") + (g ? ("; domain=" + g) : "");
        if (a > 0) {
            var i = new Date();
            i.setTime(i.getTime() + a * 1000);
            f += ";expires=" + i.toGMTString()
        }
        document.cookie = f
    },
    del: function(a, b) {
        document.cookie = a + "=;path=/;" + (b ? ("domain=" + b + ";") : "") + "expires=" + (new Date(0)).toGMTString()
    }
};
G.util.post = function(c, g, b) {
    G.util.post.pIndex = (G.util.post.pIndex || 0) + 1;
    var d = $('<iframe name="pIframe_' + G.util.post.pIndex + '" src="about:blank" style="display:none" width="0" height="0" scrolling="no" allowtransparency="true" frameborder="0"></iframe>').appendTo($(document.body));
    var a = [];
    $.each(g,
    function(i, h) {
        a.push('<input type="hidden" name="' + i + '" value="" />')
    });
    if (!/(\?|&(amp;)?)fmt=[^0 &]+/.test(c)) {
        c += (c.indexOf("?") > 0 ? "&": "?") + "fmt=1"
    }
    var f = $('<form action="' + c + '" method="post" target="pIframe_' + G.util.post.pIndex + '">' + a.join("") + "</form>").appendTo($(document.body));
    $.each(g,
    function(i, h) {
        f.children("[name=" + i + "]").val(h)
    });
    d[0].callback = function(h) {
        if (typeof b == "function") {
            b(h)
        }
        $(this).src = "about:blank";
        $(this).remove();
        f.remove();
        d = f = null
    };
    if ($.browser.msie && $.browser.version == 6) {
        d[0].pIndex = G.util.post.pIndex;
        d[0].ie6callback = function() {
            f.target = "pIframe_" + this.pIndex;
            f.submit()
        };
        d[0].src = location.protocol + "//st.51buy.com/static_v1/htm/ie6post.htm"
    } else {
        f.submit()
    }
};
G.util.parse = {
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
        var f = G.util.parse.getTimeInfo(c);
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
G.util.localShare = (function() {
    var c = G.createFnQueue(),
    a = 0,
    b = false;
    return function(f) {
        c.add(f);
        if (a == 2 && b) {
            c.exec(b);
            return
        }
        if (a == 1) {
            return
        }
        a = 1;
        var d = "1.1";
        $.ajax({
            url: "http://st.icson.com/static_v1/js/app/localShare.js?v=" + d,
            dataType: "script",
            crossDomain: true,
            cache: true,
            scriptCharset: "gb2312",
            success: function() {
                G.app.localShare(function() {
                    a = 2;
                    b = this,
                    c.exec(b)
                })
            }
        })
    }
})();
G.util.ping = {
    VISIT_INFO_KEY: "vinfo",
    _visMap: ["lastVisit"],
    _performance: false,
    getVisitInfo: function() {
        var a = G.util.ping,
        c = G.util.cookie.get(a.VISIT_INFO_KEY),
        b = {};
        c = c.split(",");
        $.each(a._visMap,
        function(f, d) {
            b[d] = c[f] || ""
        });
        return b
    },
    setVisitInfo: function(b, f) {
        var a = G.util.ping,
        g = a.getVisitInfo(),
        d = {},
        c = [];
        if (arguments.length < 2) {
            d = b
        } else {
            d[b] = f
        }
        g = $.extend(g, b);
        $.each(a._visMap,
        function(i, h) {
            c[i] = g[h] || ""
        });
        G.util.cookie.add(a.VISIT_INFO_KEY, c.join(","), "/", 24 * 3600 * 365, ".51buy.com")
    },
    getPerformanceTiming: function() {
        var c = G.util.ping;
        if (c._performance === false) {
            var b = window.performance;
            if (!b || !b.timing) {
                return []
            } else {
                var g = ["navigationStart", "unloadEventStart", "unloadEventEnd", "redirectStart", "redirectEnd", "fetchStart", "domainLookupStart", "domainLookupEnd", "connectStart", "connectEnd", "requestStart", "responseStart", "responseEnd", "domLoading", "domInteractive", "domContentLoadedEventStart", "domContentLoadedEventEnd", "domComplete", "loadEventStart", "loadEventEnd"],
                f = [];
                for (var a = g.length,
                d = a - 1; d >= 1; d--) {
                    f[d] = b.timing[g[d]] - b.timing[g[0]]
                }
                c._performance = f
            }
        }
        return c._performance
    },
    timeStat: (function() {
        var c = "http://isdspeed.qq.com/cgi-bin/r.cgi",
        b = 2000,
        a = 1470;
        function d(h, j, i, g) {
            var f = (function(k, m, l, n) {
                return function() {
                    if (($.type(k) == "array" && k.length == 0) || $.isEmptyObject(k)) {
                        return
                    }
                    var o = ["flag1=" + a, "flag2=" + m, "flag3=" + l],
                    p = new Image();
                    $.each(k,
                    function(s, r) {
                        if (s != 0) {
                            o.push(s + "=" + (r <= 0 ? 0 : r))
                        }
                    });
                    n = n || {};
                    for (var q in n) {
                        o.push(q + "=" + n[q])
                    }
                    p.src = c + "?" + o.join("&")
                }
            })(h, j, i, g);
            setTimeout(f, b)
        }
        return d
    })(),
    reportPerformance: function(b, a, c) {
        var d = window.onload;
        window.onload = function() {
            if ($.isFunction(d)) {
                d.apply(window)
            }
            d = null;
            setTimeout(function() {
                G.util.ping.timeStat(G.util.ping.getPerformanceTiming(), b, a, c)
            },
            2000)
        }
    },
    reportItemPicLoad: function(b, a) {
        var c = 2000;
        var f = (new Date()).getTime() - b;
        var d = "http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=1470&flag2=50&flag3=" + (a ? 9 : 10) + "&1=" + f;
        setTimeout(function() { (new Image()).src = d
        },
        c)
    },
    init: function(b, d) {
        var a = G.util.ping.getVisitInfo(),
        c = Math.round((new Date()).getTime() / 1000);
        if ((c - (a.lastVisit || 0) >= 300) && G.logic.login.getLoginUid()) { (new Image()).src = "http://isdspeed.qq.com/cgi-bin/v.cgi?flag1=320001&flag2=1&flag3=600&1=1&2=0";
            a.lastVisit = c;
            G.util.ping.setVisitInfo(a)
        }
        if (G.util.cookie.get("visitkey").length != 10) {
            G.util.cookie.add("visitkey", Math.round((new Date()).getTime() / 1000), "/", 2838240000, ".51buy.com")
        }
        $(document).ready(function() {
            if (!b) {
                var f = location.host.replace(/\.51buy\.com/, "");
                b = location.pathname;
                if (location.pathname == "/index.php" || location.pathname == "/json.php") {
                    var h = G.util.parse.url();
                    if (h.search.mod) {
                        b = location.pathname.substr(0, location.pathname.length - 4) + "_" + h.search.mod + "_" + (h.search.act || "page")
                    }
                }
            }
            var g = G.util.cookie.get("wsid"),
            i = G.util.cookie.get("ws_c");
            if (parseInt(i) == 3001) {
                g = 3001
            }
            b = "/_site_" + g + "/" + f + b;
            $.ajax({
                url: "http://st.icson.com/static_v1/js/app/ping.js?v=1.3",
                dataType: "script",
                type: "get",
                cache: true,
                success: function() {
                    if (!G.app.ping) {
                        return
                    }
                    $(document).click(function(j) {
                        if (G.app.ping.stat) {
                            G.app.ping.statClick(j && j.target, {
                                pageid: window.yPageId || 0,
                                plevel: window.yPageLevel || 0
                            })
                        }
                    });
                    setTimeout(function() {
                        G.app.ping.stat({
                            pageid: window.yPageId || 0,
                            plevel: window.yPageLevel || 0
                        })
                    },
                    100)
                }
            });
            $.ajax({
                url: "http://mat1.gtimg.com/mini2009/js/cdn/pingMini.js",
                dataType: "script",
                type: "get",
                cache: true,
                success: function() {
                    pgvMain("", {
                        virtualDomain: "icson_" + g + ".qq.com",
                        virtualURL: b
                    });
                    window.pp_req_url = document.URL.replace(/^http:\/\/([^\/]+)(\/|$)/, "http://$1/_site_" + g + "/");
                    $.ajax({
                        url: "http://static.paipaiimg.com/js/pp.foot.20100630.js?t=20110726153054",
                        dataType: "script",
                        type: "get",
                        cache: true,
                        success: function() {
                            if (typeof(pgvMain) == "function") {
                                setTimeout(function() {
                                    pgvMain("", {
                                        virtualDomain: d || "icson.qq.com",
                                        virtualURL: b,
                                        hot: true
                                    });
                                    $(document).click(function(m) {
                                        var k = "a,img,button,input,textarea,select",
                                        l = m && m.target;
                                        if (l && k.indexOf(l.nodeName.toString().toLowerCase()) !== -1 && $.isFunction(window.pgvSendClick)) {
                                            while (l && l.nodeName.toString() !== "BODY") {
                                                var j = l.getAttribute("hotName") || l.getAttribute("hotname");
                                                if (j) {
                                                    j += "";
                                                    pgvSendClick({
                                                        virtualDomain: "icson.qq.com",
                                                        virtualURL: b,
                                                        hottag: j.replace(/^(I\.)?(.*)$/i,
                                                        function(o, n, p) {
                                                            return g + "." + p
                                                        })
                                                    });
                                                    pgvSendClick({
                                                        virtualDomain: "icson_" + g + ".qq.com",
                                                        virtualURL: b,
                                                        hottag: j.replace(/^(I\.)?(.*)$/i,
                                                        function(o, n, p) {
                                                            return g + "." + p
                                                        })
                                                    })
                                                }
                                                l = l.parentNode
                                            }
                                        }
                                    })
                                },
                                1)
                            }
                        }
                    })
                }
            });
            if (/clickstream=false/.test(window.location.href)) {
                G.util.cookie.del("clickstream", ".51buy.com")
            } else {
                if (/clickstream=true/.test(window.location.href)) {
                    G.util.cookie.add("clickstream", "true", "/", 1800, ".51buy.com")
                }
            }
            if (G.util.cookie.get("clickstream") == "true" || (window.sessionStorage && (window.sessionStorage.getItem("clickstream") == "true"))) {
                $.ajax({
                    url: "http://st.icson.com/static_v1/statistic/js/stat.ui.js?v=1.3",
                    dataType: "script",
                    crossDomain: true,
                    cache: true,
                    scriptCharset: "utf-8",
                    success: function() {}
                })
            }
        })
    }
}; (function(a, c, d) {
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
})(G, jQuery); (function(a, c, f) {
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
    G.ui.autoComplete = b
})(window, jQuery); (function(G, $, window, undefined) {
    var $$ = function(path, s) {
        this.instance = "jswf_" + (new Date).getTime();
        var options = this.options = $.extend({},
        $$.options, s);
        var id = this.id = options.id || this.instance;
        var container = $(options.container || "<div></div>");
        $$.CallBacks[this.instance] = {};
        var params = options.params,
        vars = options.vars,
        callBacks = options.callBacks;
        var properties = $.extend({},
        {
            height: options.height,
            width: options.width
        },
        options.properties);
        var self = this;
        for (var callBack in callBacks) {
            $$.CallBacks[this.instance][callBack] = (function(option) {
                return function() {
                    return option.apply(self.object, arguments)
                }
            })(callBacks[callBack]);
            vars[callBack] = "G.ui.swf.CallBacks." + this.instance + "." + callBack
        }
        params.flashVars = $.param(vars);
        if ($.browser.msie) {
            properties.classid = "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000";
            properties.codebase = "http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0";
            params.movie = path
        } else {
            properties.type = "application/x-shockwave-flash";
            properties.data = path
        }
        var build = ['<object id="', id, '"'];
        for (var property in properties) {
            build.push(" ", property, '="', properties[property], '"')
        }
        build.push(">");
        for (var param in params) {
            if (params[param] !== undefined) {
                build.push('<param name="', param, '" value="', params[param], '" />')
            }
        }
        build.push("</object>");
        $.each(container,
        function(i, v) {
            v.innerHTML = build.join("")
        });
        this.getObject()
    };
    $.extend($$, {
        options: {
            id: null,
            height: 1,
            width: 1,
            container: null,
            properties: {
                align: "middle"
            },
            params: {
                quality: "high",
                allowScriptAccess: "always",
                wMode: "transparent",
                swLiveConnect: true,
                menu: false
            },
            callBacks: {},
            vars: {}
        },
        CallBacks: {},
        remote: function(obj, fn) {
            var rs = obj.CallFunction('<invoke name="' + fn + '" returntype="javascript">' + __flash__argumentsToXML(arguments, 2) + "</invoke>");
            return eval(rs)
        }
    });
    $.extend($$.prototype, {
        toElement: function() {
            return this.object
        },
        getObject: function() {
            var self = this;
            this.object = document[this.id] || window[this.id];
            if (!this.object) {
                setTimeout(function() {
                    self.getObject()
                },
                1)
            }
        },
        remote: function() {
            var par = [this.toElement()];
            for (var i = 0,
            len = arguments.length; i < len; i++) {
                par.push(arguments[i])
            }
            return $$.remote.apply($$, par)
        }
    });
    $$.getVersion = function() {
        var n = navigator;
        if (n.plugins && n.mimeTypes.length) {
            var plugin = n.plugins["Shockwave Flash"];
            if (plugin && plugin.description) {
                return plugin.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s)+r/, ".") + ".0"
            }
        } else {
            if (window.ActiveXObject && !window.opera) {
                for (var i = 10; i >= 2; i--) {
                    try {
                        var c = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + i);
                        if (c) {
                            var version = c.GetVariable("$version");
                            return version.replace(/WIN/g, "").replace(/,/g, ".")
                        }
                    } catch(e) {}
                }
            }
        }
    };
    G.ui.swf = $$
})(G, jQuery, window);
G.ui.drag = (function() {
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
G.ui.droplist = {
    attach: function() {}
};
G.ui.modal = (function() {
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
G.ui.popup = {
    _cssLoaded: false,
    _loadCss: function() {
        if (this._cssLoaded) {
            return
        }
        this._cssLoaded = true;
        var a = G.prefix.st + "static_v1/css/package/package_v1.css";
        if (G.prefix.ssl) {
            a = G.prefix.st_ssl + "static_v1/css/package/package_v1.css"
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
            c.mIframe = G.ui.modal.create(k, c.ifFixedPosition())
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
        $(j).children("button").click(a); ! f.disableDrag && G.ui.drag.enable(c.get(0), j, {
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
    showMsg: function(d) {
        var a = arguments,
        b = a[1] || {};
        if ($.type(b) != "object") {
            b = {};
            $.each({
                1 : "type",
                2 : "okFn",
                3 : "closeFn",
                4 : "cancelFn",
                5 : "okText",
                6 : "cancelText"
            },
            function(g, f) {
                if (a[g] != null) {
                    b[f] = a[g]
                }
            });
            if (b.okText && b.cancelText) {
                b.btns = 3
            }
        }
        if (!this._msgPopup) {
            this._msgPopup = G.ui.popup.create({
                title: "提示",
                width: 500,
                height: 170,
                fullscreen: 1
            })
        }
        var c = {
            1 : "warn",
            2 : "error",
            3 : "right"
        };
        if (! (b.type in c)) {
            b.type = 1
        }
        if (!$.isArray(d)) {
            d = [d]
        }
        b.btns = b.btns || 1;
        this._msgPopup.paint((function(f) {
            return function(g) {
                $(g.content).empty().html(' <div class="layer_global_mod">	<b class="icon icon_msg4 icon_msg4_' + c[b.type] + '"></b>' + (d.length >= 1 ? ('<h4 class="layer_global_tit">' + d[0] + "</h4>") : "") + "	" + (d.length >= 2 ? ("<p>" + d[1] + "</p>") : "") + (d.slice(2, d.length).join("")) + '	<div class="wrap_btn"><a class="btn_strong" href="#" onclick="return false">' + (b.okText || "确定") + '</a> <a class="btn_common" href="#" onclick="return false">' + (b.cancelText || "取消") + "</a></div>	</div>");
                $(".wrap_btn .btn_strong", g.content).click(function() {
                    var h = true;
                    if ($.isFunction(b.okFn)) {
                        h = b.okFn() !== false
                    }
                    if (h) {
                        f.hide(false)
                    }
                })[(b.btns & 1) ? "show": "hide"]();
                $(".wrap_btn .btn_common", g.content).click(function() {
                    var h = true;
                    if ($.isFunction(b.cancelFn)) {
                        h = b.cancelFn() !== false
                    }
                    if (h) {
                        f.hide(false)
                    }
                })[(b.btns & 2) ? "show": "hide"]();
                f.show()
            }
        })(this._msgPopup));
        this._msgPopup.onclose($.isFunction(b.closeFn) ? b.closeFn: $.noop);
        return this._msgPopup
    }
}; (function(h) {
    var f = {},
    c = 0,
    b = null,
    a = function() {
        if (b === null) {
            var j = h('<span id="supportsPositionFixed" style="position:fixed;width:1px;height:1px;top:25px;"></span>').appendTo(h("body"));
            var i = j.offset();
            j.remove();
            b = (i.top - h(window).scrollTop()) === 25
        }
        return Boolean(b)
    },
    g = false,
    d = function() {
        if (g !== false) {
            return
        }
        var j = h("body");
        var i = "http://st.icson.com/static_v1/img/blank.gif";
        if (G.prefix.ssl) {
            i = G.prefix.st_ssl + "/static_v1/img/blank.gif"
        }
        if ((j.css("background-image")) == "none") {
            j.css({
                "background-image": "url(" + i + ")",
                "background-attachment": "fixed"
            })
        } else {
            j.css("background-attachment", "fixed")
        }
        g = true
    };
    h.fn.ifFixedPosition = function() {
        if (!this.attr("id") || this.attr("id").length == 0) {
            return false
        }
        return !! f[this.attr("id")]
    },
    h.fn.fixedPosition = function(i) {
        var j = {
            fixedTo: "bottom",
            fixedTop: 0,
            fixedBottom: 0,
            fixedLeft: false,
            effect: false,
            effectSpeed: 1000
        };
        var i = h.extend(j, i);
        return this.each(function() {
            var k = h(this);
            if (!k.attr("id") || k.attr("id").length == 0) {
                k.attr("id", "positionFixedID" + (c++))
            }
            if (!a()) {
                d();
                var l = "";
                if (i.fixedTo == "top") {
                    l = "$(document).scrollTop()";
                    if (i.fixedTop > 0) {
                        l += "+" + i.fixedTop
                    }
                } else {
                    l = '$(document).scrollTop() - $("#' + k.attr("id") + '").outerHeight() + (document.documentElement.clientHeight || document.body.clientHeight)';
                    if (i.fixedBottom > 0) {
                        l += "-" + i.fixedBottom
                    }
                }
                k.css("position", "absolute");
                if (k.length > 0 && k[0].style && k[0].style.setExpression) {
                    k[0].style.setExpression("top", "eval(" + l + ")")
                } else {
                    k.css("top", (i.fixedTop || 0) + "px")
                }
                if (i.fixedLeft !== false) {
                    k.css("left", h(document).scrollLeft() + (i.fixedLeft - 0) + "px")
                }
            } else {
                k.css("position", "fixed");
                if (i.fixedTo == "top") {
                    k.css("top", (i.fixedTop || 0) + "px")
                } else {
                    k.css("bottom", (i.fixedBottom || 0) + "px")
                }
                if (i.fixedLeft !== false) {
                    k.css("left", i.fixedLeft + "px")
                }
            }
            f[h(this).attr("id")] = 1;
            if (i.effect) {
                switch (i.effect) {
                case "fadeIn":
                    k.hide().fadeIn(i.effectSpeed);
                    break;
                case "slideDown":
                    k.hide().slideDown(i.effectSpeed);
                    break
                }
            }
        })
    }
})(jQuery);
G.ui.template = {
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
                    k.push(G.ui.template.fillWithTPL(false, n, false, i.replace(/<_index_>/g, m - 0 + 1)))
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
G.ui.tips = {
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
            g = $(G.logic.constants.getTipStr(h, b, false, j));
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
        if (b == null || !(b in G.logic.constants.tipsLevel)) {
            b = 0
        }
        var i = "";
        if (d.style == "bigtop") {
            i = "para_blo para_" + G.logic.constants.tipsLevel[b]
        } else {
            i = "para_inb para_" + G.logic.constants.tipsLevel[b]
        }
        g.empty().html(G.logic.constants.getTipStr(h, b, true, j)).removeClass().addClass(i).fadeIn(200);
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
G.ui.page = function(a, k, d, g) {
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
G.logic.constants = {
    userLevelName: {
        0 : "土星会员",
        1 : "铜盾会员",
        2 : "银盾会员",
        3 : "金盾会员",
        4 : "钻石会员",
        5 : "皇冠会员",
        6 : "易金鲸"
    },
    getSmallUrl: function(a, b) {
        return this._getPicUrl(a, "small", b)
    },
    getSSUrl: function(a, b) {
        return this._getPicUrl(a, "ss", b)
    },
    getMMUrl: function(a, b) {
        return this._getPicUrl(a, "mm", b)
    },
    getMiddleUrl: function(a, b) {
        return this._getPicUrl(a, "middle", b)
    },
    getBigUrl: function(a, b) {
        return this._getPicUrl(a, "mpic", b)
    },
    getPic160Url: function(a, b) {
        return this._getPicUrl(a, "pic160", b)
    },
    getPic60Url: function(a, b) {
        return this._getPicUrl(a, "pic60", b)
    },
    getPic200Url: function(a, b) {
        return this._getPicUrl(a, "pic200", b)
    },
    getBigUrl: function(a, b) {
        return this._getPicUrl(a, "mpic", b)
    },
    _getPicUrl: function(d, a, f) {
        if (d.length > 10) {
            d = d.substr(0, 10)
        }
        var c = d.substr(0, 2),
        b = d.substr(3, 3);
        return "http://img2.icson.com/product/" + a + "/" + c + "/" + b + "/" + d + (f == 0 ? "": ("-" + (f < 10 ? ("0" + f) : f))) + ".jpg"
    },
    tipsLevel: {
        0 : "info",
        1 : "warn",
        2 : "error",
        3 : "right",
        4 : "help"
    },
    getTipStr: function(h, i, g, d) {
        if (h == null) {
            return ""
        }
        if (i == null || !(i in G.logic.constants.tipsLevel)) {
            i = 0
        }
        if (i == 0 || i == 4) {
            i = 1
        }
        var a = G.logic.constants.tipsLevel[i],
        c = "";
        if (d == "big") {
            if ($.type(h) != "array") {
                h = [h]
            }
            var f = [];
            if (h.length > 1) {
                var b = h.shift();
                $.each(h,
                function(j, l) {
                    f.push("<p>" + l + "</p>")
                });
                h.unshift(b)
            }
            if (f.length > 0) {
                f = '<div class="bd">' + f.join("") + "</div>"
            } else {
                f = ""
            }
            c = '<div class="inner"> <b class="icon icon_msg3 icon_msg3_' + a + '"></b><div class="hd"><strong class="tit">' + (h.length > 0 ? h[0] : "") + "</strong></div>" + f + "</div>";
            c = g ? c: '<div class="para_blo para_' + a + '">' + c + "</div>"
        } else {
            c = '<b class="icon icon_msg0 icon_msg0_' + a + '"></b><span class="para_tit">' + h + "</span>";
            c = g ? c: '<p class="para_inb para_' + a + '">' + c + "</p>"
        }
        return c
    },
    goToCart: function(d, b, c) {
        if (!d) {
            return
        }
        var a = $(c).attr("ytag") || $(c).attr("YTAG") || "";
        if (window.yPageId == 0 && window.yPageLevel == 0) {
            a = ""
        } else {
            if (a) {
                a = window.yPageLevel + "." + window.yPageId + "" + a
            }
        }
        G.util.cookie.add("backurl", location.href, "/", 0, ".51buy.com");
        if (typeof d == "object") {
            if (d.pid > 0) {
                location.href = "http://buy.51buy.com/cart.html?pid=" + d.pid + "&pnum=" + (d.pnum || 1) + "&mid=" + (d.mid || d.pid) + ((d.price_id && d.price_id > 0) ? ("&price_id=" + d.price_id) : "") + (b == 1 ? "&ism=1": "") + (a ? ("&ytag=" + a) : "")
            }
        } else {
            location.href = "http://buy.51buy.com/cart.html?ids=" + d + (b == 1 ? "&ism=1": "") + (a ? ("&ytag=" + a) : "")
        }
    },
    goToCartWithThis: function(b, c, a) {
        return G.logic.constants.goToCart(c, a, b)
    },
    allowedWhInfo: {
        "1": "上海",
        "1001": "广东",
        "2001": "北京",
        "3001": "湖北"
    }
};
$.extend(G.logic.constants, {
    getWhId: (function() {
        function d() {
            var f = G.util.cookie.get("wsid");
            if (G.logic.constants.allowedWhInfo[f]) {
                return (G.util.cookie.get("ws_c") == "3001") ? "3001": f
            } else {
                return false
            }
        }
        var a = G.createFnQueue(),
        c = 0,
        b = d();
        return function(f) {
            a.add(f);
            if (c == 2 || b !== false) {
                a.exec(b);
                return
            }
            if (c == 1) {
                return
            }
            c = 1;
            $.get("http://" + G.DOMAIN.BASE_ICSON_COM + "/json.php?mod=user&act=getwhid",
            function(g) {
                c = 2;
                b = 1;
                if (g && g.errno == 0) {
                    if (G.logic.constants.allowedWhInfo[g.data]) {
                        b = g.data
                    }
                }
                G.util.cookie.add("wsid", b, "/", 30 * 24 * 3600, ".51buy.com");
                a.exec(b)
            },
            "jsonp")
        }
    })()
});
G.logic.validate = {
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
        return a && a.length == 10 && G.logic.validate.checkNumber(a)
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
G.logic.login = {
    _refer: null,
    _refUrl: "",
    _loginUser: false,
    _loginPopup: false,
    _userFnQueue: G.createFnQueue(),
    _qqloginFnQueue: G.createFnQueue(),
    _loginFnQueue: G.createFnQueue(false),
    _logoutFnQueue: G.createFnQueue(false),
    _loginNameCutLen: 8,
    cutString: function(b, a) {
        if (a <= 0 || b.replace(/[^\x00-\xff]/g, "**").length <= a) {
            return b
        }
        var c = b;
        while (c.replace(/[^\x00-\xff]/g, "**").length > a) {
            c = c.substr(0, c.length - 1)
        }
        if (c.length < b.length) {
            c += "..."
        }
        return c
    },
    popup: function(b) {
        var a = "https://base.51buy.com/login.html?url=" + encodeURIComponent(typeof b == "string" ? b: location.href);
        location.href = a;
        return true
    },
    login: function(d, c, a, b) {
        G.util.post("https://" + G.DOMAIN.BASE_ICSON_COM + "/json.php?mod=login&fmt=1", {
            account: d,
            password: c
        },
        function(f) {
            if (f && f.errno == 0) {
                if ($.isFunction(a)) {
                    a()
                }
            } else {
                if ($.isFunction(b)) {
                    b(f && f.errno ? f.errno: null)
                }
            }
        })
    },
    updateHead: function() {
        G.logic.constants.getWhId(function(a) {
            if (!G.logic.constants.allowedWhInfo[a]) {
                location.replace("http://www.51buy.com/");
                return
            }
            G.logic.login.getLoginUser(function(q) {
                var j = $("#PageToolbar"),
                v = $("#PageLoginStatusbar"),
                x = $("#PageWelcome"),
                t = $("#PageMyOrderLi");
                if (x.length > 0) {
                    x.remove()
                } else {
                    $("#PageLogin").remove();
                    $("#PageLoginByQQBtn").remove();
                    $("#PageRegLi").remove()
                }
                if (q && q.errno == 0) {
                    var u = q.data,
                    s = "";
                    if (u.icsonid.toString().indexOf("Login_QQ_") == 0 || "true" === G.util.cookie.get("__BINDQQACCOUNT")) {
                        s = '<i class="icon_qq">&nbsp;</i>QQ用户，';
                        var f = G.util.cookie.get("cps_msg").split("|");
                        if (f.length >= 2 && f[0] == u.uid) {
                            f.shift();
                            s = G.util.parse.encodeHtml(f.join("|"));
                            if (G.util.cookie.get("cps_src") == "qqcb") {
                                var c = '<div class="mod_top_banner"><div class="main_area"><div class="sale_tip"><strong>QQ彩贝联盟商家：</strong>易迅-QQ会员购物成功最高返<span class="redf">4320</span>彩贝积分，普通用户最高返2880彩贝积分<a ytag="06807" href="http://cb.qq.com/get_jifen.html" target="_blank" title="积分详情">(详情)</a></div><div class="login_status"><span class="qqUser login_btn"><span class="name">' + s + '</span>，您好！</span><a ytag="06808" href="http://cb.qq.com/my/my_jifen_source.html" target="_blank" title="我的彩贝积分" class="my_caibei">我的彩贝积分</a></div></div></div>';
                                setTimeout(function() {
                                    $("body").prepend(c)
                                },
                                500)
                            }
                        } else {
                            var k = G.util.cookie.get("qq_nick").split("|");
                            if (k.length >= 2 && k[0] == u.uid) {
                                k.shift();
                                s += G.logic.login.cutString(G.util.parse.encodeHtml(k.join("|")), G.logic.login._loginNameCutLen);
                                s += "，"
                            }
                        }
                    } else {
                        if (u.icsonid.toString().indexOf("Login_Alipay_") == 0) {
                            var r = parseInt(q.data.status_bits & (1 << 0));
                            if (1 == r) {
                                s = "欢迎您，支付宝VIP：" + G.logic.login.cutString(G.util.parse.encodeHtml(u.name || u.icsonid), G.logic.login._loginNameCutLen) + "，"
                            } else {
                                s = G.logic.login.cutString(G.util.parse.encodeHtml(u.name || u.icsonid), G.logic.login._loginNameCutLen) + " 您好"
                            }
                        } else {
                            if (/^\d+@51fanli$/.test(u.icsonid.toString())) {
                                var f = G.util.cookie.get("cps_msg").split("|");
                                if (f.length >= 2 && f[0] == u.uid) {
                                    s = f[1]
                                }
                            } else {
                                s = G.logic.login.cutString(G.util.parse.encodeHtml(u.icsonid), G.logic.login._loginNameCutLen) + " 您好"
                            }
                        }
                    }
                    v.prepend('<li id="PageWelcome" class="item"><span class="welcome">' + s + '</span>[<a ytag="06300" href="javascript:;" name="quit" hotName="I.INDEX.HEAD_EXIT" onclick="return false">退出</a>]</li>');
                    v.find("a[name=quit]").click(G.logic.login.logout);
                    var g = "正在加载...";
                    t.find("div.mod_order").html(g);
                    G.logic.login.mouseEnterAndOut(t.find("div.menu"),
                    function(d) {
                        if (d.find("div.mod_order").html() == g) {
                            G.util.post("http://" + G.DOMAIN.WWW_ICSON_COM + "/json.php?mod=index&act=getmyorders&fmt=1", {},
                            function(C) {
                                if (C && "errno" in C && "data" in C) {
                                    if (C.errno == 0) {
                                        if ($.isArray(C.data)) {
                                            var A = "";
                                            var B = 6302;
                                            if (C.data.length > 0) {
                                                A += "<ul>";
                                                for (var z = 0,
                                                y = C.data.length; z < y; z++) {
                                                    A += '<li>	<div class="pic_wrap">		<a ytag="0' + (B++) + '" href="http://item.51buy.com/item-' + C.data[z].product_id + '.html" target="_blank"><img alt="' + C.data[z].product_name + '" src="' + C.data[z].product_img + '"></a>	</div>	<div class="order_info">		<dl>			<dt><a ytag="0' + (B++) + '" href="http://base.51buy.com/orderdetail-' + C.data[z].order_id + '.html" target="_blank">' + C.data[z].order_id + "</a></dt>			<dd>" + C.data[z].order_date + '</dd>		</dl>	</div>	<div class="order_status"><span class="wait">' + C.data[z].order_status + "</span></div></li>"
                                                }
                                                A += "</ul>";
                                                A += '<p class="order_old"><a ytag="06301" title="更早订单" href="http://base.51buy.com/myorder.html?YTAG=1.100000003">更早订单<i class="dot_arrow"></i></a></p>'
                                            } else {
                                                A += "没有记录"
                                            }
                                            d.find("div.mod_order").html(A);
                                            return
                                        } else {
                                            if ($.type(C.data) == "string") {
                                                d.find("div.mod_order").html(C.data);
                                                return
                                            }
                                        }
                                    }
                                }
                                d.find("div.mod_order").html("订单信息加载失败，请您稍后重试")
                            })
                        }
                    },
                    null, "menu_hover")
                } else {
                    var b = "登录";
                    var h = "注册";
                    var i = "https://base.51buy.com/register.html";
                    var m = "";
                    if (location.href.match(/^http:\/\/b\.51buy\.com/)) {
                        b = "大客户登录";
                        h = "大客户注册";
                        i = "http://b.51buy.com/retailerreg.html";
                        m = " item_login_distributor"
                    }
                    var p = window.LOGIN_NO_JUMP ? (LOGIN_NO_JUMP === true ? "http://www.51buy.com/": LOGIN_NO_JUMP) : location.href,
                    n = '<li id="PageLogin" class="item' + m + '"><a ytag="06800" href="https://base.51buy.com/login.html" >' + b + '</a></li><li id="PageLoginByQQBtn" class="item loginbyqq"><a ytag="06805" href="https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=215585&redirect_uri=http%3A%2F%2Fbase.51buy.com%2Findex.php%3Fmod%3Duser%26act%3Dloginqqauthcode"><i class="dot_qq"></i><span class="hide_clip">QQ登录</span></a></li><li id="PageRegLi" class="item"><a ytag="06806" id="PageRegBtn" href="' + i + '">' + h + "</a></li>";
                    v.prepend(n);
                    var w = G.util.parse.url();
                    w = w.search.url || w.hash.url || location.href;
                    if (!/^http:\/\/([a-zA-Z0-9_-]+\.|)51buy\.com/.test(w)) {
                        w = ""
                    }
                    G.logic.login._refUrl = w;
                    if (w) {
                        var l = "https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=215585&redirect_uri=" + encodeURIComponent("http://base.51buy.com/index.php?mod=user&act=loginqqauthcode&url=" + encodeURIComponent(w));
                        $("#qqauthlogin").attr("href", l);
                        $("#PageLoginByQQBtn a").attr("href", l);
                        $("#ali_login").attr("href", "http://base.51buy.com/index.php?mod=user&act=toalipaylogin&url=" + encodeURIComponent(w));
                        $("#PageRegBtn").attr("href", i + "?url=" + encodeURIComponent(w));
                        $("#PageLogin a.menu_hd").attr("href", "https://base.51buy.com/login.html?url=" + encodeURIComponent(w))
                    }
                    G.logic.login.bindHeadLoginHandler($("#PageLogin div.menu"));
                    $("#PageMyOrderLi div.mod_order").html('<p class="empty"><a ytag="06807" href="https://base.51buy.com/login.html">登录</a>后查看最近的订单信息</p>');
                    G.logic.login.mouseEnterAndOut($("#PageMyOrderLi div.menu"), null, null, "menu_hover")
                }
            })
        })
    },
    mouseEnterAndOut: function(d, c, f, g) {
        var k = 300,
        b = null,
        h = g || "hover",
        j = function() {
            if (b) {
                clearTimeout(b);
                b = null
            }
        },
        i = function() {
            j();
            d.addClass(h);
            if (c) {
                c(d)
            }
        },
        a = function() {
            j();
            b = setTimeout(function() {
                d.removeClass(h);
                if (f) {
                    f(d)
                }
            },
            k)
        };
        d.hover(i, a)
    },
    bindHeadLoginHandler: function(d) {
        var f = d.find("div.mod_login_bd dd.item_submit button"),
        c = d.find('div.mod_login_bd input[type="text"]'),
        j = d.find('div.mod_login_bd input[type="password"]'),
        k = d.find("div.mod_login_bd dd.error");
        var l = function() {
            b();
            c.val("");
            j.val("")
        };
        G.logic.login.mouseEnterAndOut(d, null, l, "menu_hover");
        var a = function(n, m) {
            n && n.addClass("status_error");
            k.html('<i class="dot_error"></i>' + m).show()
        };
        var b = function() {
            c.removeClass("status_error");
            j.removeClass("status_error");
            k.hide().html("")
        };
        var i = function() {
            b();
            var m = false;
            if ($.trim(c.val()) == "") {
                a(c, "请输入您的易迅帐号")
            } else {
                if ($.trim(j.val()) == "") {
                    a(j, "请输入您的易迅密码")
                } else {
                    m = true
                }
            }
            return m
        };
        var g = function() {
            var m = $.trim(location.href);
            if (G.logic.login._refUrl && G.logic.login._refUrl != m) {
                location.replace(G.logic.login._refUrl)
            } else {
                G.logic.login.updateHead();
                if (!/\d\d+/.test(G.util.cookie.get("BOUND_QQACCT")) && (G.util.cookie.get("INDeXBiNdQqAcCoUnT") !== "true") && ("http://www.51buy.com/" === m || "http://www.51buy.com" === m || "http://www.51buy.com/index.php" === m)) {
                    G.util.cookie.add("INDeXBiNdQqAcCoUnT", "true", "/", 86400, ".51buy.com");
                    G.logic.login.bindQQAccount.open()
                }
            }
        };
        var h = function(m) {
            switch (m) {
            case 66:
                a(j, "密码错误，请您重新填写");
                break;
            case 67:
                a(c, "该登录帐号不存在");
                break;
            default:
                a(false, "对不起，登录失败");
                break
            }
        };
        f.click(function(n) {
            var m = i();
            if (m) {
                G.logic.login.login($.trim(c.val()), $.trim(j.val()), g, h)
            }
        })
    },
    getLoginUid: function() {
        var a = G.util.cookie.get("uid");
        if (G.logic.validate.checkNumber(a)) {
            return a
        }
        return false
    },
    forceFlushUser: function() {
        var a = Math.random();
        G.util.cookie.add("randpro", a, "/", 24 * 3600, ".51buy.com");
        return a
    },
    _getLoginUser: function(i, h) {
        var d = G.logic.login,
        b = $.isFunction(i) ? i: $.noop,
        f = d.getLoginUid();
        if (d._loginUser != false && d._loginUser.uid == f) {
            b(d._loginUser);
            return
        }
        d._userFnQueue.add(b);
        if (d._userLoading) {
            return
        }
        d._userLoading = true;
        var c = G.util.cookie.get("randpro");
        if (h) {
            c = d.forceFlushUser()
        }
        var a = G.util.cookie.get("qplus_nick");
        var g = "";
        if (a != "") {
            g = "&" + new Date().getTime()
        }
        $.ajax({
            type: "GET",
            url: "http://" + G.DOMAIN.BASE_ICSON_COM + "/json.php?mod=user&act=profile&uid=" + f + "&r=" + c + g,
            success: function(j) {
                d._userLoading = false;
                d._userFnQueue.exec(j);
                d._loginUser = j
            },
            dataType: "jsonp",
            cache: true,
            crossDomain: true,
            jsonpCallback: "loadLoginUserCb"
        })
    },
    _getLoginQQUser: function(d) {
        var b = "http://a1.shop.qq.com/act.php?mod=checkuserq&func=redirect&id=icson&url=" + encodeURIComponent("http://base.51buy.com/index.php?mod=user&act=loginqq&url=" + encodeURIComponent("http://st.51buy.com/static_v1/htm/loginjump.htm")) + "&furl=" + encodeURIComponent("http://st.51buy.com/static_v1/htm/loginjump.htm"),
        c = $('<iframe src="about:blank" style="display:none"></iframe>');
        $("body").prepend(c);
        var a = $.isFunction(d) ? d: $.noop;
        c[0].callback = function() {
            a();
            $(this).src = "about:blank";
            $(this).remove();
            this.callback = null
        };
        if ($.browser.msie && parseInt($.browser.version) < 9) {
            G.util.post.pIndex = (G.util.post.pIndex || 0) + 1;
            c[0].pIndex = G.util.post.pIndex;
            c[0].ie6callback = function() {
                this.src = b
            };
            c[0].src = location.protocol + "//st.51buy.com/static_v1/htm/ie6post.htm"
        } else {
            c[0].src = b
        }
    },
    getLoginUser: function(g, c, d) {
        var a = G.logic.login,
        b = a.getLoginUid();
        a._refer = (a._refer === null) ? document.referrer: a._refer;
        if (!b) {
            var f = G.util.cookie.get("cps_info");
            if (c !== false && ((/^\s*linktech\|\|A100060164/i.test(f) && G.util.cookie.get("QQACCT") == 2) || (((a._refer != "" && !/^http:\/\/([a-z0-9]+\.|)51buy\.com/i.test(document.referrer)) || !G.util.cookie.get("QQACCT")) && !f))) {
                a._qqloginFnQueue.add(g);
                if (a._qquserLoading) {
                    return
                }
                a._qquserLoading = true;
                a._getLoginQQUser(function() {
                    a.getLoginUser(function(h) {
                        a._refer = "";
                        if (h && h.errno == 0) {
                            G.util.cookie.add("QQACCT", h.data.icsonid.replace(/^Login_QQ_/i, ""), "/", 0, ".51buy.com")
                        }
                        a._qquserLoading = false;
                        a._qqloginFnQueue.exec(h)
                    },
                    false, d)
                })
            } else {
                a._refer = "";
                $.isFunction(g) && g(false)
            }
            return
        }
        a._refer = "";
        a._getLoginUser(g, d)
    },
    logout: function(a) {
        G.util.cookie.del("uid", ".51buy.com");
        G.util.cookie.del("skey", ".51buy.com");
        G.util.cookie.del("cps_src", ".51buy.com");
        G.util.cookie.del("BOUND_QQACCT", ".51buy.com");
        G.util.cookie.del("__BINDQQACCOUNT", ".51buy.com");
        G.logic.login._logoutFnQueue.exec();
        $.isFunction(a) && a();
        if (window.LOGIN_NO_JUMP) {
            location.replace(LOGIN_NO_JUMP === true ? "http://www.51buy.com/": LOGIN_NO_JUMP)
        } else {
            G.logic.login.updateHead();
            G.logic.header.getShoppingCart()
        }
    },
    onlogout: function(a) {
        $.isFunction(a) && G.logic.login._logoutFnQueue.add(a)
    },
    ifLogin: function(c, b) {
        var a = G.logic.login.getLoginUid();
        if (!a) {
            G.logic.login.popup(c && b ? (function(d) {
                return function() {
                    var f = [];
                    for (var g = d.length - 1; g >= 0; g--) {
                        f.unshift(d[g])
                    }
                    d.callee.apply(c, f)
                }
            })(b) : $.noop);
            return false
        }
        return true
    },
    ifLoginJump: function() {
        var b = G.logic.login.getLoginUid();
        if (!b) {
            var a = "http://www.51buy.com/";
            if (!window.skipJumpPage) {
                a = "https://base.51buy.com/login.html?url=" + encodeURIComponent(location.href)
            }
            location.replace(a);
            return false
        }
        return true
    },
    jump: function() {},
    bindQQAccount: (function() {
        var a = null;
        return {
            open: function(b) {
                if (a) {
                    a.close()
                }
                a = G.ui.popup.create({
                    fullscreen: 1,
                    title: "绑定QQ号码",
                    width: 630
                });
                a.paint(function(g) {
                    var d = "https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=215585&redirect_uri=http%3A%2F%2Fbase.51buy.com%2Findex.php%3Fmod%3Duser%26act%3Dloginqqauthcode%26bindaccount%3Dtrue";
                    var c = '<iframe src="' + d + "&random=" + (new Date()) + '" width="600" height="400" scrolling="no" frameborder="no"></iframe>';
                    $(g.content).empty().html(c);
                    var f = $(g.content).find("iframe")[0];
                    f.resize = (function(h) {
                        return function(j, i) {
                            h.height = i;
                            h.style.height = i + "px"
                        }
                    })(f);
                    f.callback = function(j) {
                        var h = G.util.cookie.get("BOUND_QQACCT");
                        if (/\d\d+/.test(h)) {
                            var i = top.G.ui.popup.create({
                                fullscreen: 1,
                                title: "完善QQ信息，享受更多优惠",
                                width: 400
                            });
                            i.paint(function(k) {
                                $(k.content).empty().html('<div style="padding:0px 0px 10px 50px;"><div class="icon_msg4 icon_msg4_right" style="float:left;margin-right:10px;"></div><div>号码：<b style="color:#FF730A;font-weight:bold;">' + h + '</b>&nbsp;绑定成功！<br /><a class="btn_strong">继续浏览</a></div></div>').find("a.btn_strong").click(function() {
                                    b && b();
                                    i.close()
                                });
                                i.show()
                            });
                            a.close()
                        } else {
                            G.ui.tips.warn(j, $(g.content), {
                                style: "bigtop",
                                autoHide: false
                            });
                            f.src = d + "&random=" + (new Date())
                        }
                    };
                    G.ui.tips.warn("完善个人帐号信息，请填写本人QQ号码，一旦绑定成功后不能进行解绑。", $(g.content), {
                        style: "bigtop",
                        autoHide: false
                    });
                    $(g.content).parent().find("b.icon").css({
                        "background-image": "none"
                    })
                });
                a.show()
            },
            close: function() {
                a && a.close()
            }
        }
    })()
};
G.logic.header = {
    _Q_SHOW_DEF_TEXT: "输入品牌或商品进行搜索",
    loginStatus: function() {
        G.logic.login.updateHead();
        G.ui.tips.swapInput({
            target: $("#q_show"),
            defaultValue: G.logic.header._Q_SHOW_DEF_TEXT,
            focusClass: "mod_search_txt",
            blurClass: "mod_search_txt no_cur"
        });
        if ($.browser.msie && $.browser.version == 6) {
            $("#q_show").next().click(function() {
                if (G.logic.header.query()) {
                    $(this).parents("form")[0].submit()
                }
            })
        }
        this.setBust();
        this.locateRegion();
        this.category.init();
        this.getShoppingCart();
        this.getHotKey();
        this.ga();
        this.recordLs();
        this.autoComplete();
        this.updateQQBuyEntry();
        this.initTopNotice();
        setTimeout(function() {
            if (location.href.match(/^http:\/\/item\.(icson|51buy)\.com\/item-/) || location.href.match(/^http:\/\/act\.(icson|51buy)\.com\/promo-/) || location.href.match(/^http:\/\/((sz|www)\.|)(icson|51buy)\.com($|\/([^\.]+)?$)/)) {
                $.ajax({
                    url: "http://" + G.DOMAIN.ST_ICSON_COM + "/static_v1/js/app/tray_popup.js?v=2.0",
                    cache: true,
                    type: "GET",
                    scriptCharset: "gb2312",
                    dataType: "script",
                    success: function() {
                        G.app.tray_popup.launch()
                    }
                })
            }
        },
        0);
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
    updateQQBuyEntry: function() {
        var c = $("#QQBuyEntry"),
        g = window.screen.availWidth >= 1280,
        d = '<li class="item item_qqbuy"><a ytag="06901" href="http://buy.qq.com/?WGTAG=1000.24.1.1" target="_blank"><span class="hide_clip">QQ网购</span></a></li><li class="item"><a ytag="06902" href="http://buy.qq.com/fashion/?WGTAG=1000.24.1.2" target="_blank">服饰</a></li><li class="item"><a ytag="06903" href="http://buy.qq.com/sports/?WGTAG=1000.24.1.3" target="_blank">运动</a></li>',
        f = '<li class="item"><a ytag="06904" href="http://buy.qq.com/jewelry/?WGTAG=1000.24.1.4" target="_blank">珠宝</a></li><li class="item"><a ytag="06905" href="http://buy.qq.com/chaoshi/?WGTAG=1000.24.1.5" target="_blank">超市</a></li>',
        b = '<li class="item item_more">	<div class="menu">		<a ytag="06960" class="menu_hd" href="#">更多<i class="dot_arrowdown"></i></a>		<div class="menu_bd">			<div class="mod_more">				<ul>',
        a = '<li><a ytag="06961" href="http://buy.qq.com/3c/?WGTAG=1000.24.1.6" target="_blank">数码</a></li>					<li><a ytag="06962" href="http://buy.qq.com/cosmetics/?WGTAG=1000.24.1.7" target="_blank">美妆</a></li>					<li><a ytag="06963" href="http://buy.qq.com/bag/?WGTAG=1000.24.1.8" target="_blank">箱包</a></li>					<li><a ytag="06964" href="http://buy.piao.qq.com/?WGTAG=1000.24.1.9" target="_blank">电影</a></li>					<li><a ytag="06965" href="http://buy.go.qq.com/?WGTAG=1000.24.1.10" target="_blank">机票</a></li>					<li><a ytag="06966" href="http://chong.paipai.com/buy/?WGTAG=1000.24.1.11" target="_blank">充值</a></li>				</ul>			</div>		</div>	</div></li>';
        if (g) {
            c.html(d + f + b + a)
        } else {
            f = f.replace(/class="item"/g, "");
            c.html(d + b + f + a)
        }
        c.find("li.item_more").mouseover(function(h) {
            $(this).find("div.menu").addClass("menu_hover")
        }).mouseout(function(h) {
            $(this).find("div.menu").removeClass("menu_hover")
        })
    },
    updateQQBuyEntryZhai: function() {
        var c = $("#QQBuyEntry"),
        g = false,
        d = '<li class="item item_qqbuy"><a ytag="06901" href="http://buy.qq.com/?WGTAG=1000.24.1.1" target="_blank"><span class="hide_clip">QQ网购</span></a></li><li class="item"><a ytag="06902" href="http://buy.qq.com/fashion/?WGTAG=1000.24.1.2" target="_blank">服饰</a></li><li class="item"><a ytag="06903" href="http://buy.qq.com/sports/?WGTAG=1000.24.1.3" target="_blank">运动</a></li>',
        f = '<li class="item"><a ytag="06904" href="http://buy.qq.com/jewelry/?WGTAG=1000.24.1.4" target="_blank">珠宝</a></li><li class="item"><a ytag="06905" href="http://buy.qq.com/chaoshi/?WGTAG=1000.24.1.5" target="_blank">超市</a></li>',
        b = '<li class="item item_more">	<div class="menu">		<a ytag="06960" class="menu_hd" href="#">更多<i class="dot_arrowdown"></i></a>		<div class="menu_bd">			<div class="mod_more">				<ul>',
        a = '<li><a ytag="06961" href="http://buy.qq.com/3c/?WGTAG=1000.24.1.6" target="_blank">数码</a></li>					<li><a ytag="06962" href="http://buy.qq.com/cosmetics/?WGTAG=1000.24.1.7" target="_blank">美妆</a></li>					<li><a ytag="06963" href="http://buy.qq.com/bag/?WGTAG=1000.24.1.8" target="_blank">箱包</a></li>					<li><a ytag="06964" href="http://buy.piao.qq.com/?WGTAG=1000.24.1.9" target="_blank">电影</a></li>					<li><a ytag="06965" href="http://buy.go.qq.com/?WGTAG=1000.24.1.10" target="_blank">机票</a></li>					<li><a ytag="06966" href="http://chong.paipai.com/buy/?WGTAG=1000.24.1.11" target="_blank">充值</a></li>				</ul>			</div>		</div>	</div></li>';
        if (g) {
            c.html(d + f + b + a)
        } else {
            f = f.replace(/class="item"/g, "");
            c.html(d + b + f + a)
        }
        c.find("li.item_more").mouseover(function(h) {
            $(this).find("div.menu").addClass("menu_hover")
        }).mouseout(function(h) {
            $(this).find("div.menu").removeClass("menu_hover")
        })
    },
    recordLs: function() {
        var a = G.util.parse.url();
        $.each(a,
        function(b, c) {
            $.each(c,
            function(f, d) {
                f = (f + "").toLowerCase();
                if (f == "ls" || f == "us") {
                    G.util.cookie.add(f, d, "/", 7 * 24 * 3600, ".51buy.com")
                }
            })
        })
    },
    autoComplete: function() {
        function a() {
            G.logic.constants.getWhId(function(c) {
                var b = G.ui.autoComplete({
                    target: "#q_show",
                    listOnClass: "autocomplete_status_on",
                    itemActiveClass: "status_on",
                    itemTPL: "<li><span>{label}</span><cite>约{count}个搜索结果</cite></li>",
                    url: "http://www.51buy.com/json.php?mod=ajax&act=query&exception=1&jsontype=str",
                    keyName: "kw",
                    delayTime: 250,
                    cache: true
                });
                b.bind("success",
                function(k, l) {
                    var j = l.response,
                    f = [];
                    if (j && j.list && j.list.length > 0) {
                        for (var h = 0,
                        d = j.list.length; h < d; h++) {
                            var g = j.list[h];
                            f.push({
                                value: g[0],
                                count: g[1],
                                label: g[0]
                            })
                        }
                    }
                    l.response = f
                });
                b.bind("complete",
                function() {
                    $("#q_show").parents("form").submit()
                })
            })
        }
        $(a)
    },
    _kefuLink: {
        1 : "http://b.qq.com/webc.htm?new=0&sid=4006401878&eid=218808P8z8p8y8x8Q8R8K&o=http://www.51buy.com&q=7",
        1001 : "http://b.qq.com/webc.htm?new=0&sid=4008286699&eid=218808P8z8p8x8z8y8x8z&o=http://www.51buy.com&q=7",
        2001 : "http://b.qq.com/webc.htm?new=0&sid=4008280055&eid=218808P8z8p8P8q8R8q8p&o=http://www.51buy.com&q=7",
        3001 : "http://b.qq.com/webc.htm?new=0&sid=4008280055&eid=218808P8z8p8P8q8R8q8p&o=http://www.51buy.com&q=7"
    },
    locateRegion: function() {
        var a = $("#i_region");
        if (a.length === 0) {
            return
        }
        var b = arguments.callee,
        c = G.logic.constants;
        c.getWhId(function(i) {
            var h = c.allowedWhInfo[i];
            if (h) {
                a.find("a.change").html(h + '<i class="dot_change"></i>')
            }
            $("#PageContactServiceLi a").attr("href", G.logic.header._kefuLink[i]);
            if (/^http:\/\/((sz|www)\.|)(icson|51buy)\.com(\/?|\/(sz|sh|bj))($|\?|#)/.test(location.href) || true) {
                var g = [],
                f = {
                    1 : "01002",
                    1001 : "01001",
                    2001 : "01003",
                    3001 : "01004"
                };
                $.each(c.allowedWhInfo,
                function(k, j) {
                    if (k == i) {
                        return
                    }
                    g.push("<li><a" + (f[k] ? (' ytag="' + f[k] + '"') : "") + ' href="#" onclick="return false" w="' + k + '">' + j + "</a></li>")
                });
                var d = $('<div class="jump_city">	<ul class="city">' + g.join("") + '</ul>	<div class="nor">其他地区用户请选择上海</div>	<p class="load"></p>	<p class="f"><span class="icon icon_msg0 icon_msg0_warn"></span>切换失败，请<a class="switch_fail_btn" href="#">返回重试</a></p></div>').appendTo(a);
                G.logic.login.mouseEnterAndOut(a, null, null, "area_change_hover");
                $("ul.city li a", d).click(function() {
                    b.lastClickDom = this;
                    if (!c.allowedWhInfo[$(this).attr("w")]) {
                        return
                    } else {
                        G.logic.header.switchSite($(this).attr("w"))
                    }
                });
                $("a.switch_fail_btn", d).click(function() {
                    b.lastClickDom && $(b.lastClickDom).triggerHandler("click");
                    return false
                })
            }
        })
    },
    switchSite: function(d) {
        d = parseInt(d);
        var c = arguments.callee,
        f = G.logic.constants.allowedWhInfo[d];
        if (!this.xhr) {
            var b = 1;
            c.xhr = $.ajax({
                type: "GET",
                timeout: 30 * 1000,
                scriptCharset: "gb2312",
                url: "http://" + G.DOMAIN.ST_ICSON_COM + "/static_v1/js/app/switchSite.js?v=" + b,
                dataType: "script",
                cache: true,
                crossDomain: true
            })
        }
        var a = $("#i_region");
        c.xhr.done(function() {
            G.app.switchSite.tryToSwitchTo(d)
        }).fail(function() {
            a.find(".load").css("display", "none");
            a.find(".f").css("display", "block");
            a.find(".close").css("display", "block")
        });
        a.find(".load").html('<span class="loading_82_21"></span>正在切换到<span class="where">' + f + "站</span>……").css("display", "block");
        a.find(".city, .nor, .f, .close").css("display", "none")
    },
    ga: function() {
        var b = b || [];
        var a = {
            1 : "UA-10104379-19",
            1001 : "UA-10104379-17",
            2001 : "UA-10104379-18"
        };
        window._gaq = b;
        G.logic.constants.getWhId(function(d) {
            window._gaq.push(["_setAccount", "UA-10104379-15"]);
            window._gaq.push(["_setCustomVar", 1, "site_id", "site_" + d, 2]);
            window._gaq.push(["_trackPageview"]);
            window._gaq.push(["_setAccount", a[d]]);
            window._gaq.push(["_deleteCustomVar", 1]);
            window._gaq.push(["_trackPageview"]);
            var c = ("https:" == document.location.protocol ? "https://ssl": "http://www") + ".google-analytics.com/ga.js";
            $(function() {
                $.ajax({
                    url: c,
                    type: "get",
                    dataType: "script",
                    cache: true,
                    async: true
                })
            })
        })
    },
    query: function() {
        var d = $("#q_show"),
        c = $.trim(d.val()),
        f = true,
        b = d.attr("_href");
        if (c === G.logic.header._Q_SHOW_DEF_TEXT && b) {
            window.location.href = b;
            f = false
        } else {
            if (c === "" || c === G.logic.header._Q_SHOW_DEF_TEXT) {
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
        var a = G.util.cookie.get("qplus_nick");
        var b = "";
        if (a != "") {
            b = "&" + new Date().getTime()
        }
        G.logic.constants.getWhId(function(d) {
            $.ajax({
                type: "GET",
                url: "http://www.51buy.com/json.php?mod=hotkey&act=page" + b,
                success: function(f) {
                    if (f && f.errno == 0) {
                        c.html(f.data)
                    }
                },
                dataType: "jsonp",
                cache: true,
                crossDomain: true,
                jsonpCallback: "loadSiteHotKey_" + d
            })
        })
    },
    getShoppingCart: function() {
        var i = $("#i_cart_info");
        if (i.length == 0) {
            return
        }
        var d = G.logic.login.getLoginUid(),
        g = 0,
        h,
        c = false,
        f = false,
        b = function(j) {
            g = j;
            h = (j == 0) ? " cart_wrap_empty": "";
            c = true;
            i.html('<a ytag="04700" class="cart_wrap' + h + '"href="http://buy.51buy.com/cart.html"><i class="dot_cart"></i><span>购物车（' + j + '）件</span></a><div class="cart_list" style="display:none">正在努力为您加载购物车信息…</div>').mouseover(function(l) {
                var k = $("div.cart_list", this);
                k.show();
                a(k)
            }).mouseout(function(k) {
                $("div.cart_list", this).hide()
            })
        },
        a = function(k) {
            if (g != 0) {
                var j = '<ul><@rows@><li><div class="pic_wrap"><a ytag="0{ytag1}" href="{product_url}" target="_blank"><img alt="{product_name}" src="{product_img}"></a></div><div class="txt_wrap"><div class="name"><a ytag="0{ytag2}" href="{product_url}" target="_blank">{product_name}</a></div><div class="action"><span class="rmb">&yen;</span><span class="price">{product_price}</span><span class="ride">x</span>{product_count}</div></div></li><@_rows@><dl><dt>共<span class="rmb">{total_count}</span>件商品总计：<span class="rmb">&yen;</span><span class="price">{total_price}</span></dt><dd><a ytag="04701" class="balance" href="http://buy.51buy.com/cart.html" title="去购物车结算">去购物车结算</a></dd></dl></ul>',
                l = function(o) {
                    var m = {
                        total_count: 0,
                        total_price: 0,
                        rows: []
                    };
                    var n = 4702;
                    $.each(o,
                    function(p, q) {
                        m.total_count += parseInt(q.buy_count);
                        m.total_price += q.price / 100;
                        m.rows.push({
                            product_url: "http://item.51buy.com/item-" + q.product_id + ".html",
                            product_name: q.name,
                            product_img: G.logic.constants.getPic60Url(q.product_char_id, 0),
                            product_price: (q.price / 100).toFixed(1),
                            product_count: q.buy_count,
                            ytag1: n++,
                            ytag2: n++
                        })
                    });
                    m.total_price = m.total_price.toFixed(1);
                    return G.ui.template.fillWithTPL(false, m, false, j)
                };
                if (!f) {
                    k.html("加载中…");
                    if (d) {
                        $.get("http://" + G.DOMAIN.BUY_ICSON_COM + "/json.php?mod=shoppingcart&act=list&uid=" + d,
                        function(m) {
                            if (m && m.hasOwnProperty("errno")) {
                                f = true;
                                m.errno = parseInt(m.errno);
                                switch (m.errno) {
                                case 0:
                                    var n = l(m.data);
                                    k.html(n);
                                    break;
                                case 3:
                                    k.html("服务器出了点小状况，请稍候...");
                                    break;
                                case 500:
                                case 501:
                                default:
                                    break
                                }
                            } else {}
                        },
                        "jsonp")
                    } else {
                        G.util.localShare(function(n) {
                            var o = n.getItem("shoppingcart"),
                            m = [];
                            if (o) {
                                $.each(o.list,
                                function(p, q) {
                                    m.push(q[0] + "|" + q[1] + "|" + q[2])
                                })
                            }
                            if (m.length > 0) {
                                G.util.post("http://" + G.DOMAIN.BUY_ICSON_COM + "/json.php?mod=shoppingcart&act=listnotlogin", {
                                    cart: m.join(",")
                                },
                                function(p) {
                                    if (p && p.hasOwnProperty("errno")) {
                                        f = true;
                                        p.errno = parseInt(p.errno);
                                        switch (p.errno) {
                                        case 0:
                                            var q = l(p.data);
                                            k.html(q);
                                            break;
                                        case 3:
                                            k.html("服务器出了点小状况，请稍候...");
                                            break;
                                        default:
                                            break
                                        }
                                    } else {}
                                },
                                "jsonp")
                            }
                        })
                    }
                }
            } else {
                k.html("您还未添加任何商品到购物车中")
            }
        };
        if (d) {
            $.getJSON("http://www.51buy.com/json.php?mod=ajax&act=cart&callback=?",
            function(j) {
                b(j && j.errno == 0 && j.data.num || 0)
            })
        } else {
            G.util.localShare(function(j) {
                var l = j.getItem("shoppingcart"),
                k = 0;
                if (l) {
                    $.each(l.list,
                    function(m, n) {
                        k += n[1] - 0
                    })
                }
                b(k)
            })
        }
    },
    category: {
        config: {
            headIn: 10,
            headOut: 100,
            panelOut: 200,
            liIn: 100
        },
        ytag_base: 85,
        FIRSTTPL: '<div id="i_sort_list">						<div class="cate_normal">							<@first_list@>							<div cateid="{id}" class="item">								<div class="item_hd"">									<dl>										<dt class="top_cate">											<a hotname="I.CATEGORY.FIRST.{index}" href="{url}" ytag="{ytag}">{text}<i class="dot_cate"></i></a>										</dt>										<dd class="sub_cate">											<@key_list@>											<a hotname="I.CATEGORY.FIRST.KEYWORD.{index}" href="{url}" ytag="{ytag}">{name}</a>											<@_key_list@>										</dd>									</dl>								</div>								<div class="item_bd">								</div>							</div>							<@_first_list@>						</div>						<div class="cate_easy">							<@easy_list@>							<div cateid="{id}" class="item">								<div class="item_hd">									<dl>										<dt class="top_cate">											<a hotname="I.CATEGORY.FIRST.{index}" href="{url}" ytag="{ytag}">{text}<i class="dot_cate"></i></a>										</dt>									</dl>								</div>								<div class="item_bd">								</div>							</div>							<@_easy_list@>						</div>					</div>',
        SECONDTPL: '{iframe_str}<div class="list">					<@second_list@>					<dl>						<dt class="t">{second_name}</dt>						<dd>							<@third_list@>							<a hotname="I.CATEGORY.SECOND.{index}" href="{url}" ytag="{ytag}">{name}</a>							<@_third_list@>						</dd>					</dl>					<@_second_list@>				</div>				<div class="hot">					<@recommend_list@>						<p class="t">{recommend_name}</p>					<ul>						<@recommend_link_list@>						<li><a hotname="I.CATEGORY.RECOMMEND.{index}" href="{recommend_link_url}">{recommend_link_name}</a></li>						<@_recommend_link_list@>					</ul>					<@_recommend_list@>				</div>',
        renderFirst: function() {
            var c = this,
            b = $("#category_panel");
            if (b.length == 0) {
                return
            }
            var a = window.CATEGORY_CONFIG,
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
            b.html(G.ui.template.fillWithTPL(false, f, false, c.FIRSTTPL));
            $("#i_sort_list .cate_easy>div:first-child").addClass("item_first");
            b.mouseleave(function() {
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
            g.html(G.ui.template.fillWithTPL(false, dataSource, false, this.SECONDTPL));
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
                G.logic.constants.getWhId(function(d) {
                    var c = G.prefix.st + "static_v1/js/app/categories_" + d + ".js?v=2012042001";
                    if (G.prefix.ssl) {
                        c = G.prefix.st_ssl + "static_v1/js/app/categories_" + d + ".js?v=2012042001"
                    }
                    $.ajax({
                        type: "get",
                        dataType: "script",
                        url: c,
                        crossDomain: true,
                        cache: true,
                        scriptCharset: "gbk",
                        success: function() {
                            while (a.callbackList.length) {
                                a.callbackList.shift().call(a)
                            }
                        },
                        context: a
                    })
                })
            } else {
                b.call(a)
            }
        },
        init: function() {
            var b = this,
            a = $("#category_container");
            if (a.length === 0) {
                return
            }
            var c = b.needSlide = !a.hasClass("i_status_on");
            c && a.find(">h3:first-child").hover(function() {
                b.clearTimeout();
                b.headInTimer = setTimeout(function() {
                    a.addClass("i_status_on");
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
                    a.removeClass("i_status_on")
                },
                b.config.headOut)
            }); ! c && b.showPanel()
        }
    },
    openKF: function() {
        var b = 504,
        c = 404,
        a = ($(window).width() - b) / 2,
        d = ($(window).height() - c) / 2;
        G.logic.constants.getWhId(function(f) {
            window.open(G.logic.header._kefuLink[f], "_blank", "height=" + c + ",width=" + b + ",toolbar=no,scrollbars=no,menubar=no,status=no,left=" + a + ",top=" + d + "")
        })
    },
    initTopAdvertise: function(d, h) {
        var c = this,
        a = arguments;
        if (undefined === d) {
            G.logic.constants.getWhId(function(j) {
                $.ajax({
                    type: "GET",
                    url: "http://" + G.DOMAIN.ACT_ICSON_COM + "/json.php?mod=topadv&act=page&jsontype=str",
                    success: function(k) {
                        a.callee.call(c, k, h)
                    },
                    dataType: "jsonp",
                    cache: true,
                    crossDomain: true,
                    jsonpCallback: "loadtopadv_" + j
                })
            });
            return
        }
        if (!d || $.isEmptyObject(d) || (!d.ssbg && !d.bsbg)) {
            return
        }
        var g = {},
        b = window.screen.availWidth >= 1280 && (h !== false);
        $.each(["s", "b"],
        function(j, k) {
            g[k] = d[k + "sbg"] ? G.ui.template.fillWithTPL(false, {
                target: d[k + "tar"],
                background: d[k + (b ? "b": "s") + "bg"],
                href: d[k + "href"]
            },
            false, '<a target="{target}" style="background:url({background})" href="{href}"></a>') : ""
        });
        if (!g.s || !g.b) {
            var i = $('<div class="top_banner">' + (g.s || g.b) + "</div>");
            $(".i_wrap_tooolbar").prepend(i);
            i.css("height", g.b ? "200px": "40px")
        } else {
            function f(p) {
                var j = false,
                o = false,
                n = true;
                var m = $('<div class="top_banner">' + g.s + "</div>"),
                k = null;
                $(".i_wrap_tooolbar").prepend(m);
                var l = function() {
                    m.html(g.b);
                    m.animate({
                        height: "200px"
                    },
                    400,
                    function() {
                        j = true
                    })
                };
                var r = function() {
                    m.animate({
                        height: "40px"
                    },
                    200,
                    function() {
                        m.html(g.s);
                        j = false
                    })
                };
                var q = {
                    "1": "sh",
                    "1001": "sz",
                    "2001": "bj"
                };
                if (q[p] && !G.util.cookie.get("indextopadv_" + q[p])) {
                    l();
                    setTimeout(function() {
                        r()
                    },
                    3000);
                    G.util.cookie.add("indextopadv_" + q[p], "1", "/", 36000 * 24, "51buy.com")
                } else {
                    m.html(g.s).css("height", "40px")
                }
            }
            G.logic.constants.getWhId(function(j) {
                f(j)
            })
        }
    },
    initTopNotice: function() {
        $(function() {
            if (("page" in G) && ("notice" in G.page) && $.type(G.page.notice) == "array" && G.page.notice.length > 0) {
                var a = G.page.notice;
                G.util.localShare(function(b) {
                    var c = b.getItem("index.top_notice"),
                    d = [],
                    g = [],
                    f = 6501;
                    c = ($.type(c) != "array") ? [] : c;
                    $.each(a,
                    function(h, j) {
                        if ($.inArray(j.id, c) == -1) {
                            g.push('<li _notice_id="' + j.id + '"><a ytag="0' + (f++) + '" href="' + (j.link || "javascript:;") + '">' + j.content + "</a></li>")
                        }
                    });
                    if (g.length > 0) {
                        d.push('<div id="PageTopNotice" class="yx_wrap"><div class="yx_notice">	<i class="dot_speak"></i>	<div class="notice_list">		<ul>');
                        d.push(g.join(""));
                        d.push('</ul>			</div>		<a ytag="06500" href="javascript:;" class="close" title="点击关闭" onclick="G.logic.header.closeTopNotice(); return false;"><span class="hide_clip">点击关闭</span></a>	</div></div>');
                        $(d.join("")).insertAfter($("div.yx_top_toolbar"))
                    }
                })
            }
        })
    },
    initDefaultSearch: function() {
        var f = window.G !== undefined && window.G.page !== undefined && window.G.page.defaultSearch != undefined && !$.isEmptyObject(G.page.defaultSearch);
        if (f === false) {
            return
        }
        var d = G.page.defaultSearch;
        var g = $.trim(G.page.defaultSearch.title);
        var b = $.trim(G.page.defaultSearch.href);
        if (!g || !b) {
            return
        }
        var a = $("#q_show"),
        c = a.data("events");
        if (!c || !c.focus) {
            return
        }
        a.data("events").focus[0].data.opt.defaultValue = g;
        G.logic.header._Q_SHOW_DEF_TEXT = g;
        a.val(g).attr("_href", b)
    },
    closeTopNotice: function() {
        var a = $("#PageTopNotice");
        if (a.length > 0) {
            G.util.localShare(function(b) {
                var c = b.getItem("index.top_notice") || [];
                a.find("li").each(function(f, h) {
                    var d = $(h),
                    g = parseInt(d.attr("_notice_id"));
                    if (g != NaN && g > 0) {
                        if (c.length == 10) {
                            c.pop()
                        }
                        c.push(g)
                    }
                });
                b.setItem("index.top_notice", c);
                a.animate({
                    height: 0
                },
                200,
                function() {
                    $(this).hide()
                })
            })
        }
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
            G.logic.constants.getWhId(function(j) {
                var i = {
                    "1": 4,
                    "1001": 10,
                    "2001": 13,
                    "3001": 42
                };
                j = i[j] ? i[j] : 4;
                logStat.chkLog(j + "{|}" + c)
            })
        }
    },
    chkLog: function(g) {
        var f = "http://search.paipai.com/cgi-bin/clicklog",
        b;
        var d = G.util.cookie.get("visitkey"),
        c = G.util.cookie.get("uid"),
        a = escape(document.URL);
        b = g.split("{|}");
        if (b[2]) {
            f = f + "?srcid=" + b[0] + "&uin=" + c + "&ls=" + b[2] + "&subls=" + b[3] + "&visitKey=" + d + "&ref=" + a + "&herf=" + b[4];
            if (b[1] == "1") {
                G.util.cookie.add("lgStat", f, "/", 0, ".51buy.com")
            } else {
                logStat.loadScript(f + "&t=" + (new Date()).getTime(), "chkStatScript")
            }
        }
    },
    chkItem: function(d, c, b, a) {
        G.logic.constants.getWhId(function(m) {
            var n = {
                "1": 4,
                "1001": 10,
                "2001": 13
            };
            var j = "http://search.paipai.com/cgi-bin/search_log?srcid=" + n[m] + "&";
            var k = G.util.cookie.get("visitkey"),
            i = $("#q_show"),
            l = "";
            if (i.length > 0) {
                l = i.val();
                l = l === "输入品牌或商品进行搜索" ? "": l
            }
            var f = G.util.cookie.get("uid");
            var g = document.URL;
            var h = j + "pos=" + d + "&visitkey=" + k + "&uin=" + f + "&ref=" + escape(g) + "&commid=" + c + "&leafclassid=" + (b || "") + "&keyword=" + l + "&t=" + (new Date).getTime();
            if (a === undefined) {
                G.util.cookie.add("lgStat", h, "/", 0, ".51buy.com")
            } else {
                logStat.loadScript(h)
            }
        })
    },
    initStat: function(c) {
        if (c) {
            for (var a in c) {
                this[a] = c[a]
            }
        }
        $(document).bind("click", logStat.getLog);
        var b = G.util.cookie.get("lgStat");
        if (b) {
            setTimeout(function() {
                logStat.loadScript(b + "?t=" + (new Date).getTime());
                G.util.cookie.del("lgStat", ".51buy.com")
            },
            0)
        }
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
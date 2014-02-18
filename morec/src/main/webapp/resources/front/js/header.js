var G = G || {};
G.domain = "yixun.com";
G.DOMAIN = {
    WWW_ICSON_COM: "www." + G.domain,
    ACT_ICSON_COM: "act." + G.domain,
    EVENT_ICSON_COM: "event." + G.domain,
    ITEM_ICSON_COM: "item." + G.domain,
    BUY_ICSON_COM: "buy." + G.domain,
    BASE_ICSON_COM: "base." + G.domain,
    S_ICSON_COM: "s." + G.domain,
    LIST_ICSON_COM: "list." + G.domain,
    ST_ICSON_COM: "st." + G.domain,
    ACT_ICSON_COM: "act." + G.domain
};
G.prefix = {
    st: "http://st." + G.domain + "/",
    ssl: !1,
    st_ssl: "https://st." + G.domain + "/"
};
G.createFnQueue = function(a) {
    var b = [];
    return {
        add: function(a) {
            $.isFunction(a) && b.push(a)
        },
        exec: function(c) {
            if (!1 !== a) for (; 0 < b.length;) b.shift()(c);
            else for (var d = 0,
            e = b.length; d < e; d++) if (!1 === b[d](c)) return ! 1
        },
        clear: function() {
            b.length = 0
        }
    }
};
G.app = G.app || {};
G.logic = G.logic || {};
G.ui = G.ui || {};
G.util = G.util || {};
if ($.browser.msie && 7 > parseInt($.browser.version, 10)) try {
    document.execCommand("BackgroundImageCache", !1, !0)
} catch(e$$12) {}
G.header = {
    user: {},
    data: {},
    config: {},
    _Q_SHOW_DEF_TEXT: "输入品牌或商品进行搜索"
};
G.header.init = function() {
    this.initNav();
    G.header.initSite();
    this.initToolbar();
    this.login.updateHead();
    this.initCart();
    this.common.loc.initSwitchSite();
    this.hideAreas();
    this.dispatch();
    this.hotKey();
    this.common.recordLs()
};
G.header.initSite = function() {
    G.header.site.setDomain();
    G.header.site.browser();
    G.header.site.initNewSite()
};
G.header.initLogin = function() {};
G.header.initSwitch = function() {
    G.header.common.loc.getLoc(0)
};
G.header.initToolbar = function() {
    G.header.toolbar.setVisitKey()
};
G.header.initNav = function() {
    G.header.nav.horNav();
    G.header.nav.category.init()
};
G.header.initCart = function() {
    G.header.cart.getShoppingCart()
};
G.header.api = {
    onLogin: function() {},
    onLogout: function() {},
    isLogin: function() {},
    isLogout: function() {},
    getCurLoc: function(a) {
        $.isFunction(a) && G.header.common.loc.getLoc(1, a)
    }
};
G.header.site = {
    setDomain: function() {
        G.header.domain = /51buy\.com/.test(location.host) ? "51buy.com": "yixun.com"
    },
    browser: function() {
        var a = G.header.common.browser(),
        b = G.header.common.css3test("Transition") ? "csstransitions": "no-csstransitions",
        b = G.header.common.css3test("Animation") ? b + " cssanimations": b + " no-cssanimations";
        $("html").addClass(b + " ic_" + a.engine + " ic_" + a.browser + " ic_" + a.version)
    },
    initNewSite: function() {
        var a = G.header.common.getCookie,
        b = G.header.common.addCookie,
        c = a("loc"),
        a = a("wsid");
        c && 2001 == a && (c = c.split("_"), 1 == c[0] && 2001 == a && (c[0] = 8, b("loc", c.join("_"), "/", 604800, "." + G.header.domain)))
    }
};
G.header.login = {
    _refer: null,
    _refUrl: "",
    _loginUser: !1,
    _loginPopup: !1,
    _userFnQueue: G.createFnQueue(),
    _qqloginFnQueue: G.createFnQueue(),
    _loginFnQueue: G.createFnQueue(!1),
    _logoutFnQueue: G.createFnQueue(!1),
    _loginNameCutLen: 8,
    cutString: function(a, b) {
        if (0 >= b || a.replace(/[^\x00-\xff]/g, "**").length <= b) return a;
        for (var c = a; c.replace(/[^\x00-\xff]/g, "**").length > b;) c = c.substr(0, c.length - 1);
        c.length < a.length && (c += "...");
        return c
    },
    popup: function(a) {
        a = "https://base." + G.header.domain + "/login.html?url=" + encodeURIComponent("string" == typeof a ? a: location.href);
        location.href = a;
        return ! 0
    },
    login: function(a, b, c, d, e) {
        var g = {
            account: a,
            password: b
        };
        $.each(e || {},
        function(a, b) {
            g[a] = b
        });
        G.header.common.post("https://" + G.DOMAIN.BASE_ICSON_COM + "/json.php?mod=login&fmt=1", g,
        function(a) {
            a && 0 == a.errno ? $.isFunction(c) && c(a) : $.isFunction(d) && d(a && a.errno ? a.errno: null)
        })
    },
    updateHead: function() {
        G.header.login.getLoginUser(function(a) {
            var b = G.header.common,
            c = b.getCookie,
            d = "https://base.yixun.com/login.html",
            e = $("#j_sitemap"),
            g = $("#j_user");
            if (a && 0 == a.errno) {
                var d = a.data,
                e = "",
                f = "欢迎您，&nbsp;";
                0 == d.icsonid.toString().indexOf("Login_QQ_") || "true" === c("__BINDQQACCOUNT") ? (f = "欢迎您，QQ用户&nbsp;", a = c("cps_msg").split("|"), 2 <= a.length && a[0] == d.uid ? (a.shift(), e = b.encodeHtml(a.join("|"))) : (c = c("qq_nick").split("|"), 2 <= c.length && c[0] == d.uid && (c.shift(), e = c.join("|")))) : 0 == d.icsonid.toString().indexOf("Login_Alipay_") ? (f = 1 == parseInt(a.data.status_bits & 1) ? "欢迎您，支付宝VIP：&nbsp;": f, e = d.name || d.icsonid) : /^\d+@51fanli$/.test(d.icsonid.toString()) ? (a = c("cps_msg").split("|"), 2 <= a.length && a[0] == d.uid && (e = a[1])) : 0 == d.icsonid.toString().indexOf("Login_SHAuto_") ? (f = "欢迎您，安悦用户：&nbsp;", e = d.icsonid.substr(13)) : 0 == d.icsonid.toString().indexOf("Login_SAND_") ? (f = "欢迎您，杉德用户：&nbsp;", e = d.icsonid.substr(11)) : 0 == d.icsonid.toString().indexOf("Login_PINGAN_") ? (f = "欢迎您，平安用户：&nbsp;", e = d.icsonid.substr(13)) : e = d.icsonid;
                e = G.header.login.cutString(b.encodeHtml(e), G.header.login._loginNameCutLen);
                g.removeClass("hide").html('<span class="mod_sitemap_user_greet" id="j_greet">' + f + '</span><a target="_blank" class="mod_sitemap_uname" id="j_uname" href="http://base.yixun.com/" ytag="00202">' + e + "</a>");
                var c = function(a, b) {
                    G.header.login.mouseEnterAndOut(a,
                    function() {
                        var b = $("img[_src]", a);
                        0 < b.length && b.attr("src", b.attr("_src")).removeAttr("_src")
                    },
                    null, b)
                },
                e = g.attr("data-attr") || "{}",
                h,
                k;
                try {
                    e = $.parseJSON(e)
                } catch(m) {
                    e = {}
                }
                if (0 >= d.exp_point && (h = e.fish)) g.prepend('<div class="mod_sitemap_fish" id="j_fish"><a target="_blank" href="' + h.url + '" title="' + h.title + '" ytag="00200">新用户专享</a>' + (h.ad ? '<div class="mod_sitemap_fish_pop"><b class="mod_sitemap_fish_arrow">&#9670;<i>&#9670;</i></b><a target="_blank" class="mod_sitemap_fish_img" href="' + h.ad.url + '" title="' + h.ad.title + '" ytag="00201"><img _src="' + h.ad.src + '" /></a></div></div>': "</div>")),
                c($("#j_fish"), "mod_sitemap_fish_on");
                else if (0 < d.exp_point && (k = e.vip)) h = $.inArray(d.levelDesc, "土星会员 铜盾会员 银盾会员 金盾会员 钻石会员 皇冠会员 易金鲸".split(" ")) + 1,
                g.append('<div class="mod_sitemap_vip_wrap" id="j_vip_wrap"><a target="_blank" class="mod_sitemap_vip" href="' + k.url + '" ytag="00203"><img id="j_vip_icon" src="' + ("http://static.gtimg.com/icson/img/common/grade/guest" + h + "_16.gif") + '"" /></a>' + (k.ad ? '<div class="mod_sitemap_vip_pop"><b class="mod_sitemap_vip_arrow">&#9670;<i>&#9670;</i></b><a target="_blank" class="mod_sitemap_vip_img" href="' + k.ad.url + '" title="' + k.ad.title + '" ytag="00208"><img _src="' + k.ad.src + '" /></a></div></div>': "</div>")),
                c($("#j_vip_wrap"), "mod_sitemap_vip_on");
                g.append('<a class="mod_sitemap_logout" id="j_logout" href="javascript:" ytag="00204">退出</a>');
                $("#j_logout").click(G.header.login.logout);
                var n = !1,
                g = $("#j_order"),
                s = '<ul role="menu" class="mod_iorder_list" id="j_iorder_list">\t\t\t\t\t\t\t\t\t<@rows@>\t\t\t\t\t\t\t\t\t<li role="menuitem">\t\t\t\t\t\t\t\t\t<a target="_blank" class="mod_iorder_img" title="{product_name}" href="{product_url}" ytag="00{ytag1}"><img src="{product_img}" /></a>\t\t\t\t\t\t\t\t\t<div class="mod_iorder_info">\t\t\t\t\t\t\t\t\t<p><a target="_blank" href="http://base.' + G.header.domain + '/orderdetail-{order_id}.html" ytag="00{ytag2}">{order_id}</a></p>\t\t\t\t\t\t\t\t\t<p class="mod_iorder_time">{order_date}</p>\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t<div class="mod_iorder_ext">{order_status}</div>\t\t\t\t\t\t\t\t\t</li>\t\t\t\t\t\t\t\t\t<@_rows@>\t\t\t\t\t\t\t\t\t</ul>\t\t\t\t\t\t\t\t\t<div class="mod_iorder_ft" id="j_iorder_ft">\t\t\t\t\t\t\t\t\t<a target="_blank" href="http://base.' + G.header.domain + '/myorder.html" class="mod_iorder_more" ytag="00310"><b>更多订单</b><i>&nbsp;</i></a>\t\t\t\t\t\t\t\t\t</div>',
                r = $("#j_iorder_unlogin");
                orderLayer = $("#j_iorder_pop");
                var t = function() {
                    $("#j_iorder_list").remove();
                    $("#j_iorder_ft").remove();
                    r.html("<p>订单信息加载失败，请您稍后重试</p>").show()
                },
                p = function() {
                    $.ajax({
                        url: "http://buy." + G.header.domain + "/json.php?mod=recentorder&act=toolbar",
                        dataType: "jsonp",
                        cache: !0,
                        success: function(a) {
                            if (a && 0 == a.errno) {
                                var e = {
                                    rows: []
                                },
                                c = 312;
                                0 == a.data.length ? r.html("暂时未能查到您的下单记录").show() : ($.each(a.data,
                                function(a, b) {
                                    e.rows.push({
                                        product_url: "http://item." + G.header.domain + "/item-" + b.product_id + ".html",
                                        product_name: b.product_name,
                                        product_img: b.product_img,
                                        order_id: b.order_id,
                                        order_date: b.order_date,
                                        order_status: b.order_status,
                                        ytag1: c++,
                                        ytag2: c++
                                    })
                                }), a = b.template.fillWithTPL(!1, e, !1, s), r.hide(), n || (orderLayer.append(a), n = !0))
                            } else t()
                        },
                        error: function() {
                            t()
                        }
                    })
                };
                G.header.login.mouseEnterAndOut(g,
                function() {
                    n || (r.html("正在努力为您加载中...").show(), p())
                },
                null, "mod_dropmenu_on")
            } else {
                g.html("");
                g = "登录&nbsp;";
                k = "注册&nbsp;";
                h = "http://base.yixun.com/register.html";
                if (location.href.match(/^http:\/\/b\.(51buy|yixun)\.com/) || /^http:\/\/event\.(51buy|yixun)\/event\/(478cfee|4819461|479d18f)\.html$/.test(location.href)) g = "大客户登录&nbsp;",
                k = "大客户注册&nbsp;",
                h = "http://b.yixun.com/retailerreg.html";
                c = b.parseUrl();
                c = c.search.url || c.hash.url || location.href;
                /^http:\/\/([a-zA-Z0-9_-]+\.|)(51buy|yixun)\.com/.test(c) || (c = ""); (G.header.login._refUrl = c) && (d += "?url=" + encodeURIComponent(c));
                e.prepend('<li class="mod_sitemap_li mod_sitemap_login" _n="mod_login"><a class="mod_sitemap_login_btn" id="j_login" href="' + d + '" ytag="00205">' + g + '</a></li><li class="mod_sitemap_gap" _n="mod_login">|</li><li class="mod_sitemap_li mod_sitemap_login" _n="mod_login"><a target="_blank" class="mod_sitemap_login_btn" id="j_register" href="' + h + '" ytag="00206">' + k + "</a></li>");
                $("#j_iorder_list").remove();
                $("#j_iorder_ft").remove();
                $("#j_iorder_unlogin").html('<a href="' + d + '" ytag="00311">登录</a> 后查看最近的订单信息').removeClass("hide");
                G.header.login.mouseEnterAndOut($(".mod_dropmenu"), null, null, "mod_dropmenu_on")
            }
        })
    },
    mouseEnterAndOut: function(a, b, c, d) {
        var e = null,
        g = null,
        f = d || "hover",
        h = function() {
            if (e || g) clearTimeout(g),
            clearTimeout(e),
            e = g = null
        };
        d = function() {
            h();
            e = setTimeout(function() {
                a.addClass(f);
                b && b(a)
            },
            200)
        };
        a.unbind().hover(d,
        function() {
            h();
            g = setTimeout(function() {
                a.removeClass(f);
                c && c(a)
            },
            200)
        });
        a.click(d)
    },
    getLoginUid: function() {
        var a = G.header.common.getCookie("uid");
        return G.header.common.checkNumber(a) ? a: !1
    },
    forceFlushUser: function() {
        var a = Math.random();
        G.header.common.addCookie("randpro", a, "/", 86400, "." + G.header.domain);
        return a
    },
    _getLoginUser: function(a, b) {
        var c = G.header.login,
        d = $.isFunction(a) ? a: $.noop,
        e = c.getLoginUid(); ! 1 != c._loginUser && c._loginUser.data && c._loginUser.data.uid == e ? d(c._loginUser) : (c._userFnQueue.add(d), c._userLoading || (c._userLoading = !0, G.header.common.getCookie("randpro"), b && c.forceFlushUser(), "" != G.header.common.getCookie("qplus_nick") && (new Date).getTime(), d = G.header.common.addToken("http://ecclogin.yixun.com/login/getuserinfo?e_appid=1&isseller=0&encoding=gbk", "jq"), $.ajax({
            type: "GET",
            url: d,
            success: function(a) {
                c._userLoading = !1;
                c._userFnQueue.exec(a);
                c._loginUser = a
            },
            jsonpCallback: "getUserinfoCallback",
            dataType: "jsonp",
            cache: !0,
            crossDomain: !0,
            scriptCharset: "gb2312"
        })))
    },
    _getLoginQQUser: function(a) {},
    getLoginUser: function(a, b, c) {
        b = G.header.login;
        var d = b.getLoginUid(),
        e = G.header.common.getCookie;
        b._refer = null === b._refer ? document.referrer: b._refer; ! d && !e("p_uin") && !e("p_skey") ? (b._refer = "", $.isFunction(a) && a(!1)) : (b._refer = "", b._getLoginUser(a, c))
    },
    logout: function(a) {
        G.header.common.getCookie("wg_skey") && $.ajax({
            type: "GET",
            url: "http://base." + G.header.domain + "/json.php?mod=user&act=logout",
            success: function(b) {
                G.header.common.delCookie("wg_skey", "." + G.header.domain);
                G.header.common.delCookie("ptskey", "." + G.header.domain);
                G.header.common.delCookie("uid", "." + G.header.domain);
                G.header.common.delCookie("qq_nick", "." + G.header.domain);
                G.header.common.delCookie("cps_src", "." + G.header.domain);
                G.header.common.delCookie("BOUND_QQACCT", "." + G.header.domain);
                G.header.common.delCookie("__BINDQQACCOUNT", "." + G.header.domain);
                var c = function() {
                    G.header.login._logoutFnQueue.exec();
                    $.isFunction(a) && a();
                    window.LOGIN_NO_JUMP ? LOGIN_NO_JUMP == location.href ? location.reload() : location.replace(!0 === LOGIN_NO_JUMP ? "http://www." + G.header.domain + "/": LOGIN_NO_JUMP) : (G.header.login.updateHead(), G.header.cart.getShoppingCart())
                };
                $.ajax({
                    url: "http://imgcache.qq.com/ptlogin/ac/v9/js/ptloginout.js",
                    dataType: "script",
                    success: function() {
                        pt_logout ? pt_logout.logout(c) : c()
                    },
                    error: c
                })
            },
            dataType: "jsonp",
            cache: !0,
            crossDomain: !0
        });
        return ! 1
    },
    onlogout: function(a) {
        $.isFunction(a) && G.header.login._logoutFnQueue.add(a)
    },
    ifLogin: function(a, b) {
        return ! G.header.login.getLoginUid() ? (G.header.login.popup(a && b ?
        function(b) {
            return function() {
                for (var d = [], e = b.length - 1; 0 <= e; e--) d.unshift(b[e]);
                b.callee.apply(a, d)
            }
        } (b) : $.noop), !1) : !0
    },
    ifLoginJump: function() {
        if (!G.header.login.getLoginUid()) {
            var a = "http://www." + G.header.domain + "/";
            window.skipJumpPage || (a = "https://base." + G.header.domain + "/login.html?url=" + encodeURIComponent(location.href));
            location.replace(a);
            return ! 1
        }
        return ! 0
    },
    jump: function() {}
};
G.header.toolbar = {
    setVisitKey: function() {
        var a = G.header.common.getCookie("visitkey") || ""; (!a || 4294967295 > parseInt(a, 10)) && $.ajax({
            url: "http://service.paipai.com/cgi-bin/ping",
            dataType: "jsonp",
            jsonpCallback: "getPingDataCallBack",
            type: "get",
            cache: !1,
            success: function(a) {
                G.header.common.addCookie("visitkey", a.visitkey, "/", parseInt((new Date(2099, 11, 31) - new Date) / 36E5), "." + G.header.domain)
            }
        })
    }
};
G.header.nav = {
    horNav: function() {
        var a = G.header.common.getCookie("wsid");
        1 == a && (a = 1E3);
        var b = $("#j_hornav").removeClass("hide"),
        b = $("li", b),
        c = G.header.common.serverTime,
        d = c.getHours(),
        c = c.getDay();
        0 == c && (c = 7);
        for (var e = 1,
        g = b.length; e < g; e++) {
            var f = $(b[e]),
            h;
            h = $("a", f); - 1 !== location.href.indexOf(h.attr("href")) && f.addClass("mod_nav_li_on");
            if (h = f.attr("data-attr")) {
                try {
                    h = $.parseJSON(h)
                } catch(k) {
                    continue
                } (!h.st && !h.et || h.st <= d && h.et > d) && (!h.sd && !h.ed || h.sd <= c && h.ed >= c) && (!h.region || -1 != h.region.indexOf(a)) && $("a", f).removeClass("hide") && $("i", f).removeClass("hide")
            }
        }
    },
    category: {
        config: {
            headIn: 10,
            headOut: 100,
            panelOut: 200,
            liIn: 100
        },
        ytag_base: 85E3,
        easeOut: function(a, b, c, d) {
            return c * ((a = a / d - 1) * a * a * a * a + 1) + b
        },
        render: function() {
            var a = this,
            b = [],
            c = [];
            $.each(window.CATEGORY_CONFIG,
            function(d, e) {
                b.push(a.renderFirst(d, e));
                c.push(a.renderSecond(d, e))
            });
            $("#frist_list").html(b.join(""));
            $("#second_list").html(c.join(""))
        },
        renderFirst: function(a, b) {
            var c = [],
            d = [],
            e = [],
            g = '<li id="cate{index}" index={index} panel="{highlight}" class="mod_cate_li {className}">{flag}\t\t\t\t\t\t<div class="mod_cate_r1">\t\t\t\t\t\t\t<h3 >{mainkeysHtml}</h3>{modekeyHtml}<i class="mod_cate_arrow"></i>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div class="mod_cate_r2">{keysHtml}</div>\t\t\t\t\t</li>',
            f,
            h = this.ytag_base + 1E3 * a;
            $.each(b.c1list,
            function(a, b) {
                h += a;
                b.ytag = h; (f = b.url) && (b.url = f.replace(/51buy\.com/, "yixun.com"));
                "mode" != b.flag ? c.push(G.header.common.template.fillWithTPL(!1, b, !1, '<a target="_blank" href="{url}" ytag="{ytag}">{text}</a>')) : d.push(G.header.common.template.fillWithTPL(!1, b, !1, '<a target="_blank" class="mod_cate_prom" href="{url}" ytag="{ytag}">{text}</a>'))
            });
            h++;
            $.each(b.keyword,
            function(a, b) {
                b.className = b.style ? "mod_cate_hl": "";
                h += a;
                b.ytag = h; (f = b.url) && (b.url = f.replace(/51buy\.com/, "yixun.com"));
                e.push(G.header.common.template.fillWithTPL(!1, b, !1, '<a target="_blank" class="{className}" href="{url}" ytag="{ytag}">{text}</a>'))
            });
            var k = "";
            0 < b.c1list.length && b.c1list[0].text && ("充值中心" == b.c1list[0].text ? (k = "mod_cate_chong", g = '<li id="cate{index}" index={index} panel="false" class="mod_cate_li {className}">\t\t\t\t\t\t<div class="mod_cate_r1">\t\t\t\t\t\t\t<h3 >{mainkeysHtml}</h3>\x3c!--<i class="mod_cate_arrow"></i>--\x3e\t\t\t\t\t\t</div>\t\t\t\t\t</li>') : "QQ网购" == b.c1list[0].text && (k = "mod_cate_wg", g = '<li id="cate{index}" index={index} panel="{highlight}" class="mod_cate_li {className}">{flag}\t\t\t\t\t\t<div class="mod_cate_r1">\t\t\t\t\t\t\t<h3 >{mainkeysHtml}</h3>{modekeyHtml}\t\t\t\t\t\t</div>\t\t\t\t\t\t<div class="mod_cate_r2">{keysHtml}</div>\t\t\t\t\t</li>'));
            return G.header.common.template.fillWithTPL(!1, {
                className: k,
                highlight: b.highlight,
                flag: "new" == b.flag ? '<b class="mod_cate_new"><i></i></b>': "",
                index: a,
                mainkeysHtml: c.join(""),
                modekeyHtml: d.join(""),
                keysHtml: e.join("")
            },
            !1, g)
        },
        clearTimeout: function() {
            this.headInTimer && clearTimeout(this.headInTimer);
            this.headOutTimer && clearTimeout(this.headOutTimer);
            this.panelOutTimer && clearTimeout(this.panelOutTimer);
            this.liInTimer && clearTimeout(this.liInTimer);
            this.liInTimer = this.panelOutTimer = this.headOutTimer = this.headInTimer = 0
        },
        renderSecond: function(a, b) {
            var c = [],
            d = [],
            e = [],
            g = [],
            f = [],
            h = this.ytag_base + 1E3 * a,
            k,
            m = [],
            n = "",
            s = !1,
            r = "",
            t = "",
            p,
            u = 1;
            $.each(b.list,
            function(a, q) {
                switch (q.flag) {
                case "brand":
                    k = h + 850;
                    t = 0 < q.list.length ? q.text: "";
                    $.each(q.list,
                    function(a, b) {
                        b.ytag = k++;
                        b.className = b.style ? "hl": ""; (p = b.url) && (b.url = p.replace(/51buy\.com/, "yixun.com"));
                        e.push(G.header.common.template.fillWithTPL(!1, b, !1, '<li><a target="_blank" href="{url}" class="{className}"  ytag="{ytag}"><img init_src="{imgurl}" /></a></li>'))
                    });
                    break;
                case "hotnews":
                    k = h + 900;
                    r = 0 < q.list.length ? q.text: "";
                    $.each(q.list,
                    function(a, b) {
                        b.ytag = k++;
                        b.className = b.style ? "hl": ""; (p = b.url) && (b.url = p.replace(/51buy\.com/, "yixun.com"));
                        g.push(G.header.common.template.fillWithTPL(!1, b, !1, '<li><a target="_blank" href="{url}" class="{className}" ytag="{ytag}">{text}</a></li>'))
                    });
                    break;
                case "imgad":
                    k = h + 950;
                    s = 0 < q.list.length ? !0 : !1;
                    $.each(q.list,
                    function(a, b) {
                        b.ytag = k++;
                        b.className = b.style ? "hl": ""; (p = b.url) && (b.url = p.replace(/51buy\.com/, "yixun.com"));
                        f.push(G.header.common.template.fillWithTPL(!1, b, !1, '<a target="_blank" class="mod_subcate_gg {className}" href="{url}" ytag="{ytag}"><img init_src="{imgurl}" /></a>'))
                    });
                    break;
                case "channel":
                    k = h + 800;
                    $.each(q.list,
                    function(a, b) {
                        b.ytag = k++;
                        b.className = b.style ? "hl": ""; (p = b.url) && (b.url = p.replace(/51buy\.com/, "yixun.com"));
                        d.push(G.header.common.template.fillWithTPL(!1, b, !1, '<a target="_blank" class="mod_btn_arrow {className}" href="{url}" ytag="{ytag}"><b>{text}</b><i></i></a>'))
                    });
                    break;
                default:
                    q.text = q.text ? q.text: "",
                    "&nbsp;" != q.text && (n = q.text),
                    "&nbsp;" == (a + 1 <= b.list.length - 1 ? b.list[a + 1].text: "") ? (k = h + 50 * u++, $.each(q.list,
                    function(a, b) {
                        b.ytag = k++;
                        b.className = b.style ? "hl": ""; (p = b.url) && (b.url = p.replace(/51buy\.com/, "yixun.com"));
                        m.push(G.header.common.template.fillWithTPL(!1, b, !1, '<a target="_blank" class="{className}" href="{url}" ytag="{ytag}">{text}</a>'))
                    }), m.push('<s class="mod_subcate_dotline"></s>')) : (0 == m.length && (k = h + 50 * u++), $.each(q.list,
                    function(a, b) {
                        b.ytag = k++;
                        b.className = b.style ? "hl": ""; (p = b.url) && (b.url = p.replace(/51buy\.com/, "yixun.com"));
                        m.push(G.header.common.template.fillWithTPL(!1, b, !1, '<a target="_blank" class="{className}" href="{url}" ytag="{ytag}">{text}</a>'))
                    }), c.push("<dl><dt>" + n + "</dt><dd>" + m.join("") + "</dd></dl>"), m = [], n = "")
                }
            });
            imgAdBlock = s ? '<i class="mod_subcate_gg_ph"></i>': "";
            return G.header.common.template.fillWithTPL(!1, {
                index: a,
                hotnewsTitle: r,
                brandTitle: t,
                second: c.join(""),
                entry: d.join(""),
                brand: e.join(""),
                hotlist: g.join(""),
                imgAdBlock: imgAdBlock,
                adimglist: f.join("")
            },
            !1, '<div class="mod_subcate_item" id="panel{index}" index={index}><div class="mod_subcate_main">{second}<div class="mod_subcate_channel">{entry}</div></div><div class="mod_subcate_side"><div class="mod_subcate_side_hd">{brandTitle}</div><ul class="mod_subcate_side_brand">{brand}</ul><div class="mod_subcate_side_hd">{hotnewsTitle}</div><ul class="mod_subcate_side_postlist">{hotlist}</ul>{imgAdBlock}</div>{adimglist}</div>')
        },
        adjustPanelPos: function(a) {
            var b = $("#cate" + a),
            c = $("#second_list"),
            d = $("#panel" + a);
            a = parseFloat(b.offset().top, 10);
            parseFloat(b.outerHeight(), 10);
            var b = parseFloat(c.offset().top, 10),
            d = parseFloat(d.outerHeight(), 10),
            e = parseFloat($("#frist_list").offset().top, 10),
            g = parseFloat($(window).scrollTop(), 10),
            f = parseFloat($(window).height(), 10);
            0 < b + d + e - g - f && (b = g + f - d - e);
            b + e > a && (b = a - e + 40);
            0 < 40 - b && (b = 40);
            c.css({
                top: b + "px"
            });
            c.stop().animate({
                height: d + "px"
            },
            200)
        },
        mousehover: function(a) {
            $("#second_list");
            $("#second_list > div");
            $("#frist_list li").removeClass("mod_cate_li_on");
            li.addClass("mod_cate_li_on");
            li.data("rendered") ? this.adjustPanelPos(li) : (li.data("rendered", !0), this.renderSecond(li))
        },
        showPanel: function() {
            var a = this;
            a.sendRequest(function() {
                function b(a) {
                    $("#category_container").addClass("mod_cate_on");
                    $("#frist_list").removeClass("mod_cate_li_on");
                    $("#cate" + a).addClass("mod_cate_li_on")
                }
                function c(b) {
                    $("#second_list > div").css("display", "none");
                    G.header.common.loadImg(document.getElementById("panel" + b), "init_src");
                    $("#panel" + b).css("display", "block");
                    $("#second_list").show();
                    a.adjustPanelPos(b);
                    h = !0
                }
                function d() {
                    $(".mod_cate_li").removeClass("mod_cate_li_on")
                }
                function e() {
                    $("#second_list > div").css("display", "none");
                    $("#second_list").css("display", "none");
                    h = !1
                }
                function g() {
                    function b(a, e) {
                        return (e.y - a.y) / (e.x - a.x)
                    }
                    var a = u.offset(),
                    e = {
                        x: a.left + v,
                        y: a.top
                    },
                    c = {
                        x: a.left + v,
                        y: a.top + q
                    },
                    d = r[r.length - 1],
                    g = r[0];
                    if (!d) return 0;
                    g || (g = d);
                    if (g.x < a.left || (g.x > c.x || g.y < a.top || g.y > c.y) || p && d.x == p.x && d.y == p.y) return 0;
                    var a = b(d, e),
                    f = b(d, c),
                    e = b(g, e),
                    c = b(g, c);
                    if (a < e && f > c) return p = d,
                    t;
                    p = null;
                    return 0
                }
                a.render();
                var f = !0,
                h = !1,
                k = 0,
                m = 0,
                n = 0,
                s = null,
                r = [],
                t = 300,
                p = null,
                u = $("#frist_list");
                u.offset();
                var v = u.width(),
                q = u.height();
                $(document).mousemove(function(a) {
                    r.push({
                        x: a.pageX,
                        y: a.pageY
                    });
                    3 < r.length && r.shift()
                });
                $("#frist_list").hover(function() {
                    clearTimeout(n);
                    f = !0
                },
                function() {
                    f = !1; (!f || !h) && e()
                });
                $("#frist_list > li").unbind().hover(function() {
                    var a = $(this).attr("index");
                    if ("false" == $(this).attr("panel") || $(this).hasClass("mod_cate_li_on") && !h) return d(),
                    e(),
                    !1;
                    if ((f = !0) && !k) clearTimeout(m),
                    clearTimeout(n),
                    h && w(this),
                    s && clearTimeout(s),
                    k = setTimeout(function() {
                        d();
                        b(a);
                        c(a)
                    },
                    300)
                },
                function() {
                    clearTimeout(k);
                    k = 0;
                    m = setTimeout(function() {
                        d()
                    },
                    50); (!f || !h) && e()
                });
                $("#second_list > div").hover(function() {
                    var a = $(this).attr("index");
                    clearTimeout(m);
                    b(a);
                    c(a)
                },
                function() {
                    n = setTimeout(function() { ! f && d(); (!f || !h) && e()
                    },
                    20)
                });
                var w = function(a) {
                    var e = g(),
                    f = $(a).attr("index");
                    e ? s = setTimeout(function() {
                        w(a)
                    },
                    e) : (clearTimeout(k), d(), b(f), c(f))
                }
            })
        },
        sendRequest: function(a) {
            var b = this;
            b.callbackList = b.callbackList || [];
            void 0 === window.CATEGORY_CONFIG ? (b.callbackList.push(a), a = G.header.common.getCookie("loc").split("_")[0] || 2, $.ajax({
                type: "get",
                dataType: "script",
                url: "http://st.icson.com/static_v1/js/app/categories_" + a + ".js?v=2013080301",
                crossDomain: !0,
                cache: !0,
                scriptCharset: "gbk",
                success: function() {
                    for (; b.callbackList.length;) b.callbackList.shift().call(b)
                },
                context: b
            })) : a.call(b)
        },
        init: function() {
            var a = this,
            b = null,
            c = $("#category_container");
            if (0 != c.length) {
                var d = a.needSlide = !c.hasClass("mod_cate_on");
                d && c.find(".mod_cate_hd").hover(function() {
                    b = setTimeout(function() {
                        c.addClass("mod_cate_on");
                        $("#frist_list li").removeClass("mod_cate_li_on");
                        a.showPanel()
                    },
                    200)
                },
                function() {
                    b && clearTimeout(b);
                    c.removeClass("mod_cate_on")
                });
                d && c.find(".mod_cate_bd").hover(function() {
                    c.addClass("mod_cate_on")
                },
                function() {
                    c.removeClass("mod_cate_on")
                });
                d && $("#second_list").hover(function() {
                    c.addClass("mod_cate_on")
                },
                function() {
                    c.removeClass("mod_cate_on")
                }); ! d && $(".mod_cate_hd_arrow").hide() && a.showPanel()
            }
        }
    }
};
G.header.dispatch = function() {
    var a = G.header.common.getCookie("loc").split("_"),
    b = $("#j_dispatch_prom"),
    c,
    d,
    e,
    g,
    f = G.header.common.serverTime.getHours();
    try {
        if (c = $.parseJSON(b.attr("data-attr")), c = c[a[3]] || c[a[2]] || "") d = c.split("|"),
        g = (d[1] || "") + (11 > f ? "上午买下午到": 15 > f ? "下午买晚上到": "晚上买明早到"),
        e = (d[0] || "") + g,
        $("a", b).html(g).attr("title", e),
        b.show()
    } catch(h) {}
};
G.header.hotKey = function() {
    if (0 == $("#page_sKey").length) {
        var a = G.header.common.getCookie("loc").split("_")[0]; ! a && (a = "2");
        $("#sKey" + a).show()
    }
};
G.header.hideAreas = function() {
    var a = location.href;
    0 < a.indexOf("item." + G.header.domain) && $("#j_mod_city").hide();
    if (0 < a.indexOf("buy." + G.header.domain) || 0 < a.indexOf("pay." + G.header.domain)) $("#j_nav").hide(),
    $("#j_search").hide(),
    $("#j_mod_city").hide()
};
G.header.cart = {
    getShoppingCart: function() {
        function a() {
            h || (g.html("<p>正在努力为您加载中...</p>").removeClass("hide"), f ? $.ajax({
                url: G.header.common.addToken("http://cart.buy.yixun.com/minicart/minilistislogincmem?uid=" + f + "&pnum=" + k, "jq"),
                dataType: "jsonp",
                cache: !0,
                success: d,
                error: b
            }) : $.ajax({
                url: "http://cart.buy.yixun.com/minicart/minilistnotlogincmem?pnum=" + k + "&visitkey=" + G.header.common.getCookie("visitkey"),
                dataType: "jsonp",
                success: d,
                error: b
            }))
        }
        function b() {
            c();
            g.html('<p>查询失败，您可进入<a href="http://buy.yixun.com/cart.html" target="_blank" ytag="00798">购物车</a>页面查看</p>').removeClass("hide")
        }
        function c() {
            $("#j_minicart_list").remove();
            $("#j_minicart_ft").remove()
        }
        function d(a) {
            if (a && 0 == a.errno) {
                var e = {
                    total_count: 0,
                    total_price: 0,
                    view_more: "none",
                    rows: []
                },
                d = 702,
                f = 0;
                $.each(a.data,
                function(a, b) {
                    e.total_count += parseInt(b.buy_count);
                    e.total_price += b.price * b.buy_count / 100;
                    5 === f ? e.view_more = "block": (e.rows.push({
                        product_url: "http://item." + G.header.domain + "/item-" + b.product_id + ".html",
                        product_name: b.name,
                        product_img: G.header.common.getPic60Url(b.product_char_id, 0),
                        product_price: (b.price / 100).toFixed(1),
                        product_count: b.buy_count,
                        ytag1: d++,
                        ytag2: d++
                    }), f++)
                });
                e.total_price = e.total_price.toFixed(1);
                a = G.header.common.template.fillWithTPL(!1, e, !1, s);
                g.hide();
                h || (c(), r.append(a), $("#j_minicart_num").html(e.total_count), h = !0)
            } else b()
        }
        var e = $("#j_minicart"),
        g = $("#j_minicart_empty");
        if (0 != e.length) {
            var f = G.header.login.getLoginUid(),
            h = !1,
            k = 0,
            m = 29,
            n = G.header.common.getCookie("prid").split("_")[1] || 2621,
            m = 29;
            $.each(G.header.common.sh_icson_delivery_city || {},
            function(a, b) {
                b == n && (m = 99)
            });
            var s = '<ul class="mod_minicart_list" id="j_minicart_list">\t\t\t\t\t\t\t\t<@rows@>\t\t\t\t\t\t\t\t<li>                                <div class="mod_goods mod_goods_w60">                                <div class="mod_goods_img">                                <a target="_blank" href="{product_url}" ytag="00{ytag1}" title="{product_name}"><img src="{product_img}" alt="{product_name}" /></a>                                </div>                                <div class="mod_goods_info">                                <p class="mod_goods_tit"><a target="_blank" href="{product_url}" ytag="00{ytag2}" title="{product_name}">{product_name}</a></p>                                <p class="mod_goods_price"><span class="mod_price"><i>&yen;</i><span>{product_price}</span></span><b>x</b>{product_count}</p>                                </div>                                </div>\t\t\t\t\t\t\t\t</li>\t\t\t\t\t\t\t\t<@_rows@>\t\t\t\t\t\t\t\t</ul>\t\t\t\t\t\t\t\t<div class="mod_minicart_more" style="display:{view_more}">\t\t\t\t\t\t\t\t\t<a target="_blank" href="http://buy.yixun.com/showcart.html" ytag="00797">查看全部{total_count}件商品</a>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t<div class="mod_minicart_ft" id="j_minicart_ft">\t\t\t\t\t\t\t\t<p>共<span class="c_tx1" id="cartNum">{total_count}</span>件商品总计：<span class="mod_price"><i>&yen;</i><span id="cartPrice">{total_price}</span></span></p>\t\t\t\t\t\t\t\t<p>满' + m + '元免运费</p>\t\t\t\t\t\t\t\t<a target="_blank" class="mod_btn_arrow" href="http://buy.yixun.com/showcart.html" ytag="00700"><b>去购物车结算</b><i></i></a>\t\t\t\t\t\t\t\t</div>',
            r = $("#j_minicart_layer"),
            t = $("#j_minicart_pop"),
            p = "http://cart.buy.yixun.com/minicart/" + (f ? "getcartnumcmem?uid=" + f: "getcartnumnlcmem?visitkey=" + G.header.common.getCookie("visitkey"));
            $.ajax({
                url: G.header.common.addToken(p, "jq"),
                dataType: "jsonp",
                success: function(b) {
                    k = b && 0 == b.errno && b.data.num || 0;
                    $("#j_minicart_num").html(k);
                    0 == k && (t.addClass("mod_minicart_pop_nil"), c(), b = "", b = f ? '<p>您的购物车是空的<br />去挑选喜欢的商品吧&nbsp;<a target="_blank" href="http://guang.' + G.header.domain + '" ytag="00799">随便逛逛>></a></p>': '<p>您的购物车是空的<br />如您已添加商品，请<a href="https://base.' + G.header.domain + "/login.html?url=" + encodeURIComponent(location.href) + '" ytag="00701">登录</a>查看</p>', g.html(b).removeClass("hide"), h = !0);
                    G.header.login.mouseEnterAndOut(e, a, null, "mod_minicart_on")
                }
            })
        }
    }
};
G.header.locMap = {
    11E4: "北京 8 2001 110000 110108 3792 0 3792_131".split(" "),
    12E4: "天津 8 2001 120000 120100 120101 0 2860_2858".split(" "),
    13E4: "河北 8 2001 130000 130100 130181 0 816_814".split(" "),
    14E4: "山西 8 2001 140000 140100 140181 0 2492_2490".split(" "),
    15E4: "内蒙古 8 2001 150000 150100 150122 0 2018_2016".split(" "),
    21E4: "辽宁 10 2001 210000 210100 210181 0 5671_1900".split(" "),
    22E4: "吉林 10 2001 220000 220100 220104 0 1832_1830".split(" "),
    23E4: "黑龙江 10 2001 230000 230100 230112 0 1001_999".split(" "),
    31E4: "上海 2 1 310000 310100 310104 0 2626_2621".split(" "),
    32E4: "江苏 1 1 320000 320100 320103 0 1601_1591".split(" "),
    33E4: "浙江 1 1 330000 330100 330105 3227 3227_3225".split(" "),
    34E4: "安徽 1 1 340000 340100 340102 3 3_1".split(" "),
    35E4: "福建 15 1001 350000 350100 350181 0 5150_201".split(" "),
    36E4: "江西 3 3001 360000 360100 360102 0 1720_1718".split(" "),
    37E4: "山东 9 2001 370000 370200 370202 0 2342_2329".split(" "),
    41E4: "河南 11 3001 410000 410100 410181 0 3490_1144".split(" "),
    42E4: "湖北 3 3001 420000 420100 420102 1325 1325_1323".split(" "),
    43E4: "湖南 12 3001 430000 430100 5457 0 5162_1454".split(" "),
    44E4: "广东 6 1001 440000 440100 440103 0 421_403".split(" "),
    440100 : "广州 6 1001 440000 440100 440104 0 3763_403".split(" "),
    440200 : "韶关 6 1001 440000 440200 440281 0 442_403".split(" "),
    440300 : "深圳 7 1001 440000 440300 440304 0 421_403".split(" "),
    440400 : "珠海 6 1001 440000 440400 440403 0 429_403".split(" "),
    440500 : "汕头 7 1001 440000 440500 440515 433 433_403".split(" "),
    440600 : "佛山 6 1001 440000 440600 440606 0 493_403".split(" "),
    440700 : "江门 6 1001 440000 440700 440781 0 485_403".split(" "),
    440800 : "湛江 6 1001 440000 440800 440881 0 506_403".split(" "),
    440900 : "茂名 6 1001 440000 440900 440981 0 516_403".split(" "),
    441200 : "肇庆 6 1001 440000 441200 441283 523 523_403".split(" "),
    441300 : "惠州 7 1001 440000 441300 470 0 470_403".split(" "),
    441400 : "梅州 7 1001 440000 441400 441481 0 461_403".split(" "),
    441500 : "汕尾 7 1001 440000 441500 441581 0 476_403".split(" "),
    441600 : "河源 7 1001 440000 441600 441624 0 454_403".split(" "),
    441700 : "阳江 6 1001 440000 441700 441702 504 504_403".split(" "),
    441800 : "清远 6 1001 440000 441800 441881 0 532_403".split(" "),
    441900 : "东莞 7 1001 440000 441900 481 0 481_403".split(" "),
    442E3: "中山 6 1001 440000 442000 483 0 483_403".split(" "),
    445100 : "潮州 7 1001 440000 445100 445121 0 541_403".split(" "),
    445200 : "揭阳 7 1001 440000 445200 445281 0 545_403".split(" "),
    445300 : "云浮 6 1001 440000 445300 445381 0 551_403".split(" "),
    45E4: "广西 7 1001 450000 450100 450109 0 601_556".split(" "),
    46E4: "海南 7 1001 460000 460100 460105 5537 5537_789".split(" "),
    5E5: "重庆 4 4001 500000 500100 500103 0 182_158".split(" "),
    51E4: "四川 13 4001 510000 510100 510181 0 6505_2652".split(" "),
    52E4: "贵州 4 4001 520000 520100 520181 0 695_693".split(" "),
    53E4: "云南 13 4001 530000 530100 530181 0 3560_3077".split(" "),
    54E4: "西藏 13 4001 540000 540100 540121 0 2998_2996".split(" "),
    61E4: "陕西 5 5001 610000 610100 5053 0 5053_2212".split(" "),
    62E4: "甘肃 5 5001 620000 620100 620102 0 5763_299".split(" "),
    63E4: "青海 5 5001 630000 630100 630123 0 2162_2160".split(" "),
    64E4: "宁夏 5 5001 640000 640100 640121 0 2132_2130".split(" "),
    65E4: "新疆 14 5001 650000 650100 650102 0 2880_2878".split(" ")
};
G.header.common = {
    template: {
        fillWithTPL: function(a, b, c, d, e) {
            if (b) { ! c && !1 !== c && (c = a + "_tpl");
                d = !1 === c ? d || "": $("#" + c).html().replace(/^\s*\x3c!--/, "").replace(/--\x3e\s*$/, "");
                var g = {};
                d = d.replace(/<@([0-9a-zA-Z_-]+)@>((.|\s)*?)<@_\1@>/g,
                function(a, b, e) {
                    g[b] = e;
                    return "[#" + b + "#]"
                });
                $.each(g,
                function(a, e) {
                    var c = [],
                    d = b[a];
                    d && $.each(d,
                    function(a, b) {
                        c.push(G.header.common.template.fillWithTPL(!1, b, !1, e.replace(/<_index_>/g, a - 0 + 1)))
                    });
                    g[a] = c.join("")
                });
                c = d.replace(/\{([0-9a-zA-Z_-]+)\}/g,
                function(a, e) {
                    return void 0 !== b[e] ? b[e] : ""
                }).replace(/\[#([0-9a-zA-Z_-]+)#\]/g,
                function(a, b) {
                    return void 0 !== g[b] ? g[b] : b
                }).replace(/^\s+/, "");
                if (e || !1 === a) return c;
                $("#" + a).html(c)
            }
        }
    },
    browser: function() {
        function a() {
            for (var a in e) e[a] && (d.system = a)
        }
        var b = navigator.userAgent.toLowerCase(),
        c = window.opera,
        d = {
            engine: 0,
            system: 0,
            browser: 0,
            version: 0
        },
        e = {},
        g = {},
        f = {},
        h,
        e = {
            macintosh: -1 < b.indexOf("macintosh"),
            windows: -1 < b.indexOf("windows"),
            linux: -1 < b.indexOf("linux"),
            android: -1 < b.indexOf("android"),
            ipad: -1 < b.indexOf("ipad"),
            iphone: -1 < b.indexOf("iphone")
        },
        g = {
            ie6: !window.XMLHttpRequest || f.quirk,
            ie7: g.ie6 && g.ie8,
            ie7Compat: 7 == document.documentMode,
            ie8: !!document.documentMode,
            ie8Compat: 8 == document.documentMode,
            ie9: 9 == document.documentMode
        },
        f = {
            ie: !!window.ActiveXObject,
            quirk: "BackCompat" == document.compatMode,
            webkit: -1 < b.indexOf(" applewebkit/"),
            opera: !!c && c.version,
            gecko: "Gecko" == navigator.product && !f.webkit && !f.opera
        };
        if (f.ie) for (h in g) if (g[h]) return d.engine = "ie",
        d.browser = h,
        d.version = parseInt(b.match(/msie (\d+)/)[1]),
        a(),
        d;
        if (f.webkit) return - 1 < b.indexOf("safari") ? -1 < b.indexOf("chrome") ? (d.browser = "chrome", d.version = "latest") : (d.browser = "safari", d.version = parseInt(b.match(/ applewebkit\/(\d+)/)[1])) : (d.browser = "webkit", d.version = "unknown"),
        d.engine = "webkit",
        a(),
        d;
        if (f.opera) return d.engine = "opera",
        d.browser = "opera",
        d.version = parseInt(c.version()),
        a(),
        d;
        f.gecko && ( - 1 < b.indexOf("firefox") ? (d.browser = "firefox", d.version = b.match(/rv:(\d+)/)[1]) : (d.browser = "unknown", d.version = "unknown"), d.engine = "gecko", a());
        return d
    },
    css3test: function(a) {
        var b = document.createElement("div"),
        c = ["Khtml", "Ms", "O", "Moz", "Webkit"],
        d = c.length - 1;
        if (a in b.style) return ! 0;
        a = a.replace(/^[a-z]/,
        function(a) {
            return a.toUpperCase()
        });
        for (d = c.length - 1; 0 <= d;) {
            if (c[d] + a in b.style) return ! 0;
            d--
        }
        return ! 1
    },
    loadImg: function(a, b) {
        if (a) {
            b = b || "back_src";
            for (var c = a.getElementsByTagName("IMG"), d = 0, e = c.length; d < e; d++) {
                var g = c[d],
                f = g.getAttribute(b);
                "" == g.src && f && (g.src = f)
            }
        }
    },
    getWhId: function() {
        var a = G.createFnQueue(),
        b = 0;
        return function(c) {
            _whId = G.header.common.getCookie("wsid");
            a.add(c);
            2 == b || !1 !== _whId ? a.exec(_whId) : 1 != b && (b = 1, G.header.api.getCurLoc(function(c) {
                b = 2;
                a.exec(c.wsid)
            }))
        }
    } (),
    setBust: function() {
        if (window.top !== window.self) try {
            window.top.location.host || this.bust()
        } catch(a) {
            this.bust()
        }
    },
    bust: function() {
        document.write = "";
        "admin.icson.com" != location.host && (window.top.location = window.self.location, setTimeout(function() {
            document.body.innerHTML = ""
        },
        0), window.self.onload = function(a) {
            document.body.innerHTML = ""
        })
    },
    recordLs: function() {
        var a = G.header.common.parseUrl();
        $.each(a,
        function(a, c) {
            $.each(c,
            function(a, b) {
                a = (a + "").toLowerCase(); ("ls" == a || "us" == a) && G.header.common.addCookie(a, b, "/", 604800, "." + G.header.domain)
            })
        })
    },
    checkNumber: function(a) {
        return /^[1-9]\d*$/.test(a)
    },
    serverTime: function() {
        var a = (new Date(window.serverTime)).getTime();
        return a ? new Date(a) : new Date
    } (),
    getCookie: function(a) {
        return (a = document.cookie.match(RegExp("(^| )" + a + "(?:=([^;]*))?(;|$)"))) ? a[2] ? unescape(a[2]) : "": ""
    },
    addCookie: function(a, b, c, d, e) {
        a = a + "=" + escape(b) + "; path=" + (c || "/") + (e ? "; domain=" + e: "");
        0 < d && (b = new Date, b.setTime(b.getTime() + 1E3 * d), a += ";expires=" + b.toGMTString());
        document.cookie = a
    },
    delCookie: function(a, b) {
        document.cookie = a + "=;path=/;" + (b ? "domain=" + b + ";": "") + "expires=" + (new Date(0)).toGMTString()
    },
    userLevelName: {
        "0": "土星会员",
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
    _getPicUrl: function(a, b, c) {
        var d = a.split("R", 2);
        a = d[0];
        var d = a.split("-", 3),
        e = d[0],
        g = d[1];
        return "http://img" + (parseInt(d[2]) % 2 ? "1": "2") + ".icson.com/product/" + b + "/" + e + "/" + g + "/" + a + (0 == c ? "": "-" + (10 > c ? "0" + c: c)) + ".jpg"
    },
    tipsLevel: {
        "0": "info",
        1 : "warn",
        2 : "error",
        3 : "right",
        4 : "help"
    },
    getTipStr: function(a, b, c, d) {
        if (null == a) return "";
        if (null == b || !(b in G.header.common.tipsLevel)) b = 0;
        if (0 == b || 4 == b) b = 1;
        b = G.header.common.tipsLevel[b];
        var e = "";
        if ("big" == d) {
            "array" != $.type(a) && (a = [a]);
            var g = [];
            1 < a.length && (d = a.shift(), $.each(a,
            function(a, b) {
                g.push("<p>" + b + "</p>")
            }), a.unshift(d));
            g = 0 < g.length ? '<div class="bd">' + g.join("") + "</div>": "";
            e = '<div class="inner"> <b class="icon icon_msg3 icon_msg3_' + b + '"></b><div class="hd"><strong class="tit">' + (0 < a.length ? a[0] : "") + "</strong></div>" + g + "</div>";
            e = c ? e: '<div class="para_blo para_' + b + '">' + e + "</div>"
        } else e = '<b class="icon icon_msg0 icon_msg0_' + b + '"></b><span class="para_tit">' + a + "</span>",
        e = c ? e: '<p class="para_inb para_' + b + '">' + e + "</p>";
        return e
    },
    getTipStr_cart: function(a, b, c, d) {
        if (null == a) return "";
        if (null == b || !(b in G.header.common.tipsLevel)) b = 0;
        if (0 == b || 4 == b) b = 1;
        b = G.header.common.tipsLevel[b];
        var e = "";
        if ("big" == d) {
            "array" != $.type(a) && (a = [a]);
            var g = [];
            1 < a.length && (d = a.shift(), $.each(a,
            function(a, b) {
                g.push("<p>" + b + "</p>")
            }), a.unshift(d));
            g = 0 < g.length ? g.join("") : "";
            e = '<div class="inner"> <b class="icon icon_msg3 icon_msg3_' + b + '"></b><div class="hd"><strong class="tit">' + (0 < a.length ? a[0] : "") + "</strong></div>" + g + "</div>";
            e = c ? e: '<div class="para_blo para_' + b + '">' + e + "</div>"
        } else e = '<b class="icon icon_msg0 icon_msg0_' + b + '"></b><span class="para_tit">' + a + "</span>",
        e = c ? e: '<p class="para_inb para_' + b + '">' + e + "</p>";
        return e
    },
    goToCart: function(a, b, c) {
        a && (c = $(c).attr("ytag") || $(c).attr("YTAG") || "", 0 == window.yPageId && 0 == window.yPageLevel ? c = "": c && (c = window.yPageLevel + "." + window.yPageId + "" + c), G.header.common.addCookie("backurl", location.href, "/", 0, "." + G.header.domain), "object" == typeof a ? 0 < a.pid && (location.href = "http://buy." + G.header.domain + "/cart.html?" + ((a.isPackage && 1 == a.isPackage ? "pkgid=": "pid=") + a.pid) + "&pnum=" + (a.pnum || 1) + (a.isPackage && 1 == a.isPackage ? "": "&mid=" + (a.mid || a.pid)) + (a.price_id && 0 < a.price_id ? "&price_id=" + a.price_id: "") + (0 != b ? "&ism=" + b: "") + (c ? "&ytag=" + c: "")) : location.href = "http://buy." + G.header.domain + "/cart.html?ids=" + a + (1 == b ? "&ism=1": "") + (c ? "&ytag=" + c: ""))
    },
    goToCartWithThis: function(a, b, c) {
        return G.header.common.goToCart(b, c, a)
    },
    allowedWhInfo: {
        1 : "上海",
        1001 : "深圳",
        2001 : "北京",
        3001 : "武汉",
        4001 : "重庆",
        5001 : "西安"
    },
    serviceAreasSeq: "2621 3225 1591 1 403 201 1323 1718 789 556 131 2858 814 1454 1144 2329 2490 1900 1830 999 2212 299 2016 158 2652 3077 693 2996 2130 2160 2878".split(" "),
    sh_icson_delivery_city: ["2621", "3225", "1591", "1"],
    getLocationId: function() {
        return G.header.common.getCookie("prid") || "2626_2621"
    },
    setLocationId: function(a, b) {
        if (a) {
            G.header.common.addCookie("prid", a, "/", 2592E3, "." + G.header.domain);
            var c = a.split("_")[1],
            d = a.split("_")[0];
            G.header.common.loc.setLocByIcsonCode(0, c, d,
            function(a) {
                if ("undefined" != typeof a.gbProvinceId) return $.isFunction(b) && b(a),
                !0;
                $.isFunction(b) && b(a);
                return ! 1
            });
            return ! 0
        }
        $.isFunction(b) && b(loc);
        return ! 1
    },
    getSiteId: function() {
        return this.getCookie("wsid") || 1
    },
    setSiteId: function(a) {
        return a ? (G.header.common.addCookie("wsid", a, "/", 2592E3, "." + G.header.domain), !0) : !1
    },
    getProvId: function() {
        return G.header.common.getLocationId().split("_")[1]
    },
    parseUrl: function() {
        var a = function(a) {
            a = (a + "").replace(/(&amp;|\?)/g, "&").split("&");
            for (var b = {},
            e = a.length,
            g = 0; g < e; g++) {
                var f = a[g].indexOf("="); - 1 != f && (b[a[g].substr(0, f).replace(/[^a-zA-Z0-9_]/g, "")] = unescape(a[g].substr(f + 1)))
            }
            return b
        },
        b = location.href.toString().indexOf("#"),
        b = 0 > b ? "": location.href.toString().substring(b, location.href.toString().length);
        return {
            search: a(location.search.substr(1)),
            hash: a(b)
        }
    },
    encodeHtml: function(a) {
        return a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#039;").replace(/"/g, "&quot;")
    },
    tips: {
        err: function(a, b, c) {
            this._set(a, 2, b, c)
        },
        info: function(a, b, c) {
            this._set(a, 0, b, c)
        },
        warn: function(a, b, c) {
            this._set(a, 1, b, c)
        },
        suc: function(a, b, c) {
            this._set(a, 3, b, c)
        },
        help: function(a, b, c) {
            this._set(a, 4, b, c)
        },
        none: function(a, b) {
            this._set(!1, 0, a, b)
        },
        _set: function(a, b, c, d) {
            d = $.extend({
                autoHide: !0,
                style: ""
            },
            d || {});
            "inner" != d.style && "bigtop" != d.style && (d.style = "");
            var e = "tips" + d.style,
            g = "tipstimeout" + d.style;
            $(c).data(g) && (clearTimeout($(c).data(g)), $(c).removeData(g));
            var f = $(c).data(e),
            h = "bigtop" == d.style ? "big": "";
            if (!f || 0 == f.parent().length) f = $(G.header.common.getTipStr(a, b, !1, h)),
            $(c).data(e, f),
            "inner" == d.style ? c.empty().append(f) : "bigtop" == d.style ? f.insertBefore(c) : f.insertAfter(c);
            f.hide();
            if (!1 !== a) {
                if (null == b || !(b in G.header.common.tipsLevel)) b = 0;
                e = "";
                e = "bigtop" == d.style ? "para_blo para_" + G.header.common.tipsLevel[b] + " cart_tip": "para_inb para_" + G.header.common.tipsLevel[b];
                f.empty().html(G.header.common.getTipStr(a, b, !0, h)).removeClass().addClass(e).fadeIn(200);
                d.autoHide && $(c).data(g, setTimeout(function() {
                    f && f.fadeOut(200)
                },
                "boolean" == $.type(d.autoHide) ? 5E3: d.autoHide))
            }
        },
        _setCart: function(a, b, c, d) {
            d = $.extend({
                autoHide: !0,
                style: ""
            },
            d || {});
            "inner" != d.style && "bigtop" != d.style && (d.style = "");
            var e = "tips" + d.style,
            g = "tipstimeout" + d.style;
            $(c).data(g) && (clearTimeout($(c).data(g)), $(c).removeData(g));
            var f = $(c).data(e),
            h = "bigtop" == d.style ? "big": "";
            if (!f || 0 == f.parent().length) f = $(G.header.common.getTipStr_cart(a, b, !1, h)),
            $(c).data(e, f),
            "inner" == d.style ? c.empty().append(f) : "bigtop" == d.style ? f.insertBefore(c) : f.insertAfter(c);
            f.hide();
            if (!1 !== a) {
                if (null == b || !(b in G.header.common.tipsLevel)) b = 0;
                e = "";
                e = "bigtop" == d.style ? "para_blo para_" + G.header.common.tipsLevel[b] + " cart_tip": "para_inb para_" + G.header.common.tipsLevel[b];
                f.empty().html(G.header.common.getTipStr_cart(a, b, !0, h)).removeClass().addClass(e).fadeIn(200);
                d.autoHide && $(c).data(g, setTimeout(function() {
                    f && f.fadeOut(1E4)
                },
                "boolean" == $.type(d.autoHide) ? 5E3: d.autoHide))
            }
        },
        setLoading: function(a) {},
        unsetLoading: function(a) {},
        swapInput: function(a) {
            if (!a || !a.target) return null;
            a.defaultValue = a.defaultValue || "";
            a.focusClass = a.focusClass || "";
            a.blurClass = a.blurClass || "";
            $(a.target).focus({
                opt: a
            },
            function(a) {
                var c = $(this).val(); (c == a.data.opt.defaultValue || "" == c) && $(this).val("");
                $(this).removeClass(a.data.opt.blurClass).addClass(a.data.opt.focusClass);
                0 <= c.indexOf(a.data.opt.defaultValue) && $(this).val(c.replace(a.data.opt.defaultValue, ""))
            }).blur({
                opt: a
            },
            function(a) {
                var c = $(this).val();
                c == a.data.opt.defaultValue || "" == c ? $(this).val(a.data.opt.defaultValue).removeClass(a.data.opt.focusClass).addClass(a.data.opt.blurClass) : $(this).removeClass(a.data.opt.blurClass).addClass(a.data.opt.focusClass);
                0 <= c.indexOf(a.data.opt.defaultValue) && $(this).val(c.replace(a.data.opt.defaultValue, ""))
            });
            $(a.target).blur();
            return $(a.target)
        }
    },
    addToken: function(a, b) {
        var c = this.getToken();
        if ("" == a || 0 != (0 > a.indexOf("://") ? location.href: a).indexOf("http")) return a;
        if ( - 1 != a.indexOf("#")) {
            var d = a.match(/\?.+\#/);
            if (d) {
                var e = d[0].split("#"),
                c = [e[0], "&g_tk=", c, "&g_ty=", b, "#", e[1]].join("");
                return a.replace(d[0], c)
            }
            e = a.split("#");
            return [e[0], "?g_tk=", c, "&g_ty=", b, "#", e[1]].join("")
        }
        return "" == c ? a + ( - 1 != a.indexOf("?") ? "&": "?") + "g_ty=" + b: a + ( - 1 != a.indexOf("?") ? "&": "?") + "g_tk=" + c + "&g_ty=" + b
    },
    getToken: function() {
        var a = this.getCookie("skey");
        return null == a ? "": this.time33(a)
    },
    time33: function(a) {
        for (var b = 0,
        c = a.length,
        d = 5381; b < c; ++b) d += (d << 5) + a.charAt(b).charCodeAt();
        return d & 2147483647
    },
    localShare: function() {
        var a = G.createFnQueue(),
        b = 0,
        c = !1;
        return function(d) {
            a.add(d);
            2 == b && c ? a.exec(c) : 1 != b && (b = 1, $.ajax({
                url: "http://st.icson.com/static_v1/js/app/localShare.js?v=1.1",
                dataType: "script",
                crossDomain: !0,
                cache: !0,
                scriptCharset: "gb2312",
                success: function() {
                    G.app.localShare(function() {
                        b = 2;
                        c = this;
                        a.exec(c)
                    })
                }
            }))
        }
    } (),
    post: function(a, b, c) {
        G.header.common.post.pIndex = (G.header.common.post.pIndex || 0) + 1;
        var d = $('<iframe name="pIframe_' + G.header.common.post.pIndex + '" src="about:blank" style="display:none" width="0" height="0" scrolling="no" allowtransparency="true" frameborder="0"></iframe>').appendTo($(document.body)),
        e = [];
        $.each(b,
        function(a, b) {
            e.push('<input type="hidden" name="' + a + '" value="" />')
        });
        /(\?|&(amp;)?)fmt=[^0 &]+/.test(a) || (a += (0 < a.indexOf("?") ? "&": "?") + "fmt=1");
        var g = $('<form action="' + a + '" method="post" target="pIframe_' + G.header.common.post.pIndex + '">' + e.join("") + "</form>").appendTo($(document.body));
        $.each(b,
        function(a, b) {
            g.children("[name=" + a + "]").val(b)
        });
        d[0].callback = function(a) {
            "function" == typeof c && c(a);
            $(this).src = "about:blank";
            $(this).remove();
            g.remove();
            d = g = null
        };
        $.browser.msie && 6 == $.browser.version ? (d[0].pIndex = G.header.common.post.pIndex, d[0].ie6callback = function() {
            g.target = "pIframe_" + this.pIndex;
            g.submit()
        },
        d[0].src = location.protocol + "//st." + G.header.domain + "/static_v1/htm/ie6post.htm") : g.submit()
    }
};
G.header.common.serviceAreasSeqGB = "340000 110000 500000 350000 620000 520000 450000 460000 130000 230000 410000 420000 430000 360000 320000 220000 210000 150000 640000 630000 610000 370000 140000 510000 310000 120000 650000 540000 530000 330000 440000".split(" ");
G.header.common.loc = function() {
    var a = null,
    b = {
        _domain: G.domain,
        _t: 31536E3,
        isDefault: !1,
        locInfo: null,
        weakCheck: function() {
            var a = this.getCookieLoc(),
            b = a.prid.split("_")[1],
            c = a.prid.split("_")[0];
            return 0 == b || 0 == c || b == c || !a.loc || !parseInt(a.wsid, 10) ? !1 : !0
        },
        strongCheck: function() {
            var b = this.getCookieLoc(),
            c = G.header.locMap,
            d = b.prid.split("_")[1],
            h = b.prid.split("_")[0],
            k = b.loc.split("_");
            if (!a) return ! 1;
            var m = a.getLocInfoByPrid(h, d),
            n = k[3],
            s = k[5],
            r = k[4],
            t = k[2],
            p = k[1],
            k = k[0],
            c = c[m.g_cid] || c[m.g_pid];
            if (h != m.y_did || d != m.y_pid || t != (m.g_pid || 0) || n != (m.g_cid || 0) || r != (m.g_did || 0) || s != (m.g_aid || 0)) return ! 1;
            d = c && c[2];
            return ! d || !(d == p && d == b.wsid) || !(c && c[1] == k) ? !1 : !0
        },
        getWsidFromLocmap: function(a, b) {
            var c = G.header.locMap;
            return (c = c[a] || c[b]) ? c[2] : ""
        },
        getAreaidFromLocmap: function(a, b) {
            var c = G.header.locMap;
            return (c = c[a] || c[b]) ? c[1] : ""
        },
        getCookiePrid: function() {
            var a = G.header.common.getCookie;
            return a("prid")
        },
        getCookieWsid: function() {
            var a = G.header.common.getCookie;
            return a("wsid")
        },
        getCookieLoc: function() {
            var a = G.header.common.getCookie,
            b = {};
            b.prid = a("prid");
            b.loc = a("loc");
            b.wsid = a("wsid");
            return b
        },
        setDefLoc: function() {
            var a = this.getDefLoc();
            this.setLocCookie(a)
        },
        getDefLoc: function() {
            return {
                prid: "2626_2621",
                wsid: 1,
                loc: "2_1_310000_310100_310104_0"
            }
        },
        formatLocInfo: function(a) {
            var b = this.getWsidFromLocmap(a.g_cid, a.g_pid);
            return {
                loc: this.getAreaidFromLocmap(a.g_cid, a.g_pid) + "_" + b + "_" + (a.g_pid || 0) + "_" + (a.g_cid || 0) + "_" + (a.g_did || 0) + "_" + (a.g_aid || 0),
                prid: (a.y_did || 0) + "_" + (a.y_pid || 0),
                wsid: b
            }
        },
        setLocCookie: function(a) {
            var b = G.header.common.addCookie;
            b("prid", a.prid, "/", this._t, "." + this._domain);
            b("loc", a.loc, "/", this._t, "." + this._domain);
            b("wsid", a.wsid, "/", this._t, "." + this._domain)
        },
        getLocByIp: function() {
            var a = G.createFnQueue(),
            b = 0;
            return function(c, d) {
                var k = this;
                a.add(d);
                2 == b ? a.exec(k.curLoc) : 1 != b && (b = 1, $.ajax({
                    url: "http://base.yixun.com/w/loc/getloc?noSetCookie=" + c,
                    dataType: "jsonp",
                    cache: !1,
                    async: !1,
                    timeout: 3E3,
                    success: function(c) {
                        b = 2;
                        c.iRet ? k.setDefLoc() : k.curLoc = c.data;
                        a.exec(k.getDefLoc())
                    },
                    error: function() {
                        b = 2;
                        k.setDefLoc();
                        a.exec(k.getDefLoc())
                    }
                }))
            }
        } (),
        log: function() {
            window.locLog = window.locLog || [];
            var a = this.getCookieLoc();
            locLog.push({
                loc: a.loc,
                wsid: a.wsid,
                prid: a.prid
            })
        },
        loadRegion: function(b) {
            a ? $.isFunction(b) && b() : $.ajax({
                url: "http://static.gtimg.com/js/yx.region.js",
                dataType: "script",
                cache: !0,
                scriptCharset: "utf-8",
                timeout: 6E3,
                success: function() {
                    a = new regionYX;
                    $.isFunction(b) && b()
                },
                error: function() {
                    $.isFunction(b) && b()
                }
            })
        },
        doStrongCheck: function() {
            var c = function() {
                b.log();
                $(document).trigger("area_init")
            };
            b.loadRegion(function() {
                if (a) {
                    var d = b.strongCheck(),
                    f = b.getCookieLoc().prid,
                    h = a.getLocInfoByPrid(f.split("_")[0], f.split("_")[1]);
                    d ? c() : f && h ? (d = b.formatLocInfo(h), b.setLocCookie(d), c()) : b.getLocByIp(0, c)
                } else b.getLocByIp(0, c)
            })
        },
        setLocByPrid: function(c, d, f, h) {
            b.loadRegion(function() {
                if (a) {
                    var k = a.getLocInfoByPrid(f, d),
                    m = b.getWsidFromLocmap(k.g_cid, k.g_pid),
                    n = b.getAreaidFromLocmap(k.g_cid, k.g_pid),
                    m = {
                        CityName: k.y_cname || "",
                        CommunityName: k.y_aname || "",
                        DistrictName: k.y_dname || "",
                        ProvinceName: k.y_pname || "",
                        gbCityId: k.g_cid || 0,
                        gbCommunityId: k.g_aid || 0,
                        gbDistrictId: k.g_did || 0,
                        gbProvinceId: k.g_pid || 0,
                        icsonCityId: k.y_cid || 0,
                        icsonDistrictId: k.y_did || 0,
                        icsonProvinceId: k.y_pid || 0,
                        wsid: m,
                        zoneid: n
                    };
                    c || (k = b.formatLocInfo(k), b.setLocCookie(k))
                } else m = null;
                $.isFunction(h) && h(m)
            })
        }
    },
    c = {
        initSwitch: function() {
            c.locSite()
        },
        sitemap: [{
            name: "华东",
            info: [{
                name: "上海",
                code: "310000"
            },
            {
                name: "浙江",
                code: "330000"
            },
            {
                name: "江苏",
                code: "320000"
            },
            {
                name: "安徽",
                code: "340000"
            }]
        },
        {
            name: "华南",
            info: [{
                name: "广东",
                info: [{
                    name: "潮州",
                    code: "445100"
                },
                {
                    name: "东莞",
                    code: "441900"
                },
                {
                    name: "佛山",
                    code: "440600"
                },
                {
                    name: "广州",
                    code: "440100"
                },
                {
                    name: "河源",
                    code: "441600"
                },
                {
                    name: "惠州",
                    code: "441300"
                },
                {
                    name: "江门",
                    code: "440700"
                },
                {
                    name: "揭阳",
                    code: "445200"
                },
                {
                    name: "茂名",
                    code: "440900"
                },
                {
                    name: "梅州",
                    code: "441400"
                },
                {
                    name: "清远",
                    code: "441800"
                },
                {
                    name: "汕头",
                    code: "440500"
                },
                {
                    name: "汕尾",
                    code: "441500"
                },
                {
                    name: "韶关",
                    code: "440200"
                },
                {
                    name: "深圳",
                    code: "440300"
                },
                {
                    name: "阳江",
                    code: "441700"
                },
                {
                    name: "云浮",
                    code: "445300"
                },
                {
                    name: "湛江",
                    code: "440800"
                },
                {
                    name: "肇庆",
                    code: "441200"
                },
                {
                    name: "中山",
                    code: "442000"
                },
                {
                    name: "珠海",
                    code: "440400"
                }]
            },
            {
                name: "福建",
                code: "350000"
            },
            {
                name: "海南",
                code: "460000"
            },
            {
                name: "广西",
                code: "450000"
            }]
        },
        {
            name: "华北",
            info: [{
                name: "北京",
                code: "110000"
            },
            {
                name: "天津",
                code: "120000"
            },
            {
                name: "河北",
                code: "130000"
            },
            {
                name: "山东",
                code: "370000"
            },
            {
                name: "山西",
                code: "140000"
            },
            {
                name: "内蒙古",
                code: "150000"
            }]
        },
        {
            name: "华中",
            info: [{
                name: "湖北",
                code: "420000"
            },
            {
                name: "江西",
                code: "360000"
            },
            {
                name: "湖南",
                code: "430000"
            },
            {
                name: "河南",
                code: "410000"
            }]
        },
        {
            name: "东北",
            info: [{
                name: "辽宁",
                code: "210000"
            },
            {
                name: "吉林",
                code: "220000"
            },
            {
                name: "黑龙江",
                code: "230000"
            }]
        },
        {
            name: "西南",
            info: [{
                name: "重庆",
                code: "500000"
            },
            {
                name: "四川",
                code: "510000"
            },
            {
                name: "云南",
                code: "530000"
            },
            {
                name: "贵州",
                code: "520000"
            },
            {
                name: "西藏",
                code: "540000"
            }]
        },
        {
            name: "西北",
            info: [{
                name: "陕西",
                code: "610000"
            },
            {
                name: "甘肃",
                code: "620000"
            },
            {
                name: "宁夏",
                code: "640000"
            },
            {
                name: "青海",
                code: "630000"
            },
            {
                name: "新疆",
                code: "650000"
            }]
        }],
        randerSitemap: function() {
            var a = 500,
            b = 1E3,
            c = "";
            $.each(this.sitemap,
            function(d, k) {
                c += '<dl class="mod_storage_item"><dt class="mod_storage_area">' + k.name + '：</dt><dd class="mod_storage_city">';
                var m = !1;
                $.each(k.info,
                function(b, d) {
                    d.code ? c += '<a ytag="00' + (a + b) + '" href="javascript:;" c="' + d.code + '" title="前往' + d.name + '">' + d.name + "</a>": (c += '<a class="mod_storage_more" ytag="00' + (a + b) + '" href="javascript:;" c="' + d.code + '" title="前往' + d.name + '更多城市">' + d.name + "<i></i></a>", m = d.info)
                });
                c += "</dd>";
                m && (c += '<dd class="mod_storage_extend hide"><div class="mod_storage_city">', $.each(m,
                function(a, d) {
                    c += '<a ytag="0' + b+++'" href="javascript:;" c="' + d.code + '" title="前往' + d.name + '">' + d.name + "</a>"
                }), c += "</div></dd>");
                c += "</dl>";
                a += 10 * (d + 1)
            });
            c += '<p class="mod_storage_state">易迅商品暂时只支持配送至中国大陆地区</p>';
            $("#j_storage_con").html(c)
        },
        locSite: function(a) {
            var b = G.header.common.getCookie;
            a = b("loc").split("_");
            var b = a[2],
            d = G.header.locMap; (a = d[a[3]]) || (a = d[b] || d["310000"]);
            b = a[0];
            $("#j_city_name").html(b);
            var h = $("#j_city_con");
            G.header.login.mouseEnterAndOut(h,
            function() {
                h.attr("fill") || (h.attr("fill", "true"), c.randerSitemap(), c.bindSwitchEvent())
            },
            null, "mod_city_con_on")
        },
        bindSwitchEvent: function() {
            var c = this;
            $("#j_storage_con a").unbind().click(function() {
                var d = $(this);
                if (d.hasClass("mod_storage_more")) {
                    var f = $(".mod_storage_extend", d.parents(".mod_storage_item"));
                    d.hasClass("mod_storage_more_on") ? (f.hide(), d.removeClass("mod_storage_more_on")) : (d.addClass("mod_storage_more_on"), f.show());
                    return ! 1
                }
                f = d.attr("c");
                d = d.html();
                $("#j_storage_con").hide();
                $("#j_storage_ing").html('<p>正在切换<span class="c_tx0">' + d + "...</span></p>").show();
                var h = G.header.locMap[f],
                k = h[2],
                m = h[7],
                n = h.slice(1, 7).join("_");
                b.loadRegion(function() {
                    if (a) {
                        var d = a.getLocInfo(0, 0, h[4], 0),
                        d = b.formatLocInfo(d);
                        b.setLocCookie(d)
                    } else b.setLocCookie({
                        wsid: k,
                        prid: m,
                        loc: n
                    });
                    c.switchSite(k, location.href)
                });
                return ! 1
            })
        },
        switchSite: function(a, b) {
            b = b || "http://www." + G.header.domain;
            b = b.split("#")[0];
            0 < b.indexOf("event." + G.header.domain + "/event") || 0 < b.indexOf("event." + G.header.domain + "/store") ? b = "http://www." + G.header.domain + "": 0 < b.indexOf("searchex." + G.header.domain) && (b = b.replace(/([\?&]page=)([^&#]*)/,
            function(a, b) {
                return b
            }), 0 > b.indexOf("areacode=") && (b = b.replace(/([^&#]*\.html)(\??)/g,
            function(a, b, c) {
                return b + "?areacode=" + G.header.common.getCookie("wsid") + (c ? "&": "")
            })), 0 > b.indexOf("area=") && (b = b.replace(/([^&#]*html)(\??)/g,
            function(a, b, c) {
                return b + "?area=" + G.header.common.getCookie("wsid") + (c ? "&": "")
            })), 0 > b.indexOf("?t=") ? b = 0 > b.indexOf("?") ? b + "?t=" + Math.random() : b + "&t=" + Math.random() : b.replace(/([\?&]t=)([^&#]*)/,
            function(a, b) {
                return b + Math.random()
            }));
            location.replace(b.replace(/(areacode=|area=)[^&#]*/g,
            function(a, b) {
                return b + G.header.common.getCookie("wsid")
            }))
        }
    },
    d = {
        _p_data: !1,
        initSelection: function(c, g, f, h) {
            var k = null;
            b.loadRegion(function() {
                if (!a) return ! 1;
                prid = b.getCookiePrid();
                var m = prid.split("_")[0];
                c || (c = m);
                b.strongCheck() || (c = "2626");
                k = a.getLocInfoByPrid(c, 0);
                d._isSetCookie = !1 === f ? !1 : !0;
                d.callback = g;
                m = k.g_aname || "";
                $("#area_name").attr("v", k.g_aid || k.g_did).html(k.g_pname + " " + k.g_cname + " " + k.g_dname + " " + m);
                d.renderSelection(k);
                $.isFunction(h) && h();
                d.bindSelectEvent()
            })
        },
        bindSelectEvent: function() {
            $("#area_show_result").unbind("click").bind("click",
            function() {
                var b = a.getLocInfo($("#area_name").attr("v"), 0, 0, 0),
                c = $(this).find(">div").eq(0);
                c.hasClass("area_item_current") ? (c.removeClass("area_item_current"), $(".bd_act").hide()) : (c.addClass("area_item_current"), $(".bd_act").show(), $("#p_box a[v='" + b.g_pid + "']").click(), $("#c_box a[v='" + b.g_cid + "']").click(), b.g_aid && $("#d_box a[v='" + b.g_did + "']").click());
                return ! 1
            });
            $("#area_result_box").find("div").each(function(a) {
                $(this).unbind("click").bind("click",
                function() {
                    $("#area_result_box").find("div").removeClass("area_item_current");
                    $(this).addClass("area_item_current");
                    $("#area_box .area_list").hide();
                    $("#area_box .area_list").eq(a).show();
                    return ! 1
                })
            });
            $(document).unbind("click").bind("click",
            function(a) {
                $(a.target).parents("#select_area_act").length || ($(".hd_act").find(">div").eq(0).removeClass("area_item_current"), $("#area_box").hide())
            })
        },
        renderSelection: function(a) {
            var b = $("#area_box");
            html = '<div class="area_item_list" id="area_result_box">\t\t\t\t\t<div class="area_item" id="p_wrap">\t\t\t\t\t<p><span class="area">' + a.g_pname + '</span><span class="arrow"></span></p>\t\t\t\t\t</div>\t\t\t\t\t<div class="area_item" id="c_wrap">\t\t\t\t\t<p><span class="area">' + a.g_cname + '</span><span class="arrow"></span></p>\t\t\t\t\t</div>\t\t\t\t\t<div class="area_item" id="d_wrap">\t\t\t\t\t<p><span class="area">' + a.g_dname + '</span><span class="arrow"></span></p>\t\t\t\t\t</div>\t\t\t\t\t<div class="area_item" id="a_wrap" style="display:none">\t\t\t\t\t<p><span class="area">' + (a.g_aname || "") + '</span><span class="arrow"></span></p>\t\t\t\t\t</div></div>\t\t\t\t\t<div id="p_box" class="area_list storage_list"></div>\t\t\t\t\t<div class="area_list" id="c_box"></div>\t\t\t\t<div class="area_list" id="d_box"></div>\t\t\t\t<div class="area_list" id="a_box"></div>\t\t\t\t';
            b.html(html);
            this.renderProvinceList()
        },
        renderProvinceList: function(a, b) {
            var c = $("#p_box"),
            d = this; ! 1 === d._p_data && (d._p_data = "", $.each(G.logic.constants.allowedWhInfo,
            function(a, b) {
                var c = "";
                $.each(G.header.common.serviceAreasSeqGB,
                function() {
                    var b = G.header.locMap[this];
                    b[2] == a && (c = c + '<li><a v="' + this + '" title="' + b[0] + '" href="javascript:void(0);">' + b[0] + "</a></li>")
                });
                var e = ['<div class="storage_item">', "<p>" + b + "仓服务：</p>", "<ul>", "" + c + "", "</ul></div>"].join("");
                d._p_data += e
            }), d._p_data += '<p class="tip">易迅商品暂时只支持配送至中国大陆地区</p>');
            c.html(d._p_data);
            c.find("a").unbind("click").bind("click",
            function() {
                var a = $(this).attr("v");
                $("#p_wrap .area").html($(this).html());
                $("#area_result_box .area_item").removeClass("area_item_current");
                $("#c_wrap").addClass("area_item_current");
                $("#p_box").hide();
                $("#c_box").show();
                $("#c_wrap .area").html("请选择市");
                $("#d_wrap .area").html("请选择区县");
                $("#a_wrap .area").html("请选择配送区");
                $("#area_name").attr("aid") || $("#a_wrap").hide();
                $("#d_box").html("");
                d.renderCityList(a);
                return ! 1
            })
        },
        renderCityList: function(b) {
            var c = $("#c_box"),
            d = "";
            b = a.getCityListByPid(b);
            var h = this;
            0 < b.length && $.each(b,
            function(a, b) {
                d = d + '<a v="' + b.g_cid + '" title="' + b.g_cname + '" href="javascript:void(0);"' + (4 < b.g_cname.length + 0 ? ' class="staus01"': "") + ">" + (b.g_cname + "") + "</a>"
            });
            b = ['<p class="city_all">', "" + d + "", "</p>"].join("");
            c.html(b);
            c.find("a").unbind("click").bind("click",
            function() {
                var a = $(this).attr("v");
                $("#c_wrap .area").html($(this).html());
                $("#area_result_box .area_item").removeClass("area_item_current");
                $("#d_wrap").addClass("area_item_current");
                $("#c_box").hide();
                $("#d_box").show();
                $("#d_wrap .area").html("请选择区县");
                $("#a_wrap .area").html("请选择配送区");
                $("#area_name").attr("aid") || $("#a_wrap").hide();
                h.renderDistrictList(a);
                return ! 1
            })
        },
        renderDistrictList: function(c) {
            var d = this,
            f = $("#d_box"),
            h = "";
            c = a.getDistrictListByCid(c);
            if (0 < c.length) {
                var k = [],
                m = [];
                $.each(c,
                function(a, b) {
                    4 < b.g_dname.length ? k.push(b) : m.push(b)
                });
                k.sort(function(a, b) {
                    return a.g_dname.toString().localeCompare(b.g_dname.toString())
                });
                m.sort(function(a, b) {
                    return a.g_dname.length == b.g_dname.length ? 0 : a.g_dname.length > b.g_dname.length ? 1 : -1
                });
                c = $.merge(m, k);
                $.each(c,
                function(a, b) {
                    h = h + '<a v="' + b.g_did + '" title="' + b.g_dname + '" href="javascript:void(0);"' + (4 < b.g_dname.length + 0 ? ' class="staus01"': "") + ">" + b.g_dname + "</a>"
                });
                l = null
            }
            c = ['<p class="city_all">', "" + h + "", "</p>"].join("");
            f.html(c);
            f.find("a").unbind("click").bind("click",
            function() {
                var c = $(this).attr("v"),
                e = $(this).html(),
                f = a.getLocInfo(0, 0, c, 0);
                if (f.g_aid) return $("#d_wrap .area").html($(this).html()),
                $("#area_result_box .area_item").removeClass("area_item_current"),
                $("#a_wrap").addClass("area_item_current"),
                $("#a_wrap").show(),
                $("#d_box").hide(),
                $("#a_box").show(),
                d.renderAreaList(c),
                !1;
                $("#area_result_box .area_item").removeClass("area_item_current");
                $("#area_show_result > div").eq(0).removeClass("area_item_current");
                $("#area_box").hide();
                $("#d_wrap .area").html(e);
                f = $("#p_wrap .area").html() + " " + $("#c_wrap .area").html() + " " + $("#d_wrap .area").html();
                $("#area_name").attr("did", c).attr("v", c).html(f).removeAttr("aid");
                f = a.getLocInfo(0, 0, c, 0);
                c = b.getWsidFromLocmap(f.g_cid, f.g_pid);
                d._isSetCookie && b.setLocCookie(b.formatLocInfo(f));
                $.isFunction(d.callback) && d.callback(f.y_did, f.y_pid, c)
            })
        },
        renderAreaList: function(c) {
            var d = this,
            f = $("#a_box"),
            h = "";
            c = a.getAreaListByDid(c);
            0 < c.length && ($.each(c,
            function(a, b) {
                h = h + '<a v="' + b.g_aid + '" title="' + b.g_aname + '" href="javascript:void(0);"' + (4 < b.g_aname.length + 0 ? ' class="staus01"': "") + ">" + b.g_aname + "</a>"
            }), l = null);
            c = ['<p class="city_all">', "" + h + "", "</p>"].join("");
            f.html(c);
            f.find("a").unbind("click").bind("click",
            function() {
                var c = $(this).attr("v"),
                e = $(this).html();
                $("#area_result_box .area_item").removeClass("area_item_current");
                $("#area_show_result > div").eq(0).removeClass("area_item_current");
                $("#area_box").hide();
                $("#a_wrap .area").html(e);
                e = $("#p_wrap .area").html() + " " + $("#c_wrap .area").html() + " " + $("#d_wrap .area").html() + " " + $("#a_wrap .area").html();
                $("#area_name").attr("aid", c).attr("v", c).html(e).removeAttr("did");
                c = a.getLocInfo(0, 0, 0, c);
                e = b.getWsidFromLocmap(c.g_cid, c.g_pid);
                d._isSetCookie && b.setLocCookie(b.formatLocInfo(c));
                $.isFunction(d.callback) && d.callback(c.y_did, c.y_pid, e)
            })
        }
    };
    b.log();
    b.weakCheck() ? b.log() : b.getLocByIp(0,
    function() {
        b.log()
    });
    return {
        initSwitchSite: c.initSwitch,
        initChangeArea: d.initSelection,
        getSiteId: b.getCookieWsid,
        getPrid: b.getCookiePrid,
        getLoc: b.getCookieLoc,
        strongCheck: b.doStrongCheck,
        setLocByIcsonCode: b.setLocByPrid
    }
} ();
G.util.parse = G.util.parse || {
    url: G.header.common.parseUrl
};
G.util.cookie = G.util.cookie || {
    get: G.header.common.getCookie,
    del: G.header.common.delCookie,
    add: G.header.common.addCookie
};
G.util.localShare = G.header.common.localShare;
G.logic.login = G.header.login;
G.logic.constants = G.logic.constants || G.header.common;
G.logic.constants.setLocationId = G.header.common.setLocationId;
G.logic.getAdItem = function(a, b, c, d) {
    G.logic.getAdItem.options = G.logic.getAdItem.options || {
        beforeFunc: {},
        afterFunc: {}
    };
    a = a + "_" + b;
    c && $.isFunction(c) && (G.logic.getAdItem.options.beforeFunc[a] = c);
    d && $.isFunction(d) && (G.logic.getAdItem.options.afterFunc[a] = d);
    $.ajax({
        url: "http://d.icson.com/ad/" + a + ".js",
        dataType: "script",
        cache: !1,
        scriptCharset: "gb2312"
    })
};
G.logic.getAdItem.dealAd = function(a, b, c) {
    b = b + "_" + c;
    if (! (G.logic.getAdItem.options.beforeFunc[b] && !1 === G.logic.getAdItem.options.beforeFunc[b](a))) {
        var d = 1280 <= window.screen.availWidth ? 1 : 0;
        $("div[ad_id]").each(function() {
            var b = $(this),
            c = b.attr("ad_id");
            if (a[c]) {
                var f = "";
                b.html().replace(/\x3c!--\s*((?:.|\s)+?)\s*--\x3e/,
                function(a, b) {
                    f = b
                });
                var h = "",
                k = 0,
                m;
                for (m in a[c]) var n = a[c][m],
                s = {
                    url: n.url,
                    img: d || !n.img_narrow ? n.img_wide: n.img_narrow,
                    width: d || !n.img_narrow ? n.w_width: n.n_width,
                    height: d || !n.img_narrow ? n.w_height: n.n_height,
                    text: n.content,
                    index: ++k
                },
                h = h + f.replace(/{(url|img|text|index|width|height)}/g,
                function(a, b) {
                    return s[b]
                });
                b.replaceWith(h)
            }
        });
        if (G.logic.getAdItem.options.afterFunc[b]) G.logic.getAdItem.options.afterFunc[b](a)
    }
};
G.header.init();
$(document).ready(function() {
    $("#charset").val((document.charset || document.characterSet || "").toLowerCase());
    if ($.browser.msie && 9 > parseInt($.browser.version, 10)) {
        var a = $("body"),
        b = function() {
            1190 > (document.documentElement.clientWidth || document.body.clientWidth) ? a.addClass("ic_mini") : a.removeClass("ic_mini")
        };
        a.hasClass("ic_mini") || (b(), $(window).bind("resize", b))
    }
});
/* |xGv00|990930ed61694e1d914a1aedfbb2e9cd */

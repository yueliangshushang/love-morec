window.INDEX_DOUBLE12 = !0;
timeStat[3] = new Date - timeStat[0];
$.extend(G.index.data, {
    serverTime: function() {
        var a = (new Date(window.serverTime)).getTime();
        return a ? new Date(a) : new Date
    } (),
    visibleH: function() {
        return document.documentElement.clientHeight || document.body.clientHeight
    } ()
}); (function(a) {
    var c = !1,
    e = {};
    a(window).bind("load",
    function() {
        c = !0;
        for (var a in e) {
            for (var b = e[a], g = "http://c.isdspeed.qq.com/code.cgi?domain=" + a + (b.uin ? "&uin=" + b.uin: "") + "&key=cgi,type,code,time,rate", b = b.params, f = 0; f < b.length; f++) var h = b[f],
            g = g + ("&" + (f + 1) + "_1=" + h.cgi),
            g = g + ("&" + (f + 1) + "_2=" + h.type),
            g = g + ("&" + (f + 1) + "_3=" + h.code),
            g = g + ("&" + (f + 1) + "_4=" + h.time),
            g = g + ("&" + (f + 1) + "_5=" + h.rate); (new Image).src = g
        }
        e = {}
    });
    a.fn.extend({
        myShow: function() {
            a(this).removeClass("hide");
            return this
        },
        myHide: function() {
            a(this).addClass("hide");
            return this
        }
    });
    a.extend({
        returnCode: function(a) {
            var b = {
                url: "",
                sTime: "",
                eTime: "",
                retCode: "",
                errCode: "",
                frequence: 1,
                uin: "",
                domain: "",
                isReport: !1,
                timeout: 3E3,
                timeoutCode: 444,
                formatUrl: !0
            },
            g;
            for (g in a) b[g] = a[g];
            b.sTime || (b.sTime = (new Date).getTime());
            b.timeout && setTimeout(function() {
                b.isReport || b.report(!1, b.timeoutCode)
            },
            b.timeout);
            b.report = function(a, b) {
                this.isReport = !0;
                if (this.url) {
                    this.eTime || (this.eTime = (new Date).getTime());
                    this.retCode = a ? 1 : 2;
                    this.errCode = isNaN(parseInt(b)) ? "0": parseInt(b);
                    var d = this.url.replace(/^.*\/\//, "").replace(/\/.*/, ""); ! this.domain && (this.domain = d ? d: location.host);
                    var d = this.eTime - this.sTime,
                    g = encodeURIComponent(this.formatUrl ? this.url.match(/^[\w|\/|.|:|-]*/)[0] : this.url),
                    m = "http://c.isdspeed.qq.com/code.cgi?domain=" + this.domain + "&cgi=" + g + "&type=" + this.retCode + "&code=" + this.errCode + "&time=" + d + "&rate=" + this.frequence + (this.uin ? "&uin=" + this.uin: "");
                    Math.random() < 1 / this.frequence && (c ? (new Image).src = m: (d = {
                        cgi: g,
                        type: this.retCode,
                        code: this.errCode,
                        time: d,
                        rate: this.frequence
                    },
                    e[this.domain] ? e[this.domain].params.push(d) : e[this.domain] = {
                        uin: this.uin ? this.uin: "",
                        params: [d]
                    }))
                }
            };
            return b
        },
        createFnQueue: function(d) {
            var b = [];
            return {
                add: function(d) {
                    a.isFunction(d) && b.push(d)
                },
                exec: function(a) {
                    if (!1 !== d) for (; 0 < b.length;) b.shift()(a);
                    else for (var c = 0,
                    e = b.length; c < e; c++) if (!1 === b[c](a)) return ! 1
                },
                clear: function() {
                    b.length = 0
                }
            }
        }
    });
    jQuery.ajaxPrefilter("json jsonp script",
    function(d) {
        var b;
        if (b = d.report) {
            var c = d.error ||
            function() {},
            e,
            h,
            k = "string" == typeof b ? {
                url: d.url,
                key: b
            }: b,
            l = a.returnCode(k);
            if ((h = d.reportName) && "string" == typeof h) window[h] = l;
            else if (e = d.success) d.success = function(a) {
                l.eTime = (new Date).getTime();
                e(a);
                l.isReport = !0;
                setTimeout(function() {
                    l.report(!0, a[k.key]);
                    l = null
                },
                0)
            };
            d.error = function(a, b, d) {
                l.eTime = (new Date).getTime();
                c(a, b, d);
                setTimeout(function() {
                    var d = 2E6;
                    switch (b) {
                    case "timeout":
                        d = 201E4;
                        break;
                    case "parsererror":
                        d = 202E4;
                        break;
                    case "notmodified":
                        d = 203E4;
                        break;
                    case "error":
                        d = 204E4
                    }
                    a && (a.status && !isNaN(a.status)) && (d += parseInt(a.status, 10));
                    l.report(!1, d);
                    l = null
                },
                0)
            }
        }
    })
})(jQuery);
$.extend(G.index, {
    templates: {
        tpl_goods: '<li>                        <div class="mod_goods mod_goods_w80" _loaded="true">                            <div class="mod_goods_img load_effect">                                <a target="_blank" href="{URL}" ytag="{ytag}" title="{TITLE}"><img src="{pic80}" alt="{TITLE}" /></a>                            </div>                            <div class="mod_goods_info">                                <p class="{TITCLASS}"><a href="{URL}" target="_blank" title="{PROMOTE}" ytag="{ytag}">{PROMOTE}</a></p>                                <p class="mod_goods_price"><span class="mod_price"><i>&yen;</i><span>{PRICE}</span></span></p>                            </div>                        </div>                    </li>',
        tpl_tuan_goods: '<li class="ulike_r1_mark_wrap">                        <div class="mod_goods mod_goods_w80" _loaded="true">                            <div class="mod_goods_img load_effect">                                <a target="_blank" href="http://tuan.yixun.com/?pos={COMMODITYID}&DAP={DAP}" ytag="{ytag}" title="{TITLE}"><img src="{pic80}" alt="{TITLE}" /></a>                            </div>                            <div class="mod_goods_info">                                <p class="{TITCLASS}"><a href="http://tuan.yixun.com/?pos={COMMODITYID}&DAP={DAP}" target="_blank" title="{PROMOTE}" ytag="{ytag}">{PROMOTE}</a></p>                                <p class="mod_goods_price"><span class="mod_price"><i>&yen;</i><span>{PRICE}</span></span></p>                            </div>                        </div>\t\t\t\t\t\t<a target="_blank" class="ulike_r1_mark" href="http://tuan.yixun.com/?DAP={DAP}" ytag="{ytag}">团购</a>                    </li>',
        tpl_market_goods: '<li class="ulike_r1_mark_wrap">                        <div class="mod_goods mod_goods_w80" _loaded="true">                            <div class="mod_goods_img load_effect">                                <a target="_blank" href="http://sale.yixun.com/{MARKETTYPE}.html?DAP={DAP}#{COMMODITYID}" ytag="{ytag}" title="{TITLE}"><img src="{pic80}" alt="{TITLE}" /></a>                            </div>                            <div class="mod_goods_info">                                <p class="{TITCLASS}"><a href="http://sale.yixun.com/{MARKETTYPE}.html?DAP={DAP}#{COMMODITYID}" target="_blank" title="{PROMOTE}" ytag="{ytag}">{PROMOTE}</a></p>                                <p class="mod_goods_price"><span class="mod_price"><i>&yen;</i><span>{PRICE}</span></span></p>                            </div>                        </div>\t\t\t\t\t\t<a target="_blank" class="ulike_r1_mark j_market_mark" href="http://sale.yixun.com/{MARKETTYPE}.html?DAP={DAP}" ytag="{ytag}"></a>                    </li>',
        tpl_hotsale: '<li>                        <div class="mod_goods mod_goods_w80" _loaded="true">                            <div class="mod_goods_img load_effect">                                <a target="_blank" href="{URL}" ytag="{ytag}" title="{TITLE}"><img src="{pic80}" alt="{TITLE}" /></a>                            </div>                            <div class="mod_goods_info">                                <p class="mod_goods_promo {ISSHOW}"><a href="{URL}" target="_blank" title="已售{SOLDNUM}件" ytag={ytag}>已售{SOLDNUM}件</a></p>                                <p class="mod_goods_tit"><a target="_blank" href="{URL}" ytag="{ytag}" title="{TITLE}">{TITLE}</a></p>                                <p class="mod_goods_price"><span class="mod_price"><i>&yen;</i><span>{PRICE}</span></span></p>                            </div>                        </div>                    </li>',
        tpl_goodsPic: '<li class="sy_mod_fgoods_high">\t\t\t\t\t\t\t<a target="_blank" href="{url}" title="{title}" ytag="{ytag}"><img src="{picUrl}" alt="{title}" /></a>\t\t\t\t\t\t</li>',
        tpl_ad: '<li><a target="_blank" href="{url}" title="{title}" ytag="{ytag}"><img _src="{picUrl}" alt="{title}" /></a></li>',
        tpl_tejia: '<li>                        <div class="mod_goods" _loaded="true">                            <div class="mod_goods_img load_effect">                                <a target="_blank" href="{URL}" ytag="{ytag}" title="{TITLE}"><img src="{IMG}" alt="{TITLE}" /></a>                            </div>                            <div class="mod_goods_info">                                <p class="mod_goods_price"><span class="mod_price"><i>&yen;</i><span>{PRICE}</span></span></p>                                <p class="mod_goods_tit"><a target="_blank" href="{URL}" ytag="{ytag}" title="{TITLE}">{PROMOTE}</a></p>                            </div>                        </div>                    </li>',
        tpl_quick: '<li>\t\t\t\t\t\t<div class="mod_goods mod_goods_w100" _loaded="true">\t\t\t\t\t\t\t<div class="mod_goods_img load_effect">\t\t\t\t\t\t\t\t<a href="{URL}" target="_blank" title="{TITLE}" ytag="{ytag}"><img src="{pic120}" alt="{TITLE}" /><b class="hide {CLASSNAME}">{SHORT_PROMOTE}</b></a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<div class="mod_goods_info">\t\t\t\t\t\t\t\t<p class="mod_goods_tit"><a href="{URL}" target="_blank" title="{TITLE}" ytag="{ytag}">{PROMOTE}</a></p>\t\t\t\t\t\t\t\t<p class="mod_goods_price"><a href="{URL}" target="_blank" title="{TITLE}" ytag="{ytag}"><span class="mod_price mod_price_now"><i>&yen;</i><span>{PRICE}</span></span></a></p>\t\t\t\t\t\t\t\t<div class="mod_goods_stock">\t\t\t\t\t\t\t\t\t<a href="{URL}" target="_blank" title="{TITLE}" ytag="{ytag}"><em>库存</em>\t\t\t\t\t\t\t\t\t<span><i class="mod_goods_stock_bg2" w={STOCKPERCENT} style="width:100%"></i></span></a>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t<p class="dailybeta_goods_btn_wrap">\t\t\t\t\t\t\t\t\t<a href="javascript:void(0)" class="dailybeta_goods_btn" pid="{COMMODITYID}" title="立即抢" ytag="{ytag}">立即抢</a>\t\t\t\t\t\t\t\t</p>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>\t\t\t\t\t</li>',
        tpl_qbTomorrow: '<li>                            <div class="mod_goods mod_goods_w100" _loaded="true">                                <div class="mod_goods_img">                                    <a href="{URL}" target="_blank" title="{TITLE}" ytag="{ytag}"><img src="{pic120}" alt="{TITLE}" /></a>                                </div>                                <div class="mod_goods_info">                                    <p class="mod_goods_p1"><a href="{URL}" target="_blank" title="{TITLE}" ytag="{ytag}">惊喜价 请期待</a></p>                                    <p class="mod_goods_tit"><a href="{URL}" target="_blank" title="{TITLE}" ytag="{ytag}">{PROMOTE}</a></p>                                </div>                            </div>                        </li>',
        tpl_trigger: "<i>&bull;</i>",
        tpl_servTrigger: "<p>&bull;</p>",
        tpl_sliderTrigger: "<li>{index}</li>",
        tpl_ming: ' <li>\t\t\t\t\t\t\t<div class="ulike_r2_item">\t\t\t\t\t\t\t\t<a target="_blank" href="{url}" title="{title}" ytag="{ytag}"><img src="{picUrl}" alt="{title}" /></a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<div class="ulike_r2_tit">\t\t\t\t\t\t\t\t<a target="_blank" href="http://pinpai.yixun.com/?DAP={DAP}" title="名品会" ytag="{ytag}">名品会</a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<a target="_blank" href="http://pinpai.yixun.com/?DAP={DAP}" class="ulike_r2_more" ytag="{ytag}"><b>进入名品会频道</b><i></i></a>\t\t\t\t\t\t</li>',
        tpl_new: ' <li>\t\t\t\t\t\t\t<div class="ulike_r2_item">\t\t\t\t\t\t\t\t<a target="_blank" href="{url}" title="{title}" ytag="{ytag}"><img src="{picUrl}" alt="{title}" /></a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<div class="ulike_r2_tit">\t\t\t\t\t\t\t\t<a target="_blank" href="http://new.yixun.com/?DAP={DAP}" title="易迅新品" ytag="{ytag}">易迅新品</a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<a target="_blank" href="http://new.yixun.com/?DAP={DAP}" class="ulike_r2_more" ytag="{ytag}"><b>进入新品频道</b><i></i></a>\t\t\t\t\t\t</li>',
        tpl_hao: ' <li>\t\t\t\t\t\t\t<div class="ulike_r2_item">\t\t\t\t\t\t\t\t<a target="_blank" href="{url}" title="{title}" ytag="{ytag}"><img src="{picUrl}" alt="{title}" /></a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<div class="ulike_r2_tit">\t\t\t\t\t\t\t\t<a target="_blank" href="http://vip.yixun.com/zhoubian/index.html?DAP={DAP}" title="周边商城" ytag="{ytag}">周边商城</a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<a target="_blank" href="http://vip.yixun.com/zhoubian/index.html?DAP={DAP}" class="ulike_r2_more" ytag="{ytag}"><b>进入周边商城频道</b><i></i></a>\t\t\t\t\t\t</li>',
        tpl_faxian: ' <li>\t\t\t\t\t\t\t<div class="ulike_r2_item">\t\t\t\t\t\t\t\t<a target="_blank" href="{url}" title="{title}" ytag="{ytag}"><img src="{picUrl}" alt="{title}" /></a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<div class="ulike_r2_tit">\t\t\t\t\t\t\t\t<a target="_blank" href="http://faxian.yixun.com?DAP={DAP}" title="易迅发现" ytag="{ytag}">易迅发现</a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<a target="_blank" href="http://faxian.yixun.com?DAP={DAP}" class="ulike_r2_more" ytag="{ytag}"><b>进入发现频道</b><i></i></a>\t\t\t\t\t\t</li>',
        tpl_guang: ' <li>\t\t\t\t\t\t\t<div class="ulike_r2_item">\t\t\t\t\t\t\t\t<a target="_blank" href="{url}" title="{title}" ytag="{ytag}"><img src="{picUrl}" alt="{title}" /></a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<div class="ulike_r2_tit">\t\t\t\t\t\t\t\t<a target="_blank" href="http://guang.yixun.com?DAP={DAP}" title="易迅逛逛" ytag="{ytag}">易迅逛逛</a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<a target="_blank" href="http://guang.yixun.com?DAP={DAP}" class="ulike_r2_more" ytag="{ytag}"><b>进入逛逛频道</b><i></i></a>\t\t\t\t\t\t</li>',
        tpl_xiaoyi: ' <li>\t\t\t\t\t\t\t<div class="ulike_r2_item">\t\t\t\t\t\t\t\t<a target="_blank" href="{url}" title="{title}" ytag="{ytag}"><img src="{picUrl}" alt="{title}" /></a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<div class="ulike_r2_tit">\t\t\t\t\t\t\t\t<a target="_blank" href="http://shuo.yixun.com?DAP={DAP}" title="小易说事" ytag="{ytag}">小易说事</a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<a target="_blank" href="http://shuo.yixun.com?DAP={DAP}" class="ulike_r2_more" ytag="{ytag}"><b>进入小易说事频道</b><i></i></a>\t\t\t\t\t\t</li>',
        tpl_ulikeAd: '<li>\t\t\t\t\t\t\t<div class="ulike_r1_brand">\t\t\t\t\t\t\t\t<a target="_blank" href="{url}" title="{title}" ytag="{ytag}"><img src="{picUrl}" alt="{title}" /><span class="ulike_r1_tit"><em>{title}</em><span>{remarks}</span></span></a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</li>'
    },
    tplCbFns: {
        tpl_quick: function(a) {
            var c = a.EXTDATA ? a.EXTDATA: {},
            e,
            d;
            "string" == typeof c && (0 != c.indexOf("{") && (c = "{" + c + "}"), c = $.parseJSON(c));
            if ((d = parseInt(c.inventory, 10)) && (e = parseInt(a.INVENTORY, 10))) a.STOCKPERCENT = (e / d).toFixed(2);
            if (c.PROTYPE && c.PROCOUNT && (e = (c.PROCOUNT.match(/\d+/) || [])[0], d = ["用券减", "下单减", "已降"], c = parseInt(c.PROTYPE), e && 1E4 > e && (c = d[c - 1]))) a.SHORT_PROMOTE = c + "<br />" + e + "元",
            a.CLASSNAME = "mod_goods_mark_1";
            return ! 0
        },
        tpl_hotsale: function(a) {
            a.ISSHOW = !a.SOLDNUM || 0 == a.SOLDNUM ? "hide": "";
            a.SOLDNUM += 50;
            return ! 0
        }
    },
    _domLoaded: !1,
    _initSlider: !1,
    init: function() {
        this.gettf();
        this.poller("_ADTFRESULT", "mainSlider", {
            dom: $(".slider_img")
        });
        this.poller("_GDSTFRESULT", "quickBuy", {
            dom: $(".dailybeta_goods").eq(0)
        });
        this.loadImgWhenScroll();
        $(document).ready(function() {
            var a = G.index,
            c = a.data.serverTime.getTime(),
            e = (new Date("2014/01/25")).getTime(),
            d = (new Date("2014/02/07")).getTime(),
            b = $(".ic_header .grid_c1"),
            g = $("#j_fbanner");
            c >= e && c < d ? (g.remove(), setTimeout(function() {
                b.prepend('<div class="mod_fbanner" id="j_banner_flash"><div class="index_flash">                <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="1190" height="80" id="game" align="middle">                    <param name="movie" value="http://static.gtimg.com/icson/img/event/140116_newyear/1190x80.swf" />                    <param name="quality" value="high" />                    <param name="wmode" value="transparent">                    <param name="allowScriptAccess" value="always" />                    <embed name="game" src="http://static.gtimg.com/icson/img/event/140116_newyear/1190x80.swf" width="1190" height="80" wmode="transparent" allowScriptAccess="always" align="middle" type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer">                </object>                <a target="_blank" href="http://u.yixun.com/2014new" class="index_flash_link" ytag="00900"></a>\t\t\t</div>\t\t\t<i class="mod_fbanner_close" id="j_flash_close">close</i></div>');
                $("#j_flash_close").click(function() {
                    $("#j_banner_flash").slideUp()
                })
            },
            0)) : c < e && setTimeout(function() { (new Image).src = "http://static.gtimg.com/icson/img/event/140116_newyear/1190x80.swf"
            },
            4E3);
            a.sbanner();
            a = $("#j_chong");
            0 != a.length && a.attr("src", a.attr("_src")).removeAttr("_src")
        });
        $(window).bind("load",
        function() {
            var a = G.index;
            a._domLoaded = !0;
            a._initSlider || ($(document).trigger("init_slider"), a._initSlider = !0);
            a.slider({
                titleId: "#j_mi_trig",
                titleTag: "p",
                contentId: "#j_mi_cont",
                contentTag: "li",
                speed: 0
            })();
            a.servSlider();
            a.scroll({
                id: "#j_fslider",
                func: a.right2FAd
            });
            a.scroll({
                id: "#j_5Fl_glider",
                func: a.slider5F
            });
            a.notice();
            a.banner();
            window.top !== window && (a = 0 < window.top.location.host.indexOf("yixun.com") ? 1 : 2, (new Image).src = "http://c.isdspeed.qq.com/code.cgi?domain=www.yixun.com&cgi=iframeKidnap&type=" + a + "&code=0&time=0&rate=1")
        })
    },
    poller: function(a, c, e) {
        var d = 0,
        b = G.index,
        g = function() {
            var a = e.dom,
            d = a.attr("_module");
            b.loadPoolJson(function() {
                b.tFillDom(a, d, "POS_1");
                b[c](e)
            }); (new Image).src = "http://c.isdspeed.qq.com/code.cgi?domain=s1.smarty.51buy.com&cgi=" + encodeURIComponent("http://s1.smart.yixun.com/w/tf/gettfx?tfid=" + d) + "&type=2&code=444&time=" + ((new Date).getTime() - window.rStart) + "&rate=1"
        },
        f = setInterval(function() {
            13 > d++?!0 === window[a] ? (b[c](e), clearInterval(f)) : !1 === window[a] && (g(), clearInterval(f)) : (window[a] = !1, g(), clearInterval(f))
        },
        500)
    },
    sbanner: function() {
        var a = $("#j_sbanner"),
        c = function() {
            a.animate({
                height: "80px"
            },
            "slow",
            function() {
                $("#j_sbanner1").fadeOut("slow");
                $("#j_sbanner2").fadeIn("slow")
            })
        },
        e = 3E3; ! 0 === window.INDEX_DOUBLE12 && (e += 6E3);
        0 < a.length && setTimeout(function() {
            c()
        },
        e)
    },
    banner: function() {
        $("#j_fbanner_close").click(function() {
            $("#j_fbanner").slideUp("normal")
        });
        var a = $("#j_hint p"),
        c = a.length;
        if (1 < c) {
            var e = 0;
            setInterval(function() {
                var d = (e + 1) % c;
                a.eq(e).fadeOut(500,
                function() {
                    a.eq(d).fadeIn();
                    e = d
                })
            },
            6E3)
        }
        $("#j_hint_close").click(function() {
            $("#j_hint_wrap").slideUp()
        })
    },
    notice: function() {
        function a(a) {
            var e = "next" == a ? (d + 1) % b: (d - 1 + b) % b;
            c.eq(d).stop(0, 1).fadeOut(300,
            function() {
                c.eq(e).stop(0, 1).fadeIn(300,
                function() {
                    d = e
                })
            })
        }
        var c = $(".notice_list"),
        e = $("#j_nbtn"),
        d = 0,
        b = c.length;
        1 != b && ($("#j_nprev").click(function() {
            a("prev")
        }), $("#j_nnext").click(function() {
            a("next")
        }), e.myShow())
    },
    servSlider: function() {
        var a = $("#j_serv_glide");
        1 != a.find("li").length && (a = parseInt(a.attr("_ran"), 10) || 0, $("#j_glide_trig").myShow(), this.slider({
            titleId: "#j_glide_trig",
            titleTag: "p",
            contentId: "#j_serv_glide",
            contentTag: "li",
            initIndex: a
        })())
    },
    getServiceMsg: function() {
        var a = $("#j_serv_num");
        G.logic.login.getLoginUser(function(c) {
            c && (c.data && a.length) && $.ajax({
                url: "http://service.yixun.com/json.php?mod=orderurge&act=getnoticemsg",
                dataType: "jsonp",
                cache: !0,
                scriptCharset: "gb2312",
                report: "errno",
                success: function(c) {
                    if (0 == c.errno) {
                        c = c.data;
                        for (var d = 0,
                        b = 0,
                        g = c.length; b < g; b++) {
                            var f; (f = c[b].count) && (d += f)
                        }
                        0 < d && a.html(d).myShow()
                    }
                }
            })
        })
    },
    gettf: function() {
        for (var a = window.tfList || [], c = window.tfsList || {},
        e = 0, d = a.length; e < d; e++) {
            var b = a[e];
            b.lazyDo = b.lazyDo || "loadScriptWhenScroll";
            if ("function" == typeof this[b.lazyDo]) this[b.lazyDo](b)
        }
        for (e in c) this.loaduLike(c[e])
    },
    loadTf: function(a) {
        var c = this.data.siteId,
        e = this.data.uin,
        d = a.tfId,
        b = "&callback=" + (a.cb || "G.index.tfDataHandler"),
        g = "&skey=" + this.data.areaId,
        f,
        h,
        k = "&wsid=" + c;
        if ("string" == typeof d) h = "http://s1.smart.yixun.com/w/tf/gettfx?tfid=" + d,
        f = h + "&tcdn=1&type=jsonp" + g + b + k + e;
        else if (d instanceof Array) {
            var l = this.getCookie,
            m = l("loc") || "0",
            l = l("prid") || "0",
            m = m.split("_")[4] || "0",
            l = l.split("_")[0],
            c = "&biReserved=0:" + l + "," + m + "," + c;
            h = "http://s1.smart.yixun.com/w/tf/gettfxs?tfids=" + d.join("_");
            d = d.join(",");
            f = "http://s1.smart.yixun.com/w/tf/gettfxs?tcdn=1&tfids=" + d + g + b + k + e + c
        }
        var s = "string" == typeof a.tfId ? d: a.groupId,
        n = "tf_timer_" + s,
        r = function() {
            window[n] = null;
            var a = G.index;
            $('[_module="' + d + '"]').each(function() {
                var b = $(this),
                c = (b.attr("id").match(/(POS_\d*)_/) || [])[1] || "";
                a.loadPoolJson(function() {
                    var e = b.attr("_f");
                    a.tFillDom(b, d, c);
                    if (e && "function" == typeof a[e]) a[e]({
                        dom: b
                    });
                    else b.myShow();
                    a.loadImgWhenScroll(b)
                })
            })
        };
        return function() {
            window[n] = setTimeout(r, 6E3);
            $.ajax({
                url: f,
                dataType: "script",
                error: r,
                reportName: "report_" + s,
                report: {
                    url: h,
                    domain: "s1.smarty.51buy.com",
                    timeout: 6E3,
                    key: "iRet",
                    formatUrl: !1
                }
            })
        }
    },
    tfDataHandler: function(a) {
        a = a ? a: {};
        var c = a.data,
        e = a.tfId,
        d = this,
        b = function(a, b) {
            var c = a.attr("_f");
            if (c && "function" == typeof d[c]) d[c]({
                dom: a,
                data: b,
                tfid: e
            });
            else a.myShow();
            d.loadImgWhenScroll(a)
        },
        g = window["tf_timer_" + e];
        if (g) {
            clearTimeout(g);
            $('[_module="' + e + '"]').each(function() {
                var a = $(this),
                f,
                g = a.attr("id").match(/(POS_\d*)_/),
                h = a.attr("_e"),
                k;
                if (g && (g = g[1]) && (f = c[g])) h ? b(a, f) : (d.fillDom(a, f, "fill"), (k = a.attr("_lm")) && d.fillDom(a, c[k], "append"), b(a));
                else if (g) {
                    var p = G.index;
                    p.loadPoolJson(function() {
                        p.tFillDom(a, e, g);
                        b(a)
                    })
                }
            });
            var f = window["report_" + e],
            h = a.iRet,
            k = 0 == h ? !0 : !1;
            f && (f.eTime = (new Date).getTime(), f.isReport = !0, setTimeout(function() {
                f.report(k, h)
            },
            0))
        }
    },
    fillDom: function(a, c, e) {
        if (c && 0 != c.length) {
            var d = [],
            b,
            g,
            f,
            h = "fill" == e;
            e = a.attr(h ? "_tpl": "_lmTpl") || "tpl_goods";
            g = a.attr(h ? "_ytag": "_lmYtag") || "30000";
            b = a.attr("_n");
            f = c.length;
            f = h && b ? Math.min(b, f) : f;
            b = this.tplCbFns[e];
            e = this.templates[e];
            for (var k = 0; k < f; k++) {
                var l = c[k];
                this.decorateData(l, b);
                d.push(e.replace(/\{(\w+)\}/g,
                function(a, b) {
                    return "ytag" == b ? g++:l[b] || ""
                }))
            }
            h ? a.html(d.join("")) : a.append(d.join(""))
        }
    },
    multiTplFill: function(a, c, e, d) {
        if (c && !(0 > c.length)) {
            for (var b = [], g, f, h, k = 0, l = c.length; k < l; k++) {
                f = c[k];
                h = a[f];
                g = this.templates[f];
                if (0 === h.length) return ! 1;
                var m = h.splice(0, 1)[0];
                h = h.cbFn;
                d && (d[f] ? d[f].push(m) : d[f] = [m]);
                this.decorateData(m, h) ? b.push(g.replace(/\{(\w+)\}/g,
                function(a, b) {
                    return "ytag" == b ? e++:m[b] || ""
                })) : k--
            }
            return b.join("")
        }
    },
    loadPoolJson: function() {
        var a = $.createFnQueue(),
        c = 0;
        return function(e) {
            2 === c ? e() : 1 === c ? a.add(e) : (a.add(e), c = 1, $.ajax({
                url: "http://static.gtimg.com/51buy/js/index/pool.json.js?v=" + (new Date).getTime(),
                dataType: "script",
                scriptCharset: "utf-8",
                reportName: "report_poolJson",
                report: {
                    timeout: 1E4,
                    key: "iRet"
                },
                success: function() {
                    c = 2;
                    a.exec();
                    window.report_poolJson.report(!0, 0)
                }
            }))
        }
    } (),
    loadScriptWhenScroll: function(a) {
        var c = this.loadTf(a);
        this.scroll({
            height: this.getY($("#tf_" + a.tfId)) + 500,
            func: c
        })
    },
    loaduLike: function(a) {
        var c = this.loadTf(a);
        this.scroll({
            height: this.getY($("#tfs_1")) + 100,
            func: function() {
                setTimeout(function() {
                    c()
                },
                100)
            }
        })
    },
    mainSlider: function(a) {
        var c = a.dom;
        c.myShow();
        this.createTab($("#j_strigger"), this.templates.tpl_sliderTrigger, $(".slider_img").find("li").length, "on", "li");
        this.slider({
            titleId: "#j_strigger",
            titleTag: "li",
            contentId: ".slider_img",
            contentTag: "li",
            prevId: "#j_sprev",
            nextId: "#j_snext",
            areaId: "#j_main_slider"
        })();
        setTimeout(function() {
            var a = G.index;
            a._domLoaded || ($(document).trigger("init_slider"), a._initSlider = !0)
        },
        2E3);
        setTimeout(function() {
            $("[_src]", c).each(function() {
                var a = $(this);
                a.attr("src", a.attr("_src")).removeAttr("_src")
            })
        },
        9E3)
    },
    quickBuy: function(a) {
        a = a.dom;
        $("li", a).each(function() {
            $(".dailybeta_goods_btn", this).unbind().click(function() {
                $(this).attr("pid") && G.header.common.goToCartWithThis(this, {
                    pid: $(this).attr("pid")
                });
                return ! 1
            })
        });
        a.myShow();
        this.setStock(a)
    },
    qbTomorrow: function(a) {
        var c = this.data.serverTime,
        c = (new Date(c.getFullYear(), c.getMonth(), c.getDate(), 9)).getTime() + (9 <= c.getHours() ? 864E5: 0) - c,
        e = this.createTimer(c, [[$("#j_daily_h"), $("#j_dterm_h")], [$("#j_daily_m"), $("#j_dterm_m")], [$("#j_daily_s"), $("#j_dterm_s")]]);
        e(0, !0);
        setInterval(function() {
            e(0, 0)
        },
        1E3);
        var d = this.loadTf(a),
        b = !1,
        g = 0,
        f = $(".dailybeta_hd"),
        h = $(".dailybeta_goods");
        $(".dailybeta_change").click(function() {
            b || (d(), b = !0);
            var a = (g + 1) % 2;
            h.eq(g).myHide();
            h.eq(a).myShow();
            f.eq(g).myHide();
            f.eq(a).myShow();
            g = a;
            return ! 1
        })
    },
    setStock: function(a) {
        $("li", a).each(function() {
            var c = $(".mod_goods_stock i", this),
            e = "mod_goods_stock_bg2",
            d = a.attr("w") || 0.5,
            d = 100 * parseFloat(d);
            100 < d ? d = 90 : 0 > d && (d = Math.floor(100 * Math.random() + 1));
            79 < d && 101 > d ? d = Math.floor(20 * Math.random() + 40) : 49 < d && 80 > d ? d = Math.floor(20 * Math.random() + 25) : 50 > d && 30 < d ? (d = Math.floor(20 * Math.random() + 5), e = "mod_goods_stock_bg1") : 0 <= d && (d = Math.floor(10 * Math.random() + 5), e = "mod_goods_stock_bg1");
            var b = $(".mod_goods_img b", this);
            20 > d ? b.addClass("mod_goods_mark_2").html("即将<br />售罄</b>").myShow() : b.hasClass("mod_goods_mark_1") && b.myShow();
            c.animate({
                width: d + "%"
            },
            1E3, "",
            function() {
                c.removeClass().addClass(e)
            })
        })
    },
    adSlider: function(a) {
        var c = a.dom;
        a = a.tfid;
        var e = c.attr("id");
        this.createTab($("#j_leftad_" + a), this.templates.tpl_trigger, $("#" + e).find("li").length, "glide_on", "i");
        this.slider({
            titleId: "#j_leftad_" + a,
            titleTag: "i",
            contentId: "#" + e,
            contentTag: "li",
            className: "glide_on"
        })();
        c.myShow()
    },
    dealIntrest: function(a) {
        function c() {
            var a, b;
            6 > m.tpl_goods.length && ((a = t.tpl_goods) && 5 < a.length ? (m.tpl_goods = a, t.tpl_goods = []) : l.splice(0, 6));
            6 > m.tpl_ulikeAd.length && ((b = t.tpl_ulikeAd) && 5 < b.length ? (m.tpl_ulikeAd = b, t.tpl_ulikeAd = []) : l.splice(6 < l.length ? 6 : 0, 6));
            return G.index.multiTplFill(m, l, v, t)
        }
        function e() {
            if (! (3 > q)) {
                for (var a = [], b = {},
                d, c, e = B, f = 0; 3 > f; f++) {
                    if (0 == q) return;
                    d = n[p++];
                    c = h[d];
                    c.cbFn = function(a) {
                        0 < a.url.indexOf("#") && (a.url = a.url.replace(/^(.*)(#[^&]+)(&.*)/,
                        function(a, b, c, d) {
                            return b + d + c
                        }));
                        return x(a)
                    };
                    var g = k[d];
                    if (0 === c.length) {
                        c = t[g];
                        if (!c || 0 === c.length) {
                            q--;
                            n.splice(--p, 1);
                            continue
                        }
                        c = h[d] = c;
                        t[g] = []
                    }
                    a.push(g);
                    b[g] = c;
                    p %= q
                }
                return G.index.multiTplFill(b, a, e, t)
            }
        }
        function d(a) {
            var b = $(".ulike_r1 li", a);
            a = $(".ulike_r2 li", a);
            b.eq(0).addClass("ulike_r1_narrow");
            b.eq(6).addClass("ulike_r1_narrow");
            a.eq(0).addClass("ulike_r2_narrow");
            $(".j_market_mark").html(0 == s ? "早市": "天黑黑");
            a.hover(function() {
                $(this).addClass("ulike_r2_on")
            },
            function() {
                $(this).removeClass("ulike_r2_on")
            })
        }
        if (a) {
            clearTimeout(window.tf_timer_1);
            var b, g, f, h;
            if (b = window.tfsList["1"]) if (b = b.tfId, (g = a[b[0]]) && (g = g.data) && 0 != g.length) if ((f = a[b[1]]) && (f = f.data) && 0 != f.length) if ((h = a[b[2]]) && (h = h.data) && 0 != h.length) {
                var k = {
                    POS_1: "tpl_tuan",
                    POS_2: "tpl_xiaoyi",
                    POS_3: "tpl_new",
                    POS_4: "tpl_ming",
                    POS_5: "tpl_hao",
                    POS_6: "tpl_faxian",
                    POS_7: "tpl_guang"
                },
                l = [],
                m = {};
                m.tpl_goods = g.POS_1;
                m.tpl_ulikeAd = f.POS_1;
                m.tpl_goods && 5 < m.tpl_goods.length && l.push("tpl_goods", "tpl_goods", "tpl_goods", "tpl_goods", "tpl_goods", "tpl_goods");
                m.tpl_ulikeAd && 5 < m.tpl_ulikeAd.length && l.push("tpl_ulikeAd", "tpl_ulikeAd", "tpl_ulikeAd", "tpl_ulikeAd", "tpl_ulikeAd", "tpl_ulikeAd");
                var s = 11 > this.data.serverTime.getHours() ? 0 : 1,
                n = "POS_2 POS_3 POS_4 POS_5 POS_6 POS_7".split(" "),
                r = a[b[2]].sortData,
                p = 0,
                q = 5,
                x = function(a) {
                    a.url.replace(/[\?&]DAP=([^&#]*)/,
                    function(b, c) {
                        a.DAP = c
                    });
                    return ! 0
                };
                if (r) {
                    n.sort(function(a, b) {
                        return r[a] > r[b]
                    });
                    g = 0;
                    for (f = n.length; g < f; g++)"undefined" == typeof r[n[g]] && (q--, n.splice(g, 1), g--, f--)
                }
                var v = 21E3,
                B = 21500,
                t = {},
                w = c() || "";
                mod2 = e() || "";
                var F = $('[_group="1"]');
                if (w || mod2) {
                    $(".ulike_r1").html(w);
                    $(".ulike_r2").html(mod2);
                    d($("#ulikeS1"));
                    F.myShow();
                    var C = $(".ulike_bd"),
                    D = 0,
                    u = 1,
                    E = !1;
                    $("#j_ulike_change").click(function() {
                        if (!E) if (v += 1E3, B += 1E3, w = c() || "", mod2 = e() || "", !w && !mod2) {
                            if (E = !0, 1 == u) {
                                $(this).myHide();
                                return
                            }
                        } else u++,
                        4 == u && (E = !0),
                        F.append('<div class="ulike_bd hide" id="ulikeS' + u + '"><ul class="ulike_r1">' + w + '</ul><ul class="ulike_r2">' + mod2 + "</ul></div>"),
                        d($("#ulikeS" + u)),
                        C = $(".ulike_bd");
                        var a = (D + 1) % u;
                        C.eq(D).myHide();
                        C.eq(a).myShow();
                        D = a;
                        return ! 1
                    }).myShow();
                    var y = window.report_1,
                    z = 0,
                    H = !0,
                    A;
                    g = 0;
                    for (f = b.length; g < f; g++) A = a[b[g]].iRet,
                    0 != A && (H = !1, z = 0 == z ? A: z + "99" + A);
                    y && (y.eTime = (new Date).getTime(), y.isReport = !0, setTimeout(function() {
                        y.report(H, z)
                    },
                    0))
                }
            }
        }
    },
    hsTabs: function(a) {
        var c = a.tfId,
        e = "tf_timer_" + c;
        a = $("#tf_" + c);
        if (0 !== a.length) {
            var d = a.attr("data-attr"),
            b = this,
            g = [],
            f = function(a) {
                $("#j_mod_" + c).myHide();
                return ! 0
            },
            h = function(a, b, c) {
                $(a).remove();
                $(b).remove();
                c && $(c).remove()
            };
            a = function() {
                for (var a, b = 0,
                c = d.length; b < c; b++) d[b].replace(/^\s*(.*?)\s*$/,
                function(b, c) {
                    a = c
                }),
                d[b] = a,
                g.push(a + ":5:0:::");
                return 0 == c && f()
            };
            G.index["hotsaleCb" + c] = function(a) {
                if (window[e]) {
                    clearTimeout(window[e]);
                    var g;
                    if (a && (g = a.data) && !$.isEmptyObject(g) && 0 != g.length) {
                        for (var k, n, r = 0,
                        p = d.length; r < p; r++) k = d[r],
                        n = g[k],
                        !n || 5 > n.length ? (h("#j_ht_" + k, "#j_gap_" + k, "#j_pool_" + k), d.splice(r, 1), p--, r--) : (k = $("#j_pool_" + k), b.fillDom(k, n, "fill"), b.hsLazydo({
                            dom: k
                        }));
                        0 < p ? (g = Math.floor(Math.random() * p), b.slider({
                            titleId: "#j_rank_" + c,
                            titleTag: "li[_p]",
                            contentId: "#tf_" + c,
                            contentTag: ".sy_mod_rank_bd",
                            initIndex: g,
                            speed: 300
                        })()) : f()
                    } else f();
                    var q = window["report_" + c],
                    x = a.iRet,
                    v = 0 == x ? !0 : !1;
                    q && (q.eTime = (new Date).getTime(), q.isReport = !0, setTimeout(function() {
                        q.report(v, x)
                    },
                    0))
                }
            };
            var k = function() {
                window[e] = setTimeout(function() {
                    f();
                    window[e] = null
                },
                6E3);
                var a = "http://s1.smart.yixun.com/w/tf/gettfxbypid?tfid=" + c,
                d = "http://s1.smart.yixun.com/w/tf/gettfxbypid?tcdn=1&poolparam=" + g.join(",") + "&type=jsonp&wsid=" + b.data.siteId + "&tfid=" + c + "&callback=G.index.hotsaleCb" + c;
                $.ajax({
                    url: d,
                    dataType: "script",
                    error: f,
                    reportName: "report_" + c,
                    report: {
                        url: a,
                        domain: "s1.smarty.51buy.com",
                        timeout: 6E3,
                        key: "iRet",
                        formatUrl: !1
                    }
                })
            };
            d ? (d = d.split(","), a() || this.scroll({
                height: this.getY($("#tf_" + c)) + 500,
                func: k
            })) : f()
        }
    },
    right2FAd: function() {
        G.index.slider({
            titleId: ".flider_trigger",
            titleTag: "a",
            contentId: "#j_fslider",
            contentTag: "a",
            className: "flider_trigger_lk_on",
            initIndex: 0,
            auto: !1,
            speed: 500
        })()
    },
    slider5F: function() {
        var a = G.index.slider,
        c = a({
            titleId: "#j_5Fl_gtrigger",
            titleTag: "i",
            contentId: "#j_5Fl_glider",
            contentTag: "li"
        }),
        a = a({
            titleId: "#j_5Fr_gtrigger",
            titleTag: "i",
            contentId: "#j_5Fr_glider",
            contentTag: "li"
        });
        c();
        a()
    },
    goodsLazydo: function(a) {
        a = a.dom;
        $(".mod_goods", a).each(function() {
            $(this).parent().addClass("sy_mod_fgoods_low")
        });
        a.myShow()
    },
    tejiaLazydo: function(a) {
        var c = a.dom;
        a = a.data || [];
        var e = Math.floor(a.length / 5);
        c.myShow();
        if (0 != e && (this.fillDom(c, a.splice(0, 5), "fill"), c.attr("id", "j_tejia0"), 1 < e)) {
            for (var c = c.attr("_ytag"), d = 1; d < e; d++) $("#j_tejia_wrap").append('<ul class="ftejia_goods hide" id="j_tejia' + d + '" _tpl="tpl_tejia" _ytag="' + (c += 10) + '"></ul>'),
            this.fillDom($("#j_tejia" + d), a.splice(0, 5), "fill");
            var b = 0;
            $("#j_tejia_change").click(function() {
                var a = (b + 1) % e;
                $("#j_tejia" + b).myHide();
                $("#j_tejia" + a).myShow();
                b = a
            }).myShow()
        }
    },
    hsLazydo: function(a) {
        a = a.dom;
        var c = 1;
        0 === a.find(".sy_mod_rank_order").length && $(".mod_goods", a).each(function() {
            $(this).parent().prepend('<i class="sy_mod_rank_order sy_mod_rank_order_' + c + '">' + c+++"</i>")
        })
    },
    createTimer: function(a, c) {
        if (! (0 >= a)) return a = Math.floor(a / 1E3),
        function() {
            if (! (0 > a)) {
                var e = Math.floor(a / 3600),
                d = Math.floor(a / 60 % 60),
                b = a % 60;
                10 > e ? e = "0" + e: "";
                10 > d ? d = "0" + d: "";
                10 > b ? b = "0" + b: "";
                var g = [e, d, b];
                a -= 1;
                for (var f = 0; 3 > f; f++) $.each(c[f],
                function() {
                    $(this).html(g[f])
                })
            }
        }
    },
    createTab: function(a, c, e, d, b, g) {
        if (! (2 > e)) {
            d = [];
            var f = 1;
            for (b = 0; b < e; b++) d.push(c.replace(/\{(\w+)\}/g,
            function(a, b) {
                if ("index" == b) return f++
            }));
            a.html(d.join(""))
        }
    },
    slider: function(a) {
        function c() {
            b.auto && (clearInterval(n), n = setInterval(function() {
                d((g + 1) % b.len)
            },
            b.autoLag))
        }
        function e() {
            b.auto && clearInterval(n)
        }
        function d(a, c) {
            if (g != a || c) if (k.removeClass(function() {
                return b.className
            }).eq(a).addClass(b.className), !c && "fade" == b.effect) {
                var d = h.eq(a),
                e = $("img[" + b.backAttr + "]", d),
                f;
                0 < e.length && (f = e.attr(b.backAttr)) && e.attr("src", f).removeAttr(b.backAttr);
                p = h.eq(g);
                p.stop(1, 1).fadeOut(b.speed);
                d.stop(1, 1).css({
                    opacity: "0.5"
                }).show().animate({
                    opacity: "1"
                },
                b.speed);
                g = a;
                q && $.isFunction(q) && (b.curIndex = g, q(b))
            }
        }
        var b = {
            titleId: "",
            titleTag: "",
            contentId: "",
            contentTag: "",
            prevId: "",
            nextId: "",
            areaId: "",
            className: "on",
            initIndex: 0,
            timeLag: 300,
            auto: !0,
            speed: 500,
            autoLag: 6E3,
            effect: "fade",
            backAttr: "_src",
            callback: ""
        };
        $.extend(b, a);
        var g = b.initIndex,
        f = $(b.titleId),
        h = $(b.contentId).find(b.contentTag),
        k = f.find(b.titleTag),
        l = $(b.prevId),
        m = $(b.nextId),
        s = $(b.areaId),
        n = null,
        r = 0 < l.length && 0 < m.length,
        p = h.eq(g),
        q = b.callback;
        return function(a) {
            if (a) h = $(b.contentId).find(b.contentTag),
            k = $(b.titleId).find(b.titleTag),
            b.len = Math.min(k.length, h.length),
            d(0, 1);
            else if (0 === s.length && (s = h), b.len = Math.min(k.length, h.length), 0 != b.len) if (1 == b.len) k.myHide(),
            p.myShow();
            else {
                h.each(function() {
                    $(this).addClass("hide")
                });
                a = $("img[" + b.backAttr + "]", p);
                var n;
                0 < a.length && (n = a.attr(b.backAttr)) && a.attr("src", n).removeAttr(b.backAttr);
                p.myShow();
                var q = function() {
                    f.myShow();
                    d(b.initIndex, 1);
                    c();
                    k.hover(function() {
                        e();
                        d(k.index($(this)))
                    },
                    function() {
                        c()
                    });
                    h.hover(function() {
                        e()
                    },
                    function() {
                        c()
                    });
                    r && (l.click(function() {
                        d((g + b.len - 1) % b.len)
                    }).hover(function() {
                        e()
                    },
                    function() {
                        c()
                    }), m.click(function() {
                        d((g + 1) % b.len)
                    }).hover(function() {
                        e()
                    },
                    function() {
                        c()
                    }), s.hover(function() {
                        l.myShow();
                        m.myShow()
                    },
                    function() {
                        l.myHide();
                        m.myHide()
                    }))
                };
                G.index._domLoaded ? q() : $(document).bind("init_slider",
                function() {
                    q()
                })
            }
        }
    },
    getY: function(a) {
        return 0 == a.length ? 0 : a.offset().top
    },
    loadImgWhenScroll: function() {
        function a(a) {
            for (var b = 0,
            c = a.data.length; b < c; b++) {
                var e = a.data[b],
                h = $(e).attr("_src");
                h && !e.src && $(e).attr("src", h).removeAttr("_src")
            }
        }
        var c = G.index,
        e = c.data.visibleH;
        return function(d) {
            d = d || document;
            d = $("img[_src]", d);
            var b = {},
            g = d.length;
            if (0 != g) {
                for (var f = 0; f < g; f++) {
                    var h = d[f],
                    k = c.getY($(h));
                    0 != k && (k = k > e ? k: 0, b[k] ? b[k].push(h) : b[k] = [h])
                }
                for (f in b) c.scroll({
                    height: f,
                    data: b[f],
                    func: a
                })
            }
        }
    } (),
    scroll: function(a) {
        function c() {
            d.throttle(e, null, 100)
        }
        function e() {
            var a = f.heightList.length;
            if (0 === a) return b.unbind("scroll", c),
            b.unbind("resize", c),
            null;
            var d = h ? h.pageYOffset: 0,
            e = f.visibleH,
            s = [];
            try {
                e += Math.max(g.body.scrollTop, g.documentElement.scrollTop, d)
            } catch(n) {}
            for (d = 0; d < a && f.heightList[d]; d++) e > f.heightList[d] && (s.push(f.optList[d]), f.heightList.splice(d, 1), f.optList.splice(d, 1), d--);
            if (0 < s.length) {
                a = 0;
                for (e = s.length; a < e; a++) s[a].func(s[a])
            }
        }
        var d = G.index,
        b = $(window),
        g = document,
        f = {
            isBind: !1,
            heightList: [],
            optList: [],
            visibleH: d.data.visibleH
        },
        h = g.defaultView;
        return function(a) { ! 0 == a.clean && (f.heightList = [], f.optList = []);
            var e = void 0 != a.height ? a.height: d.getY($(a.id)),
            e = e - 200;
            f.visibleH < e ? (f.heightList.push(1 * e), f.optList.push(a)) : a.func(a);
            f.isBind || (c(), b.bind("scroll", c), b.bind("resize", c), f.isBind = !0)
        }
    } (),
    throttle: function(a, c, e) {
        clearTimeout(a.tId);
        a.tId = setTimeout(function() {
            a.call(c)
        },
        e)
    }
});
G.index.init();
timeStat[6] = new Date - timeStat[0];
/*  |xGv00|9a3030180e35dcfab98d29e96ee9d7c9 */

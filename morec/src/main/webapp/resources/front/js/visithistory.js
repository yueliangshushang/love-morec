$(function() {
	$("#visitList a[t=clearHistory]").bind(
			'click',
			function() {
				var exp = new Date();
				exp.setTime(exp.getTime() - 1);
				var cval = getCookie();
				if (cval != null) {
					document.cookie = "itemVisits:" + cval + "$|; expires=" + exp.toGMTString() + "; path=/";
					$("#visitList").empty().html('<div class="clear_jilu">您还没有浏览过任何商品。</div>');
				}
			});
});
function getCookie() {
	var allCookie = document.cookie;
	if (allCookie.indexOf("itemVisits:") != -1 && allCookie.indexOf("$|") != -1) {
		var myCookieStart = allCookie.indexOf("itemVisits:") + "itemVisits:".length;
		var myCookieEnd = allCookie.indexOf("$|", myCookieStart);
		var myCookieall = allCookie.substring(myCookieStart, myCookieEnd);
		return myCookieall;
	} else {
		return null;
	}
}
$(function() {
	if (navigator.cookieEnabled) {
		var listCount = 10;
		var myTitle = escape(itemInfo.name) + "^";
		var myUrl = escape(location.href) + "^";
		var myPicUrl=escape(itemInfo.pic_url) + "^";
		var myPrice = escape(itemInfo.price) + "$";
		var expTime = new Date(new Date().setMonth(new Date().getMonth() + 3));
		var edp = "|; expires=" + expTime.toGMTString() + "; path=/";
		if (getCookie() != null) {
			var myCookie = unescape(getCookie()).split("$");
			var myCookieTit = new Array();
			var myCookieUrl = new Array();
			var myCookiePicUrl = new Array();
			var myCookiePrice = new Array();
			for ( var i = 0; i < myCookie.length; i++) {
				var myCookieOne = myCookie[i].split("^");
				myCookieTit[i] = myCookieOne[0];
				myCookieUrl[i] = myCookieOne[1];
				myCookiePicUrl[i] = myCookieOne[2];
				myCookiePrice[i] = myCookieOne[3];
			}
			var tagDat = "";
			for ( var i = myCookieTit.length - 1; i >= 0; i--) {
				tagDat += "<li><a target='_blank' href='" + myCookieUrl[i] + "' title='" + myCookieTit[i] + "'class='img'>"
						+"<img src='"+myCookiePicUrl[i]+"_60x60.jpg' alt='"+myCookieTit[i]+"' class=''>"
						+ myCookieTit[i]
						+ "</a><span class='link_info'><a href='" + myCookieUrl[i] + "' target='_blank'>"
						+ "<strong class='name'>"+myCookieTit[i]+"</strong></a><span class='price strong'> ￥"+myCookiePrice[i]+".00 </span></span></li>";
			}
			$(".visit_list_goods").empty().html(tagDat);
			var newCookie = "";
			if (myCookie.length < listCount) {
				for (i in myCookie) {
					if (myCookieTit[i] == itemInfo.name)
						continue;
					newCookie += escape(myCookieTit[i]) + "^"
							   + escape(myCookieUrl[i]) + "^"
							   +escape(myCookiePicUrl[i])+ "^"
							   +escape(myCookiePrice[i])+"$";
				}
			} else {
				for ( var i = 1; i < listCount; i++) {
					if (myCookieTit[i] == itemInfo.name)
						continue;
					newCookie += escape(myCookieTit[i]) + "^"
							  + escape(myCookieUrl[i]) + "^"
							  +escape(myCookiePicUrl[i]) + "^"
							  +escape(myCookiePrice[i])+"$";
				}
			}
			document.cookie = "itemVisits:" + newCookie + myTitle + myUrl +myPicUrl+ myPrice+ edp;
		} else {
			$("#visitList").empty().html('<div class="clear_jilu">您还没有浏览过任何商品。</div>');
			document.cookie = "itemVisits:" + myTitle + myUrl +myPicUrl+ myPrice+ edp;
		}
	} else {
		$("#visitList").empty().html('<div class="clear_jilu">请确认浏览器cookie功能已开！</div>');
	}
});
/*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2011 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.6.0-dev
 *
 */
(function($) {

    $.fn.lazyload = function(options) {
        var settings = {
            threshold       : 0,
            failure_limit   : 0,
            event           : "scroll",
            effect          : "show",
            container       : window,
            skip_invisible  : true
        };
                
        if(options) {
            /* Maintain BC for a couple of version. */
            if (null !== options.failurelimit) {
                options.failure_limit = options.failurelimit; 
                delete options.failurelimit;
            }
            
            $.extend(settings, options);
        }

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        var elements = this;
        if (0 == settings.event.indexOf("scroll")) {
            $(settings.container).bind(settings.event, function(event) {
                var counter = 0;
                elements.each(function() {
                    if (settings.skip_invisible && !$(this).is(":visible")) return;
                    if ($.abovethetop(this, settings) ||
                        $.leftofbegin(this, settings)) {
                            /* Nothing. */
                    } else if (!$.belowthefold(this, settings) &&
                        !$.rightoffold(this, settings)) {
                            $(this).trigger("appear");
                    } else {
                        if (++counter > settings.failure_limit) {
                            return false;
                        }
                    }
                });

                /* Remove image from array so it is not looped next time. */
                var temp = $.grep(elements, function(element) {
                    return !element.loaded;
                });
                elements = $(temp);

            });
        }
        
        this.each(function() {
            var self = this;            
            self.loaded = false;
            
            /* When appear is triggered load original image. */
            $(self).one("appear", function() {
                if (!this.loaded) {
                    $("<img />")
                        .bind("load", function() {
                            $(self)
                                .hide()
                                .attr("src", $(self).attr("original"))
                                [settings.effect](settings.effectspeed);
                            self.loaded = true;
                        })
                        .attr("src", $(self).attr("original"));
                };
            });

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (0 != settings.event.indexOf("scroll")) {
                $(self).bind(settings.event, function(event) {
                    if (!self.loaded) {
                        $(self).trigger("appear");
                    }
                });
            }
        });
        
        /* Force initial check if images should appear. */
        $(settings.container).trigger(settings.event);
        
        return this;

    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function(element, settings) {
    	var fold;
        if (settings.container === undefined || settings.container === window) {
            fold = $(window).height() + $(window).scrollTop();
        } else {
            fold = $(settings.container).offset().top + $(settings.container).height();
        }
        return fold <= $(element).offset().top - settings.threshold;
    };
    
    $.rightoffold = function(element, settings) {
    	var fold;
        if (settings.container === undefined || settings.container === window) {
            fold = $(window).width() + $(window).scrollLeft();
        } else {
            fold = $(settings.container).offset().left + $(settings.container).width();
        }
        return fold <= $(element).offset().left - settings.threshold;
    };
        
    $.abovethetop = function(element, settings) {
    	var fold;
        if (settings.container === undefined || settings.container === window) {
            fold = $(window).scrollTop();
        } else {
            fold = $(settings.container).offset().top;
        }
        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
    };
    
    $.leftofbegin = function(element, settings) {
    	var fold;
        if (settings.container === undefined || settings.container === window) {
            fold = $(window).scrollLeft();
        } else {
            fold = $(settings.container).offset().left;
        }
        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };
    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() */

    $.extend($.expr[':'], {
        "below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0, container: window}); },
        "above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0, container: window}); },
        "right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0, container: window}); },
        "left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0, container: window}); }
    });
    
})(jQuery);

var youboy = {};

youboy.we = function(){
	
	var weiboConfigs = {
			"weibo" : {
				callback : 'http://service.weibo.com/share/share.php',
				url : "",
				title : '',
				pic : '',
				appkey : '177507427'
			},
			"qq" : {
				callback : 'http://v.t.qq.com/share/share.php',
				url : 'http://v.t.qq.com/share/share.php',
				title : '',
				pic : '',
				appkey : 'fbc885c7966b45ef835cd1720f01a2a2'
			},
			"qzone" : {
				callback : 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey',
				url : '',
				showcount : '1',
				title : '',
				site : '一呼百应网购导航',
				pics : '',
				appkey : 'fbc885c7966b45ef835cd1720f01a2a2'
			}	
	};
	return {
		ready : function(){
			
			$("img.lazy").lazyload();
			
			var $returnTop = $('#returntop');
			if ($returnTop.length === 0) {
				return this;
			}

			var resize = function() {
				var winHeight = window.innerHeight;
				var winWidth = window.innerWidth;
				if (document.documentElement.clientHeight) {
					winHeight = document.documentElement.clientHeight;
					winWidth = document.documentElement.clientWidth;
				} else {
					winHeight = document.body.clientHeight;
					winWidth = document.body.clientWidth;
				}
				var height = winHeight - 100;
				var width = winWidth - 60;
				$returnTop.css('top', height + 'px');
				$returnTop.css('left', width + 'px');
			};

			$returnTop.click(function() {
				window.scrollTo(0, 0);
			});

			resize();
			$(window).scroll(function() {
				if (document.documentElement.scrollTop || document.body.scrollTop) {
					$returnTop.css('display', 'block');
				} else {
					$returnTop.css('display', 'none');
				}
			}).resize(resize);
			
			return this;
		},
		whyNotSharing : function(){
			
			var shareWeibo = function(key, pics) {
				var title = $('meta[name="description"]').attr('content');
				if (title.length >= 120) {
					title = title.substring(0, 120) + '...';
				}

				var config = weiboConfigs[key];
				config.title = title;
				config.url = location.href;

				if (pics) {
					var picParam = pics.constructor === Array ? pics.join('|') : pics;
					if (config.pic) {
						config.pic = picParam;
					} else {
						config.pics = picParam;
					}
				}

				var params = [];
				for ( var param in config) {

					if ('callback' === param) {
						continue;
					}

					params.push(param + "=" + encodeURIComponent(config[param] || ''));
				}

				window.open(config.callback + '?' + params.join('&'));
			};
			
			$('#fxwb').click(function() {
				shareWeibo('qzone');
				return false;
			});
			$('#fxsina').click(function() {
				shareWeibo('weibo');
				return false;
			});
			$('#fxqw').click(function() {
				shareWeibo('qq');
				return false;
			});
			
			return this;
		},
		wouldYouLoveMe : function(){
			
			$('#favorite').click(function(){
				var userAgent = navigator.userAgent;
				if (window.sidebar) { // Mozilla Firefox Bookmark
					window.sidebar.addPanel(document.title, document.URL,"");
				}
				else if( userAgent && userAgent.toLowerCase().indexOf('chrome') != -1){
					alert('您可以试试同时按下ctrl+d哦');
				}
				else if( window.external ) { // IE Favorite
					window.external.AddFavorite( document.URL, document.title);
				} 
				else if(window.opera) { // Opera 7+
					// do nothing
				} 
				else { 
					alert('您可以试试同时按下ctrl+d哦');
				}
				
				return false;
			});
		    
			return this;
		},
		moreQueryMoreHappy : function(url){
			
			var search = function() {
				var searchText = $(".write").val();
				
				if (searchText && searchText.length !== 0) {
					if(searchText.indexOf("/") !== -1){
						$(".write").val("").focus();
						return;
					}
					
					var encodeuri = encodeURIComponent(searchText);
					location.href = url + "/" + encodeuri;
				};
			};

			$("#search").click(function() {
				search();
			});

			$(".write").bind('keydown', function(event) {
				if (event.keyCode === 13) {
					search();
				}
			});
			
			return this;
		},
		moreTagMoreFunny : function(uri){
			$.ajax({
				url : uri,
				dataType : "json",
				success : function(data){
					
					$("div.fashion > ul.catogry > li").each(function(){
						
						var $this = $(this);
						var invalid = true;
						$(data).each(function(){
							var tagCosmetic = this;
							var $image = $this.find("img:first");
							if($image && $image.attr("class") && $image.attr("class").indexOf(tagCosmetic.tag) != -1){
								$image.attr("src",tagCosmetic.image);
								invalid = false;
							}
						});
						
						if(invalid){
							$this.remove();
						}
						
					});
				}
			});
			
			return this;
		},
		merryChrismas : function() {
			var canvas = document.createElement("canvas");
			if (!canvas.getContext) {
				$('body').removeAttr('scroll').removeAttr('style');
				return this;
			}

			canvas.width = $(window).width();
			canvas.height = $(window).height();
			$(window).resize(function(){
				canvas.width = $(window).width();
				canvas.height = $(window).height();
				
				var winWidth = $(window).width();
				var documentWidth = $(document).width();
				if(documentWidth > winWidth){
					$('body').removeAttr('scroll').removeAttr('style');
				}else{
					$('body').attr('scroll','no').attr('style','overflow-x:hidden');
				}
			});
			
			$(window).scroll(function(){
				$('#snow').css('top', $(document).scrollTop()+'px');
			});
			
			var ctx = canvas.getContext("2d");
			
			document.getElementById("snow").appendChild(canvas);
			
			var snows = [];
			var counter = 0;
			var onclick = false;
			var snowFly = function() {
				var snow = {
						x : randomRange(0, canvas.width),
						y : 0,
						velX : randomRange(-2, 2),
						velY : randomRange(2, 6),
						scale : 120 / (120 + randomRange(20, 120)),
						colour : (Math.random() * 2) > 1 ? "#dbe0e0" : "#ccc",
						fly : function() {
							
							ctx.fillStyle = this.colour;
							ctx.font = Math.round(this.scale * 10) + "pt Arial";
							ctx.fillText("❄", this.x, this.y);
							
							this.x += (this.velX * this.scale);
							this.y += (this.velY * this.scale);
							
							if (this.x < 0) {
								this.x = canvas.width;
							} else if (this.x > canvas.width) {
								this.x = 0;
							}
						}
				};
				
				snows.push(snow);
				ctx.fillStyle = "rgba(243,248,248,0.3)";
				
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				for ( var i = 0; i < snows.length; i++) {
					snows[i].fly();
				}
				
				counter ++;
				if(counter > 250 && !onclick){
					onclick = true;
					$('#snow').click(function(e){
						$(this).css("z-index",-1);
					});
				}
				
				while (snows.length > 400) {
					snows.shift();
				}
			};
			
			setInterval(snowFly, 1000 / 33);
			var randomRange = function(min, max) {
				return Math.random() * (max - min) + min;
			};

			return this;
		},
		notMerryChrismas : function(){
			$('body').removeAttr('scroll').removeAttr('style');
			return this;
		},
		showMenu:function(){
			$('.navall').mouseover(function(){
				$('#menu1').show();
			}).mouseout(function(){
				$('#menu1').hide();
			});
		}
	};
};
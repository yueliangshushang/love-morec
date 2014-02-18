function postToQzone(){var _d=$('meta[name="description"]').attr('content');var _title;var _content;if(_d.length>130){_content=_d.substring(0,120)+'...';}else{_content=_d;}
if(document.title.length>50){_title=document.title.substring(0,50)+'...';}else{_title=document.title;}
var p={url:location.href,desc:'',summary:_content,title:_title,site:'一呼百应服装导航',pics:'',appkey:'fbc885c7966b45ef835cd1720f01a2a2'};var s=[];for(var i in p){s.push(i+'='+encodeURIComponent(p[i]||''));}
url=[' http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?',s.join('&')].join('');window.open(url);}
function postToSina(){var _d=$('meta[name="description"]').attr('content');var _content;if(_d.length>130){_content=_d.substring(0,120)+'....';}else{_content=_d;}
var param={url:location.href,type:'3',count:'0',appkey:'177507427',title:_content,pic:'',ralateUid:'',rnd:new Date().valueOf()}
var temp=[];for(var p in param){temp.push(p+'='+encodeURIComponent(param[p]||''))}
url=[' http://service.weibo.com/share/share.php?',temp.join('&')].join('');window.open(url);}
function postToWb(){var _d=$('meta[name="description"]').attr('content');var _content;if(_d.length>130){_content=_d.substring(0,120)+'....';}else{_content=_d;}
var _t=encodeURI(_content);var _url=encodeURIComponent(location.href);var _assname='';var _appkey=encodeURIComponent('fbc885c7966b45ef835cd1720f01a2a2');var _pic='';var _site=encodeURIComponent(document.location);var _u=' http://v.t.qq.com/share/share.php?url='+_url+'&appkey='+_appkey+'&site='+_site+'&pic='+_pic+'&title='+_t+'&assname='+_assname;window.open(_u);}
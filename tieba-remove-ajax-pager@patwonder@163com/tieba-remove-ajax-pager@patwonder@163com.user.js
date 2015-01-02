// ==UserScript==
// @id             tieba-remove-ajax-pager@patwonder@163.com
// @name           贴吧去除ajax翻页
// @version        1.1
// @namespace      patwonder@163.com
// @author         patwonder
// @description    
// @updateURL      https://gist.githubusercontent.com/patwonder/3c488bc39c6816cd8cc7/raw/tieba-remove-ajax-pager.user.js
// @downloadURL    https://gist.githubusercontent.com/patwonder/3c488bc39c6816cd8cc7/raw/tieba-remove-ajax-pager.user.js
// @include        http://tieba.baidu.com/club/*/p/*
// @include        http://tieba.baidu.com/f?kz=*
// @include        http://tieba.baidu.com/p/*
// @include        http://tieba.baidu.com/f?*ct=*z=*
// @include        http://tieba.baidu.com.cn/f?kz=*
// @include        http://tieba.baidu.com.cn/p/*
// @include        http://tieba.baidu.com.cn/f?*ct=*z=*
// @include        http://post.baidu.com/f?kz=*
// @include        http://post.baidu.com/p/*
// @include        http://post.baidu.com/f?*ct=*z=*
// @include        http://post.baidu.com.cn/f?kz=*
// @include        http://post.baidu.com.cn/p/*
// @include        http://post.baidu.com.cn/f?*ct=*z=*
// @include        http://tieba.baidu.com/f?*kw=*
// @run-at         document-end
// ==/UserScript==

(function(d, w) {
  var stopListener = function(e) {
    e.stopImmediatePropagation();
  };
  var pagers = document.querySelectorAll(".l_pager, .pager");
  [].forEach.call(pagers, function(pager) {
    pager.addEventListener("click", stopListener, true);
  });
})(document, typeof(unsafeWindow) !== "undefined" ? unsafeWindow : window);

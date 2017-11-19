// ==UserScript==
// @id             tieba-remove-ajax-pager@patwonder@163.com
// @name           贴吧去除ajax翻页
// @version        1.5
// @namespace      patwonder@163.com
// @author         patwonder
// @description    
// @include        /^https?://tieba\.baidu\.com/((f\?kz=.*)|(p/.*))/
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
// @grant          none
// ==/UserScript==

(function(d, w) {
  var stopListener = function(e) {
    e.stopImmediatePropagation();
  };
  var matchesSelector = function(element, selector) {
    if (element.mozMatchesSelector) {
      return element.mozMatchesSelector(selector);
    } else if (element.webkitMatchesSelector) {
      return element.webkitMatchesSelector(selector);
    } else if (element.matchesSelector) {
      return element.matchesSelector(selector);
    } else {
      try {
        var elems = element.parentElement ? element.parentElement.querySelectorAll(selector) : [];
        for (var i = 0, l = elems.length; i < l; i++) {
          if (elems[i] === element) return true;
        }
      } catch (ex) { }
      return false;
    }
  };
  w.addEventListener("click", function(e) {
    if (matchesSelector(e.target, ".l_pager *, .pager *, #frs_list_pager *") && !matchesSelector(e.target, ".lzl_li_pager *"))
      return stopListener(e);
  }, true);
})(document, window);

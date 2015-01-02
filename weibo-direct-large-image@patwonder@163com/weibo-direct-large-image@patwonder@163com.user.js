// ==UserScript==
// @id             weibo-direct-large-image@patwonder@163.com
// @name           新浪微博直接看大图
// @version        1.3
// @namespace      patwonder@163.com
// @author         patwonder
// @description
// @updateURL      https://raw.githubusercontent.com/patwonder/UserScripts/master/weibo-direct-large-image@patwonder@163com/weibo-direct-large-image@patwonder@163com.user.js
// @downloadURL    https://raw.githubusercontent.com/patwonder/UserScripts/master/weibo-direct-large-image@patwonder@163com/weibo-direct-large-image@patwonder@163com.user.js
// @include        http://www.weibo.com/*
// @include        http://weibo.com/*
// @run-at         document-end
// ==/UserScript==

(function(d,w) {
  var showSelector = "a.S_txt1[action-type=\"widget_photoview\"], a.S_txt1[action-type=\"widget_photoview\"] *";
  var expandSelector = "div.WB_expand_media";
  var imgSelector = ".artwork_box > img, .artwork_box > div > img";
  
  function matchesSelector(element, selector) {
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
    }
    return false;
  }

  w.addEventListener("click", function(e) {
    if (matchesSelector(e.target, showSelector)) {
      try {
        var expand = e.target.parentElement;
        for (var i = 0; (i < 10) && expand; i++) {
          if (matchesSelector(expand, expandSelector)) {
            var img = expand.querySelector(imgSelector);
            if (img && /\/bmiddle\//.test(img.src)) {
              var largeImgSrc = img.src.replace(/\/bmiddle\//, "/large/");
              console.log(largeImgSrc);
              window.open(largeImgSrc);

              e.stopImmediatePropagation();
              e.preventDefault();
              return false;
            }
          }
          expand = expand.parentElement;
        }
      } catch (e) {
      }
    }
  }, true);
})(document, typeof(unsafeWindow) !== "undefined" ? unsafeWindow : window);

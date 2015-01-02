// ==UserScript==
// @id             kill-tieba-pooling@patwonder@163.com
// @name           贴吧内存泄漏修复 Tieba Memory Leak Fix
// @version        1.1
// @namespace      patwonder@163.com
// @author         patwonder
// @description    
// @updateURL      https://raw.githubusercontent.com/patwonder/UserScripts/master/kill-tieba-pooling@patwonder@163com/kill-tieba-pooling@patwonder@163com.user.js
// @downloadURL    https://raw.githubusercontent.com/patwonder/UserScripts/master/kill-tieba-pooling@patwonder@163com/kill-tieba-pooling@patwonder@163com.user.js
// @include        http://tieba.baidu.com/*
// @run-at         document-end
// ==/UserScript==

(function(d, w) {
  var fails = 0;
  var poolcommon = function() {
    try {
      var embed = d.querySelector("embed[src=\"http://play.baidu.com/player/static/flash/fmp.swf\"]");
      embed = (embed.wrappedJSObject || embed);
      embed.PercentLoaded = function() { return 100; };
      embed.setData = function() {};
      console.log("Killed tieba pooling.");
    } catch (ex) {
      console.log("Get embed object failed: " + ex);
      fails++;
      if (fails < 30)
        setTimeout(poolcommon, 1000);
    }
  };
  poolcommon();
})(document, typeof(unsafeWindow) !== "undefined" ? unsafeWindow : window);

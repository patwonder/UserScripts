// ==UserScript==
// @id             kill-tieba-pooling@patwonder@163.com
// @name           贴吧内存泄漏修复 Tieba Memory Leak Fix
// @version        1.0
// @namespace      patwonder@163.com
// @author         patwonder
// @description    
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

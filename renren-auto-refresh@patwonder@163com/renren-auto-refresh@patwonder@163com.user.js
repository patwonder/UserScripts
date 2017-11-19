// ==UserScript==
// @id             renren-auto-refresh@patwonder@163.com
// @name           人人网每半小时自动刷新
// @version        1.6
// @namespace      patwonder@163.com
// @author         patwonder
// @description    
// @include        http://www.renren.com/*
// @include        http://home.renren.com/*
// @run-at         document-end
// @grant          none
// ==/UserScript==

(function(d, w) {
  var li = d.createElement("li");
  li.style.cssFloat = "right";
  li.style.lineHeight = "50px";
  
  w.addEventListener("load", function() {
    var loginForm = d.querySelector("form#loginForm");
    if (loginForm) {
      setTimeout(function() {
        loginForm.submit();
      }, 3000);
      return;
    }
    
    var intervalInput = d.getElementById("interval");
    if (!intervalInput) return;
    
    var BASE_INTERVAL = 1800000;
    var ADDITIONAL_INTERVAL = 5000;
    var NEWDAY_OFFSET = 30000;
    var GMT = 8;
    var time = Date.now();
    var intervalLimit = Math.min(86400000 - (time + GMT * 3600000 - NEWDAY_OFFSET) % 86400000, 
                                 BASE_INTERVAL + ADDITIONAL_INTERVAL);
    var refreshInterval = parseInt(intervalInput.value) + ADDITIONAL_INTERVAL;
    if (!(refreshInterval <= intervalLimit))
      refreshInterval = intervalLimit;
    var targetTime = time + refreshInterval;
    
    var navOther = d.querySelector(".fd-nav-list");
    if (navOther) {
      navOther.insertBefore(li, navOther.firstChild);
    }
    
    var intervalId = setInterval(function() {
      var time = Date.now();
      if (time >= targetTime) {
        li.textContent = "正在刷新页面...";
        w.location.reload();
        clearInterval(intervalId);
        return;
      }
      
      li.textContent = Math.round((targetTime - time) / 1000) + "秒后刷新";
    }, 1000);
  });
})(document, window);

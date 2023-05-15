// ==UserScript==
// @name          新浪视频 Network
// @namespace     Violentmonkey Scripts
// @match         *://www.xinlangshipin.buzz/*
// @match         *://xinlangshipin.com/*
// @match         *://sex8ke.com/*
// @match         *://hxcva.top/*
// @match         *://yelaixiang.cf/*
// @match         *://yelaixiang1.com/*
// @match         *://yelaixiang4.com/*
// @icon          https://www.google.com/s2/favicons?sz=64&domain=xinlangshipin.com
// @require       https://unpkg.com/jquery@latest/dist/jquery.js
// @grant         none
// @version       1.0
// @author        草木灰
// @description   3/1/2023, 8:25:49 PM 免费观看电影，手机电脑均可使用!
// ==/UserScript==

$(document).ready(function () {

  var vl = localStorage.getItem("free_plays");
  if (vl === "undefined" || vl == null || vl < '5') {
    localStorage.setItem("free_plays", '999');
  }

})

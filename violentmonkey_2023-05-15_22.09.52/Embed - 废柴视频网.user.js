// ==UserScript==
// @name         Embed - 废柴视频网
// @namespace    https://greasyfork.org/zh-CN/users/108076
// @version      1.8.9
// @description  允许直接播放VIP视频❗
// @author       草木灰
// @match        http*://fcw.xxx/videos/*
// @match        http*://fcw.cool/videos/*
// @match        http*://newfcw.info/videos/*
// @include      /(^[^:\/#\?]*:\/\/([^#\?\/]*\.)?fcw[0-9][0-9]\.com(:[0-9]{1,5})?\/videos\/.*$)/
// @include      /(^[^:\/#\?]*:\/\/([^#\?\/]*\.)?fcww[0-9][0-9]\.com(:[0-9]{1,5})?\/videos\/.*$)/
// @icon         https://www.google.com/s2/favicons?domain=fcw.xxx
// @require      https://cdn.jsdelivr.net/npm/@clappr/player@latest/dist/clappr.min.js
// @run-at       document-end
// ==/UserScript==
(function () {

  'use strict';
  //获取播放器页面框架的大小
  var width1 = $('.player').width();
  var height1 = $('.player').height();
  var origin = document.location.origin;
  var PRO_VIDEO_ID = document.location.pathname.replace(/videos\/([\d]+)\/(.*)/, "embed/$1");
  // console.log(origin);

  if ($(".no-player").length === 1) {
    $('.player').html('<iframe width=' + width1 + ' height=' + height1 + ' src=' + origin + PRO_VIDEO_ID + ' frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>');

  }
  // Your code here...
})();
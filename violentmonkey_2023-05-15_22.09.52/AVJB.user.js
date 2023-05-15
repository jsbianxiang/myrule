// ==UserScript==
// @name         AVJB
// @namespace    https://greasyfork.org/zh-CN/users/108076
// @version      2.0.0
// @description  解除试看限制，直接播放VIP视频❗
// @author       草木灰
// @match        http*://avjb.com/videos/*
// @match        http*://onebookcms.com/*
// @include      /(^[^:\/#\?]*:\/\/([^#\?\/]*\.)?bbav[0-9]{1,3}\.com(:[0-9]{1,5})?\/.*$)/
// @icon         https://avjb.com/favicon.ico
// @require      https://unpkg.com/jquery@latest/dist/jquery.js
// @run-at       document-end
// @license      MIT
// ==/UserScript==

(function () {

    'use strict';

    //获取播放器页面框架的大小
    var width = $('.player').width();
    var height = $('.player').height();
    var origin = document.location.origin;
    var videoId = document.location.pathname.replace(/videos\/([\d]+)\/(.*)/, "newembed/$1");

    if ($(".no-player").length === 1) {
        $('.player').html('<iframe width=' + width + ' height=' + height + ' src=' + origin + videoId + ' frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>');
    }

})();
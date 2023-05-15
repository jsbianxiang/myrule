// ==UserScript==
// @name         九色|91PORNY
// @namespace    https://greasyfork.org/zh-CN/users/108076
// @version      2.0.0
// @description  允许直接播放VIP视频！
// @author       草木灰
// @match        *://91porny.com/*
// @match        *://jiuse.icu/*
// @include      /(^[^:\/#\?]*:\/\/([^#\?\/]*\.)?jiuse[0-9]{3}\.(com|xyz)(:[0-9]{1,5})?\/.*$)/
// @require      https://unpkg.com/jquery@latest/dist/jquery.js
// @icon         https://www.google.com/s2/favicons?domain=91porny.com
// @run-at       document-end
// @license      MIT
// ==/UserScript==

(function () {

    'use strict';

    var origin = document.location.origin;
    var PRO_VIDEO_ID = document.location.pathname.replace(/(.*)\/(viewhd|view)\/(.*)/, "$1/embed/$3");

    if ($('.noticeLayer').length === 1) {
        $('.videoPlayContainer').html('<iframe width="100%" height="656" src=' + origin + PRO_VIDEO_ID + ' frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>');
    }

})();
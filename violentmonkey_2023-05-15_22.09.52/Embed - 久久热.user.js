// ==UserScript==
// @name         Embed - 久久热
// @namespace    https://greasyfork.org/zh-CN/users/108076
// @version      1.0.0
// @description  允许直接播放VIP视频❗
// @author       草木灰
// @match        *://*.99re.com/videos/*
// @match        *://99a53.com/videos/*
// @match        *://99b30.com/videos/*
// @icon         https://www.google.com/s2/favicons?domain=99re.com
// @grant        none
// ==/UserScript==

(function () {

    'use strict';

    var origin = document.location.origin;
    var PRO_VIDEO_ID = document.location.pathname.replace(/videos\/([\d]+)\/(.*)/, "embed/$1");

    var width = $('.player').width();
    var height = $('.player').height();

    if ($(".no-player").length === 1) {

        $('.player').html('<iframe width="100%" height="556" src=' + origin + PRO_VIDEO_ID + ' frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>');

    }

})();
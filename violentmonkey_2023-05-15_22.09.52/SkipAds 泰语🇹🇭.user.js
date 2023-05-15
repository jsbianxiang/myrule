// ==UserScript==
// @name         SkipAds 泰语🇹🇭
// @namespace    https://greasyfork.org/zh-CN/users/108076
// @version      1.0.0
// @description  跳过片头广告!
// @author       草木灰
// @match        *://*.lnw-player.com/*
// @match        *://player.octopusbanner.com/*
// @match        *://avmono.com/*
// @icon         https://cdn-icons-png.flaticon.com/512/8326/8326302.png
// @require      https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js
// @license      MIT
// ==/UserScript==

(function () {

    'use strict';

    $('#skipads').click();
    $('#skipads_2').click();
    $('#skipads_3').click();
    $("#adsclick").click();

    load_jpw();
})();
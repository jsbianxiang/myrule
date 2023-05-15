// ==UserScript==
// @name         九妖碰 - 高清AV资源在线看
// @namespace    https://greasyfork.org/zh-CN/users/108076
// @version      1.10.9
// @description  免费观看电影，手机电脑均可使用，觉得不错的话，给个好评呦😜
// @author       LMB
// @match        *://jiuyaoporn.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=jiuyaoporn.com
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {

    'use strict';

    var vip = localStorage.getItem("free_plays");
    if (vip === "undefined" || vip == null || vip === '0') {
        localStorage.setItem('free_plays', 99)
    }

})();
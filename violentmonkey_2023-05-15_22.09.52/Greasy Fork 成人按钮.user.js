// ==UserScript==
// @name         Greasy Fork 成人按钮
// @namespace    Violentmonkey Scripts
// @version      1.0
// @description  浏览Greasy Fork时增加一个进入sleazyfork的按钮！
// @author       __Kirie__
// @match        https://greasyfork.org/*
// @match        https://sleazyfork.org/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=greasyfork.org
// @require      https://cdn.staticfile.org/jquery/3.5.0/jquery.min.js
// @grant        none
// @license      MIT
// ==/UserScript==

$(document).ready(function () {

    const log = console.log;

    var href = window.location.href;

    var greasy = /.*greasy.*/;

    if (greasy.test(href)) {

        log($('#site-nav > nav'));
        var otona = '<li class="otona"><a href="https://sleazyfork.org" target="_blank">成人</a></li>';
        $('#site-nav > nav').append(otona);
    } else {

        log($('#site-nav > nav'));
        var kodomo = '<li class="kodomo"><a href="https://greasyfork.org" target="_blank">小孩</a></li>';
        $('#site-nav > nav').append(kodomo);
    }

});

// ==UserScript==
// @name        7MMTV
// @namespace   Violentmonkey Scripts
// @match       *://7mmtv.sx/*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=7mmtv.sx
// @require     https://unpkg.com/jquery@latest/dist/jquery.js
// @grant       none
// @version     1.0
// @author      草木灰
// @description 3/1/2023, 8:25:49 PM
// ==/UserScript==

$(document).ready(function () {

    var a = new MutationObserver(function () {
        document
            .querySelectorAll('div[id^="mvspan_"][id*="_s_k_i_p_b"]')
            .forEach(function (b) {
                b.click()
            })
    });
    a.observe(document, {
        childList: !0,
        subtree: !0
    });
    setTimeout(function () {
        a.disconnect()
    }, 1E4)


})

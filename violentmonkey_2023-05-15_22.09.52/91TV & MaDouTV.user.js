// ==UserScript==
// @name        91TV & MaDouTV
// @namespace   Violentmonkey Scripts
// @match       *://91-tv.com/*
// @match       *://91rinv.com/*
// @match       *://madou.tv/*
// @match       *://madou.bet/*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=91-tv.com
// @require     https://unpkg.com/jquery@latest/dist/jquery.js
// @grant       none
// @version     1.0
// @author      -
// @description 3/1/2023, 8:25:49 PM
// ==/UserScript==

function vip() {

  localStorage.setItem("vip_level", '1');

}


let my_timer = setInterval(vip, 1100);


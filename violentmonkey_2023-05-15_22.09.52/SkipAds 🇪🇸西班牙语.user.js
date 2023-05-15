// ==UserScript==
// @name         SkipAds 🇪🇸西班牙语
// @namespace    https://greasyfork.org/zh-CN/users/108076
// @version      1.1.1
// @description  免验证显示播放器❗
// @author       草木灰
// @match        *://iguarras.com/*
// @match        *://iputitas.net/*
// @match        *://verpornografia.net/*
// @icon         https://iguarras.com/wp-content/uploads/2017/03/favicon1.png
// @run-at       document-end
// @grant        GM_addStyle
// @grant        unsafeWindow
// @license      MIT
// ==/UserScript==

(function () {
    GM_addStyle(`#plays {display: block !important}`);
})();
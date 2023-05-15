// ==UserScript==
// @name         破解同志成人動作片🔞觀看限制
// @namespace    http://tampermonkey.net/
// @version      2.0.2
// @license MIT
// @description  通过 JavaScript 移除观看次数，用于破解部分同志網站（GV）觀看次數的限制
// @homepage     https://greasyfork.org/zh-CN/scripts/458410
// @supportURL   https://github.com/beh-willy/gv-watch-unlimited-userscript/issues
// @author       Lucas
// @include      /^https?://nanyan.(com|gay|top|tk|cf|ml|gq|ga|tk|info|buzz|cc)./*
// @include      /^https?://gtv(1|2|3|4|5|6|7|8|9).(com|gay|top|tk|cf|ml|gq|ga|tk|info|buzz|cc)./*
// @include      /^https?://weitongshipin.(com|gay|top|tk|cf|ml|gq|ga|tk|info|buzz|cc)./*
// @include      /^https?://zhongtongshipin.(com|gay|top|tk|cf|ml|gq|ga|tk|info|buzz|cc)./*
// @include      /^https?://langlangshipin.(com|gay|top|tk|cf|ml|gq|ga|tk|info|buzz|cc)./*
// @include      /^https?://xiaohongshipin.(com|gay|top|tk|cf|ml|gq|ga|tk|info|buzz|cc)./*
// @include      /^https?://danlanshipin.(com|gay|top|tk|cf|ml|gq|ga|tk|info|buzz|cc)./*
// @include      /^https?://gv(2003|2005).(com|gay|top|tk|cf|ml|gq|ga|tk|info|buzz|cc)./*
// @include      /^https?://nanying.(com|gay|top|tk|cf|ml|gq|ga|tk|info|buzz|cc)./*
// @include      /^https?://xiaofen.(com|gay|top|tk|cf|ml|gq|ga|tk|info|buzz|cc)./*
// @include      /^https?://fifigv.(com|gay|top|tk|cf|ml|gq|ga|tk|info|buzz|cc)./*
// @include      /^https?://tongying.(com|gay|top|tk|cf|ml|gq|ga|tk|info|buzz|cc)./*
// @include      /^https?://tongying.(com|gay|top|tk|cf|ml|gq|ga|tk|info|buzz|cc)./*
// @include      /^https?://shenlan.(com|gay|top|tk|cf|ml|gq|ga|tk|info|buzz|cc)./*
// @match        *://nanyan.*/*
// @match        *://gtv\?*.*/*
// @match        *://weitongshipin.*/*
// @match        *://zhongtongshipin.*/*
// @match        *://langlangshipin.*/*
// @match        *://xiaohongshipin.*/*
// @match        *://gv\?*.*/*
// @match        *://\?*\gv\?*.*/*
// @match        *://gay\?*.*/*
// @match        *://nanying.*/*
// @match        *://xiaofen.*/*
// @match        *://\?*tong\?*.*/*
// @match        *://\?*tong.*/*
// @match        *://\?*tong.*/*
// @match        *://fifigv.*/*
// @match        *://tongying.*/*
// @match        *://\?*lan*/*
// @exclude      http://blog.luckly-mjw.cn/tool-show/m3u8-downloader/index.html
// @iconURL      https://11.mydrivers.com/m/images/v1/shipin_icon.svg
// @require      https://cdn.jsdelivr.net/npm/m3u8-parser@4.7.1/dist/m3u8-parser.min.js
// @require      https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js
// @connect      *
// @grant        unsafeWindow
// @grant        GM_openInTab
// @grant        GM.openInTab
// @grant        GM_getValue
// @grant        GM.getValue
// @grant        GM_setValue
// @grant        GM.setValue
// @grant        GM_deleteValue
// @grant        GM.deleteValue
// @grant        GM_xmlhttpRequest
// @grant        GM.xmlHttpRequest
// @grant        GM_download
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // set VIP value
    document.cookie="vip_days_left=365; expires=Session; path=/";

    // set free plays value
    window.localStorage.setItem('free_plays', '9');

})();

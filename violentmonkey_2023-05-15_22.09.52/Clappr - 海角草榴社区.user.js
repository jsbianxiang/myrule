// ==UserScript==
// @name         Clappr - 海角草榴社区
// @namespace    https://greasyfork.org/zh-CN/users/108076
// @version      1.0.0
// @description  直接播放VIP视频
// @author       草木灰
// @match        http*://cldb1b.com/video.php?tid=*
// @match        http*://cl34b.com/video.php?tid=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=cl34b.com
// @require      https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js
// @require      https://cdn.jsdelivr.net/npm/@clappr/player@latest/dist/clappr.min.js
// @require      https://cdn.jsdelivr.net/npm/hls.js@latest
// @run-at       document-end
// @grant        GM_addStyle
// @grant        unsafeWindow
// ==/UserScript==

(function () {

    'use strict';

    var videoUrl = dp.options.video.url;
    var width = $('#vediobox').width();
    // console.log(width);
    var height = $('#vediobox').height();

    $("#vediobox").html('<div id="player-wrapper" class="player"></div>');
    var playerElement = document.getElementById("player-wrapper");

    var player = new Clappr.Player({
        source: videoUrl,
        poster: '',
        //disableErrorScreen: true, // Disable the internal error screen plugin
        height: height,
        width: width
    });

    player.attachTo(playerElement);


})();
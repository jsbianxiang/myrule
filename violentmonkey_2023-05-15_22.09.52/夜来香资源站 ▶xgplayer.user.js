// ==UserScript==
// @name          夜来香资源站 ▶xgplayer
// @namespace     https://greasyfork.org/zh-CN/users/108076
// @version       2.0.1
// @description   免VIP[m3u8]VIP会员视频!
// @author        草木灰
// @match         *://yelai.cc/p/*
// @icon          https://yelai.cc/img/logo_xs3.png
// @require       https://unpkg.com/jquery@3.6.1/dist/jquery.js
// @require       https://unpkg.com/xgplayer@2.32.2/browser/index.js
// @require       https://unpkg.com/xgplayer-hls.js@2.6.3/browser/index.js
// @run-at        document-end
// @license       MIT
// ==/UserScript==

(function () {

    'use strict';

    // 必须登录免费会员账号
    var pathname = window.location.pathname;
    //获取视频ID
    var videoId = pathname.replace(/\/p\//, '').split('%20', 1);
    //console.log(videoId)
    //window.location.origin
    /* ----- 拼接视频链接 ---- */
    var videoUrl = window.location.origin + '/myvideo/' + videoId + '.m3u8';
    //console.log(videoUrl);

    $('#player').html('<div id="mse"></div>');
    let player = new HlsJsPlayer({
        "id": "mse",
        "url": videoUrl,
        "playsinline": true,
        "whitelist": [
            ""
        ],
        "width": 784,
        "height": 441,
        "poster": " ",
        "volume": 0.9,
        "videoInit": true, //初始化视频首帧
        "autoplay": false, //不能与videoInit同时为ture
        "fluid": true,
        "playbackRate": [
            0.5,
            1,
            1.5,
            2
        ],
        "rotate": {
            "clockwise": true,
            "innerRotate": true
        },
        "lang": 'zh-cn', //显示语言'zh-cn' | 'en' | 'jp'
        "pip": true
    });

})();
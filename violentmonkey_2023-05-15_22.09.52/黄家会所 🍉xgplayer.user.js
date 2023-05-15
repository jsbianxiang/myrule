// ==UserScript==
// @name         黄家会所 🍉xgplayer
// @namespace    https://greasyfork.org/zh-CN/users/108076
// @version      2.0.0
// @description  直接播放VIP视频!
// @author       草木灰
// @include      /(^[^:\/#\?]*:\/\/([^#\?\/]*\.)?hjhs[0-9]{1,4}\.com(:[0-9]{1,5})?\/videos\/.*$)/
// @icon         https://www.google.com/s2/favicons?domain=www.hjhs400.com
// @require      https://unpkg.com/jquery@latest/dist/jquery.js
// @require      https://unpkg.com/xgplayer@latest/browser/index.js
// @require      https://unpkg.com/xgplayer-hls.js@latest/browser/index.js
// @run-at       document-end
// @license      MIT
// ==/UserScript==

(function () {

    'use strict';

    var videoPoster = $('meta[property="og:image"]').attr('content');
    // console.log(videoPoster);
    var videoUrl = vid_site_mp4 + str_custom_mp4;
    // console.log(videoUrl);
    //获取播放器大小
    var width = $('.player').width();
    var height = $('.player').height();

    $(".player").html('<div id="mse"></div>');

    let player = new HlsJsPlayer({
        "id": "mse",
        "url": videoUrl,
        "playsinline": true,
        "whitelist": [
            ""
        ],
        "width": width,
        "height": height,
        "poster": videoPoster, //封面
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
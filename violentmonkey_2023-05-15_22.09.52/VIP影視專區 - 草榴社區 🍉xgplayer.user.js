// ==UserScript==
// @name         VIP影視專區 | 草榴社區 🍉xgplayer
// @namespace    https://greasyfork.org/zh-CN/users/108076
// @version      2.0.1
// @description  解除试看限制，免费看全片❗
// @author       草木灰
// @match        *://caoliu1024.com/read.php?tid=*
// @icon         https://caoliu1024.com/favicon.ico
// @require      https://unpkg.com/jquery@latest/dist/jquery.js
// @require      https://unpkg.com/xgplayer@latest/browser/index.js
// @require      https://unpkg.com/xgplayer-hls.js@latest/browser/index.js
// @run-at       document-end
// @license      MIT
// ==/UserScript==

(function () {

    'use strict';

    //获取视频连接
    var videoUrl = dp.options.video.url;

    // 获取播放器大小
    var width = $('#iframe1').width();
    var height = $('#iframe1').height();


    $('#iframe1').html('<div id="mse"></div>');


    let player = new HlsJsPlayer({
        "id": "mse",
        "url": videoUrl,
        "playsinline": true,
        "whitelist": [
            ""
        ],
        "width": width,
        "height": height,
        "poster": '', //封面
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
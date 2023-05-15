// ==UserScript==
// @name         碰碰网 🍉xgplayer
// @namespace    https://greasyfork.org/zh-CN/users/108076
// @version      2.0.0
// @description  直接播放VIP视频
// @author       草木灰
// @match        *://*.seseporn.com/videos/*
// @include      /(^[^:\/#\?]*:\/\/([^#\?\/]*\.)?sese[0-9]{3,4}\.(com|info)(:[0-9]{1,5})?\/videos\/.*$)/
// @icon         https://www.google.com/s2/favicons?domain=www.seseporn.com
// @require      https://unpkg.com/jquery@3.7.0/dist/jquery.js
// @require      https://unpkg.com/xgplayer@2.31.6/browser/index.js
// @require      https://unpkg.com/xgplayer-hls.js@2.6.4/browser/index.js
// @run-at       document-end
// @license      MIT
// ==/UserScript==

(function () {

    'use strict';

    var videoUrl = '';
    var videoPoster = $('.block-video .no-player img').attr('src');

    var v_id = videoPoster.replace(/.*\/contents\/videos_screenshots\/(\d+)\/(\d+)\/.*/, "$1/$2/$2");

    //判断是否是VIP视频
    var vid_pd = videoPoster.indexOf('_hq.mp4');
    if (vid_pd === -1) {
        var videoUrl_novip = 'https://media3.sese677.info/contents/videos/' + v_id + '.mp4';
        videoUrl = videoUrl_novip;
    } else {
        var videoUrl_vip = 'https://media3.sese677.info/contents/videos/' + v_id + '_hq.mp4';
        videoUrl = videoUrl_vip;
    }

    //播放器大小
    var width = $('.player').width();
    var height = $('.player').height();

    if ($('.no-player').length === 1) {

        $(".player").html('<div id="mse"></div>');

        let player = new Player({
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

    }

})();
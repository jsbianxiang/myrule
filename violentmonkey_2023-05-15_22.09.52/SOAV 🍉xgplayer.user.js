// ==UserScript==
// @name         SOAV 🍉xgplayer
// @namespace    https://greasyfork.org/zh-CN/users/108076
// @version      2.0.1
// @description  允许直接播放搜视频VIP视频!
// @author       草木灰
// @match        *://soav.com/videos/*
// @match        *://www.yao17173.com/videos/*
// @include      /(^[^:\/#\?]*:\/\/([^#\?\/]*\.)?ssp[0-9]{1,5}\.com(:[0-9]{1,5})?\/videos\/.*$)/
// @icon         https://soav.com/favicon.ico
// @require      https://unpkg.com/jquery@latest/dist/jquery.js
// @require      https://unpkg.com/xgplayer@latest/browser/index.js
// @require      https://unpkg.com/xgplayer-hls.js@latest/browser/index.js
// @run-at       document-end
// @license      MIT
// ==/UserScript==

(function () {

    'use strict';

    //通过预览图地址是否存在判断高清画质的函数
    function NetPing(getUrl) {

        var isHD;

        $.ajax({
            type: "GET",
            cache: false,
            async: false, //同步设置
            url: getUrl,
            data: "",
            success: function () {
                console.info('高清画质');
                isHD = true;
            },
            error: function () {
                console.info('标清画质');
                isHD = false;
            }
        });
        return isHD;

    }

    //获取播放器封面
    var preview = $('.block-video .no-player img').attr('src');
    var previewUrl_SD = window.location.origin + preview;
    console.info('标清画质预览图', previewUrl_SD);
    var previewUrl_HD = previewUrl_SD.replace(/\/preview\.jpg/, "/preview_hd.mp4.jpg");
    console.info('高清画质预览图', previewUrl_HD);
    var isHD = NetPing(previewUrl_HD); //是否高清
    console.info('isHD', isHD)

    //获取视频连接
    var videoId = preview.replace(/.*\/contents\/videos_screenshots\/(\d+)\/(\d+)\/.*/, "$1/$2/$2");
    var videoUrl_HD = 'https://oss.soplayerllc.com/contents/videos/' + videoId + '_hd.mp4';
    console.info('高清画质预览图', videoUrl_HD);
    var videoUrl_SD = 'https://oss.soplayerllc.com/contents/videos/' + videoId + '.mp4';

    //获取播放器大小
    var width = $('.player').width();
    var height = $('.player').height();

    if ($('.no-player').length === 1) {

        $(".player").html('<div id="mse"></div>');

        if (isHD) {

            let player = new Player({
                "id": "mse",
                "url": videoUrl_HD,
                "playsinline": true,
                "whitelist": [
                    ""
                ],
                "width": width,
                "height": height,
                "poster": previewUrl_HD, //封面
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
        } else {

            let player = new Player({
                "id": "mse",
                "url": videoUrl_SD,
                "playsinline": true,
                "whitelist": [
                    ""
                ],
                "width": width,
                "height": height,
                "poster": previewUrl_SD, //封面
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
    }
})();
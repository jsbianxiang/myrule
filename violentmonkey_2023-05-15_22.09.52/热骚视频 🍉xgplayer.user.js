// ==UserScript==
// @name         热骚视频 🍉xgplayer
// @namespace    https://greasyfork.org/zh-CN/users/108076
// @version      2.0.0
// @description  解除试看限制，免费看全片❗ 2022年10月1日
// @author       草木灰
// @match        *://*.resao.com/videos/*
// @match        *://*.rs1024.com/videos/*
// @match        *://*.rs2022.com/videos/*
// @icon         https://www.resao.com/favicon.ico
// @require      https://unpkg.com/jquery@3.7.0/dist/jquery.js
// @require      https://unpkg.com/xgplayer@2.31.6/browser/index.js
// @require      https://unpkg.com/xgplayer-hls.js@2.6.4/browser/index.js
// @run-at       document-end
// @license      MIT
// ==/UserScript==

(function () {

    'use strict';

    //通过预览图地址是否存在判断高清画质的函数
    function NetPing(getUrl) {

        var isHD = new Boolean();

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
    var previewUrl_SD = preview;
    console.info('标清画质预览图', previewUrl_SD);
    var previewUrl_HD = previewUrl_SD.replace(/\/preview\.mp4\.jpg/, "/preview_720p.mp4.jpg");
    console.info('高清画质预览图', previewUrl_HD);
    var isHD = NetPing(previewUrl_HD); //是否高清
    console.info('isHD', isHD)

    //获取视频连接
    var videoId = preview.replace(/.*\/contents\/videos_screenshots\/(\d+)\/(\d+)\/.*/, "$1/$2/$2");
    var videoUrl_HD = 'https://cdn.douyincontent.com/hls/contents/videos/' + videoId + '_720p.mp4/index.m3u8?sid=';
    var videoUrl_SD = 'https://cdn.douyincontent.com/hls/contents/videos/' + videoId + '.mp4/index.m3u8?sid=';

    // 获取播放器大小
    var width = $('.player').width();
    var height = $('.player').height();

    //判断是否解除付费限制

    if ($('.no-player').length === 1) {

        $('.player').html('<div id="mse"></div>');

        if (isHD) {

            let player = new HlsJsPlayer({
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
            player.emit('resourceReady', [{ "name": "720P", "url": videoUrl_HD }, { "name": "480P", "url": videoUrl_SD }]);

        } else {

            let player = new HlsJsPlayer({
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
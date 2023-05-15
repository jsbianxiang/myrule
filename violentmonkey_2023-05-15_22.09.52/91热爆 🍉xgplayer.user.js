// ==UserScript==
// @name         91热爆 🍉xgplayer
// @namespace    Violentmonkey Scripts
// @version      1.0.0
// @description  解除试看限制，免费看全片❗
// @author       草木灰
// @match        *://*.91rb.com/videos/*
// @match        *://*.91rb.net/videos/*
// @match        *://*.91rb.cc/videos/*
// @icon         https://www.91rb.com/favicon.ico
// @require      https://unpkg.com/jquery@3.7.0/dist/jquery.js
// @require      https://unpkg.com/xgplayer@2.31.6/browser/index.js
// @require      https://unpkg.com/xgplayer-hls.js@2.6.4/browser/index.js
// @run-at       document-end
// @license      MIT
// ==/UserScript==

(() => {
    'use strict';

    // 通过预览图地址是否存在判断高清画质的函数
    const checkURL = url => {
        const xhr = new XMLHttpRequest();
        xhr.open('HEAD', url, false);
        xhr.send();
        return xhr.status !== '404';
    };

    const $player = $('.player'),
        $noPlayer = $('.block-video .no-player');

    // 判断是否解除付费限制
    if ($noPlayer.length === 1) {
        const preview = $noPlayer.find('img').attr('src'),
            width = $player.width(),
            height = $player.height(),
            videoId = preview.replace(/.*\/contents\/videos_screenshots\/(\d+)\/(\d+)\/.*/, '$1/$2/$2'),
            videoUrl_SD = `https://cdn.163cdn.net/hls/contents/videos/${videoId}.mp4/index.m3u8?sid=`;

        let previewUrl_HD = `${preview.replace('/preview.jpg', '')}/preview_720p.mp4.jpg`;
        const isHD = checkURL(previewUrl_HD); // 是否高清

        if (isHD) {
            previewUrl_HD = `${preview.replace('/preview.jpg', '')}/preview_720p.mp4.jpg`;
        }
        const videoUrl_HD = `https://cdn.163cdn.net/hls/contents/videos/${videoId}_720p.mp4/index.m3u8?sid=`;

        $player.html('<div id="mse"></div>');
        let player = new HlsJsPlayer({
            id: 'mse',
            url: isHD ? videoUrl_HD : videoUrl_SD,
            playsinline: true,
            whitelist: [''],
            width,
            height,
            poster: isHD ? previewUrl_HD : preview,
            volume: 0.9,
            videoInit: true, // 初始化视频首帧
            autoplay: false, // 不能与 videoInit 同时为 true
            fluid: true,
            playbackRate: [0.5, 1, 1.5, 2],
            rotate: {
                clockwise: true,
                innerRotate: true,
            },
            lang: 'zh-cn', // 显示语言'zh-cn' | 'en' | 'jp'
            pip: true,
        });

        if (isHD) {
            player.emit('resourceReady', [
                { name: '720P', url: videoUrl_HD },
                { name: '480P', url: videoUrl_SD },
            ]);
        }
    }
})();

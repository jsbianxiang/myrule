// ==UserScript==
// @name         9X视频 ▶Artplayer
// @namespace    https://greasyfork.org/zh-CN/users/108076
// @version      1.0.0
// @description  免登录，直接播放VIP视频！2023年1月25日。
// @author       草木灰
// @match        *://9xav.cc/watch/*
// @icon         https://www.google.com/s2/favicons?domain=9xav.cc
// @require      https://unpkg.com/jquery@latest/dist/jquery.js
// @require      https://unpkg.com/hls.js@latest/dist/hls.js
// @require      https://unpkg.com/artplayer@latest/dist/artplayer.js
// @grant        GM_addStyle
// @license      MIT
// ==/UserScript==

(function () {

    'use strict';
    var width = $('#video-player-container').width();
    // console.log(width);
    var height = $('#video-player-container').height();
    // 获取嵌入页面地址
    var videoUrl = av_response.m3u8_url;
    console.log('视频地址', videoUrl);

    if ($(".vip_container").length === 1) {
        $('.video-player-container').html('<div class="artplayer-app"></div>');

        GM_addStyle(`.artplayer-app {width: ${width}px; height: ${height}px;}`);

        function playM3u8(video, url, art) {
            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(url);
                hls.attachMedia(video);

                // optional
                art.hls = hls;
                art.once('url', () => hls.destroy());
                art.once('destroy', () => hls.destroy());
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = url;
            } else {
                art.notice.show = 'Unsupported playback format: m3u8';
            }
        }

        var art = new Artplayer({
            container: '.artplayer-app',
            url: videoUrl,
            type: 'm3u8',
            customType: {
                m3u8: playM3u8,
            },
            title: document.title,
            poster: '',
            volume: 0.7,
            isLive: false,
            muted: false,
            autoplay: false,
            pip: true,
            autoSize: true,
            autoMini: true,
            screenshot: true,
            setting: true,
            loop: true,
            flip: true,
            playbackRate: true,
            aspectRatio: true,
            fullscreen: true,
            fullscreenWeb: true,
            miniProgressBar: true,
            mutex: true,
            backdrop: true,
            playsInline: true,
            autoPlayback: true,
            airplay: true,
            theme: '#23ade5',
            lang: navigator.language.toLowerCase(),
            whitelist: ['*'],
            moreVideoAttr: {
                crossOrigin: 'anonymous',
            },
        });

        art.on('ready', () => {
            console.info(art.hls);
        });

    }
    // Your code here...
})();
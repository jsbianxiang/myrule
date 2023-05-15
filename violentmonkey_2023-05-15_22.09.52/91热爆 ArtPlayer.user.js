// ==UserScript==
// @name         91热爆 ArtPlayer
// @namespace    Violentmonkey Scripts
// @version      1.0
// @description  解除试看限制，免费看全片❗
// @author       Your Name
// @match        *://*.91rb.com/videos/*
// @match        *://*.91rb.net/videos/*
// @match        *://*.91rb.cc/videos/*
// @icon         https://91rb.com/favicon.ico
// @require      https://unpkg.com/jquery@3.7.0/dist/jquery.js
// @require      https://unpkg.com/artplayer/dist/artplayer.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/hls.js/8.0.0-beta.3/hls.min.js
// @grant        GM_addStyle
// @license      MIT
// ==/UserScript==

"use strict";

const $player = $(".player"),
    $noPlayer = $(".block-video .no-player");

// 通过预览图地址是否存在判断高清画质的函数
function checkURL(url) {
    return fetch(url, { method: "HEAD" })
        .then((response) => response.status !== 404)
        .catch((error) => {
            console.error(error);
            return false;
        });
}

// 判断是否解除付费限制
if ($noPlayer.length === 1) {
    const preview = $noPlayer.find("img").attr("src"),
        width = $player.width(),
        height = $player.height(),
        videoId = preview.replace(
            /.*\/contents\/videos_screenshots\/(\d+)\/(\d+)\/.*/,
            "$1/$2/$2"
        ),
        videoUrl_SD = `https://cdn.163cdn.net/hls/contents/videos/${videoId}.mp4/index.m3u8?sid=`;

    let previewUrl_SD = preview;
    let previewUrl_HD = `${preview.replace(
        "/preview.jpg",
        ""
    )}/preview_720p.mp4.jpg`;

    checkURL(previewUrl_HD).then((isHD) => {
        if (isHD) {
            previewUrl_HD = `${preview.replace(
                "/preview.jpg",
                ""
            )}/preview_720p.mp4.jpg`;
        }

        const videoUrl_HD = `https://cdn.163cdn.net/hls/contents/videos/${videoId}_720p.mp4/index.m3u8?sid=`;

        $player.html('<div class="artplayer-app"></div>');
        $(".artplayer-app").css({ width, height });

        // 使用 GM_addStyle 函数来设置样式
        GM_addStyle(`
        /* 自定义 CSS 样式 */
        .art-poster {
            background-size: contain !important;
        }
    `);

        function playM3u8(video, url, art) {
            if (Hls.isSupported()) {
                if (art.hls) art.hls.destroy();
                const hls = new Hls();
                hls.loadSource(url);
                hls.attachMedia(video);
                art.hls = hls;
                art.on("destroy", () => hls.destroy());
            } else if (
                video.canPlayType("application/vnd.apple.mpegurl")
            ) {
                video.src = url;
            } else {
                art.notice.show = "Unsupported playback format: m3u8";
            }
        }

        const art = new Artplayer({
            container: ".artplayer-app",
            url: isHD ? videoUrl_HD : videoUrl_SD,
            type: "m3u8",
            customType: {
                m3u8: playM3u8,
            },
            poster: isHD ? previewUrl_HD : previewUrl_SD,
            quality: isHD ? [
                {
                    default: true,
                    html: "HD 720P",
                    url: videoUrl_HD,
                },
                {
                    html: "SD 480P",
                    url: videoUrl_SD,
                },
            ]: [

            ],
            volume: 0.7,
            isLive: false,
            muted: false,
            autoplay: false,
            pip: true,
            autoSize: false,
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
            airplay: true,
            theme: "#23ade5",
            lang: navigator.language.toLowerCase(),
            moreVideoAttr: {
                crossOrigin: "anonymous",
                    preload: 'auto',

            },
        });
        art.on("ready", () => {
            console.info(art.hls);
        });
    });
}

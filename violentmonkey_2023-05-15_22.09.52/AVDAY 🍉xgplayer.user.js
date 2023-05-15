// ==UserScript==
// @name         AVDAY 🍉xgplayer
// @namespace    https://greasyfork.org/zh-CN/users/108076
// @version      2.0.0
// @description  免VIP免登录会员,免费看全片❗
// @author       草木灰
// @match        *://avday.tv/watch/*
// @match        *://avday.tv/play/animation/*
// @icon         https://avday.tv/favicon.ico
// @require      https://unpkg.com/jquery@latest/dist/jquery.js
// @require      https://unpkg.com/xgplayer@latest/browser/index.js
// @require      https://unpkg.com/xgplayer-hls.js@latest/browser/index.js
// @run-at       document-end
// @license      MIT
// ==/UserScript==

(function () {

    'use strict';

    /* ----- 登录免费会员账号 ---- */
    var v_poster = '';
    var videoUrl = '';
    var short_videos__avid__videourl = '';
    var short_videos__avid_not__videourl = '';
    var adult_videos__cover__videourl = '';
    var animation__cover__videourl = '';
    var sw_videos__swid__videourl = '';

    v_poster = $("#video-player").attr("poster");
    //获取播放器大小
    var width = $('.mobile-video-block').width();
    var height = $('.mobile-video-block').height();

    //获取视频链接
    var short_videos__avid = v_poster.replace(/.*\/short-videos\/(avid[\w\d]+)\/thumb\/.*/, "$1"); //console.log("短视频:", short_videos__avid);
    var short_videos__avid_not = v_poster.replace(/.*\/short-videos\/([^avid][\w\d]+)\/[\w\d]+.*/, "$1"); //console.log("麻豆视频:", short_videos__avid_not);
    var adult_videos__cover = v_poster.replace(/.*\/adult-videos\/([^/]+)\/cover\/.*/, "$1"); //console.log("日本AV:", adult_videos__cover);
    var animation__cover = v_poster.replace(/img\.awvvvvw\.live\/imgs\/cover\/(.*)/, "$1"); //console.log("H动漫:", animation__cover);
    var sw_videos__swid = v_poster.replace(/.*\/sw-videos\/videos\/(swid[\w\d]+)\/.*/, "$1"); //console.log("Swag视频:", sw_videos__swid);

    if (short_videos__avid !== v_poster) {
        short_videos__avid__videourl = 'https://video.awvvvvw.live/tv_adult/' + short_videos__avid + '/' + short_videos__avid + '.m3u8';
        videoUrl = short_videos__avid__videourl;
    }
    if (short_videos__avid_not !== v_poster) {
        short_videos__avid_not__videourl = 'https://video.awvvvvw.live/tv_adult/' + short_videos__avid_not + '/720/video.m3u8';
        videoUrl = short_videos__avid_not__videourl;
    }
    if (adult_videos__cover !== v_poster) {
        if ($("meta[itemprop='contentURL']").attr("content")) {
            adult_videos__cover = $("meta[itemprop='contentURL']").attr("content").replace(/.*\/apen\/([^/]+)\/.*/, "$1");
        }
        adult_videos__cover__videourl = 'https://video.awvvvvw.live/apen/' + adult_videos__cover + '/' + adult_videos__cover + '.m3u8';
        videoUrl = adult_videos__cover__videourl;
    }
    if (animation__cover !== v_poster) {
        if ($("meta[itemprop='contentURL']").attr("content")) {
            animation__cover = $("meta[itemprop='contentURL']").attr("content").replace(/.*\/apen\/([^/]+)\/.*/, "$1");
        }
        animation__cover__videourl = 'https://video.awvvvvw.live/apen/' + animation__cover + '/' + animation__cover + '.m3u8';
        videoUrl = animation__cover__videourl;
    }
    if (sw_videos__swid !== v_poster) {
        sw_videos__swid__videourl = 'https://video.awvvvvw.live/sw_videos/videos/' + sw_videos__swid + '/video.m3u8';
        videoUrl = sw_videos__swid__videourl;
    }
    /* ----- 播放器替换 ---- */
    $('#video-player-block').html('<div id="mse"></div>');

    let player = new HlsJsPlayer({
        "id": "mse",
        "url": videoUrl,
        "playsinline": true,
        "whitelist": [
            ""
        ],
        "width": width,
        "height": height,
        "poster": v_poster, //封面
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


    // 移除充值会员提示
    $('#unlock-msg').remove();

})();

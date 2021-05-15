// ==UserScript==
// @name         AVday-DPlayer播放器
// @namespace    https://greasyfork.org/zh-CN/users/108076
// @version      21.5.15
// @description  免VIP[m3u8]VIP会员视频
// @author       草木灰
// @match        https://avday.tv/watch/*
// @require      https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js
// @resource     playercss   https://raw.githubusercontent.com/fluid-player/fluid-player/master/src/css/fluidplayer.css
// @require      https://cdn.bootcss.com/hls.js/0.12.4/hls.min.js
// @require      https://cdn.fluidplayer.com/v3/current/fluidplayer.min.js
// @run-at       document-end
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        unsafeWindow
// @icon         https://www.google.com/s2/favicons?domain=avday.tv
// ==/UserScript==

/* jshint esversion: 6 */
(function () {
    var v_poster = '';
    var videoUrl = '';
    var sv_avideoUrl = '';
    var sv_nid_link = '';
    var av_avideoUrl = '';
    var sw_avideoUrl = '';
    v_poster = $("#video-player").attr("poster");
    //   console.log("海报:", v_poster);
    var sv_avid = v_poster.replace(/.*\/short-videos\/(avid[\w\d]+)\/thumb\/.*/, "$1");
    //   console.log("短视频:", sv_avid);
    var sv_nid = v_poster.replace(/.*\/short-videos\/([^avid][\w\d]+)\/[\w\d]+.*/, "$1");
    //   console.log("麻豆视频:", sv_nid);
    var av_avid = v_poster.replace(/.*\/adult-videos\/([^/]+)\/cover\/.*/, "$1");
    //   console.log("日本AV:", av_avid);
    var sw_avid = v_poster.replace(/.*\/sw-videos\/videos\/(swid[\w\d]+)\/.*/, "$1");
    //   console.log("Swag视频:", sw_avid);

    if (sv_avid !== v_poster) {
        sv_avideoUrl = 'https://video.awvvvvw.live/tv_adult/' + sv_avid + '/' + sv_avid + '.m3u8';
        videoUrl = sv_avideoUrl;
    }

    if (sv_nid !== v_poster) {
        sv_nid_link = 'https://video.awvvvvw.live/tv_adult/' + sv_nid + '/720/video.m3u8';
        videoUrl = sv_nid_link;
    }

    if (av_avid !== v_poster) {
        av_avideoUrl = 'https://video.awvvvvw.live/apen/' + av_avid + '/' + av_avid + '.m3u8';
        videoUrl = av_avideoUrl;
    }

    if (sw_avid !== v_poster) {
        sw_avideoUrl = 'https://video.awvvvvw.live/sw_videos/videos/' + sw_avid + '/video.m3u8';
        videoUrl = sw_avideoUrl;
    }

    console.log(videoUrl);
    GM_addStyle(GM_getResourceText("playercss"));
    var div = "<video id='hls-video'><source src=" + videoUrl + " type='application/x-mpegURL'/></video>";
    $('#video-player-block')[0].insertAdjacentHTML('afterend', div);
    fluidPlayer('hls-video', {
        "layoutControls": {
            "fillToContainer": true,
            "posterImage": v_poster
        }
    });
    $('#video-player-block')[0].remove();
})();
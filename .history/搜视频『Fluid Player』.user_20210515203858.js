// ==UserScript==
// @name         搜视频『Fluid Player』
// @namespace    https://greasyfork.org/zh-CN/users/108076
// @version      21.5.12
// @description  允许直接播放VIP视频
// @author       草木灰
// @match       https://soav.com/*
// @include     /(^[^:\/#\?]*:\/\/([^#\?\/]*\.)?ssp[0-9]{1,3}\.cc(:[0-9]{1,5})?\/.*$)/
// @include     /(^[^:\/#\?]*:\/\/([^#\?\/]*\.)?mmse[0-9]{1,3}\.com(:[0-9]{1,5})?\/.*$)/
// @include     /(^[^:\/#\?]*:\/\/([^#\?\/]*\.)?mmse[0-9]{1,3}\.xyz(:[0-9]{1,5})?\/.*$)/
// @require      https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js
// @require      https://cdn.bootcss.com/hls.js/0.12.4/hls.min.js
// @require      https://cdn.fluidplayer.com/v3/current/fluidplayer.min.js
// @run-at       document-end
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        unsafeWindow
// ==/UserScript==
(function () {
    'use strict';

    //$('.ad').remove();

    var v_poster = $('.block-video .no-player img').attr('src');
    var v_poster_h = $('.block-video .no-player img').attr('height');

    // console.log(v_poster);

    var v_id = v_poster.replace(/.*\/videos_screenshots\/(\d+)\/(\d+)\/.*/, "$1/$2/$2");
    // console.log(v_id);
    var v_link_hd1 = 'https://vvvvone.govvvver.com/contents/videos/' + v_id + '_hd.mp4';
    var v_link_hd2 = 'https://vvvvtwo.govvvver.com/contents/videos/' + v_id + '_hd.mp4';
    var v_link_hd3 = 'https://vvvvthree.govvvver.com/contents/videos/' + v_id + '_hd.mp4';
    var v_link_hd4 = 'https://vvthefour.govvvvvver.com/contents/videos/' + v_id + '_hd.mp4';
    var v_link1 = 'https://vvvvone.govvvver.com/contents/videos/' + v_id + '.mp4';
    var v_link2 = 'https://vvvvtwo.govvvver.com/contents/videos/' + v_id + '.mp4';
    var v_link3 = 'https://vvvvthree.govvvver.com/contents/videos/' + v_id + '.mp4';
    var v_link4 = 'https://vvthefour.govvvvvver.com/contents/videos/' + v_id + '.mp4';

    if ($('.no-player').length === 1) {
        var mvideo = "<video id='my-video' controls width = '100%' height="+v_poster_h+"><source src="+v_link_hd3+" type='video/mp4' /><source src="+v_link_hd4+" type='video/mp4' /><source src="+v_link1+" type='video/mp4' /><source src="+v_link2+" type='video/mp4' /><source src="+v_link3+" type='video/mp4' /><source src="+v_link4+" type='video/mp4' /></video>";

        $('.no-player')[0].insertAdjacentHTML('afterend', mvideo);
    }
    fluidPlayer('my-video', {
        "layoutControls": {
            "autoPlay": false,
            "mute": false,
            "allowTheatre": true,
            "playPauseAnimation": true,
            "playbackRateEnabled": true,
            "allowDownload": false,
            "playButtonShowing": true,
            "fillToContainer": false,
            "posterImage": v_poster
        }
    });
    $('.no-player').remove();

})();
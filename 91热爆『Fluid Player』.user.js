// ==UserScript==
// @name         91热爆『Fluid Player』
// @namespace    https://greasyfork.org/zh-CN/users/108076
// @version      21.5.7
// @description  直接播放VIP视频
// @author       草木灰
// @match        http*://*.69re.org/*
// @match        http*://*.91bjav.com/*
// @match        http*://*.91pjav.com/*
// @match        http*://*.91rb.cc/*
// @match        http*://*.91rb.net/*
// @match        http*://*.91rb01.com/*
// @match        http*://*.91rb99.com/*
// @match        http*://*.91rba.top/*
// @match        http*://*.k8km.com/*
// @match        http*://*.kp020.com/*
// @match        http*://*.kp827.com/*
// @match        http*://*.qz7app.com/*
// @match        http*://*.qzav.org/*
// @match        http*://*.qzav21.com/*
// @match        http*://*.qzsp39.com/*
// @match        http*://*.qzsp77.com/*
// @match        http*://*.rb1769.com/*
// @match        http*://*.rbjav.com/*
// @match        http*://*.rbp18.com/*
// @match        http*://*.rbp20.com/*
// @match        http*://*.rbpapa.com/*
// @match        http*://*.rbupload.com/*
// @match        http*://*.rbw18.com/*
// @match        http*://*.rbw20.com/*
// @match        http*://*.rbw203.com/*
// @match        http*://*.rbw66.com/*
// @match        http*://*.rbwcdn.com/*
// @match        http*://*.rbwpw.cc/*
// @match        http*://*.rbxgkq.com/*
// @match        http*://*.rm2029.com/*
// @match        http*://*.rp1212.com/*
// @match        http*://*.upvip.xyz/*
// @match        http*://*.91rbzy.com/*
// @icon         https://www.google.com/s2/favicons?domain=91rb.net
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

    var v_poster = $('.block-video .no-player img').attr('src');
    var v_poster_h = $('.block-video .no-player img').attr('height');

    // console.log(v_poster);
    var v_id = v_poster.replace(/.*\/contents\/videos_screenshots\/(\d+)\/(\d+)\/.*/, "$1/$2/$2");
    // console.log(v_id);

    var v_link_hd1 = 'https://cust91rb.163cdn.net/mp4/videos/' + v_id + '_720p.mp4';

    var v_link_hd2 = 'https://cust91rb2.163cdn.net/mp4/videos/' + v_id + '_720p.mp4';

    var v_link1 = 'https://cust91rb.163cdn.net/mp4/videos/' + v_id + '.mp4';

    var v_link2 = 'https://cust91rb2.163cdn.net/mp4/videos/' + v_id + '.mp4';

    if ($('.no-player').length === 1) {
        var mvideo = "<video id='my-video' controls width = '100%' height=" + v_poster_h + "><source src=" + v_link_hd1 + " type='video/mp4' /><source src=" + v_link_hd2 + " type='video/mp4' /><source src=" + v_link1 + " type='video/mp4' /><source src=" + v_link2 + " type='video/mp4' /></video>";

        $('.no-player')[0].insertAdjacentHTML('afterend', mvideo);
    }
    fluidPlayer('my-video', {
        "layoutControls": {
            "autoPlay": false,
            "mute": false,
            "allowTheatre": true,
            "preload": true,
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


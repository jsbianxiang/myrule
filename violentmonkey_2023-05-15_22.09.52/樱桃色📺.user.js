// ==UserScript==
// @name         樱桃色📺
// @namespace    https://greasyfork.org/zh-CN/users/108076
// @version      1.0.3
// @description  允许直接播放搜视频VIP视频!日期2022年6月27日
// @author       草木灰
// @match        *://ytsetv88.com/vodplay/*
// @include      /(^[^:\/#\?]*:\/\/([^#\?\/]*\.)?ytsetv[0-9]{2}\.(com|xyz|top)(:[0-9]{1,5})?\/vodplay\/.*$)/
// @icon         http://ytsetv85.xyz/template/default_pc/statics/img/favicon.ico
// @run-at       document-end
// @license      MIT
// ==/UserScript==

; (function () {

    'use strict'

    /* ----- 必须登录免费会员账号 ---- */
    if (window.location.href.indexOf('try') === -1) {
        var url = window.location.href
        window.location.href = url + '?module=try'
    }

    /* ----- 获取视频链接 ---- */
    var videoSource = player_data.url;
    //var videoUrl = videoSource.replace(/\?segments=8&time=3/, '');
    var videoPartUrl = videoSource.replace(/(.*)\?segments=[0-9]&time=[0-9]/, '$1');
    var videoUrl = window.location.origin + '/index.php/player?m3u8=' + videoPartUrl;
    console.log('拼接地址', videoUrl)
    // ytsetv88.com/index.php/player?m3u8=http://cdn.ailushe81.com:2100/20210807/qRcEWL6R/1000kb/hls/index.m3u8
    // http://cdn.ailushe81.com:2100/20210807/qRcEWL6R/1000kb/hls/index.m3u8?segments=8&time=3

    /* ----- 获取播放器大小 ---- */
    var width = $('[src="/static/player/dplayer.html"]').width()
    var height = $('[src="/static/player/dplayer.html"]').height()

    $('div[class="myui-player__item embed-responsive clearfix"]').html(`<iframe width=${width} height=${height} src= ${videoUrl} frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>`);

})()

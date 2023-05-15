// ==UserScript==
// @name         搬淫家 🍉xgplayer
// @namespace    https://greasyfork.org/zh-CN/users/108076
// @version      2.0.0
// @description  允许直接播放搬淫家VIP视频,日期2022年9月29日
// @author       草木灰
// @match        *://www.banyinjia.com/*
// @include      /(^[^:\/#\?]*:\/\/([^#\?\/]*\.)?banyinjia[0-9]{1,2}\.com(:[0-9]{1,5})?\/.*$)/
// @include      /(^[^:\/#\?]*:\/\/([^#\?\/]*\.)?byj[0-9]{1,2}\.com(:[0-9]{1,5})?\/.*$)/
// @include      /(^[^:\/#\?]*:\/\/([^#\?\/]*\.)?byj[0-9]{1,2}\.me(:[0-9]{1,5})?\/.*$)/
// @include      /(^[^:\/#\?]*:\/\/([^#\?\/]*\.)?byj[0-9]{1,2}\.tv(:[0-9]{1,5})?\/.*$)/
// @icon         https://www.banyinjia.com/images/icon.ico
// @require      https://unpkg.com/jquery@latest/dist/jquery.js
// @require      https://unpkg.com/xgplayer@latest/browser/index.js
// @require      https://unpkg.com/xgplayer-hls.js@latest/browser/index.js
// @run-at       document-end
// @license      MIT
// ==/UserScript==

(function () {

    'use strict';

    //必须登录免费会员账号
    //视频源列表
    var videoSource = $('source').attr('src');

    //设置播放器大小
    var width = $('#player-container-fluid').width();
    var height = $('#player-container-fluid').height();
    if ($('#player-hint').length === 1) {
        $('#player-container-fluid').html('<div id="mse"></div>');
        var player = new HlsJsPlayer({
            "id": "mse",
            "url": videoSource,
            //isLive: true, //直播场景设置为true
            //useHls: true,
            // "hlsOpts": {
            //  }, //hls.js可选配置项
            "playsinline": true,
            "whitelist": [
                ""
            ],
            "width": width,
            "height": height,
            // "poster": " ",
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
        player.on('ready', () => {

            // console.info('ready');

            player.hls.on('hlsManifestParsed', (event, data) => {

                let list = data.levels.map((item) => {
                    return {
                        name: item.name,
                        url: item.url[0],
                    };
                });

                let resources = [{ "name": "Auto", "url": videoSource }].concat(list);

                console.info('MANIFEST_PARSED -->视频列表', resources);
                player.emit('resourceReady', resources);
            });

        });
    }
})();
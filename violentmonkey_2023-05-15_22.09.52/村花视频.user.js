// ==UserScript==
// @name         村花视频
// @version      1.0.0
// @description  直接播放VIP视频
// @author       草木灰
// @match        *://www.tor.mba/videos/*
// @icon         https://www.google.com/s2/favicons?domain=www.tor.mba
// @require      https://unpkg.com/jquery@latest/dist/jquery.js
// @require      https://unpkg.com/xgplayer@latest/browser/index.js
// @run-at       document-end
// @license      MIT
// ==/UserScript==

(function () {

    'use strict';

    //通过预览图地址是否存在判断高清画质的函数
    function CheckHdStatus(getUrl) {

        var status = new Boolean();

        $.ajax({
            url: getUrl,
            type: 'GET',
            cache: false,
            async: false, //同步设置
            complete: function (response) {
                if (response.status == 200) {
                    status = true;
                    console.info('有效');
                } else {
                    console.info('无效');
                    status = false;
                }
            }
        });
        return status;

    }

    //获取播放器封面
    var preview = $('.block-video .no-player img').attr('src');
    var previewUrl_SD = preview;
    console.info('标清画质预览图', previewUrl_SD);
    var previewUrl_HD = previewUrl_SD.replace(/\/preview\.mp4\.jpg/, "/preview_720p.mp4.jpg");
    console.info('高清画质预览图', previewUrl_HD);

    // 获取播放器大小
    var width = $('.player').width();
    var height = $('.player').height();

    var isHD = CheckHdStatus(previewUrl_HD); //是否高清视频源1
    console.info('isHD', isHD);

    //获取视频连接
    var videoId = preview.replace(/.*\/contents\/videos_screenshots\/(\d+)\/(\d+)\/.*/, "$1/$2/$2");

    var videoUrl_HD = '';
    var videoUrl_HD1 = 'https://s01-01.chsp.cc/videos/' + videoId + '_720p.mp4';
    var videoUrl_HD2 = 'https://s01-02.chsp.cc/videos/' + videoId + '_720p.mp4';
    var videoUrl_SD = '';
    var videoUrl_SD1 = 'https://s01-01.chsp.cc/videos/' + videoId + '.mp4';
    var videoUrl_SD2 = 'https://s01-02.chsp.cc/videos/' + videoId + '.mp4';

    if ($('.no-player').length === 1) {

        $(".player").html('<div id="mse"></div>');

        if (isHD) {

            let player = new Player({
                "id": "mse",
                "url": videoUrl_HD1,
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

            player.emit('resourceReady', [{ "name": "720P", "url": videoUrl_HD1 }, { "name": "480P", "url": videoUrl_SD1 }]);

        } else {

            let player = new Player({
                "id": "mse",
                "url": videoUrl_SD1,
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
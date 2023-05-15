// ==UserScript==
// @name         Clappr - 菠菜SEX
// @namespace    https://greasyfork.org/zh-CN/users/108076
// @version      2.0.0
// @description  直接播放VIP视频
// @author       草木灰
// @include      /(^[^:\/#\?]*:\/\/([^#\?\/]*\.)?bcs[0-9]{2}\.com(:[0-9]{1,5})?\/videos\/.*$)/
// @include      /(^[^:\/#\?]*:\/\/([^#\?\/]*\.)?bocai[0-9]{3}\.com(:[0-9]{1,5})?\/videos\/.*$)/
// @icon         https://www.google.com/s2/favicons?domain=bcs11.com
// @require      https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js
// @require      https://cdn.jsdelivr.net/npm/@clappr/player@latest/dist/clappr.min.js
// @require      https://cdn.jsdelivr.net/npm/hls.js@latest
// @run-at       document-end
// @grant        GM_addStyle
// @grant        unsafeWindow
// ==/UserScript==

(function () {

    'use strict';

    var videoPoster = $('.block-video .no-player img').attr('src');

    // console.log(videoPoster);

    var v_id = videoPoster.replace(/.*\/contents\/videos_screenshots\/(\d+)\/(\d+)\/.*/, "$1/$2/$2");
    // console.log(v_id);

    var videoUrl_HD = 'https://bcsvideos.com/contents/videos/' + v_id + '_720p.mp4';
    var videoUrl_SD = 'https://bcsvideos.com/contents/videos/' + v_id + '.mp4';
    //获取播放器大小
    var width = $('.player').width();
    // console.log(width);
    var height = $('.player').height();

    if ($('.no-player').length === 1) {

        $(".player").html('<div id="player-wrapper" class="player"></div>');
        var playerElement = document.getElementById("player-wrapper");

        var r = 0; // Retry attempts

        var sources = [videoUrl_SD]; //视频源列表
        // console.log(sources);

        var player = new Clappr.Player({
            source: videoUrl_HD,
            poster: videoPoster,
            disableErrorScreen: true, // Disable the internal error screen plugin
            height: height,
            width: width,
            events: {
                onError: function (e) {
                    var s = sources[r];
                    // Replace previous line by the following line to simulate successful recovery
                    var retry = function () {
                        var o = player.options;
                        o.source = s;
                        player.configure(o);
                        return;
                    };
                    if (r < 3) {
                        retry();
                        console.log("位置", r, player.options.source);

                    }
                    r++;
                }
            }
        });

        player.attachTo(playerElement);
        $('.player-poster[data-poster]').css('background-size', "contain");

    }

})();
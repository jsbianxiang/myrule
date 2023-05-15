// ==UserScript==
// @name        快猫
// @namespace   Violentmonkey Scripts
// @include      /^[^:/#?]*:\/\/([^#?/]*\.)?www\.kmkk[0-9]{2}\.com(:[0-9]{1,5})?\/.*$/
// @grant       none
// @version     1.0
// @author      -
// @description 2023/4/18 10:39:00
// ==/UserScript==

(function () {
    'use strict';

    /* none 如果不使用 unsafeWindow ，快猫手机端，含羞草pc端会播放失败，原因未知。
    原因：通过 @require 加载的hls提示找不到，通过import_js导入ok */

    function import_js(src) {
        let script = document.createElement('script');
        script.src = src;
        document.head.appendChild(script);
    }
    import_js("https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js");
    import_js("https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.1.5/hls.min.js");
    import_js("https://cdnjs.cloudflare.com/ajax/libs/dplayer/1.26.0/DPlayer.min.js");

    /* 函数功能：加载Dplayer播放视频，并显示视频地址。 参数说明：videoUrl：视频地址 el：播放器加载位置 dizhi: 地址显示位置  */
    function play_video(videoUrl, el, dizhi) {

        if (!videoUrl || !el || !dizhi) throw new Error(`部分参数无效，视频地址：${videoUrl}、播放器位置：${el}、提示位置：${dizhi}`);

        /* 1. 显示地址//
        var mydiv = document.createElement('div');
        mydiv.innerHTML = `<div id="my_add_dizhi" style="color:red;font-size:14px">
            <p style="color:red;font-size:14px">视频地址：<a href="${videoUrl}" target="_blank">${videoUrl}</a></p>
            <p style="color:red;font-size:14px">问题反馈 or 支持作者请
            <a href="https://sleazyfork.org/zh-CN/scripts/456496" target="_blank">【点击此处】</a>，使用愉快！</p></div>`;
        dizhi.after(mydiv);
*/
        if (window.dp) {
            window.dp.pause()
            window.dp.destroy()
            window.dp = null;
        }

        /* 2. 新增播放器 */
        window.dp = new DPlayer({
            element: el,
            autoplay: true,
            theme: '#FADFA3',
            loop: true,
            lang: 'zh',
            screenshot: true,
            hotkey: true,
            preload: 'auto',
            video: {
                url: videoUrl,
                type: 'hls'
            }
        });
    }

    function get_videourl() {
        let videoUrl = null;
        let ads = null;
        try {
            /* 快猫，兼容手机 + PC */
            if (location.href.match("https://.*?km.*?.com/videoContent/") != null) {
                /* 1.点击试看（不需要） */
                /* 2.解析真实地址 */
                videoUrl = document.querySelector("#videoContent")?.__vue__?.formatUrl;
                if (videoUrl) {
                    console.log("真实地址:", videoUrl);
                    /* 3.移除广告 */
                    ads = document.querySelector(".exchangeBg"); if (ads != null) ads.style.display = "none";
                    /* 4.播放正片 */
                    play_video(videoUrl, document.querySelector("div.backImg"), document.querySelector("div.videoTitle") || document.querySelector("div p.name"));
                    /* 5.停止定时器 */
                    clearInterval(my_timer);
                }
                else {
                    console.log("[快猫]视频页面，未获取到地址，继续尝试...");
                }
            }
        }
        catch (err) {
            console.log(`${err}`);
        }
    }

    let my_timer = setInterval(get_videourl, 1100);

    var oldhref = location.href;
    setInterval(function () {
        if (location.href != oldhref) {
            console.log("监听到地址变化,再次启动【获取视频定时器】!");
            oldhref = location.href;
            my_timer = setInterval(get_videourl, 1000);
        }
    }, 1000);

})();
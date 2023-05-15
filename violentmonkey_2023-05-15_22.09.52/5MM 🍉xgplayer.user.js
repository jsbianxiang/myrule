// ==UserScript==
// 脚本的元信息，包括脚本名称、作者、版本号、描述等。
// @name         5MM 🍉xgplayer
// @namespace    https://greasyfork.org/zh-CN/users/108076
// @version      2.0.0
// @description  解除试看直接播放VIP视频❗
// @author       草木灰
// @match        *://www.wmmporn.com/videos/*
// @include      /(^[^:\/#\?]*:\/\/([^#\?\/]*\.)?wmm[0-9]{3}\.com(:[0-9]{1,5})?\/videos\/.*$)/
// @icon         https://www.wmmporn.com/favicon.ico
// @require      https://unpkg.com/jquery@3.7.0/dist/jquery.js
// @require      https://unpkg.com/xgplayer@2.31.6/browser/index.js
// @require      https://unpkg.com/xgplayer-hls.js@2.6.4/browser/index.js
// @run-at       document-end
// @license      MIT
// ==/UserScript==

(function () {

  'use strict';

  const videoPoster = $('.block-video .no-player img').attr('src');
  // 获取视频封面地址

  const getVideoUrl = (posterUrl) => {
    const videoId = posterUrl.replace(/.*\/contents\/videos_screenshots\/(\d+)\/(\d+)\/.*/, "$1/$2/$2");
    const isVip = posterUrl.indexOf('_vip.mp4') !== -1;
    const baseUrl = 'https://media2.wmmcci.com/contnesr/vidoes/';
    return isVip ? baseUrl + videoId + '_vip.mp4' : baseUrl + videoId + '.mp4';
  }
  // 根据封面地址获取视频地址

  const width = $('.player').width();
  const height = $('.player').height();

  if ($('.no-player').length === 1) {

      $(".player").html('<div id="mse"></div>');

      const player = new Player({
          id: "mse",
          url: getVideoUrl(videoPoster),
          playsinline: true,
          whitelist: [""],
          width: width,
          height: height,
          poster: videoPoster,
          volume: 0.9,
          videoInit: true,
          autoplay: false,
          fluid: true,
          playbackRate: [0.5, 1, 1.5, 2],
          rotate: {
              clockwise: true,
              innerRotate: true
          },
          lang: 'zh-cn',
          pip: true
      });
      // 创建播放器实例并设置相关属性

  }

})();

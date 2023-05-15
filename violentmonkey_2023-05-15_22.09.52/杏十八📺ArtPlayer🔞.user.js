// ==UserScript==
// @name         杏十八📺ArtPlayer🔞
// @namespace    https://greasyfork.org/zh-CN/users/108076
// @version      1.1.0
// @description  免VIP[m3u8]VIP会员视频!
// @author       草木灰
// @match        http*://www.xing18.cc/*
// @icon         https://www.xing18.cc/favicon.ico
// @require      https://unpkg.com/jquery@3.6.0/dist/jquery.js
// @require      https://unpkg.com/hls.js@1.1.5/dist/hls.js
// @require      https://unpkg.com/artplayer@4.5.2/dist/artplayer.js
// @run-at       document-end
// @grant        GM_addStyle
// @grant        unsafeWindow
// @license      MIT
// ==/UserScript==

(function () {

  'use strict';
  // 登录免费会员账号
  var videoUrl = player.videoTemp.src;
  //console.log(videoUrl);

  //获取播放器大小
  var width = $('#video').width();
  var height = $('#video').height();

  $('#video').html('<div class="artplayer-app"></div>');
  GM_addStyle(`.artplayer-app {width: ${width}px;height: ${height}px;}`);
  var art = new Artplayer({
    container: '.artplayer-app',
    url: videoUrl,
    title: document.title,
    poster: '',
    volume: 0.7,
    isLive: false,
    muted: false,
    autoplay: false,
    pip: false,
    autoSize: false,
    autoMini: true,
    screenshot: true,
    setting: true,
    loop: true,
    flip: false,
    playbackRate: true,
    aspectRatio: true,
    fullscreen: true,
    fullscreenWeb: true,
    subtitleOffset: true,
    miniProgressBar: true,
    mutex: true,
    backdrop: true,
    playsInline: true,
    autoPlayback: true,
    theme: '#23ade5',
    lang: navigator.language.toLowerCase(),
    whitelist: ['*'],
    moreVideoAttr: {
      crossOrigin: 'anonymous',
    },
    customType: {
      m3u8: function (video, url) {
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(url);
          hls.attachMedia(video);
          /* 换源
          hls.on(Hls.Events.ERROR, () => {
              url = videoUrl_SD;
              hls.loadSource(url);
              hls.attachMedia(video);
              // console.log(Hls.Events.ERROR);
          });
          */
        } else {
          const canPlay = video.canPlayType('application/vnd.apple.mpegurl');
          if (canPlay === 'probably' || canPlay == 'maybe') {
            video.src = url;
          } else {
            art.notice.show = 'Does not support playback of m3u8';
          }
        }
      },
    },
    contextmenu: [
      {
        html: 'FullScreen',
        click: function (contextmenu) {
          art.player.fullscreenToggle = true;
          console.info('You clicked on the FullScreen');
          contextmenu.show = false;
        },
      },
    ],
    subtitle: {
      url: ' ',
      type: 'srt',
      style: {
        color: '#fe9200',
        fontSize: '20px',
      },
      encoding: 'utf-8',
    },
  });

})();
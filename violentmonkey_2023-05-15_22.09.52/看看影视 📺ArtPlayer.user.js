// ==UserScript==
// @name         看看影视 📺ArtPlayer
// @namespace    https://greasyfork.org/zh-CN/users/108076
// @version      1.1.0
// @description  解除试看限制，免费看全片❗
// @author       草木灰
// @include      /(^[^:\/#\?]*:\/\/([^#\?\/]*\.)?kkyyss[0-9]{1,3}\.xyz(:[0-9]{1,5})?.*$)/
// @icon         https://kkyyss3.xyz:1688/favicon.ico
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

  //需要登陆免费账号

  /* ******** 获取视频连接 ************ */
  var videoUrl = videoObject.video.file;
  // console.log(v_src);

  /* ******** 获取播放器封面 *********** */
  var videoPoster = videoObject.poster;
  //获取播放器大小
  var width = $('.sitcom-movies-movie').width();
  var height = $('.sitcom-movies-movie').height();

  $('.sitcom-movies-movie').html('<center><div class="artplayer-app"></div></center>');
  GM_addStyle(`.artplayer-app {width: ${width}px; height: ${height}px;}`);
  var art = new Artplayer({
    container: '.artplayer-app',
    url: videoUrl,
    title: document.title,
    poster: videoPoster,
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
// ==UserScript==
// @name         AVDAY ▶Artplayer
// @namespace    https://greasyfork.org/zh-CN/users/108076
// @version      1.0.0
// @description  免VIP免登录会员,免费看全片❗
// @author       草木灰
// @match        *://avday.tv/watch/*
// @match        *://avday.tv/play/animation/*
// @icon         https://avday.tv/favicon.ico
// @require      https://unpkg.com/jquery@latest/dist/jquery.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/hls.js/8.0.0-beta.3/hls.min.js
// @require      https://unpkg.com/artplayer@latest/dist/artplayer.js
// @run-at       document-end
// @grant        GM_addStyle
// @license      MIT
// ==/UserScript==

(function () {

  'use strict';

  //可能需要登录免费会员
  var v_poster = '';
  var videoUrl = '';
  var short_videos__avid__videourl = '';
  var short_videos__avid_not__videourl = '';
  var adult_videos__cover__videourl = '';
  var animation__cover__videourl = '';
  var sw_videos__swid__videourl = '';

  //获取视频封面
  v_poster = $("#video-player").attr("poster");

  //获取播放器大小
  var width = $('.mobile-video-block').width();
  var height = $('.mobile-video-block').height();

  //获取视频链接
  var short_videos__avid = v_poster.replace(/.*\/short-videos\/(avid[\w\d]+)\/thumb\/.*/, "$1"); //console.log("短视频:", short_videos__avid);
  var short_videos__avid_not = v_poster.replace(/.*\/short-videos\/([^avid][\w\d]+)\/[\w\d]+.*/, "$1"); //console.log("麻豆视频:", short_videos__avid_not);
  var adult_videos__cover = v_poster.replace(/.*\/adult-videos\/([^/]+)\/cover\/.*/, "$1"); //console.log("日本AV:", adult_videos__cover);
  var animation__cover = v_poster.replace(/img\.awvvvvw\.live\/imgs\/cover\/(.*)/, "$1"); //console.log("H动漫:", animation__cover);
  var sw_videos__swid = v_poster.replace(/.*\/sw-videos\/videos\/(swid[\w\d]+)\/.*/, "$1"); //console.log("Swag视频:", sw_videos__swid);

  if (short_videos__avid !== v_poster) {
      short_videos__avid__videourl = 'https://video.awvvvvw.live/tv_adult/' + short_videos__avid + '/' + short_videos__avid + '.m3u8';
      videoUrl = short_videos__avid__videourl;
  }
  if (short_videos__avid_not !== v_poster) {
      short_videos__avid_not__videourl = 'https://video.awvvvvw.live/tv_adult/' + short_videos__avid_not + '/720/video.m3u8';
      videoUrl = short_videos__avid_not__videourl;
  }
  if (adult_videos__cover !== v_poster) {
      if ($("meta[itemprop='contentURL']").attr("content")) {
          adult_videos__cover = $("meta[itemprop='contentURL']").attr("content").replace(/.*\/apen\/([^/]+)\/.*/, "$1");
      }
      adult_videos__cover__videourl = 'https://video.awvvvvw.live/apen/' + adult_videos__cover + '/' + adult_videos__cover + '.m3u8';
      videoUrl = adult_videos__cover__videourl;
  }
  if (animation__cover !== v_poster) {
      if ($("meta[itemprop='contentURL']").attr("content")) {
          animation__cover = $("meta[itemprop='contentURL']").attr("content").replace(/.*\/apen\/([^/]+)\/.*/, "$1");
      }
      animation__cover__videourl = 'https://video.awvvvvw.live/apen/' + animation__cover + '/' + animation__cover + '.m3u8';
      videoUrl = animation__cover__videourl;
  }
  if (sw_videos__swid !== v_poster) {
      sw_videos__swid__videourl = 'https://video.awvvvvw.live/sw_videos/videos/' + sw_videos__swid + '/video.m3u8';
      videoUrl = sw_videos__swid__videourl;
  }

  // 播放器覆盖
  $('#video-player-block').html('<div class="artplayer-app"></div>');

  GM_addStyle(`.artplayer-app {width: ${width}px; height: ${height}px;}`);

  function playM3u8(video, url, art) {
      if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(url);
          hls.attachMedia(video);

          // optional
          art.hls = hls;
          art.once('url', () => hls.destroy());
          art.once('destroy', () => hls.destroy());
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = url;
      } else {
          art.notice.show = 'Unsupported playback format: m3u8';
      }
  }

  var art = new Artplayer({
      container: '.artplayer-app',
      url: videoUrl,
      type: 'm3u8',
      customType: {
          m3u8: playM3u8,
      },
      title: document.title,
      poster: v_poster,
      volume: 0.7,
      isLive: false,
      muted: false,
      autoplay: false,
      pip: true,
      autoSize: false,
      autoMini: true,
      screenshot: true,
      setting: true,
      loop: true,
      flip: true,
      playbackRate: true,
      aspectRatio: true,
      fullscreen: true,
      fullscreenWeb: true,
      miniProgressBar: true,
      mutex: true,
      backdrop: true,
      playsInline: true,
      autoPlayback: true,
      airplay: true,
      theme: '#23ade5',
      lang: navigator.language.toLowerCase(),
      whitelist: ['*'],
      moreVideoAttr: {
          crossOrigin: 'anonymous',
      },
  });

  art.on('ready', () => {
      console.info(art.hls);
  });

  // 移除充值会员提示
  $('#unlock-msg').remove();

})();

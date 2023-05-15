// ==UserScript==
// @name         教育盘
// @namespace    https://greasyfork.org/zh-CN/users/108076
// @version      0.1.9
// @description  免VIP会员获取百度网盘地址❗
// @author       草木灰
// @match        https://jiaoyupan.com/forum.php?mod=viewthread&tid=*
// @icon         https://jiaoyupan.com/favicon.ico
// @run-at       document-end
// @license      MIT
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  let a = document.querySelector(".copy_pswd").attributes.onclick.nodeValue
  let b = a.split(",")
  let x = b[0].split("'")[1]
  let y = b[1].split("'")[1]
  var crack_download_box = window.location.origin + "/plugin.php?id=threed_attach:downld&aid=" + x + "&formhash=" + y;
  console.log('下载地址', crack_download_box)
  var downloadButtonDiv = document.querySelector('div.download_box');
  var downloadButtonA = document.createElement('a');
  downloadButtonA.href = crack_download_box;
  downloadButtonA.target = '_blank';
  downloadButtonA.innerHTML = '已破解，地址在此处';
  downloadButtonDiv.appendChild(downloadButtonA);

  // Your code here...
})();
// ==UserScript==
// @name        联盟站群 - 福利姬 | MissAV8
// @namespace   Violentmonkey Scripts

// @match       *://www.fuliji.space/*
// @match       *://fuliji.cfd/*
// @match       *://fuliji.sbs/*
// @match       *://javhdporn.cfd/*

// @match       *://missav08.com/*
// @icon        https://lanyan.cf/img/logo_icon_lanyan.png
// @require     https://unpkg.com/jquery@latest/dist/jquery.js
// @grant       none
// @version     1.0
// @author      -
// @description 3/1/2023, 8:25:49 PM
// ==/UserScript==

$(document).ready(function () {

  var vl = localStorage.getItem("free_plays");
  if (vl === "undefined" || vl == null || vl <= '9') {
    localStorage.setItem("free_plays", '999');
  }

})

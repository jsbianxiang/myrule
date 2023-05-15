// ==UserScript==
// @name 图集岛VIP-FancyBox版
// @namespace https://scriptcat.org/script-show-page/443
// @version 2.9
// @description 破解图集岛VIP
// @author yyg, 253681319，LARASSR
// @include   /https?:\/\/(\w+\.)?tujidao\w*\.\w+/
// @license MIT
// @date 2022-01-14
// @require      https://cdn.staticfile.org/jquery/3.6.0/jquery.min.js
// @require      https://cdn.jsdelivr.net/gh/LARASPY/hello@master/main.js
// @require      https://cdn.jsdelivr.net/gh/LARASPY/hello@master/fancybox.js
// @connect      https?:\/\/(\w+\.)?tujidao\w*\.\w+
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        unsafeWindow
// ==/UserScript==

(async function () {
  "use strict";

  let html1 =
    '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>img_title</title>' +
    "<style>img {vertical-align: top;text-align: center;}" +
    ".imgbox{position: relative;overflow: hidden;}" +
    ".imgbox img{max-width: 100%}" +
    ".imgnum{font-size:80%;position: absolute;left: 5px;top: 5px;background: #17A1FF;background: rgba(23,161,255,0.5);z-index: 100;padding: 0px 5px;color: #f9f9f9;border-radius: 2px;}" +
    "a:link{color:pink;border: 1px solid transparent;border-bottom-color: pink}a:visited{color:purple;}a{text-decoration:none};" +
    "</style></head>" +
    '<body bgcolor="#27282d"><div id="tujicenter" align="center" style="margin-top: 3px;">';
  let html2 = "</div></body></html>";
  let pic_base =
    "<div class='imgbox'><div class='imgnum'>{imgnum}</div><img tabindex=-1 id='imgLocation{index}' label='sl' data-fancybox='images' src='https:///tjg.gzhuibei.com/a/1/{pic_id}/{num}.jpg'></div>";
  let downLoadButton =
    '<a href="javascript:void(0)" id="packageBtn"  onclick= "packageAndDownloadInitCheck()" style="border:1px solid transparent;border-bottom-color:#815c94">下载图片</a>';

  console.log("start");
  let addStateMent = function (head, type, src, textContent, setAttribute) {
    let statement = document.createElement(type);
    if (src) statement.src = src;
    if (textContent) statement.textContent = textContent;
    if (setAttribute) {
      // console.log(setAttribute);
      for (const [key, value] of Object.entries(setAttribute)) {
        statement.setAttribute(key, value);
      }
    }
    head.appendChild(statement);
  };
  let isPackageAndDownload = false;
  let packageAndDownload = function () {
    let Alpha_Script = {
      obtainHtml: function (options) {
        options = options || {};
        if (!options.url || !options.method) {
          throw new Error("参数不合法");
        }
        GM_xmlhttpRequest(options);
      },
      parseHeaders: function (headStr) {
        let o = {};
        let myregexp = /^([^:]+):(.*)$/gim;
        let match = /^([^:]+):(.*)$/gim.exec(headStr);
        while (match != null) {
          o[match[1].trim()] = match[2].trim();
          match = myregexp.exec(headStr);
        }
        // console.log(o);
        return o;
      },
    };
    let blobCache = {};
    if (isPackageAndDownload) {
      alert("下载中, 请耐心等待...\n点击确认继续下载");
    } else {
      isPackageAndDownload = true;
      let zip = new JSZip();
      let imgList = $('img[label="sl"]');
      let length = imgList.length;
      let errorNum = 0;
      $.each(imgList, function (index, value) {
        let img = zip.folder(document.title);
        let imgSrc = $(value).attr("src");

        Alpha_Script.obtainHtml({
          url: imgSrc,
          method: "GET",
          headers: Alpha_Script.parseHeaders(
            "Host:" + "tjg.gzhuibei.com\n" +
            "Referer:" + window.location.origin + "\n"
          ),
          timeout: 30000,
          responseType: "blob",
          onload: function (response) {
            console.log("DownlodeUrl " + index + ": ", response.finalUrl);
            // debugger
            if (
              response &&
              response.status &&
              response.status >= 200 &&
              response.status < 300
            ) {
              let responseHeaders = Alpha_Script.parseHeaders(
                response.responseHeaders
              );
              let contentType = responseHeaders["Content-Type"];
              if (!contentType) {
                contentType = "image/png";
              }
              let blob = new Blob([response.response], {
                type: contentType,
              });
              blobCache[imgSrc] = blob;
              img.file(1 + index + ".jpg", blobCache[imgSrc], {
                base64: false,
              });
              // if (length == 1) debugger
            } else {
              errorNum++;
              if (errorNum === imgList.length) {
                isPackageAndDownload = false;
                err("图片全部下载失败,请使用插件下载。");
                alert("图片全部下载失败,请使用插件下载。");
              }
            }
            length--;
          },
          onerror: function (error) {
            err(error);
            length--;
          },
          ontimeout: function () {
            errorNum++;
            if (errorNum === imgList.length) {
              isPackageAndDownload = false;
              err("图片全部下载失败,请使用插件下载。");
              alert("图片全部下载失败,请使用插件下载。");
            }
            err("DownlodeUrl " + index + ": 超时");
            length--;
          },
        });
      });
      let packagName = document.title;
      if (!packagName) {
        packagName = "PackageSL";
      }
      let id = setInterval(function () {
        if (length === 0) {
          clearInterval(id);
          zip
            .generateAsync({
              type: "blob",
            })
            .then(function (content) {
              if (errorNum !== imgList.length) {
                saveAs(content, packagName + ".zip");
                isPackageAndDownload = false;
                console.log(
                  "图片下载完成 " +
                  (imgList.length - errorNum) +
                  "张，失败 " +
                  errorNum +
                  "张，总共" +
                  imgList.length +
                  "张。"
                );
                alert(
                  "图片下载完成 " +
                  (imgList.length - errorNum) +
                  "张，失败 " +
                  errorNum +
                  "张，总共" +
                  imgList.length +
                  "张。"
                );
              }
            });
        }
      }, 100);
    }
  };
  let fancyboxStart = function (document) {
    let head = document.getElementsByTagName("head")[0];
    let srcList = [
      "https://cdn.staticfile.org/jquery/3.6.0/jquery.min.js",
      "https://cdn.staticfile.org/jszip/3.1.5/jszip.min.js",
      "https://cdn.staticfile.org/FileSaver.js/1.3.8/FileSaver.min.js",
    ];
    let itemTpye = { name: "type", value: "text/css" };
    new Promise(function (resolve, reject) {
      let id = setInterval(function () {
        srcList.push(
          "https://cdn.jsdelivr.net/gh/LARASPY/hello@master/fancybox.js",
          "https://cdn.jsdelivr.net/gh/LARASPY/xhua@master/other/slidingPosition@v_0.2.js"
        );
        for (var src of srcList) {
          addStateMent(head, "script", src);
        }
        console.log("waiting...");
        if (fancyBoxCss && $) {
          console.log("FancyBoxCss && $ OK !!!");
          clearInterval(id);
          resolve(head);
        }
      }, 100);
    }).then(function (data) {
      // console.log(data);
      addStateMent(head, "style", null, fancyBoxCss, itemTpye);
      if (os.isPc) {
        addStateMent(head, "style", null, fancyBoxCssAdditon, itemTpye);
      }
    });
  };
  let packageAndDownloadInitCheck = function () {
    new Promise(function (resolve) {
      let id = setInterval(function () {
        if (Fancybox4 && JSZip && $) {
          clearInterval(id);
          resolve();
        }
      }, 100);
    }).then(function () {
      packageAndDownload();
    });
  };
  let createnew = function (num, pic_id, tags) {
    let pic_new = pic_base.replace("{pic_id}", pic_id);
    let tagHtml = [];
    let last = tags.pop();
    console.log(" # Title: ", last.innerText);
    for (let t of tags) {
      tagHtml.push(t.outerHTML);
    }
    tagHtml.push(downLoadButton);
    tagHtml.push(last.innerText);
    tagHtml =
      "<div style='color:white;font-size:smaller;'>" +
      tagHtml.join(" / ") +
      "</div>";
    let imgs = [];
    for (let i = 1; i <= num; i++) {
      imgs.push(
        pic_new
          .replace("{num}", i)
          .replace("{imgnum}", ` [${i}/${num}]`)
          .replace("{index}", i - 1)
      );
    }
    history.pushState({}, '', `/sousu/?s0=${last.innerText}`);
    let html = html1.replace(
      "img_title",
      `${last.innerText} - ${num}P @ ${pic_id}`
    );
    html += imgs.join("\n");
    html += html2;
    let w = window.open(
      location.origin + `/sousu/?s0=${last.innerText}`
    );
    w.onload = () => {
      w.document.write(tagHtml + html);
      fancyboxStart(w.document);
      w.document.close();
    };
  };
  // let lis = document.getElementsByClassName('shuliang');
  // <li id="47983">
  // <a href="/a/?id=47983" target="_blank"><img src="https://tjg.gzhuibei.com/a/1/47983/0.jpg"></a>
  // <span class="shuliang">27P</span>
  // <p>机构：<a href="/x/?id=2">网络美女</a></p>
  // <p>标签：<a href="/s/?id=183">大尺-度</a> <a href="/s/?id=43">福利</a></p>
  // <p>人物：<a href="/t/?id=6194">Byoru</a></p>
  // <p class="biaoti"><a href="/a/?id=47983">[网红COSER写真] 日本性感萝莉Byoru - Kiara Summer</a></p>
  // </li>
  // 小图链接

  /**
  
   * 给已有的图片容器添加点击事件，移除原有跳转链接
  
   */
  function addEvent(list) {
    for (const li of list) {
      //第一个a
      li.querySelector("img").onclick = function () {
        // 获取数量
        let num = li.querySelector("span.shuliang").innerText.split("P")[0];

        num = parseInt(num);

        // id
        let aTag = li.querySelector("a");
        aTag.removeAttribute("href"); // 删除链接，防止跳转

        let id = li.querySelector(".biaoti a").getAttribute("href");
        id = id.split("id=")[1];

        //丢掉最后一个
        let tags = li.querySelectorAll("p>a");
        createnew(num, id, [...tags]);
      };
    }
  }

  /**
  
   *  获取当前页面的图片列表
  
   */
  function getLiList() {
    return document.querySelectorAll("div.hezi>ul>li");
  }

  addEvent(getLiList());

  let contentContainer = document.getElementById("search");
  let config = {
    childList: true,
    subtree: true,
  };
  // 当观察到突变时执行的回调函数

  let callback = function (mutationsList) {
    mutationsList.forEach(function (item, index) {
      const { addedNodes } = item;
      addEvent(addedNodes);
    });
  };

  // 创建一个链接到回调函数的观察者实例

  let observer = new MutationObserver(callback);

  // 开始观察已配置突变的目标节点

  contentContainer && observer.observe(contentContainer, config);

  // 配置 自动无缝翻页 突变的目标节点
  let AutoPagerCallbacks = function (mutationsList) {
    mutationsList.forEach(function (item, index) {
      // console.log(item);
      const { children } = item.addedNodes[0].children[0];
      addEvent(children);
    });
  };
  let AutoPagerContainer = document.querySelector("body");
  let AutoPagerObserver = new MutationObserver(AutoPagerCallbacks);
  AutoPagerContainer && AutoPagerObserver.observe(AutoPagerContainer, config);

  //加载 下载函数，标签定位函数
  if (!unsafeWindow.packageAndDownload) unsafeWindow.packageAndDownload = packageAndDownload;
  if (!unsafeWindow.packageAndDownloadInitCheck) unsafeWindow.packageAndDownloadInitCheck = packageAndDownloadInitCheck;
  if (!unsafeWindow.fancyboxStart) unsafeWindow.fancyboxStart = fancyboxStart(document);
  if (!unsafeWindow.windowLoaction) unsafeWindow.windowLoaction = windowLoaction;
})();

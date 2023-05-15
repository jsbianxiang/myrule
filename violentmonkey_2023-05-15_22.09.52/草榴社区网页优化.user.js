// ==UserScript==
// @name        草榴社区网页优化(自用版)
// @name:zh-CN  草榴社区网页优化
// @name:zh-TW  草榴社區網頁優化
// @namespace   https://greasyfork.org/zh-CN/users/108076
// @author      ctab(作者),草木灰(修改者)
// @version     2.0.0
// @description         自动跳过提示页，去除帖子中的广告，图片、链接直接跳转，可选自动适应手机或桌面端，快速获取发布页（含大陆直连网址），兼容移动端
// @description:zh-CN   自动跳过提示页，去除帖子中的广告，图片、链接直接跳转，可选自动适应手机或桌面端，快速获取发布页（含大陆直连网址），兼容移动端
// @description:zh-TW   自動跳過提示頁，去除帖子中的廣告，圖片、連結直接跳轉，可選自動適應手機或案頭端，快速獲取發佈頁（含大陸直連網址），相容移動端
// @match       *://t66y.com/*
// @match       *://www.t66y.com/*
// @match       *://cl.*.xyz/*
// @icon        https://www.google.com/s2/favicons?domain=t66y.com
// @grant       GM_registerMenuCommand
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       unsafeWindow
// @run-at      document-body
// @license     MIT
// ==/UserScript==

(function () {
    "use strict";
    // 日志记录
    const log = {
        colorObj: {
            success: "#4EE04E",
            error: "#f91b1b",
            warning: "#ffc107",
            info: "unset"
        },
        _print(level, text) {
            let color = this.colorObj[level];
            console.log(`${new Date().toLocaleString()} ${level.toUpperCase()} %c${text}`, `color:${color}`);
        },
        suc(text) {
            this._print("success", text);
        },
        err(text) {
            this._print("error", text);
        },
        warn(text) {
            this._print("warning", text);
        },
        info(text) {
            this._print("info", text);
        }
    }
    // CSS添加
    function addCSS(style) {
        let tag = document.createElement("style");
        tag.innerHTML = style;
        document.documentElement.appendChild(tag);
    }
    // 字符信息
    const character = (() => {
        let obj = {};
        obj.traditional = ['zh-TW', 'zh-HK', 'zh-Hant', 'zh-MO'].includes(navigator.language);
        obj.simplified = ['zh-CN', 'zh-Hans', 'zh-SG', 'zh-MY'].includes(navigator.language);
        obj.char = obj.simplified ? 's' : 't';
        return obj;
    })();
    const hostArr = [
        "t66y.com",
        "www.t66y.com"
    ];
    // 默认设置
    let config = {
        "autoAdapt": true,
    }
    const menu = {
        's': {
            'autoAdapt': '自适应客户端',
            'getAddr': '📃 获取发布页地址'
        },
        't': {
            'autoAdapt': '自我調整用戶端',
            'getAddr': '📃 獲取發佈頁地址'
        }
    }[character.char];
    // 获取发布页地址
    function getPublicAddr() {
        let div = document.createElement("div");
        div.setAttribute("style", "width:280px;background:#444;color:#efefef;margin:auto;position:fixed;top:30px;left:0;right:0;z-index:99;padding:20px;border-radius:5px;")
        div.innerHTML = "<h2 style='font-size:20px'><i>正在加载中...</i></h2><br><br><button>关闭</button>"
        div.querySelector("button").onclick = () => {
            div.remove();
        }
        document.documentElement.appendChild(div);
        fetch("/htm_data/0612/9/5877.html", { cache: "no-cache" }).then(res => res.text()).then(html => {
            const reg = /<blockquote id=\"code1\">(.{5,30})<\/blockquote>/;
            const site = html.match(reg)[1];
            if (site === undefined) {
                throw "解析失败";
            }
            div.querySelector("h2").innerHTML = `发布页地址：<a style="font-size:inherit;color:#4ac015;text-decoration:underline;" href="//${site}" target="_blank">${site}</a>`
        }).catch((err) => {
            div.querySelector("h2").innerHTML = "出错了，" + err;
        });
    }
    // 自适应手机或桌面
    function autoAdapt() {
        const client = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 1 : 0;
        if (document.cookie.indexOf("ismob=" + client) === -1) {
            document.cookie = "ismob=" + client + ";expires=Fri, 31 Dec 2222 23:59:59 GMT; path=/;samesite=strict";
            if (client === 1) {
                location.href = location.href.replace("/htm_data/", "/htm_mob/");
            } else {
                location.href = location.href.replace("/htm_mob/", "/htm_data/");
            }
        };
    }
    // 还原链接
    function restoreLink() {

        document.querySelectorAll("a[href][target]").forEach(ele => {
            if (ele.href.indexOf(".redircdn.com/?") > -1) {
                ele.href = ele.href.replace(/______/g, ".").slice(ele.href.indexOf("?") + 1).replace(/https:/g, 'https://').replace(/&z/g, '');
            }
            console.log(ele.href)
        });
        document.querySelectorAll("img[ess-data]").forEach(ele => {
            ele.addEventListener("click", (evt) => {
                window.open(ele.src);
            }, true)
        });
        if (typeof $ !== "undefined") {
            $("img[ess-data]").off("click");
        } else {
            let win;
            if (typeof unsafeWindow !== "undefined") {
                win = unsafeWindow;
            } else {
                win = window;
            }
            win._open = win.open;
            win.open = (...args) => {
                if (typeof args[0] === "string" && args[0].match(/\.redircdn\.com\/\?/i)) {
                    return;
                }
                win._open(...args);
            }
        }
        log.suc("已还原所有链接");
    }
    // 注册
    function registerMenu() {
        if (typeof GM_registerMenuCommand !== "function" || typeof GM_getValue !== "function" || typeof GM_setValue !== "function") {
            log.err("未检测到函数，无法注册");
            return;
        }
        if (!GM_getValue('config')) {
            GM_setValue("config", JSON.stringify(config))
        } else {
            let saved = JSON.parse(GM_getValue("config"));
            for (let key in config) {
                if (undefined != saved[key]) {
                    config[key] = saved[key];
                }
            }
            GM_setValue("config", JSON.stringify(config));
        }
        GM_registerMenuCommand(menu.getAddr, () => {
            getPublicAddr();
        })
        for (let key in config) {
            let w = config[key] == true ? `✅ ${menu[key]}` : `❌ ${menu[key]}`;
            GM_registerMenuCommand(w, function () {
                config[key] = !config[key];
                GM_setValue("config", JSON.stringify(config));
                //按钮触发事件
                switch (key) {
                    case "autoAdapt":
                        if (!config[key]) {
                            document.cookie = "ismob=-1;expires=Fri, 31 Dec 1970 23:59:59 GMT; path=/;samesite=strict";
                        }
                        location.reload(true);
                        break;
                }
                location.reload();
            });
        }
    }
    // 域名检测
    if (hostArr.includes(window.location.hostname) === false && /cl\.[a-z\d]{4,10}\.xyz/.test(location.hostname) === false) {
        log.err("当前域名不合法");
        return false;
    }
    //注册菜单
    registerMenu();

    // 移除广告
    addCSS(`
        table.sptable_do_not_remove{
            display:block;
            opacity:0 !important;
        }
        table.sptable_do_not_remove tbody,
        table.sptable_do_not_remove tr,
        table.sptable_do_not_remove td{
            display:block !important;
        }
        table.sptable_do_not_remove td *{
            display:none  !important;
        }
        table.sptable_do_not_remove td{
            display:block;
            padding:0 !important;
            margin:0 !important;
            min-width:unset !important;
            min-height:unset !important;
            width:1.1px !important;
            height:1.1px !important;
            overflow:hidden;
        }
    `);
    log.suc("已隐藏广告");
    // 彻底移除
    const absRemove = () => {
        addCSS(`
                table.sptable_do_not_remove{
                    display:none !important;
                }
            `);
        log.suc("已彻底移除广告");
    }
    document.readyState !== "loading" ? absRemove() : document.addEventListener("DOMContentLoaded", () => { setTimeout(absRemove, 10) });
    // 还原链接
    document.readyState !== "loading" ? restoreLink() : document.addEventListener("DOMContentLoaded", () => { setTimeout(restoreLink, 10) });
    // 自动适应
    if (config.autoAdapt) {
        log.info("正在自适应客户端");
        autoAdapt();
        log.suc("客户端适应完成");
    }
})();
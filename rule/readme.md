# 🌐 自用网络代理分流规则集 (MyRule)

本仓库提供一套为 **Mihomo (Clash Meta)**、**Clash** 及 **Sing-box** 等现代化代理客户端精心定制的高效规则集（Rule-Set），旨在实现精细化地域分流、降低风控封号风险、加速 BT/PT 种子传输以及优化 DNS 解析体验。

> [!IMPORTANT]
> **提示**：本规则集基于个人日常网络需求动态维护与优化。引用时建议根据自身节点类型与网络环境适当调整配置策略。

---

## 📁 规则目录与分类

规则文件主要划分为 **域名规则 (`domain/`)** 与 **IP 规则 (`ip/`)** 两大类别，均采用标准 YAML `payload` 格式编写。

### 1. 🌍 节点定向与地域强限区规则 (`domain/`)

针对各地区音视频流媒体、防风控登录以及强地域限制服务，提供精准的节点路由指示：

| 规则文件名 | 描述与涵盖服务类型 | 建议分配节点 |
| :--- | :--- | :--- |
| [`hk-domain.yaml`](file:///e:/mygit/myrule/rule/domain/hk-domain.yaml) | **香港 IP 强限制平台**<br>`myTV SUPER`, `TVB`, `Viu`, `Now E`, `HOY TV`, `JOOX`, 持牌虚商及虚拟银行 (`ZA Bank`, `Mox`, `HashKey`) 等 | 🇭🇰 香港原生节点 |
| [`tw-domain.yaml`](file:///e:/mygit/myrule/rule/domain/tw-domain.yaml) | **台湾地区定向服务**<br>`巴哈姆特動畫瘋`, `LINE TV`, `LiTV`, `CatchPlay`, `Hami Video`, `KKBOX`, `Dcard`, `PTT` 等 | 🇹🇼 台湾原生节点 |
| [`jp-domain.yaml`](file:///e:/mygit/myrule/rule/domain/jp-domain.yaml) | **日本节点体验最佳 / 必选 JP 规则**<br>`AbemaTV`, `TVer`, `U-NEXT`, `Telasa`, `DMM`, `DLsite`, `Niconico`, `Fantia`, 各大片商官网等 | 🇯🇵 日本原生节点 |
| [`kr-domain.yaml`](file:///e:/mygit/myrule/rule/domain/kr-domain.yaml) | **韩国本土流媒体与游戏平台**<br>`Tving`, `Wavve`, `Coupang Play`, `Melon`, `Weverse`, `Naver`, `Nexon`, `NCSoft` 等 | 🇰🇷 韩国原生节点 |
| [`us-domain.yaml`](file:///e:/mygit/myrule/rule/domain/us-domain.yaml) | **美区流媒体与前沿 AI 服务**<br>`Hulu`, `Max (HBO)`, `Peacock`, `Paramount+`, `Tubi`, `Claude AI`, `OpenAI (ChatGPT)`, `Perplexity` 等 | 🇺🇸 美国原生/高纯净节点 |

---

### 2. ⚡ 功能型域名规则 (`domain/`)

| 规则文件名 | 描述与涵盖服务类型 | 建议策略 |
| :--- | :--- | :--- |
| [`unblocked-domain.yaml`](file:///e:/mygit/myrule/rule/domain/unblocked-domain.yaml) | **家宽/高解锁节点定向**<br>高风控图集、 Cloudflare 盾避让、特定 JAV/BT 索引站及住宅 IP 专属域名 | 🏡 家宽 / 住宅代理节点 |
| [`trackerslist-domain.yaml`](file:///e:/mygit/myrule/rule/domain/trackerslist-domain.yaml) | **BT/PT Tracker 域名列表**<br>包含公共开放与垂直社区 Tracker 域名，保障 BT 客户端 Peer 发现与连接 | 🎯 直连 / 专线 |
| [`direct-domain.yaml`](file:///e:/mygit/myrule/rule/domain/direct-domain.yaml) | **直连域名白名单**<br>系统 NCSI 连通性测试、Telegram 评论插件、国内 SaaS 办公及应用服务 | 🎯 Direct (直连) |
| [`proxy-domain.yaml`](file:///e:/mygit/myrule/rule/domain/proxy-domain.yaml) | **通用代理域名列表**<br>需要通过代理出站的通用海外域名与服务 | 🚀 Proxy (代理) |
| [`direct-dns-domain.yaml`](file:///e:/mygit/myrule/rule/domain/direct-dns-domain.yaml) | **国内公共 DNS 域名**<br>DNSPod, AliDNS, 火山引擎, 360, OneDNS 的 DoH/DoT 服务域名 | 🎯 Direct (直连) |
| [`proxy-dns-domain.yaml`](file:///e:/mygit/myrule/rule/domain/proxy-dns-domain.yaml) | **国外/加密 DNS 域名**<br>Google DNS, Cloudflare DNS, Quad9, DNS.SB, OpenDNS, AdGuard DNS 等 | 🚀 Proxy (代理) |
| [`fake-ip-filter-domain.yaml`](file:///e:/mygit/myrule/rule/domain/fake-ip-filter-domain.yaml) | **Fake-IP 过滤域名白名单**<br>STUN、NTP、VOIP、局域网广播及特定协议等需直接返回 Real-IP 的域名 | 机制过滤 (Filter) |
| [`real-ip-filter-domain.yaml`](file:///e:/mygit/myrule/rule/domain/real-ip-filter-domain.yaml) | **Real-IP 过滤域名**<br>特定需避开 Fake-IP 机制的域名匹配规则 | 机制过滤 (Filter) |

---

### 3. 🌐 IP 规则 (`ip/`)

| 规则文件名 | 描述与涵盖服务类型 | 建议策略 |
| :--- | :--- | :--- |
| [`direct-dns-ip.yaml`](file:///e:/mygit/myrule/rule/ip/direct-dns-ip.yaml) | **国内 DNS 服务器 IP 段**<br>阿里、腾讯、百度、114 及三大运营商全国各省份 Local DNS IP | 🎯 Direct (直连) |
| [`proxy-dns-ip.yaml`](file:///e:/mygit/myrule/rule/ip/proxy-dns-ip.yaml) | **海外公共 DNS 服务器 IP 段**<br>Google, Cloudflare, Quad9, DNS.SB, OpenDNS, AdGuard 等 IP 段 | 🚀 Proxy (代理) |
| [`trackerslist-ip.yaml`](file:///e:/mygit/myrule/rule/ip/trackerslist-ip.yaml) | **BT/PT Tracker 服务器 IP 列表**<br>Tracker 节点 IP 地址集 | 🎯 Direct / 专线 |

---

## 🛠️ 配置引用示例 (Mihomo / Clash Meta)

在您的 Mihomo / Clash Meta 配置文件中添加 `rule-providers` 引用：

```yaml
rule-providers:
  hk-domain:
    type: http
    behavior: domain
    url: "https://raw.githubusercontent.com/jsbianxiang/myrule/meta/rule/domain/hk-domain.yaml"
    path: ./rules/hk-domain.yaml
    interval: 86400

  jp-domain:
    type: http
    behavior: domain
    url: "https://raw.githubusercontent.com/jsbianxiang/myrule/meta/rule/domain/jp-domain.yaml"
    path: ./rules/jp-domain.yaml
    interval: 86400

  us-domain:
    type: http
    behavior: domain
    url: "https://raw.githubusercontent.com/jsbianxiang/myrule/meta/rule/domain/us-domain.yaml"
    path: ./rules/us-domain.yaml
    interval: 86400

rules:
  - RULE-SET,hk-domain,🇭🇰 香港节点
  - RULE-SET,jp-domain,🇯🇵 日本节点
  - RULE-SET,us-domain,🇺🇸 美国节点
  - GEOIP,CN,DIRECT
  - MATCH,🐟 漏网之鱼
```

---

## 🔄 更新与维护

- **规则更新**：按需不定期更新，包含最新域名变动及风控策略避让。
- **反馈与建议**：如有失效域名或补充建议，欢迎通过提交 Issue 或 Pull Request 进行更新。


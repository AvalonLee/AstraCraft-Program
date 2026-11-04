---
record_type: entry-record
id: xiaotang-daozai
name_zh: "岛仔 Daozai 桌面信息岛"
name_en: "Daozai"
summary_zh: "Rust + egui 构建的 Windows 桌面信息岛：贴在屏幕顶部收起为一条小刘海，展开即音乐歌词、邮件验证码、日程提醒、待办、饮水专注与 AI 额度圆环，重要信息轻轻出现、不打断手头的事。"
summary_en: "A Windows desktop info island built with Rust and egui: docks at the screen top as a slim notch, expanding into music lyrics, email codes, calendar reminders, todos and AI usage rings."
category: business-office
mode: deploy
tags: [desktop-app, office, windows, productivity, email, calendar]
languages: [rust]
doc_languages: [zh]
license: MIT
homepage: https://github.com/Renly1994/xiaotang-daozai
repo: https://github.com/Renly1994/xiaotang-daozai
docs_url: https://github.com/Renly1994/xiaotang-daozai/blob/main/docs/USAGE.md
tier: standard
metrics:
  stars: 138
  pushed_at: "2026-11-03T13:33:38Z"
  checked_at: "2026-11-04"
  archived: false
aliases: ["岛仔", "Daozai", "xiaotang-daozai"]
risk_notes: "当前程序未做商业代码签名，Windows 可能提示未知发布者，安装前用 Release 附带的 SHA256SUMS.txt 核对校验值；邮箱/日历/AI 额度需提供授权码或本机登录凭据，密码存 Windows 凭据管理器，勿上传到 Issue；Windows 11 已实测，Win10、不同显卡与多显示器组合兼容性待更多反馈；钉钉/企业微信日历接入尚未完成真实账号验收；仅提供 Windows 10/11 x64 成品包。"
added_at: "2026-11-04"
updated_at: "2026-11-04"
---

# 岛仔 Daozai 桌面信息岛

> 让重要的信息轻轻出现在屏幕顶部：一条小刘海，装下桌面上的小事。上游：[Renly1994/xiaotang-daozai](https://github.com/Renly1994/xiaotang-daozai) · 许可证：MIT

## 这是什么

一个 Windows 桌面「信息岛」应用（★138，Rust + egui，不依赖 Electron）：贴在屏幕顶部，收起时是一条小刘海，鼠标靠近展开、离开收起。功能覆盖桌面伙伴（会眨眼打盹、跟音乐唱）、媒体控制与单行歌词、专注/饮水计时、文件置物架（临时收集、拖出复用）、待办提醒、多账号邮件收信与**验证码识别一键复制**、工作日历（飞书/钉钉/企业微信 CalDAV）与邮件日程合并、AI 额度圆环（Codex / Claude / Kimi / Grok Bot / Gemini 多账号）、电源音量等系统状态。数据留在本机（`%APPDATA%\Daozai`），密码走 Windows 凭据管理器。

## 怎么部署运行

前置：Windows 10/11 x64，支持 OpenGL 的显卡驱动。到 [Releases 最新版](https://github.com/Renly1994/xiaotang-daozai/releases/latest) 下载安装版（如 `Daozai-Setup-v0.6.49-x64.exe`）后先校验再安装：

```powershell
Get-FileHash -Algorithm SHA256 .\Daozai-Setup-v0.6.49-x64.exe   # 与发布页 SHA256SUMS.txt 比对
.\Daozai-Setup-v0.6.49-x64.exe
```

安装时可选桌面快捷方式与开机自启；免安装版下载 zip 解压运行 `daozai.exe` 即可。装好后从托盘菜单打开设置，按需启用各功能模块；应用内「设置 → 关于 → 检查更新」可原地升级，设置与记录保留。

## 怎么用

装完启动后它常驻屏幕顶部：靠近展开、离开收起。邮件在设置里加 IMAP 账号（用服务商授权码/App 专用密码），收到验证码邮件会在岛上提示、点击即复制；日历接工作平台的 CalDAV 独立账号后与邮件日程合并显示；AI 额度选择要常驻的服务和配色即可看圆环。完整说明见[使用指南](https://github.com/Renly1994/xiaotang-daozai/blob/main/docs/USAGE.md)。

## 注意事项

- **签名与校验**：未做商业代码签名，Windows 会提示未知发布者——务必用 `Get-FileHash` 与发布页 `SHA256SUMS.txt` 核对后再运行。
- **凭据安全**：邮箱、日历、AI 额度均需授权码或本机登录引用；密码存 Windows 凭据管理器、Gemini 会话经 DPAPI 加密，但任何凭据都不要贴进 Issue。
- **兼容与成熟度**：Windows 11 本机实测，Win10 / 多显示器 / 不同显卡待更多反馈；钉钉、企业微信日历已验证接入代码但未完成真实账号同步验收，QQ 收信、邮件日程与飞书个人日历已实测；暂无 macOS / Linux / ARM64 包。
- **协议清晰**：MIT，可商用；开启联网功能后会访问邮箱、日历与歌词服务，不是完全离线软件。

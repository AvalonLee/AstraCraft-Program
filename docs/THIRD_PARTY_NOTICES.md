# 第三方内容声明

本文件汇总 SkillMall 收录的全部第三方内容及其著作权归属与许可证信息。

**本仓库对这些内容不主张任何权利。** 所有 vendored 代码与文档的著作权归各自
原作者所有，各条目 `src/` 目录内保留了上游原始的 LICENSE 文件，其条款优先于
本仓库根目录的任何许可声明。

本仓库自身的原创内容（分类体系、评测笔记、脚本）另行授权，见
[LICENSE](LICENSE)（文档，CC BY 4.0）与 [LICENSE-CODE](LICENSE-CODE)（代码，MIT）。

---

## 下架请求通道

如果你是某项内容的著作权人，希望本仓库移除相关收录：

- 开 Issue：https://github.com/AvalonLee/SkillMall/issues
- 或发邮件至：avalonli@qq.com

**承诺 7 日内处理，无需提供任何法律文书**，一句话说明身份和诉求即可。
我们会删除相关内容并在 CHANGELOG 中记录。

---

## 📦 已收录源码的条目（vendored）

以下条目的源码副本存放在本仓库中，均为绿灯（A 级）或黄灯（B 级）协议。

### superpowers

| 项目 | 内容 |
|---|---|
| **上游地址** | https://github.com/obra/superpowers |
| **著作权人** | Jesse Vincent |
| **许可证** | MIT（SPDX: `MIT`） |
| **协议分级** | 🟢 A |
| **本仓库路径** | `entries/meta-skillcraft/superpowers/src/` |
| **许可证文件** | `entries/meta-skillcraft/superpowers/src/LICENSE` |
| **本地修改** | 无（零修改 vendoring） |

---

### tencentdb-agent-memory

| 项目 | 内容 |
|---|---|
| **上游地址** | https://github.com/TencentCloud/TencentDB-Agent-Memory |
| **著作权人** | Tencent |
| **许可证** | MIT（SPDX: `MIT`） |
| **协议分级** | 🟢 A |
| **本仓库路径** | `entries/agent-infra/tencentdb-agent-memory/src/` |
| **许可证文件** | `entries/agent-infra/tencentdb-agent-memory/src/LICENSE` |
| **本地修改** | 无（零修改 vendoring；9 个超大资源按体积策略剔除，见 `src/assets/FETCH.md`） |

---

## 🔗 仅链接存根的条目（link-only）

以下条目**未包含任何上游源码**，本仓库仅提供导航、说明与评测。
原因通常是：协议禁止再分发、协议不明、或上游为 source-available 而非开源。

### agent-skills-spec

| 项目 | 内容 |
|---|---|
| **上游地址** | https://agentskills.io/specification（仓库目录：https://github.com/anthropics/skills 的 `spec/`） |
| **著作权人** | Anthropic PBC（规范维护方） |
| **许可证** | CC-BY-4.0（SPDX: `CC-BY-4.0`） |
| **协议分级** | 🟢 A |
| **本仓库收录形式** | 🔗 link-only（刻意不冻结副本，始终指向官方实时规范） |
| **不收录源码的原因** | 规范是「活的标准」，冻结副本可能误导读者使用过时版本；CC-BY-4.0 虽允许再分发，本仓库仍选择链接到权威最新版 |
| **本仓库包含的内容** | 仅本仓库原创的中文导读、字段速查表（`docs/skill-spec-cheatsheet.md`）与使用建议 |

### anthropics-office-skills

| 项目 | 内容 |
|---|---|
| **上游地址** | https://github.com/anthropics/skills |
| **著作权人** | Anthropic PBC |
| **许可证** | Anthropic 自定义 source-available 许可（SPDX: `LicenseRef-Anthropic-Source-Available`） |
| **协议分级** | 🔴 C |
| **不收录源码的原因** | 上游 README 明示 `docx`/`pdf`/`pptx`/`xlsx` 四个技能为 "source-available, not open source"，**禁止再分发** |
| **本仓库包含的内容** | 仅本仓库原创的中文说明、获取方式与评测笔记 |

> 注：`anthropics/skills` 仓库中的**其他**技能多为 Apache-2.0，属可收录范围。
> 本条目仅针对上述四个不可转载的 Office 技能。

---

## 维护说明

本文件的条目清单可由 `scripts/gen_index.py` 从各条目的 `meta.yml`
（`copyright_holder` / `license` / `license_tier` / `repo` / `vendoring` 字段）
辅助生成，但**每条的措辞需人工复核后定稿**——许可证声明不适合完全自动化。

新增条目时必须同步更新本文件，`validate.py` 会检查是否存在遗漏。

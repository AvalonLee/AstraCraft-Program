<!--
提交前请确认已在本地产出并通过校验：
  python -m pip install -r scripts/requirements.txt
  python scripts/validate.py
  python scripts/gen_index.py        # 会重新生成 INDEX.md，请一并提交
-->

## 变更类型

- [ ] 新增条目（📦 vendored / 🔗 link-only）
- [ ] 更新条目（上游同步 / 协议重判 / 评级变化）
- [ ] 移除条目
- [ ] 结构 / 文档 / 脚本 / CI 变更

## 改动说明

<!-- 这个 PR 做了什么、为什么 -->

## 收录条目自查（如适用）

- [ ] 已从 `_template/` 复制脚手架并填好 `meta.yml`
- [ ] 绿灯项目用 `scripts/vendor.py` 拉取快照，并在根 `.gitignore` 添加 `!.../src/` 白名单
- [ ] 红灯项目只写了 `GET-IT.md`，**未**把源码拷进仓库
- [ ] 已写中文 `README.zh-CN.md`；`core` 级条目还写了真实 `NOTES.zh-CN.md`
- [ ] 已在 `docs/THIRD_PARTY_NOTICES.md` 补归属登记
- [ ] 已跑 `python scripts/validate.py && python scripts/gen_index.py` 并提交 `INDEX.md`

## 协议与合规

- [ ] 协议分级（A/B/C）填写准确，与 `LICENSE` 全文一致
- [ ] 不存在「红灯条目却含 `src/`」的情况

## 关联

<!-- 关联的 Issue 编号，如 Closes #12 -->

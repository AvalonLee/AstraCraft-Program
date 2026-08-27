<!--
提交前请确认已在本地产出并通过校验：
  python -m pip install -r scripts/requirements.txt
  python scripts/validate.py
  python scripts/gen_index.py        # 会重新生成 INDEX.md，请一并提交
-->

## 变更类型

- [ ] 新增条目（SKILL.md）
- [ ] 更新条目（内容 / 评级 / 链接）
- [ ] 移除条目
- [ ] 结构 / 文档 / 脚本 / CI 变更

## 改动说明

<!-- 这个 PR 做了什么、为什么 -->

## 收录条目自查（如适用）

- [ ] 已从 [目录条目格式规范](docs/catalog-format.md) 复制并填好 frontmatter（id 等于目录名，category 等于一级目录名）
- [ ] 正文含「怎么安装」小节，指令在代码块内、Agent 可执行
- [ ] 未搬运上游源码，仅给链接与安装指令
- [ ] 已跑 `python scripts/validate.py && python scripts/gen_index.py` 并提交 `INDEX.md`

## 关联

<!-- 关联的 Issue 编号，如 Closes #12 -->

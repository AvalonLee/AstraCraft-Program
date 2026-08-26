#!/usr/bin/env python3
"""SkillMall 条目校验。

检查项：
  1. SKILL.md 的 YAML frontmatter 符合 JSON Schema
  2. id / category 与目录结构一致
  3. SKILL.md 正文包含「怎么安装」指令（给 Agent 用的核心内容）
  4. 分类目录存在
  5. 去重（id / aliases）
  6. 已移除条目不得重复收录

用法：
    python scripts/validate.py
    python scripts/validate.py --quiet    只输出错误
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from _common import (  # noqa: E402
    CATEGORIES,
    CHANGELOG_PATH,
    ENTRY_FILE,
    REPO_ROOT,
    SCHEMA_PATH,
    TAG_CAP,
    Entry,
    Reporter,
    discover_entries,
    load_tag_vocab,
    normalize_tags,
)

try:
    from jsonschema import Draft7Validator  # noqa: E402
except ImportError:  # pragma: no cover
    sys.stderr.write(
        "缺少依赖 jsonschema。请执行：pip install -r scripts/requirements.txt\n"
    )
    raise SystemExit(2)

# 「怎么安装」小节的可用标题（正文里至少命中其一，且要带一个代码块）
INSTALL_HEADINGS = ("## 怎么安装", "## 安装", "## 如何安装")


def check_schema(entry: Entry, validator: Draft7Validator, rep: Reporter) -> None:
    for error in sorted(validator.iter_errors(entry.meta), key=lambda e: list(e.path)):
        location = ".".join(str(p) for p in error.path) or "(根)"
        rep.error(entry.rel_path, f"frontmatter 字段 {location}：{error.message}")


def check_identity(entry: Entry, rep: Reporter) -> None:
    """id 必须等于目录名，category 必须等于所在一级目录名。"""
    if entry.id and entry.id != entry.dir_name:
        rep.error(
            entry.rel_path,
            f"id 与目录名不一致：id={entry.id!r} 目录={entry.dir_name!r}",
        )
    category = entry.meta.get("category")
    if category and category != entry.category_dir:
        rep.error(
            entry.rel_path,
            f"category 与所在目录不一致：category={category!r} 目录={entry.category_dir!r}",
        )


def check_skill_doc(entry: Entry, rep: Reporter) -> None:
    """SKILL.md 必须存在，且正文包含「怎么安装」指令与代码块。"""
    if not entry.skill_file.exists():
        rep.error(entry.rel_path, f"缺少入口文件 {ENTRY_FILE}")
        return
    text = entry.skill_file.read_text(encoding="utf-8")
    body = text.split("\n---", 1)[-1]  # 去掉 frontmatter
    if not any(h in body for h in INSTALL_HEADINGS):
        rep.error(
            entry.rel_path,
            f"{ENTRY_FILE} 正文缺少安装指令小节（需包含 {INSTALL_HEADINGS[0]}），"
            "这是给 Agent 定位并安装的关键内容。",
        )
    elif "```" not in body:
        rep.error(
            entry.rel_path,
            f"{ENTRY_FILE} 的安装指令应包含一个可执行的代码块（``` 包裹）。",
        )


def check_categories_exist(rep: Reporter) -> None:
    for category in CATEGORIES:
        if not (REPO_ROOT / "entries" / category).is_dir():
            rep.error("全局", f"缺少分类目录：entries/{category}/")


def check_tags(entry: Entry, vocab: dict, rep: Reporter) -> None:
    """标签治理检查（Phase 2）：

    1. 别名归并使用告警：源文件若直接写了别名（如 `claude`/`agent`），
       提示改用规范形态（claude-code / ai-agent），保持词表统一。
    2. 标签数上限告警：规范后标签数 > TAG_CAP(8) 时提示精简。
    3. 受控主标签复用建议：若没有任何标签命中白名单 primary，
       提示从白名单挑选可复用的标签，避免发明一次性同义词。
    """
    raw = entry.meta.get("tags") or []
    normalized, merged = normalize_tags(raw)

    for original, canonical in merged.items():
        rep.warn(
            entry.rel_path,
            f"标签 `{original}` 是 `{canonical}` 的别名，建议源文件直接写规范形态 `{canonical}`"
            "（避免同义词分裂筛选）。",
        )

    if len(normalized) > vocab.get("cap", TAG_CAP):
        rep.warn(
            entry.rel_path,
            f"标签数 {len(normalized)} 超过上限 {vocab.get('cap', TAG_CAP)}，"
            "请精简为最有代表性的标签（强制挑最有代表性的）。",
        )

    primary = vocab.get("primary") or set()
    if primary and not any(t in primary for t in normalized):
        rep.warn(
            entry.rel_path,
            "未使用任何受控主标签（白名单），建议优先复用既有标签以打通筛选；"
            "确需新概念时请先将其加入 scripts/schema/tag_vocabulary.json 的 primary。",
        )


def check_duplicates(entries: list[Entry], rep: Reporter) -> None:
    """id 与 aliases 全局唯一。"""
    seen: dict[str, str] = {}
    for entry in entries:
        names = [entry.id] + list(entry.meta.get("aliases") or [])
        for name in names:
            if not name:
                continue
            if name in seen and seen[name] != entry.rel_path:
                rep.error(
                    entry.rel_path,
                    f"标识 {name!r} 与 {seen[name]} 冲突（id 与 aliases 需全局唯一）",
                )
            else:
                seen[name] = entry.rel_path


def check_removed(entries: list[Entry], rep: Reporter) -> None:
    """已移除的项目不应被重复收录。"""
    if not CHANGELOG_PATH.exists():
        return
    content = CHANGELOG_PATH.read_text(encoding="utf-8")
    marker = "## 已移除条目存档"
    if marker not in content:
        return
    for entry in entries:
        repo = entry.meta.get("repo")
        if repo and repo in content:
            rep.error(
                entry.rel_path,
                f"该上游 {repo} 出现在 CHANGELOG 的已移除名单中，不应重复收录。"
                "若确认要恢复，请先从存档中删除对应记录并说明原因。",
            )


def main() -> int:
    parser = argparse.ArgumentParser(description="校验 SkillMall 条目")
    parser.add_argument(
        "--quiet", action="store_true", help="只输出错误，不打印条目清单"
    )
    args = parser.parse_args()

    rep = Reporter("校验")
    check_categories_exist(rep)

    schema = json.loads(SCHEMA_PATH.read_text(encoding="utf-8"))
    validator = Draft7Validator(schema)
    vocab = load_tag_vocab()

    entries = discover_entries()
    if not args.quiet:
        print(f"发现 {len(entries)} 个条目")
    for entry in entries:
        if not args.quiet:
            print(f"  {entry.rel_path}")
        check_schema(entry, validator, rep)
        check_identity(entry, rep)
        check_skill_doc(entry, rep)
        check_tags(entry, vocab, rep)

    check_duplicates(entries, rep)
    check_removed(entries, rep)
    return rep.finish()


if __name__ == "__main__":
    raise SystemExit(main())

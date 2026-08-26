#!/usr/bin/env python3
"""收录时标签提示工具（Phase 2 标签治理）。

输入一组草稿标签（或直接给条目 id），输出：
  1. 归一化结果（小写 / trim / 别名归并 / 去重，与生成脚本逻辑一致）
  2. 检测到的别名（应改为规范形态）
  3. 与既有条目的复用建议（命中受控主标签 / 已有标签优先复用）
  4. 是否超过数量上限 cap

用法：
    python scripts/suggest_tags.py "claude, agent, memory, vector-search"
    python scripts/suggest_tags.py --id tencentdb-agent-memory
    python scripts/suggest_tags.py claude agent memory vector-search
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from _common import (  # noqa: E402
    discover_entries,
    load_tag_vocab,
    normalize_tags,
)


def collect_existing_tags() -> dict[str, int]:
    """统计所有条目中已存在的标签频次，用于「优先复用既有标签」建议。"""
    counts: dict[str, int] = {}
    for entry in discover_entries():
        for tag in normalize_tags(entry.meta.get("tags"))[0]:
            counts[tag] = counts.get(tag, 0) + 1
    return counts


def suggest(draft: list[str], vocab: dict, existing: dict[str, int]) -> int:
    normalized, merged = normalize_tags(draft)
    cap = vocab.get("cap", 8)
    primary = vocab.get("primary") or set()

    print("草稿标签 :", draft)
    print("-" * 60)

    if merged:
        print("检测到别名（建议改为规范形态）：")
        for alias, canon in merged.items():
            print(f"    {alias!r}  ->  {canon!r}")
    else:
        print("别名检测   : 无")

    print(f"归一化结果 : {normalized}")
    print(f"标签数     : {len(normalized)} / 上限 {cap}")

    if len(normalized) > cap:
        over = len(normalized) - cap
        print(f"  ⚠ 超过上限 {over} 个，请精简为最有代表性的标签。")

    # 受控主标签命中
    hit_primary = [t for t in normalized if t in primary]
    if primary:
        if hit_primary:
            print(f"受控主标签命中 : {hit_primary}")
        else:
            print("  ⚠ 未命中任何受控主标签，建议优先从白名单复用。")

    # 复用建议：归一化结果与既有标签的交集（除自身外）
    reused = [t for t in normalized if existing.get(t)]
    if reused:
        print("可复用既有标签（已被 N 个条目使用）：")
        for t in reused:
            print(f"    {t!r}  ({existing[t]} 个条目已用)")

    # 新标签提示：不在既有词表与白名单中的
    novel = [t for t in normalized if not existing.get(t) and t not in primary]
    if novel:
        print("新标签（建议确认是否需加入白名单 primary）：")
        for t in novel:
            print(f"    {t!r}")

    print("-" * 60)
    return 1 if len(normalized) > cap else 0


def main() -> int:
    parser = argparse.ArgumentParser(description="收录时标签提示工具")
    parser.add_argument(
        "tags",
        nargs="*",
        help="草稿标签列表（逗号或空格分隔）；也可与 --id 二选一",
    )
    parser.add_argument(
        "--id",
        dest="entry_id",
        default=None,
        help="直接读取某条目的现有 tags 做诊断",
    )
    args = parser.parse_args()

    vocab = load_tag_vocab()
    existing = collect_existing_tags()

    if args.entry_id:
        target = None
        for entry in discover_entries():
            if entry.id == args.entry_id:
                target = entry
                break
        if not target:
            print(f"未找到条目：{args.entry_id}", file=sys.stderr)
            return 2
        draft = target.meta.get("tags") or []
        print(f"诊断条目：{args.entry_id}")
        return suggest(draft, vocab, existing)

    if not args.tags:
        parser.print_help()
        return 0

    raw = []
    for piece in args.tags:
        raw.extend([t.strip() for t in piece.split(",") if t.strip()])
    return suggest(raw, vocab, existing)


if __name__ == "__main__":
    raise SystemExit(main())

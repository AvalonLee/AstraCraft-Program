#!/usr/bin/env python3
"""从各条目 SKILL.md 的 frontmatter 聚合生成 INDEX.md。

生成六个视图：
  1. 全量总表
  2. 按分类分组
  3. 按标签倒排
  4. 按语言
  5. 按协议
  6. 按 star 排序 + 最近更新

用法：
    python scripts/gen_index.py            重新生成 INDEX.md
    python scripts/gen_index.py --check    只校验不写盘，与磁盘不一致则退出码 1
"""

from __future__ import annotations

import argparse
import sys
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from _common import (  # noqa: E402
    CATEGORIES,
    ENTRY_FILE,
    INDEX_PATH,
    KIND_LABELS,
    TIER_LABELS,
    Entry,
    discover_entries,
    normalize_tags,
)

HEADER = """<!--
  ⚠️ 本文件由 scripts/gen_index.py 自动生成，请勿手动编辑。

  修改条目信息请编辑对应的 entries/<分类>/<id>/SKILL.md（frontmatter），然后执行：
      python scripts/gen_index.py

  CI 会重新渲染并与本文件比对，不一致将导致构建失败。
-->

# 索引

AstraCraft Program（天工计划）全部收录条目的交叉检索表。六个视图对应六种找东西的方式：
知道大概用途就看[分类](#二按分类)，有明确关键词就看[标签](#三按标签)，
关心技术栈就看[语言](#四按语言)，在意合规就看[协议](#五按协议)。

图例：★ 主推 · ⚠️ 有风险备注

> 每个条目只有一个 `SKILL.md`（介绍 + 安装指令）。Agent 点链接读取该文件，
> 即可快速定位并安装对应的 skill 项目；本仓库**不收录上游源码快照**。
"""


def esc(text: object) -> str:
    """转义 Markdown 表格里的管道符。"""
    return str(text if text is not None else "").replace("|", "\\|").replace("\n", " ")


def link(entry: Entry) -> str:
    return f"[{esc(entry.meta.get('name_zh'))}]({entry.rel_path}/{ENTRY_FILE})"


def badges(entry: Entry) -> str:
    marks = []
    if entry.tier == "core":
        marks.append("★")
    if entry.has_risk:
        marks.append("⚠️")
    return " ".join(marks)


def license_cell(entry: Entry) -> str:
    return esc(entry.meta.get("license"))


def view_all(entries: list[Entry]) -> list[str]:
    lines = [
        "## 一、全量总表",
        "",
        f"共 {len(entries)} 个条目，按分类与名称排序。",
        "",
        "| | 名称 | 分类 | 类型 | 协议 | 评级 | 简介 |",
        "|---|---|---|---|---|---|---|",
    ]
    for entry in entries:
        category_zh = CATEGORIES.get(entry.meta.get("category", ""), ("?", ""))[0]
        lines.append(
            "| {marks} | {name} | {cat} | {kind} | {lic} | {tier} | {summary} |".format(
                marks=badges(entry),
                name=link(entry),
                cat=category_zh,
                kind=KIND_LABELS.get(entry.meta.get("kind", ""), "?"),
                lic=license_cell(entry),
                tier=TIER_LABELS.get(entry.tier, "?"),
                summary=esc(entry.meta.get("summary_zh")),
            )
        )
    return lines


def view_by_category(entries: list[Entry]) -> list[str]:
    lines = ["## 二、按分类", ""]
    grouped: dict[str, list[Entry]] = defaultdict(list)
    for entry in entries:
        grouped[str(entry.meta.get("category"))].append(entry)

    lines.append("| 分类 | 定位 | 条目数 |")
    lines.append("|---|---|---|")
    for category, (name_zh, desc) in CATEGORIES.items():
        count = len(grouped.get(category, []))
        anchor = f"#{name_zh}"
        label = f"[{name_zh}]({anchor})" if count else name_zh
        lines.append(f"| {label} | {desc} | {count} |")
    lines.append("")

    for category, (name_zh, desc) in CATEGORIES.items():
        bucket = grouped.get(category, [])
        if not bucket:
            continue
        lines += [
            f"### {name_zh}",
            "",
            f"`entries/{category}/` —— {desc}",
            "",
            "| | 名称 | 类型 | 协议 | 简介 |",
            "|---|---|---|---|---|",
        ]
        for entry in bucket:
            lines.append(
                "| {marks} | {name} | {kind} | {lic} | {summary} |".format(
                    marks=badges(entry),
                    name=link(entry),
                    kind=KIND_LABELS.get(entry.meta.get("kind", ""), "?"),
                    lic=license_cell(entry),
                    summary=esc(entry.meta.get("summary_zh")),
                )
            )
        lines.append("")
    return lines


def view_by_tag(entries: list[Entry]) -> list[str]:
    grouped: dict[str, list[Entry]] = defaultdict(list)
    for entry in entries:
        for tag in normalize_tags(entry.meta.get("tags"))[0]:
            grouped[str(tag)].append(entry)

    lines = [
        "## 三、按标签",
        "",
        f"共 {len(grouped)} 个标签。标签是分类之外的交叉维度——一个条目只能属于一个分类，"
        "但可以有多个标签。",
        "",
        "| 标签 | 条目 |",
        "|---|---|",
    ]
    for tag in sorted(grouped):
        items = " · ".join(link(e) for e in grouped[tag])
        lines.append(f"| `{esc(tag)}` | {items} |")
    return lines


def view_by_language(entries: list[Entry]) -> list[str]:
    grouped: dict[str, list[Entry]] = defaultdict(list)
    for entry in entries:
        for lang in entry.meta.get("languages") or []:
            grouped[str(lang)].append(entry)

    lines = [
        "## 四、按语言",
        "",
        "实现语言。纯文档/提示词类条目标记为 `markdown`。",
        "",
        "| 语言 | 条目 |",
        "|---|---|",
    ]
    for lang in sorted(grouped):
        items = " · ".join(link(e) for e in grouped[lang])
        lines.append(f"| `{esc(lang)}` | {items} |")
    return lines


def view_by_license(entries: list[Entry]) -> list[str]:
    grouped: dict[str, list[Entry]] = defaultdict(list)
    for entry in entries:
        grouped[str(entry.meta.get("license"))].append(entry)

    lines = [
        "## 五、按协议",
        "",
        "协议仅作为判断能否商用的参考（本仓库不转载源码，因此不承担再分发义务）。",
        "",
        "| 协议 | 条目数 | 条目 |",
        "|---|---|---|",
    ]
    for license_id in sorted(grouped):
        bucket = grouped[license_id]
        items = " · ".join(link(e) for e in bucket)
        lines.append(f"| `{esc(license_id)}` | {len(bucket)} | {items} |")
    return lines


def view_ranked(entries: list[Entry]) -> list[str]:
    lines = [
        "## 六、排行",
        "",
        "star 数不参与收录判断，仅作为排序维度。`—` 表示尚未采集。",
        "",
        "### 按 star",
        "",
        "| # | 条目 | star | 最近提交 |",
        "|---|---|---|---|",
    ]
    by_stars = sorted(entries, key=lambda e: (-e.stars(), e.id))[:30]
    for i, entry in enumerate(by_stars, 1):
        stars = entry.stars()
        metrics = entry.meta.get("metrics") or {}
        lines.append(
            f"| {i} | {link(entry)} | {stars if stars >= 0 else '—'} "
            f"| {esc(metrics.get('pushed_at') or '—')} |"
        )

    lines += [
        "",
        "### 最近加入",
        "",
        "| 条目 | 加入日期 | 最后更新 |",
        "|---|---|---|",
    ]
    by_added = sorted(entries, key=lambda e: str(e.meta.get("added_at")), reverse=True)[:20]
    for entry in by_added:
        lines.append(
            f"| {link(entry)} | {esc(entry.meta.get('added_at'))} "
            f"| {esc(entry.meta.get('updated_at'))} |"
        )
    return lines


def render(entries: list[Entry]) -> str:
    entries = sorted(
        entries, key=lambda e: (str(e.meta.get("category")), str(e.meta.get("id")))
    )
    blocks: list[str] = [HEADER.rstrip()]
    for view in (
        view_all,
        view_by_category,
        view_by_tag,
        view_by_language,
        view_by_license,
        view_ranked,
    ):
        blocks.append("\n".join(view(entries)).rstrip())

    stamp = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    blocks.append(
        "---\n\n"
        f"由 `scripts/gen_index.py` 生成 · 最后更新 {stamp} · "
        f"共 {len(entries)} 个条目"
    )
    return "\n\n---\n\n".join(blocks) + "\n"


def main() -> int:
    parser = argparse.ArgumentParser(description="生成 INDEX.md")
    parser.add_argument(
        "--check",
        action="store_true",
        help="只校验不写盘；INDEX.md 与重新渲染的结果不一致时退出码 1",
    )
    args = parser.parse_args()

    entries = discover_entries()
    rendered = render(entries)

    if args.check:
        if not INDEX_PATH.exists():
            print("x INDEX.md 不存在。请执行：python scripts/gen_index.py")
            return 1
        current = INDEX_PATH.read_text(encoding="utf-8")
        if _strip_stamp(current) != _strip_stamp(rendered):
            print(
                "x INDEX.md 与 SKILL.md 的 frontmatter 已脱节。\n"
                "  请执行 python scripts/gen_index.py 重新生成，并把结果一并提交。"
            )
            return 1
        print(f"√ INDEX.md 与 {len(entries)} 个条目的元数据一致")
        return 0

    INDEX_PATH.write_text(rendered, encoding="utf-8", newline="\n")
    print(f"√ 已生成 INDEX.md（{len(entries)} 个条目）")
    return 0


def _strip_stamp(text: str) -> str:
    return "\n".join(
        line for line in text.splitlines() if "最后更新" not in line
    ).strip()


if __name__ == "__main__":
    raise SystemExit(main())

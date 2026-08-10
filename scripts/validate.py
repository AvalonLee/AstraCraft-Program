#!/usr/bin/env python3
"""SkillMall 元数据校验。

检查项：
  1. meta.yml 符合 JSON Schema
  2. id / category 与目录结构一致
  3. 协议红线 —— 红灯条目不得包含源码（法律底线，最重要的一条）
  4. vendoring 模式与路径、许可证文件的一致性
  5. 去重三规则
  6. 条目必备文件齐全
  7. core 级条目必须有真实的实测笔记
  8. THIRD_PARTY_NOTICES 归属登记完整
  9. 已移除条目不得重复收录
 10. 破例配额（告警）

用法：
    python scripts/validate.py
    python scripts/validate.py --quiet    只输出错误
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from _common import (  # noqa: E402
    CATEGORIES,
    CHANGELOG_PATH,
    EXCEPTION_QUOTA,
    LICENSE_TIER_A,
    LICENSE_TIER_B,
    LICENSE_TIER_C_KNOWN,
    NOTICES_PATH,
    REPO_ROOT,
    REQUIRED_ENTRY_FILES,
    SCHEMA_PATH,
    Entry,
    Reporter,
    compute_content_hash,
    discover_entries,
    is_template_unchanged,
)

try:
    from jsonschema import Draft7Validator  # noqa: E402
except ImportError:  # pragma: no cover
    sys.stderr.write(
        "缺少依赖 jsonschema。请执行：pip install -r scripts/requirements.txt\n"
    )
    raise SystemExit(2)


MAX_ENTRY_BYTES = 20 * 1024 * 1024
MAX_FILE_BYTES = 5 * 1024 * 1024


def check_schema(entry: Entry, validator: Draft7Validator, rep: Reporter) -> None:
    for error in sorted(validator.iter_errors(entry.meta), key=lambda e: list(e.path)):
        location = ".".join(str(p) for p in error.path) or "(根)"
        rep.error(entry.rel_path, f"meta.yml 字段 {location}：{error.message}")


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


def check_license_redline(entry: Entry, rep: Reporter) -> None:
    """协议红线。这是全仓最重要的检查，任何一条不过都必须拦下 PR。"""
    tier = entry.meta.get("license_tier")
    license_id = str(entry.meta.get("license", "")).strip()
    mode = entry.meta.get("vendoring", {}).get("mode")
    src = entry.src_dir

    # 红线一：红灯条目绝不能包含源码
    if tier == "C" and src.exists():
        rep.error(
            entry.rel_path,
            "🔴 协议红线：license_tier 为 C 的条目下存在 src/ 目录。"
            "该协议禁止再分发，必须删除源码并改为 link-only 存根。",
        )
    if tier == "C" and mode != "link-only":
        rep.error(
            entry.rel_path,
            f"🔴 协议红线：license_tier=C 必须搭配 vendoring.mode=link-only，当前为 {mode!r}",
        )
    if tier in {"A", "B"} and mode != "full":
        rep.warn(
            entry.rel_path,
            f"license_tier={tier} 允许 vendoring，但 mode={mode!r}。"
            "若为主动选择请忽略此告警。",
        )

    # 红线二：SPDX 标识符必须与声明的分级匹配
    if license_id:
        if tier == "A" and license_id not in LICENSE_TIER_A:
            rep.error(
                entry.rel_path,
                f"license={license_id!r} 不在 A 级白名单内。"
                f"A 级仅限：{', '.join(sorted(LICENSE_TIER_A))}",
            )
        elif tier == "B" and license_id not in LICENSE_TIER_B:
            rep.error(
                entry.rel_path,
                f"license={license_id!r} 不在 B 级白名单内。"
                f"B 级仅限：{', '.join(sorted(LICENSE_TIER_B))}",
            )
        elif tier == "C":
            known = license_id in LICENSE_TIER_C_KNOWN
            custom = license_id.startswith("LicenseRef-")
            if not known and not custom:
                rep.warn(
                    entry.rel_path,
                    f"license={license_id!r} 未出现在已知红灯清单中。"
                    "若为自定义协议，建议改写为 LicenseRef-xxx 形式以便识别。",
                )
        # A/B 级白名单之外的协议若被标成 A/B，上面已报错；
        # 反过来，A/B 名单内的协议被标成 C 是允许的（保守处理）。


def check_vendoring(entry: Entry, rep: Reporter) -> None:
    vendoring = entry.meta.get("vendoring", {})
    mode = vendoring.get("mode")
    path_value = vendoring.get("path")
    src = entry.src_dir

    if mode == "full":
        if not path_value:
            rep.error(entry.rel_path, "vendoring.mode=full 时必须填写 vendoring.path")
        else:
            target = entry.path / str(path_value).rstrip("/")
            if not target.is_dir():
                rep.error(
                    entry.rel_path,
                    f"vendoring.path 指向的目录不存在：{path_value}。"
                    "是否忘了在根 .gitignore 添加白名单例外，或忘了跑 vendor.py？",
                )

        license_file = entry.meta.get("license_file")
        if not license_file:
            rep.error(
                entry.rel_path,
                "vendored 条目必须填写 license_file，指向上游原始的 LICENSE 文件",
            )
        elif not (entry.path / str(license_file)).exists():
            rep.error(
                entry.rel_path,
                f"license_file 指向的文件不存在：{license_file}。"
                "vendoring 必须原样保留上游 LICENSE。",
            )

        # 零修改校验
        if src.is_dir():
            recorded = entry.lock.get("content_hash")
            if recorded:
                actual = compute_content_hash(src)
                if actual != recorded:
                    rep.error(
                        entry.rel_path,
                        "src/ 内容与 upstream.lock 的 content_hash 不符。"
                        "vendoring 必须零修改——请勿编辑上游文件，"
                        "补充说明写进 NOTES.zh-CN.md。",
                    )
            else:
                rep.warn(
                    entry.rel_path,
                    "upstream.lock 缺少 content_hash，无法校验零修改。"
                    "建议用 scripts/vendor.py 重新生成。",
                )
            _check_size(entry, rep)

        if entry.lock.get("local_patches"):
            rep.error(
                entry.rel_path,
                "upstream.lock 的 local_patches 非空。本仓库采用零修改 vendoring，"
                "任何改动都会触发 Apache-2.0 的改动标注义务。",
            )

    elif mode == "link-only":
        if path_value:
            rep.error(entry.rel_path, "link-only 条目不应填写 vendoring.path")
        if not (entry.path / "GET-IT.md").exists():
            rep.error(
                entry.rel_path,
                "link-only 存根缺少 GET-IT.md（须说明不可转载原因与本地补齐方式）",
            )


def _check_size(entry: Entry, rep: Reporter) -> None:
    total = 0
    for file_path in entry.src_dir.rglob("*"):
        if not file_path.is_file():
            continue
        size = file_path.stat().st_size
        total += size
        if size > MAX_FILE_BYTES:
            rep.error(
                entry.rel_path,
                f"单文件超过 5 MB 限制：{file_path.relative_to(entry.path).as_posix()} "
                f"({size / 1024 / 1024:.1f} MB)。请改用 assets/FETCH.md 记录下载地址。",
            )
    if total > MAX_ENTRY_BYTES:
        rep.error(
            entry.rel_path,
            f"条目 src/ 总体积 {total / 1024 / 1024:.1f} MB 超过 20 MB 限制",
        )


def check_files(entry: Entry, rep: Reporter) -> None:
    for filename in REQUIRED_ENTRY_FILES:
        if not (entry.path / filename).exists():
            rep.error(entry.rel_path, f"缺少必备文件：{filename}")

    if entry.is_vendored and (entry.path / "GET-IT.md").exists():
        rep.warn(
            entry.rel_path,
            "vendored 条目不需要 GET-IT.md（源码已在仓库内），建议删除",
        )


def check_notes(entry: Entry, rep: Reporter) -> None:
    """core 级条目必须有真实的实测笔记。"""
    tier = entry.meta.get("admission", {}).get("tier")
    notes_path = entry.path / "NOTES.zh-CN.md"
    if tier != "core" or not notes_path.exists():
        return
    if is_template_unchanged(notes_path, "NOTES.zh-CN.md"):
        rep.error(
            entry.rel_path,
            "admission.tier=core 但 NOTES.zh-CN.md 仍是模板原文。"
            "实测笔记是本仓库区别于书签列表的核心资产，必须写。",
        )
        return
    body = re.sub(r"<!--.*?-->", "", notes_path.read_text(encoding="utf-8"), flags=re.S)
    body = re.sub(r"^\s*[#|>\-*\s]+$", "", body, flags=re.M)
    if len(body.strip()) < 200:
        rep.error(
            entry.rel_path,
            f"admission.tier=core 但实测笔记正文过短（约 {len(body.strip())} 字符，"
            "要求 ≥200）。请补充实际使用中的发现。",
        )


def check_admission(entry: Entry, rep: Reporter) -> None:
    admission = entry.meta.get("admission", {})
    checked = set(admission.get("checked") or [])
    exception = admission.get("exception")

    # H1/H2/H3 不可破例
    for hard in ("H1", "H2", "H3"):
        if hard not in checked:
            rep.error(
                entry.rel_path,
                f"硬门槛 {hard} 未通过。H1/H2/H3 是法律与可用性底线，不可破例。",
            )

    if "H4" not in checked and not exception:
        rep.error(
            entry.rel_path,
            "H4（活跃度）未通过且未填写 admission.exception。"
            "破例必须写明理由。",
        )
    if "H4" in checked and exception:
        rep.warn(
            entry.rel_path,
            "H4 已通过却填写了 exception，破例理由可能是多余的",
        )
    if admission.get("tier") == "core" and "H5" not in checked:
        rep.error(entry.rel_path, "core 级条目必须通过 H5（本人实测）")


def check_duplicates(entries: list[Entry], rep: Reporter) -> None:
    """去重三规则。"""
    seen_ids: dict[str, str] = {}
    seen_sources: dict[tuple[str, str], str] = {}
    seen_hashes: dict[str, str] = {}

    for entry in entries:
        # 规则一：id 与 aliases 全局唯一
        for name in [entry.id, *(entry.meta.get("aliases") or [])]:
            if not name:
                continue
            if name in seen_ids and seen_ids[name] != entry.rel_path:
                rep.error(
                    entry.rel_path,
                    f"标识 {name!r} 与 {seen_ids[name]} 冲突（id 与 aliases 需全局唯一）",
                )
            else:
                seen_ids[name] = entry.rel_path

        # 规则二：repo + subpath 组合唯一
        repo = str(entry.meta.get("repo", "")).rstrip("/").lower()
        subpath = str(entry.lock.get("subpath") or ".").strip("/") or "."
        if repo:
            key = (repo, subpath)
            if key in seen_sources:
                rep.error(
                    entry.rel_path,
                    f"上游来源重复：{repo} 的 {subpath} 已被 {seen_sources[key]} 收录",
                )
            else:
                seen_sources[key] = entry.rel_path

        # 规则三：content_hash 相同视为内容实质重复
        content_hash = entry.lock.get("content_hash")
        if content_hash:
            if content_hash in seen_hashes:
                rep.warn(
                    entry.rel_path,
                    f"内容哈希与 {seen_hashes[content_hash]} 相同，可能是重复收录",
                )
            else:
                seen_hashes[content_hash] = entry.rel_path


def check_notices(entries: list[Entry], rep: Reporter) -> None:
    """每个条目必须在 THIRD_PARTY_NOTICES.md 中有归属登记。"""
    if not NOTICES_PATH.exists():
        rep.error("THIRD_PARTY_NOTICES.md", "文件不存在")
        return
    content = NOTICES_PATH.read_text(encoding="utf-8")
    for entry in entries:
        if entry.id and f"### {entry.id}" not in content:
            rep.error(
                "THIRD_PARTY_NOTICES.md",
                f"缺少条目 {entry.id!r} 的归属登记（需要一个 `### {entry.id}` 小节）",
            )


def check_removed(entries: list[Entry], rep: Reporter) -> None:
    """已移除的项目不应被重复收录。"""
    if not CHANGELOG_PATH.exists():
        return
    content = CHANGELOG_PATH.read_text(encoding="utf-8")
    marker = "## 已移除条目存档"
    if marker not in content:
        return
    archive = content.split(marker, 1)[1]
    for entry in entries:
        repo = str(entry.meta.get("repo", "")).rstrip("/")
        if repo and repo in archive:
            rep.error(
                entry.rel_path,
                f"该上游 {repo} 出现在 CHANGELOG 的已移除名单中，不应重复收录。"
                "若确认要恢复，请先从存档中删除对应记录并说明原因。",
            )


def check_quota(entries: list[Entry], rep: Reporter) -> None:
    if not entries:
        return
    exceptions = [e for e in entries if e.has_exception]
    ratio = len(exceptions) / len(entries)
    if ratio > EXCEPTION_QUOTA:
        rep.warn(
            "全局",
            f"破例条目占比 {ratio:.0%}（{len(exceptions)}/{len(entries)}）"
            f"超过 {EXCEPTION_QUOTA:.0%} 配额。"
            "破例正在从例外退化为惯例，建议重新审视收录标准。",
        )


def check_categories_exist(rep: Reporter) -> None:
    for category in CATEGORIES:
        if not (REPO_ROOT / category).is_dir():
            rep.error("全局", f"缺少分类目录：{category}/")


def main() -> int:
    parser = argparse.ArgumentParser(description="SkillMall 元数据校验")
    parser.add_argument("--quiet", action="store_true", help="只输出错误与告警")
    args = parser.parse_args()

    rep = Reporter("校验")
    check_categories_exist(rep)

    schema = json.loads(SCHEMA_PATH.read_text(encoding="utf-8"))
    validator = Draft7Validator(schema)

    entries = discover_entries()
    if not args.quiet:
        print(f"发现 {len(entries)} 个条目")

    for entry in entries:
        if not entry.meta:
            rep.error(entry.rel_path, "meta.yml 为空或不是合法的 YAML 映射")
            continue
        check_schema(entry, validator, rep)
        check_identity(entry, rep)
        check_license_redline(entry, rep)
        check_vendoring(entry, rep)
        check_files(entry, rep)
        check_notes(entry, rep)
        check_admission(entry, rep)
        if not args.quiet:
            print(f"  {entry.marker} {entry.rel_path}")

    check_duplicates(entries, rep)
    check_notices(entries, rep)
    check_removed(entries, rep)
    check_quota(entries, rep)

    return rep.finish()


if __name__ == "__main__":
    raise SystemExit(main())

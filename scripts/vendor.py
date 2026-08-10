#!/usr/bin/env python3
"""快照式 vendoring 工具。

把上游仓库的内容浅克隆下来，剔除无关文件后拷进条目的 src/，
并生成 upstream.lock 记录 commit SHA 与内容哈希。

用法：
    # 收录整个上游仓库
    python scripts/vendor.py --add https://github.com/owner/repo \\
        --into meta-skillcraft/my-entry

    # 只收录上游的某个子目录
    python scripts/vendor.py --add https://github.com/owner/repo \\
        --subpath skills/foo --into meta-skillcraft/my-entry

    # 覆盖已有的 src/（用于同步上游更新）
    python scripts/vendor.py --add <url> --into <dir> --force

    # 校验所有 vendored 条目是否被本地误改
    python scripts/vendor.py --verify

设计约束：
  · 零修改 —— 拷进来之后一个字符都不能改，靠 content_hash 强制
  · 体积限制 —— 单条目 ≤20 MB，单文件 ≤5 MB
  · 不用 submodule —— 见 docs/vendoring-guide.md 的选型对比
"""

from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
import tempfile
from datetime import datetime, timezone
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from _common import (  # noqa: E402
    REPO_ROOT,
    compute_content_hash,
    dir_stats,
    discover_entries,
    load_yaml,
)

VERSION = "1.0.0"
MAX_ENTRY_BYTES = 20 * 1024 * 1024
MAX_FILE_BYTES = 5 * 1024 * 1024

# 拷贝时一律剔除的路径。
# .github/workflows 必须剔除：否则上游的 workflow 会被 GitHub 当成本仓库的 CI 尝试运行。
EXCLUDED = [
    ".git/",
    ".github/workflows/",
    "node_modules/",
    "__pycache__/",
    ".venv/",
    ".DS_Store",
]


def run(cmd: list[str], cwd: Path | None = None) -> str:
    result = subprocess.run(
        cmd,
        cwd=str(cwd) if cwd else None,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
    )
    if result.returncode != 0:
        raise RuntimeError(
            f"命令失败：{' '.join(cmd)}\n{result.stderr.strip() or result.stdout.strip()}"
        )
    return result.stdout.strip()


def should_exclude(rel_path: str) -> bool:
    parts = rel_path.split("/")
    for pattern in EXCLUDED:
        target = pattern.rstrip("/")
        if pattern.endswith("/"):
            if target in parts or rel_path.startswith(target + "/"):
                return True
        elif parts[-1] == target:
            return True
    return False


def copy_tree(source: Path, dest: Path) -> tuple[int, int, list[str]]:
    """拷贝并剔除排除项，返回 (文件数, 总字节, 超限文件列表)。"""
    dest.mkdir(parents=True, exist_ok=True)
    count = 0
    total = 0
    oversized: list[str] = []

    for item in sorted(source.rglob("*")):
        if not item.is_file():
            continue
        rel = item.relative_to(source).as_posix()
        if should_exclude(rel):
            continue
        size = item.stat().st_size
        if size > MAX_FILE_BYTES:
            oversized.append(f"{rel} ({size / 1024 / 1024:.1f} MB)")
            continue
        target = dest / rel
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(item, target)
        count += 1
        total += size

    return count, total, oversized


def write_lock(entry_dir: Path, data: dict[str, object]) -> None:
    lines = [
        "# ============================================================================",
        "# 上游同步状态锁文件",
        "# ----------------------------------------------------------------------------",
        "# ⚠️ 由 scripts/vendor.py 自动生成，请勿手动编辑。",
        "#    手改会导致 content_hash 校验失配。",
        "# ============================================================================",
        "",
    ]
    order = [
        "source_url",
        "source_type",
        "ref",
        "commit",
        "commit_date",
        "synced_at",
        "synced_by",
        "subpath",
        "file_count",
        "total_bytes",
        "content_hash",
    ]
    for key in order:
        value = data.get(key)
        if value is None:
            lines.append(f"{key}: null")
        elif isinstance(value, int):
            lines.append(f"{key}: {value}")
        else:
            lines.append(f'{key}: "{value}"')

    lines.append("")
    lines.append("excluded:")
    for pattern in EXCLUDED:
        lines.append(f'  - "{pattern}"')
    lines.append("")
    lines.append("# 必须保持为空。零修改 vendoring 可规避 Apache-2.0 的改动标注义务。")
    lines.append("local_patches: []")

    (entry_dir / "upstream.lock").write_text(
        "\n".join(lines) + "\n", encoding="utf-8", newline="\n"
    )


def cmd_add(args: argparse.Namespace) -> int:
    entry_dir = (REPO_ROOT / args.into).resolve()
    if not entry_dir.is_dir():
        print(f"x 条目目录不存在：{args.into}")
        print("  请先执行：cp -r _template/ <分类>/<id>/")
        return 1

    src_dir = entry_dir / "src"
    if src_dir.exists():
        if not args.force:
            print(f"x {args.into}/src 已存在。要同步上游更新请加 --force")
            return 1
        print(f"  移除既有 src/ …")
        shutil.rmtree(src_dir)

    subpath = (args.subpath or ".").strip("/") or "."

    with tempfile.TemporaryDirectory(prefix="skillmall-vendor-") as tmp:
        clone_dir = Path(tmp) / "upstream"
        print(f"  浅克隆 {args.add} …")
        clone_cmd = ["git", "clone", "--depth", "1", "--quiet"]
        if args.ref:
            clone_cmd += ["--branch", args.ref]
        clone_cmd += [args.add, str(clone_dir)]
        try:
            run(clone_cmd)
        except RuntimeError as exc:
            print(f"x 克隆失败：{exc}")
            return 1

        commit = run(["git", "rev-parse", "HEAD"], cwd=clone_dir)
        commit_date = run(["git", "log", "-1", "--format=%cI"], cwd=clone_dir)
        ref = args.ref or run(
            ["git", "rev-parse", "--abbrev-ref", "HEAD"], cwd=clone_dir
        )

        source_root = clone_dir if subpath == "." else clone_dir / subpath
        if not source_root.is_dir():
            print(f"x 上游不存在子目录：{subpath}")
            return 1

        print(f"  拷贝到 {args.into}/src …")
        count, total, oversized = copy_tree(source_root, src_dir)

    if oversized:
        print(f"\n! 以下 {len(oversized)} 个文件超过 5 MB 上限，已跳过：")
        for item in oversized:
            print(f"    {item}")
        print("  请在 src/assets/FETCH.md 中记录它们的下载地址与 SHA-256。")

    if total > MAX_ENTRY_BYTES:
        print(
            f"\nx 条目总体积 {total / 1024 / 1024:.1f} MB 超过 20 MB 上限。"
            "请考虑只收录子目录（--subpath）。"
        )
        return 1

    if not (src_dir / "LICENSE").exists() and not any(
        (src_dir / name).exists() for name in ("LICENSE.md", "LICENSE.txt", "COPYING")
    ):
        print(
            "\n! 警告：src/ 内未找到 LICENSE 文件。\n"
            "  按协议政策，无 LICENSE 的项目属 🔴 红灯，禁止 vendoring。\n"
            "  请确认后改为 link-only 存根，或核实许可证文件的实际位置。"
        )

    content_hash = compute_content_hash(src_dir)
    write_lock(
        entry_dir,
        {
            "source_url": args.add,
            "source_type": "github" if "github.com" in args.add else "manual",
            "ref": ref,
            "commit": commit,
            "commit_date": commit_date,
            "synced_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
            "synced_by": f"scripts/vendor.py v{VERSION}",
            "subpath": subpath,
            "file_count": count,
            "total_bytes": total,
            "content_hash": content_hash,
        },
    )

    print(f"\n√ 已收录 {count} 个文件（{total / 1024:.0f} KB）")
    print(f"  commit: {commit[:12]}  ({commit_date})")
    print("\n接下来：")
    print(f"  1. 在根 .gitignore 添加白名单，否则 src/ 不会入库：")
    print(f"       !{args.into}/src/")
    print(f"       !{args.into}/src/**")
    print(f"  2. 填写 {args.into}/meta.yml")
    print("  3. python scripts/validate.py && python scripts/gen_index.py")
    return 0


def cmd_verify(_args: argparse.Namespace) -> int:
    entries = [e for e in discover_entries() if e.is_vendored]
    if not entries:
        print("没有 vendored 条目需要校验。")
        return 0

    failures = 0
    for entry in entries:
        lock = load_yaml(entry.path / "upstream.lock")
        recorded = lock.get("content_hash")
        if not entry.src_dir.is_dir():
            print(f"x {entry.rel_path}：src/ 不存在")
            failures += 1
            continue
        if not recorded:
            print(f"! {entry.rel_path}：upstream.lock 缺少 content_hash，跳过")
            continue
        actual = compute_content_hash(entry.src_dir)
        count, total = dir_stats(entry.src_dir)
        if actual == recorded:
            print(f"√ {entry.rel_path}  {count} 文件 / {total / 1024:.0f} KB")
        else:
            print(f"x {entry.rel_path}：内容哈希失配")
            print(f"    记录值 {recorded}")
            print(f"    实际值 {actual}")
            failures += 1

    if failures:
        print(
            f"\n{failures} 个条目校验失败。\n"
            "vendoring 必须零修改——补充说明请写进 NOTES.zh-CN.md，不要改 src/ 里的文件。\n"
            "若失配是换行符导致，检查 .gitattributes 是否生效（应为 eol=lf）。"
        )
        return 1

    print(f"\n√ {len(entries)} 个 vendored 条目全部与上游快照一致")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(
        description="SkillMall 快照式 vendoring 工具",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument("--add", metavar="URL", help="上游仓库地址")
    parser.add_argument("--into", metavar="DIR", help="目标条目目录，相对仓库根")
    parser.add_argument("--subpath", metavar="PATH", help="只收录上游的某个子目录")
    parser.add_argument("--ref", metavar="REF", help="指定分支或 tag，默认用上游默认分支")
    parser.add_argument("--force", action="store_true", help="覆盖已存在的 src/")
    parser.add_argument("--verify", action="store_true", help="校验所有 vendored 条目")
    args = parser.parse_args()

    if args.verify:
        return cmd_verify(args)
    if args.add and args.into:
        return cmd_add(args)

    parser.print_help()
    return 1


if __name__ == "__main__":
    raise SystemExit(main())

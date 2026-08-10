"""SkillMall 脚本共享工具。

提供条目发现、加载与常量定义，供 validate.py / gen_index.py / vendor.py 复用。
"""

from __future__ import annotations

import hashlib
import sys
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

try:
    import yaml
except ImportError:  # pragma: no cover
    sys.stderr.write(
        "缺少依赖 PyYAML。请执行：pip install -r scripts/requirements.txt\n"
    )
    raise SystemExit(2)


REPO_ROOT = Path(__file__).resolve().parent.parent
SCHEMA_PATH = REPO_ROOT / "scripts" / "schema" / "meta.schema.json"
TEMPLATE_DIR = REPO_ROOT / "_template"
INDEX_PATH = REPO_ROOT / "INDEX.md"
NOTICES_PATH = REPO_ROOT / "THIRD_PARTY_NOTICES.md"
CHANGELOG_PATH = REPO_ROOT / "CHANGELOG.md"

# 九大一级分类：目录名 -> (中文名, 定位)
CATEGORIES: dict[str, tuple[str, str]] = {
    "writing-docs": ("写作与文档", "文案、报告、技术写作、文档生成"),
    "dev-engineering": ("研发与代码", "编码、重构、测试、代码审查"),
    "design-creative": ("设计与创意", "UI/UX、视觉、品牌、素材生成"),
    "data-analytics": ("数据与分析", "数据处理、可视化、表格、BI"),
    "research-intel": ("研究与信息获取", "检索、调研、信息聚合、竞品分析"),
    "ops-automation": ("运维与自动化", "部署、CI/CD、脚本、系统维护"),
    "business-office": ("商业与办公", "办公文档、协作、流程、商务"),
    "agent-infra": ("Agent 基础设施", "MCP server、框架、CLI 工具"),
    "meta-skillcraft": ("技能工程", "写 skill 的 skill、规范、模板、元技能"),
}

KIND_LABELS: dict[str, str] = {
    "skill": "技能包",
    "skill-collection": "技能集",
    "mcp-server": "MCP 服务",
    "cli-tool": "CLI 工具",
    "framework": "框架",
    "spec": "规范",
}

TIER_LABELS: dict[str, str] = {
    "core": "主推",
    "standard": "常规",
    "watch": "观察",
}

# 协议分级白名单。判定流程见 docs/license-policy.md
LICENSE_TIER_A = {
    "MIT",
    "MIT-0",
    "BSD-2-Clause",
    "BSD-3-Clause",
    "ISC",
    "0BSD",
    "Unlicense",
    "CC0-1.0",
    "CC-BY-4.0",
}
LICENSE_TIER_B = {
    "Apache-2.0",
    "MPL-2.0",
    "OFL-1.1",
}

# 明确禁止 vendoring 的协议。不在 A/B/C 任一名单内的一律按 C 处理。
LICENSE_TIER_C_KNOWN = {
    "GPL-2.0",
    "GPL-3.0",
    "GPL-2.0-only",
    "GPL-3.0-only",
    "GPL-2.0-or-later",
    "GPL-3.0-or-later",
    "AGPL-3.0",
    "AGPL-3.0-only",
    "AGPL-3.0-or-later",
    "LGPL-2.1",
    "LGPL-3.0",
    "SSPL-1.0",
    "BUSL-1.1",
    "CC-BY-NC-4.0",
    "CC-BY-ND-4.0",
    "CC-BY-NC-SA-4.0",
    "UNKNOWN",
}

REQUIRED_ENTRY_FILES = ("meta.yml", "upstream.lock", "README.zh-CN.md", "NOTES.zh-CN.md")

# 破例条目占比上限，超出仅告警不中断
EXCEPTION_QUOTA = 0.15


@dataclass
class Entry:
    """一个收录条目。"""

    path: Path
    meta: dict[str, Any]
    lock: dict[str, Any] = field(default_factory=dict)

    @property
    def id(self) -> str:
        return str(self.meta.get("id", ""))

    @property
    def dir_name(self) -> str:
        return self.path.name

    @property
    def category_dir(self) -> str:
        return self.path.parent.name

    @property
    def rel_path(self) -> str:
        return self.path.relative_to(REPO_ROOT).as_posix()

    @property
    def is_vendored(self) -> bool:
        return self.meta.get("vendoring", {}).get("mode") == "full"

    @property
    def marker(self) -> str:
        """INDEX 中区分 vendored 与存根的标记。"""
        return "📦" if self.is_vendored else "🔗"

    @property
    def has_exception(self) -> bool:
        return bool(self.meta.get("admission", {}).get("exception"))

    @property
    def src_dir(self) -> Path:
        return self.path / "src"

    def stars(self) -> int:
        value = (self.meta.get("metrics") or {}).get("stars")
        return int(value) if isinstance(value, int) else -1


def load_yaml(path: Path) -> dict[str, Any]:
    """读取 YAML 文件，空文件返回空字典。"""
    if not path.exists():
        return {}
    text = path.read_text(encoding="utf-8")
    data = yaml.safe_load(text)
    return data if isinstance(data, dict) else {}


def discover_entries(root: Path = REPO_ROOT) -> list[Entry]:
    """扫描九大分类目录，收集所有含 meta.yml 的条目。

    只扫描 <分类>/<条目>/meta.yml 这一层，不递归——条目内部的 src/
    可能包含上游自己的 yml 文件，递归会误伤。
    """
    entries: list[Entry] = []
    for category in sorted(CATEGORIES):
        category_dir = root / category
        if not category_dir.is_dir():
            continue
        for entry_dir in sorted(p for p in category_dir.iterdir() if p.is_dir()):
            meta_path = entry_dir / "meta.yml"
            if not meta_path.exists():
                continue
            entries.append(
                Entry(
                    path=entry_dir,
                    meta=load_yaml(meta_path),
                    lock=load_yaml(entry_dir / "upstream.lock"),
                )
            )
    return entries


def compute_content_hash(directory: Path) -> str:
    """计算目录内全部文件的内容哈希。

    按相对路径排序后逐个喂入，路径与内容都参与计算，
    因此重命名文件也会导致哈希变化。以二进制读取，不做换行归一化——
    .gitattributes 已强制 LF，若此处失配说明本地确实改动了文件。
    """
    digest = hashlib.sha256()
    files = sorted(
        (p for p in directory.rglob("*") if p.is_file()),
        key=lambda p: p.relative_to(directory).as_posix(),
    )
    for file_path in files:
        rel = file_path.relative_to(directory).as_posix()
        digest.update(rel.encode("utf-8"))
        digest.update(b"\0")
        digest.update(file_path.read_bytes())
        digest.update(b"\0")
    return "sha256:" + digest.hexdigest()


def dir_stats(directory: Path) -> tuple[int, int]:
    """返回 (文件数, 总字节数)。"""
    count = 0
    total = 0
    for file_path in directory.rglob("*"):
        if file_path.is_file():
            count += 1
            total += file_path.stat().st_size
    return count, total


def is_template_unchanged(path: Path, template_name: str) -> bool:
    """判断文件是否还是未经修改的模板原文。

    用于 core 级条目的 NOTES.zh-CN.md 检查——照抄模板等于没写。
    """
    template_path = TEMPLATE_DIR / template_name
    if not path.exists() or not template_path.exists():
        return False
    return _normalize(path.read_text(encoding="utf-8")) == _normalize(
        template_path.read_text(encoding="utf-8")
    )


def _normalize(text: str) -> str:
    return "\n".join(line.rstrip() for line in text.strip().splitlines())


class Reporter:
    """收集错误与告警，统一输出。"""

    def __init__(self, name: str) -> None:
        self.name = name
        self.errors: list[str] = []
        self.warnings: list[str] = []

    def error(self, scope: str, message: str) -> None:
        self.errors.append(f"[{scope}] {message}")

    def warn(self, scope: str, message: str) -> None:
        self.warnings.append(f"[{scope}] {message}")

    def finish(self) -> int:
        """打印结果，返回进程退出码。"""
        if self.warnings:
            print(f"\n告警 {len(self.warnings)} 条：")
            for item in self.warnings:
                print(f"  ! {item}")
        if self.errors:
            print(f"\n错误 {len(self.errors)} 条：")
            for item in self.errors:
                print(f"  x {item}")
            print(f"\n{self.name} 失败。")
            return 1
        print(f"\n{self.name} 通过。")
        return 0

"""SkillMall 脚本共享工具。

提供条目发现、SKILL.md frontmatter 加载与常量定义，供 validate.py / gen_index.py 复用。

SkillMall 的收录形态：每个条目只保存一个 `SKILL.md`（介绍 + 安装指令），
不收录上游源码快照。Agent 通过该文件快速定位并安装对应 skill 项目。
"""

from __future__ import annotations

import sys
from dataclasses import dataclass
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
CHANGELOG_PATH = REPO_ROOT / "docs" / "CHANGELOG.md"

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

# 每个条目的入口文件：唯一一个给 Agent 读的「介绍 + 安装指令」文档
ENTRY_FILE = "SKILL.md"


@dataclass
class Entry:
    """一个收录条目（由单个 SKILL.md 描述，不包含上游源码）。"""

    path: Path
    meta: dict[str, Any]

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
    def skill_file(self) -> Path:
        return self.path / ENTRY_FILE

    @property
    def tier(self) -> str:
        return str(self.meta.get("tier", ""))

    @property
    def has_risk(self) -> bool:
        return bool(self.meta.get("risk_notes"))

    def stars(self) -> int:
        value = (self.meta.get("metrics") or {}).get("stars")
        return int(value) if isinstance(value, int) else -1


def load_frontmatter(path: Path) -> dict[str, Any]:
    """解析 SKILL.md 的 YAML frontmatter（--- 包裹），失败返回空字典。"""
    if not path.exists():
        return {}
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---"):
        return {}
    end = text.find("\n---", 3)
    if end == -1:
        return {}
    try:
        data = yaml.safe_load(text[3:end].strip())
    except yaml.YAMLError:
        return {}
    return data if isinstance(data, dict) else {}


def discover_entries(root: Path = REPO_ROOT) -> list[Entry]:
    """扫描 entries/ 下九大分类目录，收集所有含 SKILL.md 的条目。

    只扫描 entries/<分类>/<id>/SKILL.md 这一层，不递归。
    """
    entries: list[Entry] = []
    for category in sorted(CATEGORIES):
        category_dir = root / "entries" / category
        if not category_dir.is_dir():
            continue
        for entry_dir in sorted(p for p in category_dir.iterdir() if p.is_dir()):
            skill = entry_dir / ENTRY_FILE
            if not skill.exists():
                continue
            entries.append(Entry(path=entry_dir, meta=load_frontmatter(skill)))
    return entries


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

#!/usr/bin/env python3
"""SkillMall 静态预览站生成器。

扫描 entries/**/SKILL.md，生成纯静态、零依赖的在线预览站素材：
  - site/data/skills.json      全量条目元数据（首页前端筛选/搜索用）
  - site/skills/<id>.html      每技能详情页（正文预渲染为 HTML，无需 JS 即可读）

index.html / assets/style.css / assets/app.js 为静态文件，由仓库直接提供，
本脚本只负责数据 + 详情页，与现有 scripts/gen_index.py 思路一致。

用法：
    python scripts/gen_site.py
    python scripts/gen_site.py --quiet
"""

from __future__ import annotations

import html
import json
import sys
from datetime import datetime, timezone
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from _common import (  # noqa: E402
    CATEGORIES,
    KIND_LABELS,
    REPO_ROOT,
    TIER_LABELS,
    discover_entries,
)

SITE_DIR = REPO_ROOT / "site"
DATA_DIR = SITE_DIR / "data"
SKILLS_DIR = SITE_DIR / "skills"
GEN_AT = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


# ---------------------------------------------------------------------------
# 最小 Markdown -> HTML（仅覆盖 SKILL.md 正文用到的构造）
# ---------------------------------------------------------------------------
def _inline(text: str) -> str:
    """行内元素：转义后处理 `code`、**粗体**、*斜体*、[文本](链接)。"""
    text = html.escape(text, quote=False)
    # 行内代码（优先于粗体/斜体，避免内部下划线被误伤）
    text = __replace_code(text)
    # 链接 [文本](url)
    import re

    text = re.sub(
        r"\[([^\]]+)\]\(([^)]+)\)",
        lambda m: f'<a href="{m.group(2)}" target="_blank" rel="noopener">{m.group(1)}</a>',
        text,
    )
    # 粗体 **x**
    text = __replace_bold(text)
    # 斜体 *x*（不含 ** 已处理）
    text = re.sub(r"(?<!\*)\*([^*\n]+)\*(?!\*)", r"<em>\1</em>", text)
    return text


def __replace_code(text: str) -> str:
    import re

    return re.sub(r"`([^`]+)`", r"<code>\1</code>", text)


def __replace_bold(text: str) -> str:
    import re

    return re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", text)


def md_to_html(md: str) -> str:
    """将 SKILL.md 正文（已去掉 frontmatter）转为 HTML 片段。"""
    lines = md.splitlines()
    out: list[str] = []
    i = 0
    n = len(lines)

    def flush_paragraph(buf: list[str]) -> None:
        if buf:
            out.append(f"<p>{_inline(' '.join(buf).strip())}</p>")
            buf.clear()

    para: list[str] = []
    while i < n:
        line = lines[i]
        stripped = line.strip()

        # 代码围栏
        if stripped.startswith("```"):
            flush_paragraph(para)
            lang = stripped[3:].strip()
            buf: list[str] = []
            i += 1
            while i < n and not lines[i].strip().startswith("```"):
                buf.append(lines[i])
                i += 1
            i += 1  # 跳过结束围栏
            code = html.escape("\n".join(buf)).strip("\n")
            cls = f' class="lang-{html.escape(lang)}"' if lang else ""
            out.append(f"<pre><code{cls}>{code}</code></pre>")
            continue

        # 标题
        if stripped.startswith("#"):
            flush_paragraph(para)
            level = len(stripped) - len(stripped.lstrip("#"))
            level = min(max(level, 1), 4)
            content = stripped.lstrip("#").strip()
            out.append(f"<h{level}>{_inline(content)}</h{level}>")
            i += 1
            continue

        # 分隔线
        if stripped in ("---", "***", "___"):
            flush_paragraph(para)
            out.append("<hr/>")
            i += 1
            continue

        # 引用
        if stripped.startswith(">"):
            flush_paragraph(para)
            quote: list[str] = []
            while i < n and lines[i].strip().startswith(">"):
                quote.append(lines[i].strip().lstrip(">").strip())
                i += 1
            out.append(f"<blockquote>{_inline(' '.join(quote))}</blockquote>")
            continue

        # 无序列表（吸收缩进续行）
        if stripped.startswith(("- ", "* ", "+ ")):
            flush_paragraph(para)
            items: list[str] = []
            while i < n and lines[i].strip().startswith(("- ", "* ", "+ ")):
                item_text = lines[i].strip()[2:].strip()
                i += 1
                while (
                    i < n
                    and lines[i].strip()
                    and lines[i][:1] in (" ", "\t")
                    and not lines[i].strip().startswith(("#", ">", "- ", "* ", "+ "))
                ):
                    item_text += " " + lines[i].strip()
                    i += 1
                items.append(f"<li>{_inline(item_text)}</li>")
            out.append(f"<ul>{''.join(items)}</ul>")
            continue

        # 有序列表（吸收缩进续行）
        if stripped[:2].isdigit() and stripped[2:3] in (".", ")"):
            flush_paragraph(para)
            items = []
            while i < n and lines[i].strip()[:2].isdigit() and lines[i].strip()[2:3] in (".", ")"):
                item_text = lines[i].strip()[3:].strip()
                i += 1
                while (
                    i < n
                    and lines[i].strip()
                    and lines[i][:1] in (" ", "\t")
                    and not lines[i].strip().startswith(("#", ">", "- ", "* ", "+ "))
                ):
                    item_text += " " + lines[i].strip()
                    i += 1
                items.append(f"<li>{_inline(item_text)}</li>")
            out.append(f"<ol>{''.join(items)}</ol>")
            continue

        # 空行
        if stripped == "":
            flush_paragraph(para)
            i += 1
            continue

        # 普通段落行
        para.append(stripped)
        i += 1

    flush_paragraph(para)
    return "\n".join(out)


def extract_install(body: str) -> str:
    """从正文中抽取「怎么安装」小节的首个代码块，作为首页快速预览。"""
    marker = "## 怎么安装"
    idx = body.find(marker)
    if idx == -1:
        return ""
    seg = body[idx:]
    nxt = seg.find("\n## ", 1)
    if nxt != -1:
        seg = seg[:nxt]
    start = seg.find("```")
    if start == -1:
        return ""
    end = seg.find("```", start + 3)
    if end == -1:
        return ""
    return seg[start + 3 : end].strip()


# ---------------------------------------------------------------------------
# 详情页模板
# ---------------------------------------------------------------------------
DETAIL_TEMPLATE = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>{title} · SkillMall</title>
<link rel="stylesheet" href="../assets/style.css" />
</head>
<body>
<header class="site-header">
  <div class="container site-header__inner">
    <a class="brand" href="../index.html">SkillMall</a>
    <nav class="site-nav">
      <a href="../index.html">浏览技能</a>
      <a href="https://github.com/AvalonLee/SkillMall" target="_blank" rel="noopener">GitHub</a>
    </nav>
  </div>
</header>
<main class="container detail">
  <p class="breadcrumb"><a href="../index.html">首页</a> / {cat_name}</p>
  <div class="detail__head">
    <h1>{name_zh}</h1>
    <p class="detail__en">{name_en}</p>
    <div class="badges">
      <span class="badge badge--cat">{cat_name}</span>
      <span class="badge badge--tier">{tier_label}</span>
      <span class="badge badge--license">{license}</span>
      <span class="badge">{kind_label}</span>
    </div>
    <p class="detail__summary">{summary_zh}</p>
    <div class="detail__links">
      {repo_link}
      {homepage_link}
    </div>
  </div>
  <article class="detail__body">
{body_html}
  </article>
  <footer class="detail__foot">
    <p>收录于 {added_at} · 更新于 {updated_at}</p>
    <p class="muted">SkillMall · 轻量索引 · 只存 SKILL.md · 中文为主</p>
  </footer>
</main>
</body>
</html>
"""


def build_detail(entry, cat_name: str, body_html: str) -> str:
    meta = entry.meta
    repo = meta.get("repo") or ""
    homepage = meta.get("homepage") or ""
    repo_link = (
        f'<a class="btn" href="{repo}" target="_blank" rel="noopener">查看仓库 / 源码</a>'
        if repo
        else ""
    )
    homepage_link = (
        f'<a class="btn btn--ghost" href="{homepage}" target="_blank" rel="noopener">项目主页</a>'
        if homepage
        else ""
    )
    return DETAIL_TEMPLATE.format(
        title=html.escape(str(meta.get("name_zh", entry.id))),
        name_zh=html.escape(str(meta.get("name_zh", entry.id))),
        name_en=html.escape(str(meta.get("name_en", ""))),
        cat_name=html.escape(cat_name),
        tier_label=html.escape(TIER_LABELS.get(entry.tier, entry.tier)),
        license=html.escape(str(meta.get("license", "未知"))),
        kind_label=html.escape(KIND_LABELS.get(str(meta.get("kind", "")), str(meta.get("kind", "")))),
        summary_zh=html.escape(str(meta.get("summary_zh", ""))),
        repo_link=repo_link,
        homepage_link=homepage_link,
        added_at=html.escape(str(meta.get("added_at", ""))),
        updated_at=html.escape(str(meta.get("updated_at", ""))),
        body_html=body_html,
    )


def main() -> int:
    quiet = "--quiet" in sys.argv
    entries = discover_entries()
    if not quiet:
        print(f"发现 {len(entries)} 个条目")

    skills: list[dict] = []
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    SKILLS_DIR.mkdir(parents=True, exist_ok=True)

    for entry in entries:
        meta = entry.meta
        cat_dir = entry.category_dir
        cat_name = CATEGORIES.get(cat_dir, (cat_dir,))[0]
        skill_file = entry.skill_file
        raw = skill_file.read_text(encoding="utf-8")
        # 去 frontmatter
        body = raw.split("\n---", 1)[-1] if "\n---" in raw else raw
        body = body.lstrip("\n")
        body_html = md_to_html(body)
        install = extract_install(body)

        detail_html = build_detail(entry, cat_name, body_html)
        (SKILLS_DIR / f"{entry.id}.html").write_text(detail_html, encoding="utf-8")

        skills.append(
            {
                "id": entry.id,
                "name_zh": meta.get("name_zh", entry.id),
                "name_en": meta.get("name_en", ""),
                "summary_zh": meta.get("summary_zh", ""),
                "summary_en": meta.get("summary_en", ""),
                "category_dir": cat_dir,
                "category_name": cat_name,
                "kind": meta.get("kind", ""),
                "kind_label": KIND_LABELS.get(str(meta.get("kind", "")), str(meta.get("kind", ""))),
                "tags": meta.get("tags") or [],
                "languages": meta.get("languages") or [],
                "doc_languages": meta.get("doc_languages") or [],
                "license": meta.get("license", "未知"),
                "homepage": meta.get("homepage", ""),
                "repo": meta.get("repo", ""),
                "tier": entry.tier,
                "tier_label": TIER_LABELS.get(entry.tier, entry.tier),
                "related": meta.get("related") or [],
                "aliases": meta.get("aliases") or [],
                "risk_notes": meta.get("risk_notes") or "",
                "added_at": str(meta.get("added_at", "")),
                "updated_at": str(meta.get("updated_at", "")),
                "install": install,
                "detail_url": f"skills/{entry.id}.html",
            }
        )
        if not quiet:
            print(f"  -> {entry.id}")

    categories = [
        {"dir": d, "name": n, "desc": desc} for d, (n, desc) in CATEGORIES.items()
    ]
    payload = {
        "generated_at": GEN_AT,
        "count": len(skills),
        "categories": categories,
        "skills": skills,
    }
    (DATA_DIR / "skills.json").write_text(
        json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8"
    )

    if not quiet:
        print(f"\n生成完成：{len(skills)} 个技能 -> site/data/skills.json + site/skills/*.html")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

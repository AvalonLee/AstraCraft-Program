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
    normalize_tags,
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
<style>
  /* 详情正文排版：复用设计令牌，与首页视觉保持一致 */
  .detail-body { color: var(--text); font-size: 15px; line-height: 1.8; letter-spacing: -0.01em; }
  .detail-body h2 { font-size: 22px; font-weight: 680; letter-spacing: -0.03em; margin: 28px 0 12px; }
  .detail-body h3 { font-size: 18px; font-weight: 640; letter-spacing: -0.02em; margin: 22px 0 10px; }
  .detail-body p { margin: 0 0 14px; color: rgba(15, 23, 42, 0.78); }
  .detail-body ul, .detail-body ol { margin: 0 0 14px; padding-left: 22px; }
  .detail-body li { margin: 4px 0; }
  .detail-body a { color: var(--accent); text-decoration: underline; text-underline-offset: 2px; }
  .detail-body strong { font-weight: 680; }
  .detail-body blockquote { margin: 0 0 14px; padding: 10px 16px; border-left: 3px solid var(--accent); background: var(--surface-muted); border-radius: 0 10px 10px 0; color: var(--muted); }
  .detail-body hr { border: none; border-top: 1px solid var(--border); margin: 24px 0; }
  .detail-body pre { margin: 0 0 16px; padding: 16px 18px; background: #0b1220; border-radius: 12px; overflow: auto; }
  .detail-body pre code { font-family: "SF Mono", "IBM Plex Mono", "Menlo", monospace; font-size: 13px; line-height: 1.7; color: #e8edf7; }
  .detail-body code { font-family: "SF Mono", "IBM Plex Mono", "Menlo", monospace; font-size: 0.92em; background: rgba(15, 23, 42, 0.06); padding: 1px 6px; border-radius: 6px; color: #1d3fd8; }
  .detail-meta { margin-top: 10px; }
</style>
</head>
<body class="page-home">
<main class="page-shell">
  <header class="topbar">
    <div class="brand-lockup">
      <div class="brand-name">SkillMall</div>
      <div class="brand-sub">Agent Skill 中文索引集市</div>
    </div>
    <nav class="nav-links">
      <a class="nav-link" href="../index.html">浏览技能</a>
      <a class="nav-link" href="https://github.com/AvalonLee/SkillMall" target="_blank" rel="noopener">GitHub</a>
    </nav>
  </header>

  <section class="hero-shell">
    <div class="eyebrow">Agent Skill</div>
    <div class="hero-copy-block">
      <h1 class="hero-title">{name_zh}</h1>
      <p class="hero-subtitle">{name_en}</p>
    </div>
    <div class="hero-actions">
      <a class="button button-primary" href="#body">阅读说明</a>
    </div>
  </section>

  <div class="card" style="margin-top:24px;">
    <div class="mini-tags">
      <span>{cat_name}</span><span>{tier_label}</span><span class="lic-badge lic-{license_bucket}" title="{license}">{license_bucket_label}</span><span>{kind_label}</span>
    </div>
    <p class="muted detail-meta">{summary_zh}</p>
    <div class="link-row" style="margin-top:14px;">
      {repo_link}
      {homepage_link}
    </div>
  </div>

  <article id="body" class="content-panel detail-body" style="margin-top:24px;">
{body_html}
  </article>

  <p class="footer">收录于 {added_at} · 更新于 {updated_at} · SkillMall 轻量索引</p>
</main>
</body>
</html>
"""

# 协议直观分类（与 site/assets/app.js 的 LICENSE_BUCKETS / BUCKET_META 保持一致）
LICENSE_BUCKETS = {
    # 完全开源（宽松许可）：可商用、可闭源，仅需保留署名
    "MIT": "open", "MIT-0": "open", "BSD-2-Clause": "open", "BSD-3-Clause": "open",
    "Apache-2.0": "open", "ISC": "open", "Unlicense": "open", "0BSD": "open",
    "Zlib": "open", "BSL-1.0": "open", "CC0-1.0": "open", "BlueOak-1.0.0": "open",
    "Python-2.0": "open", "MS-PL": "open", "WTFPL": "open",
    "CC-BY-4.0": "open", "CC-BY-3.0": "open",
    # 部分开源（Copyleft / 衍生约束）
    "GPL-2.0": "copyleft", "GPL-3.0": "copyleft", "AGPL-3.0": "copyleft",
    "LGPL-2.1": "copyleft", "LGPL-3.0": "copyleft", "MPL-2.0": "copyleft",
    "EPL-2.0": "copyleft", "EPL-1.0": "copyleft", "OSL-3.0": "copyleft",
    "EUPL-1.2": "copyleft", "CDDL-1.0": "copyleft", "CeCILL-2.1": "copyleft",
    # 商用授权（专有 / 源码可见但受限）
    "LicenseRef-Anthropic-Source-Available": "commercial",
    "Commercial": "commercial", "Proprietary": "commercial",
    "CC-BY-NC-4.0": "commercial", "CC-BY-NC-SA-4.0": "commercial",
    "BUSL-1.1": "commercial", "SSPL-1.0": "commercial",
    # 版权未声明
    "UNKNOWN": "unknown",
}
BUCKET_LABELS = {
    "open": "完全开源",
    "copyleft": "部分开源",
    "commercial": "商用授权",
    "unknown": "版权未声明",
}


def license_bucket(spdx) -> str:
    if not spdx:
        return "unknown"
    return LICENSE_BUCKETS.get(str(spdx), "unknown")


def build_detail(entry, cat_name: str, body_html: str) -> str:
    meta = entry.meta
    repo = meta.get("repo") or ""
    homepage = meta.get("homepage") or ""
    repo_link = (
        f'<a class="button button-secondary" href="{repo}" target="_blank" rel="noopener">查看仓库 / 源码</a>'
        if repo
        else ""
    )
    homepage_link = (
        f'<a class="button button-ghost" href="{homepage}" target="_blank" rel="noopener">项目主页</a>'
        if homepage
        else ""
    )
    # 手动替换占位符：避免 .format() 与模板内 <style> 的 CSS 花括号冲突
    fields = {
        "title": html.escape(str(meta.get("name_zh", entry.id))),
        "name_zh": html.escape(str(meta.get("name_zh", entry.id))),
        "name_en": html.escape(str(meta.get("name_en", ""))),
        "cat_name": html.escape(cat_name),
        "tier_label": html.escape(TIER_LABELS.get(entry.tier, entry.tier)),
        "license": html.escape(str(meta.get("license", "未知"))),
        "license_bucket": license_bucket(meta.get("license")),
        "license_bucket_label": BUCKET_LABELS[license_bucket(meta.get("license"))],
        "kind_label": html.escape(KIND_LABELS.get(str(meta.get("kind", "")), str(meta.get("kind", "")))),
        "summary_zh": html.escape(str(meta.get("summary_zh", ""))),
        "repo_link": repo_link,
        "homepage_link": homepage_link,
        "added_at": html.escape(str(meta.get("added_at", ""))),
        "updated_at": html.escape(str(meta.get("updated_at", ""))),
        "body_html": body_html,
    }
    out = DETAIL_TEMPLATE
    for k, v in fields.items():
        out = out.replace("{" + k + "}", v)
    return out


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
                "tags": normalize_tags(meta.get("tags"))[0],
                "languages": meta.get("languages") or [],
                "doc_languages": meta.get("doc_languages") or [],
                "license": meta.get("license", "未知"),
                "license_bucket": license_bucket(meta.get("license")),
                "homepage": meta.get("homepage", ""),
                "repo": meta.get("repo", ""),
                "tier": entry.tier,
                "tier_label": TIER_LABELS.get(entry.tier, entry.tier),
                "featured": bool(meta.get("featured", False)),
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

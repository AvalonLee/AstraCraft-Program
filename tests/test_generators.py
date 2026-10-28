import json
from pathlib import Path

from scripts import gen_site
from scripts._common import discover_entries
from scripts.gen_site import license_bucket, outputs_match


def test_duplicate_upstream_repos_keep_separate_verification(tmp_path: Path, monkeypatch) -> None:
    snapshot = tmp_path / "snapshot.json"
    snapshot.write_text(
        json.dumps({
            "generated_at": "now",
            "entries": {
                "a": {"repo": "https://github.com/example/shared", "status": "verified"},
                "b": {"repo": "https://github.com/example/shared", "status": "needs-review"},
            },
        }),
        encoding="utf-8",
    )
    monkeypatch.setattr(gen_site, "SNAPSHOT_PATH", snapshot)

    verification, _ = gen_site.load_verification()

    assert verification["a"]["status"] == "verified"
    assert verification["b"]["status"] == "needs-review"


def test_every_declared_license_maps_to_a_bucket() -> None:
    unmapped = {
        entry.meta["license"]
        for entry in discover_entries()
        if entry.meta.get("license") not in (None, "", "UNKNOWN")
        and license_bucket(entry.meta["license"]) == "unknown"
    }
    assert unmapped == set()


def test_generated_timestamp_does_not_cause_site_drift(tmp_path: Path) -> None:
    data = tmp_path / "data"
    data.mkdir()
    stored = {"generated_at": "old", "count": 1, "categories": [], "skills": [{"id": "a"}]}
    fresh = {"generated_at": "new", "count": 1, "categories": [], "skills": [{"id": "a"}]}
    (data / "skills.json").write_text(json.dumps(stored), encoding="utf-8")

    assert outputs_match(fresh, data) is True


def test_real_site_drift_is_detected_without_writing(tmp_path: Path) -> None:
    data = tmp_path / "data"
    data.mkdir()
    stored = {"generated_at": "old", "count": 1, "categories": [], "skills": [{"id": "a"}]}
    fresh = {"generated_at": "new", "count": 2, "categories": [], "skills": [{"id": "a"}, {"id": "b"}]}
    original = json.dumps(stored)
    (data / "skills.json").write_text(original, encoding="utf-8")

    assert outputs_match(fresh, data) is False
    assert (data / "skills.json").read_text(encoding="utf-8") == original


def test_md_to_html_renders_pipe_table() -> None:
    md = (
        "| 能力 | 平台 |\n"
        "|------|------|\n"
        "| 搜索 | 小红书 |\n"
        "| 评论 | 抖音 |"
    )
    out = gen_site.md_to_html(md)
    assert "<table><thead><tr><th>能力</th><th>平台</th></tr></thead>" in out
    assert "<tbody><tr><td>搜索</td><td>小红书</td></tr>" in out


def test_md_to_html_table_escapes_and_inline() -> None:
    md = "| 名称 | 命令 |\n|---|---|\n| 安装 | `uv sync` |"
    out = gen_site.md_to_html(md)
    assert "<code>uv sync</code>" in out


def test_md_to_html_keeps_pipe_paragraph() -> None:
    out = gen_site.md_to_html("竖线 a | b 只是普通文本")
    assert "<table>" not in out
    assert "a | b" in out

import json
from pathlib import Path

from scripts import verify_upstreams
from scripts.verify_upstreams import build_snapshot, candidate_entries, main, merge_snapshots, reconcile_placeholder_conflicts, write_snapshot_atomic


def healthy_payload() -> dict:
    return {
        "repo": "https://github.com/example/tool",
        "head_sha": "abc123",
        "archived": False,
        "stars": 12,
        "pushed_at": "2026-08-20T00:00:00Z",
        "has_readme": True,
        "api_license": "MIT",
        "text_license": "MIT",
        "topics": ["testing", "developer-tools"],
        "description": "Testing workflows",
    }


def catalog_entry(**overrides) -> dict:
    value = {
        "id": "tool",
        "category": "dev-engineering",
        "tags": ["testing"],
        "repo": "https://github.com/example/tool",
        "license": "MIT",
        "tier": "standard",
        "risk_notes": "",
        "install_text": "git clone https://github.com/example/tool",
    }
    value.update(overrides)
    return value


def test_build_snapshot_uses_injected_fetcher() -> None:
    calls = []

    def fetch(repo: str) -> dict:
        calls.append(repo)
        return healthy_payload()

    snapshot, exit_code = build_snapshot([catalog_entry()], fetch, "2026-08-27T00:00:00Z")

    assert calls == ["https://github.com/example/tool"]
    assert exit_code == 0
    assert snapshot["entries"]["tool"]["status"] == "verified"


def test_blocked_entry_makes_refresh_fail() -> None:
    payload = healthy_payload()
    payload["archived"] = True

    snapshot, exit_code = build_snapshot([catalog_entry()], lambda _: payload, "2026-08-27T00:00:00Z")

    assert exit_code == 1
    assert snapshot["entries"]["tool"]["status"] == "blocked"


def test_needs_review_is_reported_without_blocking_refresh() -> None:
    payload = healthy_payload()
    payload["api_license"] = "UNKNOWN"
    payload["text_license"] = "UNKNOWN"

    snapshot, exit_code = build_snapshot([catalog_entry()], lambda _: payload, "2026-08-27T00:00:00Z")

    assert exit_code == 0
    assert snapshot["entries"]["tool"]["status"] == "needs-review"


def test_atomic_writer_replaces_snapshot(tmp_path: Path) -> None:
    path = tmp_path / "snapshot.json"
    path.write_text('{"old": true}', encoding="utf-8")

    write_snapshot_atomic(path, {"generated_at": "now", "entries": {}})

    assert json.loads(path.read_text(encoding="utf-8"))["generated_at"] == "now"
    assert not list(tmp_path.glob("*.tmp"))


def test_check_mode_does_not_write_snapshot(tmp_path: Path) -> None:
    catalog = tmp_path / "catalog.json"
    snapshot = tmp_path / "snapshot.json"
    catalog.write_text(json.dumps([catalog_entry()]), encoding="utf-8")
    snapshot.write_text(json.dumps({"generated_at": "old", "entries": {}}), encoding="utf-8")

    code = main(
        ["--check", "--catalog", str(catalog), "--snapshot", str(snapshot)],
        fetcher=lambda _: healthy_payload(),
    )

    assert code == 1
    assert json.loads(snapshot.read_text(encoding="utf-8"))["generated_at"] == "old"


def test_default_check_is_offline_when_snapshot_matches(tmp_path: Path, monkeypatch) -> None:
    catalog = tmp_path / "catalog.json"
    snapshot = tmp_path / "snapshot.json"
    catalog.write_text(json.dumps([catalog_entry()]), encoding="utf-8")
    snapshot.write_text(json.dumps({"generated_at":"now","entries":{"tool":{
        "repo":"https://github.com/example/tool","head_sha":"abc","status":"verified",
        "health_score":100,"max_tier":"core","issues":[]
    }}}), encoding="utf-8")
    monkeypatch.setattr(verify_upstreams, "fetch_github_facts", lambda _: (_ for _ in ()).throw(AssertionError("network used")))

    assert main(["--check", "--catalog", str(catalog), "--snapshot", str(snapshot)]) == 0


def test_refresh_mode_writes_snapshot(tmp_path: Path) -> None:
    catalog = tmp_path / "catalog.json"
    snapshot = tmp_path / "snapshot.json"
    catalog.write_text(json.dumps([catalog_entry()]), encoding="utf-8")

    code = main(
        ["--refresh", "--catalog", str(catalog), "--snapshot", str(snapshot)],
        fetcher=lambda _: healthy_payload(),
    )

    assert code == 0
    assert json.loads(snapshot.read_text(encoding="utf-8"))["entries"]["tool"]["status"] == "verified"


def test_github_fetcher_records_head_commit_sha(monkeypatch) -> None:
    calls = []

    def fake_request(url: str) -> dict:
        calls.append(url)
        if url.endswith("/readme"):
            return {"path": "README.md"}
        return {
            "default_branch": "main",
            "archived": False,
            "stargazers_count": 1,
            "pushed_at": "2026-08-20T00:00:00Z",
            "topics": [],
            "description": "tool",
            "license": {"spdx_id": "MIT"},
        }

    monkeypatch.setattr(verify_upstreams, "_request_json", fake_request)
    monkeypatch.setattr(verify_upstreams, "_git_head_sha", lambda _: "deadbeef")

    result = verify_upstreams.fetch_github_facts("https://github.com/example/tool")

    assert result["head_sha"] == "deadbeef"
    assert len(calls) == 2


def test_candidate_entries_build_auditable_catalog_records() -> None:
    candidates = {
        "dsh": [
            {"category": "dsh", "repo": "https://github.com/deepseek-ai/deepseek-harness", "priority": "primary", "coverage_code": "dsh-1"},
            {"category": "dsh", "repo": "https://github.com/example/fallback", "priority": "fallback", "coverage_code": "dsh-2"},
        ]
    }

    records = candidate_entries(candidates, priority="primary")

    assert records == [{
        "id": "deepseek-ai-deepseek-harness",
        "category": "dsh",
        "tags": ["dsh", "deepseek-harness", "plugin"],
        "repo": "https://github.com/deepseek-ai/deepseek-harness",
        "license": "UNKNOWN",
        "tier": "watch",
        "risk_notes": "安装第三方项目会写入本地环境，执行前需复核上游说明。",
        "install_text": "git clone https://github.com/deepseek-ai/deepseek-harness",
    }]


def test_candidate_ids_include_owner_to_avoid_repo_name_collisions() -> None:
    candidates = {
        "dev-engineering": [{"category":"dev-engineering","repo":"https://github.com/wshobson/agents","priority":"primary","coverage_code":"dev-1"}],
        "data-analytics": [{"category":"data-analytics","repo":"https://github.com/astronomer/agents","priority":"primary","coverage_code":"data-1"}],
    }
    records = candidate_entries(candidates)
    assert [item["id"] for item in records] == ["wshobson-agents", "astronomer-agents"]


def test_snapshot_merge_canonicalizes_old_repo_name_ids() -> None:
    old = {"generated_at":"old", "entries":{"agents":{"repo":"https://github.com/astronomer/agents","status":"verified"}}}
    fresh = {"generated_at":"new", "entries":{"wshobson-agents":{"repo":"https://github.com/wshobson/agents","status":"verified"}}}

    merged = merge_snapshots(old, fresh)

    assert set(merged["entries"]) == {"astronomer-agents", "wshobson-agents"}
    assert merged["generated_at"] == "new"


def test_reconcile_removes_only_obsolete_unknown_placeholder_conflict() -> None:
    snapshot = {"generated_at":"now", "entries":{
        "ok":{"repo":"https://github.com/example/ok","license":"MIT","status":"needs-review","issues":["E_LICENSE_CONFLICT"]},
        "real-conflict":{"repo":"https://github.com/example/bad","license":"MIT","status":"needs-review","issues":["E_LICENSE_CONFLICT","E_CATEGORY_LOW_CONFIDENCE"]}
    }}
    repaired = reconcile_placeholder_conflicts(snapshot)
    assert repaired["entries"]["ok"]["status"] == "verified"
    assert repaired["entries"]["ok"]["issues"] == []
    assert repaired["entries"]["real-conflict"]["status"] == "needs-review"

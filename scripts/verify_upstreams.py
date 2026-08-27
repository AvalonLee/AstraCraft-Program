#!/usr/bin/env python3
"""Refresh or check reproducible upstream verification snapshots."""

from __future__ import annotations

import argparse
import json
import os
import subprocess
import tempfile
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from typing import Callable

try:
    from scripts.upstream_verify import UpstreamFacts, normalize_github_repo, verify_entry
except ModuleNotFoundError:  # direct: python scripts/verify_upstreams.py
    from upstream_verify import UpstreamFacts, normalize_github_repo, verify_entry


Fetcher = Callable[[str], dict]

CANDIDATE_TAGS = {
    "dev-engineering": ["software-engineering", "code-review", "testing"],
    "data-analytics": ["data", "analytics", "visualization"],
    "research-intel": ["research", "search", "intelligence"],
    "ops-automation": ["devops", "automation", "deployment"],
    "dsh": ["dsh", "deepseek-harness", "plugin"],
}


def candidate_entries(candidates: dict[str, list[dict]], priority: str = "primary") -> list[dict]:
    records = []
    for category, items in candidates.items():
        for item in items:
            if item.get("priority") != priority:
                continue
            repo = normalize_github_repo(str(item["repo"]))
            owner, name = repo.removeprefix("https://github.com/").split("/", 1)
            records.append({
                "id": f"{owner}-{name}",
                "category": category,
                "tags": CANDIDATE_TAGS[category],
                "repo": repo,
                "license": "UNKNOWN",
                "tier": "watch",
                "risk_notes": "安装第三方项目会写入本地环境，执行前需复核上游说明。",
                "install_text": f"git clone {repo}",
            })
    return records


def build_snapshot(entries: list[dict], fetcher: Fetcher, generated_at: str) -> tuple[dict, int]:
    results: dict[str, dict] = {}
    blocked = False
    for entry in entries:
        payload = fetcher(str(entry["repo"]))
        facts = UpstreamFacts(**payload)
        result = verify_entry(entry, facts)
        blocked = blocked or result.status == "blocked"
        results[str(entry["id"])] = {
            "repo": normalize_github_repo(facts.repo),
            "head_sha": facts.head_sha,
            "status": result.status,
            "health_score": result.health_score,
            "max_tier": result.max_tier,
            "issues": list(result.issue_codes),
            "archived": facts.archived,
            "license": facts.api_license,
            "pushed_at": facts.pushed_at,
            "stars": facts.stars,
        }
    return {"generated_at": generated_at, "entries": results}, int(blocked)


def write_snapshot_atomic(path: Path, snapshot: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    content = json.dumps(snapshot, ensure_ascii=False, indent=2) + "\n"
    handle, temp_name = tempfile.mkstemp(prefix=f".{path.name}.", suffix=".tmp", dir=path.parent)
    try:
        with os.fdopen(handle, "w", encoding="utf-8") as stream:
            stream.write(content)
        Path(temp_name).replace(path)
    except BaseException:
        Path(temp_name).unlink(missing_ok=True)
        raise


def merge_snapshots(current: dict, fresh: dict) -> dict:
    merged: dict[str, dict] = {}
    for value in (current.get("entries") or {}).values():
        repo = normalize_github_repo(str(value["repo"]))
        owner, name = repo.removeprefix("https://github.com/").split("/", 1)
        merged[f"{owner}-{name}"] = value
    merged.update(fresh.get("entries") or {})
    return {"generated_at": fresh["generated_at"], "entries": merged}


def reconcile_placeholder_conflicts(snapshot: dict) -> dict:
    repaired = json.loads(json.dumps(snapshot))
    for value in repaired.get("entries", {}).values():
        if (
            value.get("issues") == ["E_LICENSE_CONFLICT"]
            and value.get("license") not in {"", "UNKNOWN", "NOASSERTION", None}
        ):
            value["issues"] = []
            value["status"] = "verified"
    return repaired


def _request_json(url: str) -> dict:
    headers = {"Accept": "application/vnd.github+json", "User-Agent": "AstraCraft-Upstream-Verify"}
    token = os.environ.get("GITHUB_TOKEN")
    if token:
        headers["Authorization"] = f"Bearer {token}"
    request = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(request, timeout=20) as response:
        return json.load(response)


def _git_head_sha(repo: str) -> str:
    result = subprocess.run(
        ["git", "ls-remote", f"{normalize_github_repo(repo)}.git", "HEAD"],
        check=True,
        capture_output=True,
        text=True,
        timeout=30,
    )
    return result.stdout.split()[0] if result.stdout.split() else ""


def fetch_github_facts(repo: str) -> dict:
    normalized = normalize_github_repo(repo)
    owner_repo = normalized.removeprefix("https://github.com/")
    base = f"https://api.github.com/repos/{owner_repo}"
    data = _request_json(base)
    spdx = str((data.get("license") or {}).get("spdx_id") or "UNKNOWN")
    try:
        _request_json(f"{base}/readme")
        has_readme = True
    except urllib.error.HTTPError as error:
        if error.code != 404:
            raise
        has_readme = False
    return {
        "repo": normalized,
        "head_sha": _git_head_sha(normalized),
        "archived": bool(data.get("archived")),
        "stars": int(data.get("stargazers_count") or 0),
        "pushed_at": str(data.get("pushed_at") or ""),
        "has_readme": has_readme,
        "api_license": spdx,
        "text_license": spdx,
        "topics": list(data.get("topics") or []),
        "description": str(data.get("description") or ""),
    }


def _load_catalog(path: Path) -> list[dict]:
    data = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(data, list):
        raise ValueError("catalog must be a JSON array")
    return data


def main(argv: list[str] | None = None, fetcher: Fetcher | None = None) -> int:
    parser = argparse.ArgumentParser(description="核验 AstraCraft 上游元数据")
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--refresh", action="store_true", help="联网刷新并写入快照")
    mode.add_argument("--check", action="store_true", help="只比较，不写入快照")
    source = parser.add_mutually_exclusive_group(required=True)
    source.add_argument("--catalog", type=Path, help="待核验 JSON 数组")
    source.add_argument("--candidates", type=Path, help="候选清单 JSON")
    parser.add_argument("--candidate-priority", default="primary")
    parser.add_argument("--merge", action="store_true", help="保留现有快照并合并本次结果")
    parser.add_argument("--snapshot", type=Path, default=Path("verification/upstream-snapshot.json"))
    args = parser.parse_args(argv)

    generated_at = datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    if args.candidates:
        raw_candidates = json.loads(args.candidates.read_text(encoding="utf-8"))
        entries = candidate_entries(raw_candidates, args.candidate_priority)
    else:
        entries = _load_catalog(args.catalog)
    fresh, blocked = build_snapshot(entries, fetcher or fetch_github_facts, generated_at)
    if args.refresh:
        if args.merge and args.snapshot.exists():
            current = json.loads(args.snapshot.read_text(encoding="utf-8"))
            fresh = merge_snapshots(current, fresh)
        write_snapshot_atomic(args.snapshot, fresh)
        return blocked

    if not args.snapshot.exists():
        return 1
    current = json.loads(args.snapshot.read_text(encoding="utf-8"))
    drifted = current.get("entries") != fresh.get("entries")
    return int(blocked or drifted)


if __name__ == "__main__":
    raise SystemExit(main())

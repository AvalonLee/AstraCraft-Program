#!/usr/bin/env python3
"""Refresh or check reproducible upstream verification snapshots."""

from __future__ import annotations

import argparse
import json
import os
import tempfile
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from typing import Callable

from scripts.upstream_verify import UpstreamFacts, normalize_github_repo, verify_entry


Fetcher = Callable[[str], dict]


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


def _request_json(url: str) -> dict:
    headers = {"Accept": "application/vnd.github+json", "User-Agent": "AstraCraft-Upstream-Verify"}
    token = os.environ.get("GITHUB_TOKEN")
    if token:
        headers["Authorization"] = f"Bearer {token}"
    request = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(request, timeout=20) as response:
        return json.load(response)


def fetch_github_facts(repo: str) -> dict:
    normalized = normalize_github_repo(repo)
    owner_repo = normalized.removeprefix("https://github.com/")
    base = f"https://api.github.com/repos/{owner_repo}"
    data = _request_json(base)
    default_branch = str(data.get("default_branch") or "")
    commit_data = _request_json(f"{base}/commits/{default_branch}") if default_branch else {}
    try:
        license_data = _request_json(f"{base}/license")
        spdx = str((license_data.get("license") or {}).get("spdx_id") or "UNKNOWN")
    except urllib.error.HTTPError as error:
        if error.code != 404:
            raise
        spdx = "UNKNOWN"
    try:
        _request_json(f"{base}/readme")
        has_readme = True
    except urllib.error.HTTPError as error:
        if error.code != 404:
            raise
        has_readme = False
    return {
        "repo": normalized,
        "head_sha": str(commit_data.get("sha") or ""),
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
    parser.add_argument("--catalog", type=Path, required=True, help="待核验 JSON 数组")
    parser.add_argument("--snapshot", type=Path, default=Path("verification/upstream-snapshot.json"))
    args = parser.parse_args(argv)

    generated_at = datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    fresh, blocked = build_snapshot(_load_catalog(args.catalog), fetcher or fetch_github_facts, generated_at)
    if args.refresh:
        write_snapshot_atomic(args.snapshot, fresh)
        return blocked

    if not args.snapshot.exists():
        return 1
    current = json.loads(args.snapshot.read_text(encoding="utf-8"))
    drifted = current.get("entries") != fresh.get("entries")
    return int(blocked or drifted)


if __name__ == "__main__":
    raise SystemExit(main())

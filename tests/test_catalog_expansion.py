import json
from pathlib import Path

import pytest

from scripts._common import discover_entries
from scripts.select_candidates import CandidateCapacityError, select_candidates


ROOT = Path(__file__).resolve().parents[1]
TARGETS = {"dev-engineering", "data-analytics", "research-intel", "ops-automation", "dsh"}


def load_candidates() -> dict:
    return json.loads((ROOT / "verification/candidates.json").read_text(encoding="utf-8"))


def test_candidates_have_five_primary_and_two_fallback_per_category() -> None:
    data = load_candidates()
    assert set(data) == TARGETS
    for category, candidates in data.items():
        assert len([item for item in candidates if item["priority"] == "primary"]) == 5
        assert len([item for item in candidates if item["priority"] == "fallback"]) >= 2
        assert all(item["category"] == category for item in candidates)


def test_candidate_repositories_are_unique_github_urls() -> None:
    candidates = [item for values in load_candidates().values() for item in values]
    repos = [item["repo"] for item in candidates]
    assert len(repos) == len(set(repo.lower() for repo in repos))
    assert all(repo.startswith("https://github.com/") for repo in repos)


def test_selector_replaces_blocked_primary_only_with_same_category_fallback() -> None:
    data = load_candidates()
    statuses = {
        item["repo"]: ("blocked" if item["priority"] == "primary" and item["coverage_code"].endswith("-1") else "verified")
        for values in data.values()
        for item in values
    }

    selected = select_candidates(data, statuses, per_category=5)

    for category, items in selected.items():
        assert len(items) == 5
        assert all(item["category"] == category for item in items)
        assert all(statuses[item["repo"]] != "blocked" for item in items)


def test_selector_fails_when_category_has_insufficient_capacity() -> None:
    data = load_candidates()
    statuses = {item["repo"]: "blocked" for item in data["dsh"]}

    with pytest.raises(CandidateCapacityError) as exc:
        select_candidates({"dsh": data["dsh"]}, statuses, per_category=5)

    assert exc.value.code == "E_CATEGORY_CAPACITY"


def test_selector_matches_normalized_repository_urls() -> None:
    data = {"research-intel": [{"category":"research-intel","repo":"https://github.com/Future-House/paper-qa","priority":"primary","coverage_code":"research-1"}]}
    with pytest.raises(CandidateCapacityError):
        select_candidates(data, {"https://github.com/future-house/paper-qa": "blocked"}, per_category=1)


def test_expanded_categories_have_five_entries_each() -> None:
    counts = {category: 0 for category in TARGETS}
    for entry in discover_entries():
        if entry.category_dir in counts:
            counts[entry.category_dir] += 1
    assert counts == {category: 5 for category in TARGETS}


def test_expanded_entries_match_selected_upstream_snapshot() -> None:
    snapshot = json.loads((ROOT / "verification/upstream-snapshot.json").read_text(encoding="utf-8"))["entries"]
    entries = [entry for entry in discover_entries() if entry.category_dir in TARGETS]
    repos = [entry.meta["repo"].lower() for entry in entries]
    assert len(repos) == len(set(repos)) == 25
    by_repo = {value["repo"].lower(): value for value in snapshot.values()}
    for entry in entries:
        upstream = by_repo[entry.meta["repo"].lower()]
        assert upstream["status"] != "blocked"
        assert entry.meta["license"] == upstream["license"]
        if upstream["status"] == "needs-review":
            assert entry.tier == "watch"

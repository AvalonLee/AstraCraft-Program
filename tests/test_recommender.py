import json
from pathlib import Path

import pytest

from scripts._common import discover_entries
from scripts.recommender import ProjectProfile, recommend, score_entry


FIXTURES = Path(__file__).parent / "fixtures"


def load_catalog() -> list[dict]:
    return json.loads((FIXTURES / "catalog/recommender-catalog.json").read_text(encoding="utf-8"))


def load_profile() -> ProjectProfile:
    return ProjectProfile.from_dict(
        json.loads((FIXTURES / "projects/dev.json").read_text(encoding="utf-8"))
    )


def test_score_explains_every_matching_signal() -> None:
    scored = score_entry(load_catalog()[0], load_profile())

    assert scored.score == 11
    assert scored.reasons == (
        "CATEGORY_MATCH:+3",
        "TAG_MATCH:python:+2",
        "TAG_MATCH:testing:+2",
        "KIND_MATCH:+1",
        "TIER_STANDARD:+1",
        "LICENSE_MATCH:+1",
        "DOC_LANGUAGE_MATCH:+1",
    )


def test_unknown_license_is_penalized_for_commercial_profile() -> None:
    scored = score_entry(load_catalog()[1], load_profile())
    assert "LICENSE_COMMERCIAL_RISK:-2" in scored.reasons


def test_non_verified_entries_are_excluded() -> None:
    ids = [item.id for item in recommend(load_catalog(), load_profile(), limit=3)]
    assert "blocked-best-match" not in ids


def test_recommendation_is_limited_and_ranked() -> None:
    results = recommend(load_catalog(), load_profile(), limit=2)
    assert [item.id for item in results] == ["testing-pro", "testing-unknown"]


def test_ties_use_health_then_id() -> None:
    base = load_catalog()[0]
    entries = [
        {**base, "id": "z-last", "health_score": 80},
        {**base, "id": "b-second", "health_score": 90},
        {**base, "id": "a-first", "health_score": 90},
    ]
    assert [item.id for item in recommend(entries, load_profile(), limit=3)] == [
        "a-first",
        "b-second",
        "z-last",
    ]


@pytest.mark.parametrize(
    ("category", "tags"),
    [
        ("dev-engineering", ["software-engineering", "testing"]),
        ("data-analytics", ["data-analytics", "python"]),
        ("research-intel", ["research", "search"]),
        ("ops-automation", ["ops-automation", "automation"]),
        ("dsh", ["dsh", "plugin"]),
    ],
)
def test_real_catalog_recalls_each_expanded_category(category: str, tags: list[str]) -> None:
    root = Path(__file__).resolve().parents[1]
    snapshot = json.loads((root / "verification/upstream-snapshot.json").read_text(encoding="utf-8"))["entries"]
    upstream_by_repo = {value["repo"].lower(): value for value in snapshot.values()}
    catalog = []
    for entry in discover_entries():
        upstream = upstream_by_repo.get(str(entry.meta.get("repo", "")).lower())
        if not upstream:
            continue
        catalog.append({
            **entry.meta,
            "verification_status": upstream["status"],
            "health_score": upstream["health_score"],
        })
    profile = ProjectProfile.from_dict({
        "categories": [category],
        "tags": tags,
        "desired_kinds": ["skill", "skill-collection", "framework", "cli-tool"],
        "commercial": False,
        "offline": False,
        "doc_languages": ["zh"],
    })

    results = recommend(catalog, profile, limit=3)

    by_id = {entry.meta["id"]: entry.category_dir for entry in discover_entries()}
    assert sum(by_id[result.id] == category for result in results) >= 2

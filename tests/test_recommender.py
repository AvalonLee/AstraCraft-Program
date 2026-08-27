import json
from pathlib import Path

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

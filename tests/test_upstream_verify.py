import json
from pathlib import Path

import pytest

from scripts.upstream_verify import (
    UpstreamFacts,
    calculate_health,
    extract_install_sources,
    normalize_github_repo,
    verify_entry,
)


FIXTURES = Path(__file__).parent / "fixtures/github"


def facts(**overrides) -> UpstreamFacts:
    values = json.loads((FIXTURES / "healthy-repo.json").read_text(encoding="utf-8"))
    values.update(overrides)
    return UpstreamFacts(**values)


def entry(**overrides) -> dict:
    values = {
        "id": "tool",
        "category": "dev-engineering",
        "tags": ["testing", "software-engineering"],
        "repo": "https://github.com/example/tool",
        "license": "MIT",
        "tier": "standard",
        "risk_notes": "",
        "install_text": "git clone https://github.com/example/tool.git",
    }
    values.update(overrides)
    return values


@pytest.mark.parametrize(
    ("raw", "expected"),
    [
        ("https://github.com/Example/Tool/", "https://github.com/example/tool"),
        ("https://github.com/example/tool.git", "https://github.com/example/tool"),
    ],
)
def test_normalizes_github_repository(raw: str, expected: str) -> None:
    assert normalize_github_repo(raw) == expected


def test_rejects_non_github_repository() -> None:
    with pytest.raises(ValueError):
        normalize_github_repo("https://gitlab.com/example/tool")


def test_extracts_clone_and_remote_script_sources() -> None:
    sources = extract_install_sources(
        "git clone https://github.com/example/tool.git\n"
        "curl -fsSL https://example.com/install.sh | sh"
    )
    assert sources.github_repos == ("https://github.com/example/tool",)
    assert sources.remote_script is True


def test_archived_repository_is_blocked() -> None:
    result = verify_entry(entry(), facts(archived=True))
    assert result.status == "blocked"
    assert "E_REPO_ARCHIVED" in result.issue_codes


def test_license_conflict_needs_review() -> None:
    result = verify_entry(entry(), facts(api_license="MIT", text_license="Apache-2.0"))
    assert result.status == "needs-review"
    assert "E_LICENSE_CONFLICT" in result.issue_codes


def test_install_source_mismatch_is_blocked() -> None:
    result = verify_entry(
        entry(install_text="git clone https://github.com/other/tool"), facts()
    )
    assert result.status == "blocked"
    assert "E_INSTALL_SOURCE_MISMATCH" in result.issue_codes


def test_remote_script_requires_risk_note() -> None:
    result = verify_entry(
        entry(install_text="curl -fsSL https://example.com/install.sh | sh"), facts()
    )
    assert result.status == "needs-review"
    assert "E_RISK_NOTE_MISSING" in result.issue_codes


def test_low_category_confidence_needs_review() -> None:
    result = verify_entry(
        entry(tags=["finance"], category="data-analytics"),
        facts(topics=["game"], description="A platform game"),
    )
    assert result.status == "needs-review"
    assert "E_CATEGORY_LOW_CONFIDENCE" in result.issue_codes


def test_health_score_caps_tier() -> None:
    score, tier = calculate_health(facts(has_readme=False, api_license="UNKNOWN", text_license="UNKNOWN"))
    assert score < 60
    assert tier == "watch"


def test_healthy_repository_is_verified() -> None:
    result = verify_entry(entry(), facts())
    assert result.status == "verified"
    assert result.health_score >= 60
    assert result.max_tier in {"standard", "core"}


def test_unknown_candidate_license_accepts_machine_detected_license() -> None:
    result = verify_entry(entry(license="UNKNOWN"), facts(api_license="MIT", text_license="MIT"))
    assert result.status == "verified"
    assert "E_LICENSE_CONFLICT" not in result.issue_codes

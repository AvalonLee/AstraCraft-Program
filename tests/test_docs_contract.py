from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def test_format_documents_exist_and_name_both_record_types() -> None:
    catalog = read("docs/catalog-format.md")
    installable = read("docs/installable-skill-format.md")
    assert "entry-record" in catalog
    assert "installable-skill" in catalog
    assert "entry-record" in installable
    assert "installable-skill" in installable


def test_readme_forbids_installing_catalog_entries() -> None:
    readme = read("README.md")
    assert "entry-record" in readme
    assert "installable-skill" in readme
    assert "禁止把 `entries/`" in readme


def test_verification_policy_documents_refresh_and_exception_path() -> None:
    policy = read("docs/verification-policy.md")
    assert "python scripts/verify_upstreams.py --refresh" in policy
    assert "needs-review" in policy
    assert "人工" in policy


def test_contributing_uses_current_non_vendoring_language() -> None:
    contributing = read("docs/CONTRIBUTING.md")
    assert "record_type: entry-record" in contributing
    assert "不收录上游源码" in contributing

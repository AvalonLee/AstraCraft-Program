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


def test_readme_names_the_entry_skill_boundary() -> None:
    readme = read("README.md")
    assert "entry-record" in readme
    assert "installable-skill" in readme
    assert "ENTRY.md" in readme
    assert "不收：" in readme


def test_verification_policy_documents_refresh_and_exception_path() -> None:
    policy = read("docs/verification-policy.md")
    assert "python scripts/verify_upstreams.py --refresh" in policy
    assert "--entries" in policy
    assert "needs-review" in policy
    assert "人工" in policy


def test_contributing_uses_entry_md_and_mode() -> None:
    contributing = read("docs/CONTRIBUTING.md")
    assert "record_type: entry-record" in contributing
    assert "ENTRY.md" in contributing
    assert "不收录源码快照" in contributing
    assert "`mode`" in contributing

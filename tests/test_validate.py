from scripts._common import REPO_ROOT, discover_entries
from scripts.catalog_types import RecordType, parse_catalog_document, validate_document_boundary


def test_root_is_the_only_installable_skill() -> None:
    root = parse_catalog_document(REPO_ROOT / "SKILL.md", REPO_ROOT)
    validate_document_boundary(root)

    assert root.record_type is RecordType.INSTALLABLE_SKILL
    assert all(
        parse_catalog_document(entry.skill_file, REPO_ROOT).record_type
        is RecordType.ENTRY_RECORD
        for entry in discover_entries()
    )


def test_all_current_entries_pass_the_format_boundary() -> None:
    entries = discover_entries()

    assert len(entries) == 38
    for entry in entries:
        validate_document_boundary(parse_catalog_document(entry.skill_file, REPO_ROOT))

import json

from scripts._common import REPO_ROOT, discover_entries
from scripts.catalog_types import RecordType, parse_catalog_document, validate_document_boundary


def test_root_is_the_only_installable_skill() -> None:
    root = parse_catalog_document(REPO_ROOT / "SKILL.md", REPO_ROOT)
    validate_document_boundary(root)

    assert root.record_type is RecordType.INSTALLABLE_SKILL
    assert all(
        parse_catalog_document(entry.entry_file, REPO_ROOT).record_type
        is RecordType.ENTRY_RECORD
        for entry in discover_entries()
    )


def test_all_current_entries_pass_the_format_boundary() -> None:
    entries = discover_entries()

    version = json.loads((REPO_ROOT / "data-version.json").read_text(encoding="utf-8"))
    assert len(entries) == version["entry_count"]
    for entry in entries:
        validate_document_boundary(parse_catalog_document(entry.entry_file, REPO_ROOT))


def test_extract_section_code_skips_fence_language() -> None:
    from scripts._common import extract_section_code

    body = "## 怎么接入\n\n```bash\necho ok\n```\n\n## 怎么用\n"
    assert extract_section_code(body, ("## 怎么接入",)) == "echo ok"
    assert extract_section_code(body, ("## 怎么部署运行",)) == ""

from pathlib import Path

import pytest

from scripts.catalog_types import (
    CatalogFormatError,
    RecordType,
    parse_catalog_document,
    validate_document_boundary,
)


def write_doc(path: Path, frontmatter: str, body: str = "## 怎么安装\n\n```bash\necho ok\n```\n") -> Path:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(f"---\n{frontmatter.strip()}\n---\n\n{body}", encoding="utf-8")
    return path


def test_parses_entry_record(tmp_path: Path) -> None:
    path = write_doc(
        tmp_path / "entries/dev-engineering/demo/SKILL.md",
        "record_type: entry-record\nid: demo\ncategory: dev-engineering",
    )

    doc = parse_catalog_document(path, tmp_path)

    assert doc.record_type is RecordType.ENTRY_RECORD
    assert doc.relative_path == Path("entries/dev-engineering/demo/SKILL.md")


def test_parses_installable_root_skill(tmp_path: Path) -> None:
    path = write_doc(
        tmp_path / "SKILL.md",
        "record_type: installable-skill\nname: recommender\ndescription: recommends entries",
    )

    doc = parse_catalog_document(path, tmp_path)

    assert doc.record_type is RecordType.INSTALLABLE_SKILL


@pytest.mark.parametrize(
    ("relative_path", "frontmatter", "code"),
    [
        ("entries/dev-engineering/demo/SKILL.md", "id: demo", "E_RECORD_TYPE_MISSING"),
        (
            "entries/dev-engineering/demo/SKILL.md",
            "record_type: installable-skill\nname: demo\ndescription: demo",
            "E_ENTRY_AS_SKILL",
        ),
        ("SKILL.md", "record_type: entry-record\nid: demo", "E_ROOT_AS_ENTRY"),
    ],
)
def test_rejects_missing_or_mixed_record_types(
    tmp_path: Path, relative_path: str, frontmatter: str, code: str
) -> None:
    doc = parse_catalog_document(write_doc(tmp_path / relative_path, frontmatter), tmp_path)

    with pytest.raises(CatalogFormatError) as exc:
        validate_document_boundary(doc)

    assert exc.value.code == code


def test_rejects_entry_that_installs_itself(tmp_path: Path) -> None:
    path = write_doc(
        tmp_path / "entries/dev-engineering/demo/SKILL.md",
        "record_type: entry-record\nid: demo\ncategory: dev-engineering",
        "## 怎么安装\n\n```bash\ncurl https://example.test/repo/entries/dev-engineering/demo/SKILL.md -o ~/.codex/skills/demo/SKILL.md\n```\n",
    )
    doc = parse_catalog_document(path, tmp_path)

    with pytest.raises(CatalogFormatError) as exc:
        validate_document_boundary(doc)

    assert exc.value.code == "E_ENTRY_INSTALL_SELF"

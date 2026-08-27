"""Machine-checkable boundary between catalog records and installable skills."""

from __future__ import annotations

from dataclasses import dataclass
from enum import Enum
from pathlib import Path
from typing import Any

import yaml


class RecordType(str, Enum):
    ENTRY_RECORD = "entry-record"
    INSTALLABLE_SKILL = "installable-skill"


class CatalogFormatError(ValueError):
    def __init__(self, code: str, path: Path, message: str) -> None:
        super().__init__(f"{code} [{path.as_posix()}] {message}")
        self.code = code
        self.path = path
        self.message = message


@dataclass(frozen=True)
class CatalogDocument:
    path: Path
    relative_path: Path
    record_type: RecordType | None
    meta: dict[str, Any]
    body: str


def _split_frontmatter(text: str) -> tuple[dict[str, Any], str]:
    if not text.startswith("---\n"):
        return {}, text
    end = text.find("\n---", 4)
    if end < 0:
        return {}, text
    loaded = yaml.safe_load(text[4:end]) or {}
    meta = loaded if isinstance(loaded, dict) else {}
    return meta, text[end + 4 :].lstrip("\n")


def parse_catalog_document(path: Path, repo_root: Path) -> CatalogDocument:
    meta, body = _split_frontmatter(path.read_text(encoding="utf-8"))
    raw_type = meta.get("record_type")
    try:
        record_type = RecordType(raw_type) if raw_type else None
    except ValueError:
        record_type = None
    return CatalogDocument(
        path=path,
        relative_path=path.relative_to(repo_root),
        record_type=record_type,
        meta=meta,
        body=body,
    )


def validate_document_boundary(document: CatalogDocument) -> None:
    rel = document.relative_path.as_posix()
    is_entry = rel.startswith("entries/")
    is_root_skill = rel == "SKILL.md"
    if document.record_type is None:
        raise CatalogFormatError(
            "E_RECORD_TYPE_MISSING", document.relative_path, "missing or invalid record_type"
        )
    if is_entry and document.record_type is RecordType.INSTALLABLE_SKILL:
        raise CatalogFormatError(
            "E_ENTRY_AS_SKILL", document.relative_path, "catalog entries are data, not skills"
        )
    if is_root_skill and document.record_type is RecordType.ENTRY_RECORD:
        raise CatalogFormatError(
            "E_ROOT_AS_ENTRY", document.relative_path, "root recommender must be installable"
        )
    if is_entry and "/entries/" in document.body and "SKILL.md" in document.body:
        raise CatalogFormatError(
            "E_ENTRY_INSTALL_SELF",
            document.relative_path,
            "entry installation must point to its upstream project",
        )

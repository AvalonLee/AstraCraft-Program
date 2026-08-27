#!/usr/bin/env python3
"""Deterministic catalog pre-ranking with explainable score reasons."""

from __future__ import annotations

import argparse
import json
from dataclasses import dataclass
from pathlib import Path


OPEN_LICENSES = {
    "MIT", "MIT-0", "Apache-2.0", "BSD-2-Clause", "BSD-3-Clause", "ISC",
    "CC0-1.0", "CC-BY-4.0", "MPL-2.0", "LGPL-3.0", "GPL-3.0", "AGPL-3.0",
}
RESTRICTED_LICENSES = {"UNKNOWN", "Commercial", "Proprietary", "CC-BY-NC-4.0"}


@dataclass(frozen=True)
class ProjectProfile:
    categories: tuple[str, ...]
    tags: tuple[str, ...]
    desired_kinds: tuple[str, ...]
    commercial: bool
    offline: bool
    doc_languages: tuple[str, ...]

    @classmethod
    def from_dict(cls, value: dict) -> "ProjectProfile":
        return cls(
            tuple(value.get("categories") or []),
            tuple(sorted({str(tag).lower() for tag in value.get("tags") or []})),
            tuple(value.get("desired_kinds") or []),
            bool(value.get("commercial")),
            bool(value.get("offline")),
            tuple(value.get("doc_languages") or []),
        )


@dataclass(frozen=True)
class ScoredEntry:
    id: str
    score: int
    health_score: int
    reasons: tuple[str, ...]

    def to_dict(self) -> dict:
        return {"id": self.id, "score": self.score, "health_score": self.health_score, "reasons": list(self.reasons)}


def score_entry(entry: dict, profile: ProjectProfile) -> ScoredEntry:
    score = 0
    reasons: list[str] = []
    if entry.get("category") in profile.categories:
        score += 3
        reasons.append("CATEGORY_MATCH:+3")
    for tag in sorted(set(entry.get("tags") or []) & set(profile.tags)):
        score += 2
        reasons.append(f"TAG_MATCH:{tag}:+2")
    if entry.get("kind") in profile.desired_kinds:
        score += 1
        reasons.append("KIND_MATCH:+1")
    tier = entry.get("tier")
    if tier == "core":
        score += 2
        reasons.append("TIER_CORE:+2")
    elif tier == "standard":
        score += 1
        reasons.append("TIER_STANDARD:+1")
    license_id = str(entry.get("license", "UNKNOWN"))
    if profile.commercial and license_id in RESTRICTED_LICENSES:
        score -= 2
        reasons.append("LICENSE_COMMERCIAL_RISK:-2")
    elif license_id in OPEN_LICENSES:
        score += 1
        reasons.append("LICENSE_MATCH:+1")
    if set(entry.get("doc_languages") or []) & set(profile.doc_languages):
        score += 1
        reasons.append("DOC_LANGUAGE_MATCH:+1")
    risk = str(entry.get("risk_notes") or "").lower()
    if profile.offline and any(word in risk for word in ("network", "联网", "cloud", "云端")):
        score -= 3
        reasons.append("RISK_CONFLICT:-3")
    return ScoredEntry(str(entry.get("id", "")), score, int(entry.get("health_score") or 0), tuple(reasons))


def recommend(entries: list[dict], profile: ProjectProfile, limit: int = 3) -> list[ScoredEntry]:
    eligible = [entry for entry in entries if entry.get("verification_status") == "verified"]
    scored = [score_entry(entry, profile) for entry in eligible]
    return sorted(scored, key=lambda item: (-item.score, -item.health_score, item.id))[:limit]


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="AstraCraft 确定性推荐初筛")
    parser.add_argument("--catalog", type=Path, required=True)
    parser.add_argument("--profile", type=Path, required=True)
    parser.add_argument("--limit", type=int, default=3)
    args = parser.parse_args(argv)
    entries = json.loads(args.catalog.read_text(encoding="utf-8"))
    profile = ProjectProfile.from_dict(json.loads(args.profile.read_text(encoding="utf-8")))
    print(json.dumps([item.to_dict() for item in recommend(entries, profile, args.limit)], ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

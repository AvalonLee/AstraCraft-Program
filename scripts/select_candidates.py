"""Select verified catalog candidates without crossing category boundaries."""

from __future__ import annotations


class CandidateCapacityError(ValueError):
    code = "E_CATEGORY_CAPACITY"


def select_candidates(candidates: dict[str, list[dict]], statuses: dict[str, str], per_category: int = 5) -> dict[str, list[dict]]:
    normalized_statuses = {repo.lower().rstrip("/"): status for repo, status in statuses.items()}
    selected: dict[str, list[dict]] = {}
    for category, items in candidates.items():
        ordered = sorted(items, key=lambda item: (item["priority"] != "primary", item["coverage_code"]))
        eligible = [item for item in ordered if normalized_statuses.get(item["repo"].lower().rstrip("/")) != "blocked"]
        if len(eligible) < per_category:
            raise CandidateCapacityError(f"{category}: need {per_category}, found {len(eligible)}")
        selected[category] = eligible[:per_category]
    return selected

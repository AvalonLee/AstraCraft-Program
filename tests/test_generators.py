import json
from pathlib import Path

from scripts.gen_site import outputs_match


def test_generated_timestamp_does_not_cause_site_drift(tmp_path: Path) -> None:
    data = tmp_path / "data"
    skills = tmp_path / "skills"
    data.mkdir()
    skills.mkdir()
    stored = {"generated_at": "old", "count": 1, "categories": [], "skills": [{"id": "a"}]}
    fresh = {"generated_at": "new", "count": 1, "categories": [], "skills": [{"id": "a"}]}
    (data / "skills.json").write_text(json.dumps(stored), encoding="utf-8")
    (skills / "a.html").write_text("detail", encoding="utf-8")

    assert outputs_match(fresh, {"a.html": "detail"}, data, skills) is True


def test_real_site_drift_is_detected_without_writing(tmp_path: Path) -> None:
    data = tmp_path / "data"
    skills = tmp_path / "skills"
    data.mkdir()
    skills.mkdir()
    stored = {"generated_at": "old", "count": 1, "categories": [], "skills": [{"id": "a"}]}
    fresh = {"generated_at": "new", "count": 2, "categories": [], "skills": [{"id": "a"}, {"id": "b"}]}
    original = json.dumps(stored)
    (data / "skills.json").write_text(original, encoding="utf-8")
    (skills / "a.html").write_text("old detail", encoding="utf-8")

    assert outputs_match(fresh, {"a.html": "new detail", "b.html": "detail"}, data, skills) is False
    assert (data / "skills.json").read_text(encoding="utf-8") == original
    assert (skills / "a.html").read_text(encoding="utf-8") == "old detail"

"""Pure, deterministic rules for auditing catalog upstreams."""

from __future__ import annotations

import re
from dataclasses import dataclass
from urllib.parse import urlparse


CATEGORY_KEYWORDS = {
    "dev-engineering": {"testing", "developer-tools", "software-engineering", "code-review", "debugging", "security"},
    "data-analytics": {"data", "analytics", "visualization", "statistics", "notebook", "database"},
    "research-intel": {"research", "search", "literature", "science", "intelligence", "papers"},
    "ops-automation": {"devops", "automation", "deployment", "infrastructure", "workflow", "monitoring"},
    "dsh": {"dsh", "deepseek-harness", "plugin", "cordis"},
}


@dataclass(frozen=True)
class UpstreamFacts:
    repo: str
    head_sha: str
    archived: bool
    stars: int
    pushed_at: str
    has_readme: bool
    api_license: str
    text_license: str
    topics: list[str]
    description: str


@dataclass(frozen=True)
class InstallSources:
    github_repos: tuple[str, ...]
    remote_script: bool


@dataclass(frozen=True)
class VerificationIssue:
    code: str
    severity: str
    message: str


@dataclass(frozen=True)
class VerificationResult:
    status: str
    health_score: int
    max_tier: str
    issues: tuple[VerificationIssue, ...]

    @property
    def issue_codes(self) -> tuple[str, ...]:
        return tuple(issue.code for issue in self.issues)


def normalize_github_repo(raw: str) -> str:
    parsed = urlparse(raw.strip())
    if parsed.scheme != "https" or parsed.netloc.lower() != "github.com":
        raise ValueError("repository must use https://github.com/<owner>/<repo>")
    parts = [part for part in parsed.path.strip("/").split("/") if part]
    if len(parts) != 2:
        raise ValueError("repository must identify exactly one GitHub repository")
    owner, repo = parts
    if repo.endswith(".git"):
        repo = repo[:-4]
    if not owner or not repo:
        raise ValueError("repository owner and name are required")
    return f"https://github.com/{owner.lower()}/{repo.lower()}"


def extract_install_sources(text: str) -> InstallSources:
    raw_urls = re.findall(r"https://github\.com/[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+", text)
    repos = tuple(dict.fromkeys(normalize_github_repo(url) for url in raw_urls))
    remote_script = bool(
        re.search(r"(?:curl|wget)[^\n|]*\|\s*(?:sh|bash)\b", text, re.IGNORECASE)
    )
    return InstallSources(github_repos=repos, remote_script=remote_script)


def calculate_health(facts: UpstreamFacts) -> tuple[int, str]:
    score = 100
    if facts.archived:
        score -= 70
    if not facts.has_readme:
        score -= 35
    if facts.api_license in {"", "UNKNOWN", "NOASSERTION"}:
        score -= 25
    if not facts.head_sha:
        score -= 20
    score = max(0, min(100, score))
    if score >= 85:
        tier = "core"
    elif score >= 60:
        tier = "standard"
    elif score >= 40:
        tier = "watch"
    else:
        tier = "blocked"
    return score, tier


def _category_confidence(entry: dict, facts: UpstreamFacts) -> float:
    category = str(entry.get("category", ""))
    expected = CATEGORY_KEYWORDS.get(category, set())
    haystack = {str(item).lower() for item in facts.topics}
    haystack.update(str(item).lower() for item in entry.get("tags", []))
    description = facts.description.lower()
    matches = sum(1 for word in expected if word in haystack or word in description)
    return min(1.0, matches / 2) if expected else 1.0


def verify_entry(entry: dict, facts: UpstreamFacts) -> VerificationResult:
    issues: list[VerificationIssue] = []
    if facts.archived:
        issues.append(VerificationIssue("E_REPO_ARCHIVED", "blocked", "repository is archived"))

    if facts.api_license != facts.text_license:
        issues.append(
            VerificationIssue("E_LICENSE_CONFLICT", "review", "GitHub and LICENSE text disagree")
        )
    declared = str(entry.get("license", "UNKNOWN"))
    if facts.api_license not in {"UNKNOWN", "NOASSERTION", ""} and declared != facts.api_license:
        issues.append(
            VerificationIssue("E_LICENSE_CONFLICT", "review", "entry and upstream license disagree")
        )

    sources = extract_install_sources(str(entry.get("install_text", "")))
    expected_repo = normalize_github_repo(str(entry.get("repo", "")))
    if sources.github_repos and expected_repo not in sources.github_repos:
        issues.append(
            VerificationIssue("E_INSTALL_SOURCE_MISMATCH", "blocked", "install source differs from repo")
        )
    if sources.remote_script and not str(entry.get("risk_notes", "")).strip():
        issues.append(
            VerificationIssue("E_RISK_NOTE_MISSING", "review", "remote script risk is undocumented")
        )

    if _category_confidence(entry, facts) < 0.5:
        issues.append(
            VerificationIssue("E_CATEGORY_LOW_CONFIDENCE", "review", "upstream metadata weakly matches category")
        )

    health_score, max_tier = calculate_health(facts)
    if any(issue.severity == "blocked" for issue in issues) or max_tier == "blocked":
        status = "blocked"
    elif issues:
        status = "needs-review"
    else:
        status = "verified"
    return VerificationResult(status, health_score, max_tier, tuple(issues))

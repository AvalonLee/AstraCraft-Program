// AstraCraft Program（天工计划）预览站前端逻辑（视觉对齐 awesome-design-md-cn）。
// 读 data/skills.json，渲染卡片并支持搜索 + chip 多维筛选。
(function () {
  "use strict";

  var DATA_URL = "data/skills.json";
  var GROUPS = ["category", "mode", "tag", "tier", "license"];
  var MODE_ORDER = ["install", "connect", "deploy", "read"];
  var TAG_LIMIT = 20;     // 标签折叠态兜底上限：有效标签过多时仍只显示前 N 个
  var TAG_MIN_COUNT = 2;  // 折叠态仅展示被 >=2 个条目使用的「有效标签」，单例标签默认折叠
  var RANDOM_PICK_COUNT = 4;

  // 评级（tier）视觉分类：tier_label -> 配色档（与 style.css .tier-* 对应）
  var TIER_CLASS = { "主推": "core", "常规": "standard", "观察": "watch" };

  // 协议直观分类：分桶结果由 skills.json 的 license_bucket 提供（生成侧 scripts/gen_site.py）
  var BUCKET_META = {
    open:       { label: "完全开源", desc: "宽松许可（MIT / BSD / Apache / ISC / CC0 等）：可商用、可闭源，仅需保留原作者署名。" },
    copyleft:   { label: "部分开源", desc: "Copyleft 许可（GPL / LGPL / MPL / AGPL 等）：可自由使用与修改，但衍生作品须以相同或兼容协议开源。" },
    commercial: { label: "商用需授权", desc: "专有 / 源码可见但受限（Commercial / Source-Available / NC / PolyForm / BUSL / SSPL 等）：商用须另行取得授权或有使用限制，多数仍可免费用于非商业场景；使用前请确认条款。" },
    unknown:    { label: "版权未声明", desc: "仓库未附 LICENSE 文件：默认保留所有权利，他人无权擅自使用，使用前须获作者明确许可。" }
  };
  var BUCKET_ORDER = ["open", "copyleft", "commercial", "unknown"];
  function licenseBucket(s) {
    return (s && s.license_bucket) || "unknown";
  }

  var state = {
    skills: [],
    categories: [],
    sel: { category: null, mode: null, tag: null, tier: null, license: null },
    q: "",
  };

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function uniq(arr) {
    var seen = {}, out = [];
    arr.forEach(function (v) {
      if (v && !seen[v]) { seen[v] = 1; out.push(v); }
    });
    return out.sort(function (a, b) { return String(a).localeCompare(String(b), "zh"); });
  }

  function $(id) { return document.getElementById(id); }

  // ---- 构建 chip 筛选 ----
  function buildChips() {
    var cats = state.categories
      .map(function (c) { return { value: c.dir, label: c.name }; });
    var tagCounts = {};
    state.skills.forEach(function (s) {
      (s.tags || []).forEach(function (t) {
        if (t) tagCounts[t] = (tagCounts[t] || 0) + 1;
      });
    });
    var tags = Object.keys(tagCounts)
      .map(function (t) { return { value: t, label: t, count: tagCounts[t] }; })
      .sort(function (a, b) {
        if (b.count !== a.count) return b.count - a.count; // 项目数量多的在前
        return String(a.value).localeCompare(String(b.value), "zh");
      });
    var tiers = uniq(state.skills.map(function (s) { return s.tier_label; }))
      .map(function (t) { return { value: t, label: t }; });
    var modeNames = {};
    state.skills.forEach(function (s) { if (s.mode) modeNames[s.mode] = s.mode_label; });
    var modes = MODE_ORDER.filter(function (m) { return modeNames[m]; })
      .map(function (m) { return { value: m, label: modeNames[m] }; });
    var bucketCounts = {};
    state.skills.forEach(function (s) {
      var k = licenseBucket(s);
      bucketCounts[k] = (bucketCounts[k] || 0) + 1;
    });

    fillChips("category-chips", "category", cats);
    fillChips("mode-chips", "mode", modes);
    fillTagChips(tags);
    fillChips("tier-chips", "tier", tiers);
    fillLicenseChips(bucketCounts);
  }

  function fillChips(containerId, group, items) {
    var box = $(containerId);
    box.innerHTML = "";
    items.forEach(function (it) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      if (group === "tier") {
        var tk = TIER_CLASS[it.value] || "standard";
        b.innerHTML = '<span class="tier-dot tier-dot-' + tk + '"></span>' + esc(it.label);
      } else {
        b.textContent = it.label;
      }
      b.dataset.group = group;
      b.dataset.value = it.value;
      b.addEventListener("click", function () {
        var cur = state.sel[group];
        if (cur === it.value) {
          state.sel[group] = null;
          b.classList.remove("active");
        } else {
          // 同组单选：清掉其他 active
          Array.prototype.forEach.call(box.querySelectorAll(".chip.active"), function (el) {
            el.classList.remove("active");
          });
          state.sel[group] = it.value;
          b.classList.add("active");
        }
        render();
      });
      box.appendChild(b);
    });
  }

  // ---- 标签筛选：默认仅展示被 >=TAG_MIN_COUNT 个条目使用的「有效标签」，单例折叠 + 展开按钮 ----
  function fillTagChips(items) {
    var box = $("tag-chips");
    box.innerHTML = "";
    var effectiveCount = items.filter(function (it) { return it.count >= TAG_MIN_COUNT; }).length;
    var overflow = items.length > effectiveCount; // 存在单例标签需折叠

    items.forEach(function (it) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      b.textContent = it.label;
      b.dataset.group = "tag";
      b.dataset.value = it.value;
      b.dataset.count = String(it.count);
      b.title = it.count + " 个条目";
      // 默认折叠：单例标签（仅 1 个条目使用）隐藏；有效标签默认显示
      if (it.count < TAG_MIN_COUNT) b.classList.add("chip-hidden");
      b.addEventListener("click", function () {
        var cur = state.sel.tag;
        if (cur === it.value) {
          state.sel.tag = null;
          b.classList.remove("active");
        } else {
          Array.prototype.forEach.call(box.querySelectorAll(".chip.active"), function (el) {
            el.classList.remove("active");
          });
          state.sel.tag = it.value;
          b.classList.add("active");
        }
        applyTagCollapse();
        render();
      });
      box.appendChild(b);
    });

    if (overflow) {
      var more = document.createElement("button");
      more.type = "button";
      more.className = "chip chip-more";
      more.textContent = "…";
      more.title = "展开全部 " + items.length + " 个标签（含仅 1 个条目使用的单例标签）";
      more.dataset.expanded = "0";
      more.addEventListener("click", function () {
        var wasExpanded = more.dataset.expanded === "1";
        more.dataset.expanded = wasExpanded ? "0" : "1";
        more.textContent = wasExpanded ? "…" : "收起";
        applyTagCollapse();
      });
      box.appendChild(more);
    }
  }

  // 折叠/展开：展开时显示全部标签；收起时隐藏单例标签，但保留当前选中项可见
  function applyTagCollapse() {
    var box = $("tag-chips");
    var more = box.querySelector(".chip-more");
    if (!more) return;
    var expanded = more.dataset.expanded === "1";
    var shownEffective = 0;
    Array.prototype.forEach.call(box.querySelectorAll(".chip:not(.chip-more)"), function (el) {
      if (expanded) {
        el.classList.remove("chip-hidden");
        return;
      }
      var count = parseInt(el.dataset.count || "1", 10);
      if (el.classList.contains("active")) { // 选中态始终保留可见
        el.classList.remove("chip-hidden");
        return;
      }
      if (count >= TAG_MIN_COUNT) {
        // 有效标签：在 TAG_LIMIT 名额内显示（防止有效标签过多时仍溢出）
        var show = shownEffective < TAG_LIMIT;
        shownEffective++;
        el.classList.toggle("chip-hidden", !show);
      } else {
        el.classList.add("chip-hidden"); // 单例标签折叠
      }
    });
  }

  // ---- 协议筛选：按直观许可分类（完全开源 / 部分开源 / 商用需授权 / 版权未声明）展示 ----
  function fillLicenseChips(bucketCounts) {
    var box = $("license-chips");
    box.innerHTML = "";
    BUCKET_ORDER.forEach(function (key) {
      if (!bucketCounts[key]) return;
      var m = BUCKET_META[key];
      var b = document.createElement("button");
      b.type = "button";
      b.className = "chip chip-lic chip-lic-" + key;
      b.innerHTML = '<span class="lic-dot"></span>' + esc(m.label);
      b.title = m.desc + "（收录 " + bucketCounts[key] + " 个）";
      b.dataset.group = "license";
      b.dataset.value = key;
      b.addEventListener("click", function () {
        var cur = state.sel.license;
        if (cur === key) {
          state.sel.license = null;
          b.classList.remove("active");
        } else {
          Array.prototype.forEach.call(box.querySelectorAll(".chip.active"), function (el) {
            el.classList.remove("active");
          });
          state.sel.license = key;
          b.classList.add("active");
        }
        render();
      });
      box.appendChild(b);
    });
  }

  // ---- 匹配逻辑 ----
  function matches(s) {
    var q = state.q;
    if (state.sel.category && s.category_dir !== state.sel.category) return false;
    if (state.sel.mode && s.mode !== state.sel.mode) return false;
    if (state.sel.tier && s.tier_label !== state.sel.tier) return false;
    if (state.sel.license && licenseBucket(s) !== state.sel.license) return false;
    if (state.sel.tag) {
      if ((s.tags || []).indexOf(state.sel.tag) === -1) return false;
    }
    if (q) {
      var hay = [s.name_zh, s.name_en, s.summary_zh, s.summary_en,
        (s.tags || []).join(" "), s.category_name, s.mode_label]
        .join(" ").toLowerCase();
      if (hay.indexOf(q) === -1) return false;
    }
    return true;
  }

  // ---- 卡片渲染 ----
  function cardHtml(s) {
    var meta = [];
    (s.tags || []).slice(0, 5).forEach(function (t) {
      meta.push('<span class="card-tag" data-tag="' + esc(t) + '" title="点击按此标签筛选">' + esc(t) + "</span>");
    });
    if (s.tier_label) {
      var tk = TIER_CLASS[s.tier_label] || "standard";
      meta.push('<span class="tier-badge tier-' + tk + '">' + esc(s.tier_label) + "</span>");
    }
    if (s.verification_status === "needs-review") {
      meta.push('<span class="verify-badge verify-needs-review">待复核</span>');
    } else if (s.verification_status === "blocked" || s.verification_status === "unverified") {
      meta.push('<span class="verify-badge verify-blocked">暂不推荐</span>');
    }
    var lbKey = licenseBucket(s);
    var lb = BUCKET_META[lbKey];
    if (lb) meta.push('<span class="lic-badge lic-' + lbKey + '">' + esc(lb.label) + "</span>");

    var actions = '<a class="card-action card-action-primary" href="' + esc(s.detail_url) + '">查看详情</a>';
    if (s.repo) {
      actions += '<a class="card-action" href="' + esc(s.repo) + '" target="_blank" rel="noopener">查看源</a>';
    }

    return (
      '<div class="card">' +
        '<p class="card-kicker">' + esc(s.category_name) + " · " + esc(s.mode_label) + "</p>" +
        '<h3 class="card-title"><a href="' + esc(s.detail_url) + '">' + esc(s.name_zh) + "</a></h3>" +
        (s.summary_zh ? '<p class="card-subtitle">' + esc(s.summary_zh) + "</p>" : "") +
        (meta.length ? '<div class="card-meta">' + meta.join("") + "</div>" : "") +
        '<div class="card-actions">' + actions + "</div>" +
      "</div>"
    );
  }

  function render() {
    var list = state.skills.filter(matches);
    var wrap = $("results");
    if (!list.length) {
      wrap.innerHTML = '<p class="muted" style="padding:8px 2px;">没有匹配的条目，试试其他关键词或筛选条件。</p>';
    } else {
      wrap.innerHTML = list.map(cardHtml).join("");
    }
    var total = state.skills.length;
    $("result-count").textContent = list.length === total
      ? "共 " + list.length + " 个条目"
      : "共 " + list.length + " 个条目（已从 " + total + " 个中筛选）";
    writeUrlState();
  }

  function shuffle(pool) {
    for (var i = pool.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = pool[i]; pool[i] = pool[j]; pool[j] = t;
    }
    return pool;
  }

  // 精选推荐：featured 优先，不足的名额由 verified 且非观察期条目随机补位
  function pickFeatured(count) {
    var picks = shuffle(state.skills.filter(function (s) { return s.featured; })).slice(0, count);
    var pool = shuffle(state.skills.filter(function (s) {
      return s.verification_status === "verified" && s.tier !== "watch";
    }));
    for (var i = 0; picks.length < count && i < pool.length; i++) {
      if (picks.indexOf(pool[i]) === -1) picks.push(pool[i]);
    }
    return picks;
  }

  // ---- 首页精选区渲染 ----
  function renderRandomPicks() {
    var box = $("featured-results");
    if (!box) return;
    box.innerHTML = pickFeatured(RANDOM_PICK_COUNT).map(cardHtml).join("");
  }

  // 卡片标签点击 -> 联动 sidebar 的 tag 分面筛选
  function selectTagFilter(tag) {
    var box = $("tag-chips");
    Array.prototype.forEach.call(box.querySelectorAll(".chip.active"), function (el) {
      el.classList.remove("active");
    });
    var chip = box.querySelector('.chip[data-value="' + tag + '"]');
    if (chip) chip.classList.add("active");
    applyTagCollapse(); // 确保被选中的标签（即便原本是折叠的单例）也保持可见
    state.sel.tag = tag;
    render();
    var browse = $("browse");
    if (browse) browse.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function clearFilters() {
    state.sel = { category: null, mode: null, tag: null, tier: null, license: null };
    state.q = "";
    $("search-input").value = "";
    Array.prototype.forEach.call(document.querySelectorAll(".chip.active"), function (el) {
      el.classList.remove("active");
    });
    render();
  }

  // ---- URL 状态：筛选与搜索进 query，刷新/分享/后退均可恢复 ----
  var URL_KEYS = ["category", "mode", "tag", "tier", "license"];

  function readUrlState() {
    var params;
    try { params = new URLSearchParams(location.search); } catch (e) { return; }
    var q = params.get("q");
    if (q) state.q = q.trim().toLowerCase();
    URL_KEYS.forEach(function (k) {
      var v = params.get(k);
      if (v) state.sel[k] = v;
    });
  }

  function writeUrlState() {
    var params = new URLSearchParams();
    if (state.q) params.set("q", state.q);
    URL_KEYS.forEach(function (k) {
      if (state.sel[k]) params.set(k, state.sel[k]);
    });
    var qs = params.toString();
    try {
      history.replaceState(null, "", location.pathname + (qs ? "?" + qs : "") + location.hash);
    } catch (e) { /* file:// 下可能被拒绝，忽略 */ }
  }

  // 把 state.sel 同步到 chip 高亮；URL 里带无效值时丢弃该筛选
  function syncChips() {
    URL_KEYS.forEach(function (k) {
      var box = $(k + "-chips");
      if (!box) return;
      var val = state.sel[k];
      var matched = false;
      Array.prototype.forEach.call(box.querySelectorAll(".chip"), function (el) {
        var on = !!val && el.dataset.value === val;
        el.classList.toggle("active", on);
        if (on) matched = true;
      });
      if (val && !matched) state.sel[k] = null;
    });
    if (state.q) $("search-input").value = state.q;
  }

  function init() {
    fetch(DATA_URL, { cache: "no-cache" })
      .then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then(function (data) {
        state.skills = data.skills || [];
        state.categories = data.categories || [];

        $("meta-count").textContent = state.skills.length;
        $("meta-cats").textContent = state.categories.length;
        $("meta-tags").textContent = uniq(
          [].concat.apply([], state.skills.map(function (s) { return s.tags || []; }))
        ).length;

        readUrlState();
        buildChips();
        syncChips();
        applyTagCollapse();
        $("search-input").addEventListener("input", function (e) {
          state.q = e.target.value.trim().toLowerCase();
          render();
        });
        $("clear-filters").addEventListener("click", clearFilters);
        render();
        renderRandomPicks();

        // 卡片上的标签可点击 -> 联动分面筛选（事件委托，覆盖主库与精选区）
        document.addEventListener("click", function (e) {
          var el = e.target.closest ? e.target.closest(".card-tag") : null;
          if (!el) return;
          var tag = el.getAttribute("data-tag");
          if (tag) selectTagFilter(tag);
        });
      })
      .catch(function (err) {
        $("result-count").textContent =
          "加载数据失败：" + err.message + "。请通过本地/线上 HTTP 服务访问（而非 file:// 直接打开）。";
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

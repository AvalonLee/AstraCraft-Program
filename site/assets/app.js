// SkillMall 预览站前端逻辑（视觉对齐 awesome-design-md-cn）。
// 读 data/skills.json，渲染卡片并支持搜索 + chip 多维筛选。
(function () {
  "use strict";

  var DATA_URL = "data/skills.json";
  var GROUPS = ["category", "tag", "tier", "license"];
  var state = {
    skills: [],
    categories: [],
    sel: { category: null, tag: null, tier: null, license: null },
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
    var tags = uniq([].concat.apply([], state.skills.map(function (s) { return s.tags || []; })))
      .map(function (t) { return { value: t, label: t }; });
    var tiers = uniq(state.skills.map(function (s) { return s.tier_label; }))
      .map(function (t) { return { value: t, label: t }; });
    var licenses = uniq(state.skills.map(function (s) { return s.license; }))
      .map(function (t) { return { value: t, label: t }; });

    fillChips("category-chips", "category", cats);
    fillChips("tag-chips", "tag", tags);
    fillChips("tier-chips", "tier", tiers);
    fillChips("license-chips", "license", licenses);
  }

  function fillChips(containerId, group, items) {
    var box = $(containerId);
    box.innerHTML = "";
    items.forEach(function (it) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      b.textContent = it.label;
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

  // ---- 匹配逻辑 ----
  function matches(s) {
    var q = state.q;
    if (state.sel.category && s.category_dir !== state.sel.category) return false;
    if (state.sel.tier && s.tier_label !== state.sel.tier) return false;
    if (state.sel.license && s.license !== state.sel.license) return false;
    if (state.sel.tag) {
      if ((s.tags || []).indexOf(state.sel.tag) === -1) return false;
    }
    if (q) {
      var hay = [s.name_zh, s.name_en, s.summary_zh, s.summary_en,
        (s.tags || []).join(" "), s.category_name, s.kind_label]
        .join(" ").toLowerCase();
      if (hay.indexOf(q) === -1) return false;
    }
    return true;
  }

  // ---- 卡片渲染 ----
  function cardHtml(s) {
    var meta = [];
    (s.tags || []).slice(0, 5).forEach(function (t) { meta.push("<span>" + esc(t) + "</span>"); });
    if (s.tier_label) meta.push("<span>" + esc(s.tier_label) + "</span>");
    if (s.license) meta.push("<span>" + esc(s.license) + "</span>");

    var actions = '<a class="card-action card-action-primary" href="' + esc(s.detail_url) + '">查看详情</a>';
    if (s.repo) {
      actions += '<a class="card-action" href="' + esc(s.repo) + '" target="_blank" rel="noopener">查看源</a>';
    }

    return (
      '<div class="card">' +
        '<p class="card-kicker">' + esc(s.category_name) + " · " + esc(s.kind_label) + "</p>" +
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
      wrap.innerHTML = '<p class="muted" style="padding:8px 2px;">没有匹配的技能，试试其他关键词或筛选条件。</p>';
    } else {
      wrap.innerHTML = list.map(cardHtml).join("");
    }
    var total = state.skills.length;
    $("result-count").textContent = list.length === total
      ? "共 " + list.length + " 个技能"
      : "共 " + list.length + " 个技能（已从 " + total + " 个中筛选）";
  }

  function clearFilters() {
    state.sel = { category: null, tag: null, tier: null, license: null };
    state.q = "";
    $("search-input").value = "";
    Array.prototype.forEach.call(document.querySelectorAll(".chip.active"), function (el) {
      el.classList.remove("active");
    });
    render();
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

        buildChips();
        $("search-input").addEventListener("input", function (e) {
          state.q = e.target.value.trim().toLowerCase();
          render();
        });
        $("clear-filters").addEventListener("click", clearFilters);
        render();
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

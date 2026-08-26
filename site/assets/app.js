// SkillMall 预览站前端逻辑：读 data/skills.json，渲染卡片并支持搜索/筛选/排序。
(function () {
  "use strict";

  var DATA_URL = "data/skills.json";
  var state = { skills: [], categories: [] };

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
    return out.sort(function (a, b) { return a.localeCompare(b, "zh"); });
  }

  function $(id) { return document.getElementById(id); }

  function populateFilters() {
    var cat = $("filter-category");
    state.categories.forEach(function (c) {
      var o = document.createElement("option");
      o.value = c.dir; o.textContent = c.name;
      cat.appendChild(o);
    });
    uniq(state.skills.map(function (s) { return s.license; })).forEach(function (v) {
      var o = document.createElement("option"); o.value = v; o.textContent = v; $("filter-license").appendChild(o);
    });
    uniq(state.skills.map(function (s) { return s.tier_label; })).forEach(function (v) {
      var o = document.createElement("option"); o.value = v; o.textContent = v; $("filter-tier").appendChild(o);
    });
    uniq([].concat.apply([], state.skills.map(function (s) { return s.tags || []; }))).forEach(function (v) {
      var o = document.createElement("option"); o.value = v; o.textContent = v; $("filter-tag").appendChild(o);
    });
    $("stat-count").textContent = state.skills.length;
    $("stat-cats").textContent = state.categories.length;
  }

  function matches(s, q, cat, tag, tier, lic) {
    if (cat && s.category_dir !== cat) return false;
    if (tier && s.tier_label !== tier) return false;
    if (lic && s.license !== lic) return false;
    if (tag) {
      var tags = s.tags || [];
      if (tags.indexOf(tag) === -1) return false;
    }
    if (q) {
      var hay = [s.name_zh, s.name_en, s.summary_zh, s.summary_en, (s.tags || []).join(" "), s.category_name]
        .join(" ").toLowerCase();
      if (hay.indexOf(q) === -1) return false;
    }
    return true;
  }

  function sortSkills(list, mode) {
    var m = mode || "updated";
    return list.slice().sort(function (a, b) {
      if (m === "name") return (a.name_zh || "").localeCompare(b.name_zh || "", "zh");
      if (m === "added") return (b.added_at || "").localeCompare(a.added_at || "");
      return (b.updated_at || "").localeCompare(a.updated_at || "");
    });
  }

  function cardHtml(s) {
    var tags = (s.tags || []).slice(0, 5).map(function (t) {
      return '<span class="tag">' + esc(t) + "</span>";
    }).join("");
    return (
      '<a class="card" href="' + esc(s.detail_url) + '">' +
        '<h3 class="card__title">' + esc(s.name_zh) + "</h3>" +
        (s.name_en ? '<p class="card__en">' + esc(s.name_en) + "</p>" : "") +
        '<div class="badges">' +
          '<span class="badge badge--cat">' + esc(s.category_name) + "</span>" +
          '<span class="badge badge--tier">' + esc(s.tier_label) + "</span>" +
          '<span class="badge badge--license">' + esc(s.license) + "</span>" +
        "</div>" +
        '<p class="card__summary">' + esc(s.summary_zh) + "</p>" +
        (tags ? '<div class="card__tags">' + tags + "</div>" : "") +
        '<div class="card__foot"><span class="badge">' + esc(s.kind_label) + "</span>" +
        '<span class="btn">查看详情</span></div>' +
      "</a>"
    );
  }

  function render() {
    var q = $("search").value.trim().toLowerCase();
    var cat = $("filter-category").value;
    var tag = $("filter-tag").value;
    var tier = $("filter-tier").value;
    var lic = $("filter-license").value;
    var sortMode = $("sort").value;

    var list = state.skills.filter(function (s) {
      return matches(s, q, cat, tag, tier, lic);
    });
    list = sortSkills(list, sortMode);

    var wrap = $("results");
    wrap.innerHTML = list.map(cardHtml).join("");
    $("result-count").textContent = "共 " + list.length + " 个技能" +
      (list.length !== state.skills.length ? "（已从 " + state.skills.length + " 个中筛选）" : "");
    $("empty").hidden = list.length !== 0;
  }

  function bind() {
    ["search", "filter-category", "filter-tag", "filter-tier", "filter-license", "sort"]
      .forEach(function (id) { $(id).addEventListener("input", render); $(id).addEventListener("change", render); });
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
        populateFilters();
        bind();
        render();
      })
      .catch(function (err) {
        $("result-count").textContent = "加载数据失败：" + err.message +
          "。请通过本地/线上 HTTP 服务访问（而非 file:// 直接打开）。";
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

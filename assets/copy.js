// 复制按钮通用逻辑：按钮 [data-copy-target] -> 目标元素 textContent。
// 首页（assets/app.js 页面）与详情页共用；页面没有 #toast 时只反馈按钮文案。
(function () {
  "use strict";

  function init() {
    var buttons = document.querySelectorAll("[data-copy-target]");
    Array.prototype.forEach.call(buttons, function (btn) {
      btn.addEventListener("click", function () {
        var target = document.getElementById(btn.getAttribute("data-copy-target"));
        if (!target) return;
        var text = (target.textContent || "").trim();
        var toast = document.getElementById("toast");
        var showToast = function (msg) {
          if (!toast) return;
          toast.textContent = msg;
          toast.classList.add("visible");
          setTimeout(function () { toast.classList.remove("visible"); }, 2200);
        };
        var mark = function () {
          var old = btn.textContent;
          btn.textContent = "已复制 ✓";
          btn.classList.add("copied");
          showToast("已复制到剪贴板");
          setTimeout(function () { btn.textContent = old; btn.classList.remove("copied"); }, 1800);
        };
        var fallback = function () {
          var ta = document.createElement("textarea");
          ta.value = text;
          ta.style.position = "fixed";
          ta.style.opacity = "0";
          document.body.appendChild(ta);
          ta.focus(); ta.select();
          try { document.execCommand("copy"); mark(); } catch (e) {}
          document.body.removeChild(ta);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(mark).catch(fallback);
        } else {
          fallback();
        }
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

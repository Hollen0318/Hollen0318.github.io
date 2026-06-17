(function () {
  "use strict";

  // --- Dark / light theme toggle ---
  var root = document.documentElement;
  var toggle = document.querySelector(".theme-toggle");

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    try { localStorage.setItem("theme", theme); } catch (e) {}
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
      setTheme(current === "dark" ? "light" : "dark");
    });
  }

  // Follow the OS preference only if the user hasn't chosen explicitly.
  try {
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", function (e) {
      if (!localStorage.getItem("theme")) setTheme(e.matches ? "dark" : "light");
    });
  } catch (e) {}
})();

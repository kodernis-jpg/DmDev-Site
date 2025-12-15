(function () {
  const switcher = document.getElementById("langSwitch");
  const menu = document.getElementById("langMenu");
  const btn = switcher?.querySelector(".lang-btn");

  if (!switcher || !menu || !btn) return;

  btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });

  menu.querySelectorAll(".lang-item").forEach(item => {
    item.addEventListener("click", () => {
      const lang = item.getAttribute("data-lang");
      applyLanguage(lang);
      menu.classList.add("hidden");
    });
  });

  document.addEventListener("click", (e) => {
    if (!switcher.contains(e.target)) {
      menu.classList.add("hidden");
    }
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  const page = document.querySelector(".page");

  document.querySelectorAll("a[href]").forEach(link => {
    const url = link.getAttribute("href");

    // пропускаем якоря и внешние ссылки
    if (
      !url ||
      url.startsWith("#") ||
      url.startsWith("http") ||
      link.hasAttribute("target")
    ) return;

    link.addEventListener("click", e => {
      e.preventDefault();

      page.classList.add("fade-out");

      setTimeout(() => {
        window.location.href = url;
      }, 280);
    });
  });
});

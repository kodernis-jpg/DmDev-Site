document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("cookieBanner");
  const acceptBtn = document.getElementById("acceptCookies");
  const declineBtn = document.getElementById("declineCookies");

  // если пользователь уже делал выбор — НЕ показываем баннер
  const cookieChoice = localStorage.getItem("cookiesAccepted");

  if (cookieChoice === "true" || cookieChoice === "false") {
    banner.classList.add("hidden");
    return;
  }

  // иначе показываем
  banner.classList.remove("hidden");

  acceptBtn.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "true");
    banner.classList.add("hidden");
  });

  declineBtn.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "false");
    banner.classList.add("hidden");
  });
});

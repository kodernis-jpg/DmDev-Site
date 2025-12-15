(function () {
    // Если пользователь уже залогинен — сразу в профиль
    try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.loggedIn === true) {
        window.location.replace("profile.html");
    }
    } catch (e) {
    // если в storage мусор — просто игнор
    }
})();

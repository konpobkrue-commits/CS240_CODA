const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");
const menuLinks = mobileMenu.querySelectorAll("a");

menuButton.addEventListener("change", function () {
    mobileMenu.classList.toggle("hidden");
});

menuLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        if (window.innerWidth < 768) {
            mobileMenu.classList.add("hidden");
            menuButton.checked = false;
        }
    });
});

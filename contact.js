var navigationEntry = performance.getEntriesByType("navigation")[0];
var isReload = navigationEntry
  ? navigationEntry.type === "reload"
  : performance.navigation && performance.navigation.type === 1;
var currentPath = (window.location.pathname || "").toLowerCase();
var isHomePage =
  currentPath.endsWith("/index.html") ||
  currentPath.endsWith("index.html") ||
  currentPath === "/" ||
  currentPath === "";

if (isReload && !isHomePage) {
  window.location.replace("index.html");
}

var offerBox = document.getElementById("offer");
var closeBtn = document.getElementById("offer__close");
var offerStorageKey = "nostraOfferClosed";

if (offerBox && closeBtn) {
  try {
    if (localStorage.getItem(offerStorageKey) === "true") {
      offerBox.style.display = "none";
    }
  } catch (error) {}

  offerBox.style.transition = "opacity 0.3s ease";
  closeBtn.addEventListener("click", function () {
    offerBox.style.opacity = "0";
    setTimeout(function () {
      offerBox.style.display = "none";
    }, 300);
    try {
      localStorage.setItem(offerStorageKey, "true");
    } catch (error) {}
  });
}





var sideNav = document.getElementById("sideNav");
var menuIcon = document.getElementById("menuIcon");
var sideNavClose = document.getElementById("sideNavClose");
var sideNavLinks = document.querySelectorAll(".side-nav__links a");

function openSideNav() {
  sideNav.classList.add("open");
}

function closeSideNav() {
  sideNav.classList.remove("open");
}

if (menuIcon) {
  menuIcon.onclick = openSideNav;
}

if (sideNavClose) {
  sideNavClose.onclick = closeSideNav;
}

sideNavLinks.forEach(function (link) {
  link.addEventListener("click", closeSideNav);
});

document.onkeydown = function (e) {
  if (e.key === "Escape") {
    closeSideNav();
  }
};
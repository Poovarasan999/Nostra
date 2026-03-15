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

var collectionGrid = document.getElementById("collectionGrid");
var emptyState = document.getElementById("emptyState");
var searchInput = document.getElementById("productSearch");
var filterCheckboxes = document.querySelectorAll(".collection-filter");
var productCards = document.querySelectorAll(".product-card");
var menuIcon = document.getElementById("menuIcon");
var sideNavClose = document.getElementById("sideNavClose");
var sideNav = document.getElementById("sideNav");
var overlay = document.getElementById("overlay");
var sideNavLinks = document.querySelectorAll(".side-nav__links a");
var offerClose = document.getElementById("offer__close");
var offer = document.getElementById("offer");
var offerStorageKey = "nostraOfferClosed";

try {
  if (offer && localStorage.getItem(offerStorageKey) === "true") {
    offer.style.display = "none";
  }
} catch (error) {}

function getSelectedFilters(group) {
  return Array.from(
    document.querySelectorAll(`.collection-filter[data-filter="${group}"]:checked`)
  ).map((checkbox) => checkbox.value.toLowerCase());
}

function renderProducts() {
  if (!searchInput || !emptyState) {
    return;
  }

  var searchText = searchInput.value.trim().toLowerCase();
  var selectedOccasions = getSelectedFilters("occasion");
  var selectedColors = getSelectedFilters("color");
  var selectedArrivals = getSelectedFilters("arrival");

  var visibleCount = 0;

  productCards.forEach((card) => {
    var name = (card.dataset.name || "").toLowerCase();
    var occasion = (card.dataset.occasion || "").toLowerCase();
    var color = (card.dataset.color || "").toLowerCase();
    var arrival = (card.dataset.arrival || "").toLowerCase();

    var matchSearch = name.includes(searchText);
    var matchOccasion = selectedOccasions.length === 0 || selectedOccasions.includes(occasion);
    var matchColor = selectedColors.length === 0 || selectedColors.includes(color);
    var matchArrival = selectedArrivals.length === 0 || selectedArrivals.includes(arrival);
    var isVisible = matchSearch && matchOccasion && matchColor && matchArrival;

    card.style.display = isVisible ? "block" : "none";
    if (isVisible) {
      visibleCount += 1;
    }
  });

  emptyState.style.display = visibleCount === 0 ? "block" : "none";
}

searchInput?.addEventListener("input", renderProducts);
filterCheckboxes.forEach((checkbox) => checkbox.addEventListener("change", renderProducts));

function openSideNav() {
  sideNav?.classList.add("open");
  overlay?.classList.add("show");
  document.body.style.overflow = "hidden";
  menuIcon?.setAttribute("aria-expanded", "true");
}

function closeSideNav() {
  sideNav?.classList.remove("open");
  overlay?.classList.remove("show");
  document.body.style.overflow = "";
  menuIcon?.setAttribute("aria-expanded", "false");
}

menuIcon?.addEventListener("click", openSideNav);
sideNavClose?.addEventListener("click", closeSideNav);
overlay?.addEventListener("click", closeSideNav);
sideNavLinks.forEach((link) => link.addEventListener("click", closeSideNav));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeSideNav();
  }
});

offerClose?.addEventListener("click", () => {
  if (offer) {
    offer.style.display = "none";
  }
  try {
    localStorage.setItem(offerStorageKey, "true");
  } catch (error) {}
});

renderProducts();

// Offer close
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
} else if (isReload && window.location.hash) {
  history.replaceState(null, "", window.location.pathname + window.location.search);
  window.scrollTo(0, 0);
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





document.addEventListener("DOMContentLoaded", function () {
  var heroBg = document.querySelector(".hero__bg");
  var slides = document.querySelectorAll(".hero__bg img");
  var prevBtn = document.querySelector(".hero__arrow--left");
  var nextBtn = document.querySelector(".hero__arrow--right");
  var currentIndex = 0;

  if (!heroBg || !slides.length || !prevBtn || !nextBtn) return;

  function updateSlide() {
    var step = 100 / slides.length; 
    heroBg.style.transform = "translateX(-" + currentIndex * step + "%)";
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlide();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlide();
  }

  nextBtn.addEventListener("click", showNext);
  prevBtn.addEventListener("click", showPrev);
});

document.querySelectorAll(".wish-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const isActive = btn.classList.toggle("active");
    btn.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var revealSections = document.querySelectorAll(".reveal-up");

  if (!revealSections.length) return;

  if (!("IntersectionObserver" in window)) {
    revealSections.forEach(function (section) {
      section.classList.add("is-visible");
    });
    return;
  }

  var revealObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealSections.forEach(function (section) {
    revealObserver.observe(section);
  });
});
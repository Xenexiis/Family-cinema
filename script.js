/* =========================================================
   Family Cinéma — interactions de la page d'accueil
   ========================================================= */

/* ---------- Images manquantes : on affiche un cadre gris à la place ---------- */
const PLACEHOLDER = "data:image/svg+xml," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="4" height="4"><rect width="4" height="4" fill="#3a3a3a"/></svg>'
);
document.querySelectorAll("img").forEach(function (img) {
  function replace() {
    if (img.src !== PLACEHOLDER) img.src = PLACEHOLDER;
  }
  if (img.complete && img.naturalWidth === 0) replace();
  img.addEventListener("error", replace);
});

/* ---------- Navigation : fond au scroll + menu burger ---------- */
const nav = document.querySelector(".nav");
const burger = document.querySelector(".nav__burger");

window.addEventListener("scroll", function () {
  nav.classList.toggle("is-scrolled", window.scrollY > 40);
});

burger.addEventListener("click", function () {
  const open = nav.classList.toggle("is-open");
  burger.setAttribute("aria-expanded", open);
});

/* ---------- Carrousel du haut ---------- */
const track = document.querySelector(".hero__track");
const dots = document.querySelectorAll(".hero__dots button");
let current = 0;
let timer;

function goToSlide(index) {
  current = (index + dots.length) % dots.length;
  track.style.transform = "translateX(-" + current * 100 + "%)";
  dots.forEach(function (dot, i) {
    dot.classList.toggle("is-active", i === current);
  });
}

function startAutoplay() {
  clearInterval(timer);
  timer = setInterval(function () { goToSlide(current + 1); }, 6000);
}

dots.forEach(function (dot, i) {
  dot.addEventListener("click", function () {
    goToSlide(i);
    startAutoplay();
  });
});
startAutoplay();

/* ---------- Slider "À l'affiche" ---------- */
const list = document.querySelector(".affiche__list");
const next = document.querySelector(".affiche__next");
const prev = document.querySelector(".affiche__prev");

function scrollStep() {
  return list.clientWidth * 0.8;
}

function updateArrows() {
  prev.classList.toggle("is-visible", list.scrollLeft > 10);
  next.classList.toggle("is-hidden", list.scrollLeft + list.clientWidth >= list.scrollWidth - 10);
}

next.addEventListener("click", function () { list.scrollBy({ left: scrollStep() }); });
prev.addEventListener("click", function () { list.scrollBy({ left: -scrollStep() }); });
list.addEventListener("scroll", updateArrows);
window.addEventListener("resize", updateArrows);
updateArrows();

/* ---------- Choix du jour ---------- */
document.querySelectorAll(".days__list .day").forEach(function (day, _, all) {
  day.addEventListener("click", function () {
    all.forEach(function (d) { d.classList.remove("is-active"); });
    day.classList.add("is-active");
  });
});

/* ---------- Voir plus / voir moins de films ---------- */
const films = document.querySelector(".films");
const toggle = document.querySelector(".films__toggle");
const extraCount = document.querySelectorAll(".film--extra").length;

toggle.addEventListener("click", function () {
  const isClosed = films.dataset.state === "close";
  films.dataset.state = isClosed ? "open" : "close";
  toggle.textContent = (isClosed ? "Voir moins de film" : "Voir plus de film") + " (" + extraCount + ")";
  if (!isClosed) films.scrollIntoView({ block: "start" });
});

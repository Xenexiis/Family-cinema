/* =========================================================
   Family Cinéma — interactions de la page d'accueil
   ========================================================= */

/* ---------------------------------------------------------
   1. LA LISTE DES FILMS
   Pour ajouter / modifier un film, c'est ici que ça se passe.
   - public : "tous" (tout public) ou "-12" (interdit aux moins de 12 ans)
   - enfants : true si le film convient aux jeunes enfants
   - seances : horaires (identiques tous les jours) + version (VF, VOST, 3D)
   --------------------------------------------------------- */
const FILMS = [
  {
    id: "conclave", titre: "Conclave", genres: ["Thriller", "Drame"],
    public: "tous", enfants: false, duree: "2h00", affiche: "images/affiche-conclave.jpg",
    resume: "Le Cardinal Lawrence est chargé de gérer ce processus confidentiel après la mort inattendue du Pape bien-aimé. Lorsque tous les dirigeants les plus puissants de l’Église Catholique sont réunis et enfermés dans le Vatican, Lawrence se retrouve au centre d’une conspiration et découvre un secret qui pourrait changer à jamais l’institution religieuse.",
    seances: [["16:30", "VF"], ["20:00", "VOST"], ["21:30", "VF"]]
  },
  {
    id: "gladiator-2", titre: "Gladiator 2", genres: ["Historique", "Drame"],
    public: "-12", enfants: false, duree: "2h30", affiche: "images/affiche-gladiator-2.jpg",
    resume: "Des années après avoir assisté à la mort du héros vénéré Maximus aux mains de son oncle, Lucius est forcé d'entrer dans le Colisée lorsque son pays est conquis par les empereurs tyranniques qui gouvernent désormais Rome d'une main de fer. La rage au cœur et l'avenir de l'Empire en jeu, Lucius doit se tourner vers son passé pour trouver la force et l'honneur de rendre la gloire de Rome à son peuple.",
    seances: [["14:00", "VF"], ["17:45", "VF"], ["20:45", "VOST"]]
  },
  {
    id: "wicked", titre: "Wicked", genres: ["Comédie musicale", "Fantastique"],
    public: "tous", enfants: true, duree: "2h40", affiche: "images/affiche-wicked.jpg",
    resume: "Elphaba, une jeune femme incomprise à cause de la couleur inhabituelle de sa peau verte, ne soupçonne même pas l'étendue de ses pouvoirs. À ses côtés, Glinda qui, aussi populaire que privilégiée, ne connaît pas encore la vraie nature de son cœur.",
    seances: [["14:15", "VF"], ["17:30", "VF"], ["20:30", "VOST"]]
  },
  {
    id: "amour-ouf", titre: "L’amour ouf", genres: ["Romance", "Drame"],
    public: "tous", enfants: false, duree: "2h42", affiche: "images/affiche-amour-ouf.jpg",
    resume: "Les années 80, dans le nord de la France. Jackie et Clotaire grandissent entre les bancs du lycée et les docks du port. Elle étudie, il traîne. Et puis leurs destins se croisent et c'est l'amour fou. La vie s'efforcera de les séparer mais rien n'y fait, ces deux-là sont comme les deux ventricules du même cœur.",
    seances: [["15:00", "VF"], ["20:15", "VF"]]
  },
  {
    id: "vaiana-2", titre: "Vaiana 2", genres: ["Animation", "Aventure", "Comédie"],
    public: "tous", enfants: true, duree: "1h40", affiche: "images/affiche-vaiana-2.jpg",
    resume: "Après avoir reçu une invitation inattendue de ses ancêtres, Vaiana entreprend un périple qui la conduira jusqu’aux eaux dangereuses situées aux confins des mers des îles du Pacifique. Elle y vivra des péripéties comme jamais vécues auparavant.",
    seances: [["10:30", "VF"], ["14:00", "3D"], ["16:15", "VF"], ["18:30", "VF"]]
  },
  {
    id: "femmes-au-balcon", titre: "Les femmes au balcon", genres: ["Comédie", "Drame"],
    public: "-12", enfants: false, duree: "1h50", affiche: "images/affiche-femmes-au-balcon.jpg",
    resume: "Trois femmes, dans un appartement à Marseille en pleine canicule. En face, leur mystérieux voisin, objet de tous les fantasmes. Elles se retrouvent coincées dans une affaire terrifiante et délirante avec comme seule quête, leur liberté.",
    seances: [["18:00", "VF"], ["21:15", "VF"]]
  },
  {
    id: "plus-precieuse", titre: "La plus précieuse des marchandises", genres: ["Animation", "Historique"],
    public: "tous", enfants: false, duree: "1h21", affiche: "images/affiche-plus-precieuse.jpg",
    resume: "Il était une fois, dans un grand bois, un pauvre bûcheron et une pauvre bûcheronne. Le froid, la faim, la misère, et partout autour d’eux la guerre, leur rendaient la vie bien difficile. Un jour, la pauvre bûcheronne recueille un bébé, jeté d’un des nombreux trains qui traversent sans cesse leur bois. Cette petite marchandise va bouleverser la vie de cette femme, de son mari, et de tous ceux qui vont croiser son destin.",
    seances: [["16:00", "VF"], ["19:00", "VF"]]
  },
  {
    id: "en-fanfare", titre: "En fanfare", genres: ["Comédie", "Musique"],
    public: "tous", enfants: false, duree: "1h43", affiche: "images/affiche-en-fanfare.jpg",
    resume: "Thibaut est un chef d'orchestre de renommée internationale. Lorsqu'il apprend qu'il a été adopté, il découvre l'existence d'un frère, Jimmy, employé de cantine scolaire dans le nord de la France, qui joue du trombone dans une fanfare.",
    seances: [["14:30", "VF"], ["18:15", "VF"], ["20:45", "VF"]]
  }
];

/* ---------------------------------------------------------
   2. OUTILS
   --------------------------------------------------------- */
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function el(html) {
  const tpl = document.createElement("template");
  tpl.innerHTML = html.trim();
  return tpl.content.firstElementChild;
}

function genresHtml(film) {
  return film.genres.map(function (g) { return "<span>" + g + "</span>"; }).join("");
}

function ageBadge(film) {
  return film.public === "-12"
    ? '<span class="age age--12" title="Interdit aux moins de 12 ans">-12 ans</span>'
    : '<span class="age" title="Tout public">Tout public</span>';
}

/* Nombre de places restantes : simulé (toujours le même pour un film / jour / horaire).
   Sur le vrai site, cette info viendrait du logiciel de billetterie. */
function placesRestantes(filmId, dateKey, heure) {
  const txt = filmId + dateKey + heure;
  let n = 0;
  for (let i = 0; i < txt.length; i++) n = (n * 31 + txt.charCodeAt(i)) % 997;
  const v = n % 100;
  if (v < 8) return 0;            // complet
  if (v < 22) return (v % 9) + 2; // presque complet
  return 40 + v;                  // beaucoup de places
}

/* Images manquantes : on affiche un cadre gris à la place */
const PLACEHOLDER = "data:image/svg+xml," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="4" height="4"><rect width="4" height="4" fill="#3a3a3a"/></svg>'
);
function watchImages(root) {
  root.querySelectorAll("img").forEach(function (img) {
    function replace() { if (img.src !== PLACEHOLDER) img.src = PLACEHOLDER; }
    if (img.complete && img.naturalWidth === 0) replace();
    img.addEventListener("error", replace);
  });
}

/* ---------------------------------------------------------
   3. « À L'AFFICHE » : cartes créées depuis FILMS
   --------------------------------------------------------- */
const list = document.querySelector(".affiche__list");

FILMS.forEach(function (film) {
  list.appendChild(el(
    '<a href="#seance-' + film.id + '" class="poster-card" data-film="' + film.id + '">' +
      '<div class="poster">' +
        '<img src="' + film.affiche + '" alt="Affiche ' + film.titre + '" loading="lazy">' +
        '<span class="poster__cta">Voir les séances</span>' +
      "</div>" +
      "<h3>" + film.titre + "</h3>" +
      '<p class="genres">' + genresHtml(film) + "</p>" +
      '<p class="meta">' + ageBadge(film) + "<span>" + film.duree + "</span></p>" +
    "</a>"
  ));
});

/* Flèches du slider */
const next = document.querySelector(".affiche__next");
const prev = document.querySelector(".affiche__prev");

function updateArrows() {
  prev.classList.toggle("is-visible", list.scrollLeft > 10);
  next.classList.toggle("is-hidden", list.scrollLeft + list.clientWidth >= list.scrollWidth - 10);
}
next.addEventListener("click", function () { list.scrollBy({ left: list.clientWidth * 0.8 }); });
prev.addEventListener("click", function () { list.scrollBy({ left: -list.clientWidth * 0.8 }); });
list.addEventListener("scroll", updateArrows);
window.addEventListener("resize", updateArrows);
updateArrows();

/* ---------------------------------------------------------
   4. « NOS SÉANCES » : jours, filtres, horaires
   --------------------------------------------------------- */
const daysList = document.querySelector(".days__list");
const filmsBox = document.querySelector(".films");
const filterButtons = document.querySelectorAll(".chip--filter");

const today = new Date();
today.setHours(0, 0, 0, 0);

let startDate = new Date(today);  // premier jour affiché dans la barre
let selectedDate = new Date(today);
let currentFilter = "tous";

function sameDay(a, b) { return a.toDateString() === b.toDateString(); }
function dateKey(d) { return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }
function inputValue(d) {
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}
function fmt(d, opts) { return d.toLocaleDateString("fr-FR", opts); }

function renderDays() {
  daysList.innerHTML = "";
  for (let i = 0; i < 7; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    const isToday = sameDay(d, today);
    const active = sameDay(d, selectedDate);
    const btn = el(
      '<button class="day" role="tab">' +
        "<span>" + (isToday ? "Auj." : fmt(d, { weekday: "short" })) + "</span>" +
        "<strong>" + d.getDate() + "</strong>" +
        "<span>" + fmt(d, { month: "short" }) + "</span>" +
      "</button>"
    );
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-selected", active);
    btn.setAttribute("aria-label", fmt(d, { weekday: "long", day: "numeric", month: "long" }));
    btn.addEventListener("click", function () {
      selectedDate = d;
      renderDays();
      renderFilms();
    });
    daysList.appendChild(btn);
  }
}

function selectDate(d) {
  selectedDate = d;
  // si la date est en dehors des 7 jours affichés, la barre commence à cette date
  const end = new Date(startDate);
  end.setDate(startDate.getDate() + 6);
  if (d < startDate || d > end) startDate = new Date(d);
  renderDays();
  renderFilms();
}

function filmMatches(film) {
  if (currentFilter === "famille") return film.public === "tous";
  if (currentFilter === "enfants") return film.enfants;
  if (currentFilter === "ados") return !film.enfants;
  return true;
}

function hourHtml(film, s) {
  const heure = s[0], version = s[1];
  const h = heure.split(":");
  const when = new Date(selectedDate);
  when.setHours(+h[0], +h[1], 0, 0);
  const past = when < new Date();
  const places = placesRestantes(film.id, dateKey(selectedDate), heure);

  let state = "ok", info = "";
  if (past) { state = "past"; info = "Passée"; }
  else if (places === 0) { state = "full"; info = "Complet"; }
  else if (places < 12) { state = "few"; info = "Plus que " + places + " places"; }

  const inner =
    '<span class="hour__time">' + heure + "</span>" +
    '<span class="version">' + version + "</span>" +
    (info ? '<span class="hour__info">' + info + "</span>" : "");
  const label = heure + " en " + version + (info ? ", " + info.toLowerCase() : "");

  return state === "past" || state === "full"
    ? '<span class="hour hour--' + state + '" aria-disabled="true" aria-label="' + label + '">' + inner + "</span>"
    : '<a href="#" class="hour hour--' + state + '" aria-label="Réserver la séance de ' + label + '">' + inner + "</a>";
}

function renderFilms() {
  filmsBox.innerHTML = "";
  let count = 0;

  FILMS.forEach(function (film) {
    if (!filmMatches(film)) return;
    const seances = currentFilter === "soir"
      ? film.seances.filter(function (s) { return s[0] >= "18:00"; })
      : film.seances;
    if (!seances.length) return;
    count++;

    filmsBox.appendChild(el(
      '<article class="film" id="seance-' + film.id + '">' +
        '<div class="poster"><img src="' + film.affiche + '" alt="Affiche ' + film.titre + '" loading="lazy"></div>' +
        '<div class="film__body">' +
          "<div>" +
            "<h3>" + film.titre + "</h3>" +
            '<p class="genres">' + genresHtml(film) + "</p>" +
            '<p class="meta">' + ageBadge(film) + "<span>" + film.duree + "</span></p>" +
            '<p class="film__desc">' + film.resume + "</p>" +
            '<button class="link film__more" hidden>Lire la suite</button>' +
          "</div>" +
          '<div class="hours">' + seances.map(function (s) { return hourHtml(film, s); }).join("") + "</div>" +
        "</div>" +
      "</article>"
    ));
  });

  if (!count) {
    filmsBox.appendChild(el(
      '<p class="films__empty">Aucune séance ne correspond à ce filtre ce jour-là. ' +
      '<button class="link" data-reset>Voir tous les films</button></p>'
    ));
    filmsBox.querySelector("[data-reset]").addEventListener("click", function () { setFilter("tous"); });
  }

  setupReadMore();
  watchImages(filmsBox);
}

/* Résumés limités à 2 lignes, avec « Lire la suite » seulement si le texte est coupé */
function setupReadMore() {
  filmsBox.querySelectorAll(".film").forEach(function (film) {
    const desc = film.querySelector(".film__desc");
    const btn = film.querySelector(".film__more");
    if (!desc.classList.contains("is-open")) btn.hidden = desc.scrollHeight <= desc.clientHeight + 2;
    btn.onclick = function () {
      const open = desc.classList.toggle("is-open");
      btn.textContent = open ? "Réduire" : "Lire la suite";
    };
  });
}
let resizeTimer;
window.addEventListener("resize", function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(setupReadMore, 150);
});

function setFilter(name) {
  currentFilter = name;
  filterButtons.forEach(function (b) {
    const on = b.dataset.filter === name;
    b.classList.toggle("is-active", on);
    b.setAttribute("aria-pressed", on);
  });
  renderFilms();
}
filterButtons.forEach(function (b) {
  b.addEventListener("click", function () { setFilter(b.dataset.filter); });
});

renderDays();
setFilter("tous");

/* ---------------------------------------------------------
   5. ALLER AUX SÉANCES D'UN FILM (affiche, carrousel, recherche)
   --------------------------------------------------------- */
function goToFilm(id) {
  let target = document.getElementById("seance-" + id);
  if (!target) {             // le film est caché par un filtre : on remet « Tous »
    setFilter("tous");
    target = document.getElementById("seance-" + id);
  }
  if (!target) return;
  // on s'arrête juste sous le menu et la barre des jours (qui restent collés en haut)
  const offset = document.querySelector(".nav").offsetHeight + document.querySelector(".toolbar").offsetHeight;
  const y = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: y, behavior: reduceMotion ? "auto" : "smooth" });
  target.classList.remove("is-highlight");
  void target.offsetWidth;   // relance l'animation
  target.classList.add("is-highlight");
}

document.addEventListener("click", function (event) {
  const link = event.target.closest("[data-film]");
  if (!link) return;
  event.preventDefault();
  closeMenu();
  goToFilm(link.dataset.film);
});

/* ---------------------------------------------------------
   6. RECHERCHE AVEC SUGGESTIONS
   --------------------------------------------------------- */
const search = document.getElementById("search");
const results = document.getElementById("search-results");

function normalize(txt) {
  return txt.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[’']/g, " ");
}

function showResults() {
  const q = normalize(search.value.trim());
  results.innerHTML = "";
  if (!q) { hideResults(); return; }

  const found = FILMS.filter(function (f) {
    return normalize(f.titre + " " + f.genres.join(" ")).includes(q);
  });

  if (!found.length) {
    results.appendChild(el('<li class="search__empty">Aucun film trouvé</li>'));
  }
  found.forEach(function (f) {
    results.appendChild(el(
      '<li role="option"><a href="#seance-' + f.id + '" data-film="' + f.id + '">' +
        '<img src="' + f.affiche + '" alt="">' +
        "<span><strong>" + f.titre + "</strong><small>" + f.genres.join(" · ") + " · " + f.duree + "</small></span>" +
      "</a></li>"
    ));
  });
  results.hidden = false;
  search.setAttribute("aria-expanded", "true");
}
function hideResults() {
  results.hidden = true;
  search.setAttribute("aria-expanded", "false");
}

search.addEventListener("input", showResults);
search.addEventListener("focus", showResults);
search.addEventListener("keydown", function (event) {
  if (event.key === "Escape") { search.value = ""; hideResults(); }
  if (event.key === "Enter") {
    const first = results.querySelector("[data-film]");
    if (first) { goToFilm(first.dataset.film); hideResults(); search.value = ""; search.blur(); closeMenu(); }
  }
  if (event.key === "ArrowDown") {
    const first = results.querySelector("a");
    if (first) { event.preventDefault(); first.focus(); }
  }
});
results.addEventListener("keydown", function (event) {
  const items = Array.from(results.querySelectorAll("a"));
  const i = items.indexOf(document.activeElement);
  if (event.key === "ArrowDown" && i < items.length - 1) { event.preventDefault(); items[i + 1].focus(); }
  if (event.key === "ArrowUp") { event.preventDefault(); (i > 0 ? items[i - 1] : search).focus(); }
  if (event.key === "Escape") { hideResults(); search.focus(); }
});
results.addEventListener("click", function () { hideResults(); search.value = ""; });
document.addEventListener("click", function (event) {
  if (!event.target.closest(".search-box")) hideResults();
});

/* ---------------------------------------------------------
   7. NAVIGATION : fond au scroll + menu burger
   --------------------------------------------------------- */
const nav = document.querySelector(".nav");
const burger = document.querySelector(".nav__burger");

window.addEventListener("scroll", function () {
  nav.classList.toggle("is-scrolled", window.scrollY > 40);
});
burger.addEventListener("click", function () {
  const open = nav.classList.toggle("is-open");
  burger.setAttribute("aria-expanded", open);
  burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
});
function closeMenu() {
  nav.classList.remove("is-open");
  burger.setAttribute("aria-expanded", "false");
  burger.setAttribute("aria-label", "Ouvrir le menu");
}
document.querySelectorAll(".nav__menu a").forEach(function (a) { a.addEventListener("click", closeMenu); });

/* ---------------------------------------------------------
   8. CARROUSEL DU HAUT : points, défilement auto, glisser au doigt
   --------------------------------------------------------- */
const hero = document.querySelector(".hero");
const track = document.querySelector(".hero__track");
const dots = document.querySelectorAll(".hero__dots button");
const slides = document.querySelectorAll(".hero__slide");
let current = 0;
let timer = null;

function goToSlide(index) {
  current = (index + dots.length) % dots.length;
  track.style.transform = "translateX(-" + current * 100 + "%)";
  dots.forEach(function (dot, i) {
    dot.classList.toggle("is-active", i === current);
    dot.setAttribute("aria-current", i === current);
  });
  slides.forEach(function (slide, i) {
    slide.setAttribute("aria-hidden", i !== current);
    slide.querySelectorAll("a").forEach(function (a) { a.tabIndex = i === current ? 0 : -1; });
  });
}

function stop() { clearInterval(timer); timer = null; }
function play() {
  if (reduceMotion) return;   // pas de défilement auto si l'utilisateur limite les animations
  stop();
  timer = setInterval(function () { goToSlide(current + 1); }, 6000);
}

dots.forEach(function (dot, i) {
  dot.addEventListener("click", function () { goToSlide(i); play(); });
});

/* pause quand la souris est dessus ou qu'on navigue au clavier dedans */
hero.addEventListener("mouseenter", stop);
hero.addEventListener("mouseleave", play);
hero.addEventListener("focusin", stop);
hero.addEventListener("focusout", play);

/* glisser au doigt (mobile) */
let touchX = null;
hero.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; stop(); }, { passive: true });
hero.addEventListener("touchend", function (e) {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 40) goToSlide(current + (dx < 0 ? 1 : -1));
  touchX = null;
  play();
});

goToSlide(0);
play();

/* ---------------------------------------------------------
   9. NEWSLETTER (message de confirmation)
   --------------------------------------------------------- */
document.querySelectorAll(".newsletter__form").forEach(function (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    form.innerHTML = '<p class="newsletter__thanks">Merci ! Vous êtes bien inscrit(e) à la News Family.</p>';
  });
});

watchImages(document);

/* =========================================================
   10. MENUS DÉROULANTS DE LA BARRE DE NAVIGATION
   - ordinateur : s'ouvrent au survol ou au clic
   - mobile : s'ouvrent comme un accordéon dans le menu burger
   ========================================================= */
const menuItems = document.querySelectorAll(".menu-item");

function closeDropdowns(except) {
  menuItems.forEach(function (item) {
    if (item === except) return;
    item.classList.remove("is-open");
    item.querySelector(".menu-item__btn").setAttribute("aria-expanded", "false");
  });
}

menuItems.forEach(function (item) {
  const btn = item.querySelector(".menu-item__btn");
  btn.addEventListener("click", function () {
    // sur ordinateur le survol ouvre déjà le menu : le clic le garde ouvert
    const hoverMode = window.matchMedia("(hover: hover) and (min-width: 1101px)").matches;
    const open = hoverMode ? true : !item.classList.contains("is-open");
    closeDropdowns(item);
    item.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", open);
  });
  // sur ordinateur, ouverture au survol
  item.addEventListener("mouseenter", function () {
    if (window.matchMedia("(hover: hover) and (min-width: 1101px)").matches) {
      closeDropdowns(item);
      item.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
    }
  });
  item.addEventListener("mouseleave", function () {
    if (window.matchMedia("(hover: hover) and (min-width: 1101px)").matches) {
      item.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    }
  });
});

// un clic sur un lien du menu referme tout
document.querySelectorAll(".dropdown a").forEach(function (a) {
  a.addEventListener("click", function () {
    closeDropdowns();
    closeMenu();
    if (a.dataset.filterLink) setFilter(a.dataset.filterLink);
    if (a.dataset.focus) {
      setTimeout(function () { document.getElementById(a.dataset.focus).focus({ preventScroll: true }); }, 600);
    }
  });
});

document.addEventListener("click", function (event) {
  if (!event.target.closest(".menu-item")) closeDropdowns();
});
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") { closeDropdowns(); closeCalendar(); }
});

/* =========================================================
   11. CALENDRIER (s'ouvre sous le bouton « Calendrier »)
   ========================================================= */
const calBtn = document.querySelector(".day--calendar");
const calPop = document.getElementById("calendar-pop");
const MAX_DAYS = 60;                         // programme disponible sur 60 jours
const lastDay = new Date(today);
lastDay.setDate(today.getDate() + MAX_DAYS);
let calMonth = new Date(today.getFullYear(), today.getMonth(), 1);

function renderCalendar() {
  const year = calMonth.getFullYear(), month = calMonth.getMonth();
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7;   // lundi = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const canPrev = calMonth > new Date(today.getFullYear(), today.getMonth(), 1);
  const canNext = new Date(year, month + 1, 1) <= lastDay;

  let html =
    '<div class="calendar__head">' +
      '<button class="calendar__nav" data-cal="-1" aria-label="Mois précédent"' + (canPrev ? "" : " disabled") + ">‹</button>" +
      "<strong>" + fmt(first, { month: "long", year: "numeric" }) + "</strong>" +
      '<button class="calendar__nav" data-cal="1" aria-label="Mois suivant"' + (canNext ? "" : " disabled") + ">›</button>" +
    "</div>" +
    '<div class="calendar__grid">' +
      ["L", "M", "M", "J", "V", "S", "D"].map(function (d) { return '<span class="calendar__dow">' + d + "</span>"; }).join("");

  for (let i = 0; i < offset; i++) html += "<span></span>";
  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, month, day);
    const disabled = d < today || d > lastDay;
    const cls = ["calendar__day"];
    if (sameDay(d, today)) cls.push("is-today");
    if (sameDay(d, selectedDate)) cls.push("is-selected");
    html += '<button class="' + cls.join(" ") + '" data-day="' + day + '"' + (disabled ? " disabled" : "") +
            ' aria-label="' + fmt(d, { weekday: "long", day: "numeric", month: "long" }) + '">' + day + "</button>";
  }
  html += "</div>" +
    '<p class="calendar__foot">Programme disponible jusqu’au ' + fmt(lastDay, { day: "numeric", month: "long" }) + "</p>";
  calPop.innerHTML = html;
}

function openCalendar() {
  calMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  renderCalendar();
  calPop.hidden = false;
  calBtn.setAttribute("aria-expanded", "true");
  const sel = calPop.querySelector(".is-selected") || calPop.querySelector(".calendar__day:not([disabled])");
  if (sel) sel.focus({ preventScroll: true });
}
function closeCalendar() {
  if (calPop.hidden) return;
  calPop.hidden = true;
  calBtn.setAttribute("aria-expanded", "false");
}

calBtn.addEventListener("click", function (event) {
  event.stopPropagation();
  calPop.hidden ? openCalendar() : closeCalendar();
});
calPop.addEventListener("click", function (event) {
  event.stopPropagation();
  const nav = event.target.closest("[data-cal]");
  if (nav) {
    calMonth = new Date(calMonth.getFullYear(), calMonth.getMonth() + Number(nav.dataset.cal), 1);
    renderCalendar();
    return;
  }
  const dayBtn = event.target.closest("[data-day]");
  if (dayBtn) {
    selectDate(new Date(calMonth.getFullYear(), calMonth.getMonth(), Number(dayBtn.dataset.day)));
    closeCalendar();
    calBtn.focus();
  }
});
document.addEventListener("click", closeCalendar);

/* =========================================================
   12. LIENS PAS ENCORE BRANCHÉS
   Les liens « # » (réserver, bande annonce, réseaux…) ne mènent nulle part
   pour l'instant : on évite juste que la page remonte tout en haut au clic.
   ========================================================= */
document.addEventListener("click", function (event) {
  const link = event.target.closest('a[href="#"]');
  if (link && !link.classList.contains("nav__logo")) event.preventDefault();
});

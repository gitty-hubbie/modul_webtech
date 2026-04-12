const images = [
  { src: "img/bild/21.jpg", col: 1, row: 1, type: "bilder", scale: 0.8, align: "bottom-right" },
  { src: "img/bild/1.jpg", col: 2, row: 1, type: "bilder" },
  {
    src: "img/bild/31.jpg", col: 3, row: 2, type: "bilder",
    offsetX: 0,
    offsetY: -50
  },
  { src: "img/bild/4.jpg", col: 9, row: 1, type: "bilder", offsetX: -50, offsetY: 0 },
  { src: "img/bild/25.jpg", col: 6, row: 3, type: "bilder", offsetX: -50, offsetY: 0 },
  { src: "img/bild/18.jpg", col: 1, row: 4, type: "bilder", offsetX: 0, offsetY: -30, scale: 1.2, align: "bottom-right" },
  { src: "img/bild/7.jpg", col: 5, row: 2, type: "bilder", offsetX: -50, offsetY: 30 },
  { src: "img/bild/29.jpg", col: 5, row: 1, type: "bilder", offsetX: -50, offsetY: 30 },
  { src: "img/bild/20.jpg", col: 8, row: 5, type: "bilder", scale: 1.2, align: "top-left", offsetX: 0, offsetY: -30 },
  { src: "img/bild/9.jpg", col: 9, row: 2, type: "bilder", offsetX: -50, offsetY: 0 },
  { src: "img/bild/11.jpg", col: 4, row: 4, type: "bilder", scale: 1.2, align: "bottom-right", offsetX: -30, offsetY: -30 },
  { src: "img/bild/13.jpg", col: 2, row: 4, type: "bilder" },
  { src: "img/bild/14.jpg", col: 2, row: 5, type: "bilder" },
  { src: "img/bild/16.jpg", col: 8, row: 1, type: "bilder", scale: 1.2, offsetX: -50, offsetY: 0, align: "top-right" },
  { src: "img/bild/17.jpg", col: 1, row: 5, type: "bilder", offsetX: 0, offsetY: -30 },
  { src: "img/bild/8.jpg", col: 8, row: 4, type: "bilder", scale: 1.2, align: "bottom-left", offsetX: 0, offsetY: -30 },
  { src: "img/bild/19.jpg", col: 7, row: 5, type: "plaene", offsetX: 0, offsetY: -60 },
  {
    src: "img/bild/6.jpg", col: 7, row: 3, type: "plaene", scale: 1.2, offsetX: -40,
    offsetY: -40
  },
  { src: "img/bild/27.jpg", col: 7, row: 1, type: "bilder", scale: 0.8, align: "top-right", offsetX: -70, offsetY: 0 },
  { src: "img/bild/22.jpg", col: 10, row: 2, type: "plaene", offsetX: -50, offsetY: 70 },
  { src: "img/bild/10.jpg", col: 9, row: 5, type: "plaene", offsetX: 25, offsetY: -80 },
  { src: "img/bild/2.jpg", col: 2, row: 2, type: "plaene", scale: 1.3, align: "top-right", offsetX: 0, offsetY: 0 },
  { src: "img/bild/15.jpg", col: 10, row: 1, type: "plaene", scale: 1.2, align: "top-left", offsetX: -50, offsetY: 50 },
  { src: "img/bild/23.jpg", col: 4, row: 5, type: "plaene", offsetX: -30, offsetY: -30 },
  { src: "img/bild/12.jpg", col: 5, row: 5, type: "plaene", scale: 1.1, align: "top-left", offsetX: -30, offsetY: -80 },
  { src: "img/bild/30.jpg", col: 1, row: 2, type: "plaene", scale: 1.1, offsetX: -30, scale: 0.85, align: "top-right" },
  { src: "img/bild/5.jpg", col: 6, row: 2, type: "plaene", offsetX: -50, offsetY: 0 },
  { src: "img/bild/32.jpg", col: 7, row: 5, type: "plaene", offsetX: 0, offsetY: 55 },
];

const canvas = document.getElementById("canvas");
const scrollContainer = document.getElementById("scrollContainer");

let posX = 0;
let posY = 0;
let velocityX = 0;
let velocityY = 0;


if (canvas) {

  function updateTransform() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const offsetX = (3800 - vw) / 2;
    const offsetY = (2200 - vh) / 2;
    scrollContainer.style.transform = `translate(calc(-50% + ${-(posX - offsetX)}px), calc(-50% + ${-(posY - offsetY)}px))`;
  }

  // === Bilder hinzufügen ===
  images.forEach(data => {
    const img = document.createElement("img");
    img.src = data.src;
    img.dataset.type = data.type;

    const number = data.src.match(/\d+/)[0];
    img.addEventListener("click", () => {
      window.location.href = `projekt.html?img=${number}`;
    });

    img.style.gridColumn = data.col;
    img.style.gridRow = data.row;

    const alignMap = {
      "top-left": "0 0",
      "top-right": "100% 0",
      "bottom-left": "0 100%",
      "bottom-right": "100% 100%"
    };
    img.style.transformOrigin = alignMap[data.align] || "50% 50%";

    const offsetX = data.offsetX || 0;
    const offsetY = data.offsetY || 0;
    const scale = data.scale || 1;

    img.style.transform = `translate(${offsetX}%, ${offsetY}%) scale(${scale})`;

    canvas.appendChild(img);
  });

  const friction = 0.98;
  const maxSpeed = 8;
  const edgeThreshold = 0.15;
  const edgeBoost = 0.3;

  function autoScroll() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const relX = window.lastMouseX / vw;
    const relY = window.lastMouseY / vh;

    if (relX < edgeThreshold) velocityX -= edgeBoost * maxSpeed;
    if (relX > 1 - edgeThreshold) velocityX += edgeBoost * maxSpeed;
    if (relY < edgeThreshold) velocityY -= edgeBoost * maxSpeed;
    if (relY > 1 - edgeThreshold) velocityY += edgeBoost * maxSpeed;

    velocityX = Math.max(-maxSpeed, Math.min(maxSpeed, velocityX));
    velocityY = Math.max(-maxSpeed, Math.min(maxSpeed, velocityY));

    posX += velocityX;
    posY += velocityY;

    const maxX = 3800 - window.innerWidth;
    const maxY = 2200 - window.innerHeight;

    posX = Math.max(0, Math.min(maxX, posX));
    posY = Math.max(0, Math.min(maxY, posY));

    updateTransform();

    velocityX *= friction;
    velocityY *= friction;

    requestAnimationFrame(autoScroll);
  }

  // ← kein requestAnimationFrame und kein mousemove hier mehr

  window.addEventListener("load", () => {
    posX = (3800 - window.innerWidth) / 2;
    posY = (2200 - window.innerHeight) / 2 - 200;
    updateTransform();

    setTimeout(() => {
      document.body.classList.add("loaded");

      // Erst nach der Zoom-Animation starten
      setTimeout(() => {
        document.addEventListener("mousemove", e => {
          const dx = e.clientX - (window.lastMouseX || e.clientX);
          const dy = e.clientY - (window.lastMouseY || e.clientY);
          window.lastMouseX = e.clientX;
          window.lastMouseY = e.clientY;
          velocityX += dx * 0.05;
          velocityY += dy * 0.05;
        });

        requestAnimationFrame(autoScroll);
      }, 2500);

    }, 400);
  });

  window.addEventListener("wheel", e => e.preventDefault(), { passive: false });
  window.addEventListener("keydown", e => {
    const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"];
    if (keys.includes(e.code)) e.preventDefault();
  });
}

const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");

if (burger && navLinks) {
  burger.addEventListener("click", () => {
    burger.classList.toggle("open");
    navLinks.classList.toggle("open");
  });
}

document.addEventListener("DOMContentLoaded", () => {

  const tabs = document.querySelectorAll(".tab-btn");

  if (tabs.length === 0) return;

  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {

      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      contents.forEach(c => c.style.display = "none");

      const target = document.getElementById(tab.dataset.tab);
      if (target) target.style.display = "block";

    });
  });

});
let swiperInstance;
const mediaQuery = window.matchMedia("(max-width: 899px)");

function initSwiperPage() {
  const swiperEl = document.querySelector(".mySwiper");
  if (!swiperEl || typeof Swiper === "undefined") return;

  const isMobile = mediaQuery.matches;

swiperInstance = new Swiper(".mySwiper", {
  direction: isMobile ? "horizontal" : "vertical",
  slidesPerView: "auto",
  centeredSlides: true,
  speed: 900,
  spaceBetween: isMobile ? 20 : -40,
  mousewheel: isMobile ? false : { sensitivity: 0.5, releaseOnEdges: true },
  grabCursor: false,  // ← geändert
  touchStartPreventDefault: false,
  touchMoveStopPropagation: false,
  simulateTouch: true,
  touchAngle: 45
});

  setupExtras();
}

function setupExtras() {
  document.querySelectorAll(".image-card").forEach(card => {
    const main = card.querySelector(".main-img");
    const detail = card.querySelector(".detail-img");
    const caption = card.querySelector(".caption");

    if (!main || !detail || !caption) return;

    function swap() {
      const temp = main.src;
      main.src = detail.src;
      detail.src = temp;

      card.classList.toggle("detail-active");
    }

    main.addEventListener("click", swap);
    detail.addEventListener("click", swap);
  });

  // 🔹 URL Jump
  const params = new URLSearchParams(window.location.search);
  const imgNumber = params.get("img");
  if (imgNumber) {
    const slides = document.querySelectorAll(".swiper-slide");
    slides.forEach((slide, index) => {
      const main = slide.querySelector(".main-img");
      const detail = slide.querySelector(".detail-img");
      const mainFile = main ? main.src.split("/").pop() : "";
      const detailFile = detail ? detail.src.split("/").pop() : "";
      if (mainFile === `${imgNumber}.jpg` || detailFile === `${imgNumber}.jpg`) {
        swiperInstance.slideTo(index, 0);
      }
    });
  }
}

// 🔹 MediaQuery Listener
mediaQuery.addEventListener("change", (e) => {
  if (!swiperInstance) return;
  const isMobile = e.matches;
  swiperInstance.changeDirection(isMobile ? "horizontal" : "vertical");
  swiperInstance.params.spaceBetween = isMobile ? 20 : -40;
  swiperInstance.params.mousewheel = isMobile ? false : { sensitivity: 0.5, releaseOnEdges: true };
  swiperInstance.update();
});

document.addEventListener("DOMContentLoaded", () => {
  initSwiperPage();
});
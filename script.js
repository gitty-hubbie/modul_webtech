const images = [
  { src: "img/bild/1.jpg", col: 1, row: 1, type: "bilder" },
  { src: "img/bild/2.jpg", col: 3, row: 1, type: "bilder" },
  { src: "img/bild/3.jpg", col: 5, row: 1, type: "bilder" },
  { src: "img/bild/4.jpg", col: 2, row: 2, type: "bilder" },
  { src: "img/bild/5.jpg", col: 6, row: 2, type: "bilder" },
  { src: "img/bild/6.jpg", col: 1, row: 4, type: "bilder" },
  { src: "img/bild/7.jpg", col: 4, row: 3, type: "bilder" },
  { src: "img/bild/8.jpg", col: 7, row: 3, type: "bilder" },
  { src: "img/bild/9.jpg", col: 9, row: 2, type: "bilder" },
  { src: "img/bild/10.jpg", col: 5, row: 4, type: "bilder" },
  { src: "img/bild/11.jpg", col: 2, row: 3, type: "bilder" },
  { src: "img/bild/12.jpg", col: 8, row: 4, type: "bilder" },
  { src: "img/bild/13.jpg", col: 3, row: 5, type: "bilder" },
  { src: "img/bild/14.jpg", col: 6, row: 5, type: "bilder" },
  { src: "img/bild/15.jpg", col: 4, row: 6, type: "bilder" },
  { src: "img/bild/16.jpg", col: 7, row: 6, type: "bilder" },
  { src: "img/bild/17.jpg", col: 2, row: 6, type: "bilder" },
  { src: "img/bild/18.jpg", col: 9, row: 6, type: "bilder" },
  { src: "img/bild/19.jpg", col: 8, row: 1, type: "plaene" },
  { src: "img/bild/20.jpg", col: 1, row: 2, type: "plaene" },
  { src: "img/bild/21.jpg", col: 4, row: 2, type: "plaene" },
  { src: "img/bild/22.jpg", col: 1, row: 6, type: "plaene" },
  { src: "img/bild/23.jpg", col: 4, row: 2, type: "plaene" },
  { src: "img/bild/24.jpg", col: 8, row: 1, type: "plaene" },
  { src: "img/bild/25.jpg", col: 3, row: 4, type: "plaene" },
  { src: "img/bild/26.jpg", col: 10, row: 4, type: "plaene" },
  { src: "img/bild/27.jpg", col: 5, row: 6, type: "plaene" },
  { src: "img/bild/28.jpg", col: 7, row: 5, type: "plaene" },
  { src: "img/bild/29.jpg", col: 5, row: 3, type: "plaene" },
  { src: "img/bild/30.jpg", col: 1, row: 2, type: "plaene" },
  { src: "img/bild/31.jpg", col: 6, row: 1, type: "plaene" },
  { src: "img/bild/32.jpg", col: 9, row: 3, type: "plaene" }
];

const canvas = document.getElementById("canvas");

if (canvas) {

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

    canvas.appendChild(img);
  });

  // === Scroll ===
  let lastMouseX = 0;
  let lastMouseY = 0;

  let velocityX = 0;
  let velocityY = 0;

  let posX = 0;
  let posY = 0;

  const friction = 0.99;
  const strength = 0.05;
  const maxSpeed = 8;
  const edgeThreshold = 0.15;
  const edgeBoost = 0.3;

  document.addEventListener("mousemove", (e) => {
    const dx = e.clientX - lastMouseX;
    const dy = e.clientY - lastMouseY;

    lastMouseX = e.clientX;
    lastMouseY = e.clientY;

    velocityX += dx * strength;
    velocityY += dy * strength;
  });

  function autoScroll() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const relX = lastMouseX / vw;
    const relY = lastMouseY / vh;

    if(relX < edgeThreshold) velocityX -= edgeBoost * maxSpeed;
    if(relX > 1 - edgeThreshold) velocityX += edgeBoost * maxSpeed;
    if(relY < edgeThreshold) velocityY -= edgeBoost * maxSpeed;
    if(relY > 1 - edgeThreshold) velocityY += edgeBoost * maxSpeed;

    velocityX = Math.max(-maxSpeed, Math.min(maxSpeed, velocityX));
    velocityY = Math.max(-maxSpeed, Math.min(maxSpeed, velocityY));

    posX += velocityX;
    posY += velocityY;

    const maxX = canvas.offsetWidth - vw;
    const maxY = canvas.offsetHeight - vh;

    posX = Math.max(0, Math.min(maxX, posX));
    posY = Math.max(0, Math.min(maxY, posY));

    canvas.style.transform = `translate(${-posX}px, ${-posY}px)`;

    velocityX *= friction;
    velocityY *= friction;

    requestAnimationFrame(autoScroll);
  }

  requestAnimationFrame(autoScroll);

}

window.addEventListener("wheel", e => e.preventDefault(), {passive:false});
window.addEventListener("keydown", e => {
  const keys = ["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space"];
  if(keys.includes(e.code)) e.preventDefault();
});

const buttons = document.querySelectorAll(".switch button");

if (buttons.length > 0) {
  const imgs = document.querySelectorAll(".canvas img");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {

      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      imgs.forEach(img => {
        if (filter === "alle" || img.dataset.type === filter) {
          img.style.display = "block";
        } else {
          img.style.display = "none";
        }
      });

    });
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

function initSwiperPage() {

  const swiperEl = document.querySelector(".mySwiper");

  if (!swiperEl || typeof Swiper === "undefined") return;

  const swiper = new Swiper(".mySwiper", {
    direction: "vertical",
    slidesPerView: "auto",
    spaceBetween: -40,
    centeredSlides: true,
    freeMode: false,
    speed: 900,
    mousewheel: {
      sensitivity: 0.01,
      releaseOnEdges: true
    }
  });

  document.querySelectorAll(".image-card").forEach(card => {

    const main = card.querySelector(".main-img");
    const detail = card.querySelector(".detail-img");

    if (!main || !detail) return;

    function swap() {
      const temp = main.src;
      main.src = detail.src;
      detail.src = temp;
    }

    main.addEventListener("click", swap);
    detail.addEventListener("click", swap);
  });

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
        swiper.slideTo(index, 0);
      }

    });
  }
}

document.addEventListener("DOMContentLoaded", () => {

  initSwiperPage();

});
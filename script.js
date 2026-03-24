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

let lastMouseX = 0;
let lastMouseY = 0;

let velocityX = 0;
let velocityY = 0;

let mouseX = 0;
let mouseY = 0;

const friction = 0.99;
const strength = 0.05;
const maxSpeed = 8;

const edgeThreshold = 0.15; // 15% vom Rand
const edgeBoost = 0.3;      // wie stark der Rand schiebt

document.addEventListener("mousemove", (e) => {
  const dx = e.clientX - lastMouseX;
  const dy = e.clientY - lastMouseY;

  lastMouseX = e.clientX;
  lastMouseY = e.clientY;

  mouseX = e.clientX;
  mouseY = e.clientY;

  velocityX += dx * strength;
  velocityY += dy * strength;
});

function autoScroll() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const relX = mouseX / vw;
  const relY = mouseY / vh;

  // 🔹 EDGE BOOST (wenn Maus nahe am Rand)
  let boostX = 0;
  let boostY = 0;

  if (relX < edgeThreshold) {
    boostX = -(edgeThreshold - relX) * edgeBoost * maxSpeed;
  } else if (relX > 1 - edgeThreshold) {
    boostX = (relX - (1 - edgeThreshold)) * edgeBoost * maxSpeed;
  }

  if (relY < edgeThreshold) {
    boostY = -(edgeThreshold - relY) * edgeBoost * maxSpeed;
  } else if (relY > 1 - edgeThreshold) {
    boostY = (relY - (1 - edgeThreshold)) * edgeBoost * maxSpeed;
  }

  velocityX += boostX;
  velocityY += boostY;

  // begrenzen
  velocityX = Math.max(-maxSpeed, Math.min(maxSpeed, velocityX));
  velocityY = Math.max(-maxSpeed, Math.min(maxSpeed, velocityY));

  // Reibung
  velocityX *= friction;
  velocityY *= friction;

  // Stop-Schwelle
  if (Math.abs(velocityX) < 0.01) velocityX = 0;
  if (Math.abs(velocityY) < 0.01) velocityY = 0;

  window.scrollBy(velocityX, velocityY);

  requestAnimationFrame(autoScroll);
}

requestAnimationFrame(autoScroll);

const buttons = document.querySelectorAll(".switch button");
const imgs = document.querySelectorAll(".canvas img");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {

    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    imgs.forEach(img => {

      if (filter === "alle") {
        img.style.display = "block";
      }

      else if (img.dataset.type === filter) {
        img.style.display = "block";
      }

      else {
        img.style.display = "none";
      }

    });

  });
});
const images = [];
for (let i = 1; i <= 32; i++) {
  images.push({
    src: `img/bild/${i}.jpg`,
    type: i <= 21 ? "bilder" : "plaene"
  });
}

images.sort(() => Math.random() - 0.5);

const columns = 14;
const minPerRow = 4;
let row = 1;
let placed = 0;

let availableCols = Array.from({ length: columns }, (_, i) => i + 1);

images.forEach(data => {
  const img = document.createElement("img");
  img.src = data.src;

  // Kategorie speichern
  img.dataset.type = data.type;

  img.addEventListener("click", () => {
    const number = data.src.match(/\d+/)[0];
    window.location.href = `projekt.html?img=${number}`;
  });

  if (availableCols.length === 0) {
    row++;
    placed = 0;
    availableCols = Array.from({ length: columns }, (_, i) => i + 1);
  }

  const colIndex = Math.floor(Math.random() * availableCols.length);
  const col = availableCols[colIndex];
  availableCols.splice(colIndex, 1);

  img.style.gridColumn = col;
  img.style.gridRow = row;

  canvas.appendChild(img);
  placed++;

  if (placed >= minPerRow && Math.random() > 0.5) {
    row++;
    placed = 0;
    availableCols = Array.from({ length: columns }, (_, i) => i + 1);
  }
});

let mouseX = 0;
let mouseY = 0;
const maxSpeed = 15; // maximale Geschwindigkeit in Pixel pro Frame

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function autoScroll() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // relative Positionen (0 = links/oben, 1 = rechts/unten)
  const relX = mouseX / vw;
  const relY = mouseY / vh;

  // Scroll-Werte (-maxSpeed .. maxSpeed)
  const dx = (relX - 0.5) * 2 * maxSpeed; // links negativ, rechts positiv
  const dy = (relY - 0.5) * 2 * maxSpeed; // oben negativ, unten positiv

  window.scrollBy(dx, dy);

  requestAnimationFrame(autoScroll);
}

// Start auto-scroll Loop
requestAnimationFrame(autoScroll);

const image = document.querySelectorAll(".canvas img");

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function updateZoom() {
  image.forEach(img => {
    const rect = img.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = mouseX - centerX;
    const dy = mouseY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const maxDistance = 300; // max Radius für Zoom-Effekt
    const maxScale = 1.5;    // maximale Vergrößerung

    let scale = 1;
    if (distance < maxDistance) {
      scale = 1 + (1 - distance / maxDistance) * (maxScale - 1);
    }

    // sanfte Interpolation für flüssige Animation
    const current = parseFloat(img.dataset.scale) || 1;
    const smoothScale = current + (scale - current) * 0.2; // Dämpfung
    img.style.transform = `scale(${smoothScale})`;
    img.dataset.scale = smoothScale;

    img.style.zIndex = smoothScale > 1.05 ? 10 : 1;
  });

  requestAnimationFrame(updateZoom);
}

requestAnimationFrame(updateZoom);

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
const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let currentColor = "#000000";
let brushSize = 5;
let isEraser = false;
let isGridEnabled = false;

// Generate a random user ID for each tab
const userId = Math.random().toString(36).substr(2, 8);
document.getElementById("userId").textContent = userId;

// History for undo/redo
const history = [];
let historyIndex = -1;

// Save the current canvas state to history
function saveToHistory() {
  const imageData = canvas.toDataURL();
  history.push(imageData);
  historyIndex++;
}

// Load a specific state from history
function loadFromHistory(index) {
  const img = new Image();
  img.src = history[index];
  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  };
}

// Event listeners for drawing
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
  saveToHistory(); // Save state before starting to draw
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

function draw(e) {
  if (!isDrawing) return;

  ctx.beginPath();
  ctx.strokeStyle = isEraser ? "#ffffff" : currentColor;
  ctx.lineWidth = brushSize;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.moveTo(lastX, lastY);

  // Use quadratic curves for smoother drawing
  ctx.quadraticCurveTo(
    lastX,
    lastY,
    (lastX + e.offsetX) / 2,
    (lastY + e.offsetY) / 2
  );
  ctx.stroke();

  [lastX, lastY] = [e.offsetX, e.offsetY];

  // Save the current state to localStorage
  saveCanvasState();
}

// Undo button
document.getElementById("undoBtn").addEventListener("click", () => {
  if (historyIndex > 0) {
    historyIndex--;
    loadFromHistory(historyIndex);
  }
});

// Redo button
document.getElementById("redoBtn").addEventListener("click", () => {
  if (historyIndex < history.length - 1) {
    historyIndex++;
    loadFromHistory(historyIndex);
  }
});

// Color picker
document.getElementById("colorPicker").addEventListener("input", (e) => {
  currentColor = e.target.value;
  isEraser = false;
});

// Brush size slider
document.getElementById("brushSize").addEventListener("input", (e) => {
  brushSize = e.target.value;
});

// Eraser button
document.getElementById("eraserBtn").addEventListener("click", () => {
  isEraser = !isEraser;
  if (isEraser) {
    ctx.globalCompositeOperation = "destination-out"; // Erase mode
  } else {
    ctx.globalCompositeOperation = "source-over"; // Normal drawing mode
  }
});

// Export as PNG
document.getElementById("exportBtn").addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "drawing.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});

// Next Page button
document.getElementById("nextPageBtn").addEventListener("click", () => {
  saveCanvasState();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  history.length = 0;
  historyIndex = -1;
  saveToHistory();
});

// Toggle Theme
document.getElementById("toggleThemeBtn").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Toggle Grid Overlay
document.getElementById("toggleGridBtn").addEventListener("click", () => {
  const gridOverlay = document.querySelector(".grid-overlay");
  if (gridOverlay) {
    gridOverlay.remove();
    isGridEnabled = false;
  } else {
    const overlay = document.createElement("div");
    overlay.classList.add("grid-overlay");
    canvas.parentNode.insertBefore(overlay, canvas.nextSibling);
    isGridEnabled = true;
  }
});

// Change Canvas Background
document.getElementById("bgColorBtn").addEventListener("click", () => {
  const bgColor = prompt(
    "Enter a background color (e.g., #ffffff or red):",
    "#ffffff"
  );
  if (bgColor) {
    canvas.style.backgroundColor = bgColor;
  }
});

// Real-time synchronization using localStorage
function saveCanvasState() {
  const imageData = canvas.toDataURL();
  localStorage.setItem("canvasState", imageData);
}

function loadCanvasState() {
  const savedState = localStorage.getItem("canvasState");
  if (savedState) {
    const img = new Image();
    img.src = savedState;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
  }
}

window.addEventListener("storage", (e) => {
  if (e.key === "canvasState") {
    loadCanvasState();
  }
});

loadCanvasState();
saveToHistory();

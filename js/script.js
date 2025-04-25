let gradTop  = "#1e00ff";   // starter colours – pick anything
let gradBot  = "#ff0077";

// Variables

function addELement() {
/* Create a new div element */
 const newDiv = document.createElement("div");
/* And give it some content */
 const newContent = document.createTextNode("Hi there and greetomgs");
 /* Add the text node to the newly created div */
 newDiv.appendChild(newContent);
 /* Add the newly created element and it's content into the DOM */
 const currentDiv = document.getElementById("div1");
 document.body.insertBefore(newDiv, currentDiv);
}// Insert Element

// RANDOM COLOR GRADIENT
const getRandomColor = () =>
  "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0");

function changeBackground() {
  gradTop = getRandomColor();   // <— update the globals
  gradBot = getRandomColor();
  document.body.style.background =
  `linear-gradient(180deg, ${gradTop}, ${gradBot})`; // still style the page
}


// CONSTANTS
const CELL_SIZE = 40;
const COLOR_R = 79;
const COLOR_G = 38;
const COLOR_B = 233;
const STARTING_ALPHA = 255;
const BACKGROUND_COLOR = 150;
const PROB_OF_NEIGHBOR = 0.5;
const AMT_FADE_PER_FRAME = 5;
const STROKE_WEIGHT = 1;

// VARIABLES
let colorWithAlpha;
let numRows;
let numCols;
let currentRow = -1;
let currentCol = -1;
// Array to store all neighbors
let allNeighbors = [];

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.style("position", "fixed");
  cnv.style("inset", 0);
  cnv.style('z-index', -1);
  colorWithAlpha = color(COLOR_R, COLOR_G, COLOR_B, STARTING_ALPHA);
  noFill();
  stroke(colorWithAlpha);
  strokeWeight(STROKE_WEIGHT);
  numRows = Math.ceil(windowHeight / CELL_SIZE);
  numCols = Math.ceil(windowWidth / CELL_SIZE);
}

function draw() {
  const ctx = drawingContext;                       // native 2-D context
  const g = ctx.createLinearGradient(0, 0, 0, height);
  g.addColorStop(0, gradTop);   // top colour  – pick anything you like
  g.addColorStop(1, gradBot);   // bottom colour
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, width, height);                // replaces background()

  // Calculate the row and column of the   cell the mouse is currently over
  let row = floor(mouseY / CELL_SIZE);
  let col = floor(mouseX / CELL_SIZE);

  // Check if the mouse has moved to a new cell
  // If yes, getRandomNeighbors to display
  if (row !== currentRow || col !== currentCol) {
    currentRow = row;
    currentCol = col;

    allNeighbors.push(...getRandomNeighbors(row, col));
    }

  // Use the calculated row and column to determine the position of the cell
  let x = col * CELL_SIZE;
  let y = row * CELL_SIZE;

  // Draw a highlighted rectangle over the cell under the mouse cursor
  stroke(colorWithAlpha);
  rect(x, y, CELL_SIZE, CELL_SIZE);

  // Draw and update all neighbors
  for (let neighbor of allNeighbors) {
    let neighborX = neighbor.col * CELL_SIZE;
    let neighborY = neighbor.row * CELL_SIZE;
    // Decrease the opacity of the neighbor each frame
    neighbor.opacity = max(0, neighbor.opacity - AMT_FADE_PER_FRAME);
    stroke(COLOR_R, COLOR_G, COLOR_B, neighbor.opacity);
    rect(neighborX, neighborY, CELL_SIZE, CELL_SIZE);
  }
  // Remove neighbors with zero opacity
  allNeighbors = allNeighbors.filter((neighbor) => neighbor.opacity > 0);
}

function getRandomNeighbors(row, col) {
  let neighbors = []; // Initialize an empt array to store neighbor cells

  // Loop through the cell surrounding the given cell (row, col)
  for (let dRow = -1; dRow <= 1; dRow++) {
    for (let dCol = -1; dCol <= 1; dCol++) {
      // Calculate the neighboring cell's row and column indices
      let neighborRow = row + dRow;
      let neighborCol = col + dCol;

      // Check if the current cell in the loop is the given cell (row, col)
      let isCurrentCell = dRow === 0 && dCol === 0;

      // Check if the neighboring cell is within the grid boundaries
      let isInBounds =
        neighborRow >= 0 &&
        neighborRow < numRows &&
        neighborCol >= 0 &&
        neighborCol < numCols;

      // If the cell is not in the current cell, it is within bounds.
      // Add the neighboring cell to the neighbors array
      if (!isCurrentCell && isInBounds && Math.random() < PROB_OF_NEIGHBOR) {
        neighbors.push({
          row: neighborRow,
          col: neighborCol,
          opacity: STARTING_ALPHA,
        });
      }
    }
  }
  // Returm the array of randomly-selected neighboring cells
  return neighbors;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  numRows = Math.ceil(windowHeight / CELL_SIZE);
  numCols = Math.ceil(windowWidth / CELL_SIZE);
}

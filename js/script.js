
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

const getRandomColor = () => "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
function changeBackground() {
	document.body.style.backgroundColor = getRandomColor();
	// Random Color
}


/* for (initialization; condition; increment/decrement) {)
  // code block to be executed */

/*const items = ['apple', 'banana', 'cherry', 'date'];
for (let i = 1; i < items.length; i++) {
  console.log(items[i])
} */

const strings = ['apple', 'banana', 'cherry', 'orange', 'kiwi', 'mango'];
const newStrings = strings.filter((string) => {
  return string.length > 5;
})

console.log(newStrings);

let x = 320;
let y = 180;
let xspeed = 5;
let yspeed = 2;

let r = 30;


function setup() {
  let myCanvas = createCanvas(1850, 400); // Or any desired dimensions
  myCanvas.parent("myCanvasContainer");
  rectMode(CENTER);
}

function draw() {
  background(0);
  ellipse(x, y, r*2, r*2);
  x += xspeed;
  y += yspeed;
  if (x > width - r || x < r) {
    xspeed = -xspeed;
  }
  if (y > height - r || y < r) {
    yspeed = -yspeed
  }

}

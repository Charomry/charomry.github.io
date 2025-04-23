
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

const numbers = [1, 2, 3, 4, 5];
const newNumbers = numbers.map((number) => {
  return number * 3;
});

console.log(newNumbers);

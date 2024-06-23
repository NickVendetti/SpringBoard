// this is to add for a webpage(make repo online)

const gameContainer = document.getElementById("game");
// an array of colors to shuffle
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];
let currentCard;
let clickCount = 0;
let cardClicks = [];
let card1 = null;
let card2 = null;

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let isInTimeout = false;

// TODO: Implement this function!
function handleCardClick(event) {
  if (isInTimeout) {
    return;
  } // this is the 'card' that was clicked to display color
  let target = event.currentTarget;

  // applies background color based on class of color
  target.style.backgroundColor = target.classList[0];

  clickCount++;
  if (!card1) {
    card1 = target;
  } else {
    if (target === card1) {
      return;
    }
    card2 = target;

    if (card1.classList[0] === card2.classList[0]) {
      console.log("its a match");
      card1 = null;
      card2 = null; // resetCards();
    } else {
      isInTimeout = true;
      setTimeout(() => {
        isInTimeout = false;
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1 = null;
        card2 = null; // resetCards();
      }, 1000);
    }
  }

  console.log("you just clicked", event.target);
}

// when the DOM loads
createDivsForColors(shuffledColors);

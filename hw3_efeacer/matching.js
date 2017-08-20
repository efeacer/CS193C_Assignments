//constant declerations
const BACK_FACE = "back.png";
const FLIP_TIME = 1500;
const CLEAR = "clear.png";

//variables
var memoryArray = ["1clubs.png", "1hearts.png", "2clubs.png", "2hearts.png", "3clubs.png", "3hearts.png"];
var flippedCards = [];

/**
@method getRandomIntInclusive Returns a random integer between min and max variables (inclusive).
@param {int} min The lower bound of the range, in which a random integer will be generetad.
@param {int} max The upper bound of the range, in which a random integer will be generetad.
@return {int} The random integer between the range, min and max inclusive.
*/
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

/**
@method shuffle Shuffles the memoryArray, which is the cards.
@param {array} cards The array with card images that will be shuffled.
*/
function shuffle(cards) {
  var i = cards.length;
  var j;
  var temp;
  while (--i > 0) {
    j = getRandomIntInclusive(0, i);
    temp = cards[i];
    cards[i] = cards[j];
    cards[j] = temp;
  }
}

/**
@method generateCards Generates a html code for the card images and puts it to the html file.
*/
function generateCards() {
  flippedCards = [];
  var output = '';
  shuffle(memoryArray);
  for (var i = 0; i < memoryArray.length; i++) {
    output += '<img id="' + memoryArray[i] + '" src="' + BACK_FACE + '" alt="cardImage" onclick="flip(this,\'' + memoryArray[i] + '\')">';
  }
  document.getElementById('cards').innerHTML = output;
}

//adding the event listeners
document.addEventListener("load", generateCards(), false);
document.getElementById("restartButton").addEventListener("click", function() {generateCards();}, false);

/**
@method flip Flips the card images and performs some logic to clear the cards when a match occurs, or
turn them back if no match occurs.
@param {Object} image A reference to the img tagged html element.
@param {value} value The image's id representing the card's face value.
*/
function flip(image, value) {
  if (image.getAttribute("src") == BACK_FACE && flippedCards.length < 2) {
    image.src = value;
    if (flippedCards.length == 0) {
      flippedCards.push(value);
    } else if (flippedCards.length == 1) {
      flippedCards.push(value);
      if (flippedCards[0].charAt(0) == flippedCards[1].charAt(0)) {
        function clearCards() {
          document.getElementById(flippedCards[0]).src = CLEAR;
          document.getElementById(flippedCards[1]).src = CLEAR;
          flippedCards = [];
        }
        setTimeout(clearCards, FLIP_TIME);
      } else {
        function flipCardsBack() {
          if (flippedCards.length == 2) {
            document.getElementById(flippedCards[0]).src = BACK_FACE;
            document.getElementById(flippedCards[1]).src = BACK_FACE;
            flippedCards = [];
          }
        }
        setTimeout(flipCardsBack, FLIP_TIME);
      }
    }
  }
}

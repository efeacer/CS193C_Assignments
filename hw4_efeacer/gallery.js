"use strict";

//constant declerations
const IMAGE_HEIGHT = 600;
const IMAGE_WIDTH = 800;
const RIGHT_ARROW = "rightArrow.png";
const LEFT_ARROW = "leftArrow.png";
const PHOTO_ARRAY = [
		{filename: "memchu.jpg",
		 caption: "Stanford Memorial Church - the church used to have an 80' bell tower, which fell in the 1906 earthquake."},
		{filename: "quad.jpg",
		 caption: "The Stanford Quad"},
		{filename: "hoop.jpg",
		 caption: "The <i>Red Hoop Fountain</i> with Green Library in the background."},
		{filename: "memorial-court.jpg",
		 caption: "Memorial Court (in the front of the Quad) with Rodin's <i>Burghers of Calais</i> statues."},
		{filename: "gates.jpg",
		 caption: "The Gates Building - home of Stanford Computer Science."},
		{filename: "stone-river.jpg",
		 caption: "The Stone River statue near the Cantor Arts Center (Stanford's own art museum)."},
	];

//variables
var photoIndex = 0;
var rightArrowOnPlace = false;
var leftArrowOnPlace = false;
var photoSection = document.getElementById('photoSection');
var caption = document.getElementById("caption");
var forwardOverlay = document.getElementById("forwardOverlay");
var backwardOverlay = document.getElementById("backwardOverlay");

//Positioning the photoSection div
photoSection.style.position = "absolute";
photoSection.style.height = IMAGE_HEIGHT + "px";
photoSection.style.width = IMAGE_WIDTH + "px";

//Positioning the caption div
caption.style.position = "absolute";
caption.style.bottom = "0px";
caption.style.width = IMAGE_WIDTH + "px";

//positioning the forwardOverlay div, and adding event listeners to it
forwardOverlay.style.position = "absolute";
forwardOverlay.style.right = "0px";
forwardOverlay.style.top = "0px";
forwardOverlay.style.height = IMAGE_HEIGHT + "px";
forwardOverlay.style.width = IMAGE_WIDTH / 2 + "px";
forwardOverlay.addEventListener("click", function() { //shifts the photos forward
  photoIndex = (photoIndex + 1) % PHOTO_ARRAY.length;
  document.getElementById('photo').src = PHOTO_ARRAY[photoIndex].filename;
  document.getElementById("caption").innerHTML = PHOTO_ARRAY[photoIndex].caption;
}, false);
forwardOverlay.addEventListener("mouseover", function() { //places a right arrow image
  if (!rightArrowOnPlace) {
    forwardOverlay.innerHTML = '<img id="rightArrow" src="' + RIGHT_ARROW + '" alt="rightArrow" align="right">';
    rightArrowOnPlace = true;
  }
}, false);
forwardOverlay.addEventListener("mouseout", function() { //clears right arrow image
  rightArrowOnPlace = false;
  forwardOverlay.innerHTML = '';
}, false);

//positioning the backwardOverlay div, and adding event listeners to it
backwardOverlay.style.position = "absolute";
backwardOverlay.style.left = "0px";
backwardOverlay.style.top = "0px";
backwardOverlay.style.height = IMAGE_HEIGHT + "px";
backwardOverlay.style.width = IMAGE_WIDTH / 2 + "px";
backwardOverlay.addEventListener("click", function() { //shifts the photos backward
  //there is a weird bug with modulo operator when it is passed negative numbers, found this solution 
  photoIndex = (((photoIndex - 1) % PHOTO_ARRAY.length) + PHOTO_ARRAY.length) % PHOTO_ARRAY.length;
  document.getElementById('photo').src = PHOTO_ARRAY[photoIndex].filename;
  document.getElementById("caption").innerHTML = PHOTO_ARRAY[photoIndex].caption;
}, false);
backwardOverlay.addEventListener("mouseover", function() { //places a left arrow image
  if (!leftArrowOnPlace) {
    backwardOverlay.innerHTML = '<img id="leftArrow" src="' + LEFT_ARROW + '" alt="leftArrow" align="left">';
    leftArrowOnPlace = true;
  }
}, false);
backwardOverlay.addEventListener("mouseout", function() { //clears left arrow image
  leftArrowOnPlace = false;
  backwardOverlay.innerHTML = '';
}, false);

/**
@method handleResize Replaces the photoSection div to the center whenever the window is resized.
*/
function handleResize() {
  photoSection.style.top = ((window.innerHeight - IMAGE_HEIGHT) / 2) + "px";
  photoSection.style.left = ((window.innerWidth - IMAGE_WIDTH) / 2) + "px";
}
window.addEventListener("load", handleResize, false); //placing photoSection on load
window.addEventListener("resize", handleResize, false); //placing photoSection on resize

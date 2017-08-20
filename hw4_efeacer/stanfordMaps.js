//constant declerations
const mapSmall = new Image();
const mapMedium = new Image();
const mapLarge = new Image();
const mapXLarge = new Image();
mapSmall.src = "map-s.gif";
mapMedium.src = "map-m.gif";
mapLarge.src = "map-l.gif";
mapXLarge.src = "map-xl.gif";
const IMAGE_ARRAY = [mapSmall, mapMedium, mapLarge, mapXLarge];
const LOCATION_ARRAY = new Array({
    names: ["Gates"],
    x: 1558,
    y: 1461
}, {
    names: ["MemChu", "Memorial Church"],
    x: 1845,
    y: 1883
}, {
    names: ["Tresidder Union", "Tresidder"],
    x: 1804,
    y: 2225
}, {
    names: ["Florence Moore Hall", "Florence Moore", "FloMo"],
    x: 1705,
    y: 2496
}, {
    names: ["Bookstore", "Book Store"],
    x: 2022,
    y: 2144
}, {
    names: ["MemAud", "Memorial Auditorium", "Memorial Hall"],
    x: 2262,
    y: 1600
}, {
    names: ["Green Library", "Green"],
    x: 2173,
    y: 1898
}, {
    names: ["Meyer Library", "Meyer"],
    x: 2157,
    y: 2026
});
const MARGIN = 100;
const BORDER_THICKNESS = 15;

//variables
var currentIndex = 0;
var mapFrame = document.getElementById("mapFrame");
var mapImage = document.getElementById("mapImage");
var controlPanel = document.getElementById("controlPanel");
var searchBox = document.getElementById("search");

//setting the position properties of the div and map image
mapFrame.style.position = "absolute";
controlPanel.style.position = "absolute";

/**
@method resizeFrame Resizes the map frame when the window is resized, keeps the
margins around the frame same.
*/
function resizeFrame() {
    mapFrame.style.width = window.innerWidth - 2 * MARGIN + "px";
    mapFrame.style.height = window.innerHeight - MARGIN + "px";
    mapFrame.style.left = MARGIN / 4 + "px";
    mapFrame.style.top = MARGIN / 2 + "px";
    controlPanel.style.width = MARGIN + "px";
    controlPanel.style.right = MARGIN / 8 + "px";
    controlPanel.style.top = MARGIN + "px";
}

/**
@method setCentered Sets the location that the user clicks as the center of the
frame. Does this in an animated way, showing the relation between the old and new
centers.
@param event The click event.
*/
function setCentered(event) {
    if (event.clientX >= MARGIN / 4 + BORDER_THICKNESS && event.clientX <= MARGIN / 4 + 10 + parseFloat(mapFrame.style.width) &&
        event.clientY >= MARGIN / 2 + BORDER_THICKNESS && event.clientY <= MARGIN / 2 + 10 + parseFloat(mapFrame.style.height)) {
        goTo(event.clientX, event.clientY);
    }
}

/**
@method zoom Zooms the image in and out around an exact center.
@param event The click event, indicating which button is clicked (zoom in or out).
*/
function zoom(event) {
    var previousX = parseFloat(window.getComputedStyle(mapImage).getPropertyValue("left")) - parseFloat(mapFrame.style.width) / 2;
    var previousY = parseFloat(window.getComputedStyle(mapImage).getPropertyValue("top")) - parseFloat(mapFrame.style.height) / 2;
    var previousWidth = IMAGE_ARRAY[currentIndex].width;
    var previousHeight = IMAGE_ARRAY[currentIndex].height;
    if (event.target.id == "zoomIn" && currentIndex < IMAGE_ARRAY.length - 1) {
        currentIndex++;
    } else if (event.target.id == "zoomOut" && currentIndex > 0) {
        currentIndex--;
    } else {
        return;
    }
    mapImage.style.left = parseFloat(mapFrame.style.width) / 2 + IMAGE_ARRAY[currentIndex].width * previousX / previousWidth + "px";
    mapImage.style.top = parseFloat(mapFrame.style.height) / 2 + IMAGE_ARRAY[currentIndex].height * previousY / previousHeight + "px";
    mapImage.src = IMAGE_ARRAY[currentIndex].src;
}


/**
@method move Moves the map in north, south, east and west directions, scrolling
half of the relevant frame dimension. Does this in an animated way.
@param event The click event, indicating which button is clicked (north, south,
east or west).
*/
function move(event) {
    countWidth = 1;
    countHeight = 1;
    var endWidth = parseFloat(mapFrame.style.width) / 2;
    var endHeight = parseFloat(mapFrame.style.height) / 2;
    var loop = setInterval(function() {
        if (countWidth > endWidth || countHeight > endHeight) {
            clearInterval(loop);
            return;
        } else {
            if (event.target.id == "east") {
                mapImage.style.left = parseFloat(window.getComputedStyle(mapImage).getPropertyValue("left")) - 1 + "px";
                countWidth++;
            } else if (event.target.id == "west") {
                mapImage.style.left = parseFloat(window.getComputedStyle(mapImage).getPropertyValue("left")) + 1 + "px";
                countWidth++;
            } else if (event.target.id == "north") {
                mapImage.style.top = parseFloat(window.getComputedStyle(mapImage).getPropertyValue("top")) + 1 + "px";
                countHeight++;
            } else if (event.target.id = "south") {
                mapImage.style.top = parseFloat(window.getComputedStyle(mapImage).getPropertyValue("top")) - 1 + "px";
                countHeight++;
            }
        }
    }, 1);
}

//instead of preventDefault(), (preventDefault doesn't work with the search function for some reason)
document.getElementById("mapImage").ondragstart = function() {
    return false;
};

/**
@method drag Allows the user to drag the map image. Performs basic translation
geometry on the image when mouse moves after the mousedown event.
@event The mousedown, mousemove or mouseup event determining the behavior of the
function.
*/
function drag(event) {
    var initialX = parseFloat(window.getComputedStyle(mapImage).getPropertyValue("left"));
    var initialY = parseFloat(window.getComputedStyle(mapImage).getPropertyValue("top"));
    var mouseDownX = event.clientX;
    var mouseDownY = event.clientY;

    function dragMap(event) {
        document.getElementById("mapFrame").style.cursor = "move";
        mapImage.style.left = initialX + event.clientX - mouseDownX + "px";
        mapImage.style.top = initialY + event.clientY - mouseDownY + "px";
    }

    function dropMap(event) {
        document.getElementById("mapFrame").style.cursor = "default";
        document.removeEventListener("mousemove", dragMap, false);
        document.removeEventListener("mouseup", dropMap, false);
    }
    if (mouseDownX >= MARGIN / 4 + BORDER_THICKNESS && mouseDownX <= MARGIN / 4 + 10 + parseFloat(mapFrame.style.width) &&
        mouseDownY >= MARGIN / 2 + BORDER_THICKNESS && mouseDownY <= MARGIN / 2 + 10 + parseFloat(mapFrame.style.height)) {
        document.addEventListener("mouseup", dropMap, false);
        document.addEventListener("mousemove", dragMap, false);
    }
}

/**
@method goTo Sets the specified coordinates of the image as the center of the
frame. Does this in an animated way, showing the relation between the old and new
centers.
@param posX The specified X coordinate.
@param posY The specified Y coordinate.
*/
function goTo(posX, posY) {
    var centerOfFrameX = MARGIN / 4 + BORDER_THICKNESS + parseFloat(mapFrame.style.width) / 2;
    var centerOfFrameY = MARGIN / 2 + BORDER_THICKNESS + parseFloat(mapFrame.style.height) / 2;
    var endX = centerOfFrameX - posX;
    var endY = centerOfFrameY - posY;
    var countX = 1;
    var countY = 1;
    var loop = setInterval(function() {
        if (countX > Math.abs(endX) && countY > Math.abs(endY)) {
            clearInterval(loop);
            return;
        } else {
            if (endX > 0 && countX < Math.abs(endX)) {
                mapImage.style.left = parseFloat(window.getComputedStyle(mapImage).getPropertyValue("left")) + 1 + "px";
                countX++;
            } else if (endX < 0 && countX < Math.abs(endX)) {
                mapImage.style.left = parseFloat(window.getComputedStyle(mapImage).getPropertyValue("left")) - 1 + "px";
                countX++;
            } else if (endX == 0) {
                clearInterval(loop);
                return;
            }
            if (endY > 0 && countY < Math.abs(endY)) {
                mapImage.style.top = parseFloat(window.getComputedStyle(mapImage).getPropertyValue("top")) + 1 + "px";
                countY++;
            } else if (endY < 0 && countY < Math.abs(endY)) {
                mapImage.style.top = parseFloat(window.getComputedStyle(mapImage).getPropertyValue("top")) - 1 + "px";
                countY++;
            } else if (endY == 0) {
                clearInterval(loop);
                return;
            }
        }
    }, 1);
}

searchBox.addEventListener("click", function() {searchBox.value = "";}, false);
/**
@method Searches for the place in the search box. Centers that place if it is found.
*/
function search() {
    var place = searchBox.value;
    for (var i = 0; i < LOCATION_ARRAY.length; i++) {
        for (var j = 0; j < LOCATION_ARRAY[i].names.length; j++) {
            if (place.toLowerCase() == LOCATION_ARRAY[i].names[j].toLowerCase()) {
                goTo(LOCATION_ARRAY[i].x * IMAGE_ARRAY[currentIndex].width / IMAGE_ARRAY[3].width +
                    parseFloat(window.getComputedStyle(mapImage).getPropertyValue("left")) +
                    MARGIN / 4 + BORDER_THICKNESS,
                    LOCATION_ARRAY[i].y * IMAGE_ARRAY[currentIndex].height / IMAGE_ARRAY[3].height +
                    parseFloat(window.getComputedStyle(mapImage).getPropertyValue("top")) +
                    MARGIN / 2 + BORDER_THICKNESS
                );
                return;
            }
        }
    }
    searchBox.value = "Place not found.";
}

//assigning event listeners to the propriate DOM elements
window.addEventListener("load", resizeFrame, false);
window.addEventListener("resize", resizeFrame, false);
document.addEventListener("mousedown", drag, false);
document.getElementById("zoomIn").addEventListener("click", zoom, false);
document.getElementById("zoomOut").addEventListener("click", zoom, false);
document.getElementById("north").addEventListener("click", move, false);
document.getElementById("east").addEventListener("click", move, false);
document.getElementById("west").addEventListener("click", move, false);
document.getElementById("south").addEventListener("click", move, false);
document.addEventListener("dblclick", setCentered, false);
document.getElementById("find").addEventListener("click", search, false);

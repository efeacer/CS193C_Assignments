//constant(s)
const API_KEY = "6b6a3619bf0c92764d6a57752e416e12";

//variable(s)
var ZIPInput = document.getElementById("ZIPInput");
var getWeatherButton = document.getElementById("getWeatherButton");
var clearButton = document.getElementById("clearButton");
var weatherDisplay = document.getElementById("weatherDisplay");
var requestObj = null; //XMLHttpRequest object

/**
Forms an XMLHttpRequest object, assigns a method to it, in order to process the
information in the specified URL.
*/
function getWeather() {
    requestObj = new XMLHttpRequest();

    requestObj.addEventListener("load", processWeatherInfo, null);

    var ZIPCode = ZIPInput.value;
    var URL = "http://api.openweathermap.org/data/2.5/weather?zip=" +
        ZIPCode + ",us&units=imperial&APPID=" + API_KEY + "&mode=xml";
    requestObj.open("GET", URL, true);
    requestObj.send(null);

}

/**
Processes the information in the specified URL; gets the XML file, accesses its
elements and turns the information contained inside the elements into a string
which goes inside a textarea.
*/
function processWeatherInfo() {
    var cityName = requestObj.responseXML.getElementById("0").getAttribute("name");
    var cityTemperature = requestObj.responseXML.getElementsByTagName("temperature")[0].getAttribute("value");
    weatherDisplay.value = cityName + ": " + cityTemperature + "°F\n" + weatherDisplay.value;
}

/**
Clears all the text inside the textarea.
*/
function clearWeatherDisplay() {
    weatherDisplay.value = "";
}

//assigning related methods to the DOM elements
getWeatherButton.addEventListener("click", getWeather, false);
clearButton.addEventListener("click", clearWeatherDisplay, false);

//Array of universities
var univArray = new Array(
		{name: "Stanford University", nickname: "Stanford", ownership: "private", SATh: 1570, SATl: 1380, tuition: 44757},
		{name: "University of California, Berkeley", nickname: "UC Berkeley", ownership: "public", SATh: 1500, SATl: 1250, tuition: 13844},
		{name: "University of California, Santa Cruz", nickname: "UC Santa Cruz", ownership: "public", SATh: 1280, SATl: 1000, tuition: 13398},
		{name: "San Francisco State University", nickname: "SFSU", ownership: "public", SATh: 1110, SATl: 880, tuition: 6468},
		{name: "San Jose State University", nickname: "SJSU", ownership: "public", SATh: 1160, SATl: 880, tuition: 9496},
		{name: "Sonoma State University", nickname: "Sonoma State", ownership: "public", SATh: 1090, SATl: 880, tuition: 7276},
		{name: "California State University, East Bay", nickname: "CalState East Bay", ownership: "public", SATh: 1010, SATl: 800, tuition: 6550, room: 6435},
		{name: "University of San Francisco", nickname: "USF", ownership: "private", SATh: 1270, SATl: 1070, tuition: 41450},
		{name: "Santa Clara University", nickname: "SCU", ownership: "private", SATh: 1380, SATl: 1190, tuition: 43812},
		{name: "Mills College", nickname: "Mills College", ownership: "private", SATh: 1250, SATl: 1040, tuition: 42918}
		);

/**
@method editTable Accesses colloges.html code and changes the table containing the universities according to
the information in the form elements. In other words, filters the univArray and puts the elements to the html
table.
*/
function editTable() {
  var radios = document.getElementsByName("ownership");
  var ownershipType = "";
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
        ownershipType = radios[i].value;
        break;
    }
  }
  var maxSAT = Number.MAX_SAFE_INTEGER;
  var tuitionAmount = Number.MAX_SAFE_INTEGER;
  var minSAT = -Number.MAX_SAFE_INTEGER;
  if (document.getElementById("highSATInput").value != "") {
    maxSAT = document.getElementById("highSATInput").value;
  } if (document.getElementById("lowSATInput").value != "") {
    minSAT = document.getElementById("lowSATInput").value;
  } if (document.getElementById("tuitionInput").value != "") {
    tuitionAmount = document.getElementById("tuitionInput").value;
  }
  var tableString = "";
  var count = 0;
  for (var i = 0; i < univArray.length; i++) {
    var univ = univArray[i];
    if ((univ.ownership == ownershipType || ownershipType == "") && univ.SATl >= minSAT && univ.SATh <= maxSAT && univ.tuition <= tuitionAmount) {
      if (count % 2 == 0) {
        tableString += "<tr><td>" + univ.nickname + "</td><td>" + univ.SATh + "</td><td>" + univ.SATl + "</td><td>" + univ.tuition + "</td></tr>";
      } else {
        tableString += "<tr class=\"toColor\"><td>" + univ.nickname + "</td><td>" + univ.SATh + "</td><td>" + univ.SATl + "</td><td>" + univ.tuition + "</td></tr>";
      }
      count++;
    }
  }
  document.getElementById("mainTable").innerHTML = tableString;
}

//Attaching editTable function to the updateButton.
document.getElementById("updateButton").addEventListener("click", editTable, false);

//Attaching a function to the document itself, to display a full table each time the page loads.
document.addEventListener("DOMContentLoaded", function() {
  var tableString = "";
  var count = 0;
  for (var i = 0; i < univArray.length; i++) {
    var univ = univArray[i];
    if (count % 2 == 0) {
      tableString += "<tr><td>" + univ.nickname + "</td><td>" + univ.SATh + "</td><td>" + univ.SATl + "</td><td>" + univ.tuition + "</td></tr>";
    } else {
      tableString += "<tr class=\"toColor\"><td>" + univ.nickname + "</td><td>" + univ.SATh + "</td><td>" + univ.SATl + "</td><td>" + univ.tuition + "</td></tr>";
    }
    count++;
  }
  document.getElementById("mainTable").innerHTML = tableString;;
});

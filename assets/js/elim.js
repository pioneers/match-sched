// THIS DATA MAY CHANGE FROM YEAR TO YEAR
var schoolSheetName = 'schools';
var qualSheetName = 'qual_matches';
var elimSheetName = 'elim_matches';
var rankSheetName = 'team_rankings';
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/16V8AS5EyBu2pgGJGZ2CXfDpkDQEB99Ftw8E8vKDv0So/pubhtml';

/* -------- JQUERY FUNCTIONS START HERE -------- */

// Fills in the table and sidebar with the most up-to-date information from the Google spreadsheet.
function displayData(data, tabletop) {

  var schoolData = data[schoolSheetName]; // Tabletop object containing qualification matches
  var qualData = data[qualSheetName]; // Tabletop object containing qualification matches
  var elimData = data[elimSheetName]; // Tabletop object containing qualification matches
  var rankData = data[rankSheetName]; // Tabletop object containing qualification matches

  var numSchools = schoolData.elements.length;
  var schools = schoolData.all();

  /* -------- DOM MANIPULATION BEGINS HERE -------- */

  // find the placeholder table rows and sidebar names in the HTML and remove them
  $(".placeholder").remove();

  // add sidebar elements and ids for the different schools
  for (var i = 0; i < numSchools; i ++) {
    var teamName = schools[i]['TeamName'];
    var teamNum = schools[i]['TeamNumber'];
    var sidebarItem = $("<div></div>"); // create a new div to fill in
    sidebarItem.addClass("team-link");
    sidebarItem.attr("id", "team"+teamNum); // e.g. team1
    sidebarItem.text(teamNum+": "+teamName);
    $("#team-sidebar-content").append(sidebarItem);
  }

  // qualification match data
  var elimMatches = elimData.all();
  for (var i = 0; i < elimMatches.length; i ++) {
    $("#elim-table > tbody:last").append("<tr class='match-table-row'>" + // add a new table row
      "<td>" + elimMatches[i]['MatchNumber'] + "</td>" + //match number
      "<td>" + elimMatches[i]['MatchTime'] + "</td>" + // match time
      "<td class='blue team" + elimMatches[i]['Blue1Number'] + "cell'>" + elimMatches[i]['Blue1Number'] + ": " + elimMatches[i]['Blue1Name'] + "</td>" + // blue 1; e.g. team1cell
      "<td class='blue team" + elimMatches[i]['Blue2Number'] + "cell'>" + elimMatches[i]['Blue2Number'] + ": " + elimMatches[i]['Blue2Name'] + "</td>" + // blue 2
      "<td>" + elimMatches[i]['BlueScore'] + "/" + elimMatches[i]['GoldScore'] + "</td>" + // score
      "<td class='gold team" + elimMatches[i]['Gold1Number'] + "cell'>" + elimMatches[i]['Gold1Number'] + ": " + elimMatches[i]['Gold1Name'] + "</td>" + // gold 1
      "<td class='gold team" + elimMatches[i]['Gold2Number'] + "cell'>" + elimMatches[i]['Gold2Number'] + ": " + elimMatches[i]['Gold2Name'] + "</td>" + // gold 2
      "</tr>");
  }

  // boldface the current match, if there is one
  try {
    for (var i = 0; i < elimMatches.length; i ++) {
      console.log("Iterating through loop:", i);
      console.log("current match data:", elimMatches[i]['CurrentMatch']);
      var nthChild = elimMatches[i]['CurrentMatch'];
      if (nthChild && nthChild == nthChild) {
        console.log("found a row:", nthChild);
        $("#elim-table tr:nth-child(" + i+1 + ")").addClass("current-match");
      }
    }
  } catch(e) {}
};

/* -------- DOCUMENT READY FUNCTION -------- */

$(document).ready(function () {
  Tabletop.init({
    key: public_spreadsheet_url,
    callback: displayData,
    simpleSheet: false,
    debug: true
  });

  $("#elim-table").stickyTableHeaders();

  // highlight appropriate cells in the table when hovering over team names in sidebar
  $("#team-sidebar-content").on("mouseenter", ".team-link", function(event) {
    event.preventDefault();
    var teamCells = $("." + $(this).attr("id") + "cell");
    teamCells.addClass("highlighted");
  });

  $("#team-sidebar-content").on("mouseleave", ".team-link", function(event) {
    event.preventDefault();
    if (!($(this).hasClass("highlighted"))) {
      var teamCells = $("." + $(this).attr("id") + "cell");
      teamCells.removeClass("highlighted");
    }
  });

  $("#team-sidebar-content").on("click", ".team-link", function(event) {
    event.preventDefault();
    if ($(this).hasClass("highlighted")) {
      // unhighlight this link
      $(this).removeClass("highlighted");
      // unhighlight table cells
      var teamCells = $("." + $(this).attr("id") + "cell");
      teamCells.removeClass("highlighted");
    } else {
      // highlight this link
      $(this).addClass("highlighted");
      // highlight table cells
      var teamCells = $("." + $(this).attr("id") + "cell");
        teamCells.addClass("highlighted");
    }
  });
});




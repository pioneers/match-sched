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
  var rankings = rankData.all();
  for (var i = 0; i < rankings.length; i ++) {
    $("#rank-table > tbody:last").append("<tr class='match-table-row'>" + // add a new table row
      "<td>" + rankings[i]['Rank'] + "</td>" + // team number
      "<td class='left-aligned'>" + rankings[i]['TeamNumber'] + ": " + rankings[i]['TeamName'] + "</td>" + // team name
      // "<td>" + rankings[i]['TeamName'] + "</td>" + 
      "<td>" + rankings[i]['RankingCalories'] + "</td>" + 
      "<td>" + rankings[i]['QualificationCalories'] + "</td>" + 
      "<td>" + rankings[i]['Wins'] + "</td>" + 
      "<td>" + rankings[i]['Ties'] + "</td>" + 
      "<td>" + rankings[i]['Losses'] + "</td>" + 
      "</tr>");
  }
};

/* -------- DOCUMENT READY FUNCTION -------- */

$(document).ready(function () {
  Tabletop.init({
    key: public_spreadsheet_url,
    callback: displayData,
    simpleSheet: false,
    debug: true
  });
});




// function makeExcelRequest(url, successCallback, errorCallback) {
//   /* set up XMLHttpRequest */
//   var oReq = new XMLHttpRequest();
//   oReq.open("GET", url, true);
//   oReq.responseType = "arraybuffer";

//   oReq.onload = function(e) {
//     var arraybuffer = oReq.response;

//     /* convert data to binary string */
//     // var data = new Uint8Array(arraybuffer); // TODO fix this! we will be getting strings not ints
//     var data = new Array(); // TODO fix this! we will be getting strings not ints
//     var arr = new Array();
//     for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
//     var bstr = arr.join("");

//     /* Call XLSX */
//     try {
//       var workbook = XLSX.read(bstr, {type:"binary"});
//       successCallback(workbook);
//       $('#error').hide();
//     } catch(err) {
//       $('#error').show();
//     }
//   }
//   oReq.onreadystatechange = function (oEvent) {
//     if (oReq.readyState === 4) {
//       if (oReq.status !== 200) {
//         errorCallback();
//       }
//     }
//   };

//   oReq.send();
// }

// function parseWorkbook(workbook) {
//   // $('#chart-background').addClass('visible');

//   // var data = workbook['Sheets']['website'];
//   // var goal = data['B1']['w'];
//   // var raised = data['B2']['w'];
//   // var togo = data['B3']['w'];
//   var qual_data = workbook['Sheets']['qual_template'];
//   var elim_data = workbook['Sheets']['elim_template'];
//   var rank_data = workbook['Sheets']['rank_template'];

//   // $('#summary').text('$' + raised + ' out of $' + goal);
//   // $('#goal').text('$' + goal);

//   // var transitionDuration = Math.min(Math.max(1, (4 * raised / goal)), 4);

//   // $('#chart-label-25').text('$' + goal/4);
//   // $('#chart-label-50').text('$' + goal/4 * 2);
//   // $('#chart-label-75').text('$' + goal/4 * 3);
//   // $('#chart-label-100').text('$' + goal);
//   // $('#chart-labels div').addClass('visible');

//   // var raisedHeight = Math.min(400, 400 * raised / goal);
//   // $('#chart-raised').css('height', raisedHeight + 'px').css('transition-duration', transitionDuration + 's').addClass('visible');
//   // $('#chart-raised-label').text('$' + raised).css('transition-delay', (transitionDuration + 1) + 's');

//   // var individualDonations = data['B9']['w'];
//   // var averageDonation = data['B10']['w'];
//   // $('#individual-donations').text(individualDonations);
//   // $('#average-donation').text(averageDonation);

//   // TODO figure out how to get the lists of team numbers, names, scores, etc.
//   // TODO figure out how to apply these to different HTML elements
//   // TODO figure out how to add HTML elements based on the data in the workbook
//   //      probably a for loop through all the entries?
// }

// function searchTable() {
//   var allRows = $("tr");
//   $("input#search").on("keydown keyup", function() {
//     allRows.hide();
//     $("tr:contains('" + $(this).val() + "')").show();
//   });
// }


/* ---------------- ON PAGE LOAD FUNCTION ---------------- */

// $(function() {
//   // var daysRemaining = moment('2015-01-01').diff(moment(), 'days');
//   // var suffix = "days";
//   // if (Math.abs(daysRemaining) == 1) {
//   //   suffix = "day";
//   // }
//   // if (daysRemaining == 0) {
//   //   $('#days-remaining').text(moment('2015-01-01').fromNow());
//   // } else if (daysRemaining >= 0) {
//   //   $('#days-remaining').text(daysRemaining + " " + suffix);
//   // } else {
//   //   $('#days-remaining').text((-daysRemaining) + " " + suffix + " ago");
//   // }
//   makeExcelRequest('match_sched.xlsx', parseWorkbook, function() {
//     // Failed to proxy - get backup exported xlsx file.
//     makeExcelRequest('match_sched_backup.xlsx', parseWorkbook, function() {
//       // Failed to even get backup - network error.
//       $('#error').show();
//     });
//   });
// });

/* ---------------- LET ME TRY THIS!!!---------------- */


// var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1vTvnO-FRjo5bbetFBYyFI3R5z0vlcd0zCXlpOJ2XDes/pubhtml';

// function init() {
//   Tabletop.init( { key: public_spreadsheet_url,
//                    callback: showInfo,
//                    simpleSheet: true } );
// };

// function showInfo(data, tabletop) {
//   alert("Successfully processed!")
//   console.log(data);
// };

// $(document).ready(function() {
//   init();
//   // Tabletop.init( { key: public_spreadsheet_url,
//   //                  callback: showInfo,
//   //                  simpleSheet: true } );
// });

// THIS DATA MAY CHANGE FROM YEAR TO YEAR
var schoolSheetName = 'schools';
var qualSheetName = 'qual_matches';
var elimSheetName = 'elim_matches';
var rankSheetName = 'team_rankings';
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1vTvnO-FRjo5bbetFBYyFI3R5z0vlcd0zCXlpOJ2XDes/pubhtml';

// Fills in the table and sidebar with the most up-to-date information from the Google spreadsheet.
function displayData(data, tabletop) {
  console.log("all data:", data);

  var schoolData = data[schoolSheetName]; // Tabletop object containing qualification matches
  var qualData = data[qualSheetName]; // Tabletop object containing qualification matches
  var elimData = data[elimSheetName]; // Tabletop object containing qualification matches
  var rankData = data[rankSheetName]; // Tabletop object containing qualification matches

  var numSchools = schoolData.elements.length;
  var schools = schoolData.all();
  console.log("schools:", schools);

  /* -------- DOM MANIPULATION BEGINS HERE -------- */

  // find the placeholder table rows and sidebar names in the HTML and remove them
  $(".placeholder").remove();

  // add sidebar elements and ids for the different schools
  console.log("schoolData:", schoolData);
  console.log("numSchools:", numSchools);

  for (var i = 0; i < numSchools; i ++) {
    
    var teamName = schools[i]['TeamName'];
    var teamNum = schools[i]['TeamNumber'];
    var sidebarItem = $("<div></div>"); //create a new div to fill in
    sidebarItem.addClass("sidebar-team");
    sidebarItem.attr("id", "team"+teamNum+"sidebar"); //e.g. team1sidebar
    sidebarItem.text(teamNum+": "+teamName);
    console.log("new sidebar item:", sidebarItem);
    $("#team-sidebar-content").append(sidebarItem);
  }

  // qualification match data
  console.log("qualData: ", qualData);
  var qualMatches = qualData.all();
  console.log("qualMatches:", qualMatches);

  for (var i = 0; i < qualMatches.length; i ++) {
    $("#qual-table > tbody:last").append("<tr class='match-table-row'>" +
      "<td>" + qualMatches[i]['MatchNumber'] + "</td>" + //match number
      "<td>" + qualMatches[i]['MatchTime'] + "</td>" + // match time
      "<td class='blue'>" + qualMatches[i]['Blue1Number'] + ": " + qualMatches[i]['Blue1Name'] + "</td>" + // blue 1
      "<td class='blue'>" + qualMatches[i]['Blue2Number'] + ": " + qualMatches[i]['Blue2Name'] + "</td>" + // blue 2
      "<td>" + qualMatches[i]['BlueScore'] + "/" + qualMatches[i]['GoldScore'] + "</td>" + // score
      "<td class='gold'>" + qualMatches[i]['Gold1Number'] + ": " + qualMatches[i]['Gold1Name'] + "</td>" + // gold 1
      "<td class='gold'>" + qualMatches[i]['Gold2Number'] + ": " + qualMatches[i]['Gold2Name'] + "</td>" + // gold 2
      "</tr>");
    console.log("Completed an iteration of for loop");
  }


};

$(document).ready(function () {
  Tabletop.init({
    key: public_spreadsheet_url,
    callback: displayData,
    simpleSheet: false,
    debug: true
  });
});




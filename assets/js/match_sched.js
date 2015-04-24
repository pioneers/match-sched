function makeExcelRequest(url, successCallback, errorCallback) {
  /* set up XMLHttpRequest */
  var oReq = new XMLHttpRequest();
  oReq.open("GET", url, true);
  oReq.responseType = "arraybuffer";

  oReq.onload = function(e) {
    var arraybuffer = oReq.response;

    /* convert data to binary string */
    // var data = new Uint8Array(arraybuffer); // TODO fix this! we will be getting strings not ints
    var data = new Array(); // TODO fix this! we will be getting strings not ints
    var arr = new Array();
    for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
    var bstr = arr.join("");

    /* Call XLSX */
    try {
      var workbook = XLSX.read(bstr, {type:"binary"});
      successCallback(workbook);
      $('#error').hide();
    } catch(err) {
      $('#error').show();
    }
  }
  oReq.onreadystatechange = function (oEvent) {
    if (oReq.readyState === 4) {
      if (oReq.status !== 200) {
        errorCallback();
      }
    }
  };

  oReq.send();
}

function parseWorkbook(workbook) {
  // $('#chart-background').addClass('visible');

  // var data = workbook['Sheets']['website'];
  // var goal = data['B1']['w'];
  // var raised = data['B2']['w'];
  // var togo = data['B3']['w'];
  var qual_data = workbook['Sheets']['qual_template'];
  var elim_data = workbook['Sheets']['elim_template'];
  var rank_data = workbook['Sheets']['rank_template'];

  // $('#summary').text('$' + raised + ' out of $' + goal);
  // $('#goal').text('$' + goal);

  // var transitionDuration = Math.min(Math.max(1, (4 * raised / goal)), 4);

  // $('#chart-label-25').text('$' + goal/4);
  // $('#chart-label-50').text('$' + goal/4 * 2);
  // $('#chart-label-75').text('$' + goal/4 * 3);
  // $('#chart-label-100').text('$' + goal);
  // $('#chart-labels div').addClass('visible');

  // var raisedHeight = Math.min(400, 400 * raised / goal);
  // $('#chart-raised').css('height', raisedHeight + 'px').css('transition-duration', transitionDuration + 's').addClass('visible');
  // $('#chart-raised-label').text('$' + raised).css('transition-delay', (transitionDuration + 1) + 's');

  // var individualDonations = data['B9']['w'];
  // var averageDonation = data['B10']['w'];
  // $('#individual-donations').text(individualDonations);
  // $('#average-donation').text(averageDonation);

  // TODO figure out how to get the lists of team numbers, names, scores, etc.
  // TODO figure out how to apply these to different HTML elements
  // TODO figure out how to add HTML elements based on the data in the workbook
  //      probably a for loop through all the entries?
}

function searchTable() {
  var allRows = $("tr");
  $("input#search").on("keydown keyup", function() {
    allRows.hide();
    $("tr:contains('" + $(this).val() + "')").show();
  });
}


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

$(function() {
  function init() {
    Tabletop.init( { key: ‘1vTvnO-FRjo5bbetFBYyFI3R5z0vlcd0zCXlpOJ2XDes’,
    callback: function(data) { console.log(data) },
    simpleSheet: true } );
  }

  
});






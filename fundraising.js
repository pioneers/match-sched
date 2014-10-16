function init() {
    /* set up XMLHttpRequest */
    var url = "fundraising.xlsx";
    var oReq = new XMLHttpRequest();
    oReq.open("GET", url, true);
    oReq.responseType = "arraybuffer";

    oReq.onload = function(e) {
        var arraybuffer = oReq.response;

        /* convert data to binary string */
        var data = new Uint8Array(arraybuffer);
        var arr = new Array();
        for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");

        /* Call XLSX */
        var workbook = XLSX.read(bstr, {type:"binary"});
        parseWorkbook(workbook);
    }

    oReq.send();
}

function parseWorkbook(workbook) {
    var data = workbook['Sheets']['website'];
    var goal = data['B1']['w'];
    var raised = data['B2']['w'];
    var togo = data['B3']['w'];

    $('#summary').text('$' + raised + ' out of $' + goal);
    $('#goal').text('$' + goal);

    var transitionDuration = Math.min(Math.max(1, (4 * raised / goal)), 4);

    $('#chart-label-25').text('$' + goal/4);
    $('#chart-label-50').text('$' + goal/4 * 2);
    $('#chart-label-75').text('$' + goal/4 * 3);
    $('#chart-label-100').text('$' + goal);
    $('#chart-labels div').addClass('visible');

    var raisedHeight = Math.min(400, 400 * raised / goal);
    $('#chart-raised').css('height', raisedHeight + 'px').css('transition-duration', transitionDuration + 's');
    $('#chart-raised-label').text('$' + raised).css('transition-delay', transitionDuration + 's').addClass('visible');

    var individualDonations = data['B9']['w'];
    var averageDonation = data['B10']['w'];
    $('#individual-donations').text(individualDonations);
    $('#average-donation').text(averageDonation);
    $('#donation-metadata').addClass('visible').css('transition-delay', (transitionDuration + 1) + 's');
}

$(function() {
  var daysRemaining = moment('2014-12-31').diff(moment(), 'days');
  $('#days-remaining').text(moment('2014-12-31').fromNow());
  init();
});

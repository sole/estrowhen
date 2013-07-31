define(['jquery', 'base/mData', 'base/Scheduler', 'moment'],
  function ($, mdata, Scheduler) {
  'use strict';

  var scheduler = new Scheduler();

  var ul = $('#calendar');

  var currentYear = moment().year();
  var currentMonth = moment().month() + 1;
  var currentDay = moment().date();

  var buttons = '<div class="options hidden">';

  for (var i = 0; i < mdata.period.length; i ++) {
    buttons += '<button data-type="' + mdata.period[i].name + '" class="' +
               mdata.period[i].css + '">' +
               mdata.period[i].name + '</button>';
  }

  buttons += '</div><div class="options hidden">';

  for (var i = 0; i < mdata.symptoms.length; i ++) {
    buttons += '<button data-type="' + mdata.symptoms[i].name + '" class="' +
               mdata.symptoms[i].css + '">' +
               mdata.symptoms[i].name + '</button>';
  }

  buttons += '</div>';

  var drawMonth = function drawMonth(month) {
    for (var i = 1; i < month + 1; i ++) {
      var currClass = '';

      if (i === currentDay) {
        currClass = 'today';
      }

      var dateName = '<span>' + getDateFull(i) + '</span>';

      var idDate = moment([currentYear, currentMonth, i - 1]);

      var li = $('<li id="date-' + idDate.year() + '-' + idDate.month() +
               '-' + idDate.date() + '" class="' + currClass + '">' +
               dateName + buttons + '<div class="marker"></div></li>');

      scheduler.hasPeriod(li);
      scheduler.hasSymptom(li);

      ul.append(li);
    }
  };

  var getDateFull = function getDateFull(day) {
    return moment(currentYear + ' ' + currentMonth + ' ' +
                  day).format('dddd, MMMM D');
  };

  return {
    drawMonths: function drawMonths() {
      drawMonth(moment().daysInMonth() + 31);
    }
  };
});

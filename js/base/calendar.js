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

  var getDateFull = function getDateFull(year, month, day) {
    return moment(year + ' ' + month + ' ' + day).format('dddd, MMMM D');
  };

  var drawDays = function (month, isCurrent) {
    for (var i = 1; i < month.daysInMonth() + 1; i ++) {
      var currClass = '';

      if (isCurrent && i === currentDay) {
        currClass = 'today';
      }

      var dateName = '<span>' + getDateFull(month.year(), month.month() + 1, i) + '</span>';
      var idDate = moment([month.year(), month.month(), i]);
      var li = $('<li id="date-' + idDate.year() + '-' + idDate.month() +
               '-' + idDate.date() + '" class="' + currClass + '">' +
               dateName + buttons + '<div class="marker"></div></li>');

      scheduler.hasPeriod(li);
      scheduler.hasSymptom(li);

      ul.append(li);
    }
  };

  var drawMonth = function drawMonth() {
    var prevMonth = moment().subtract('month', 1);
    var currMonth = moment();
    var nextMonth = moment().add('month', 1);

    drawDays(prevMonth, false);
    drawDays(currMonth, true);
    drawDays(nextMonth, false);
  };

  return {
    drawMonths: function drawMonths() {
      drawMonth();
    }
  };
});

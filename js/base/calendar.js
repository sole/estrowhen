define(['jquery', 'moment'],
  function ($) {
  'use strict';

  var currentYear = moment().year();
  var currentMonth = moment().month() + 1;
  var currentDay = moment().date();

  var self = {
    currentDay: currentDay,
    currentDate: moment(),
    daysInMonth: moment().daysInMonth(),
    getDateFull: function getDateFull(day) {
      return moment(currentYear + ' ' + currentMonth + ' ' +
                    day).format('dddd, MMMM D');
    }
  };

  return self;
});

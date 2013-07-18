define(['jquery', 'moment'],
  function ($) {
  'use strict';

  var currentDate = moment();
  var daysInMonth = moment().daysInMonth();

  var dateBy

  return {
    currentDay: currentDate.date(),
    daysInMonth: daysInMonth
  };
});

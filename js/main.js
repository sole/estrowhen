define(['jquery', 'base/calendar', 'base/Scheduler'],
  function ($, calendar, Scheduler) {
  'use strict';

  var scheduler = new Scheduler();
  var wrapper = $('#wrapper');
  var ul = $('#calendar');

  calendar.drawMonths();

  ul.on('touchstart click', 'li', function (ev) {
    $('.options').addClass('hidden');
    $(this).find('.options').removeClass('hidden');
  });

  ul.on('touchstart click', '.period', function (ev) {
    var self = $(ev.target);

    scheduler.setPeriod(self);
  });

  ul.on('touchstart click', '.symptom', function (ev) {
    var self = $(ev.target);

    scheduler.setSymptom(self);
  });
});

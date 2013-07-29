define(['jquery', 'base/calendar'],
  function ($, calendar) {
  'use strict';

  var wrapper = $('#wrapper');
  var ul = $('#calendar');

  calendar.drawMonths();

  ul.on('touchstart click', 'li', function (ev) {
    $('.options').addClass('hidden');
    $(this).find('.options').removeClass('hidden');
  });
});

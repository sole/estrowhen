define(['jquery', 'base/calendar'],
  function ($, calendar) {
  'use strict';

  var wrapper = $('#wrapper');
  var ul = $('#calendar');

  for (var i = 1; i < calendar.daysInMonth + 1; i ++) {
    var currClass = '';

    if (i === calendar.currentDay) {
      currClass = 'today';
    }
    ul.append($('<li class="' + currClass + '">' + i +
      '<textarea class="hidden"></textarea></li>'));
  }

  ul.on('touchstart click', 'li', function (ev) {
    $('textarea').addClass('hidden');
    $(this).find('textarea').removeClass('hidden');
  });
});

define(['jquery', 'base/mData', 'base/calendar'],
  function ($, mdata, calendar) {
  'use strict';

  var wrapper = $('#wrapper');
  var ul = $('#calendar');
  var buttons = '<div class="options hidden">';

  for (var i = 0; i < mdata.period.length; i ++) {
    buttons += '<button class="' + mdata.period[i].css +
               '" data-action="tag">' + mdata.period[i].name + '</button>';
  }

  buttons += '</div><div class="options hidden">';

  for (var i = 0; i < mdata.symptoms.length; i ++) {
    buttons += '<button class="' + mdata.symptoms[i].css +
               '" data-action="tag">' + mdata.symptoms[i].name + '</button>';
  }

  buttons += '</div>';

  for (var i = 1; i < calendar.daysInMonth + 1; i ++) {
    var currClass = '';
    var colour = '';

    if (i === calendar.currentDay) {
      currClass = 'today';
    }

    var dateName = '<span>' + calendar.getDateFull(i) + '</span>';

    ul.append($('<li class="' + currClass + '">' + dateName +
              buttons + '<div class="marker ' + colour + '"></div></li>'));
  }

  ul.on('touchstart click', 'li', function (ev) {
    $('.options').addClass('hidden');
    $(this).find('.options').removeClass('hidden');
  });
});

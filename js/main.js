define(['jquery', 'base/calendar'],
  function ($, calendar) {
  'use strict';

  var wrapper = $('#wrapper');
  var ul = $('#calendar');
  var buttons = '';

  var buttonObj = [
    {
      type: 'period',
      css: 'period light',
      name: 'light'
    },
    {
      type: 'period',
      css: 'period medium',
      name: 'medium'
    },
    {
      type: 'period',
      css: 'period heavy',
      name: 'heavy'
    },
    {
      type: 'symptom',
      css: 'symptom bloated',
      name: 'bloated'
    },
    {
      type: 'symptom',
      css: 'symptom cramps',
      name: 'cramps'
    },
    {
      type: 'symptom',
      css: 'symptom bloated',
      name: 'bloated'
    }
  ];

  for (var i = 0; i < buttonObj.length; i ++) {
    var clearCSS = '';

    if (i % 3 === 0) {
      clearCSS = 'clear ';
    }

    buttons += '<button class="hidden ' + clearCSS + buttonObj[i].css +
               '" data-action="tag">' + buttonObj[i].name + '</button>';
  }

  for (var i = 1; i < calendar.daysInMonth + 1; i ++) {
    var currClass = '';

    if (i === calendar.currentDay) {
      currClass = 'today';
    }

    ul.append($('<li class="' + currClass + '">' + i + buttons + '</li>'));
  }

  ul.on('touchstart click', 'li', function (ev) {
    $('button').addClass('hidden');
    $(this).find('button').removeClass('hidden');
  });
});

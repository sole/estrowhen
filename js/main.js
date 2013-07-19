define(['jquery', 'base/calendar'],
  function ($, calendar) {
  'use strict';

  var wrapper = $('#wrapper');
  var ul = $('#calendar');
  var buttons = '<div class="options">';

  var periodObj = [
    {
      type: 'period',
      css: 'period spotting',
      name: 'spotting'
    },
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
    }
  ];

  var symptomObj = [
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
      css: 'symptom headache',
      name: 'headache'
    },
    {
      type: 'symptom',
      css: 'symptom tired',
      name: 'tired'
    }
  ];

  for (var i = 0; i < periodObj.length; i ++) {
    buttons += '<button class="hidden ' + periodObj[i].css +
               '" data-action="tag">' + periodObj[i].name + '</button>';
  }

  buttons += '</div>';

  for (var i = 0; i < symptomObj.length; i ++) {
    buttons += '<button class="hidden ' + symptomObj[i].css +
               '" data-action="tag">' + symptomObj[i].name + '</button>';
  }

  for (var i = 1; i < calendar.daysInMonth + 1; i ++) {
    var currClass = '';

    if (i === calendar.currentDay) {
      currClass = 'today';
    }

    var dateName = '<span>' + calendar.getDateFull(i) + '</span>';

    ul.append($('<li class="' + currClass + '">' + dateName +
              buttons + '</li>'));
  }

  ul.on('touchstart click', 'li', function (ev) {
    $('button').addClass('hidden');
    $(this).find('button').removeClass('hidden');
  });
});

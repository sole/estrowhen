define([],
  function () {
  'use strict';

  var period = [
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

  var symptoms = [
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

  return {
    period: period,
    symptoms: symptoms
  }
});

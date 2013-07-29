define(['asyncStorage'],
  function (asyncStorage) {
  'use strict';

  var self = {
    hasPeriod: function (li) {
      asyncStorage.getItem('period:' + li[0].id, function (marker) {
        if (marker) {
          li.find('.marker').addClass(marker);
        }
      });
    },
    setPeriod: function (button) {
      button.closest('li')
            .find('.marker')
            .removeClass('spotting light medium heavy')
            .addClass(button.data('type'));

      asyncStorage.setItem('period:' + button.closest('li')[0].id,
        button.data('type'), function () {
        console.log('saved period ', button.data('type'));
      });
    },
    setSymptom: function (button) {
      asyncStorage.getItem('symptoms:' + button.closest('li')[0].id,
        function (symptoms) {

        if (symptoms) {
          if (symptoms.indexOf(symptom) < 0) {
            symptoms.push(symptom);
          }
        } else {
          symptoms = [symptom];
        }

        asyncStorage.setItem('symptoms:' + id, symptoms, function () {
          console.log('saved symptoms ', symptoms)
        });
      });
    }
  };

  return self;
});

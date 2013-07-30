define(['asyncStorage'],
  function (asyncStorage) {
  'use strict';

  var Scheduler = function () {
    this.earliestDate = '';

    this.hasPeriod = function (li) {
      asyncStorage.getItem('period:' + li[0].id, function (marker) {
        if (marker) {
          li.find('.marker').addClass(marker);
          li.find('button.' + marker).addClass('active');
        } else {
          li.find('.marker').removeClass(marker);
          li.find('button.' + marker).removeClass('active');
        }
      });
    };

    this.hasSymptom = function (li) {
      var symptomEl = li.find('button.symptom');

      asyncStorage.getItem('symptoms:' + li[0].id, function (symptoms) {
        for (var i = 0; i < symptomEl.length; i ++) {
          var type = $(symptomEl[i]).attr('data-type');

          if (symptoms && symptoms.indexOf(type) > -1) {
            li.find('button.' + type).addClass('active');
          }
        }
      });
    };

    this.setPeriod = function (button) {
      var isActive = button.hasClass('active');
      var marker = button.closest('li').find('.marker');
      var period = button.data('type');
      var id = button.closest('li')[0].id;

      marker.removeClass('spotting light medium heavy');
      button.siblings().removeClass('active');

      if (isActive) {
        button.removeClass('active');
        isActive = false;
        asyncStorage.removeItem('period:' + id);
      } else {
        button.addClass('active');
        marker.addClass(period);
        asyncStorage.setItem('period:' + id,
          button.data('type'));
      }
    };

    this.setSymptom = function (button) {
      var isActive = button.hasClass('active');
      var id = button.closest('li')[0].id;

      if (isActive) {
        button.removeClass('active');
        isActive = false;
      } else {
        button.addClass('active');
        isActive = true;
      }

      asyncStorage.getItem('symptoms:' + id,
        function (symptoms) {

        var symptom = button.data('type');

        if (!symptoms) {
          symptoms = [];
        }

        if (symptoms.indexOf(symptom) === -1 && isActive) {
          symptoms.push(symptom);
        } else if (!isActive) {
          symptoms.splice(symptoms.indexOf(symptom), 1);
        }

        asyncStorage.setItem('symptoms:' + id, symptoms,
          function () {
          console.log('saved symptoms ', symptoms)
        });
      });
    };
  };

  return Scheduler;
});

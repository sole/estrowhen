define(['jquery', 'asyncStorage', 'moment'],
  function ($, asyncStorage, moment) {
  'use strict';

  var Scheduler = function () {
    var self = this;

    var ul = $('#calendar');

    this.nextDate = '';

    var setAverage = function (year, month, day) {
      if (month === 12) {
        year += 1;
      }

      asyncStorage.getItem('averages', function (avg) {
        if (avg) {
          var days;

          if (typeof avg.days !== 'object') {
            avg.days = [28];
          }

          if (avg.days.length < 1) {
            days = avg.days.push(day);
          }

          var currAvg = 0;

          // Remove the oldest month
          if (days.length > 3) {
            days.slice(0, 1);
          }

          avg.dayCount = avg.days.length;

          for (var i = 0; i < days.length; i ++) {
            currAvg += days[i];
          }

          avg.days = days;
          avg.currAvg = Math.floor(currAvg / avg.dayCount) || 28;

        } else {
          avg = {
            days: [28],
            dayCount: 1,
            currAvg: 28
          };
        }

        month = parseInt(month, 10);

        var nextDate = moment([year, month, day - 1]).add('days', avg.currAvg);

        self.nextDate = nextDate.year() + '-' + nextDate.month() + '-' + nextDate.date();
        ul.find('#date-' + self.nextDate + ' .marker').addClass('heavy');
        asyncStorage.setItem('averages', avg);
      });
    };

    this.hasPeriod = function (li) {
      var firstDay = false;

      asyncStorage.getItem('period:' + li[0].id, function (marker) {
        if (marker) {
          if (!firstDay) {
            var date = li[0].id.split('-');

            setAverage(date[1], date[2], date[3]);
          }

          li.find('.marker').addClass(marker);
          li.find('button.' + marker).addClass('active');
          firstDay = true;
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
        asyncStorage.setItem('period:' + id, button.data('type'));
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

define(['jquery', 'asyncStorage', 'moment'],
  function ($, asyncStorage, moment) {
  'use strict';

  var Scheduler = function () {
    var self = this;

    var ul = $('#calendar');

    this.nextDate = '';

    var updateAverages = function (avg, year, month, day) {
      month = parseInt(month, 10);

      var nextDate = moment([year, month, day - 1]).add('days', avg.currAvg);

      self.nextDate = nextDate.year() + '-' + nextDate.month() + '-' + nextDate.date();
      ul.find('#date-' + self.nextDate + ' .marker').addClass('predict');
      asyncStorage.setItem('averages', avg);
    };

    var setAvg = function (avg, year, month, day) {
      var currAvg = 0;

      avg.dayCount = avg.days.length;

      for (var i = 0; i < avg.days.length - 1; i ++) {
        currAvg += avg.days[i];
      }

      avg.currAvg = Math.floor(currAvg / avg.dayCount) || 28;

      updateAverages(avg, year, month, day);
    };

    var setStart = function (avg, year, month, day) {
      asyncStorage.setItem('start', {
        year: year,
        month: month,
        day: day
      });

      avg.days.push(28);
      setAvg(avg, year, month, day);
    }

    var setAverage = function (year, month, day) {
      if (month === 12) {
        year += 1;
      }

      asyncStorage.getItem('averages', function (avg) {
        if (avg) {
          if (typeof avg.days !== 'object') {
            avg.days = [];
          }

          if (avg.dayCount > 0) {
            asyncStorage.getItem('start', function (d) {
              if (d) {
                var lastDate = moment([d.year, d.month, d.day]);
                var currDate = moment([year, month, day]);

                if (lastDate.toString() !== currDate.toString()) {
                  avg.days.push(lastDate.diff(currDate));
                }

                asyncStorage.setItem('start', {
                  year: year,
                  month: month,
                  day: day
                });

                setAvg(avg, year, month, day);

              } else {
                setStart(avg, year, month, day);
              }
            });

          } else {
            setStart(avg, year, month, day);
          }

        } else {
          avg = {
            days: [28],
            dayCount: 1,
            currAvg: 28
          };

          updateAverages(avg, year, month, day);
        }
      });
    };

    this.hasPeriod = function (li) {
      var firstDay = false;

      asyncStorage.getItem('period:' + li[0].id, function (marker) {
        if (marker) {
          if (!firstDay) {
            var date = li[0].id.split('-');

            setAverage(date[1], date[2], date[3]);
            firstDay = true;
          }

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
        asyncStorage.removeItem('start');
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
          console.log('saved symptoms ', symptoms);
        });
      });
    };
  };

  return Scheduler;
});

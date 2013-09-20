define(['jquery', 'asyncStorage', 'moment'],
  function ($, asyncStorage, moment) {
  'use strict';

  var Period = function(data) {
    for(var k in data) {
      this[k] = data[k];
    }
  };


  var Scheduler = function() {

    var periods = [];
    var symptoms = [];


    function sortPeriods() {
      periods.sort(function(a, b) {
        if(a.timestamp < b.timestamp) {
          return -1;
        } else if(a.timestamp === b.timestamp) {
          return 0;
        } else {
          return 1;
        }
      });
    }


    function getNextPeriodId() {
      
      var id = periods.reduce(function(previousValue, currentValue) {
        console.log('buu', previousValue, currentValue);
        return Math.max(previousValue, currentValue.id);
      }, 0);

      return id + 1;

    }


    this.addPeriod = function(when, id) {

      var timestamp;
      
      if(when) {
        var date = new Date(when[0], when[1] - 1, when[2]);
        timestamp = date.getTime();
        console.log('new timestamp for', when[0], when[1] - 1, when[2], date.toDateString());
      } else {
        timestamp = Date.now();
      }


      if(id === undefined) {
        id = getNextPeriodId();
      }

      var period = new Period({ timestamp: timestamp, id: id });
      periods.push(period);

      sortPeriods();

    };


    this.getPeriodAverage = function(start, end) {
      console.log('eh');

      if(periods.length <= 1) {

        return 28;

      } else {

        console.log('wops', periods.length);

        if(start === undefined) {
          start = periods[0].timestamp;
        }

        if(end === undefined) {
          end = periods[ periods.length - 1 ].timestamp;
        }

        var intervalPeriods = periods.filter(function(period) {
          return period.timestamp >= start && period.timestamp <= end;
        });

        console.log(start, end, intervalPeriods.length);

        var total = 0;
        
        for(var i = 1; i < intervalPeriods.length; i++) {
          
          console.log('loop');

          var a = intervalPeriods[i - 1].timestamp;
          var b = intervalPeriods[i].timestamp;

          var diff = (b - a) * 0.001;
          var days = Math.round(diff / (3600 * 24));

          console.log(diff, 'days', days);

          total += days;

        }

        return total / (intervalPeriods.length - 1);

      }

    };

  };

  return Scheduler;

  /*var Scheduler = function () {
    var self = this;
    var firstDay = false;

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
            setAvg(avg, year, month, day);
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
      asyncStorage.getItem('period:' + li[0].id, function (marker) {
        if (marker) {
          if (!firstDay) {
            var date = li[0].id.split('-');
            console.log('first day!')
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

  return Scheduler;*/
});

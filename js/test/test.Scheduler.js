define(['jquery', '../base/Scheduler', 'asyncStorage'],
  function ($, Scheduler, asyncStorage) {
  'use strict';

  var s;// = new Scheduler();

  describe('Scheduler', function() {

    after(function() {
      asyncStorage.clear();
    });

    beforeEach(function() {
      s = new Scheduler();
    });

    it('should start with a 28 days average', function() {
      var avg = s.getPeriodAverage();
      assert.equal(avg, 28);
    });

    it('should average periods starting in different months', function() {
      s.addPeriod([2013, 1, 1]);
      s.addPeriod([2013, 2, 1]);
      assert.equal(s.getPeriodAverage(), 31);
    });

    it('should average periods starting in the same month', function() {
      s.addPeriod([2013, 1, 1]);
      s.addPeriod([2013, 1, 31]);
      assert.equal(s.getPeriodAverage(), 30);
    });

    it('should average periods starting in same month and different months', function() {
      s.addPeriod([2013, 1, 1]);
      s.addPeriod([2013, 1, 31]);
      s.addPeriod([2013, 3, 2]);
      assert.equal(s.getPeriodAverage(), 30);
    });

    /*it('should discard abnormal/extreme values', function() {
      s.addPeriod([2013, 1, 1]);
      s.addPeriod([2013, 1, 31]);
      s.addPeriod([2013, 3, 2]);
      assert.equal(s.getPeriodAverage(), 30);
    });*/




  });

  /*var s = new Scheduler();
  var buttonP = $('button.medium');
  var buttonS = $('button.tired');
  var id = 'date-2013-7-12';
  var marker = buttonP.closest('li').find('.marker');

  describe('Scheduler', function () {
    after(function () {
      asyncStorage.clear();
    });

    it('should set period', function (done) {
      setTimeout(function () {
        s.setPeriod(buttonP);
        expect(buttonP.hasClass('active')).to.equal(true);
        expect(marker.hasClass('medium')).to.equal(true);
        asyncStorage.getItem('period:' + id, function (d) {
          expect(d).to.equal('medium');
          done();
        });
      }, 100);
    });

    it('should unset period', function (done) {
      s.setPeriod(buttonP);
      expect(buttonP.hasClass('active')).to.equal(false);
      expect(marker.hasClass('medium')).to.equal(false);
      setTimeout(function () {
        asyncStorage.getItem('period:' + id, function (d) {
          expect(d).to.equal(null);
          done();
        });
      }, 100);
    });

    it('should set symptom', function (done) {
      s.setSymptom(buttonS);
      expect(buttonS.hasClass('active')).to.equal(true);
      setTimeout(function () {
        asyncStorage.getItem('symptoms:' + id, function (d) {
          expect(d.indexOf('tired')).to.equal(0);
          done();
        });
      }, 100);
    });

    it('should unset symptom', function (done) {
      s.setSymptom(buttonS);
      expect(buttonS.hasClass('active')).to.equal(false);
      setTimeout(function () {
        asyncStorage.getItem('symptoms:' + id, function (d) {
          expect(d.indexOf('tired')).to.equal(-1);
          done();
        });
      }, 100);
    });
  });*/
});

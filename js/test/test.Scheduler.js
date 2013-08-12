define(['jquery', '../base/Scheduler', 'asyncStorage'],
  function ($, Scheduler, asyncStorage) {
  'use strict';

  var s = new Scheduler();
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
  });
});

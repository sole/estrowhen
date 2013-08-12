define(['jquery', '../base/Scheduler'],
  function ($, Scheduler) {
  'use strict';

  var s = new Scheduler();
  var button = $('button.medium');

  describe('Scheduler', function () {
    after(function () {
      asyncStorage.clear();
    });

    it('should set period', function () {
      s.setPeriod(button);
      expect(button.hasClass('active')).to.equal(true);
    });

    it('should unset period', function () {
      s.setPeriod(button);
      expect(button.hasClass('active')).to.equal(false);
    });
  });
});

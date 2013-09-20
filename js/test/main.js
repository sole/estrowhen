requirejs.config({
  paths: {
    'jquery': '../lib/jquery',
    'moment': '../lib/moment',
    'asyncStorage': '../lib/asyncStorage'
  },
  shim: {
    'jquery': {
      exports: '$'
    },
    'asyncStorage': {
      exports: 'asyncStorage'
    }
  }
});


require(['require', 'lib/chai', 'lib/mocha', 'lib/sinon'],
  function (require, chai, sinon) {
    assert = chai.assert;
    should = chai.should();
    expect = chai.expect;

    mocha.setup('bdd');

    require(
      ['test.Scheduler', 'test.calendar'],
      function (Scheduler, calendar) {
        mocha.run();
      }
    );
  }
);

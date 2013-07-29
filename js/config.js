requirejs.config({
  deps: ['main'],
  paths: {
    'jquery': 'lib/jquery',
    'moment': 'lib/moment',
    'asyncStorage': 'lib/asyncStorage'
  },
  shim: {
    'jquery': {
      exports: 'jQuery'
    },
    'moment': {
      exports: 'moment'
    },
    'asyncStorage': {
      exports: 'asyncStorage'
    }
  }
});

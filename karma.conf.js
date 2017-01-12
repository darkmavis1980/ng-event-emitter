'use strict';
// Karma configuration
// Generated on Tue Apr 14 2015 14:43:45 GMT+0100 (IST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
      'jasmine',
      'jasmine-matchers'
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-loader/angular-loader.js',
      'bower_components/ng-lodash/build/ng-lodash.js',
      // endbower
      'index.js',
      'tests/*.spec.js',
    ],

    autoWatch : true,

    browsers : ['Chrome','PhantomJS'],

    plugins : [
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-jasmine-matchers',
      'karma-junit-reporter',
      'karma-jasmine-html-reporter',
      'karma-coverage',
      'karma-mocha-reporter'
    ],

    reporters: [
      //'coverage',
      'kjhtml',
      'mocha'
    ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/!(*.spec|*.specs).js': ['coverage']
    }

  });
};

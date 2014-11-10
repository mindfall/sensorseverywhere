// Karma configuration
// Generated on Fri Nov 07 2014 12:58:55 GMT+1100 (AEDT)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',


    // frameworks to use
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'public/vendor/angular/angular.js',
      'public/vendor/angular-mocks/angular-mocks.js',
      'public/vendor/angular-resource/angular-resource.js',
      'public/vendor/angular-route/angular-route.js',
      'public/vendor/angular-leaflet-directive.js',
      'public/vendor/angular-bootstrap/ui-bootstrap.js',
      'public/vendor/angular-ui-router/release/angular-ui-router.js',
      'public/vendor/bg-splitter/js/splitter.js',
      'public/vendor/angular-xeditable/js/xeditable.js',
      'public/vendor/ng-file-upload/angular-file-upload.js',
      'public/vendor/toastr/toastr.js',
      'public/vendor/sinon/lib/sinon.js',
      'public/app/app.js',
      'public/app/common/wFNotifier.js',
      'public/app/common/wFProjectFactory.js',
      'public/app/common/wFMapFactory.js',
      'public/app/projects/wFProjectCtrl.js',
      'public/app/account/wFIdentity.js',
      'public/app/account/wFUser.js',
      'public/app/projects/wFProjectCtrl.js',
      'spec/*.js'
    ],





    // list of files to exclude
    exclude: [
      
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['Chrome'],

    plugins: [
        'karma-chrome-launcher',
        'karma-jasmine'
    ],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};

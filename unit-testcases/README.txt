Read me
This application was compiled using Webstorm, tested with Jasmine framework and coverage reported using Karma. In order to access, please install the following along with its dependencies. 

-Webstorm
-nodejs
-Jasmine 
-Karma

The package should have the all the dependency included in the paths. If the coverage does not work, the dependencies can be installed directly from the Webstorm terminal. Click on the terminal on the bottom left corner and enter the following commands. 

Installs the test framework
npm install --save-dev jasmine
npm jasmine init

Installs the test runner
npm install --save-dev karma

Configuration of the Karma.config.js file should already be included. In case it is not, configuration steps can be done but entering the follow into the terminal and apply the following.

npm Karma init

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
        'js/*.js',
        'unit-testcases/spec/*Test.js',
        '*.js',
        'data/*js'
    ],
    exclude: [
        'js/index.js'
    ],
    preprocessors: {
      '**/*.js': ['coverage'],
    },
    reporters: ['progress','coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity

Installs the coverage reporting tool
npm install --save-dev karma-coverage 
npm karma-coverage init





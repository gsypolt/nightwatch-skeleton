/*
 * Triggers a full screen visual test for the current URL.
 *
 * Example: browser.customVisualTest('app_name', 'window_name', ['match_level'], [function(result) {
 *            function body - validate the result (return element);
 *          }]);
 *
 * @param {String} sessionName - represents the logical name of the AUT (this name will be presented in the test result)
 * @param {String} testName - represents the logical name of this window/validation point that will appear in the test result report
 * @param {boolean} fullPage - configures whether a full page (true) or the current viewport (false) image will be considered for the test
 * @param {String} [matchLevel] - overrides the test comparison level when set to 'layout' (default 'strict')
 * @param {Function} [callback] - the comparison result object is passed to the optional callback function for assertion purpose
 */

'use strict';

var driver;
var webdriver = require('selenium-webdriver');
var _http = require('selenium-webdriver/http');
var url = require('url');

var Eyes = require('eyes.selenium').Eyes;
var eyes = new Eyes(process.env.EYES_DEDICATED_SERVER);
var MatchLevel = require('eyes.sdk/src/MatchSettings').MatchLevel;
var Target = require('eyes.selenium').Target;
var FileLogHandler = require('eyes.selenium').FileLogHandler;
var FixedCutProvider = require('eyes.selenium').FixedCutProvider;

exports.command = function(sessionName, testName, fullPage, matchLevel, callback) {

  var browser = this;
  var envName = browser.globals.environment;
  var batchNumber = process.env.APPLITOOLS_BATCH_ID;
  var httpConnectUrl = /[Ll]ocal/.test(envName) ? 'http://localhost:4444/wd/hub' :
    'http://' + process.env.SAUCE_USERNAME + ':' + process.env.SAUCE_ACCESS_KEY +'@ondemand.saucelabs.com:4444/wd/hub';

  if (typeof fullPage === 'function') {
    callback = fullPage;
    fullPage = false;
    matchLevel = '';
  } else if ((typeof fullPage === 'string') && (matchLevel === undefined)) {
    matchLevel = fullPage;
    fullPage = false;
  } else if (fullPage === undefined) {
    fullPage = false;
    matchLevel = '';
  } else if (typeof matchLevel === 'function') {
    callback = matchLevel;
    if (typeof fullPage === 'string') {
      matchLevel = fullPage;
      fullPage = false;
    } else {
      matchLevel = '';
    }
  } else if (matchLevel === undefined) {
    matchLevel = '';
  }

  browser
    .session(function(session) {
      var client = Promise.resolve(url).then(function (url) {
        return new _http.HttpClient(httpConnectUrl, null, null);
      });
      driver = webdriver.WebDriver.attachToSession(new _http.Executor(client), session.sessionId);
    })
    .perform(function(done) {
      // Set the applitools for visual test
      (/layout/i).test(matchLevel) ? eyes.setMatchLevel(MatchLevel.Layout) : eyes.setMatchLevel(MatchLevel.Strict);
      eyes.setLogHandler(new FileLogHandler(true));
      eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
      eyes.setSaveNewTests(true);
      if (fullPage) {
        eyes.setStitchMode(Eyes.StitchMode.CSS);
      }
      eyes.setForceFullPageScreenshot(fullPage);
      eyes.addProperty('Test name', testName);
      eyes.setBatch('uw-visual-' + batchNumber, batchNumber || Date.now());
      eyes.open(driver, 'Applitools', sessionName + ' ' + envName)
      .then(function() {
        done();
      });
    })
    .perform(function(done){
        // The user takes a FULL screenshot of the current URL
        //      to capture visual image and perform assertation
      eyes.setImageCut(new FixedCutProvider(
        browser.globals.cutTop,
        browser.globals.cutBottom,
        browser.globals.cutLeft,
        browser.globals.cutRight
      ));
      eyes.checkWindow(testName).then(function(){
        done();
      });
    })
    .perform(function(done) {
      // End visual testing and validate visual correctness.
      eyes.close(false).then(function(result) {
        if (typeof callback === 'function') {
          callback.call(browser, result);
        }
        done();
      });
    });

  return this;

};

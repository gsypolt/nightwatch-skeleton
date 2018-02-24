// This is a demo test that uses the cusom commands customScrollToClick and customChangeWindow

'use strict';
const WAIT_TIME = 10000;

module.exports = {
  '@tags' : ['newsletter', 'uiComponent'],

  'users are redirected to NewsLetter sign-up tab ' : function(browser) {

    if (browser.globals.propertyData.environment.match(/(android|chrome)/i)) {
    browser
      // GIVEN the user goes directly to USA TODAY NETWORK amp article
      .url(browser.globals.propertyData.ampURL)
      .waitForElementVisible('.newsletter-button', WAIT_TIME)
      // WHEN user selects the NEWSLETTER CTA button
      .customScrollToClick('.newsletter-button')
      // THEN the user will be redirected to a new tab where they can sign up for a weekly newsletter according to region
      .customChangeWindows(1)
      .assert.urlContains('newsletters');
    } else {
      console.log("This test isn't scheduled to execute in the selected environment.");
    }

  },

  afterEach: function(browser, done) {
    browser
      .sauceEnd()
      .end();
    done();
  }

};

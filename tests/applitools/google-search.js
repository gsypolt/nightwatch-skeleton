module.exports = {
    '@tags': ['visual'],
  
    'google-search' : function(browser) {
  
      if (browser.globals.screenWidth) {
        browser.resizeWindow(browser.globals.screenWidth, browser.globals.screenHeight);
      }
      browser
        .url('https://google.com')
        // Perform the visual test
        .setVisualTest(browser.currentTest.module, 'google-search', false, function(result) {
          // End visual testing and validate visual correctness.
            browser.assert.equal(result.mismatches, 0);
        });
    },
  
    afterEach: function(browser, done) {
      browser
        .sauceEnd()
        .end();
      done();
    }
  
  };
  
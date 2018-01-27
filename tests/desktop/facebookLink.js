module.exports = {
    '@tags': ['desktop'],
  
    'Facebook following link': function(browser) {
      
      browser
        // GIVEN user navigates to site url
        .url(browser.globals.propertyData.siteURL)
        // WHEN user clicks on Facebook link
        .verify.visible('.qa-facebook')
        .perform(function(done) {
          browser.click('.qa-facebook');
          done();
        })

        .perform(function(done){
            browser.customChangeWindows(1);
            browser.assert.urlContains(browser.globals.propertyData.facebookURL);
            done();
            });
    },
  
    afterEach: function(browser, done) {
      browser
        .customSauceEnd()
        .end();
      done();
    }
  
  };
  
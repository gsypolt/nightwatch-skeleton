module.exports = {
    '@tags' : ['mobileWeb'],
  
    'nightwatch-skeleton - ad displayed after every 4th paragraph' : function(browser) {
      var numberOfStories;
      browser
        //GIVEN the user goes directly to USA TODAY NETWORK amp article
        .url(browser.globals.propertyData.ampAdURL)
        //calculate how many paragraphs, ".story-container and divide by 4"
        .elements("css selector",".story-container", function(result) {
          numberOfStories=parseInt(result.value.length / 4);
        })
        .perform(function(done) {
          //THEN an ad displayed for every fourth paragraph
          //loop through each ad expected, e.g. 26 paragraphs = 6 ads
          //skipping first and last ads as they are not numerically named
          for (var i = 1; i < numberOfStories - 1; i++) {
            browser.assert.elementPresent('.ad-' + i);
          }
          done();
        });
    },
    afterEach: function(browser, done) {
      browser
        .sauceEnd()
        .end();
      done();
    }
  
  };
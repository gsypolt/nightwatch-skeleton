'use strict';

module.exports = {

  '@tags': ['scores', 'uiComponent'],

  'sportsStats' : function(browser) {

  browser
  .url(browser.globals.propertyData.varsityHsSportsURL)
    //GIVEN the user selects a particular sport
    .perform(function() {
      browser.clickShadowElement("Football", "text");
    })
    .assert.urlContains("Football")
    .perform(function() {
      browser.clickShadowElement("Schedules/Scores", "text");
    })
    .perform(function() {
      browser.clickShadowElement("PAPER-INPUT","tagName");
    })
    .keys([browser.Keys.DOWN_ARROW, browser.Keys.ENTER])
    //WHEN user selects the boxscore of the particular sport
    .perform(function() {
      browser.clickShadowElement("Boxscore","text");
    })
    //THEN user is navigated to the boxscore page
    .assert.urlContains("gameId")
    //Assert tables are being displayed
    .perform(function() {
      browser.assertShadowElement("IRON-PAGES","tagName");
    })
    },

  afterEach: function(browser, done) {
    browser
      .sauceEnd()
      .end();
    done();
  }
};

module.exports = {
    '@tags': ['template'],
  
    'test skeleton template': function(browser) {
      
      browser
        // GIVEN the user does some pre-condition
        .url('https://www.google.com')
        // WHEN the user does some actions
          
        // THEN the user expects the following outcome
        
    },
  
    afterEach: function(browser, done) {
      browser
        .sauceEnd()
        .end();
      done();
    }
  
  };
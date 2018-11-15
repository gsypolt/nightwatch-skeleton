exports.command = function(result) {
    
    handle_error = function(error) {
        // If STDERR is being caught elsewhere, at least acknowledge an error
        console.log("An error was thrown in " + __filename);
        console.log("This is non-fatal; execution will complete but Sauce Labs metadata may be unavailable for these tests.")
        console.log("Error details were sent to stderr.");
        console.error(err);
    }

    try {
        var SauceLabs = require("saucelabs");

        var saucelabs = new SauceLabs({
            username: process.env.SAUCE_USERNAME,
            password: process.env.SAUCE_ACCESS_KEY
        });

        var sessionid = this.capabilities['webdriver.remote.sessionid'];
        var jobName = this.currentTest.name;

        // Update the console log first, so any errors with the REST API can be
        // Corrected after the fact
        console.log("SauceOnDemandSessionID=" + sessionid + " job-name=" + jobName);

        var terminate = this.end;

        saucelabs.updateJob(sessionid, {
            passed: this.currentTest.results.failed === 0,
            name: jobName,
        }, function(err, res) {
            if(err){
                handle_error(err);
            } else {
                //no-op
            }
            terminate();
        });
    } catch (err) {
        handle_error(err);
        this.end();
    }
};

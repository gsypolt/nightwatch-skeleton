exports.command = function(result) {

    var find_proxy = function(){
        proxy = (
            process.env.https_proxy
            || process.env.HTTPS_PROXY
            || process.env.http_proxy
            || process.env.https_proxy
        )

        return proxy;
    }

    var SauceLabs = require("saucelabs");

    var saucelabs = new SauceLabs({
        username: process.env.SAUCE_USERNAME,
        password: process.env.SAUCE_ACCESS_KEY
    });

    var sessionid = this.capabilities['webdriver.remote.sessionid'];
    var jobName = this.currentTest.name;

    saucelabs.updateJob(sessionid, {
        passed: this.currentTest.results.failed === 0,
        name: jobName,
        proxy: find_proxy()
    }, function() {});

    console.log("SauceOnDemandSessionID=" + sessionid + " job-name=" + jobName);
    this.end();
};

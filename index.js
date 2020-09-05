var BrowserStack = require("browserstack");
var browserStackCredentials = {
    username: "",
    password: ""
};
 
// REST API
var client = BrowserStack.createClient(browserStackCredentials);
 
// client.getBrowsers(function(error, browsers) {
//     console.log("The following browsers are available for testing");
//     console.log(browsers);
// });

// settings: A hash of settings for the worker (an extended browser object).
// os: See browser object for details.
// os_version: See browser object for details.
// browser: See browser object for details.
// browser_version: See browser object for details.
// device: See browser object for details.
// url (optional): Which URL to navigate to upon creation.
// timeout (optional): Maximum life of the worker (in seconds). Maximum value of 1800. Specifying 0 will use the default of 300.
// name (optional): Provide a name for the worker.
// build (optional): Group workers into a build.
// project (optional): Provide the project the worker belongs to.
// browserstack.video (optional): Set to false to disable video recording.

const workerSettings = {
    "os": "Windows",
    "os_version": "10",
    "browser": "Firefox",
    "browser_version": "74.0",
    "url": "https://portal.unic.ac.cy",
    "timeout": 1000,
    "name": "SessionName",
    "build": "TestingNewBuild"
}

let worker = client.createWorker( workerSettings, function( err, worker ) {

    console.log("These are the worker stuff ")
    console.log(worker);

});

// Automate API
var automateClient = BrowserStack.createAutomateClient(browserStackCredentials);
 
automateClient.getBrowsers(function(error, browsers) {
    console.log("The following browsers are available for automated testing");

    const chromeBrowsers = browsers.filter( x => x.browser === 'chrome');
    const len = chromeBrowsers.length;


    console.log( chromeBrowsers[len - 1].browser_version, chromeBrowsers[len - 2].browser_version, chromeBrowsers[len - 3].browser_version);

    console.log("Executing tests on:");
    //executeTests(chromeBrowsers.slice(Math.max(chromeBrowsers.length - 5,0)));
    executeTests(chromeBrowsers.slice(1).slice(-5));
});

/* automateClient.getBuilds( function( err, builds) {
    console.log("These are the builds: ")
    console.log(builds);
}) */


function executeTests(browsers){
    browsers.forEach(element => {
        console.log(element.browser + " " + element.browser_version);
    });
}




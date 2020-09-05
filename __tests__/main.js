const webdriver = require("selenium-webdriver");
const { until } = require("selenium-webdriver");
const { By } = require("selenium-webdriver");
var BrowserStack = require("browserstack");
var browserStackCredentials = {
  username: "",
  password: "",
};

var capabilities = {
  os_version: "10",
  resolution: "1920x1080",
  os: "Windows",
  browserName: "chrome",
  browser_version: "83.0",
  "browserstack.user": browserStackCredentials.username,
  "browserstack.key": browserStackCredentials.password,
};

//var client = BrowserStack.createClient(browserStackCredentials);

//ACTUAL TEST

function setupCapabilities() {

  return new Promise( ( resolve, reject) => {
    var automateClient = BrowserStack.createAutomateClient(browserStackCredentials);
    automateClient.getBrowsers(function (error, browsers) {

      const chromeBrowsers = browsers.filter((x) => x.browser === "chrome");
      const len = chromeBrowsers.length;

      var newCap = capabilities;
      
      newCap.browser = chromeBrowsers[len - 1].browser;
      newCap.browser_version = chromeBrowsers[len - 1].browser_version;

      console.log(capabilities);
      resolve(newCap);
    });
  })

}

describe("webdriver", () => {
  let driver;
  beforeAll( async () => {
    
    // await setupCapabilities().then( async cap => {
      driver = new webdriver.Builder()
      .usingServer("https://hub-cloud.browserstack.com/wd/hub")
      .withCapabilities(capabilities)
      .build();
      await driver.get("https://portal.unic.ac.cy/signin");
    // });
    
    /*  await driver.getSession().then(function(session) {
      sessionId = session.id_; */
    //  });

  }, 30000);

  afterAll(async () => {
    await driver.quit();
  }, 40000);

  it("has signed in", async () => {
    // await driver.wait(async () => {

    let user = await driver.findElement(By.id("studentId"));
    user.sendKeys("U164N0236");
    let pass = await driver.findElement(By.id("password"));
    pass.sendKeys("AMIRSALAR");
    let button = await driver.findElement(By.id("signinBtn"));

    await button.click();
    //button.click;
    await expect(await driver.getTitle()).toBe("Dashboard | UNIC Portal");
    //}, 40000);

    //await expect(await driver.getTitle()).toBe('Dashboard | UNIC Portal');
  }, 50000);
});

/* 
function executeTests(browsers){
    browsers.forEach(element => {
        console.log(element.browser + " " + element.browser_version);
    });
}
 */

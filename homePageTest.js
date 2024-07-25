const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

describe('Homepage Test', function() {
    this.timeout(20000); // Set timeout to 20 seconds to accommodate slow interactions

    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();
    });

    after(async function() {
        await driver.quit();
    });

    it('should navigate to the About Us page', async function() {
        console.log('Navigating to homepage...');
        await driver.get('http://localhost/newproject/Home.html'); // Update URL
        await driver.sleep(2000); // Wait for 2 seconds to see the page load

        console.log('Clicking on About Us link...');
        await driver.findElement(By.linkText('ABOUT Us')).click();
        await driver.sleep(3000); // Wait for 3 seconds to see the page load

        let currentUrl = await driver.getCurrentUrl();
        console.log('Current URL:', currentUrl);

        assert.strictEqual(currentUrl, 'http://localhost/newproject/About.html');
    });

    it('should navigate to Play vs AI page', async function() {
        console.log('Navigating to homepage...');
        await driver.get('http://localhost/newproject/Home.html'); // Update URL
        await driver.sleep(2000); // Wait for 2 seconds to see the page load

        console.log('Clicking on Play vs AI button...');
        await driver.findElement(By.linkText('Play vs AI')).click();
        await driver.sleep(3000); // Wait for 3 seconds to see the page load

        let currentUrl = await driver.getCurrentUrl();
        console.log('Current URL:', currentUrl);

        assert.strictEqual(currentUrl, 'http://localhost/newproject/game.html');
    });

    it('should navigate to Multi Player page', async function() {
        console.log('Navigating to homepage...');
        await driver.get('http://localhost/newproject/Home.html'); // Update URL
        await driver.sleep(2000); // Wait for 2 seconds to see the page load

        console.log('Clicking on Multi Player button...');
        await driver.findElement(By.linkText('Multi Player')).click();
        await driver.sleep(3000); // Wait for 3 seconds to see the page load

        let currentUrl = await driver.getCurrentUrl();
        console.log('Current URL:', currentUrl);

        assert.strictEqual(currentUrl, 'http://localhost/newproject/game1.html');
    });

    it('should navigate to Multi Round Play page', async function() {
        console.log('Navigating to homepage...');
        await driver.get('http://localhost/newproject/Home.html'); // Update URL
        await driver.sleep(2000); // Wait for 2 seconds to see the page load

        console.log('Clicking on Multi Round Play button...');
        await driver.findElement(By.linkText('Multi Round Play')).click();
        await driver.sleep(3000); // Wait for 3 seconds to see the page load

        let currentUrl = await driver.getCurrentUrl();
        console.log('Current URL:', currentUrl);

        assert.strictEqual(currentUrl, 'http://localhost/newproject/game2.html');
    });
});
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');

async function registrationTest() {
    // Set up the WebDriver and navigate to the registration page
    let options = new chrome.Options();
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    try {
        // Open the registration page
        console.log('Navigating to the registration page');
        await driver.get('http://localhost/newproject/register.php');

        // Locate and fill in the name field
        console.log('Entering name');
        await driver.findElement(By.name('name')).sendKeys('Ravi');

        // Locate and fill in the email field
        console.log('Entering email');
        await driver.findElement(By.name('email')).sendKeys('ravi1@gmail.com');

        // Locate and fill in the password field
        console.log('Entering password');
        await driver.findElement(By.name('password')).sendKeys('1234');

        // Locate and fill in the confirm password field
        console.log('Entering confirm password');
        await driver.findElement(By.name('cpassword')).sendKeys('1234');

        // Locate and click the submit button
        console.log('Clicking submit');
        await driver.findElement(By.name('submit')).click();

        // Increase the timeout to 20 seconds
        const timeout = 20000;

        // Wait for the success or error message to be displayed
        console.log('Waiting for message element');
        await driver.wait(until.elementLocated(By.className('message')), timeout);

        // Get the message text
        console.log('Getting message text');
        let message = await driver.findElement(By.className('message')).getText();

        // Check if the registration was successful or failed
        if (message.includes('registered successfully')) {
            console.log('Registration test passed.');
        } else if (message.includes('user already exist!')) {
            console.log('Registration test failed: User already exists.');
        } else if (message.includes('confirm password not matched!')) {
            console.log('Registration test failed: Confirm password not matched.');
        } else {
            console.log('Registration test failed: Unexpected message:', message);
        }
    } catch (err) {
        console.error('Error during test execution:', err);
        // Take a screenshot for debugging
        let image = await driver.takeScreenshot();
        fs.writeFileSync('registration_screenshot.png', image, 'base64');
    } finally {
        // Quit the WebDriver
        await driver.quit();
    }
}

// Run the test
registrationTest();

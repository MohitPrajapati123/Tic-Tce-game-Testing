// const { Builder, By, until } = require('selenium-webdriver');
// const assert = require('assert');

// async function loginTest() {
//     // Set up the WebDriver and navigate to the login page
//     let driver = await new Builder().forBrowser('firefox').build();

//     try {
//         // Open the login page
//         await driver.get('http://localhost/newproject/login.php');
// https://chatgpt.com/c/675e06f2-03bf-4a93-825f-4c91eb4c60e1
//         // Locate and fill in the email field
//         await driver.findElement(By.name('email')).sendKeys('mohit@gmail.com');

//         // Locate and fill in the password field
//         await driver.findElement(By.name('password')).sendKeys('123');

//         // Locate and click the submit button
//         await driver.findElement(By.name('submit')).click();

//         // Wait for the success or error message to be displayed
//         await driver.wait(until.elementLocated(By.className('message')), 10000);

//         // Get the message text
//         let message = await driver.findElement(By.className('message')).getText();

//         // Check if the login was successful or failed
//         if (message.includes('login success')) {
//             console.log('Login test passed.');
//         } else if (message.includes('incorrect email or password!')) {
//             console.log('Login test failed: Incorrect email or password.');
//         } else {
//             console.log('Login test failed: Unexpected message:', message);
//         }
//     } finally {
//         // Quit the WebDriver
//         await driver.quit();
//     }
// }

// // Run the test
// loginTest();

const { Builder, By, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const fs = require('fs');

async function loginTest() {
    let options = new firefox.Options();
    let driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build();

    try {
        console.log('Navigating to the login page');
        await driver.get('http://localhost/newproject/login.php');

        console.log('Entering email');
        await driver.findElement(By.name('email')).sendKeys('ravi1@gmail.com');

        console.log('Entering password');
        await driver.findElement(By.name('password')).sendKeys('1234');

        console.log('Clicking submit');
        await driver.findElement(By.name('submit')).click();

        // Increase the timeout to 30 seconds
        const timeout = 10000;

        console.log('Waiting for message element');
        await driver.wait(until.elementLocated(By.className('message')), timeout);

        console.log('Getting message text');
        let message = await driver.findElement(By.className('message')).getText();

        if (message.includes('login success')) {
            console.log('Login test passed.');
        } else if (message.includes('incorrect email or password!')) {
            console.log('Login test failed: Incorrect email or password.');
        } else {
            console.log('Login test failed: Unexpected message:', message);
        }
    } catch (err) {
        console.error('Error during test execution:', err);
        let image = await driver.takeScreenshot();
        fs.writeFileSync('screenshot.png', image, 'base64');
    } finally {
        await driver.quit();
    }
}

loginTest();

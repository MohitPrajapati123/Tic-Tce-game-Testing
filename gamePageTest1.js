const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function ticTacToeTests() {
    let options = new chrome.Options();
    options.addArguments('--headless'); // Run in headless mode for CI environments

    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    try {
        console.log('Navigating to the game page');
        await driver.get('http://localhost/newproject/game1.html');

        // Wait for the title to be correct
        console.log('Waiting for the page title to be correct');
        await driver.wait(until.titleIs('Tic-Tac-Toe Game'), 10000);

        // Click on a box to make a move
        console.log('Making a move');
        let boxes = await driver.findElements(By.css('.box'));
        await boxes[0].click(); // Player O makes a move

        // Verify the move is registered
        console.log('Verifying the move');
        let box0Content = await boxes[0].getText();
        console.log('Box 0 Content:', box0Content);
        if (box0Content !== 'O') {
            throw new Error('Move was not registered correctly');
        }

        // Simulate additional moves to result in a draw
        console.log('Making more moves');
        await boxes[1].click(); // Player X
        await boxes[2].click(); // Player O
        await boxes[4].click(); // Player X
        await boxes[3].click(); // Player O
        await boxes[5].click(); // Player X
        await boxes[7].click(); // Player O
        await boxes[6].click(); // Player X
        await boxes[8].click(); // Player O

        // Verify if the game ended in a draw
        console.log('Verifying the draw');
        let msg = await driver.findElement(By.id('msg')).getText();
        console.log('Message:', msg);
        if (!msg.includes('Game was a Draw.')) {
            throw new Error('Game did not end in a draw as expected');
        }

        // Click the Reset button
        console.log('Clicking Reset button');
        let resetBtn = await driver.findElement(By.id('reset-btn'));
        await resetBtn.click();

        // Wait for a short period to allow the reset action to complete
        await driver.sleep(1000);

        // Verify the game has been reset
        console.log('Verifying game reset');
        let boxesAfterReset = await driver.findElements(By.css('.box'));
        for (let box of boxesAfterReset) {
            let text = await box.getText();
            if (text !== '') {
                throw new Error('Game was not reset correctly');
            }
        }

        // Verify the msg container is hidden after reset
        let msgContainer = await driver.findElement(By.css('.msg-container'));
        let isMsgContainerHidden = await msgContainer.getAttribute('class');
        if (!isMsgContainerHidden.includes('hide')) {
            throw new Error('Message container was not hidden after reset');
        }

        console.log('Test passed successfully');

    } catch (error) {
        console.error('Error during test execution:', error);
    } finally {
        await driver.quit();
    }
})();

const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function ticTacToeTests() {
    // Set up Chrome options for non-headless mode
    let options = new chrome.Options();
    // Comment out or remove the headless argument
    // options.addArguments('headless');

    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        console.log("Navigating to the game page");
        await driver.get('http://localhost/newproject/game2.html'); // Adjust the URL as needed

        console.log("Waiting for the page title to be correct");
        await driver.wait(until.titleIs('Tic-Tac-Toe Game'), 10000);

        console.log("Making moves to result in a draw");
        const boxes = await driver.findElements(By.css('.box'));

        // Moves to ensure a draw
        await boxes[0].click(); // O
        await boxes[1].click(); // X
        await boxes[2].click(); // O
        await boxes[4].click(); // X
        await boxes[3].click(); // O
        await boxes[5].click(); // X
        await boxes[7].click(); // O
        await boxes[6].click(); // X
        await boxes[8].click(); // O

        console.log("Verifying the draw");
        let msg = await driver.findElement(By.id('msg')).getText();
        console.log("Message: " + msg);
        if (msg !== 'Game was a Draw.') {
            throw new Error('Game did not end in a draw as expected');
        }

        console.log("Resetting the game");
        await driver.findElement(By.id('reset-btn')).click();

        console.log("Verifying the reset");
        let roundCount = await driver.findElement(By.id('round-count')).getText();
        if (roundCount !== '2') { // Verify that the round count has incremented
            throw new Error('Round count did not increment as expected');
        }
        console.log("Round Count: " + roundCount);

        let playerOWins = await driver.findElement(By.id('playerO-wins')).getText();
        let playerXWins = await driver.findElement(By.id('playerX-wins')).getText();
        if (playerOWins !== '0' || playerXWins !== '0') {
            throw new Error('Player wins were not reset as expected');
        }
        console.log("Player O Wins: " + playerOWins);
        console.log("Player X Wins: " + playerXWins);

    } catch (error) {
        console.error("Error during test execution:", error);
    } finally {
        await driver.quit();
    }
})();

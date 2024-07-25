const { Builder, By, until } = require('selenium-webdriver');

(async function ticTacToeTest() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    console.log('Navigating to the game page');
    await driver.get('http://localhost/newproject/game.html');

    // Log the page title and source for debugging
    console.log('Current Title:', await driver.getTitle());
    console.log('Current URL:', await driver.getCurrentUrl());
    let pageSource = await driver.getPageSource();
    console.log('Page Source:', pageSource.substring(0, 1000)); // Log only the first 1000 characters for brevity

    // Wait for the page title to be correct
    console.log('Waiting for the page title to be correct');
    await driver.wait(until.titleIs('Tic Tac Toe Game | Mohit Prajapati'), 30000);

    // Click on the "Player (X)" button
    console.log('Clicking on the "Player (X)" button');
    let playerXButton = await driver.findElement(By.css('button.playerX'));
    await playerXButton.click();

    // Verify that the playboard is visible
    console.log('Verifying the playboard');
    await driver.wait(until.elementLocated(By.css('.play-board.show')), 15000);
    console.log('Playboard is visible');

    // Verify that player options are available
    console.log('Verifying player options');
    await driver.wait(until.elementLocated(By.css('.playerX')), 15000);
    await driver.wait(until.elementLocated(By.css('.playerO')), 15000);
    console.log('Player options are available');

    // Optionally, simulate clicking on some boxes and check the results
    console.log('Clicking on some boxes');
    let box1 = await driver.findElement(By.css('.box1'));
    await box1.click();

    // Wait for a while to observe any changes or effects
    await driver.sleep(2000);

    // Check if the clicked box has been updated (can customize based on game behavior)
    console.log('Verifying box1 status');
    let box1Content = await box1.getAttribute('innerHTML');
    console.log('Box1 Content:', box1Content);

  } catch (error) {
    console.error('Error during test execution:', error);
  } finally {
    await driver.quit();
  }
})();

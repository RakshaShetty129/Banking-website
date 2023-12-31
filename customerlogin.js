const opt = require('selenium-webdriver/chrome');
// moment = require("moment-timezone");
const { Select } = require('selenium-webdriver')
let fs = require('fs');
const { Builder, By, Key, until, Capabilities, Actions } = require("selenium-webdriver");

// const width = 640
// const height = 480
//const delay = require('delay');
const { Capability } = require('selenium-webdriver');
const { Browser } = require('selenium-webdriver');
const { WebElement } = require('selenium-webdriver');
const by = require('selenium-webdriver/lib/by');

const caps = new Capabilities();
caps.set(Capability.BROWSER_NAME, Browser.CHROME);


let driver = new Builder()
    .withCapabilities(caps)
    .setChromeOptions(
        new opt.Options()
            .excludeSwitches(['enable-automation'])
            // .addArguments('--start-maximized')
            .addArguments('log-level=3')
        // .headless().windowSize({ width, height }),
    )
    .build();

mainFunction(driver, opt)

const configuration = { timeout: 10000 }




const shortWait = 5000;
const shortestWait = 3000;
const longtWait = 15000;
async function mainFunction(driver, opts) {

    await driver.get("https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login");
    await driver.wait(until.elementLocated(By.xpath('//div//button[text()="Customer Login"]')),longtWait).click()

    const ddown = await driver.wait(until.elementLocated(By.id('userSelect')));
      const select = new Select(ddown);
      await select.selectByVisibleText('Hermoine Granger');
   
   
   await driver.findElement(By.xpath("//div//button[text()='Login']")).click()
     //await driver.findElement(By.xpath('userSelect'))
     await driver.wait(until.elementLocated(By.xpath('//div//button[contains(text(),"Transactions")]')),longtWait).click()

     await driver.wait(until.elementLocated(By.id('start'))).sendKeys('1201')
     await driver.wait(until.elementLocated(By.id('end'))).sendKeys('1302')

    //await s.;



     const dateHandle = await driver.wait(until.elementLocated(By.xpath('//div//thead//a[contains(text(),"Date-Time")]')));
     const date = (await dateHandle.getText()).trim();
 
 
     const values = await driver.findElements(By.xpath('//div//table//tbody//tr//td[1]'));
     const trimmedTextArray = [];
     for (const element of values) {
         const value = await element.getText();
         trimmedTextArray.push(value);
     }

     const amounts = await driver.wait(until.elementLocated(By.xpath('//div//thead//a[contains(text(),"Amount")]')));
     const amount = await amounts.getText(); 
 
     // Find all elements containing costs
     const costs = await driver.findElements(By.xpath('//div//table//tbody//tr//td[2]'));
     const trimmedAmountArray = [];
 
     for (const element of costs) {
         const cost = await element.getText(); 
         trimmedAmountArray.push(cost.trim());
     }

     const Trans = await driver.wait(until.elementLocated(By.xpath('//div//thead//a[contains(text(),"Transaction Type")]')));
    const Transaction = await Trans.getText();
    const details = await driver.findElements(By.xpath('//div//table//tbody//tr//td[3]'));
    const trimmedDetailsArray = []
    for (const element of details) {
        const text = await element.getText();
        trimmedDetailsArray.push(text.trim());
    }

  
    const resultArray = [];
    const rows = await driver.findElements(By.xpath('//div//table//tbody//tr'));
    
    for (let i = 0; i < rows.length; i++) {
      const result = {
        [date]: trimmedTextArray[i],
        [amount]: trimmedAmountArray[i],
        [Transaction]: trimmedDetailsArray[i]
      };
      resultArray.push(result);
    }
    
   console.log(resultArray);
 
  

     await driver.wait(until.elementLocated(By.xpath('//div//button[text()="Back"]')),longtWait).click()
     await driver.wait(until.elementLocated(By.xpath('(//div//button)[4]')),longtWait).click()

     await driver.wait(until.elementLocated(By.xpath('//div//input')),longtWait).sendKeys('1000')
     await driver.wait(until.elementLocated(By.xpath('//div//button[text()="Deposit"]')),longtWait).click()

     await driver.wait(until.elementLocated(By.xpath('//div//button[contains(text(),"Withdrawl")]'))).click()
     await driver.wait(until.elementLocated(By.xpath('//div//input'))).sendKeys(500)
     
     await driver.wait(until.elementLocated(By.xpath('//div//button[text()="Withdraw"]'))).click()
     let todotext = await driver.findElement(By.xpath('(//div//strong)[4]')).getText()
     console.log("Balance:",todotext)
     
    await driver.quit()
    
}

  

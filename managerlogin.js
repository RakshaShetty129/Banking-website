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
    await driver.wait(until.elementLocated(By.xpath('//div//button[text()="Bank Manager Login"]')),longtWait).click()

   
   await driver.wait(until.elementLocated(By.xpath('//div//button[contains(text(),"Add Customer")]')),longtWait).click()
     //await driver.findElement(By.xpath('userSelect'))
     await driver.wait(until.elementLocated(By.xpath('//div//input[@placeholder="First Name"]')),longtWait).sendKeys('ra')
     await driver.wait(until.elementLocated(By.xpath('//div//input[@placeholder="Last Name"]')),longtWait).sendKeys('sh')
     await driver.wait(until.elementLocated(By.xpath('//div//input[@placeholder="Post Code"]')),longtWait).sendKeys('1234')
     
     
    
 
     await driver.wait(until.elementLocated(By.xpath("//div//button[text()='Add Customer']")),longtWait).click()
     const dialog = await driver.switchTo().alert();


     const dialogText = await dialog.getText();
     console.log(dialogText);
 
     await dialog.dismiss();

     await driver.wait(until.elementLocated(By.xpath('//div//button[contains(text(),"Open Account")]')),longtWait).click()

     const ddown = await driver.wait(until.elementLocated(By.id('userSelect')));
     const select = new Select(ddown);
     await select.selectByVisibleText('Hermoine Granger');

     const curency = await driver.wait(until.elementLocated(By.id('currency')));
     const selectcurrency = new Select(curency);
     await selectcurrency.selectByVisibleText('Dollar');

     await driver.wait(until.elementLocated(By.xpath('//div//button[contains(text(),"Process")]'))).click()
     
     const dialog2 = await driver.switchTo().alert();


     const dialogText2 = await dialog2.getText();
     console.log(dialogText2);
 
     await dialog2.dismiss();
     
     await driver.wait(until.elementLocated(By.xpath('//div//button[contains(text(),"Add Customer")]')),longtWait).click()

     await driver.wait(until.elementLocated(By.xpath('//div//input[@placeholder="First Name"]')),longtWait).sendKeys('Raksha')
     await driver.wait(until.elementLocated(By.xpath('//div//input[@placeholder="Last Name"]')),longtWait).sendKeys('S')
     await driver.wait(until.elementLocated(By.xpath('//div//input[@placeholder="Post Code"]')),longtWait).sendKeys('1234')
     
     
    
 
     await driver.wait(until.elementLocated(By.xpath("//div//button[text()='Add Customer']")),longtWait).click()
     const dialog1 = await driver.switchTo().alert();


     const dialogText1= await dialog1.getText();
     console.log(dialogText);
 
     await dialog.dismiss();

     await driver.wait(until.elementLocated(By.xpath('//div//button[contains(text(),"Open Account")]')),longtWait).click()

     const down = await driver.wait(until.elementLocated(By.id('userSelect')));
     const select1 = new Select(down);
     await select1.selectByVisibleText('Raksha S');

     const curency1 = await driver.wait(until.elementLocated(By.id('currency')));
     const selectcurrency1 = new Select(curency1);
     await selectcurrency1.selectByVisibleText('Dollar');

     await driver.wait(until.elementLocated(By.xpath('//div//button[contains(text(),"Process")]'))).click()
     
     const dialog21 = await driver.switchTo().alert();


     const dialogText21= await dialog21.getText();
     console.log(dialogText21);
 
     await dialog21.dismiss();
     await driver.wait(until.elementLocated(By.xpath('//div//button[contains(text(),"Customers")]'))).click()

     const fName = await driver.wait(until.elementLocated(By.xpath('//div//a[contains(text()," First Name" )]')));
    const firstname = (await fName.getText()).trim();

    const names = await driver.findElements(By.xpath('//div//table//tbody//tr//td[1]'));
    const trimmednameArray = [];
    for (const element of names) {
        const name = await element.getText();
        trimmednameArray.push(name.trim());
    }
    // console.log(trimmednameArray);
    // console.log(firstname)
   
    const lname = await driver.wait(until.elementLocated(By.xpath('//div//a[contains(text( ),"Last Name" )]')));
    const lnames = (await lname.getText()).trim();

    const lastname = await driver.findElements(By.xpath('//div//table//tbody//tr//td[2]'));
    const trimmedlastnameArray = []
    for (const element of lastname ) {
        const lsname = await element.getText();
        trimmedlastnameArray.push(lsname.trim());
    }

    const code = await driver.wait(until.elementLocated(By.xpath('//div//a[contains(text( ),"Post Code" )]')));
    const codes = (await code.getText()).trim();

    const post_code = await driver.findElements(By.xpath('//div//table//tbody//tr//td[3]'));
    const trimmedpost_codeArray = []
    for (const element of post_code ) {
        const pscode = await element.getText();
        trimmedpost_codeArray.push(pscode.trim());
    }


    const number = await driver.wait(until.elementLocated(By.xpath('//div//td[contains(text( ),"Account Number" )]')));
    const numbers = (await number.getText()).trim();
    

    const acc_number = await driver.findElements(By.xpath('//div//table//tbody//tr//td[4]'));
    const trimmedacc_numberArray = []
    for (const element of acc_number ) {
        const num= await element.getText();
        trimmedacc_numberArray.push(num.trim());
    }

    const resultArray = [];

    for (let i = 0; i < trimmednameArray.length; i++) {
      const result = {
        [firstname]: trimmednameArray[i],
        [lnames]: trimmedlastnameArray[i],
        [codes]: trimmedpost_codeArray[i],
        [numbers]: trimmedacc_numberArray[i]
      };
      resultArray.push(result);
    }
   console.log(resultArray);

 
 
  await driver.quit()
    
}

const NUMBER_OF_SECONDS = 15

let webdriver = require("selenium-webdriver");

const { exec } = require('child_process');

require("chromedriver");

let driver = new webdriver.Builder()
    .forBrowser("chrome").build();

driver.get("https://electriccastle.ro/bontidafever");

let oldSrc = ''
let newSrc = ''

const intervalId = setInterval(async ()=> {
    // newSrc = await driver.getPageSource()
    await driver.findElements({className: "row"}).then(async elems => {
        const el = elems[2]
        const elementHtml = await el.getAttribute('innerHTML')
        if(!oldSrc) {
            oldSrc = elementHtml
        }
        newSrc = elementHtml
        console.log(newSrc === oldSrc ? 'SAME' : 'DIFFERENT')
        if (oldSrc === newSrc) {
            oldSrc = newSrc
            await driver.navigate().refresh();
        } else {
            driver.executeScript("alert('CHANGED!!!')");
            exec('afplay media/bells-notification.wav')
            clearInterval(intervalId)
        }
    })
}, NUMBER_OF_SECONDS * 1000)

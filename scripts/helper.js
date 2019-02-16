var puppeteer = require('puppeteer');


module.exports = {
    launchBrowser: async () => {
        const browser = await puppeteer.launch({headless:false}) //headless so it shows browser
        const page = await browser.newPage()

        return{
            browser: browser,
            page: page
        }
    }
}
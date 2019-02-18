var puppeteer = require('puppeteer');


module.exports = {
    launchBrowser: async () => {
        const browser = await puppeteer.launch({headless:false, args: ['--no-sandbox', '--disable-setuid-sandbox'] }) //headless so it shows browser
        const page = await browser.newPage()

        return{
            browser: browser,
            page: page
        }
    }
}
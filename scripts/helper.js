var puppeteer = require('puppeteer');


module.exports = {
    launchBrowser: async (headless = true) => {
        const browser = await puppeteer.launch(
            {
                headless: headless,
                devtools: false,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox'
                    // '--no-sandbox',
                    // '--disable-setuid-sandbox',
                    // '--disable-infobars',
                    // '--window-position=0,0',
                    // '--ignore-certifcate-errors',
                    // '--ignore-certifcate-errors-spki-list',
                    // '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'
                ] }) //headless so it shows browser
        const page = await browser.newPage()

        page.setUserAgent('request');
        return{
            browser: browser,
            page: page
        }
    }
}
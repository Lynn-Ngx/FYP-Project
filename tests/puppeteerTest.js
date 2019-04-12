const puppeteer = require('puppeteer');

test('test', async() => {
    //Example Test

    let browser = await puppeteer.launch({headless:false})
    let page = await browser.newPage()

    await page.goto('http://localhost:3000/')

    //page.click(selector)

    //const nameEl = await.page.$('[data-testid="name"]')
    //await nameEl.click()
    //await page.type('[data-testid="name"]', user.name)

    const html = await page.$eval('.App-title', e => e.innerHTML)

    expect(html).toBe('Welcome to React')

    browser.close()
})
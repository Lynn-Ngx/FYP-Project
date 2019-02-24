const puppeteer = require('puppeteer');

//To get image link of ASOS
//document.querySelector('#product-gallery > div.window > ul > li:nth-child(2) > div > div > div > div.amp-spinner.amp-relative > div.amp-page.amp-spin > div.amp-page.amp-images > div > div.fullImageContainer > img').src

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    let viewSource = await page.goto('https://images.asos-media.com/products/rahi-scarlett-midi-dress-in-dot-flower-print/11230722-1-fleurprint?$XXL$&wid=513&fit=constrain');

    require('fs').writeFile("test.jpg", await viewSource.buffer(), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });

    await browser.close();
})();



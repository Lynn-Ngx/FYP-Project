const puppeteer = require('puppeteer');

//To get image link of ASOS
//document.querySelector('#product-gallery > div.window > ul > li:nth-child(2) > div > div > div > div.amp-spinner.amp-relative > div.amp-page.amp-spin > div.amp-page.amp-images > div > div.fullImageContainer > img').src

const scrapeImage = async (link) => {
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();


    //let viewSource = await page.goto('https://images.asos-media.com/products/rahi-scarlett-midi-dress-in-dot-flower-print/11230722-1-fleurprint?$XXL$&wid=513&fit=constrain');
    page.goto(link)
    await page.waitForSelector('#product-gallery > div.window > ul > li:nth-child(2) > img')
    // require('fs').writeFile("test.jpg", await viewSource.buffer(), function(err) {
    //     if(err) {
    //         return console.log(err);
    //     }
    //     console.log("The file was saved!");
    // });
    // //body > img
    const path = require('path')
    let imgid = Math.random().toString(35).substr(2, 11);
    const imageName = path.join(__dirname, '/../../image', imgid + '.jpg')
    // const svgImage = await page.evaluate(() => {
    //     return document.querySelector("body > img");
    // })
    const svgImage = await page.$('#product-gallery > div.window > ul > li:nth-child(2) > img');
    await svgImage.screenshot({
        path: imageName,
        omitBackground: false,
    });

    await browser.close();
    return imgid
};

module.exports.scrapeImage = scrapeImage;




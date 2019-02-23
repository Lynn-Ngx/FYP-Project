const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const linksSchema = require('../../models/links');
const _cliProgress = require('cli-progress');
const fs = require('fs')

const connectToLocalDB = () => {
    return new Promise(resolve => {
        mongoose.connect('mongodb://localhost/FYP');
        mongoose.connection.once('open', function(){
            console.log('Connection has been made to local database');
            resolve()
        }).on('error', function(error){
            console.log('Connection error: ' + error);
        });
    })
}

const scrapeLinks = async () => {
    const browser = await puppeteer.launch({headless:false}) //headless so it shows browser
    const page = await browser.newPage()

    let allLinks = []

    //predetermined links that we want to scrape
    // const hardLinks = ["https://www.asos.com/search/?page=PAGENUMBER&q=Women"]
    const hardLinks = ["https://www.asos.com/women/shoes/cat/?cid=4172&nlid=ww|shoes|shop%20by%20product&page=PAGENUMBER", "https://www.asos.com/men/shoes-boots-trainers/cat/?cid=4209&nlid=mw|shoes|shop%20by%20product&page=PAGENUMBER"]
    for (const link of hardLinks){
        await page.goto(link.replace('PAGENUMBER', '1'))

        //get number of pages and loop that amount for each page in that search result

        //wait for the selector before calling it
        // await page.waitForSelector('#plp > div > div._3JNRYc8 > div > p')
        await page.waitForSelector('#plp > div > div > div._3JNRYc8 > div.zCgWNEA > p')
        const numberOfPagesInSearch = await page.evaluate(() => {
            return Math.ceil(parseInt(document.querySelector('#plp > div > div > div._3JNRYc8 > div.zCgWNEA > p').innerText.split(" ")[0].replace(/,/g, ''))/72)

        })

        console.log(numberOfPagesInSearch)

        const bar1 = new _cliProgress.Bar({}, _cliProgress.Presets.shades_classic);
        bar1.start(numberOfPagesInSearch, 0);


        //481 but they didnt all store to db, only like 7 pages stored to db
        for (let i = 1; i <= numberOfPagesInSearch; i++){
            bar1.update(i);

            try {

                page.goto(link.replace('PAGENUMBER', i))

                await page.waitForSelector('#plp > div > div > div._3JNRYc8 > div.zCgWNEA > div._3-pEc3l > section')
                await page.waitForSelector('#plp > div > div > div._3JNRYc8 > div.zCgWNEA > div._3-pEc3l > section > div')

                const links = await page.evaluate(() => {
                    const links = []
                    for (let i = 1; i < document.querySelector('#plp > div > div > div._3JNRYc8 > div.zCgWNEA > div._3-pEc3l > section').children.length; i++) {
                        if (document.querySelector('#plp > div > div > div._3JNRYc8 > div.zCgWNEA > div._3-pEc3l > section > article:nth-child(' + i + ') > a')){
                            links.push({
                                link: document.querySelector('#plp > div > div > div._3JNRYc8 > div.zCgWNEA > div._3-pEc3l > section > article:nth-child(' + i + ') > a').href,
                                price: document.querySelector('#plp > div > div > div._3JNRYc8 > div.zCgWNEA > div._3-pEc3l > section > article:nth-child(' + 1 + ')  a > p > span._342BXW_').innerHTML

                            })
                        }
                    }

                    for (let i = 1; i < document.querySelector('#plp > div > div > div._3JNRYc8 > div.zCgWNEA > div._3-pEc3l > section > div').children.length + 1; i++) {
                        if (document.querySelector('#plp > div > div > div._3JNRYc8 > div.zCgWNEA > div._3-pEc3l > section > div > article:nth-child(' + i + ') > a')){
                            links.push({
                                link: document.querySelector('#plp > div > div > div._3JNRYc8 > div.zCgWNEA > div._3-pEc3l > section > div > article:nth-child(' + i + ') > a').href,
                                price: document.querySelector('#plp > div > div > div._3JNRYc8 > div.zCgWNEA > div._3-pEc3l > section > div > article:nth-child(' + 1 + ')  a > p > span._342BXW_').innerHTML
                                // salePrice: document.querySelector('#plp > div > div > div._3JNRYc8 > div.zCgWNEA > div._3-pEc3l > section > div > article:nth-child(' + 36 + ')  a > p > span._3iq1GRC').innerText
                            })
                        }
                    }

                    return links
                })

                allLinks = allLinks.concat(links)

            }catch(err){
                console.log('Error at page i: ', i , err)
            }
        }
    }

    return allLinks
};


(async () => {
    await connectToLocalDB()
    const objectToAdd = await scrapeLinks()
    const websiteName = 'asos'

    for (let item of objectToAdd){
        const response = await linksSchema.update({link: item.link}, {$addToSet: {
                price:
                    {
                        price: item.price,
                        date: new Date()
                    }
            }})

        //update return nModified, stating how many records were modified
        //if nModified is greater than 0, then something was modified,
        //if 0 then nothing was modified, so maybe the link it was looking for does not exist, in that case we can add the link
        //if nothing was modified then it is a new link so add
        if (response.nModified === 0){
            const newLink = new linksSchema({
                name: websiteName,
                link: item.link,
                price: [{
                    price: item.price,
                    date: new Date()
                }]
            })
            await newLink.save()
        }
    }

    // exportToFile('AsosLinks', linksToAdd)


    // require('fs').writeFile(
    //
    //     './data/asosWomensShoesLinks.json',
    //
    //     JSON.stringify(linksToAdd),
    //
    //     function (err) {
    //         if (err) {
    //             console.error('Crap happens');
    //         }
    //     }
    // );
})()
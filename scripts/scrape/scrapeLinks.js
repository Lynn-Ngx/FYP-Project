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
    const hardLinks = ["https://www.asos.com/search/?page=PAGENUMBER&q=Women"]

    for (const link of hardLinks){
        await page.goto(link.replace('PAGENUMBER', '1'))

        //get number of pages and loop that amount for each page in that search result

        //wait for the selector before calling it
        await page.waitForSelector('#plp > div > div._3JNRYc8 > div > p')

        const numberOfPagesInSearch = await page.evaluate(() => {
            return Math.ceil(parseInt(document.querySelector('#plp > div > div._3JNRYc8 > div > p').innerText.split(" ")[0].replace(/,/g, ''))/72)

        })

        console.log(numberOfPagesInSearch)

        const bar1 = new _cliProgress.Bar({}, _cliProgress.Presets.shades_classic);
        bar1.start(numberOfPagesInSearch, 0);


        //481 but they didnt all store to db, only like 7 pages stored to db
        for (let i = 1; i <= numberOfPagesInSearch; i++){

            bar1.update(i);

            try {

                page.goto(link.replace('PAGENUMBER', i))
                await page.waitForSelector('#plp > div > div._3JNRYc8 > div > div._3-pEc3l > section')
                await page.waitForSelector('#plp > div > div._3JNRYc8 > div > div._3-pEc3l > section > div')

                const links = await page.evaluate(() => {
                    const links = []
                    for (let i = 1; i < document.querySelector('#plp > div > div._3JNRYc8 > div > div._3-pEc3l > section').children.length; i++) {
                        if (document.querySelector('#plp > div > div._3JNRYc8 > div > div._3-pEc3l > section > article:nth-child(' + i + ') > a')){
                            links.push(document.querySelector('#plp > div > div._3JNRYc8 > div > div._3-pEc3l > section > article:nth-child(' + i + ') > a').href)
                        }
                    }

                    for (let i = 1; i < document.querySelector('#plp > div > div._3JNRYc8 > div > div._3-pEc3l > section > div').children.length + 1; i++) {
                        if (document.querySelector('#plp > div > div._3JNRYc8 > div > div._3-pEc3l > section > div > article:nth-child(' + i + ') > a')){
                            links.push(document.querySelector('#plp > div > div._3JNRYc8 > div > div._3-pEc3l > section > div > article:nth-child(' + i + ') > a').href)
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
    // await connectToLocalDB()
    const linksToAdd = await scrapeLinks()

    //const website = 'Asos'
    // const doc = await linksSchema.findOne({name: website})

    // exportToFile('AsosLinks', linksToAdd)


    require('fs').writeFile(

        './data/asosWomensLinks.json',

        JSON.stringify(linksToAdd),

        function (err) {
            if (err) {
                console.error('Crap happens');
            }
        }
    );

    // if (doc){
    //     await linksSchema.findOneAndUpdate({name: website}, {$addToSet: {links: linksToAdd}})
    //
    // }else {
    //     const newLinksDB = await linksSchema({
    //         name: website,
    //         links: linksToAdd
    //     })
    //
    //     await newLinksDB.save()
    // }

})()
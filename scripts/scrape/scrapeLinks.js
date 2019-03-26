const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const linksSchema = require('../../models/links');
const _cliProgress = require('cli-progress');
const fs = require('fs')

// const connectToLocalDB = () => {
//     return new Promise(resolve => {
//         mongoose.connect('mongodb+srv://lynn:2GfCBTqUxpPWDvhU@cluster0-knwop.mongodb.net/fypUsers?retryWrites=true')
//         //mongoose.connect('mongodb://localhost/FYP');
//         mongoose.connection.once('open', function(){
//             console.log('Connection has been made to database');
//             resolve()
//         }).on('error', function(error){
//             console.log('Connection error: ' + error);
//         });
//     })
// }

const scrapeLinks = async () => {
    const browser = await puppeteer.launch(
        {
            headless:true,
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
                            if(document.querySelector('#plp > div > div > div._3JNRYc8 > div.zCgWNEA > div._3-pEc3l > section  > article:nth-child(' + i + ')  a > p > span._3iq1GRC').innerText !== ""){
                                links.push({
                                    link: document.querySelector('#plp > div > div > div._3JNRYc8 > div.zCgWNEA > div._3-pEc3l > section > article:nth-child(' + i + ') > a').href,
                                    price: document.querySelector('#plp > div > div > div._3JNRYc8 > div.zCgWNEA > div._3-pEc3l > section  > article:nth-child(' + i + ')  a > p > span._3iq1GRC').innerText

                                })
                            }else{
                                links.push({
                                    link: document.querySelector('#plp > div > div > div._3JNRYc8 > div.zCgWNEA > div._3-pEc3l > section > article:nth-child(' + i + ') > a').href,
                                    price: document.querySelector('#plp > div > div > div._3JNRYc8 > div.zCgWNEA > div._3-pEc3l > section > article:nth-child(' + i + ')  a > p > span._342BXW_').innerHTML

                                })
                            }
                        }
                    }

                    for (let i = 1; i < document.querySelector('#plp > div > div > div._3JNRYc8 > div.zCgWNEA > div._3-pEc3l > section > div').children.length + 1; i++) {
                        if (document.querySelector('#plp > div > div > div._3JNRYc8 > div.zCgWNEA > div._3-pEc3l > section > div > article:nth-child(' + i + ') > a')){
                            if(document.querySelector('#plp > div > div > div._3JNRYc8 > div.zCgWNEA > div._3-pEc3l > section  > div > article:nth-child(' + i + ')  a > p > span._3iq1GRC').innerText !== ""){
                                links.push({
                                    link: document.querySelector('#plp > div > div > div._3JNRYc8 > div.zCgWNEA > div._3-pEc3l > section > div > article:nth-child(' + i + ') > a').href,
                                    price: document.querySelector('#plp > div > div > div._3JNRYc8 > div.zCgWNEA > div._3-pEc3l > section > div > article:nth-child(' + i + ')  a > p > span._3iq1GRC').innerText

                                })
                            }else{
                                links.push({
                                    link: document.querySelector('#plp > div > div > div._3JNRYc8 > div.zCgWNEA > div._3-pEc3l > section > div  > article:nth-child(' + i + ') > a').href,
                                    price: document.querySelector('#plp > div > div > div._3JNRYc8 > div.zCgWNEA > div._3-pEc3l > section > div  > article:nth-child(' + i + ')  a > p > span._342BXW_').innerHTML

                                })
                            }
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
    browser.close()
    return allLinks
};



(async () => {
    // await connectToLocalDB()
    let objectToAdd = await scrapeLinks()
    // objectToAdd = [objectToAdd[0], objectToAdd[1]]
    const websiteName = 'asos'
    //
    // const objectToAdd = [
    //     {
    //         link: 'https://www.asos.com/miss-selfridge/miss-selfridge-woven-heeled-boots-in-black/prd/10820816?clr=black&SearchQuery=&cid=4172&gridcolumn=1&gridrow=13&gridsize=3&pge=9&pgesize=72&totalstyles=2157',
    //         price: '220'
    //     }
    // ]

    for (let item of objectToAdd){
        const formattedLink =  item.link.substring(0,  item.link.indexOf("?"))
        const data = await linksSchema.findOne({link: formattedLink})

        if (data){
            await linksSchema.update({link: formattedLink}, {$addToSet: {
                price:
                    {
                        price: item.price,
                        date: new Date()
                    }
                }})

        }else {
            const newLink = new linksSchema({
                name: websiteName,
                link: formattedLink,
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
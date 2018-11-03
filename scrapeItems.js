const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const linksSchema = require('./models/items')

const connectToLocalDB = () => {
    return new Promise(resolve => {
        mongoose.connect('mongodb://localhost/FYP');
        mongoose.connection.once('open', function () {
            console.log('Connection has been made to local database');
            resolve()
        }).on('error', function (error) {
            console.log('Connection error: ' + error);
        });
    })
}

const scrapeItems = async () => {
    const browser = await puppeteer.launch({headless: false}) //headless so it shows browser
    const page = await browser.newPage()

    let allItems = []

    const mongoLinks = mongolink

    for (const link of mongoLinks) {
        await page.goto(link)

        await page.waitForSelector('#aside-content > div.product-hero > h1', '#product-price > div > span.current-price',
            '#product-size > section > div > div.size-section > div.colour-size-select > select')

        const getItems = await page.evaluate(() => {

            const getDate = () => {
                let today = new Date();
                let dd = today.getDate();
                let mm = today.getMonth() + 1; //January is 0!
                let yyyy = today.getFullYear();

                if (dd < 10) {
                    dd = '0' + dd
                }

                if (mm < 10) {
                    mm = '0' + mm
                }

                today = mm + '/' + dd + '/' + yyyy;
                return today
            }


            const name = document.querySelector('#aside-content > div.product-hero > h1').innerHTML
            const price = document.querySelector('#product-price > div > span.current-price').innerHTML
            const date = getDate()

            const selectorDiv = document.querySelector('#product-size > section > div > div.size-section > div.colour-size-select > select')
            const options = []

            /**
             *  Asos can return something like
             *  [ UK 7 - EU 41 - US 8 - not available] or [ UK 7 - not available]
             *  we turn it into [ 'UK 7 ', ' EU 41 ', ' US 8 ', ' Not available' ]
             *  and then we get first and if the last value is 'Not Available' add it to the string
             */

            //selectorDiv.children.length = How many options that selector has
            for (let i = 1; i < selectorDiv.children.length; i++) {

                //selectorDiv has Ul elements, for each element we splitting it according to the dashes
                const optionSplit = selectorDiv.childNodes[i].innerText.split('-')

                //remove spaces
                for (let i = 0; i < optionSplit.length; i++) {
                    optionSplit[i] = optionSplit[i].replace(/\s/g, '')
                }

                if (optionSplit[optionSplit.length - 1] === 'Notavailable') options.push(optionSplit[0])

                else options.push(optionSplit[0])
            }

            return {
                //link: page,
                name: name,
                sizes: options,
                prices: [
                    {
                        date: date,
                        price: price
                    }
                ]
            }
        })
        allItems = allItems.concat(getItems)
    }
    return allItems
}


(async () => {
    const itemsToAdd = await scrapeItems()
    await connectToLocalDB()

    const website = 'Asos'
    const doc = await linksSchema.findOne({name: website})


    if (doc){
        await linksSchema.findOneAndUpdate({name: website}, {$addToSet: {items: itemsToAdd}})

    }else {
        const newLinksDB = await linksSchema({
            name: website,
            links: itemsToAdd
        })

        await newLinksDB.save()
    }

})()
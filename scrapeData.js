var puppeteer = require('puppeteer');

const getDate = () =>{
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    }

    if(mm<10) {
        mm = '0'+mm
    }

    today = mm + '/' + dd + '/' + yyyy;
    return today
}

const launchBrowser = async (link) => {
    const browser = await puppeteer.launch({headless:false}) //headless so it shows browser
    const page = await browser.newPage()
    await page.goto(link)

    //await page.screenshot({path: './images/asos.png'})

    return{
        browser: browser,
        page: page
    }
}

const scrapeSingleData = async (page) => {
    return await page.evaluate(() => {

        const name = document.querySelector('#aside-content > div.product-hero > h1').innerHTML
        const price = getPrices()
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
        for (let i = 1; i < selectorDiv.children.length; i++){

            //selectorDiv has Ul elements, for each element we splitting it according to the dashes
            const optionSplit = selectorDiv.childNodes[i].innerText.split('-')

            //remove spaces
            for (let i = 0; i < optionSplit.length; i++){
                optionSplit[i] = optionSplit[i].replace(/\s/g, '')
            }

            if (optionSplit[optionSplit.length - 1] === 'Notavailable') options.push( optionSplit[0])

            else options.push(optionSplit[0])
        }

        return {
            link: page,
            description: {
                name : name,
                sizes : options
            },
            prices: [
                {
                    date: date,
                    price: price
                }
            ]
        }
    })
}

const getPrices = async (page) => {
    return await page.evaluate(() => {
        return document.querySelector('#product-price > div > span.current-price').innerHTML
    })
}

const getItemDetail = async(link) => {
    const browserObject = await launchBrowser(link);
    let sizeOption

    sizeOption = await scrapeSingleData(browserObject.page)
    return sizeOption
};

(async () => {
    const item = await getItemDetail('http://m.asos.com/bershka/bershka-short-bomber-jacket-with-fur-hood-in-khaki/prd/8936877')
    console.log(item)
})()
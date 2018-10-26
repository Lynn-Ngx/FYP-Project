var puppeteer = require('puppeteer');

// Const run = function(){
//
// }
// run()
// Making a function then calling it afterwards

// Const run = async function(){
//
// }
// To make it async

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

const getSingleName = async (page) => {
    return await page.evaluate(() => {
        return document.querySelector('#aside-content > div.product-hero > h1').innerHTML
    })
}

const getSingleSizes = async (page) => {
    return await page.evaluate(() => {

        const name = document.querySelector('#aside-content > div.product-hero > h1').innerHTML
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

            if (optionSplit[optionSplit.length - 1] === 'Notavailable') options.push( optionSplit[0] + ' - Notavailable')

            else options.push(optionSplit[0])
        }
        return {
            name : name,
            sizes : options
        }
    })
}

const getMultiName = async(page) => {
    return await page.evaluate(() => {
        const names = []

        for (let i = 0; i < document.getElementsByClassName("product-title").length; i++){
            names.push(document.getElementsByClassName("product-title")[i].innerHTML)
        }
        return names
    })
}

const getMultiSizes = async(page) => {
    return await page.evaluate(() => {

        const mixAndMatchUl = document.querySelector('#mix-and-match').querySelector('ul')

        const item = []

        for (let i = 0; i < mixAndMatchUl.children.length; i++){

            const li = mixAndMatchUl.childNodes[i]
            if (li.className === 'item'){
                const selectorDiv = li.querySelector('div:nth-child(3) > section > div > div.size-section > div.colour-size-select > select')

                const itemObj = {
                    name : li.querySelector('div.product-info > a > div.product-title').innerHTML,
                    sizes : []
                }

                console.log(itemObj.name)

                for (let i = 1; i < selectorDiv.children.length - 1; i++){
                    const optionSplit = selectorDiv.childNodes[i].innerText.split('-')

                    //remove spaces
                    for (let i = 0; i < optionSplit.length; i++){
                        optionSplit[i] = optionSplit[i].replace(/\s/g, '')
                    }

                    if (optionSplit[optionSplit.length - 1] === 'Notavailable') itemObj.sizes.push( optionSplit[0] + ' - ' + optionSplit[optionSplit.length - 1])
                    else itemObj.sizes.push(optionSplit[0])
                }
                item.push(itemObj)
            }
        }
        return item
    })
}

const isPageSingleViewLayout = async(page) => {
    return await page.evaluate(() => {

        if(!document.getElementById('mix-and-match')) return true

        else return false
    })
}


const isItemAvailable = async(link, testName, testSize) => {

    const items = await getItemDetail(link)
    //const name = item.name
    //const size = item.sizes

    // for(let i in size){
    //     if(name === testName && size[i].charAt(0) === testSize && size[i].includes("Notavailable")){
    //         return false
    //     }
    //
    //     else
    //         return true
    // }

    for(let item of items) {
        //const name = item.name
        const size = item.sizes

        if (item.name === testName){
            console.log('found it', item.name, testName)
            //check if ize is avaiable

            for(let i in item.sizes) {

                if (size[i].includes(testSize) && size[i].includes("Notavailable")) {
                    console.log('not available')
                    break
                }

                else console.log('is available')
            }
            break
        }
    }
    // const  a = []
    // for(let i in item.sizes){
    //     if(item.sizes[i].includes("notavailable")){
    //         a.push(item.sizes[i])
    //     }
    //
    //     else
    //         a.push("is available")
    // }
}

const getItemDetail = async(link) => {
    const browserObject = await launchBrowser(link);
    let name
    let sizeOption

    //Check if single
    //  if(await isPageSingleViewLayout(browserObject.page)) {
    //      name = await getSingleName(browserObject.page)
    // sizeOption = await getSingleSizes(browserObject.page)
    //  }
    //  else{
    //      name = await getMultiName(browserObject.page)
    sizeOption = await getMultiSizes(browserObject.page)
    //  }
    //
    // return {
    //      name : name,
    //      sizes : sizeOption
    //  }
    return sizeOption
};

(async () => {
    //const details = await getItemDetail('http://www.asos.com/emme/emme-finto-double-breasted-blazer-skinny-trousers-co-ord/grp/21135?clr=bordeaux&SearchQuery=&cid=27108&gridcolumn=4&gridrow=1&gridsize=4&pge=1&pgesize=72&totalstyles=3502')
    //const details = await getItemDetail('http://m.asos.com/bershka/bershka-short-bomber-jacket-with-fur-hood-in-khaki/prd/8936877')
    //const item = await isItemAvailable('http://m.asos.com/bershka/bershka-short-bomber-jacket-with-fur-hood-in-khaki/prd/8936877', 'Bershka Short Bomber Jacket With Fur Hood In Khaki', '2XL')
    const item = await isItemAvailable('https://www.asos.com/french-connection/french-connection-whisper-ruth-fitted-blazer-trouser-suit/grp/20969?clr=black&SearchQuery=blazer%20%26%20skinny%20trousers&gridcolumn=2&gridrow=1&gridsize=4&pge=1&pgesize=72&totalstyles=10', 'French Connection Whisper Ruth Fitted Blazer', 'UK4')
})()
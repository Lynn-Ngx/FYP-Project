var puppeteer = require('puppeteer');
const helper = require('../helper')

const getSingleSizes = async (page, checkAvailability) => {
    return await page.evaluate((checkAvailability) => {

        const name = document.querySelector('#aside-content > div.product-hero > h1').innerHTML
        const price = document.querySelector('#product-price > div > span.current-price').innerHTML
        const image = document.querySelector('#product-gallery > div.window > ul > li:nth-child(2) > div > div > div > div.amp-spinner.amp-relative > div.amp-page.amp-spin > div.amp-page.amp-images > div > div.fullImageContainer > img').src
        console.log('in here')
        console.log(image)
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

            if (checkAvailability){
                if (optionSplit[optionSplit.length - 1] === 'Notavailable') options.push( optionSplit[0] + ' - Notavailable')
                else options.push(optionSplit[0])
            }else options.push(optionSplit[0])

        }
        return {
            name : name,
            price : price,
            sizes : options,
            image: image
        }
    }, checkAvailability)
}

/**
 *
 * @param page
 * @param checkAvailability - boolean to whether we want to track if item is availble or not
 * @returns {Promise<*>}
 */
const getMultiSizes = async(page, checkAvailability) => {
    return await page.evaluate((checkAvailability) => {

        const mixAndMatchUl = document.querySelector('#mix-and-match').querySelector('ul')

        const item = []

        for (let i = 0; i < mixAndMatchUl.children.length; i++){

            const li = mixAndMatchUl.childNodes[i]
            if (li.className === 'item'){
                const selectorDiv = li.querySelector('div:nth-child(3) > section > div > div.size-section > div.colour-size-select > select')

                const itemObj = {
                    name : li.querySelector('div.product-info > a > div.product-title').innerHTML,
                    price: li.querySelector('div.product-info > a > div.product-price').innerText,
                    sizes : []
                }
                console.log(itemObj.name)

                for (let i = 1; i < selectorDiv.children.length - 1; i++){
                    const optionSplit = selectorDiv.childNodes[i].innerText.split('-')

                    //remove spaces
                    for (let i = 0; i < optionSplit.length; i++){
                        optionSplit[i] = optionSplit[i].replace(/\s/g, '')
                    }

                    if (checkAvailability){
                        if (optionSplit[optionSplit.length - 1] === 'Notavailable') itemObj.sizes.push( optionSplit[0] + '- Notavailable' + optionSplit[optionSplit.length - 1])
                        else itemObj.sizes.push(optionSplit[0])
                    }else itemObj.sizes.push(optionSplit[0])

                }
                item.push(itemObj)
            }
        }
        return item
    }, checkAvailability)
}

const isPageSingleViewLayout = async(page) => {
    return await page.evaluate(() => {

        if(!document.getElementById('mix-and-match')) return true

        else return false
    })
}


const isItemAvailable = async(page, link, testName, testSize) => {

    await page.goto(link)
    const isSingleLayout = await isPageSingleViewLayout(page)

    if(isSingleLayout){
        const item = await getSingleSizes(page, true)
        const name = item.name
        const size = item.sizes

        for(let i in size){
            if(name === testName && size[i].charAt(0) === testSize && size[i].includes("Notavailable")){
                return false
            }
            else return true
        }
    }else  {
        const items = await getMultiSizes(page, true)
        for(let item of items) {
            //const name = item.name
            const size = item.sizes

            if (item.name === testName){
                for(let i in item.sizes) {

                    if (size[i].includes(testSize) && size[i].includes("Notavailable")) {
                        return false
                    }

                    else {
                        return true
                    }
                }
                break
            }
        }
    }
}

const getItemDetails = async(page, link) => {
    await page.goto(link)
    const isSingleLayout = await isPageSingleViewLayout(page)

    if(isSingleLayout){
        return await getSingleSizes(page, false)

    }else{
        return await getMultiSizes(page, false)
    }
}


/**
 *
 * @param items - Array of objects for each item, obj.keys -> link, name, size, email....
 * @returns {Array} - filtered items from passed in array that are available
 */
const checkItems = async (items) => {
    const browserObject = await helper.launchBrowser();
    const availableItems = []

    for (const item of items){
        const itemAvailable = await isItemAvailable(browserObject.page, item.link, item.name, item.size)
        if (itemAvailable) availableItems.push(item)
    }
    return availableItems
}

module.exports.checkItems_asos = checkItems;
module.exports.getItemDetails_asos = getItemDetails;


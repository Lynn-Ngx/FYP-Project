const helper = require('../scripts/helper')
const checkAvailability = require('../scripts/checkItemAvailability/checkAvailability_asos')

const scrapeItems = async () => {
    const browserObject = await helper.launchBrowser()

    //read in items links to scrape
    const links = [
        // 'https://www.asos.com/rahi-cali/rahi-scarlett-midi-dress-in-dot-flower-print/prd/11230722?clr=fleur-print&SearchQuery=&cid=8799&gridcolumn=2&gridrow=1&gridsize=4&pge=1&pgesize=72&totalstyles=7568',
        'https://www.asos.com/adidas-originals/adidas-originals-continental-80-trainers-in-leopard-print/prd/11208148?clr=core-black&SearchQuery=&cid=5906&gridcolumn=1&gridrow=1&gridsize=4&pge=1&pgesize=72&totalstyles=474'
        // 'https://www.asos.com/french-connection/french-connection-whisper-ruth-fitted-blazer-trouser-suit/grp/20969?clr=black&SearchQuery=blazer%20%26%20skinny%20trousers&gridcolumn=2&gridrow=1&gridsize=4&pge=1&pgesize=72&totalstyles=10',
        // 'https://www.asos.com/le-mini-macaron/le-mini-macaron-gel-polish-sweet-olive/prd/10253147?clr=sweet-olive&SearchQuery=Men&gridcolumn=2&gridrow=9&gridsize=3&pge=227&pgesize=72&totalstyles=49927'
    ]

    //scrape details of the item link
    for (const link of links){
        return await checkAvailability.getItemDetails_asos(browserObject.page, link)
        // console.log(itemDetails.price)
        //store scraped data into database
    }

}

console.log(scrapeItems())




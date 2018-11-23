const helper = require('../helper')
const checkAvailability = require('../checkItemAvailability/checkAvailability_asos')

const scrapeItems = async () => {
    const browserObject = await helper.launchBrowser()

    //read in items links to scrape
    const links = [
        'https://www.asos.com/french-connection/french-connection-whisper-ruth-fitted-blazer-trouser-suit/grp/20969?clr=black&SearchQuery=blazer%20%26%20skinny%20trousers&gridcolumn=2&gridrow=1&gridsize=4&pge=1&pgesize=72&totalstyles=10',
        'https://www.asos.com/french-connection/french-connection-whisper-ruth-fitted-blazer-trouser-suit/grp/20969?clr=black&SearchQuery=blazer%20%26%20skinny%20trousers&gridcolumn=2&gridrow=1&gridsize=4&pge=1&pgesize=72&totalstyles=10',
        // 'https://www.asos.com/le-mini-macaron/le-mini-macaron-gel-polish-sweet-olive/prd/10253147?clr=sweet-olive&SearchQuery=Men&gridcolumn=2&gridrow=9&gridsize=3&pge=227&pgesize=72&totalstyles=49927'
    ]

    //scrape details of the item link
    for (const link of links){
        const itemDetails = await checkAvailability.getItemDetails_asos(browserObject.page, link)
        console.log(itemDetails)
        //store scraped data into database
    }

}


scrapeItems()

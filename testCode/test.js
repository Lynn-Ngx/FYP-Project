const check_asos = require('../scripts/checkItemAvailability/checkAvailability_asos.js')
const mail = require('../mail/mail')

const items = [
    {
        link:'https://www.asos.com/french-connection/french-connection-whisper-ruth-fitted-blazer-trouser-suit/grp/20969?clr=black&SearchQuery=blazer%20%26%20skinny%20trousers&gridcolumn=2&gridrow=1&gridsize=4&pge=1&pgesize=72&totalstyles=10',
        name: 'French Connection Whisper Ruth Fitted Blazer',
        size: 'UK6',
        user: 'lynn.n@live.com',
        preferredType: 'email'
    },
    {
        link:'https://www.asos.com/french-connection/french-connection-whisper-ruth-fitted-blazer-trouser-suit/grp/20969?clr=black&SearchQuery=blazer%20%26%20skinny%20trousers&gridcolumn=2&gridrow=1&gridsize=4&pge=1&pgesize=72&totalstyles=10',
        name: 'French Connection Whisper Ruth Fitted Blazer',
        size: 'UK4',
        user: 'lynn.n@live.com',
        preferredType: 'email'
    },
    {
        link:'https://www.asos.com/asos-design/asos-design-formal-skinny-oxford-shirt-in-white/prd/8249153?clr=white&SearchQuery=shirt&gridcolumn=2&gridrow=1&gridsize=4&pge=1&pgesize=72&totalstyles=5157',
        name: 'ASOS DESIGN formal skinny oxford shirt in white',
        size: 'XXS',
        user: 'lynn.n@live.com',
        preferredType: 'email'
    },
    {
        link:'https://www.asos.com/asos-design/asos-design-formal-skinny-oxford-shirt-in-white/prd/8249153?clr=white&SearchQuery=shirt&gridcolumn=2&gridrow=1&gridsize=4&pge=1&pgesize=72&totalstyles=5157',
        name: 'ASOS DESIGN formal skinny oxford shirt in white',
        size: '3XL',
        user: 'lynn.n@live.com',
        preferredType: 'email'
    }
];

const messageTemplate = 'Hey, \n\n The item ITEM_NAME at size ITEM_SIZE that you are watching is now available. \n\n' +
    'Item link: ITEM_LINK'


check_asos.checkItems_asos(items).then(availableItems => {

    for (const availableItem of availableItems){

        const message = messageTemplate.replace('ITEM_NAME', availableItem.name).replace('ITEM_SIZE', availableItem.size).replace('ITEM_LINK', availableItem.link)

        mail('Asos item available', message, null, availableItem.user)

        //update database and remove the items that the user were notified about
        //optional - add the item to the list of items the user was notified about
        //will remove based on the id
    }
})






// check_asos.getItemDetails_asos(obj)
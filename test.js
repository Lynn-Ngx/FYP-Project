const check_asos = require('./scripts/checkItemAvailability/checkAvailability_asos.js')

const obj = [
    {
        link:'https://www.asos.com/french-connection/french-connection-whisper-ruth-fitted-blazer-trouser-suit/grp/20969?clr=black&SearchQuery=blazer%20%26%20skinny%20trousers&gridcolumn=2&gridrow=1&gridsize=4&pge=1&pgesize=72&totalstyles=10',
        name: 'French Connection Whisper Ruth Fitted Blazer',
        size: 'UK6',
        user: 'lynn@gmail.com',
        preferredType: 'email'
    },
    {
        link:'https://www.asos.com/french-connection/french-connection-whisper-ruth-fitted-blazer-trouser-suit/grp/20969?clr=black&SearchQuery=blazer%20%26%20skinny%20trousers&gridcolumn=2&gridrow=1&gridsize=4&pge=1&pgesize=72&totalstyles=10',
        name: 'French Connection Whisper Ruth Fitted Blazer',
        size: 'UK4',
        user: 'lynn@gmail.com',
        preferredType: 'email'
    },
    {
        link:'https://www.asos.com/asos-design/asos-design-formal-skinny-oxford-shirt-in-white/prd/8249153?clr=white&SearchQuery=shirt&gridcolumn=2&gridrow=1&gridsize=4&pge=1&pgesize=72&totalstyles=5157',
        name: 'ASOS DESIGN formal skinny oxford shirt in white',
        size: 'XXS',
        user: 'lynn@gmail.com',
        preferredType: 'email'
    },
    {
        link:'https://www.asos.com/asos-design/asos-design-formal-skinny-oxford-shirt-in-white/prd/8249153?clr=white&SearchQuery=shirt&gridcolumn=2&gridrow=1&gridsize=4&pge=1&pgesize=72&totalstyles=5157',
        name: 'ASOS DESIGN formal skinny oxford shirt in white',
        size: '3XL',
        user: 'lynn@gmail.com',
        preferredType: 'email'
    }
];

// check_asos.checkItems_asos(obj).then(availableItems => {
//     console.log(availableItems)
// })

check_asos.getItemDetails_asos(obj)
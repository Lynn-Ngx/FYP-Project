var schedule = require('node-schedule');
const check_asos = require('../scripts/checkItemAvailability/checkAvailability_asos.js')
const mail = require('../mail/mail')

var j = schedule.scheduleJob('*/60 * * * *', function(){

    const messageTemplate = 'Hey USER_NAME, \n\n The item ITEM_NAME at size ITEM_SIZE that you are watching is now available. \n\n' +
        'Item link: ITEM_LINK'


    check_asos.checkItems_asos(items).then(availableItems => {

        for (const availableItem of availableItems){

            const message = messageTemplate.replace('USER_NAME', availableItem.username).replace('ITEM_NAME', availableItem.name).replace('ITEM_SIZE', availableItem.size).replace('ITEM_LINK', availableItem.link)

            mail('Asos item available', message, null, availableItem.user)

            //update database and remove the items that the user were notified about
            //optional - add the item to the list of items the user was notified about
            //will remove based on the id
        }
    })


});
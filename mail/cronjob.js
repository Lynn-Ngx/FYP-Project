var schedule = require('node-schedule');
const check_asos = require('../scripts/checkItemAvailability/checkAvailability_asos.js');
const mail = require('./mail')
const itemSchema = require('../models/items')
const userSchema = require('../models/users');

//Get all items from user
const getAllItems = async () => {
    const itemsOfRegisteredUsers =[]
    const users = await userSchema.find({}, {email: 1, username: 1, items: 1})
    for (user of users){
        for(item of user.items){
            itemsOfRegisteredUsers.push({
                username: user.username,
                email: user.email,
                link: item.link,
                name: item.name,
                size:item.size,
                _id: item._id,
                userSchema: true
            })
        }
    }

    const itemsOfUnregisteredUsers = await itemSchema.find({})
    const items = itemsOfRegisteredUsers.concat(itemsOfUnregisteredUsers)
    return items
}

//Every 60mins
const alertUser = async () => {
    console.log("FYP")
    const items = await getAllItems()

    const messageTemplate = 'Hey USER_NAME, \n\nThe item "ITEM_NAME" in size ITEM_SIZE that you are watching is now available. \n\n' +
        'Item link: ITEM_LINK \n\n Thank you for using Shopaholic \n\n Best Regards, \n Shopaholic'

    check_asos.checkItems_asos(items).then(async availableItems => {

        for (const availableItem of availableItems){

            const message = messageTemplate.replace('USER_NAME', availableItem.username).replace('ITEM_NAME', availableItem.name).replace('ITEM_SIZE', availableItem.size).replace('ITEM_LINK', availableItem.link)

            mail('Asos Item Available', message, null, availableItem.email)

            if ('userSchema' in availableItem){
                await userSchema.update( {email: availableItem.email}, {$pull:  {['items']: {_id: availableItem._id}}}).exec()

            }else{
                await itemSchema.findOneAndRemove({_id: availableItem._id}).exec()
            }
        }
    })
}

// var emailUsers = schedule.scheduleJob('*/60 * * * *', async function(){
//     console.log('CALLED')
//     await alertUser()
// });

setTimeout(() => {
    alertUser()
}, 5000)
//
// //0 0 0 * * * is everyday at 12am

var scrapeLinks = schedule.scheduleJob('0 0 0 * * *', function(){

    console.log('Called!!!!!!')
    const scrapeLinks = require('../scripts/scrape/scrapeLinks')
});




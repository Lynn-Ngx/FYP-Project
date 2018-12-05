const mongoose = require('mongoose')
const items = require('../models/items')
// const prices = require('./models/prices')

const connect = () => {
    return new Promise(resolve => {
        mongoose.connect('mongodb://localhost/fypDatabase')
        mongoose.connection.once('open', function(){
            console.log('connected');
            resolve()
        }).on('error', function(error){
            console.log('Did not connect', error)
        });
    })
}

(async () => {
    await connect()
    console.log('done')

    const link = 'google.com'
    const itemName = 'fur jacket'
    const sizes = ['s', 'm', 'l']
    const price = [{
        date: 'timestamp',
        price: 'price'
    }]

    const newItem = items({
        link: link,
        name: itemName,
        sizes: sizes,
        prices: price
    })


    const savedData = await newItem.save()
    console.log(savedData)

})()
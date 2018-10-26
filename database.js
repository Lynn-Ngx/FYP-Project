const mongoose = require('mongoose')
const items = require('./models/items')
/const prices = require('./models/prices')

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

    const newItem = items({
        link: page,
        name : name,
        sizes : options,
        prices: [newPrice]
    })

    const newPrice = prices({
        date: date,
        price: price
    })

    // const newUser = users({
    //     name : name,
    //     email : email,
    //     phone: phone,
    //     password: password
    // })
    //
    // const newLink = links({
    //     link: link,
    //     name: name,
    //     email: email,
    //     phone: phone,
    //     size: size
    // })


    const savedData = await newItem.save()
    const savedPrice = await newPrice.save()
    console.log(savedData)

    // const data = await user.find({name: 'Thuy'})
    // console.log(data[0].name)
    //await api()
    //console.log('data', data)
})()
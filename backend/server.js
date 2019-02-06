var express = require('express')
const path = require('path');
const user = require('../models/users')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cron_test = require('../mail/cron_test')
const scrapeItemDetails = require('../scripts/checkItemAvailability/checkAvailability_asos')
const puppeteerHelper = require('../scripts/helper')
const itemSchema = require('../models/items')

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

connect()

var app = express()
app.use(bodyParser.json());

const port = process.env.PORT || 4000;

// database.connectToInMemeoryDB()

app.use(express.static(path.join(__dirname, 'client/build')));

app.post('/api/signup', async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const userExists = await user.findOne({email: email})

    if (userExists) {
        res.status(200).send({
            success: false,
            message: 'User with that email exists'
        })
        return
    }

    user({
        email: email,
        password: password
    })
        .save()
        .then(() => {
            console.log('saved')
            res.status(200).send({
                success: true,
                message: 'Account created'
            })
        })
        .catch(err => {
            console.log(err)
            res.status.send({
                success: false,
                message: 'Server error'
            })
        })
})

app.post('/api/signin', async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const userExists = await user.findOne({email: email})
    const passwordMatch = await user.findOne({password: password})

    if (!userExists) {
        res.status(200).send({
            success: false,
            message: 'User Does Not Exist'
        })
        return
    }

    if (!passwordMatch) {
        res.status(200).send({
            success: false,
            message: 'Incorrect Password'
        })
        return
    }
})

// app.get('/api/item', (req, res) => {
//     //send token with request
//
//     //identify the user and authenticate them, then add item to that user
//     console.log("CALLEDdddd")
//     res.send({success: true, message: "AAAAAAA"})
// })

app.post('/api/getItemDetails', async (req, res) => {

    const itemLink = req.body.itemLink
    const browerObject = await puppeteerHelper.launchBrowser()
    const item = await scrapeItemDetails.getItemDetails_asos(browerObject.page, itemLink)
    browerObject.browser.close()

    if (!itemLink) res.send("No item link provided")


    console.log(req.body)

    res.send(item)
})

app.post('/api/saveItem', async (req, res)=>{

    const email = req.body.email

    const item = {
        link: req.body.itemLink,
        price: req.body.itemPrice,
        size: req.body.itemSize,
        name: req.body.itemName
    }

    const loggedIn = req.body.isLoggedIn

    if(loggedIn === true){

        const doesUserExist = await user.findOne({email: email})

        if (!doesUserExist) res.send("USER DOES NOT EXIST")

        await user.findOneAndUpdate({email: email}, {$push: {items: item}})
    }else{
        await itemSchema({
            email: req.body.email,
            link: req.body.itemLink,
            name: req.body.itemName,
            size: req.body.itemSize,
            prices: req.body.itemPrice
        })
            .save()
            .then(() => {
                console.log('saved')
                res.status(200).send({
                    success: true,
                    message: 'Item Saved'
                })
            })
            .catch(err => {
                console.log(err)
                res.status.send({
                    success: false,
                    message: 'Server error'
                })
            })
    }

    res.send("User Item Updated")
})

app.post('/api/getDashboardItems', async (req, res) =>{
    const data = await user.findOne({email:'test'}, {items: 1, expiredItems: 1})

    if (!data) res.send("User does not exist")

    res.send(data)
})

app.delete('/api/deleteItem', (req, res) =>{
    //expired: true

    //check if expired item or not
    const typeOfItem = (req.body.expiredItem) ? 'expiredItems' : 'items'

    user.update( {email: 'test'}, {$pull:  {[typeOfItem]: {_id: req.body.itemid}}}).then((modified) => {
        res.send('Delete successful')
    })
})

app.put('/api/renew', async (req, res) =>{

    //id
    const itemDoc = await user.findOne({email:'test', expiredItems: {$elemMatch: {_id: req.body.itemid}} }, {expiredItems: 1})


    //i is for each item
    // console.log(itemDoc)
    //Mongo has their own Mongo data type so we have to convert to string
    let requestedItem = itemDoc.expiredItems.filter(item => item._id.toString() === req.body.itemid)
    requestedItem = requestedItem[0]

    if (requestedItem) {
        const call1 = user.update({email: 'test'}, {$pull: {expiredItems: {_id: req.body.itemid}}})
        const call2 = user.findOneAndUpdate({email: 'test'}, {$push: {items: requestedItem}})
        await Promise.all([call1, call2])

        res.send('Item Renewed')
    }else {
        res.send("No such item")

    }

    //push to items


})





app.listen(4000)
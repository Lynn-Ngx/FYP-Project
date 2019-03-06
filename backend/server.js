const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const path = require('path');
const user = require('../models/users');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cron_test = require('../mail/cron_test');
const scrapeItemDetails = require('../scripts/checkItemAvailability/checkAvailability_asos');
const puppeteerHelper = require('../scripts/helper');
const itemSchema = require('../models/items');
var jwt = require('jsonwebtoken');


//Token should be sent in header for the jwt autentication
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

const port = process.env.PORT || 3000;

// database.connectToInMemeoryDB()

app.use(express.static(path.join(__dirname, '/../client/build')));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/../client/build/index.html'));
});

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
            var token = jwt.sign({ email: email }, process.env.SECRET_OR_KEY);
            res.status(200).send({
                success: true,
                message: 'Account created',
                token: token
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

    var token = jwt.sign({ email: email }, process.env.SECRET_OR_KEY);

    res.status(200).send({
        success: true,
        message: 'Token Created',
        token: token
    })
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
    res.send(item)
})


app.use((req, res, next) => {
    jwt.verify(req.body.token, process.env.SECRET_OR_KEY, (err, decoded) => {

        if (err){
            res.send({success: false, message: "Invalid token"})
        }else {
            req.decoded = decoded
            next()
        }
    })
})

app.post('/api/saveItem', async (req, res)=>{
    const email = req.decoded.email

    const item = {
        link: req.body.link,
        price: req.body.price,
        size: req.body.size,
        name: req.body.name,
        image: req.body.image
    }

    const loggedIn = req.body.isLoggedIn

    if(loggedIn === true){

        const doesUserExist = await user.findOne({email: email})

        if (!doesUserExist) res.send("USER DOES NOT EXIST")

        await user.findOneAndUpdate({email: email}, {$push: {items: item}}).then(() => {
            console.log('saved')
            res.status(200).send({
                success: true,
                message: 'Item Saved'
            })
        })
    }else{
        await itemSchema({
            username: req.body.username,
            email: req.body.email,
            link: req.body.link,
            name: req.body.name,
            size: req.body.size,
            prices: req.body.price
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
})

app.post('/api/getDashboardItems', async (req, res) =>{

    const data = await user.findOne({email: req.decoded.email}, {items: 1, expiredItems: 1})

    if (!data) res.send({
        success: false,
        message: "Invalid user"
    })

    res.send({success: true, dashboardData: data})
})

/**
 * itemId - the item id you want to delete
 * expiredItem - if is an expired item
 */
//TODO:: change this to a delete request
app.post('/api/deleteItem', (req, res) =>{
    //expired: true

    //check if expired item or not
    const typeOfItem = (req.body.expiredItem) ? 'expiredItems' : 'items'

    user.update( {email: req.decoded.email}, {$pull:  {[typeOfItem]: {_id: req.body.itemId}}}).then((modified) => {
        res.send('Delete successful')
    })
})

//TODO:: should be put but post for now
app.post('/api/renew', async (req, res) =>{

    //id
    const itemDoc = await user.findOne({email:req.decoded.email, expiredItems: {$elemMatch: {_id: req.body.itemId}} }, {expiredItems: 1})

    //Mongo has their own Mongo data type so we have to convert to string
    let requestedItem = itemDoc.expiredItems.filter(item => item._id.toString() === req.body.itemId)
    requestedItem = requestedItem[0]

    if (requestedItem) {
        const call1 = user.update({email: req.decoded.email}, {$pull: {expiredItems: {_id: req.body.itemId}}})
        const call2 = user.findOneAndUpdate({email: req.decoded.email}, {$push: {items: requestedItem}})
        await Promise.all([call1, call2])

        res.send('Item Renewed')
    }else {
        res.send("No such item")

    }

    //push to items


})

app.listen(port)
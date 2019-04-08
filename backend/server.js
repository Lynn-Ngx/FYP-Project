const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const path = require('path');
const user = require('../models/users');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cronjob = require('../mail/cronjob');
const scrapeItemDetails = require('../scripts/checkItemAvailability/checkAvailability_asos');
const scrapeImage = require('../scripts/scrape/scrapeImage')
const puppeteerHelper = require('../scripts/helper');
const itemSchema = require('../models/items');
const priceSchema = require('../models/links')
var jwt = require('jsonwebtoken');
var md5 = require('md5');
const mail = require('../mail/mail')
// const ps = require('python-shell')



//Token should be sent in header for the jwt autentication
const connect = () => {
    return new Promise(resolve => {
        //mongoose.connect('mongodb://localhost/fypDatabase')
        mongoose.connect('mongodb+srv://lynn:2GfCBTqUxpPWDvhU@cluster0-knwop.mongodb.net/fypUsers?retryWrites=true')
        //mongoose.connect('mongodb+srv://lynn:2GfCBTqUxpPWDvhU@cluster0-knwop.mongodb.net/fyp?retryWrites=true')
        //mongoose.connect('mongodb://localhost/FYP');
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

const port = process.env.PORT || 3001;

// database.connectToInMemeoryDB()

app.use(express.static(path.join(__dirname, '/../client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/../client/build/index.html'));
});

app.use(express.static(path.join(__dirname, 'client/build')));

app.post('/api/signup', async (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    const userExists = await user.findOne({email: email})

    if (userExists) {
        res.status(400).send({
            success: false,
            message: 'User with that email exists'
        })
        return
    }

    user({
        username:name,
        email: email,
        password: md5(password)
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
var fs = require('fs');

const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: "../python-code2/DB",
//     filename: function(req, file, cb){
//         file.imageID = Math.random().toString(35).substr(2, 11)
//         cb(null, file.imageID + path.extname(file.originalname));
//     }
// });
//
// const upload = multer({
//     storage: storage,
//     limits:{fileSize: 100000000},
// }).single("file");

/** Permissible loading a single file,
 the value of the attribute "name" in the form of "recfile". **/

app.post('/uploadfile', upload, (req,res) => {
    res.send({success: true, imageID: req.file.imageID})
});

// app.post('/api/recommendation', async (req, res) => {
//
//     ps.PythonShell.run('../python-code2/recommend.py', null, async function (err, results) {
//         await results
//         if (err) throw err;
//
//         var bitmap = fs.readFileSync('../python-code2/output/recommendations/' + req.body.id + '_rec.png');
//
//         res.send({imageBase64: new Buffer(bitmap).toString('base64')})
//     });
// } )

app.post('/api/signin', async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const userExists = await user.findOne({email: email})
    const passwordMatch = userExists.password

    if (!userExists) {
        res.status(401).send({
            success: false,
            message: 'User Does Not Exist'
        })
        return
    }

    if (md5(password) !== passwordMatch) {
        res.status(400).send({
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
    const browserObject = await puppeteerHelper.launchBrowser()
    const item = await scrapeItemDetails.getItemDetails_asos(browserObject.page, itemLink)
    browserObject.browser.close()

    if (!item) {
        res.send({
            message: "No item link provided",
            success: false
        })
    }else{
        res.send({name: item.name, sizes: item.sizes, price: item.price, image: item.image, success: true})
    }
})

app.post('/api/scrapeImage', async(req, res)=>{
    const link = req.body.link
    const item = await scrapeImage.scrapeImage(link)

    if (!link) res.send("No item link provided")

    res.send({item: item})
})

app.post('/api/getPrices', async(req, res) =>{

    const link = req.body.link
    const price = await priceSchema.findOne({link: link})

    if (!price) {
        res.status(400).send({
            success: false,
            message: 'Link Does Not Exist'
        })
        return
    }
    const prices = []
    const dates = []

    for(let i=0; i<price.price.length; i++){
        prices.push(parseFloat(price.price[i].price.slice(1)))
        //console.log(price.price[i].date.toString())
        const dt = price.price[i].date
        price.price[i].date =  dt.getMonth( ) + 1 +'/'+ dt.getDate( ) + '/' +dt.getFullYear( );
        dates.push(price.price[i].date.toString())
    }
    res.send({
        prices: prices,
        dates: dates
    })

})

// app.put('/api/getItems', async(req, res) =>{
//     const items = await itemSchema.find()
//     res.send(items)
// })
//
// app.put('/api/getUserItems', async(req, res) =>{
//     const items = await user.find()
//     res.send(items)
// })

app.post('/api/saveItem', async (req, res)=>{
    //add error checking to make sure there fields were included
    const item = {
        link: req.body.link,
        price: req.body.price,
        size: req.body.size,
        name: req.body.name,
        image: req.body.image
    }

    const loggedIn = req.body.isLoggedIn
    //const loggedIn = (req.body.token)

    if(loggedIn === true){

        //have to check if body contains token
        if (!req.body.token){
            res.send({success: false, message: "Invalid token"})
            return
        }

        jwt.verify(req.body.token, process.env.SECRET_OR_KEY, (err, decoded) => {

            if (err){
                res.send({success: false, message: "Invalid token"})
                console.log(err)
            }else {
                req.decoded = decoded
            }
        })

        const email = req.decoded.email

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

                const messageTemplate = 'Hey USER_NAME, \n\nYou are now tracking the ASOS item "ITEM_NAME" in size ITEM_SIZE. ' +
                    'We will notify you when the item is available! \n\n' +
                    'Thank you for using Shopaholic \n\n Best Regards, \n Shopaholic'

                const message = messageTemplate.replace('USER_NAME', req.body.username).replace('ITEM_NAME', req.body.name).replace('ITEM_SIZE', req.body.size)

                mail('Tracking Item', message, null, req.body.email)

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


app.post('/api/getDashboardItems', async (req, res) =>{

    const data = await user.findOne({email: req.decoded.email}, {items: 1, expiredItems: 1})

    if (!data) res.send({
        success: false,
        message: "No items found"
    })

    res.send({success: true, dashboardData: data})
})

/**
 * itemId - the item id you want to delete
 * expiredItem - if is an expired item
 */

app.post('/api/deleteItem', (req, res) =>{

    const typeOfItem = (req.body.expiredItem) ? 'expiredItems' : 'items'

    user.update( {email: req.decoded.email}, {$pull:  {[typeOfItem]: {_id: req.body.itemId}}}).then((modified) => {
        res.send('Delete successful')
    })
})

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
})

app.listen(port)
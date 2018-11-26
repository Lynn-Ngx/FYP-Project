var express = require('express')
const path = require('path');
// const database = require('./database')
const user = require('./models/users')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
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




connect()

var app = express()
app.use(bodyParser.json());

const port = process.env.PORT || 4000;

// database.connectToInMemeoryDB()

app.use(express.static(path.join(__dirname, 'client/build')));


// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });

app.get('/test', (req, res) => {
    res.send('hello test')
})

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

app.listen(4000)
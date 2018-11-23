var express = require('express');
var router = express.Router()
var user = require('../models/users.js')

router.get('/', function(req, res, next) {
    res.render('login', {title: 'Express'})
});

router.get('/login', function(req, res){
    var email = req.body.email
    var password = req.body.password

    User.findOne({email: email, password: password}, function(err, user){
        if(err){
            console.log(err)
            return res.status(500).send()
        }

        if(!User){
            res.status(404).send()
        }
        return res.status(200).send()
    })
});

router.get('/register', function(req, res){
    var firstname = req.body.firstname
    var email = req.body.email
    var number = req.body.number
    var password = req.body.password

    var newUser = new User()
    newUser.firstname = firstname
    newUser.email = email
    newUser.number = number
    newUser.password = password

    newUser.save(function(err, savedUser){
        if(err){
            console.log(err)
            return res.status(500).send()
        }
        return res.status(200).send()
    })
})
model.exports = router
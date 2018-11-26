// const mongoose = require('mongoose')
// var Schema = mongoose.Schema;
//
// const userSchema = new Schema({
//     firstname: String,
//     email: { type: String, unique: true },
//     number: {type: Number, unique: true },
//     password: {type: String}
// });
//
//
// let Users = mongoose.model('User', userSchema);
//
// module.exports = Users

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//the item that the user is tracking
const itemSchema = new Schema({
    name: String,
    link: String,
    size: String,
    notificationMethod: String,


}, {timestamps: true});


const userSchema = new Schema({
    email: String,
    password: String,
    items: [itemSchema],
    expiredItems: [itemSchema]

}, {timestamps: true});

//userSchema.index({ name: 1, type: -1 });

const user = mongoose.model('user', userSchema);

module.exports = user;
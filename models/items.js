const mongoose = require('mongoose')
var Schema = mongoose.Schema;

// const priceSchema = new Schema({
//     date: String,
//     price: String
// })

const itemSchema = new Schema({
    email: String,
    username: String,
    link: String,
    name: String,
    size: String,
    prices: String,
})

var Items = mongoose.model('Items', itemSchema);

module.exports = Items


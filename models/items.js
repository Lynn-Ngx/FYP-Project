const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const priceSchema = new Schema({
    date: String,
    price: String
})

const itemSchema = new Schema({
    link: String,
    name: String,
    sizes: Array,
    prices: [priceSchema]
})

var Items = mongoose.model('Items', itemSchema);

module.exports = Items


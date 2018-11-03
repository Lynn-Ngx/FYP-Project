const mongoose = require('mongoose')
const Schema = mongoose.Schema;

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

const items = mongoose.model('Items', itemSchema);

module.exports = items


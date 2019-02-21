const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const linkSchema = new Schema({
    name: String,
    link: String,
    price: Array
});

//userSchema.index({ name: 1, type: -1 });

const links = mongoose.model('link', linkSchema);

module.exports = links;


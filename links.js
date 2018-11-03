const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const linkSchema = new Schema({
    name: String,
    links: Array
});

//userSchema.index({ name: 1, type: -1 });

const link = mongoose.model('link', linkSchema);

module.exports = link;


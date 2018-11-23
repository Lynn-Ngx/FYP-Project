const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: String,
    email: { type: String, unique: true },
    number: {type: Number, unique: true },
    password: {type: String}
});


let Users = mongoose.model('User', userSchema);

module.exports = Users
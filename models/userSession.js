const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const userSessionSchema = new Schema({
    userId: {
        type: Number,
        default: -1
    },
    timestamp:{
        type: Date,
        default: Date.now()
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

let userSession = mongoose.model('userSession', userSessionSchema);

module.exports = userSession
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
    price: String,
    notificationMethod: String
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

const Users = [
    {
        email: '@gmai.com',
        password: 'pass',
        items: [
            {
                link:'https://www.asos.com/french-connection/french-connection-whisper-ruth-fitted-blazer-trouser-suit/grp/20969?clr=black&SearchQuery=blazer%20%26%20skinny%20trousers&gridcolumn=2&gridrow=1&gridsize=4&pge=1&pgesize=72&totalstyles=10',
                name: 'French Connection Whisper Ruth Fitted Blazer',
                size: 'UK4',
                preferredType: 'email',
                id: 'asdas'
            },
            {
                link:'https://www.asos.com/french-connection/french-connection-whisper-ruth-fitted-blazer-trouser-suit/grp/20969?clr=black&SearchQuery=blazer%20%26%20skinny%20trousers&gridcolumn=2&gridrow=1&gridsize=4&pge=1&pgesize=72&totalstyles=10',
                name: 'French Connection Whisper Ruth Fitted Blazer',
                size: 'UK4',
                preferredType: 'email'
            }
        ],
        expiredITems: []
    },
    {
        email: '@gmai.com',
        password: 'pass',
        items: [
            {
                link:'https://www.asos.com/french-connection/french-connection-whisper-ruth-fitted-blazer-trouser-suit/grp/20969?clr=black&SearchQuery=blazer%20%26%20skinny%20trousers&gridcolumn=2&gridrow=1&gridsize=4&pge=1&pgesize=72&totalstyles=10',
                name: 'French Connection Whisper Ruth Fitted Blazer',
                size: 'UK4',
                preferredType: 'email'
            },
            {
                link:'https://www.asos.com/french-connection/french-connection-whisper-ruth-fitted-blazer-trouser-suit/grp/20969?clr=black&SearchQuery=blazer%20%26%20skinny%20trousers&gridcolumn=2&gridrow=1&gridsize=4&pge=1&pgesize=72&totalstyles=10',
                name: 'French Connection Whisper Ruth Fitted Blazer',
                size: 'UK4',
                preferredType: 'email'
            }
        ],
        expiredITems: []
    }
]
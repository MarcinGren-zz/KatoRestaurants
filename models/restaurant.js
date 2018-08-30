const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String, //not sure about this
    menu: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
})
module.exports = mongoose.model('Restaurant', restaurantSchema)
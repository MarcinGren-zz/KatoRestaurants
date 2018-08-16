var mongoose = require('mongoose')

var restaurantSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String //not sure about this
})
module.exports = mongoose.model('Restaurant', restaurantSchema)
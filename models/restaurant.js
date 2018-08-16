const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String //not sure about this
})
module.exports = mongoose.model('Restaurant', restaurantSchema)
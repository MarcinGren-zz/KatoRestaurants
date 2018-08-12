var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var dbConnection = require('./config')
var mongoose = require('mongoose')

function getRestaurants() {
    Restaurant.find({}, function(err, rest) {
        if (err) {
            console.log('COULDNT OBTAIN RESTAURANTS')
        } else {
            restaurants = rest
        }
    })
}

mongoose.connect(`mongodb://${dbConnection.DB_USERNAME}:${dbConnection.DB_PASSWORD}@ds219532.mlab.com:19532/katorestaurants`)

var restaurantSchema = new mongoose.Schema({
    name: String,
    image: String
})
var Restaurant = mongoose.model('Restaurant', restaurantSchema)
getRestaurants()

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/'))

app.get('/', function(req, res) {
    res.render('homepage.ejs')
})

app.get('/restaurants', function(req, res) {
    getRestaurants()
    res.render('restaurants.ejs', {
        restaurants: restaurants
    })
})

app.post('/restaurants', function(req, res) {
    var name = req.body.name
    var image = req.body.image
    var newRestaurant = {name: name, image: image}
    Restaurant.create(newRestaurant, function(err) {
        console.log(err)
    })
    res.redirect('/restaurants')
})

app.get('/restaurants/new', function(req, res) {
    res.render('new.ejs')
})

// for testing purposes
// Cat.find({}, function(err, cats) {
//     console.log(cats)
// })
// Cat.create({
    // name: 'snow'
    // age: 15,
// })


app.listen(8080, function() {
    console.log('App has started')    
})
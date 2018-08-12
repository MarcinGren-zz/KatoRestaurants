var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var dbConnection = require('./config')
var mongoose = require('mongoose')

mongoose.connect(`mongodb://${dbConnection.DB_USERNAME}:${dbConnection.DB_PASSWORD}@ds219532.mlab.com:19532/katorestaurants`)

var restaurantSchema = new mongoose.Schema({
    name: String,
    image: String
})
var Restaurant = mongoose.model('Restaurant', restaurantSchema)

var restaurants = [
    { name: 'Hurry Curry', image: 'https://media-cdn.tripadvisor.com/media/photo-s/04/c9/e3/e5/hurry-curry.jpg' },
    { name: 'Bujna', image:'https://scontent.cdninstagram.com/vp/a1b927db49a66d389ed5631e1a8cca78/5BBBCE7A/t51.2885-15/s640x640/sh0.08/e35/32321803_1054602141353815_5992938524339339264_n.jpg' },
    { name: 'Mihiderka', image:'https://retailnet.pl/wp-content/uploads/2017/08/Mihiderka-w-Galerii-Katowickiej.jpg' },
    { name: 'Novo', image:'http://katowice24.info/wp-content/uploads/2017/03/novo.jpg' }
]

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/'))

app.get('/', function(req, res) {
    res.render('homepage.ejs')
})

app.get('/restaurants', function(req, res) {
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
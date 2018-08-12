const express       = require('express'),
      app           = express(),
      bodyParser    = require('body-parser'),
      dbConnection  = require('./config'),
      mongoose      = require('mongoose')

function getRestaurants() {
    Restaurant.find({}, function (err, rest) {
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

app.get('/', function (req, res) {
    res.render('homepage.ejs')
})

 //timeout doesnt work, need to find a way to wait until refresh as it refreshes before 
 //newly added restaurant can be saved onto db
app.get('/restaurants', function (req, res) {
    setTimeout(function () {
        getRestaurants()
        res.render('restaurants.ejs', {
            restaurants: restaurants
        })
    }, 1000)
})

app.post('/restaurants', function (req, res) {
    var name = req.body.name
    var image = req.body.image
    var newRestaurant = {
        name: name,
        image: image
    }
    Restaurant.create(newRestaurant, function (err) {
        console.log(err)
    })
    res.redirect('/restaurants')
})

app.get('/restaurants/new', function (req, res) {
    res.render('new.ejs')
})

app.listen(8080, function () {
    console.log('App has started')
})
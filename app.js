const express       = require('express'),
      app           = express(),
      bodyParser    = require('body-parser'),
      dbConnection  = require('./config'),
      mongoose      = require('mongoose')

// function getRestaurants() {
//     Restaurant.find({}, function (err, allRestaurants) {
//         if (err) {
//             console.log('COULDNT OBTAIN RESTAURANTS')
//         } else {
//             res.render('restaurants.ejs', {restaurants: allRestaurants})
//         }
//     })
// }

mongoose.connect(`mongodb://${dbConnection.DB_USERNAME}:${dbConnection.DB_PASSWORD}@ds219532.mlab.com:19532/katorestaurants`)

var restaurantSchema = new mongoose.Schema({
    name: String,
    image: String
})
var Restaurant = mongoose.model('Restaurant', restaurantSchema)

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/'))

app.get('/', function (req, res) {
    res.render('homepage.ejs')
})

app.get('/restaurants', function (req, res) {
    Restaurant.find({}, function (err, allRestaurants) {
        if (err) {
            console.log('COULDNT OBTAIN RESTAURANTS')
        } else {
            res.render('restaurants.ejs', {restaurants: allRestaurants})
        }
    })
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
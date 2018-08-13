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
    image: String,
    description: String //not sure about this
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
            res.render('restaurants-index.ejs', {restaurants: allRestaurants})
        }
    })
})

app.post('/restaurants', function (req, res) {
    var name = req.body.name
    var image = req.body.image
    var desc = req.body.description
    var newRestaurant = {
        name: name,
        image: image,
        description: desc
    }
    Restaurant.create(newRestaurant, function (err) {
        console.log(err)
    })
    res.redirect('/restaurants')
})

app.get('/restaurants/new', function (req, res) {
    res.render('restaurants-new.ejs')
})

app.get('/restaurants/:id', function(req, res) {
    Restaurant.findById(req.params.id, function(err, restaurantUsed) {
        if (err) {
            console.log(err)
        } else {
            res.render('restaurants-show.ejs', {restaurant: restaurantUsed})
        }
    })
})

app.listen(8080, function () {
    console.log('App has started')
})
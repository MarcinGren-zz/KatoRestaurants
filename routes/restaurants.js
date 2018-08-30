const express    = require('express'),
      router     = express.Router(),
      Restaurant = require('../models/restaurant')

// INDEX ROUTE
router.get('/', function (req, res) {
    Restaurant.find({}, function (err, allRestaurants) {
        if (err) {
            console.log('COULDNT OBTAIN RESTAURANTS')
        } else {
            res.render('restaurants-index.ejs', {
                restaurants: allRestaurants
            })
        }
    })
})

// CREATE ROUTE
router.post('/', function (req, res) {
    var name = req.body.name
    var image = req.body.image
    var desc = req.body.description
    var menu = req.body.menu
    var newRestaurant = {
        name: name,
        image: image,
        menu: menu,
        description: desc
    }
    Restaurant.create(newRestaurant, function (err) {
        console.log(err)
    })
    res.redirect('/restaurants')
})

// NEW ROUTE
router.get('/new', function (req, res) {
    res.render('restaurants-new.ejs')
})

// SHOW ROUTE
router.get('/:id', function (req, res) {
    Restaurant.findById(req.params.id).populate('comments').exec(function (err, restaurantUsed) {
        if (err) {
            console.log(err)
        } else {
            res.render('restaurants-show.ejs', {
                restaurant: restaurantUsed
            })
        }
    })
})

module.exports = router
const express    = require('express'),
      router     = express.Router({mergeParams: true}),
      Restaurant = require('../models/restaurant'),
      Comment    = require('../models/comment'),
      isLoggedIn = require('../scripts/is-logged-in')

// NEW ROUTE
router.get('/new', isLoggedIn, function (req, res) {
    Restaurant.findById(req.params.id, function (err, restaurantUsed) {
        res.render('comments-new.ejs', {
            restaurant: restaurantUsed
        })
    })
})

// CREATE ROUTE
router.post('/', isLoggedIn, function (req, res) {
    Restaurant.findById(req.params.id, function (err, restaurant) {
        Comment.create(req.body.comment, function (err, commentCreated) { // Do the same above for restaurant
            if (err) {
                console.log(err)
            } else {
                restaurant.comments.push(commentCreated)
                restaurant.save()
                res.redirect('/restaurants/' + restaurant._id)
            }
        })
    })
})

module.exports = router
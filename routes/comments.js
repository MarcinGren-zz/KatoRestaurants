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
        Comment.create(req.body.comment, function (err, comment) { // Do the same above for restaurant
            if (err) {
                console.log(err)
            } else {
                // add username / id
                comment.author.id = req.user._id
                comment.author.username = req.user.username
                comment.save()
                restaurant.comments.push(comment)
                restaurant.save()
                res.redirect('/restaurants/' + restaurant._id)
            }
        })
    })
})

module.exports = router
const Restaurant = require('../models/restaurant')

function checkCampgroundAuthor(req, res, next) {
    if (req.isAuthenticated()) {
        Restaurant.findById(req.params.id, function (err, foundRestaurant) {
            if (err || !foundRestaurant) {
                req.flash('message', 'Restaurant not found')
                res.redirect('back')
            } else {
                if (foundRestaurant.author.id.equals(req.user._id)) {
                    next()
                } else {
                    req.flash('message', "You don't have permission to do that")
                    res.redirect('back')
                }
            }
        })
    } else {
        req.flash('message', 'You need to be logged in')
        res.redirect('back')
    }
}

module.exports = checkCampgroundAuthor
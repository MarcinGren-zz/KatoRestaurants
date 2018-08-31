const Restaurant = require('../models/restaurant')

function checkCampgroundAuthor(req, res, next) {
    if (req.isAuthenticated()) {
        Restaurant.findById(req.params.id, function (err, foundRestaurant) {
            if (err) {
                res.redirect('back')
            } else {
                if (foundRestaurant.author.id.equals(req.user._id)) {
                    next()
                } else {
                    res.redirect('back')
                }
            }
        })
    } else {
        res.redirect('back')
    }
}

module.exports = checkCampgroundAuthor
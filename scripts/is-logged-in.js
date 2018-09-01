function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    req.flash('message', 'You need to be logged in')
    res.redirect('/login')
}

module.exports = isLoggedIn
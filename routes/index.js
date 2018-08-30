const express    = require('express'),
      router     = express.Router(),
      passport   = require('passport'),
      User       = require('../models/user'),
      isLoggedIn = require('../scripts/is-logged-in')

// INDEX
router.get('/', function (req, res) {
    res.render('homepage.ejs')
})

// AUTH ROUTES
// SHOW ROUTE
router.get('/register', function(req, res) {
    res.render('register.ejs')
})

// CREATE ROUTE
router.post('/register', function(req, res) {
    let newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, function(err ,user) {
        if (err) {
            console.log(err)
            return res.render('/register')
        }
        passport.authenticate('local')(req, res, function() {
            res.redirect('/restaurants')
        })
    })
})

// SHOW ROUTE LOGIN
router.get('/login', function(req, res) {
    res.render('login.ejs')
})

// HANDLES LOGIN LOGIC
router.post('/login', passport.authenticate('local', {
    successRedirect: '/restaurants',
    failureRedirect: '/login'
}), function(req, res) {
})

// HANDLES LOGOUT
router.get('/logout', function(req ,res) {
    req.logout()
    res.redirect('/restaurants')
})

module.exports = router
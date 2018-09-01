const express        = require('express'),
      bodyParser     = require('body-parser'),
      dbConnection   = require('./config'),
      mongoose       = require('mongoose'),
      passport       = require('passport'),
      localStrategy  = require('passport-local'),
      methodOverride = require('method-override'),
      Restaurant     = require('./models/restaurant'),
      Comment        = require('./models/comment'),
      User           = require('./models/user')
      seedDb         = require('./seeds')
      flash          = require('connect-flash'),
      app            = express()

const restaurantsRoutes = require('./routes/restaurants'),
      commentRoutes     = require('./routes/comments'),
      indexRoutes       = require('./routes/index')

// function getRestaurants() {
//     Restaurant.find({}, function (err, allRestaurants) {
//         if (err) {
//             console.log('COULDNT OBTAIN RESTAURANTS')
//         } else {
//             res.render('restaurants.ejs', {restaurants: allRestaurants})
//         }
//     })
// }

// normal db - Dont run seedDB() on this! - Gotta find a better way to handle this
// mongoose.connect(`mongodb://${dbConnection.DB_USERNAME}:${dbConnection.DB_PASSWORD}@ds219532.mlab.com:19532/katorestaurants`)

// seed db
seedDb()
mongoose.connect(`mongodb://${dbConnection.DB_USERNAME}:${dbConnection.DB_PASSWORD}@ds029635.mlab.com:29635/seedkatorestaurants`)

// PASSPORT CONFIG
app.use(require('express-session')({
    secret: 'its not hard to crack',
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static(__dirname + '/'))
app.use(function(req, res, next) {
    res.locals.currentUser = req.user
    res.locals.message = req.flash('message')
    next()
})
app.use(methodOverride('_method'))


app.use(indexRoutes)
app.use('/restaurants', restaurantsRoutes)
app.use('/restaurants/:id/comments', commentRoutes)

app.listen(8080, function () {
    console.log('App has started')
})
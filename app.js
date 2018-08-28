const express       = require('express'),
      bodyParser    = require('body-parser'),
      dbConnection  = require('./config'),
      mongoose      = require('mongoose'),
      passport      = require('passport'),
      localStrategy = require('passport-local'),
      Restaurant    = require('./models/restaurant'),
      Comment       = require('./models/comment'),
      User          = require('./models/user')
      seedDb        = require('./seeds')
      app           = express()

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
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static(__dirname + '/'))

app.get('/', function (req, res) {
    res.render('homepage.ejs')
})

// INDEX ROUTE
app.get('/restaurants', function (req, res) {
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
app.post('/restaurants', function (req, res) {
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
app.get('/restaurants/new', function (req, res) {
    res.render('restaurants-new.ejs')
})

// SHOW ROUTE
app.get('/restaurants/:id', function (req, res) {
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

// COMMENTS NEW ROUTE - restrautants/:id/comments/new   GET
app.get('/restaurants/:id/comments/new', function (req, res) {
    Restaurant.findById(req.params.id, function (err, restaurantUsed) {
        res.render('comments-new.ejs', {
            restaurant: restaurantUsed
        })
    })
})
// COMMENTS CREATE ROUTE - restrautants/:id/comments    POST
app.post('/restaurants/:id/comments', function (req, res) {
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

// AUTH ROUTES
app.get('/register', function(req, res) {
    res.render('/register')
})



app.listen(8080, function () {
    console.log('App has started')
})
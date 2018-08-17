const mongoose = require('mongoose'),
    Restaurant = require('./models/restaurant'),
    Comment =    require('./models/comment')

const data = [{
        name: "Hurry Curry",
        image: "https://media-cdn.tripadvisor.com/media/photo-s/04/c9/e3/e5/hurry-curry.jpg",
        description: "foobar"
    },
    {
        name: "Hurry Curry 2",
        image: "https://media-cdn.tripadvisor.com/media/photo-s/04/c9/e3/e5/hurry-curry.jpg",
        description: "foobar"
    },
    {
        name: "Hurry Curry 3",
        image: "https://media-cdn.tripadvisor.com/media/photo-s/04/c9/e3/e5/hurry-curry.jpg",
        description: "foobar"
    }
]

function seedDB() {
    Restaurant.remove({}, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log('removed restaurant')
        }
    })
    data.forEach(function (seed) {
        Restaurant.create(seed, function (err, restaurant) {
            if (err) {
                console.log(err)
            } else {
                console.log('added restaurant')
                Comment.create({
                    text: 'Nice place',
                    author: 'Some dude'
                }, function (err, comment) {
                    if (err) {
                        console.log(err)
                    } else {
                        restaurant.comments.push(comment)
                        restaurant.save()
                        console.log('added comment')
                    }
                })
            }
        })
    })
}

// Restaurant.findOne({name: 'Hurry Curry'}).populate('comments').exec(function(err, restaurant) {
//     console.log(restaurant)
// })

module.exports = seedDB
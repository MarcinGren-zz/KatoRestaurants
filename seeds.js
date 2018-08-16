const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')

const data = [{
        name: "Hurry Curry",
        image: "https://media-cdn.tripadvisor.com/media/photo-s/04/c9/e3/e5/hurry-curry.jpg",
        description: "foobar"
    },
    {
        name: "Hurry Curry",
        image: "https://media-cdn.tripadvisor.com/media/photo-s/04/c9/e3/e5/hurry-curry.jpg",
        description: "foobar"
    },
    {
        name: "Hurry Curry",
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
        Restaurant.create(seed, function (err, data) {
            if (err) {
                console.log(err)
            } else {
                console.log('added restaurant')
            }
        })
    })
}

module.exports = seedDB
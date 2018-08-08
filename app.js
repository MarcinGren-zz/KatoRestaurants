var express = require('express')
var app = express()

app.get('/', function(req, res) {
    res.render('homepage.ejs')
})

app.get('/restaurants', function(req, res) {
    var campgrounds = [
        { name: 'Hurry Curry', image: 'https://media-cdn.tripadvisor.com/media/photo-s/04/c9/e3/e5/hurry-curry.jpg' },
        { name: 'Bujna', image:'https://scontent.cdninstagram.com/vp/a1b927db49a66d389ed5631e1a8cca78/5BBBCE7A/t51.2885-15/s640x640/sh0.08/e35/32321803_1054602141353815_5992938524339339264_n.jpg' },
        { name: 'Mihiderka', image:'https://retailnet.pl/wp-content/uploads/2017/08/Mihiderka-w-Galerii-Katowickiej.jpg' }
    ]
})



app.listen(8080, function() {
    console.log('App has started')
})
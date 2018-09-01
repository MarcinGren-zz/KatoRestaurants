const express          = require('express'),
    router             = express.Router({mergeParams: true}),
    Restaurant         = require('../models/restaurant'),
    Comment            = require('../models/comment'),
    isLoggedIn         = require('../scripts/is-logged-in'),
    checkCommentAuthor = require('../scripts/check-comment-author')

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
                req.flash('message', 'Something went wrong, comment not created')
                console.log(err)
            } else {
                // add username / id
                comment.author.id = req.user._id
                comment.author.username = req.user.username
                comment.save()
                restaurant.comments.push(comment)
                restaurant.save()
                req.flash('message', 'Successfully added comment')
                res.redirect('/restaurants/' + restaurant._id)
            }
        })
    })
})

// EDIT ROUTE
router.get('/:comment_id/edit', checkCommentAuthor, function (req, res) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
        if (err) {
            res.redirect('back')
        } else {
            res.render("comments-edit.ejs", {
                restaurant_id: req.params.id,
                comment: foundComment
            })
        }
    })
})

// UPDATE ROUTE
router.put('/:comment_id', checkCommentAuthor, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if (err) {
            req.flash('message', "Couldn't update the comment")
            res.redirect('back')
        } else {
            req.flash('message', 'Successfully updated the comment')
            res.redirect(`/restaurants/${req.params.id}`)
        }
    })
})

// DESTROY ROUTE
router.delete('/:comment_id', checkCommentAuthor, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err) {
            req.flash('message', 'Something went wrong, comment not deleted')
            res.redirect(`/restaurants/${req.params.id}`)
        } else {
            req.flash('message', 'Comment deleted')
            res.redirect(`/restaurants/${req.params.id}`)
        }
    })
})

module.exports = router
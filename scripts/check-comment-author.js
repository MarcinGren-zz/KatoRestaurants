const Comment = require('../models/comment')

function checkCommentAuthor(req, res, next) {
    if (req.isAuthenticated()) {
            Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err || !foundComment) {
                req.flash('message', 'Comment not found')
                res.redirect('back')
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
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

module.exports = checkCommentAuthor
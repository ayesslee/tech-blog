// dependencies
const router = require('express').Router();
const { Comment, Blog, User } = require('../../models');
const withAuth = require('../../utils/auth');

// show all comments on posts
router.get('/', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.findAll({});
        // serialize 
        const comments = commentData.map((comment) => comment.get({ plain: true }));

        console.log(comments);
        res.render('blog', { comments, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// posts new comments 
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            user_id: req.session.user_id,
            blog_id: req.body.blogId,
            content: req.body.commentBody,
        });
        console.log(newComment);
        res.status(200).json(newComment);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

// deletes comments
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletecomment = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(deletecomment);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});


module.exports = router;
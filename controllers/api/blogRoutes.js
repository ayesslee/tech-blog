// dependencies
const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

// creates new blog posts 
router.post('/', withAuth, async (req, res) => {
    try {
        const newBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newBlog);
    } catch (err) {
        res.status(400).json(err);
    }
});

// edits the blog post(s) 
router.put('/:id/edit', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.update({
            name: req.body.title,
            description: req.body.blogDescription
        },
            {
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id,
                },
            });
        res.status(200).json(blogData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// deletes the blog posts 
router.delete('/:id/edit', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!blogData) {
            res.status(404).json({ message: 'No blog post found with this id!' });
            return;
        }

        res.status(200).json(blogData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
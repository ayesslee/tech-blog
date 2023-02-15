// dependencies
const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// route to show blog posts on homepage 
router.get('/', async (req, res) => {
    try {
        // Get all blogs and JOIN with user data
        const blogData = await Blog.findAll({
            attributes: ["id", "name", "description", "date_created"],
            include: [
                {
                    model: Comment,
                    attributes: ["id", "content", "blog_id", "user_id", "date_created"],
                    include: {
                        model: User,
                        attributes: ["name", "id"],
                    },
                },
                {
                    model: User,
                    attributes: ["name", "id"],
                }
            ],
        });

        // Serialize data so the template can read it
        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// route to show account's blog posts
router.get('/blog/:id', async (req, res) => {
    try {
        const blogData = await Blog.findOne({
            where: {
                id: req.params.id,
            },
            attributes: ["id", "name", "description", "date_created"],
            include: [
                {
                    model: Comment,
                    attributes: ["id", "content", "blog_id", "user_id", "date_created"],
                    include: {
                        model: User,
                        attributes: ["name", "id"],
                    },
                },
                {
                    model: User,
                    attributes: ["name", "id"],
                },
            ],
        })

        const blog = blogData.get({ plain: true });
        console.log(blog)
        res.render('blog', {
            ...blog,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// route to show any edits done to the blog post 
router.get('/blog/:id/edit', async (req, res) => {
    try {
        const blogData = await Blog.findOne({
            where: {
                id: req.params.id,
            },
            attributes: ["id", "name", "description", "date_created"],
            include: [
                {
                    model: Comment,
                    attributes: ["id", "content", "blog_id", "user_id", "date_created"],
                    include: {
                        model: User,
                        attributes: ["name", "id"],
                    },
                },
                {
                    model: User,
                    attributes: ["name", "id"],
                },
            ],
        })

        const blog = blogData.get({ plain: true });
        console.log(blog)
        res.render('edit', {
            ...blog,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// withAuth middleware to prevent access to route without credentials
router.get('/profile', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Blog }],
        });

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// logs user in 
router.get('/login', (req, res) => {
    // if the user is already logged in it will redirect to another route
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});

module.exports = router;
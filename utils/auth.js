const withAuth = (req, res, next) => {
    // if user is not logged in, go to login
    if (!req.session.logged_in) {
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;
const {successPrint, errorPrint} = require("../helpers/debug/debugprinters");
const routeProtectors = {};

// check to see if user is logged in before they can post image
routeProtectors.userIsLoggedIn = function(req, res, next) {
    if(req.session.username) {
        successPrint('User is logged in');
        next();
    }
    else {
        errorPrint('User is not logged in');
        req.flash('error', 'Log in to post image');
        res.redirect('/login');
    }
}

module.exports = routeProtectors;
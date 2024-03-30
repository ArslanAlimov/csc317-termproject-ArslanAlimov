var db = require("../config/database");
const postMiddleware = {}

postMiddleware.getRecentPosts = function(req, res, next) {
    let baseSQL = "SELECT id, title, description, thumbnail, created FROM posts ORDER BY created DESC LIMIT 9"; // grab 9 most recent posts
    db.execute(baseSQL,[])
    .then(([results, fields]) => {
        res.locals.results = results;
        if (results && results.length == 0) {
            req.flash('error', 'There are',results,"Posts");
        }
        next();
    })
    .catch((err) => next(err));
}

module.exports = postMiddleware;
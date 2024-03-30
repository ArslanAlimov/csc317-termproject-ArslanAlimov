var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotectors').userIsLoggedIn;
var getRecentPosts = require('../middleware/postmiddleware').getRecentPosts;
var db = require("../config/database");

/* GET home page. */
// / -> localhost:3000
router.get('/', getRecentPosts, function(req, res, next) {
  //next(new Error('Testing Our Error'));
  res.render('index');
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.get('/registration', (req, res, next) => {
  res.render('registration');
});



router.get('/imagepost', (req, res, next) => {
  res.render('imagepost');
});

router.get('/searchresults', (req, res, next) => {
  res.render('searchresults');
});


router.use('/postimage', isLoggedIn);
router.get('/postimage', (req, res, next) => {
  res.render('postimage');
});


router.get('/post/:id(\\d+)', (req, res, next) => {
  let baseSQL = "SELECT u.id, u.username, p.title, p.description, p.photopath, p.created \
  FROM users u \
  JOIN posts p \
  ON u.id = fk_userid \
  WHERE p.id = ?;";

  let postId = req.params.id;
  db.execute(baseSQL, [postId])
  .then(([results, fields]) => {
    if(results && results.length) {
      let post = results[0]; 
      res.render('imagepost', {currentPost: post})
    }
    else {
      req.flash('error', 'Not the post you were looking for.');
      res.redirect('/');
    }
  })
})


module.exports = router;

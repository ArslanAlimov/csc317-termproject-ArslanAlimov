const express = require('express');
const router = express.Router();
const db = require('../config/database');


router.get('/getAllUsers', (req, res, next) => {

    db.query('SELECT * FROM users;', (err, results, fields) => 
    {
        if (err) {
            next(err);
        }
            console.log(results);
            res.send(results);
    })
    
});



router.get('/getAllPosts', (req, res, next) => {
    db.query('SELECT * FROM posts;', (err, results, fields) => 
    {
        if (err) {
            next(err);
        }
            console.log(results);
            res.send(results);
    })
    
});
router.get('/getAllComments', (req, res, next) => {
    db.query('SELECT * FROM csc317db.comments;', (err, results, fields) => 
    {
            console.log(results);
            res.send(results);
    })
    
});


router.get('/getAllPostsP', (req, res, next) => {
    db.promise().query('SELECT * FROM posts;')
    .then(([results, fields]) => {
        console.log(results);
        res.send(results);
    })
    .catch((err) => {
        next(err);
    })
    
    
});


router.post('/createUser', (req, res, next) => {
    console.log(req.body);
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;



    let baseSQL = 'INSERT INTO users (username, email, password, created) VALUES (?, ?, ?, now())';
    db.promise().query(baseSQL, [username, email, password]).
    then(([results, fields]) => {

        if(results && results.affectedRows) {
            res.send('user was created');
        }
        else {
            res.send('user was not created');
        }
    })
})

module.exports = router;
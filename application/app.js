var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// import express handlebars
var handlebars = require('express-handlebars');
var sessions = require('express-session');
var mysqlSession = require('express-mysql-session')(sessions); //linking them together
var flash = require('express-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dbRouter = require('./routes/dbtest');
var postsRouter = require('./routes/posts');
// require functions instead of entire module
var errorPrint = require('./helpers/debug/debugprinters').errorPrint;
var requestPrint = require('./helpers/debug/debugprinters').requestPrint;
var app = express();

app.engine(
    "hbs",
    handlebars({
        layoutsDir: path.join(__dirname, "views/layouts"),
        partialsDir: path.join(__dirname, "views/partials"),
        extname: ".hbs",
        defaultLayout: "home",
        helpers: {
            // add any helpers if needed

            // check whether theres a message
            emptyObject: (obj, options) => {
                return !(obj.constructor === Object && Object.keys(obj).length == 0)
            }
        }

    })
);

// create mysql sessions
var mysqlSessionStore = new mysqlSession({
    /* leaving empty to use default options */
    },
    require('./config/database')
);
app.use(sessions({
    key: "csid",
    secret: "csc317 secret",
    store: mysqlSessionStore,
    resave: false,
    saveUninitialized: false
}))

app.use(flash());
app.set("view engine", "hbs");
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));

// on every request, print out url that is going to come
app.use((req, res, next) => {
    requestPrint(req.url);
    next();
}); // call next so it doesn't time out

// keeping track of user being logged in
app.use((req, res, next) => {
    //console.log(req.session); // print session details to console
    if(req.session.username) {
        res.locals.logged = true;
    }
    next();
})


app.use('/', indexRouter);
app.use('/dbtest', dbRouter); // only urls with dbtest will go through here 
// localhost:3000/users
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

// error middleware
app.use((err, req, res, next) => {
    //res.status(500);
    //res.send('something went wrong with your stuff :(');
    errorPrint(err);
    res.render('error', {err_message: err});
})
module.exports = app;

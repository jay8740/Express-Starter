var express = require("express");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var flash = require("connect-flash");
var passport = require("passport");

// initialize passport config;
require('./config/passport');


// database connection
var db = require("./db/connect");

const app = express();

app.use(session({
    secret: "47hr3v7hk3i",
    saveUninitialized: true,
    resave: true

}))
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser("8r5f8s9&dsj"));
app.use(flash());

// set up view engine.
app.set("view engine", "ejs");
app.use(express.static('public'))

// middleware update flashMessage var in view to req.flash().
app.use('/', (req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
})

// import routers
var homeRouter = require('./routers/index');
var authRouter = require('./routers/auth');
// routing.
app.get('/', homeRouter);
app.get('/auth', authRouter);


app.listen(3000, (err) => {
    if (err) throw err;
    else console.log("Listening on Port 3000");
});


// should be used only once.
function uniqueStringGenerator(length) {
    return Math.random().toString(36).substr(13 - length);
}
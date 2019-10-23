var express = require("express");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var flash = require("connect-flash");




// import routers
var homeRouter = require('./routers/index');

const app = express();

app.use(session({
    secret: "47hr3v7hk3i",
    saveUninitialized: true,
    resave: true

}))
app.use(cookieParser("8r5f8s9&dsj"));
app.use(flash());

// set up view engine.
app.set("view engine", "ejs");

// middleware update flashMessage var in view to req.flash().
app.use('/', (req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
})
// routing.
app.get('/', homeRouter);


app.listen(3000, (err) => {
    if(err) throw err;
    else console.log("Listening on Port 3000");
});
a

// should be used only once.
function uniqueStringGenerator(length) {
    return Math.random().toString(36).substr(13-length);
}
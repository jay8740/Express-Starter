var express = require("express");
var app = express();


// import routers
var homeRouter = require('./routers/index');


app.get('/', homeRouter);


app.listen(3000, (err) => {
    if(err) throw err;
    else console.log("Listening on Port 3000");
});
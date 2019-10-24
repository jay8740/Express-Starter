var mongoose = require("mongoose");

var mongodb = "mongodb://127.0.0.1:27017/starte";

mongoose.connect(mongodb, { useNewUrlParser: true });

var db = mongoose.connection;

db.on('connected', () => {
    console.log("Connected to MongoDB succesfully!");
})

db.on('error', (err) => {
    console.error("MongoDB connection error");
    console.error(err);
})

module.exports = db;
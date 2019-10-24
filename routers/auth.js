var express = require("express");
var router = express.Router();
var passport = require("passport");

router.get('/google',
    passport.authenticate('google', {scope: ["email", "profile"],
        failureRedirect: '/',
        successRedirect: '/auth/google/callback'
})
);

router.get('/google/callback', (req, res) => {
    res.render('');
})

module.exports = router;
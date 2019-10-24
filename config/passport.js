var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var GoogleStrategy = require("passport-google-oauth");

var User = require("../models/user");
var configAuth = require('./auth');

module.exports = (passport) => {
    // Serializer
    passport.serializeUser((user, done) => {
        done(null, user.id);
    })

    //Deseializer
    passport.deserializeUser((id, done) => {
        User.findOne(id, (err, user) => {
            done(err, user);
        })
    })

    // ===================================
    // GOOGLE ============================
    // ===================================
    passport.use(new GoogleStrategy({
        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL
    },
        (token, refreshToken, profile, done) => {

            nextTick(() => {
                // find user by his/her google id, if user does not exist create one.
                User.findOne({ 'google.id': profile.id }, (err, user) => {
                    if (err) {
                        return done(err, null);
                    }

                    if (user) {
                        return done(null, user);
                    }

                    // create new user.
                    var newUser = new User();
                    newUser.google.id = profile.id;
                    newUser.google.id = profile.id;
                    newUser.google.token = token;
                    newUser.google.name = profile.displayName;
                    newUser.google.email = profile.emails[0].value;

                    //save user
                    newUser.save((err) => {
                        if (err) throw err;
                        done(null, newUser);
                    })
                })
            })
        }))
}
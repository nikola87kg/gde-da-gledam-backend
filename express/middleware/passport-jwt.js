const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const UserModel = require("../models/userModel");
const env = require('dotenv').config().parsed;

module.exports = function() {

    /* Configure passport options */
    var options = {}
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    const secret =  JSON.stringify(env.JWT_SECRET);
    options.secretOrKey = secret;

    /* Use JWT strategy */
    passport.use(new JwtStrategy(options, function(jwt_payload, done) {
        UserModel.findOne({_id: jwt_payload.userId}, function(err, user) {
            if (err) { return done(err, false);}
            if (user) { return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));

}

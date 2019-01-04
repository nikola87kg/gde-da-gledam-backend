const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const UserModel = require("../models/userModel");
const env = require('dotenv').config().parsed;

module.exports = function() {

    /* Configure passport options */
    var options = {}
    options.clientID = JSON.stringify(env.FACEBOOK_ID);
    options.clientSecret = JSON.stringify(env.FACEBOOK_SECRET);
    options.profileFields = ['email', 'displayName', 'photos'];
    options.callbackURL = 'http://localhost:3000/auth/facebook/callback';
    options.passReqToCallback = true;

    /* Use JWT strategy */
    passport.use(new FacebookStrategy(options, function(req, token, refreshToken, profile, done) {
        console.log('profile --------->', profile);
        UserModel.findOne({email: profile.id}, function(err, user) {
            if (err) { return done(err);}
            if (user) { return done(null, user);
            } else {
                const newUser = new UserModel();
                newUser.facebook = profile.id;
                newUser.fullname = profile.displayName;
                newUser.email = profile._json.email;
                newUser.userImage = 'https://graph.facebook.com/' + profile.id + '/picture?type=large'
                newUser.fbTokens.push({token: token});
                newUser.save( (err) => {
                    return done(null, user)
                } )
            }
        });
    }));

}

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

// Google Strategy Configuration
passport.use(new GoogleStrategy({
    clientID: "27808634132-6qqo8et73rffdennog8oel7vigm7cbp6.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:805/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
            user = new User({
                username: profile.displayName,
                email: profile.emails[0].value,
                password: "google-login",
                profilePic: profile.photos[0].value
            });
            await user.save();
        }
        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));

module.exports = passport;

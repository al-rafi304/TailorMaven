// authController.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

require('dotenv').config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback",
  passReqToCallback: true,
},
// Login / Register
function(request, accessToken, refreshToken, profile, done) {
    // Create or Finding User from database
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //     return cb(err, user);
    return done(null, profile);
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

// Logout
const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).send('Error during logout');
        }
        
        req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error destroying session');
        }
        
        res.send('Goodbye!');
        });
    });
};

module.exports = {
    authenticateGoogle: passport.authenticate('google', { scope: ['email', 'profile'] }),
    googleCallback: passport.authenticate('google', {
        successRedirect: '/success',
        failureRedirect: '/auth/google/failure'
    }),
    failure: (req, res) => res.send('Failed to authenticate..'),
    logout,
};

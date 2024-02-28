// authController.js
const User = require('../models/User')

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

require('dotenv').config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `http://localhost:${process.env.PORT}/auth/google/callback`,
  passReqToCallback: true,
  scope: ['openid', 'profile', 'email', 'https://www.googleapis.com/auth/user.gender.read', 'https://www.googleapis.com/auth/user.birthday.read'],
},
// Login / Register
async function(request, accessToken, refreshToken, profile, done) {
    // Create or Finding User from database
    

    // Retrieving DOB and Gender from People API
    // ** People API needs to be enabled in google developers console **
    const profileResponse = await fetch(`https://people.googleapis.com/v1/people/${profile.id}?personFields=birthdays,genders&access_token=${accessToken}`);
    const jsonResponse = await profileResponse.json();
    
    console.log(`https://people.googleapis.com/v1/people/${profile.id}?personFields=birthdays,genders&access_token=${accessToken}`)

    const birthday = jsonResponse.birthdays?.[0];
    const { year, month, day } = birthday?.date || {};

    const gender = jsonResponse.genders?.[0].value || 'others';                     // If genders object is not found then it defaults to 'others'
    
    dob = new Date(year ? year : 9999, month ? month-1 : 0, day ? day+1 : 1)        // If birthday object not found then it defaults to 9999-12-31

    User.findOrCreate({
        googleId: profile.id,
        username: profile.given_name,
        name: profile.displayName,
        email: profile.email,
        gender: gender,
        dob:dob
    }, function (err, user) {
        console.log(user)
        return done(err, user);
    })
    // return done(null, profile);
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
    authenticateGoogle: passport.authenticate('google'),
    googleCallback: passport.authenticate('google', {
        successRedirect: '/success',
        failureRedirect: '/auth/google/failure'
    }),
    failure: (req, res) => res.send('Failed to authenticate..'),
    logout,
};

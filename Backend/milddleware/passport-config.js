require('dotenv').config();
const session = require('express-session');
const jwt = require('jsonwebtoken')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../models/User')

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
async function(request, accessToken, refreshToken, params, profile, done) {
    // After successful authentication

    // Retrieving DOB and Gender from People **API People API needs to be enabled in google developers console **
    const profileResponse = await fetch(`https://people.googleapis.com/v1/people/${profile.id}?personFields=birthdays,genders&access_token=${accessToken}`);
    const jsonResponse = await profileResponse.json();

    const birthday = jsonResponse.birthdays?.[0];
    const { year, month, day } = birthday?.date || {};

    const gender = jsonResponse.genders?.[0].value || 'others';                     // If genders object is not found then it defaults to 'others'
    
    const dob = new Date(year ? year : 9999, month ? month-1 : 0, day ? day+1 : 1)        // If birthday object not found then it defaults to 9999-12-31
    const username = profile.email.split('@')[0]


    const user = await User.findOne({username: username})

    // Register user if user doesn't exists
    if (!user){
        const user = await User.create({
            username: username,
            googleId: profile.id,
            name: profile.displayName,
            email: profile.email,
            gender: gender,
            dob:dob
        })
    }

    // Checks if user created through username/password already exists
    if(user.password){
        return res.status(401).json({ msg: "Account created through Username/password already exists" })
    }

    // Log in user by passing token
    // Creating Json Web Token
    const token = jwt.sign({userID: user._id, accessToken: accessToken}, process.env.JWT_SECRET, {expiresIn: params.expires_in})
    console.log(user)

    return done(null, user, token);
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

module.exports = {
    sessionMiddleware: session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }),
    passportInitialize: passport.initialize(),
    passportSession: passport.session(),
  };
  
require('dotenv').config();
const session = require('express-session');
const jwt = require('jsonwebtoken')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const User = require('../models/User')

// function isLoggedIn(req, res, next) {
//   req.user ? next() : res.sendStatus(401);
// }

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
    
    // After successful authentication

    // Retrieving DOB and Gender from People API
    // ** People API needs to be enabled in google developers console **
    const profileResponse = await fetch(`https://people.googleapis.com/v1/people/${profile.id}?personFields=birthdays,genders&access_token=${accessToken}`);
    const jsonResponse = await profileResponse.json();
    
    // console.log(`https://people.googleapis.com/v1/people/${profile.id}?personFields=birthdays,genders&access_token=${accessToken}`)

    const birthday = jsonResponse.birthdays?.[0];
    const { year, month, day } = birthday?.date || {};

    const gender = jsonResponse.genders?.[0].value || 'others';                     // If genders object is not found then it defaults to 'others'
    
    const dob = new Date(year ? year : 9999, month ? month-1 : 0, day ? day+1 : 1)        // If birthday object not found then it defaults to 9999-12-31
    const username = profile.email.split('@')[0]

    // Finding existing user to log in or createing new user
    User.findOrCreate({
        googleId: profile.id,
        username: username,
        name: profile.displayName,
        email: profile.email,
        gender: gender,
        dob:dob
    }, function (err, user) {
        console.log(user)

        // Creating Json Web Token
        const token = jwt.sign({userID: user._id, accessToken: accessToken}, process.env.JWT_SECRET, {expiresIn: '30d'})

        return done(err, user, token);
    })
    // return done(null, profile);
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

const isAuthenticated = (req, res, next) => {
    // Check if the Authorization header is present
    const authTokenHeader = req.headers.authorization;
  
    if (!authTokenHeader) {
      return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }
  
    // Formate of authTokenHeader: Bearer <token>
    const [bearer, authToken] = authTokenHeader.split(' ');
  
    if (bearer !== 'Bearer' || !authToken) {
      // If the token format is incorrect, return an error response
      return res.status(401).json({ error: 'Unauthorized - Invalid token format' });
    }
  
    // Decoding Json Web Token to extract userID and accessToken then passing those through request
    try{
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET)
        req.userID = decoded.userID
        req.accessToken = decoded.accessToken
    } catch (err){
        return res.status(401).json({ msg: "Couldn't verify JWT Token!", error: err });
    }
  
    next();
  };

// Used to check if logged in user is accessing own info or not
const authorizeUser =  (req, res, next) => {
    const {id:userID} = req.params

    if (userID != req.userID){
        return res.status(401).json({ msg: "Not Authorized" })
    }

    next()
}

module.exports = {
  sessionMiddleware: session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }),
  passportInitialize: passport.initialize(),
  passportSession: passport.session(),
//   isLoggedIn,
  isAuthenticated,
  authorizeUser
};

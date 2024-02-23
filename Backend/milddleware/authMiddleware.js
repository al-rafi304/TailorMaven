require('dotenv').config();
const session = require('express-session');
const passport = require('passport');

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

module.exports = {
  sessionMiddleware: session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }),
  passportInitialize: passport.initialize(),
  passportSession: passport.session(),
  isLoggedIn,
};

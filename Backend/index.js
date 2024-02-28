require('dotenv').config();
require('express-async-errors');
const session = require('express-session');
const passport = require('passport');

const express = require('express');
const app = express();
const routes = require('./routes/router')
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./milddleware/authMiddleware');
const connectDB = require('./db/connect')             // Database Connection

const port = process.env.PORT || 3000;

app.use(express.json())

app.use(authMiddleware.sessionMiddleware);
app.use(authMiddleware.passportInitialize);
app.use(authMiddleware.passportSession);

app.use('/api/v1/test', routes) 
app.use('/auth', authRoutes);

// Demo authentication success page
app.get('/success', authMiddleware.isLoggedIn, (req, res) => {
    res.send(`Hello ${req.user.name}`);
  });


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server running on http://localhost:${process.env.PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()

require('dotenv').config();

const express = require('express');
const app = express();
const routes = require('./routes/router')
const connectDB = require('./db/connect')             // Database Connection

const port = process.env.PORT || 3000;

app.use(express.json())

app.get('/', (request, response) => {
    response.send('Welcome !')
})

app.use('/api/v1/test', routes)         // Base route

const start = async () => {
    try {
        // await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log('Server running on http://localhost:3000'))
    } catch (error) {
        console.log(error)
    }
}

start()

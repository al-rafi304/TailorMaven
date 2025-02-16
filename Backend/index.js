require('dotenv').config();
require('express-async-errors');
const cors = require('cors')
const http = require('http')
const socketio = require('socket.io')

const express = require('express');
const app = express();

const allowedOrigins = [
    "https://tailor-maven-app.vercel.app",
    "https://tailor-maven-app.vercel.app/",
    ];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            console.log(origin)
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow cookies if needed
};

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/UserRouter')
const fabricRoutes = require('./routes/FabricRouter')
const suitRoutes = require('./routes/SuitRouter')
const chatRoutes = require('./routes/ChatRouter')
const cartRoutes = require('./routes/CartRoutes')
const orderRoutes = require('./routes/OrderRoutes')

const passportMiddleware = require('./configs/passport-config')

const chatController = require('./controllers/ChatController')

const connectDB = require('./db/connect')             // Database Connection

const port = process.env.PORT || 3000;

app.use(express.json())
app.use(cors(corsOptions));

app.use(passportMiddleware.sessionMiddleware);
app.use(passportMiddleware.passportInitialize);
app.use(passportMiddleware.passportSession);

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/fabric', fabricRoutes)
app.use('/api/v1/suit', suitRoutes)
app.use('/api/v1/cart', cartRoutes)
app.use('/api/v1/order', orderRoutes)
app.use('/api/v1/conversation', chatRoutes)
app.use('/auth', authRoutes);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        var server

        if(process.env.SERVER_ENV === "production"){
            server = http.createServer(app)
        } else {

            server = app.listen(port, console.log(`Server running in Development\nhttp://localhost:${process.env.PORT}`))
        }


        // Socket.io Server
        // const io = socketio(server, {
        //     cors: {
        //       origin: allowedOrigins
        //     }
        // })
        const io = socketio(server, {
            cors: corsOptions
        })

        io.on("connection", (socket) => {
            console.log(`New Socket.io Connection: ${socket.id}`)

            chatController.eventHandler(io, socket)

        })
    } catch (error) {
        console.log(error)
    }
}

start()

module.exports = app
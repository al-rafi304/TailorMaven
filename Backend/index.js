require('dotenv').config();
require('express-async-errors');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors')
const socketio = require('socket.io')

const express = require('express');
const app = express();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/UserRouter')
const fabricRoutes = require('./routes/FabricRouter')
const suitRoutes = require('./routes/SuitRouter')
const chatRoutes = require('./routes/ChatRouter')

const authMiddleware = require('./milddleware/authMiddleware');
const passportMiddleware = require('./milddleware/passport-config')

const chatController = require('./controllers/ChatController')

const connectDB = require('./db/connect')             // Database Connection

const port = process.env.PORT || 3000;

app.use(express.json())
// app.use(cors)

app.use(passportMiddleware.sessionMiddleware);
app.use(passportMiddleware.passportInitialize);
app.use(passportMiddleware.passportSession);

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/fabric', fabricRoutes)
app.use('/api/v1/suit', suitRoutes)
app.use('/api/v1/conversation', chatRoutes)
app.use('/auth', authRoutes);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        const server = app.listen(port, console.log(`Server running on http://localhost:${process.env.PORT}`))
        
        // Socket.io Server
        const io = socketio(server, {
            cors: {
              origin: "http://localhost:3000"
            }
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

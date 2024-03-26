const mongoose = require('mongoose')
const User = require('./User')

const MessageSchema = new mongoose.Schema({
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation'
    },
    fromUser: Boolean,
    message: String,
    timestamp: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Message", MessageSchema)
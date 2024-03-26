const mongoose = require('mongoose')
const User = require('./User')

const ConversationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model("Conversation", ConversationSchema)
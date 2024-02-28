// Database Schema
const mongoose = require('mongoose')
const findOrCreate = require('mongoose-findorcreate')


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'others']
    },
    dob: Date,
    googleId: String,
})

UserSchema.plugin(findOrCreate)

module.exports = mongoose.model('User', UserSchema)
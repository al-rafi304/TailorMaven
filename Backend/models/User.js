// Database Schema
const mongoose = require('mongoose')
const findOrCreate = require('mongoose-findorcreate')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
    isAdmin: {
        type: Boolean,
        default: false
    },
    dob: Date,
    googleId: String,
})

// Executes before saving
UserSchema.pre('save', async function () {
    if(!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

UserSchema.methods.createJWT = function () {
    return jwt.sign(
      { userID: this._id, username: this.username },
      process.env.JWT_SECRET,
      {
        expiresIn: parseInt(process.env.JWT_LIFETIME),
      }
    );
};
  
UserSchema.methods.comparePassword = async function (givenPassword) {
    const isMatch = await bcrypt.compare(givenPassword, this.password);
    return isMatch;
};

UserSchema.plugin(findOrCreate)

module.exports = mongoose.model('User', UserSchema)
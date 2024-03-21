const mongoose = require('mongoose')
const findOrCreate = require('mongoose-findorcreate')
const Fabric = require('./Fabric')
const User = require('./User')

const SuitSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['double_breast', 'single_breast', 'tuxedo'],
        default: 'single_breast',
        require: true
    },
    fabric: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fabric',
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    price: {
        type: Number,
        default: 999999
    },
    length: {
        type: Number,
        default: 28
    },
    waist: {
        type: Number,
        default: 32
    },
    chest: {
        type: Number,
        default: 40
    },
    arm_length: {
        type: Number,
        default: 24
    },
    button: {
        type: String
    },
})

SuitSchema.plugin(findOrCreate)

module.exports = mongoose.model('Suit', SuitSchema)
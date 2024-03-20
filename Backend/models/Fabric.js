const mongoose = require('mongoose')

const FabricSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    color: {
        type: String
    },
    price: {
        type: Number,
        require: true
    },
    stock: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("Fabric", FabricSchema)
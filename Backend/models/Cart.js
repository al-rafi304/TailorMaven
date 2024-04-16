const mongoose = require('mongoose')
const ProductTypes = require('../constants/ProductTypes')

const CartItemSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        refPath: 'productType'
    },
    productType: {
        type: String,
        require: true,
        enum: [ProductTypes.SUIT, ProductTypes.FABRIC],
        default: ProductTypes.SUIT
    },
    fabricLength: {
        type: Number
    },
    timestamp: {
        type: Date,
        default: Date.now(),
    }

})

module.exports = mongoose.model('CartItem', CartItemSchema)
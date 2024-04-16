const mongoose = require('mongoose')
const orderStatus = require('../constants/orderStatus')
const ProductTypes = require('../constants/ProductTypes')

const OrderItemSchema = new mongoose.Schema({
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
    paymentId: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    status: {
        type: String,
        enum: [orderStatus.PENDING, orderStatus.PROCESSING, orderStatus.SHIPPED, orderStatus.DELIVERED],
        default: orderStatus.PENDING
    },
    isGift: {
        type: Boolean,
        default: false
    },
    giftAddress: {
        type: String
    },
    giftPhone: {
        type: String
    },
    giftMessage: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now(),
    }
})

module.exports = mongoose.model('OrderItem', OrderItemSchema)
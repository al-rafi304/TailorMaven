const {ReasonPhrases, StatusCodes} = require('http-status-codes')
const CartItem = require('../models/Cart')
const User = require('../models/User')
const ProductTypes = require('../constants/ProductTypes')
const Suit = require('../models/Suit')
const Fabric = require('../models/Fabric')
const ObjectId = require('mongoose').Types.ObjectId


// Turns Referenced cart model to Embedded
const embeddedCart = async (cartItems) => {
    var newCartItems = []
    for(var item of cartItems){
        if(item.productType == ProductTypes.SUIT){
            const suit = await Suit.findById(item.product)
            var newItem = {...item.toObject()}
            newItem.product = suit
        } else if (item.productType == ProductTypes.FABRIC){
            const fabric = await Fabric.findById(item.product)
            var newItem = {...item.toObject()}
            newItem.product = fabric
        }
        newCartItems.push(newItem)
    }

    return newCartItems
}

const getAllCartItem = async (req, res) => {
    const cartItems = await CartItem.find({})

    if(!cartItems){
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "No cart items found!" })
    }
    
    var newCartItems = await embeddedCart(cartItems)

    res.status(StatusCodes.OK).json({ cartItems: newCartItems })
}

const getUserCart = async (req, res) => {
    const cartItems = await CartItem.find({user: req.params.id})

    if(!cartItems){
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "No cart items found!" })
    }
    
    var newCartItems = await embeddedCart(cartItems)

    res.status(StatusCodes.OK).json({ cartItems: newCartItems })
}

const addToCart = async (req, res) => {
    const user = await User.findById(req.userID)
    if (!user){
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "No User found for adding to cart!" })
    }

    const productType = req.body.product_type
    if(productType == ProductTypes.SUIT){
        const suit = await Suit.findById(req.body.product_id)
        if (!suit) {
            return res.status(StatusCodes.NOT_FOUND).json({ msg: "Suit not found, adding to cart failed" })  
        } 

        var cartItem = await CartItem.create({
            user: user,
            productType: ProductTypes.SUIT,
            product: suit
        })
    } else {
        const fabric = await Fabric.findById(req.body.product_id)
        if (!fabric){
            return res.status(StatusCodes.NOT_FOUND).json({ msg: "Fabric not found, adding to cart failed" })
        } 

        var cartItem = await CartItem.create({
            user: user,
            productType: ProductTypes.FABRIC,
            product: fabric,
            fabricLength: req.body.fabric_length
        })
    }

    if(!cartItem) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Error Creating Cart"})
    }

    res.status(StatusCodes.OK).json({cartItem})
}

const deleteCartItem = async (req, res) => {
    const cartItem = await CartItem.findByIdAndDelete(req.params.item_id)
    console.log(req.params.item_id)
    if (!cartItem) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "Cart Item not found!" })
    }

    res.status(StatusCodes.OK).json({ cartItem })

}

module.exports = {
    getAllCartItem,
    getUserCart,
    addToCart,
    deleteCartItem
}
const {ReasonPhrases, StatusCodes} = require('http-status-codes')
const ProductTypes = require('../constants/ProductTypes')
const Stripe = require('../configs/stripe-config')
const OrderItem = require('../models/Order')
const CartItem = require('../models/Cart')
const Fabric = require('../models/Fabric')
const Suit = require('../models/Suit')
const { session } = require('passport')
const User = require('../models/User')

const embeddedOrder = async (orders) => {
    var newOrder = []
    for(var item of orders){
        if(item.productType == ProductTypes.SUIT){
            const suit = await Suit.findById(item.product)
            var newItem = {...item.toObject()}
            newItem.product = suit
        } else if (item.productType == ProductTypes.FABRIC){
            const fabric = await Fabric.findById(item.product)
            var newItem = {...item.toObject()}
            newItem.product = fabric
        }
        newOrder.push(newItem)
    }

    return newOrder
}

// Sends payment gatway url
const checkout = async (req, res) => {

    var products = []
    const cartItems = await CartItem.find({user: req.userID})

    // Creating product structure for Stripe (line_items)
    for (var item of cartItems){
        var product = {
            quantity: 1,
            price_data: {
                currency: 'usd',
                unit_amount: null,
                product_data: {
                    name: null,
                    description: null
                }
            },
        }
        if (item.productType == ProductTypes.FABRIC){
            var fabric = await Fabric.findById(item.product)
            product.price_data.product_data.name = `${fabric.name} ${fabric.color}`
            product.price_data.unit_amount = fabric.price * 100
            product.price_data.product_data.description = ProductTypes.FABRIC
            product.price_data.product_data.id = fabric._id
        } else if (item.productType == ProductTypes.SUIT){
            var suit = await Suit.findById(item.product)
            product.price_data.product_data.name = suit.type
            product.price_data.unit_amount = suit.price 
            product.price_data.product_data.description = ProductTypes.SUIT
            product.price_data.product_data.id = suit._id
        }
        products.push(product)
    }


    const session = await Stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ["card"],
        line_items: products,
        // success_url: `http://localhost:5000/api/v1/order/checkout-success?session_id={CHECKOUT_SESSION_ID}&user_id=${req.userID}`,
        success_url: `http://localhost:3000/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: 'http://localhost:3000/'

    })

    res.status(StatusCodes.OK).json({ url: session.url })
}

// Creates order after checkout success
const createOrder = async (req, res) => {
    const session_id = req.body.session_id
    const userID = req.userID
    
    const session = await Stripe.checkout.sessions.retrieve(session_id)
    const cartItems = await CartItem.find({user: userID})

    // Validating Session
    if (!session_id){
        res.status(StatusCodes.BAD_REQUEST).json({msg: 'No stripe session id provided'})
    }
    if (session.payment_status != 'paid'){
        res.status(StatusCodes.FORBIDDEN).json({msg: 'Not paid yet!!'})
    }

    // Validating user Cart
    if (!cartItems){
        res.status(StatusCodes.NOT_FOUND).json({ msg: 'Cart not found with user id: ', userID })
    }

    var orders = []

    // Creating Orders for each cart items
    for(var item of cartItems){
        if (item.productType == ProductTypes.FABRIC){
            var fabric = await Fabric.findById(item.product)
            var order = await OrderItem.create({
                user: item.user,
                productType: item.productType,
                product: item.product,
                fabricLength: item.fabricLength,
                paymentId: session?.payment_intent,
                price: fabric.price,
            })
        } else if (item.productType == ProductTypes.SUIT){
            var suit = await Suit.findById(item.product)
            var order = await OrderItem.create({
                user: item.user,
                productType: item.productType,
                product: item.product,
                paymentId: session?.payment_intent,
                price: suit.price,
            })
        }

        orders.push(order)
    }

    // Emptying Cart
    await CartItem.deleteMany({user: userID})

    res.send(orders)
}

const giftOrder = async (req, res) => {
    
    const checkOrder = await OrderItem.findById(req.params.order_id)
    if(!checkOrder){
        res.status(StatusCodes.NOT_FOUND).json({msg: "no order found"})
    }
    if(checkOrder.user != req.userID){
        res.status(StatusCodes.UNAUTHORIZED).json({msg: "Not authorized!"})
    }

    const order = await OrderItem.findByIdAndUpdate(
        req.params.order_id,
        {
            isGift: true,
            giftPhone: req.body.phone,
            giftAddress: req.body.address,
            giftMessage: req.body.message
        },
        {new:true, runValidators:true}
    )

    res.status(StatusCodes.OK).json({order})
}

const getAllOrder = async (req, res) => {
    const orders = await OrderItem.find({})

    if(!orders){
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "No orders found!" })
    }

    var newOrders = await embeddedOrder(orders)
    res.status(StatusCodes.OK).json({ orders: newOrders })
}

const getUserOrder = async (req, res) => {
    const orders = await OrderItem.find({user: req.params.id})
    
    if(!orders){
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "No orders found!" })
    }

    var newOrders = await embeddedOrder(orders)
    res.status(StatusCodes.OK).json({ orders: newOrders })
}


module.exports = {
    checkout,
    createOrder,
    getAllOrder,
    getUserOrder,
    giftOrder
}
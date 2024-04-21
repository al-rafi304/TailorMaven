const {ReasonPhrases, StatusCodes} = require('http-status-codes')
const ProductTypes = require('../constants/ProductTypes')
const Stripe = require('../configs/stripe-config')
const OrderItem = require('../models/Order')
const CartItem = require('../models/Cart')
const Fabric = require('../models/Fabric')
const Suit = require('../models/Suit')
const { session } = require('passport')
const User = require('../models/User')

// Sends payment gatway url
const checkout = async (req, res) => {

    const isGift = req.query.isGift
    console.log(isGift)
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
            product.price_data.unit_amount = suit.price * 100
            product.price_data.product_data.description = ProductTypes.SUIT
            product.price_data.product_data.id = suit._id
        }
        products.push(product)
    }


    const session = await Stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ["card"],
        line_items: products,
        shipping_address_collection: {allowed_countries: ['BD']},
        // success_url: `http://localhost:5000/api/v1/order/checkout-success?session_id={CHECKOUT_SESSION_ID}&user_id=${req.userID}`,
        success_url: `http://localhost:3000/checkout-success?session_id={CHECKOUT_SESSION_ID}&isGift=${isGift}`,
        cancel_url: 'http://localhost:3000/'

    })

    res.status(StatusCodes.OK).json({ url: session.url })
}

// Creates order after checkout success
const createOrder = async (req, res) => {
    const session_id = req.body.session_id
    const userID = req.userID
    const session = await Stripe.checkout.sessions.retrieve(session_id)
    const address = session.shipping_details?.address
    const cartItems = await CartItem.find({user: userID})
    const isGift = req.body.isGift
    console.log(session)
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
                address: address ? `${address.line1}, ${address.line2}, ${address.city} - ${address.postal_code}, ${address.country}` : '',
                phone: item.user.phone ? item.user.phone : '',
                isGift: isGift
            })
        } else if (item.productType == ProductTypes.SUIT){
            var suit = await Suit.findById(item.product)
            var order = await OrderItem.create({
                user: item.user,
                productType: item.productType,
                product: item.product,
                paymentId: session?.payment_intent,
                price: suit.price,
                address: address ? `${address.line1}, ${address.line2}, ${address.city} - ${address.postal_code}, ${address.country}` : '',
                phone: item.user.phone ? item.user.phone : '',
                isGift: isGift
            })
        }
        (await order.populate('product')).populate('user')
        orders.push(order)
    }

    // Emptying Cart
    await CartItem.deleteMany({user: userID})

    res.json({orders})
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
            phone: req.body.phone,
            address: req.body.address,
            message: req.body.message
        },
        {new:true, runValidators:true}
    )

    res.status(StatusCodes.OK).json({order})
}

const getAllOrder = async (req, res) => {
    const orders = await OrderItem.find({}).populate('product')

    if(!orders){
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "No orders found!" })
    }

    for(var order of orders){
        if(order.productType == ProductTypes.SUIT) await order.product.populate('fabric')
    }

    res.status(StatusCodes.OK).json({ orders })
}

const getUserOrder = async (req, res) => {
    const orders = await OrderItem.find({user: req.params.id}).populate('product')
    
    if(!orders){
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "No orders found!" })
    }

    for(var order of orders){
        if(order.productType == ProductTypes.SUIT) await order.product.populate('fabric')
    }

    res.status(StatusCodes.OK).json({ orders })
}


module.exports = {
    checkout,
    createOrder,
    getAllOrder,
    getUserOrder,
    giftOrder
}
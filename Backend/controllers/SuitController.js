const {ReasonPhrases, StatusCodes} = require('http-status-codes')

const Fabric = require('../models/Fabric')
const Suit = require('../models/Suit')
const User = require('../models/User')

// Turns Referenced Suit model to Embedded
const embeddedSuit = async (suits) => {
    var newSuits = []
    for(var suit of suits){
        const fabric = await Fabric.findById(suit.fabric)
        var newSuit = {...suit.toObject()}
        newSuit.fabric = fabric
        newSuits.push(newSuit)
    }

    return newSuits

}

const getAllSuit = async (req, res) => {
    const suits = await Suit.find({})

    var newSuits = await embeddedSuit(suits)
    res.status(StatusCodes.OK).json({ suits: newSuits })
}

const getSuit = async (req, res) => {
    const {id:suit_id} = req.params
    const suit = await Suit.find({_id: suit_id})

    if(!suit){
        return res.status(StatusCodes.NOT_FOUND).json({ msg: `No suit found with id: ${suit_id}`})
    }

    var newSuits = await embeddedSuit(suit)
    res.status(StatusCodes.OK).json({ suits: newSuits })
}

const calculatePrice = () => {

    // Calculate price

    return 999999
}

const createSuit = async (req, res) => {
    const fabric_id = req.body.fabric

    const fabric = await Fabric.findOne({_id: fabric_id})
    const user = await User.findOne({_id: req.userID})

    if (!user){
        return res.status(StatusCodes.NOT_FOUND).json({ msg: `Invalid user id: ${fabric_id}`})
    }

    if (!fabric){
        return res.status(StatusCodes.NOT_FOUND).json({ msg: `No fabric found with id: ${fabric_id}`})
    }

    const suit = await Suit.create({
        type: req.body.type,
        fabric: fabric,
        user: user,
        price: calculatePrice(),
        length: req.body.length,
        waist: req.body.waist,
        chest: req.body.chest,
        arm_length: req.body.arm_length,
        button: req.body.button
    })

    res.status(StatusCodes.OK).json(suit)
}
const updateSuit = async (req, res) => {
    const {id:suit_id} = req.params

    // Checking user permission
    const user = await User.findOne({_id: req.userID})
    const check_suit = await Suit.findOne({_id: suit_id})
    if(check_suit.user != user && !user.isAdmin){
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Not Authorized" })
    }

    var newInfo = {
        type: req.body.type,
        length: req.body.length,
        waist: req.body.waist,
        chest: req.body.chest,
        arm_length: req.body.arm_length,
        button: req.body.button
    }

    if (req.body.fabric){
        const fabric_id = req.body.fabric
        const fabric = await Fabric.findOne({_id: fabric_id})

        if (!fabric){
            return res.status(StatusCodes.NOT_FOUND).json({ msg: `No fabric found with id: ${fabric_id}`})
        }

        newInfo["fabric"] = fabric
    }

    newInfo["price"] = calculatePrice()

    const suit = await Suit.findOneAndUpdate({_id: suit_id}, newInfo, {new:true, runValidators:true})

    if(!suit){
        return res.status(StatusCodes.NOT_FOUND).json({ msg: `No suit found with id: ${suit_id}`})
    }

    res.status(StatusCodes.CREATED).json({ suit })
}
const deleteSuit = async (req, res) => {
    const {id:suit_id} = req.params

    // Checking user permission
    const user = await User.findOne({_id: req.userID})
    const check_suit = await Suit.findOne({_id: suit_id})
    if(check_suit.user != user && !user.isAdmin){
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Not Authorized" })
    }

    const suit = await Suit.findOneAndDelete({_id: suit_id})

    if(!suit){
        return res.status(StatusCodes.NOT_FOUND).json({ msg: `No suit found with id: ${suit_id}`})
    }

    res.status(StatusCodes.OK).json({ suit })
}


module.exports = {
    getAllSuit,
    getSuit,
    createSuit,
    updateSuit,
    deleteSuit
}
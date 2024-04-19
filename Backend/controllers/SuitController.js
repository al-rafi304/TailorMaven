const {ReasonPhrases, StatusCodes} = require('http-status-codes')

const Fabric = require('../models/Fabric')
const Suit = require('../models/Suit')
const User = require('../models/User')
const {FabricTypePrice, SuitTypePrice} = require('../constants/PriceList')

const getAllSuit = async (req, res) => {
    const suits = await Suit.find({}).populate('fabric')

    res.status(StatusCodes.OK).json({ suits })
}

const getSuit = async (req, res) => {
    const {id:suit_id} = req.params
    const suit = await Suit.find({_id: suit_id}).populate('fabric')

    if(!suit){
        return res.status(StatusCodes.NOT_FOUND).json({ msg: `No suit found with id: ${suit_id}`})
    }

    res.status(StatusCodes.OK).json({ suit })
}

const calculatePrice = (suitType, fabricType) => {
    console.log(suitType, fabricType)
    var suitPrice = SuitTypePrice[suitType]
    var fabricPrice = FabricTypePrice[fabricType]

    if (!suitPrice) var price = 50 + fabricPrice
    else if (!fabricPrice) var price = suitPrice + 60
    // var price = Number(SuitTypePrice[suitType]) + Number(FabricTypePrice[fabricType])
    return price
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
        price: String(calculatePrice(req.body.type, fabric.name)),
        length: req.body.length,
        waist: req.body.waist,
        chest: req.body.chest,
        arm_length: req.body.arm_length,
        button: req.body.button,
        image: req.file?.path
    })

    res.status(StatusCodes.OK).json(suit)
}

const getPrice = async (req, res) => {

    const suitType = req.body.suit_type
    const fabricType = req.body.fabric_type
    
    res.status(StatusCodes.OK).json({ price: calculatePrice(suitType, fabricType) })
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
    deleteSuit,
    getPrice
}
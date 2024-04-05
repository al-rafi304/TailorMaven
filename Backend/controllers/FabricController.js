const {ReasonPhrases, StatusCodes} = require('http-status-codes')

const Fabric = require('../models/Fabric')
const Suit = require('../models/Suit')


const getAllFabric = async (req, res) => {
    const fabrics = await Fabric.find({})
    res.status(StatusCodes.OK).json({ fabrics })
}

const getFabric = async (req, res) => {
    const {id:fabric_id} = req.params
    const fabric = await Fabric.findOne({_id: fabric_id})

    if (!fabric){
        return res.status(StatusCodes.NOT_FOUND).json({ msg: `No fabric found with id: ${fabric_id}`})
    }

    res.status(StatusCodes.OK).json({ fabric })
}

const createFabric = async (req, res) => {
    const fabric = await Fabric.create({
        name: req.body.name,
        color: req.body.color,
        price: req.body.price,
        stock: req.body.stock,
        image: req.file?.path
    })

    res.json({ fabric })
}

const updateFabric = async (req, res) => {
    const {id:fabric_id} = req.params
    const newInfo = {
        name: req.body.name,
        color: req.body.color,
        price: req.body.price,
        stock: req.body.stock
    }

    const fabric = await Fabric.findOneAndUpdate({_id: fabric_id}, newInfo, {new:true, runValidators:true})

    if (!fabric){
        return res.status(StatusCodes.NOT_FOUND).json({ msg: `No fabric found with id: ${fabric_id}`})
    }

    res.status(StatusCodes.OK).json({ fabric })
}

const deleteFabric = async (req, res) => {
    const {id:fabric_id} = req.params
    const fabric = await Fabric.findOneAndDelete({_id: fabric_id})

    if (!fabric){
        return res.status(StatusCodes.NOT_FOUND).json({ msg: `No fabric found with id: ${fabric_id}`})
    }

    res.status(StatusCodes.OK).json({ fabric })
}

module.exports = {
    getAllFabric,
    getFabric,
    createFabric,
    updateFabric,
    deleteFabric,
}
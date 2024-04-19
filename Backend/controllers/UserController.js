const User = require('../models/User')
const {ReasonPhrases, StatusCodes} = require('http-status-codes')

const getUser = async (req, res) => {

    const {id:userID} = req.params
    const user = await User.findOne( {_id: userID} )

    if (!user){
        return res.status(StatusCodes.NOT_FOUND).json( {msg: `No user found with id: ${userID}`} )
    }

    res.status(StatusCodes.OK).json({ user })
}

const updateUser = async (req, res) => {
    const {id:userID} = req.params
    const newInfo = {
        username: req.body?.username,
        name: req.body?.name,
        gender: req.body?.gender,
        dob: req.body?.dob
    }

    const user = await User.findOneAndUpdate({_id: userID}, newInfo, {new:true, runValidators:true})

    if (!user){
        return res.status(StatusCodes.NOT_FOUND).json( {msg: `No user found with id: ${userID}`} )
    }

    res.status(StatusCodes.OK).json({ user })
}

const updateAdmin = async (req, res) => {
    var user = await User.findById(req.params.id)

    console.log(req.body)

    if (!user){
        return res.status(StatusCodes.NOT_FOUND).json( {msg: `No user found with id: ${req.params.id}`} )
    }
    await user.updateOne({
        isAdmin: req.body.is_admin
    }, {new:true, runValidators:true})

    res.status(StatusCodes.OK).json({ msg: "OK" })
}

const deleteUser = async (req, res) => {
    const {id:userID} = req.params
    const user = await User.deleteOne({ _id: userID })

    if (user.deletedCount <= 0){
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "No user found!" })
    }

    res.status(StatusCodes.OK).json({ msg: "User deleted successfully", user: user })
}

const getAllUsers = async (req,res) => {
    const users = await User.find({})

    res.status(StatusCodes.OK).json({ users })
}

module.exports = {
    getUser,
    updateUser,
    getAllUsers,
    deleteUser,
    updateAdmin
}
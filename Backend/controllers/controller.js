const User = require('../models/User')

const test = (request, response) => {
    console.log(request.userID)
    response.status(200).json({msg: "You have been authorized!"})
}


const getUser = async (req, res) => {

    const {id:userID} = req.params
    const user = await User.findOne( {_id: userID} )

    console.log( user )

    if (!user){
        return res.status(404).json( {msg: `No user found with id: ${userID}`} )
    }

    res.status(200).json({ user })
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
        return res.status(404).json( {msg: `No user found with id: ${userID}`} )
    }

    res.status(200).json({ user })
}

const deleteUser = async (req, res) => {
    const {id:userID} = req.params
    const user = await User.findOneAndDelete({_id:userID})

    if (!user){
        return res.status(404).json({ msg: "No user found!" })
    }

    res.status(200).json({ msg: "User deleted successfully", user: user })
}

const getAllUsers = async (req,res) => {
    const users = await User.find({})

    res.status(200).json({ users })
}

module.exports = {
    getUser,
    updateUser,
    getAllUsers,
    deleteUser,
    test,
}
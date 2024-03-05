const User = require('../models/User')


const helloWorld = (request, response) => {
    response.status(200).json({ msg: "Hello World !" })
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

const getAllUsers = async (req,res) => {
    const users = await User.find({})

    res.status(200).json({ users })
}

module.exports = {
    helloWorld,
    getUser,
    updateUser,
    getAllUsers
}
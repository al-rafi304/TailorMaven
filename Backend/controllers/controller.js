const User = require('../models/User')


const googleCallback = (request, response) => {
    console.log(response)
    console.log(request.user.username)
    response.header('Authorization', `Bearer ${request.authInfo}`).status(200).json({ userID: request.user._id})
}

const test = (request, response) => {
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

const getAllUsers = async (req,res) => {
    const users = await User.find({})

    res.status(200).json({ users })
}

module.exports = {
    googleCallback,
    getUser,
    updateUser,
    getAllUsers,
    test
}
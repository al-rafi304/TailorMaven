const {ReasonPhrases, StatusCodes} = require('http-status-codes')

const User = require('../models/User')
const jwt = require('jsonwebtoken')

const googleCallback = (request, response) => {
    response.redirect(`http://localhost:3000/?token=${request.authInfo}&userID=${request.user._id}`)
}

const register = async (req, res) => {
    const {username, password} = req.body

    if (!username || !password){
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Username or Password not provided!" })
    }
    
    if( await User.findOne({username: username})){
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "User already exists!" })
    }

    // const user = await User.create({ ...req.body })       // Stores the hashed password in DB (code in User model)
    const user = await User.create({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
        image: req.file?.path,
        dob: req.dob
    })
    const token = user.createJWT()

    console.log(`Registered User: ${user._id}`)
    res.header('Authorization', `Bearer ${token}`).status(StatusCodes.CREATED).json( {userID: user._id} )
}

const login = async (req, res) => {
    const {username, password} = req.body

    // Check username & password is provided in the request
    if (!username || !password){
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Username or Password not provided!" })
    }

    const user = await User.findOne({username: username})
    console.log(user)

    // Check if user exist with provied username
    if (!user){
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "No user found with provided username!" })
    }
    
    // Check if user created through google exists
    if (user.googleId){
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Account created through Google already exists" })
    }
    
    // Check password
    const validPassword = await user.comparePassword(password)
    if (!validPassword){
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Password missmatch!" })
    }
    
    const token = user.createJWT()
    
    res.header('Authorization', `Bearer ${token}`).status(StatusCodes.OK).json( {userID: user._id} )


}

const checkLogin = async (req, res) => {
    const authToken = req.params.token
    
    try{
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET)       // It verifies token with secret and also checks if token is expired or not
        return res.status(StatusCodes.OK).json({ valid: true, decoded: decoded })
    } catch (err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ valid: false, msg: "Couldn't verify JWT Token!", error: err });
    }
}

module.exports = {
    googleCallback,
    register,
    login,
    checkLogin,
    failure: (req, res) => res.send('Failed to authenticate..'),
};

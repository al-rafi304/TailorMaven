require('dotenv').config();
const {ReasonPhrases, StatusCodes} = require('http-status-codes')

const jwt = require('jsonwebtoken')
const User = require('../models/User')

const isAuthenticated = (req, res, next) => {
    const authTokenHeader = req.headers.authorization;
    
    // Check if the Authorization header is present
    if (!authTokenHeader) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Unauthorized - No token provided' });
    }
  
    // Formate of authTokenHeader: Bearer <token>
    const [bearer, authToken] = authTokenHeader.split(' ');
  
    // Check if the token format is incorrect
    if (bearer !== 'Bearer' || !authToken) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Unauthorized - Invalid token format' });
    }
  
    // Decoding Json Web Token to extract userID and accessToken then passing those through request
    try{
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET)       // It verifies token with secret and also checks if token is expired or not
        req.userID = decoded.userID
        req.accessToken = decoded.accessToken
    } catch (err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Couldn't verify JWT Token!", error: err });
    }
  
    next();
  };

// Used to check if logged in user is accessing own info or not
const userAccess = async (req, res, next) => {
    const {id:userID} = req.params
    const reqUser = await User.findOne({ _id: req.userID })

    if (userID != req.userID && reqUser.isAdmin == false){
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Not Authorized" })
    }

    next()
}

const adminOnlyAccess = async (req, res, next) => {
    const reqUser = await User.findOne({ _id: req.userID })

    if (reqUser.isAdmin == false){
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Not Authorized as Admin" })
    }

    next()
}

module.exports = {
  isAuthenticated,
  userAccess,
  adminOnlyAccess,
};

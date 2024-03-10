const User = require('../models/User')

const googleCallback = (request, response) => {
    // console.log(request.user.username)
    response.header('Authorization', `Bearer ${request.authInfo}`).status(200).json({ userID: request.user._id})
}

const register = async (req, res) => {
    const {username, password} = req.body

    if (!username || !password){
        return res.status(400).json({ msg: "Username or Password not provided!" })
    }
    
    if(User.findOne({username: username})){
        // console.log(User.findOne({username: username}))
        return res.status(401).json({ msg: "User already exists!" })
    }

    const user = await User.create({ ...req.body })       // Stores the hashed password in DB (code in User model)
    const token = user.createJWT()

    res.header('Authorization', `Bearer ${token}`).status(201).json( {userID: user._id} )
}

const login = async (req, res) => {
    const {username, password} = req.body

    // Check username & password is provided in the request
    if (!username || !password){
        return res.status(400).json({ msg: "Username or Password not provided!" })
    }

    const user = await User.findOne({username: username})

    // Check if user exist with provied username
    if (!user){
        return res.status(401).json({ msg: "No user found with provided username!" })
    }

    // Check if user created through google exists
    if (user.googleId){
        return res.status(401).json({ msg: "Account created through Google already exists" })
    }

    // Check password
    const validPassword = await user.comparePassword(password)
    if (!validPassword){
        return res.status(401).json({ msg: "Password missmatch!" })
    }

    const token = user.createJWT()

    res.header('Authorization', `Bearer ${token}`).status(200).json( {userID: user._id} )


}

// Logout
// const logout = (req, res) => {
//     req.logout((err) => {
//         if (err) {
//             return res.status(500).send('Error during logout');
//         }
        
//         req.session.destroy((err) => {
//         if (err) {
//             return res.status(500).send('Error destroying session');
//         }
        
//         res.send('Goodbye!');
//         });
//     });
// };

module.exports = {
    googleCallback,
    register,
    login,
    // logout,
    failure: (req, res) => res.send('Failed to authenticate..'),
};


const googleCallback = (request, response) => {
    // console.log(request.user.username)
    response.header('Authorization', `Bearer ${request.authInfo}`).status(200).json({ userID: request.user._id})
}

// Logout
const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).send('Error during logout');
        }
        
        req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error destroying session');
        }
        
        res.send('Goodbye!');
        });
    });
};

module.exports = {
    googleCallback,
    logout,
    failure: (req, res) => res.send('Failed to authenticate..'),
};

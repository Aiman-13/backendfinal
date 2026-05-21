const jwt = require('jsonwebtoken');

const JWT_SECRET = "your_very_secret_key_here";

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, username: user.username, profilePic: user.profilePic },
        JWT_SECRET,
        { expiresIn: "1h" }
    );
};

module.exports = { generateToken, JWT_SECRET };

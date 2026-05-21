const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = "your_very_secret_key_here";

// JWT Authentication Middleware
const authenticateJWT = (req, resp, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, JWT_SECRET, async (err, tokenUser) => {
            if (err) {
                return resp.redirect("/signin");
            }
            try {
                // Always read latest profile data from DB so navbar image stays in sync
                const dbUser = await User.findById(tokenUser.id);
                if (!dbUser) {
                    resp.clearCookie("token");
                    return resp.redirect("/signin");
                }

                req.user = dbUser;
                req.session.username = dbUser.username;
                req.session.profilePic = dbUser.profilePic;
                next();
            } catch (dbErr) {
                console.error("Auth middleware DB error:", dbErr);
                return resp.redirect("/signin");
            }
        });
    } else {
        resp.redirect("/signin");
    }
};

module.exports = { authenticateJWT, JWT_SECRET };

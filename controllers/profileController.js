const User = require('../models/User');

// Show user profile
exports.showProfile = async (req, resp) => {
    try {
        const user = await User.findOne({ username: req.session.username });
        resp.render("profile", {
            title: "Profile",
            user: user,
            username: req.session.username,
            profilePic: req.session.profilePic,
            message: req.session.profileMessage
        });
        delete req.session.profileMessage;
    } catch (err) {
        resp.status(500).send("Error loading profile");
    }
};

// Update user profile
exports.updateProfile = async (req, resp) => {
    try {
        const user = await User.findOne({ username: req.session.username });
        if (!user) return resp.send("User not found");

        // Update fields
        user.username = req.body.username;
        if (req.body.newPassword) {
            user.password = req.body.newPassword;
        }
        if (req.file) {
            user.profilePic = '/uploads/' + req.file.filename;
        }

        await user.save();
        
        // Update session
        req.session.username = user.username;
        req.session.profilePic = user.profilePic;
        
        req.session.profileMessage = { type: 'success', text: 'Profile updated successfully!' };
        resp.redirect("/profile");
    } catch (err) {
        console.error(err);
        req.session.profileMessage = { type: 'error', text: 'Error updating profile' };
        resp.redirect("/profile");
    }
};

// Show main/dashboard page
exports.showMain = (req, resp) => {
    resp.render("main", {
        title: "main",
        username: req.session.username,
        profilePic: req.session.profilePic
    });
};

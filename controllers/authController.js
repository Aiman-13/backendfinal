const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

// Signup handler
exports.signup = async (req, resp) => {
    let email = req.body.txtEmail;
    let pwd = req.body.txtpassword;
    let uname = req.body.txtuname;
    let city = req.body.txtcity;
    let phone = req.body.txtphone;
    let profilePic = req.file ? '/uploads/' + req.file.filename : null;

    try {
        const user = new User({ 
            username: uname, 
            password: pwd, 
            email, 
            city, 
            phone,
            profilePic
        });
        
        await user.save();
        
        const token = generateToken(user);
        resp.cookie("token", token, { httpOnly: true });
        
        req.session.username = uname;
        req.session.profilePic = profilePic;
        resp.render("main", {
            title: "main",
            username: uname,
            profilePic: profilePic
        });
    } catch (err) {
        console.error('Error saving user to MongoDB', err);
        if (err.code === 11000) {
            return resp.send('Email already exists');
        }
        resp.status(500).send('Failed to save user');
    }
};

// Login handler
exports.login = async (req, resp) => {
    let email = req.query.txtemail;
    let pwd = req.query.txtpassword;

    try {
        const user = await User.findOne({ email: email });
        if (user && await user.comparePassword(pwd)) {
            const token = generateToken(user);
            resp.cookie("token", token, { httpOnly: true });

            req.session.username = user.username;
            req.session.profilePic = user.profilePic;
            resp.render("main", {
                title: "main",
                username: user.username,
                profilePic: user.profilePic
            });
        } else {
            resp.send("Invalid email or password");
        }
    } catch (err) {
        console.error('Error during login', err);
        resp.status(500).send("An error occurred during login");
    }
};

// Google callback handler
exports.googleCallback = (req, resp) => {
    const token = generateToken(req.user);
    resp.cookie("token", token, { httpOnly: true });
    req.session.username = req.user.username;
    req.session.profilePic = req.user.profilePic;
    resp.redirect("/mainx");
};

// Show signup page
exports.showSignup = (req, resp) => {
    resp.render("signup", { title: "signup" });
};

// Show signin page
exports.showSignin = (req, resp) => {
    resp.render("signin", { title: "signin" });
};

// Show home page (logout)
exports.showHome = (req, resp) => {
    req.session.destroy();
    resp.clearCookie("token");
    resp.render("home", { title: "home" });
};

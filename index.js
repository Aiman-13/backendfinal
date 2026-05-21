// Core dependencies
var express = require("express");
var app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");

// Database and Configuration
const connectDB = require("./config/database");
const passport = require("./config/passport");

// Routes
const authRoutes = require("./routes/auth");
const bookingRoutes = require("./routes/booking");
const feedbackRoutes = require("./routes/feedback");
const destinationRoutes = require("./routes/destination");
const profileRoutes = require("./routes/profile");

// Connect to MongoDB
connectDB();

// Session middleware
app.use(session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true
}));

app.use(cookieParser());

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// View engine setup
app.set("view engine", "ejs");

// Static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Make auth user data available to all EJS views (shared navbar partial)
app.use((req, res, next) => {
    res.locals.username = req.session?.username || req.user?.username || null;
    res.locals.profilePic = req.session?.profilePic || req.user?.profilePic || null;
    res.locals.user = {
        username: res.locals.username,
        profilePic: res.locals.profilePic
    };
    next();
});

// Routes
app.use(authRoutes);
app.use(bookingRoutes);
app.use(feedbackRoutes);
app.use(destinationRoutes);
app.use(profileRoutes);

// Start server
app.listen(805, function() {
    console.log("server started on port 805");
});

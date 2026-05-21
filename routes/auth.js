const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('passport');
const upload = require('../config/multer');

// Auth routes
router.get('/', authController.showHome);
router.get('/signup', authController.showSignup);
router.get('/signin', authController.showSignin);
router.post('/signupd', upload.single('profilePic'), authController.signup);
router.get('/login', authController.login);

// Google OAuth routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/signin' }),
    authController.googleCallback
);

module.exports = router;

const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { authenticateJWT } = require('../middleware/auth');
const upload = require('../config/multer');

// Profile routes
router.get('/profile', authenticateJWT, profileController.showProfile);
router.post('/profile/update', authenticateJWT, upload.single('profilePic'), profileController.updateProfile);
router.get('/mainx', authenticateJWT, profileController.showMain);

module.exports = router;

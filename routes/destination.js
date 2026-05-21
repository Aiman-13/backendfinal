const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destinationController');
const { authenticateJWT } = require('../middleware/auth');

// Destination routes
router.get('/destination', authenticateJWT, destinationController.showDestinations);
router.post('/destination_info', authenticateJWT, destinationController.showDestinationInfo);
router.get('/packages', authenticateJWT, destinationController.showPackages);
router.get('/gallery', authenticateJWT, destinationController.showGallery);

module.exports = router;

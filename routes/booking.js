const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { authenticateJWT } = require('../middleware/auth');

// Booking routes
router.get('/booking', authenticateJWT, bookingController.showBooking);
router.get('/book', authenticateJWT, bookingController.createBooking);

module.exports = router;

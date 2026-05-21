const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const { authenticateJWT } = require('../middleware/auth');

// Feedback routes
router.get('/feedback', authenticateJWT, feedbackController.showFeedback);
router.get('/feed', authenticateJWT, feedbackController.createFeedback);

module.exports = router;

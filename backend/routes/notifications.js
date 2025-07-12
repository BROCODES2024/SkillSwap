const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Placeholder for notification routes
router.get('/', protect, (req, res) => {
  res.json({ message: 'Get notifications endpoint' });
});

router.put('/mark-read', protect, (req, res) => {
  res.json({ message: 'Mark notifications as read endpoint' });
});

module.exports = router; 
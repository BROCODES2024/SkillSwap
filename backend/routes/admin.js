const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');

// Placeholder for admin routes
router.get('/dashboard', protect, admin, (req, res) => {
  res.json({ message: 'Admin dashboard endpoint' });
});

router.get('/users', protect, admin, (req, res) => {
  res.json({ message: 'Get all users endpoint' });
});

router.put('/users/:id/ban', protect, admin, (req, res) => {
  res.json({ message: 'Ban user endpoint' });
});

module.exports = router; 
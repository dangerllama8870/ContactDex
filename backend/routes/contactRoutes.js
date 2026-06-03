const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// 1. Destructure 'protect' exactly as you exported it
const { protect } = require('../middleware/authMiddleware'); 

// 2. Slot 'protect' into the route before the controller
router.post('/', protect, contactController.addContact);

module.exports = router;
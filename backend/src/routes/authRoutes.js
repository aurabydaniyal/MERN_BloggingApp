// Purpose: Authentication routes
// Why: Defines API endpoints for auth
// How: Maps routes to controller functions

const express = require('express');
const router = express.Router();
const { 
    register, 
    login, 
    logout, 
    getMe, 
    updateTheme 
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { validateRegister } = require('../middleware/validation');

router.post('/register', validateRegister, register);
router.post('/login', login);
router.get('/logout', protect, logout);
router.get('/me', protect, getMe);
router.put('/theme', protect, updateTheme);

module.exports = router;
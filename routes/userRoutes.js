const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/profile', userController.getProfile);
router.delete('/profile', userController.deleteAccount);

module.exports = router;
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController.js');

router.post('/register', courseController.registerCourse);

module.exports = router;
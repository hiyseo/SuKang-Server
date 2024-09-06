const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController.js');

router.post('/register', courseController.registerCourse);
router.post('/enroll', courseController.enrollCourse);

module.exports = router;
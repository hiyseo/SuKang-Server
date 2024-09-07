const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController.js');

router.post('/register', courseController.registerCourse);
router.get('/enroll', courseController.getCoursesByDepartment);
router.post('/enroll', courseController.enrollInCourse);

module.exports = router;
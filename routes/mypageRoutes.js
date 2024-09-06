const express = require('express');
const router = express.Router();
const mypageController = require('../controllers/mypageController.js');

//교수
router.get('/professor', mypageController.PGetMyCourses);
// router.get('/professor/:course_id', mypageController.getCourseDetails);
router.get('/professor/course', mypageController.getCourseDetails);

// router.get('/professor/:course_id/posts', mypageController.getCoursePosts);
router.get('/professor/posts', mypageController.getCoursePosts);

// router.get('/professor/:course_id/students', mypageController.getEnrolledStudents);
router.get('/professor/students', mypageController.getEnrolledStudents);

// router.delete('/professor/:course_id/students/:student_id', mypageController.removeStudentFromCourse);
router.delete('/professor/students', mypageController.removeStudentFromCourse);

//학생
router.get('/student', mypageController.SGetMyCourses);
// router.get('/student/:course_id', mypageController.getCourseDetails);
router.get('/student/course', mypageController.getCourseDetails);

// router.get('/student/:course_id/posts', mypageController.getCoursePosts);
router.get('/student/posts', mypageController.getCoursePosts);

// router.delete('/student/:course_id', mypageController.cancelEnrollment);
router.delete('/student', mypageController.cancelEnrollment);

module.exports = router;
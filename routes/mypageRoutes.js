const express = require('express');
const router = express.Router();
const mypageController = require('../controllers/mypageController.js');

//교수
//내강의 조회(교수)
router.get('/professor', mypageController.PGetMyCourses);
//강의 삭제(교수)
router.delete('/professor', mypageController.deleteCourse);
//내강의 상세보기(교수)
router.get('/professor/course', mypageController.getCourseDetails);
//강의게시물 조회(교수)
router.get('/professor/posts', mypageController.getCoursePosts);
//강의게시물 삭제(교수)
router.delete('/professor/posts', mypageController.deletePost);
//강의수강생 조회(교수)
router.get('/professor/students', mypageController.getEnrolledStudents);
//강의수강생 삭제(교수)
router.delete('/professor/students', mypageController.removeStudentFromCourse);

//학생
//내강의 조회(학생)
router.get('/student', mypageController.SGetMyCourses);
//내강의 상세보기(학생)
router.get('/student/course', mypageController.getCourseDetails);
//강의게시물 조회(학생)
router.get('/student/posts', mypageController.getCoursePosts);
//강의수강 취소(학생)
router.delete('/student/course', mypageController.cancelEnrollment);

module.exports = router;
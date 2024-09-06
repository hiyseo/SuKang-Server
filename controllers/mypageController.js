const mypageModel = require('../models/mypageModel');

exports.PGetMyCourses = (req, res) => {
    const username = req.session.user.username;
    const userStatus = req.session.user.status;

    if(userStatus === 'Student'){
        return res.status(403).json({message: 'Access denied.'})
    }

    mypageModel.getProfessorCourses(username, (err, results) => {
        if(err){
            console.error('Error fetching professor courses: ', err);
            return res.status(500).json({message: 'Server error'});
        }
        res.json(results);
    });
};

exports.getEnrolledStudents = (req, res) => {
    const course_id = req.query.course_id;
    const userStatus = req.session.user.status;

    if(userStatus === 'Student'){
        return res.status(403).json({message: 'Access denied.'})
    }

    mypageModel.getEnrolledStudents(course_id, (err, results) => {
        if(err){
            console.error('Error fetching enrolled students: ', err);
            return res.status(500).json({message: 'Server error'});
        }
        res.json(results);
    });
};

exports.removeStudentFromCourse = (req, res) => {
    // const {course_id, student_id} = req.query;
    const course_id = req.query.course_id;
    const student_id = req.query.student_id;
    const userStatus = req.session.user.status;

    if(userStatus === 'Student'){
        return res.status(403).json({message: 'Access denied.'})
    }

    mypageModel.removeStudentFromCourse(course_id, student_id, (err, results) => {
        if(err){
            console.error('Error removing student from course: ', err);
            return res.status(500).json({message: 'Server error'});
        }
        res.status(200).json({message: 'Student removed from course successfully!'});
    });
};

exports.SGetMyCourses = (req, res) => {
    const user_id = req.session.user.user_id;
    const userStatus = req.session.user.status;

    if(userStatus === 'Professor'){
        return res.status(403).json({message: 'Access denied.'})
    }

    mypageModel.getStudentCourses(user_id, (err, results) => {
        if(err){
            console.error('Error fetching student courses: ', err);
            return res.status(500).json({message: 'Server error'});
        }
        res.json(results);
    });
};

exports.getCourseDetails = (req, res) => {
    const course_id = req.query.course_id;

    mypageModel.getCourseDetails(course_id, (err, results) => {
        if(err){
            console.error('Error fetching course details: ', err);
            return res.status(500).json({message: 'Server error'});
        }
        res.json(results);
    });
};

exports.getCoursePosts = (req, res) => {
    const course_id = req.query.course_id;

    mypageModel.getCoursePosts(course_id, (err, results) => {
        if(err){
            console.error('Error fetching course posts: ', err);
            return res.status(500).json({message: 'Server error'});
        }
        res.json(results);
    });
};

exports.cancelEnrollment = (req, res) => {
    const course_id = req.query.course_id;
    const student_id = req.session.user.user_id;
    const userStatus = req.session.user.status;

    if(userStatus === 'Professor'){
        return res.status(403).json({message: 'Access denied.'})
    }

    mypageModel.cancelEnrollment(course_id, student_id, (err, results) => {
        if(err){
            console.error('Error canceling enrollment: ', err);
        }
        res.status(200).json({message: 'Course enrollment canceled successfully!'});
    });
};
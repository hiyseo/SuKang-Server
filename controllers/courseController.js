const courseModel = require('../models/courseModel');

const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@korea\.ac\.kr$/;
    return regex.test(email)
}

exports.registerCourse = (req, res) => {
    const userStatus = req.session.user && req.session.user.status
    const {course_name, course_location, credits, capacity, department_id, course_days, course_time, professor_email, course_content} = req.body;
    const professor_name = req.session.professor_name
    const professor_username = req.session.user.username

    if(userStatus ==='Student'){
        return res.status(403).json({message: 'Access denied. Only professors can register courses.'})
    }

    if(!validateEmail(professor_email)){
        return res.status(400).json({message: 'Invalid email format. Must be in the form of xxx@korea.ac.kr'});
    }

    if(!course_name || !course_location || !credits || !capacity || !department_id || !course_days || !course_time || !professor_email){
        return res.status(400).json({message: 'All fields are required'});
    };

    if(capacity > 100){
        return res.status(400).json({message: 'Capacity cannot exceed 100 students'});
    };

    const courseData = {
        course_name,
        professor_name,
        course_location,
        credits,
        capacity,
        department_id,
        course_days,
        course_time,
        professor_email,
        professor_username
    };

    courseModel.createCourse(courseData, (err, results) => {
        if(err){
            console.error('Error registering course: ', err);
            console.log(results);
            return res.status(500).json({message: 'Server error'});
        }

        res.status(201).json({message: 'Course registered successfully!'});
    });
}; 

exports.getCoursesByDepartment = (req, res) => {
    const department_id = req.query.department_id;
    const userStatus = req.session.user && req.session.user.status

    if(!department_id){
        return res.status(400).json({message: 'Department ID is required'});
    }

    if(userStatus === 'Professor'){
        return res.status(403).json({message: 'Access denied. Only Students can enroll courses.'})
    }

    courseModel.getCoursesByDepartment(department_id, (err, results) => {
        if(err){
            console.error('Error fetching courses: ', err);
            return res.status(500).json({message: 'Server error'});
        }
        res.status(200).json(results)
    })
}

exports.enrollInCourse = (req, res) => {
    const userStatus = req.session.user && req.session.user.status
    // const student_id = req.session.user.user_id;
    const {user_id, course_id} = req.body;

    if(userStatus === 'Professor'){
        return res.status(403).json({message: 'Access denied. Only Students can enroll courses.'})
    }

    if(!course_id || !user_id){
        return res.status(400).json({message: 'Course not identified.'});
    }

    courseModel.enrollInCourse(user_id, course_id, (err, result) => {
        if(err){
            console.error('Error enrolling in course: ', err);
            return res.status(500).json({message: 'Server error'});
        }

        if(!result.success){
            return res.status(400).json({message: result.message});
        }

        res.status(200).json({message: result.message});
    });
};


// 학과 목록 가져오기
exports.getDepartments = (req, res) => {
    courseModel.getDepartments((err, departments) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching departments' });
      }
      res.status(200).json(departments);
    });
  };
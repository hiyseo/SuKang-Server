const courseModel = require('../models/courseModel');

const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@korea\.ac\.kr$/;
    return regex.test(email)
}

exports.registerCourse = (req, res) => {
    const userStatus = req.session.user && req.session.user.status
    const {course_name, course_location, credits, capacity, department_id, course_days, course_time, professor_email, course_content} = req.body;
    const professor_name = req.session.professor_name

    if(userStatus !== 'Professor' || userStatus !== 'Auth'){
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
        course_content
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
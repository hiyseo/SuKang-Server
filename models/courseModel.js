const db = require('../config/db');

exports.createCourse = (courseData, callback) => {
    const {course_name, professor_name, professor_email, course_location, credits, capacity, department_id,  course_days, course_time, course_content} = courseData;
    const query = `
    INSERT INTO Course (course_name, professor_name, professor_email, course_location, credits, capacity, department_id, course_days, course_time, course_content)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [course_name, professor_name, professor_email, course_location, credits, capacity, department_id, course_days, course_time, course_content], (err, results) => {
        if(err){
            return callback(err);
        }
        callback(null, results);
    });
};
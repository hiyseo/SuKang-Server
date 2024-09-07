const db = require('../config/db');

exports.createPost = (postData, callback) => {
    const {title, content, course_id, user_id} = postData;
    const query = `
    INSERT INTO BoardPost (title, content, course_id, user_id, created_time)
    VALUES (?, ?, ?, ?, NOW())
    `;

    db.query(query, [title, content, course_id, user_id], (err, results) => {
        if(err) return callback(err);
        callback(null, results);
    });
};

exports.getBoardPostsByStudentId = (student_id, callback) => {
    const query = `
    SELECT b.post_id, b.title, b.content, b.created_time, c.course_name
    FROM BoardPost b
    JOIN Course c ON b.course_id = c.course_id
    JOIN Enrollment e ON e.course_id = c.course_id
    WHERE e.user_id = ?
    ORDER BY b.created_time DESC
    `;

    db.query(query, [student_id], (err, results) => {
        if(err){
            return callback(err, null);
        }
        callback(null, results);
    });
};
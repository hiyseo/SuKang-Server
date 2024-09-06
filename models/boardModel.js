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
const db = require('../config/db');

exports.createUser = (username, name, student_id, hashedPassword, status, callback) => {
    const query = 'INSERT INTO User (username, name, student_id, password, status) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [username, name, student_id, hashedPassword, status], (err, results) => {
        if(err){
            console.error('Error inserting user data', err);
            return callback(err);
        }
        callback(null, results);
    });
};

exports.findUserByUsername = (username, callback) => {
    const query = 'SELECT * FROM User WHERE username = ?';
    db.query(query, [username], (err, results) => {
        if(err){
            return callback(err);
        }
        callback(null, results[0]);
    });
};

exports.findUserById = (userId, callback) => {
    const query = 'SELECT * FROM User WHERE user_id = ?';
    db.query(query, [userId], (err, results) => {
        if(err){
            return callback(err);
        }
        callback(null, results[0]);
    });
};
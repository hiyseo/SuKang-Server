const db = require('../config/db');

exports.getProfessorCourses = (username, callback) => {
    const query = `
    SELECT course_id, course_name
    FROM Course
    WHERE professor_username = ?
    `;

    db.query(query, [username], (err, results) => {
        if(err){
            return callback(err);
        }
        callback(null, results);
    });
};

exports.getStudentCourses = (user_id, callback) => {
    const query = `
    SELECT course_id, course_name, professor_name, course_location, course_days, course_time
    FROM Enrollment NATURAL JOIN Course
    WHERE user_id = ?
    `;

    db.query(query, [user_id], (err, results) => {
        if(err){
            return callback(err);
        }
        callback(null, results);
    });
};

exports.getEnrolledStudents = (course_id, callback) => {
    const query = `
    SELECT u.user_id, u.name, u.student_id, d.department_name
    FROM Enrollment e
    JOIN User u ON e.user_id = u.user_id
    JOIN Department d ON u.department_id = d.department_id
    WHERE e.course_id = ?
    `;

    db.query(query, [course_id], (err, results) => {
        if(err){
            return callback(err);
        }
        callback(null, results);
    });
};

exports.removeStudentFromCourse = (course_id, student_id, callback) => {
    const query = `
    DELETE FROM Enrollment
    WHERE course_id = ? AND user_id = ?
    `;

    db.query(query, [course_id, student_id], (err, results) => {
        if(err){
            return callback(err);
        }
        callback(null, results);
    });
};

exports.getCourseDetails = (course_id, callback) => {
    const query = `
    SELECT c.course_name, c.course_location, c.credits, c.course_days, c.course_time
    FROM Course c
    WHERE c.course_id = ?
    `;

    db.query(query, [course_id], (err, results) => {
        if(err){
            return callback(err);
        }
        callback(null, results);
    });
};

exports.getCoursePosts = (course_id, callback) => {
    const query = `
    SELECT post_id, title, content, created_time
    FROM BoardPost
    WHERE course_id = ?
    `;

    db.query(query, [course_id], (err, results) => {
        if(err){
            return callback(err);
        }
        callback(null, results);
    });
};

// 수강 취소 (Enrollment에서 삭제)
exports.cancelEnrollment = (user_id, course_id, callback) => {
    const deleteQuery = `
      DELETE FROM Enrollment
      WHERE user_id=? AND course_id =?
    `;
  
    db.query(deleteQuery, [user_id, course_id], (err, results) => {
      if (err) {
        console.error('Error canceling enrollment:', err);
        return callback(err);
      }
      if (results.affectedRows === 0) {
        return callback(null, { success: false, message: 'Enrollment not found' });
      }
  
      // 수강 취소 후 신청자 수 감소
      const updateApplicantsQuery = `
        UPDATE Course
        SET applicants = applicants - 1
        WHERE course_id=?
      `;
  
      db.query(updateApplicantsQuery, [course_id], (err) => {
        if (err) {
          console.error('Error updating applicants:', err);
          return callback(err);
        }
        callback(null, { success: true, message: 'Enrollment canceled successfully' });
      });
    });
  };

exports.deleteCourseById = (course_id, callback) => {
    const query = `DELETE FROM Course WHERE course_id = ?`;
    db.query(query, [course_id], (err, results) => {
        if(err){
            return callback(err, null);
        }
        callback(null, results);
    });
};

exports.deletePostById = (post_id, callback) => {
    const query = `DELETE FROM BoardPost WHERE post_id = ?`;
    db.query(query, [post_id], (err, results) => {
        if(err){
            return callback(err, null);
        }
        callback(null, results)
    });
};
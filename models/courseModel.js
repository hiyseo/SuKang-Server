const db = require('../config/db');

//강의 신청
exports.enrollInCourse = (student_id, course_id, callback) => {
    //강의시간 중복 체크
    const overlapQuery = `
    SELECT e.course_id
    FROM Enrollment e
    JOIN Course c ON e.course_id = c.course_id
    WHERE e.user_id = ?
    AND c.course_days = (SELECT course_days FROM Course WHERE course_id = ?)
    AND c.course_time = (SELECT course_time FROM Course WHERE course_id = ?)
    `;

    db.query(overlapQuery, [student_id, course_id, course_id], (err, results) => {
        if(err) return callback(err);
        if(results.length>0){
            return callback(null, {success: false, message: 'Time conflict with another enrolled course.'});
        }
        //최대학점(19) 체크
        const creditLimitQuery = `
        SELECT SUM(c.credits) AS total_credits
        FROM Enrollment e
        JOIN Course c ON e.course_id = c.course_id
        WHERE e.user_id = ?
        `;

        db.query(creditLimitQuery, [student_id], (err, creditResults) => {
            if(err) return callback(err);

            const totalCredits = parseInt(creditResults[0].total_credits) || 0;
            // const totalCredits = creditResults[0].total_credits || 0;
            const courseCreditsQuery = `
            SELECT credits FROM Course WHERE course_id = ?
            `;

            db.query(courseCreditsQuery, [course_id], (err, courseCreditResults) => {
                if(err) return callback(err);
                const courseCredits = parseInt(courseCreditResults[0].credits);
                // const courseCredits = courseCreditResults[0].credits;

                if(totalCredits + courseCredits > 19){
                    console.log("totalCredits: ", totalCredits);
                    console.log("courseCredits: ", courseCredits);
                    console.log("sum credits: ", totalCredits + courseCredits);
                    return callback(null, {success: false, message: 'You cannot enroll in more than 19 credits.'});
                }

                const capacityCheckQuery = `
                SELECT capacity, applicants
                FROM Course
                WHERE course_id = ?
                `;

                db.query(capacityCheckQuery, [course_id], (err, capResults) => {
                    if(err) return callback(err);

                    const capacity = parseInt(capResults[0].capacity);
                    const applicants = parseInt(capResults[0].applicants);
                    // const {capacity, applicants} = capResults[0];
                    if(applicants >= capacity){
                        return callback(null, {success: false, message: 'The course is full.'});
                    }
                    //수강신청
                    const enrollQuery = `
                    INSERT INTO Enrollment (user_id, course_id)
                    VALUES (?, ?)
                    `;

                    db.query(enrollQuery, [student_id, course_id], (err, enrollResults) => {
                        if(err) return callback(err);
                        const updateApplicantsQuery = `
                        UPDATE Course
                        SET applicants = applicants + 1
                        WHERE course_id = ?
                        `;

                        db.query(updateApplicantsQuery, [course_id], (err) => {
                            if(err) return callback(err);
                            callback(null, {success: true, message: 'Enrollment successful!'});
                        });
                    });
                });
            });
        });
    });
};

exports.createCourse = (courseData, callback) => {
    const {course_name, professor_name, professor_username, professor_email, course_location, credits, capacity, department_id,  course_days, course_time} = courseData;
    const query = `
    INSERT INTO Course (course_name, professor_name, professor_username, professor_email, course_location, credits, capacity, department_id, course_days, course_time)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [course_name, professor_name, professor_username, professor_email, course_location, credits, capacity, department_id, course_days, course_time], (err, results) => {
        if(err){
            return callback(err);
        }
        callback(null, results);
    });
};

exports.getCoursesByDepartment = (department_id, callback) => {
    const query =`
    SELECT course_id, course_name, professor_name, course_location, credits, capacity, applicants, course_days, course_time
    FROM Course
    WHERE department_id = ?
    `;

    db.query(query, [department_id], (err, results) => {
        if(err){
            return callback(err);
        }
        callback(null, results);
    });
};

// 학과 목록 가져오기
exports.getDepartments = (callback) => {
    const query = 'SELECT * FROM Department';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching departments: ', err);
        return callback(err, null);
      }
      callback(null, results);
    });
  };
const boardModel = require('../models/boardModel');

exports.createPost = (req, res) => {
    const {title, content, course_id} = req.body;
    const user_id = req.session.user.user_id;
    const userStatus = req.session.user.status;

    if(userStatus ==='Student'){
        return res.status(403).json({message: 'Access denied. Only professors can post the boards.'})
    }

    if(!title || !content || !course_id){
        return res.status(400).json({message: 'All fields are required'});
    }

    const postData = {
        title,
        content,
        course_id,
        user_id
    };

    boardModel.createPost(postData, (err, result) => {
        if(err){
            console.error('Error creating post: ', err);
            return res.status(500).json({message: 'Server error'});
        }
        res.status(201).json({message: 'Post created successfully!'});
    });
};

exports.getStudentBoardPosts = (req, res) => {
    const student_id = req.session.user.user_id;

    if(!student_id){
        return res.statsu(400).json({message: 'User not logged in'});
    }

    boardModel.getBoardPostsByStudentId(student_id, (err, posts) => {
        if(err){
            console.error('Error fetching board posts: ', err);
            return res.status(500).json({message: 'Server error'});
        }
        res.json(posts);
    });
};
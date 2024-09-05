const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

//회원가입
exports.signup = async (req, res) => {
    const {username, name, student_id, password, status} = req.body;
    if(!username || !name || !password || !status){
        return res.status(400).json({message: 'All fields are required'});
    }
    try{
        const hashedPassword = await bcrypt.hash(password, 10);

        userModel.findUserByUsername(username, (err, user) => {
            if(err){
                console.error('Error while checking user: ', err);
                return res.status(500).json({error: 'Error checking user'});
            }
            if(user){
                return res.status(400).json({message: 'Username already exists'});
            }
            userModel.createUser(username, name, student_id, hashedPassword, status, (err, results) => {
                if(err){
                    console.error('Error while inserting user: ', err);
                    return res.status(500).json({error: 'Error inserting user data', details: err.message});
                }
                
                res.status(201).json({message: 'User registered successfully!'});
            });
        });
    } catch(err){
        res.status(500).json({error: 'Server error', details: err.message});
    }
};

//로그인
exports.login = async (req, res) => {
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(400).json({message: 'Username and password are required'});
    }
    userModel.findUserByUsername(username, async (err, user) => {
        if(err){
            return res.status(500).json({error: err.message});
        }
        if(results.length == 0){
            return res.status(404).json({message: 'Invalid username'});
        }
        // const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({message: 'Invalid password'});
        }

        req.session.userId = user.user_id;
        res.status(200).json({message: `Welcome ${user.name}, login successful!`});
    });
};

exports.getProfile = (req, res) => {
    const userId = req.session.userId;

    userModel.findUserById(userId, (err, user) => {
        if(err){
            return res.status(500).json({error: 'Error retrieving user profile'});
        }
        if (!user){
            return res.status(405).json({message: 'User not found'});
        }
        res.status(200).json({
            username: user.username,
            name: user.name,
            student_id: user.student_id,
            status: user.status,
        })
    })
}
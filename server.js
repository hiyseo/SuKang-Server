const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect(err => {
    if(err){
        console.error('DB connection failed: ', err.stack);
        return;
    }
    console.log('Connected to DB');
})

//회원가입
app.post('/signup', async (req, res) => {
    // console.log(req.body);
    const {username, name, student_id, password, status} = req.body;
    if(!username || !name || !password || !status){
        return res.status(400).json({message: 'All fields are required'});
    }

    const userExistsQuery = 'SELECT * FROM User WHERE username = ?';
    db.query(userExistsQuery, [username], async (err, results) => {
        if(err){
            return res.status(500).json({error: 'Error checking for existing username'});
        }
        if(results.length > 0){
            return res.status(400).json({message: 'Username already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const insertQuery = 'INSERT INTO User (username, name, student_id, password, status) VALUES (?, ?, ?, ?, ?)';

        db.query(insertQuery, [username, name, student_id, hashedPassword, status], (err) => {
            if(err){
                return res.status(500).json({error:'Error inserting user data'});
            }
            res.status(201).json({message: 'User registered successfully!'});
        });
    });
});

//로그인
app.post('/login', (req, res) => {
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(400).json({message: 'Username and password are required'});
    }

    const query = 'SELECT * FROM User WHERE username = ?';
    db.query(query, [username], async (err, results) => {
        if(err){
            return res.status(500).json({error: err.message});
        }
        if(results.length == 0){
            return res.status(404).json({message: 'Invalid username'});
        }
        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({message: 'Invalid password'});
        }
        res.json({message: `Welcome ${user.name}, login successful!`});
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
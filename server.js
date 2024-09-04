const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

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

app.get('/courses', (req, res) => {
    db.query('SELECT * FROM Course', (err, results) => {
        if(err){
            return res.status(500).json({error: err.message});
        }
        res.json(results);
    });
});

app.listen(port, function(){
    console.log(`Server is running on port ${port}`);
});
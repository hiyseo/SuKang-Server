const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    supportBigNumbers: true,
    bigNumberStrings: false
});

db.connect(err => {
    if(err){
        console.error('DB connection failed: ', err.stack);
        return;
    }
    console.log('Connected to DB');
})

module.exports = db;
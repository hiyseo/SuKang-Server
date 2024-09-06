const express = require('express');
const session = require('express-session')
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

app.use(session({
    // secret: process.env.ES_SECRET,
    secret: "*12dnjf1dlf",
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// console.log(userRoutes);
app.use('/users', userRoutes);
app.use('/courses', courseRoutes);
// app.use('/boards', postRoutes);

module.exports = app;
const express = require('express');
const session = require('express-session')
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const postRoutes = require('./routes/boardRoutes');
const mypageRoutes = require('./routes/mypageRoutes');

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

app.use('/users', userRoutes);
app.use('/courses', courseRoutes);
app.use('/boards', postRoutes);
app.use('/mypages', mypageRoutes);

module.exports = app;
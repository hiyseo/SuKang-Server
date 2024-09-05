const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

app.use(express.json());
app.use(cors());
// console.log(userRoutes);
app.use('/users', userRoutes);
// app.use('/courses', courseRoutes);
// app.use('/posts', postRoutes);

module.exports = app;
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
    cookie: {
        httpOnly: true,  // 클라이언트가 쿠키를 JavaScript로 접근하지 못하도록 설정
        secure: false,   // HTTPS 환경에서만 쿠키를 전송하도록 설정 (개발 환경에서는 false로 설정)
        sameSite: 'lax'  // 요청 간에 쿠키가 적절히 전송되도록 설정 (cross-site 환경을 위한 설정)
    }
}));

app.use(cors({
    origin: 'http://localhost:3001',  // 클라이언트 주소
    credentials: true  // 클라이언트에서 세션 쿠키를 사용할 수 있도록 허용
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRoutes);
app.use('/courses', courseRoutes);
app.use('/boards', postRoutes);
app.use('/mypages', mypageRoutes);

module.exports = app;
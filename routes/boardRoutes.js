const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController')

router.post('/post', boardController.createPost);
router.get('/lists', boardController.getStudentBoardPosts);

module.exports = router;
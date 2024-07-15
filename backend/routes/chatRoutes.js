const express = require('express');
const { getChat } = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, getChat);

module.exports = router;

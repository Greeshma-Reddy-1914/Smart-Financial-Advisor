const express = require('express');
const router = express.Router();
const { chatResponse } = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, chatResponse);

module.exports = router;

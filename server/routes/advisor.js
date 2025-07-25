// routes/advisor.js

const express = require('express');
const router = express.Router();
const advisorController = require('../controllers/advisorController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, advisorController.getAdvice);

module.exports = router;

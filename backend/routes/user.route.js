const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/user.controller');

router.get('/', getAllUsers);

module.exports = router;
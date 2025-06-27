const express = require('express');
const router = express.Router();
const { getAllUsers, getSpecificUser} = require('../controllers/user.controller');

router.get('/', getAllUsers);
router.get('/:email', getSpecificUser);

module.exports = router;

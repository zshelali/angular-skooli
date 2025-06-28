const express = require('express');
const router = express.Router();
const { getAllUsers, getSpecificUser, createUser, updateUser, deleteUser} = require('../controllers/user.controller');

router.get('/', getAllUsers);
router.get('/:email', getSpecificUser);
router.post('/', createUser);
router.put('/:email', updateUser);
router.delete('/:email', deleteUser);


module.exports = router;

const express = require('express');
const router = express.Router();
const { getAllUsers, getSpecificUser, createUser, updateUser, deleteUser, getUsersByUE } = require('../controllers/user.controller');

router.get('/', getAllUsers);
router.get("/by-ue/:code", getUsersByUE); // ✅ nouvelle route
router.get('/:email', getSpecificUser);
router.post('/', createUser);
router.put('/:id', updateUser); // Changed from /:email to /:id
router.delete('/:id', deleteUser); // Changed from /:email to /:id

module.exports = router;
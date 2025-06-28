const express = require('express');
const router = express.Router();
const {getUserUe, addUserUe} = require("../controllers/dashboard.controller");

router.get('/:email', getUserUe);
router.post('/:code', addUserUe)

module.exports = router;

const express = require('express');
const router = express.Router();
const {getUserUe} = require("../controllers/dashboard.controller");

router.get('/:email', getUserUe);

module.exports = router;

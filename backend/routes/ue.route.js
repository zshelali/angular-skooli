const express = require('express');
const router = express.Router();
const { getAllUes, createUe } = require('../controllers/ue.controller');

router.get('/', getAllUes);
router.post('/', createUe);

module.exports = router;
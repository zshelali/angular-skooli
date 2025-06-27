const express = require('express');
const router = express.Router();
const { getAllUes, createUe, getCurrentUe } = require('../controllers/ue.controller');

router.get('/:id', getCurrentUe);
router.get('/', getAllUes);

router.post('/', createUe);

module.exports = router;

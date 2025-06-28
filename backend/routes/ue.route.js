const express = require('express');
const router = express.Router();

const { getAllUes, createUe, updateUe, deleteUe, getCurrentUe } = require('../controllers/ue.controller');

router.get('/:id', getCurrentUe);
router.get('/', getAllUes);

router.post('/', createUe);
router.put('/:id', updateUe);
router.delete('/:id', deleteUe);

module.exports = router;

const express = require('express');
const router = express.Router();
const { 
    getAllUes,
    createUe,
    updateUe,
    deleteUe } = require('../controllers/ue.controller');

router.get('/', getAllUes);
router.post('/', createUe);
router.put('/:id', updateUe);
router.delete('/:id', deleteUe);

module.exports = router;
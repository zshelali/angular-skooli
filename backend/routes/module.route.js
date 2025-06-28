const express = require('express');
const router = express.Router();
const { getAllModules, createModule } = require('../controllers/module.controller');

router.get('/:code', getAllModules);
router.post('/', createModule);

module.exports = router;

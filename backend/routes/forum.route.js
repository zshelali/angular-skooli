const express = require('express');
const router = express.Router();
const controller = require('../controllers/forum.controller');

router.get('/:id', controller.getForums);
router.post('/', controller.createForum);
router.post('/:id', controller.addMessageToForum);


module.exports = router;

const express = require('express');
const router = express.Router();
const controller = require('../controllers/forum.controller');

router.get('/', controller.getForums);
router.post('/', controller.createForum);
router.post('/:id/messages', controller.addMessageToForum);


module.exports = router;
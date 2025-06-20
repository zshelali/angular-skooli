const express = require('express');
const router = express.Router();
const controller = require('../controllers/forum.controller');

router.get('/', controller.getForums);
router.post('/', controller.createForum);
router.post('/:id/topics/:topicIndex/messages', controller.addMessageToForum);

module.exports = router;
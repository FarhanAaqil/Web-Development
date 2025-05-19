const express = require('express');
const nodeController = require('../controllers/nodeController');
const router = express.Router();

router.post('/', nodeController.createNode);
router.post('/link', nodeController.linkNodes);
router.get('/:userId', nodeController.getUserNodes);

module.exports = router;

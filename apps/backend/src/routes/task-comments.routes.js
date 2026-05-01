const express = require('express');
const { addComment, getCommentsByTaskId } = require('../controllers/task-comments.controller');
const router = express.Router();

// Route to add a comment to a task
router.post('/:taskId', addComment);

// Route to get comments for a specific task
router.get('/:taskId', getCommentsByTaskId);

module.exports = router;
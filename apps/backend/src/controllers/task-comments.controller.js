const taskCommentsService = require('../services/task-comments.service');

// Add a comment to a task
const addComment = async (req, res) => {
    const { taskId } = req.params;
    const { content } = req.body;

    try {
        const comment = await taskCommentsService.createComment(taskId, content);
        return res.status(201).json(comment);
    } catch (error) {
        return res.status(500).json({ message: 'Error adding comment', error: error.message });
    }
};

// Get comments by task ID
const getCommentsByTaskId = async (req, res) => {
    const { taskId } = req.params;

    try {
        const comments = await taskCommentsService.getCommentsByTaskId(taskId);
        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving comments', error: error.message });
    }
};

module.exports = { addComment, getCommentsByTaskId };
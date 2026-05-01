const TaskComment = require('../models/task-comments.model');

// Create a new comment
const createComment = async (taskId, content) => {
    const comment = new TaskComment({ taskId, content });
    return await comment.save();
};

// Get comments by task ID
const getCommentsByTaskId = async (taskId) => {
    return await TaskComment.find({ taskId });
};

module.exports = { createComment, getCommentsByTaskId };
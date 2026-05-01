const mongoose = require('mongoose');

const taskCommentSchema = new mongoose.Schema({
    taskId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Task' },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TaskComment', taskCommentSchema);
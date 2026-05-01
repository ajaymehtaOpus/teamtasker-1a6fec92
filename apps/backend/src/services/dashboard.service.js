const db = require('../models');

// Service to get total tasks by status
exports.getTasksByStatus = async () => {
    const tasks = await db.tasks.findAll();
    const statusCount = tasks.reduce((acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1;
        return acc;
    }, {});
    return statusCount;
};
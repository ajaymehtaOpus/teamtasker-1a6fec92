const dashboardService = require('../services/dashboard.service');

// Controller to get total tasks by status
exports.getTasksByStatus = async (req, res) => {
    try {
        const tasksStatus = await dashboardService.getTasksByStatus();
        return res.status(200).json(tasksStatus);
    } catch (error) {
        console.error('Error fetching tasks by status:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
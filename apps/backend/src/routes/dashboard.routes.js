const express = require('express');
const dashboardController = require('../controllers/dashboard.controller');
const router = express.Router();

// Route to get total tasks by status
router.get('/tasks/status', dashboardController.getTasksByStatus);

module.exports = router;
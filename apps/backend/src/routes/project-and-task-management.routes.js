const express = require('express');
const { createProject, assignTask, updateTaskStatus } = require('../controllers/project-and-task-management.controller');
const { authenticateJWT, authorizeRole } = require('../middleware/auth.middleware');

const router = express.Router();

// Route to create a new project
router.post('/projects', authenticateJWT, authorizeRole(['Manager']), createProject);

// Route to assign a task to a user
router.post('/tasks', authenticateJWT, authorizeRole(['Manager']), assignTask);

// Route to update task status
router.put('/tasks/:id/status', authenticateJWT, updateTaskStatus);

module.exports = router;
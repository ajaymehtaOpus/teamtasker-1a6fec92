const { body, validationResult } = require('express-validator');

// Validator for creating a new project
const validateProjectCreation = [
    body('name')
        .notEmpty().withMessage('Project name is required.')
        .isString().withMessage('Project name must be a string.')
        .isLength({ max: 255 }).withMessage('Project name must not exceed 255 characters.'),
    body('description')
        .optional()
        .isString().withMessage('Description must be a string.')
];

// Validator for assigning tasks
const validateTaskAssignment = [
    body('title')
        .notEmpty().withMessage('Task title is required.')
        .isString().withMessage('Task title must be a string.')
        .isLength({ max: 255 }).withMessage('Task title must not exceed 255 characters.'),
    body('status')
        .notEmpty().withMessage('Task status is required.')
        .isIn(['To Do', 'In Progress', 'Done']).withMessage('Status must be one of: To Do, In Progress, Done.'),
    body('project_id')
        .notEmpty().withMessage('Project ID is required.')
        .isInt().withMessage('Project ID must be an integer.'),
    body('assigned_to')
        .optional()
        .isInt().withMessage('Assigned user ID must be an integer.')
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateProjectCreation,
    validateTaskAssignment,
    handleValidationErrors
};
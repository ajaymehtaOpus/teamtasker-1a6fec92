const { body, validationResult } = require('express-validator');

// Validator for dashboard data
const dashboardValidator = [
    body('status')
        .optional()
        .isIn(['To Do', 'In Progress', 'Done'])
        .withMessage('Status must be one of the following: To Do, In Progress, Done'),
];

// Error handling middleware
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
    }
    next();
};

module.exports = {
    dashboardValidator,
    handleValidationErrors,
};
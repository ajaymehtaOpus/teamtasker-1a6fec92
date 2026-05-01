const { body, validationResult } = require('express-validator');

// Validator for role-based access control
const roleValidator = [
    body('role')
        .isIn(['Admin', 'Manager', 'Member'])
        .withMessage('Role must be one of the following: Admin, Manager, Member')
        .notEmpty()
        .withMessage('Role is required'),
];

// Middleware to validate role
const validateRole = (req, res, next) => {
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
    roleValidator,
    validateRole,
};
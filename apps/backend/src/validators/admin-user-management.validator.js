const { body, validationResult } = require('express-validator');

// Validation rules for creating and updating users
const userValidationRules = () => {
    return [
        body('email')
            .isEmail().withMessage('Must be a valid email address')
            .normalizeEmail(),
        body('password')
            .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('role')
            .isIn(['Admin', 'Manager', 'Member']).withMessage('Role must be Admin, Manager, or Member')
    ];
};

// Middleware to validate the request
const validateUser = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    next();
};

module.exports = {
    userValidationRules,
    validateUser
};
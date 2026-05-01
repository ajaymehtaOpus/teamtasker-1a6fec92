const { body, validationResult } = require('express-validator');

// Validation rules for user registration and login
const userRegistrationValidator = [
    body('email')
        .isEmail().withMessage('Please enter a valid email address.')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
];

const userLoginValidator = [
    body('email')
        .isEmail().withMessage('Please enter a valid email address.')
        .normalizeEmail(),
    body('password')
        .exists().withMessage('Password is required.')
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    next();
};

module.exports = {
    userRegistrationValidator,
    userLoginValidator,
    handleValidationErrors
};
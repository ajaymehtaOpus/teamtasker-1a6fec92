const { body, validationResult } = require('express-validator');

// Validator for task comments
const validateComment = [
    body('content')
        .notEmpty().withMessage('Comment content cannot be empty.')
        .isString().withMessage('Comment content must be a string.')
        .isLength({ max: 500 }).withMessage('Comment content cannot exceed 500 characters.'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        next();
    }
];

module.exports = { validateComment };
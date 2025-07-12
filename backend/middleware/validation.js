const { body, validationResult } = require('express-validator');

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg,
        value: error.value
      }))
    });
  }
  next();
};

// User registration validation
const validateRegistration = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
  
  body('location')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Location cannot exceed 100 characters'),
  
  body('skillsOffered')
    .isArray({ min: 1 })
    .withMessage('At least one skill offered is required'),
  
  body('skillsOffered.*')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Skill names must be between 1 and 50 characters'),
  
  body('skillsWanted')
    .isArray({ min: 1 })
    .withMessage('At least one skill wanted is required'),
  
  body('skillsWanted.*')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Skill names must be between 1 and 50 characters'),
  
  body('availability')
    .isObject()
    .withMessage('Availability must be an object'),
  
  body('availability.weekdays')
    .optional()
    .isBoolean()
    .withMessage('Weekdays availability must be a boolean'),
  
  body('availability.weekends')
    .optional()
    .isBoolean()
    .withMessage('Weekends availability must be a boolean'),
  
  body('availability.evenings')
    .optional()
    .isBoolean()
    .withMessage('Evenings availability must be a boolean'),
  
  body('availability.mornings')
    .optional()
    .isBoolean()
    .withMessage('Mornings availability must be a boolean'),
  
  handleValidationErrors
];

// User login validation
const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  
  handleValidationErrors
];

// Profile update validation
const validateProfileUpdate = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  
  body('location')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Location cannot exceed 100 characters'),
  
  body('skillsOffered')
    .optional()
    .isArray()
    .withMessage('Skills offered must be an array'),
  
  body('skillsOffered.*')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Skill names must be between 1 and 50 characters'),
  
  body('skillsWanted')
    .optional()
    .isArray()
    .withMessage('Skills wanted must be an array'),
  
  body('skillsWanted.*')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Skill names must be between 1 and 50 characters'),
  
  body('availability')
    .optional()
    .isObject()
    .withMessage('Availability must be an object'),
  
  body('isPublic')
    .optional()
    .isBoolean()
    .withMessage('isPublic must be a boolean'),
  
  handleValidationErrors
];

// Password reset validation
const validatePasswordReset = [
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
  
  handleValidationErrors
];

// Swap request validation
const validateSwapRequest = [
  body('recipientId')
    .isMongoId()
    .withMessage('Invalid recipient ID'),
  
  body('requestedSkill')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Requested skill must be between 1 and 50 characters'),
  
  body('offeredSkill')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Offered skill must be between 1 and 50 characters'),
  
  body('message')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Message cannot exceed 500 characters'),
  
  body('scheduledDate')
    .optional()
    .isISO8601()
    .withMessage('Scheduled date must be a valid date'),
  
  handleValidationErrors
];

// Rating validation
const validateRating = [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  
  body('comment')
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage('Comment cannot exceed 300 characters'),
  
  handleValidationErrors
];

// Search validation
const validateSearch = [
  body('query')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Search query must be between 1 and 100 characters'),
  
  body('skills')
    .optional()
    .isArray()
    .withMessage('Skills must be an array'),
  
  body('location')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Location cannot exceed 100 characters'),
  
  body('availability')
    .optional()
    .isObject()
    .withMessage('Availability must be an object'),
  
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  validateRegistration,
  validateLogin,
  validateProfileUpdate,
  validatePasswordReset,
  validateSwapRequest,
  validateRating,
  validateSearch
}; 
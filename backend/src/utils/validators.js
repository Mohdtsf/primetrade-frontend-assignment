const { body } = require("express-validator");

// REGISTER VALIDATION

exports.registerValidation = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name can only contain letters and spaces")
    .escape(),

  body("email")
    .exists({ checkFalsy: true })
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail()
    .isLength({ max: 100 })
    .withMessage("Email too long"),

  body("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 8, max: 128 })
    .withMessage("Password must be between 8 and 128 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[\W_]/)
    .withMessage("Password must contain at least one special character"),
];

// LOGIN VALIDATION

exports.loginValidation = [
  body("email")
    .exists({ checkFalsy: true })
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),

  body("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required")
    .isLength({ min: 8, max: 128 })
    .withMessage("Invalid credentials"),
];

// TASK VALIDATION

exports.taskValidation = [
  body("title")
    .exists({ checkFalsy: true })
    .withMessage("Task title is required")
    .isString()
    .withMessage("Title must be a string")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Title must be between 2 and 100 characters")
    .escape(),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters")
    .escape(),
];

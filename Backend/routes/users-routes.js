const express = require('express');
const { check } = require('express-validator');

const usersController = require('../controllers/user-controller');
const fileUpload = require('../middleware/file-upload')

const router = express.Router();

// GET /api/users - Fetch all users
router.get('/', usersController.getUsers);

// POST /api/users/signup - User registration with validation
router.post(
  '/signup',
  fileUpload.single('image'),
  [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('email')
      .normalizeEmail()
      .isEmail()
      .withMessage('Please enter a valid email'),
    check('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  usersController.signup
);

// POST /api/users/login - User login
router.post('/login', usersController.login);

module.exports = router;

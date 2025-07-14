const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// GET /api/users
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, '-password');
    res.json({ users: users.map(user => user.toObject({ getters: true })) });
  } catch (err) {
    console.error('Fetching users failed:', err);
    return next(new HttpError('Fetching users failed, please try again later.', 500));
  }
};

// POST /api/users/signup
const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }

  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new HttpError('User exists already, please login instead.', 422));
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const createdUser = new User({
      name,
      email,
      image: `uploads/images/${req.file?.filename || 'default.jpg'}`,
      password: hashedPassword,
      places: []
    });

    await createdUser.save();

    const token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      userId: createdUser.id,
      email: createdUser.email,
      token
    });
  } catch (err) {
    console.error('Signup process failed:', err);
    return next(new HttpError('Signing up failed, please try again later.', 500));
  }
};

// POST /api/users/login
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return next(new HttpError('Invalid credentials, could not log you in.', 401));
    }

    const isValidPassword = await bcrypt.compare(password, existingUser.password);
    if (!isValidPassword) {
      return next(new HttpError('Invalid credentials, could not log you in.', 401));
    }

    const token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      'supersecret_dont_share',
      { expiresIn: '1h' }
    );

    res.json({
      userId: existingUser.id,
      email: existingUser.email,
      token
    });
  } catch (err) {
    console.error('Login process failed:', err);
    return next(new HttpError('Logging in failed, please try again later.', 500));
  }
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;

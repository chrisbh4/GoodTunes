const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const db = require('../db/models')
const { csrfProtection, asyncHandler } = require('./utils');
const { check, validationResult } = require('express-validator');
// const { check } = require('yargs');
const { User } = db

const hashedPassword = async (password, salt) => {
  const hash = await bcrypt.hash(password, salt)
  return hash
}

const userValidators = [
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for username')
    .isLength({ max: 30 })
    .withMessage('Username must not be more than 30 characters long'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for password')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
    .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
  check('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for confirm password')
    .isLength({ max: 15 })
    .withMessage('Confirm Password must not be more than 50 characters long')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Confirm Password does not match Password');
      }
      return true;
    }),
]

router.get('/signup', csrfProtection, (req, res) => {
  res.render('sign-up', { csrfToken: req.csrfToken() })
})
/* GET users listing. */
router.post('/signup', csrfProtection, userValidators, asyncHandler(async (req, res, next) => {
  const { username, password } = req.body

  const hashedPw = hashedPassword(password, 10)

  const user = User.build({ username })

  const validatorErrors = validationResult(req)

  if (validatorErrors.isEmpty()) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.hashedPassword = hashedPassword;
    await user.save();
    //TODO loginUser
    res.redirect('/users/signup')
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('user-register', {
      title: 'Register',
      user,
      errors,         //TODO display error messages in pug file
      csrfToken: req.csrfToken(),
    })
  }
}));

module.exports = router;

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { check, validationResult } = require('express-validator');
const { User } = db
const { loginUser, logoutUser, requireAuth} = require('../auth')

const hashedPassword = async (password, salt) => {
  const hash = await bcrypt.hash(password, salt)
  return hash
};

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
  res.render('sign-up', { csrfToken: req.csrfToken(), title: 'Sign-Up' })
})

router.post('/signup', csrfProtection, userValidators, asyncHandler(async (req, res, next) => {
  const { username, password } = req.body
  const user = User.build({ username })
  const validatorErrors = validationResult(req)

  if (validatorErrors.isEmpty()) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.hashedPassword = hashedPassword;
    await user.save();
    loginUser( req, res , user);

    res.redirect('/')
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

router.get('/login', csrfProtection, (req, res) => {
  res.render("login", {csrfToken: req.csrfToken(), title: 'Log In'})
})

const loginValidators = [
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for username'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for password'),
]

router.post('/login', csrfProtection, loginValidators, asyncHandler(async(req, res, next) => {
  const { username, password } = req.body
  let errors = []
  const validatorErrors = validationResult(req)
  if (validatorErrors.isEmpty()) {
    const user = await User.findOne({ where: { username }})
    if (user !== null) {
      const isPassword = await bcrypt.compare(password, user.hashedPassword.toString())
        if (isPassword) {
        loginUser( req , res , user);
        return res.redirect('/users/layout')
      }
  }
  errors.push("Log in failed for the provided username and password")
} else {
  errors = validatorErrors.array().map(error => error.msg)
}
res.render('login', {title: 'Log in', username, errors, csrfToken: req.csrfToken()})
}))

router.get('/layout', requireAuth , ( req , res )=>{
  res.render('user-layout')
});

router.post('/logout', (req , res )=>{
  logoutUser(req, res );
  req.session.destroy()
  res.redirect('/users/login');
})

module.exports = router;

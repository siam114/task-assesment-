const express = require('express');
const { register, login } = require('../controllers/auth.controller');
const { body } = require('express-validator');
const validateRequest = require('../middlewares/validate.request');

const router = express.Router();

router.post(
  '/register',
  [
    body('name')
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ min: 2 })
      .withMessage('Name must be at least 2 characters'),
    body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ],
  validateRequest,
  register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
    body('password')
      .notEmpty()
      .withMessage('Password is required'),
  ],
  validateRequest,
  login
);

// router.get('/me', authMiddleware, async (req, res) => {
//   const user = await User.findById(req.user.id).select('-password');
//   res.json(user);
// });

module.exports = router;
const express = require('express');
const user = require('./../controllers/user');

const auth = require('../controllers/auth')

const router = express.Router();

// auth controller routes
router.post('/signup', auth.signUp)
router.post('/login', auth.login)

router.post('/forgot-password', auth.forgotPassword)
router.patch('/reset-password/:token', auth.resetPassword)
router.patch('/update-password', auth.protect, auth.updatePassword);

router.patch('/update-me', auth.protect, user.updateMe)

// user controller routes
router.route('/').get(user.getAllUsers).post(user.createUser);

router.route('/:id').get(user.getUser).patch(user.updateUser).delete(user.deleteUser);

module.exports = router;

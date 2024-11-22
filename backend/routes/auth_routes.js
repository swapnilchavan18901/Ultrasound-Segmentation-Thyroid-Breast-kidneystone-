const express = require('express');
const { registerValidation, sendOTPValidation, verfiyValidation, loginValidation, forgotPasswordValidation, resetPasswordValidation } = require('../validators/auth_validator');
const { register, sendOTPEmail, verify, login, forgotPasswordController, resetPasswordController } = require('../controllers/auth_controller');

const router = express.Router();

router.post('/register', registerValidation, register);
router.post('/sendOTP', sendOTPValidation, sendOTPEmail);
router.post('/verify', verfiyValidation, verify);
router.post('/login', loginValidation, login);

/**
 * POST /auth/forgotPassword
 * Request a password reset
 */
router.post('/forgotPassword', forgotPasswordValidation, forgotPasswordController);
router.post('/resetPassword', resetPasswordValidation, resetPasswordController);

module.exports = router;
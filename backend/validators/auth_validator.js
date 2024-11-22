const { check } = require('express-validator');

const registerValidation = [
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
];

const sendOTPValidation = [
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
];

const verfiyValidation = [
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('code', 'Verification code is required').not().isEmpty(),
];

const loginValidation = [
    check('email', 'Email is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
];

const forgotPasswordValidation = [
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
];

const resetPasswordValidation = [
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('otp', 'OTP is required').not().isEmpty(),
    check('newPassword', 'Password is required').not().isEmpty(),
    check('newPassword', 'Password must be at least 6 characters long').isLength({ min: 6 }),
];

module.exports = { registerValidation, sendOTPValidation, verfiyValidation, loginValidation, forgotPasswordValidation, resetPasswordValidation };
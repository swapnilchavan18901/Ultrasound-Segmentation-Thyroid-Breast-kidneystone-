const { registerUser, sendOTP, verifyUser, loginUser, forgotPassword, resetPassword } = require('../services/user_services');
const { validationResult } = require('express-validator');
const statusCode = require('../utils/status_codes');

const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.formatError(errors.array(), 'Error', statusCode.BAD_REQUEST);
    }

    const { email, password } = req.body;
    try {
        await registerUser(email, password);
        res.formatResponse('User registered. Please check your email for verification code.', 'User registered successfully.', statusCode.CREATED);
    } catch (err) {
        res.formatError(err.message, 'Error registering user.', statusCode.INTERNAL_SERVER_ERROR);
    }
};

const sendOTPEmail = async (req, res) => {
    const { email } = req.body;
    try {
        await sendOTP(email);
        res.formatResponse('OTP sent successfully', 'OTP sent successfully', statusCode.SUCCESS);
    } catch (err) {
        res.formatError(err.message, 'Error is sending OTP.', statusCode.INTERNAL_SERVER_ERROR);
    }
};

const verify = async (req, res) => {
    const { email, code } = req.body;
    try {
        await verifyUser(email, code);
        res.formatResponse('Email verified successfully', 'Email verified successfully', statusCode.SUCCESS);
    } catch (err) {
        res.formatError(err.message, 'Error in verifying OTP.', statusCode.INTERNAL_SERVER_ERROR);
    }
};

const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.formatError(errors.array(), 'Error missing field.', statusCode.BAD_REQUEST);
    }

    const { email, password } = req.body;
    try {
        const data = await loginUser(email, password);
        res.formatResponse(data, 'Login successfull', statusCode.SUCCESS);
    } catch (err) {
        res.formatError(err.message, 'Error during log in.', statusCode.INTERNAL_SERVER_ERROR);
    }
};

const forgotPasswordController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.formatError(errors.array(), 'Error missing field.', statusCode.BAD_REQUEST);
    }

    const { email } = req.body;
    try {
        await forgotPassword(email);
        res.formatResponse('OTP sent to your email.', 'OTP created successfully.', statusCode.SUCCESS);
    } catch (err) {
        res.formatError(err.message, 'Error creating OTP.', statusCode.INTERNAL_SERVER_ERROR);
    }
};

const resetPasswordController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.formatError(errors.array(), 'Error missing field.', statusCode.BAD_REQUEST);
    }

    const { email, otp, newPassword } = req.body;
    try {
        await resetPassword(email, otp, newPassword);
        res.formatResponse('Password reset successfully.', 'Password reset successfully.', statusCode.SUCCESS);
    } catch (err) {
        res.formatError(err.message, 'Error resetting password', statusCode.INTERNAL_SERVER_ERROR);
    }
};

module.exports = { register, sendOTPEmail, verify, login, forgotPasswordController, resetPasswordController };
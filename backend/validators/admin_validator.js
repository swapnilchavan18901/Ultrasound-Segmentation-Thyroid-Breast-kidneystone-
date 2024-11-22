const { check } = require('express-validator');

const registerUserByAdminValidation = [
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
    check('role', 'Role is required').not().isEmpty().isIn(['Clinician', 'Patient']),
];

module.exports = { registerUserByAdminValidation };
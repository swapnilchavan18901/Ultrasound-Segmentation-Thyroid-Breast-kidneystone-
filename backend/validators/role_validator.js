const { check } = require('express-validator');

const assignRoleValidation = [
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('role', 'Role is required').not().isEmpty().isIn(['Admin', 'Clinician', 'Patient']),
];

module.exports = { assignRoleValidation };
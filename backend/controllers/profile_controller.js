const { getUserProfile } = require('../services/user_services');

const getProfile = async (req, res) => {
    try {
        const user = await getUserProfile(req.user.userId);
        if (!user) {
            return res.formatError(user, 'User not found', statusCode.BAD_REQUEST);
        }
        res.formatResponse(user, statusCode.SUCCESS);
    } catch (err) {
        res.formatError(err.message, 'EError fetching profile.', statusCode.INTERNAL_SERVER_ERROR);
    }
};

module.exports = { getProfile };

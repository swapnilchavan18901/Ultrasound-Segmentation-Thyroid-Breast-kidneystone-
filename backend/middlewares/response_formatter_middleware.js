const statusCodes = require('../utils/status_codes');

const responseFormatter = (req, res, next) => {
    res.formatResponse = (data, message = 'Success', status = statusCodes.SUCCESS) => {
        res.status(status).json({
            status: status,
            message: message,
            data: data
        });
    };

    res.formatError = (error, message = 'Error', status = statusCodes.INTERNAL_SERVER_ERROR) => {
        res.status(status).json({
          status: status,
          message: message,
          error: error.message || error
        });
    };
    next();
};

module.exports = responseFormatter;


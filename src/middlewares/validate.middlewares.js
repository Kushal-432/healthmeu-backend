const log = require('../config/log');
const { errorResponse } = require('../utils/response/response');

function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      log.warn(`Validation failed: ${error.message}`);
      return errorResponse(res, error, 'Validation Error', 400);
    }
    next();
  };
}

module.exports = validate;
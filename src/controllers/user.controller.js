const userService = require('../services/user.service');
const { successResponse, errorResponse } = require('../utils/response/response');
const logger = require('../config/log');
exports.getLoggedInUser = async (req, res) => {
  try {
    const users = await userService.getLoggedInUser(req.params.id);
    logger.info('Users retrieved successfully');
    return successResponse(res, users, 'Users retrieved successfully', 200);
  } catch (error) {
    return errorResponse(res, error, 'Failed to retrieve users', 500);
  }
};

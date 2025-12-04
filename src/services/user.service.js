const { where } = require('sequelize');
const log = require('../config/log');
const { User } = require('../database/models'); // Import from index.js for proper model resolution

/**
 * Fetch all users from the database
 * @returns {Promise<Array>}
 */
const getLoggedInUser = async (id) => {
  try {
    const user = await User.findOne({where:{id:id}});
    return user;
  } catch (error) {
    log.error('Error fetching users:', error);
    throw error; // Let controller handle the error
  }
};

module.exports = {
  getLoggedInUser
};

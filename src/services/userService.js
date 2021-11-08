
const User = require('../models/user');

const getUser = async (query) => {
  try {
    const user = await User.findOne(query).select('+password');
    if (!user || !user.status) {
      throw Error('User not found or not active');
    }

    return user;
  } catch (err) {
    throw Error(err);
  }
};

const getSingleUserService = async (query) => {
  try {
    const user = await User.findOne(query).select('+password');
    return user;
  } catch (err) {
    throw Error(err);
  }
};

const getUsers = async (condition) => {
  try {
    const users = await User.find(condition).sort({ createdAt: "descending" });;
    return users;
  } catch (err) {
    throw Error(err);
  }
};

const getActiveUsers = async (query) => {
  try {
    const user = await User.find(query).find({ user_type: ['farmer','aggregator', 'enumerator', 'consumer', 'producer', 'institution', 'end_user'] });
    return user;
  } catch (err) {
    throw Error(err);
  }
};

const getUsersCount = async (condition) => {
  try {
    const users = await User.find(condition).count().sort({ createdAt: "descending" });;
    return users;
  } catch (err) {
    throw Error(err);
  }
};

module.exports = {
  getUser,
  getUsers,
  getActiveUsers,
  getSingleUserService,
  getUsersCount
};

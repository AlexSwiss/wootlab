
const Car = require('../models/Car');

const getCars = async (condition) => {
  try {
    const cars = await Car.find(condition).sort({ createdAt: "descending" });;
    return cars;
  } catch (err) {
    throw Error(err);
  }
};


module.exports = {
  getCars,
};

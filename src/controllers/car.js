const Car = require("../models/Car");
const User = require("../models/User");
const asyncHandler = require("../middlewares/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const SuccessResponse = require("../utils/successResponse");
const { getCars } = require("../services/carService");

// @route POST api/car/new
// @desc Add Car
// @access Public
exports.add = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  console.log(userId);
  const user = await User.findOne({ _id: userId });

  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }

  const { car_model, car_year, license_plate, current_km, max_load_km, fuel_type } = req.body;

  const newCar = {
    user_id: userId,
    car_model,
    car_year, 
    license_plate,
    current_km,
    max_load_km,
    fuel_type
  };

  // create car details
  const car_ = await Car.create(newCar);

  SuccessResponse(res, 200, "Car has added successfully", car_);
});

// @route GET api/car/all
// @desc Retrieve all cars from the database.
// @access Public
exports.getAllCars = async (req, res) => {
  try {
    const totalCars = await getCars({});

    return res.status(200).json({ data: totalCars });
  } catch (err) {
    return res.status(400).json({ error_msg: err.message });
  }
};

// @route GET api/car/:id
// @desc Find a single car with an id
// @access Public
exports.findOne = asyncHandler(async (req, res) => {
  const id = req.params.id;
  car = await Car.findById(id);

  if (!car) {
    throw new ErrorResponse("Car does not exist", 404);
  }

  SuccessResponse(res, 200, "Car fetched successfully", car);
});

// @route DELETE api/car/:id
// @desc Delete a Car with the specified id in the request
// @access Public
exports.delete = asyncHandler(async (req, res) => {
  const id = req.params.id;

  car = await Car.findByIdAndRemove(id);

  if (!car) {
    throw new ErrorResponse("Car not found", 404);
  }

  SuccessResponse(res, 200, "Car removed successfully");
});

// @route POST api/user/update
// @desc Update Profile
// @access Public
exports.updateCar = asyncHandler(async (req, res) => {
  const update = req.body;
  const id = req.params.id;

  const car = await Car.findByIdAndUpdate(
    id,
    { $set: update },
    { new: true }
  );
  
 if (car) {
    return SuccessResponse(res, 200, "Car has been updated", car);
  }

});
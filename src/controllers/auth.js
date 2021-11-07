const User = require("../models/User");
const asyncHandler = require("../middlewares/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const SuccessResponse = require("../utils/successResponse");

// @route POST api/auth/register
// @desc Register user
// @access Public
exports.register = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // Make sure this account doesn't already exist
  const user = await User.findOne({ email });

  if (user) {
    throw new ErrorResponse("The email you entered is already associated with another account.", 400 );
  }

  const newUser = new User({ ...req.body, role: "basic" });

  const user_ = await newUser.save();

  SuccessResponse(res, 200, "Registration successful", user_);

});


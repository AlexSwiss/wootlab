const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/asyncHandler');
const loginResponse = require('../utils/loginResponse')

// @route POST /api/auth/login
// @desc Login user
// @access  Public
exports.signIn = asyncHandler(async (req, res, next) => {
    const { email, phone_number, password } = req.body;
    const user = await User.findOne({ $or: [ {"phone_number": phone_number},{"email": email}] }).select('+password');

    console.log(user)
   
    if (!user || user.status === false) {
        return next(new ErrorResponse('Invalid Credentials', 400))
    };
    
    const validatePassword = await user.comparePassword(password);
   
    if (!validatePassword) {
        return next(new ErrorResponse('Incorrect Password', 401))
    };

    loginResponse(user, 'Logged in successfully', 200, res)
})

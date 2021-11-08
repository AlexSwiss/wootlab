const loginResponse = async (user, message, statusCode, res) => {
  
    const token = await user.generateAuthToken()
    await token.save()

    const { _id, first_name, last_name, phone_number, email} = user;

    res.status(statusCode).json({
      status: 'success',
      message,
      data: {_id, first_name, last_name, phone_number, email, token}
    });
  };
  
  module.exports = loginResponse;
 
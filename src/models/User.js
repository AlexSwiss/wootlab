const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment')
const validator = require('validator');
const crypto = require('crypto');
const mongoose = require('mongoose');
const Token = require('./token');
const Schema = mongoose.Schema;

//create schema
const UserSchema = new Schema({
  first_name: {
    type: String,
    trim: true,
    lowercase: true
  },
  last_name: {
    type: String,
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  phone_number: {
    type: String,
    required: [true, "Please enter your phone number"],
    unique: true, 
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [8, "Password cannot be less than 8 characters"],
    maxLength: [15, "Password should be between 8 and 15 characters"],
    select: false,
  },
}, {timestamps: true});


UserSchema.pre('save',  function(next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateAuthToken = async function (type) {
  let loginToken = {
    user_id: this._id,
    token: jwt.sign({ _id: this._id.toString()}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}
  return new Token(loginToken)
};

module.exports = mongoose.model('users', UserSchema);
 

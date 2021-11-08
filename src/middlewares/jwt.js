//Imports
const User = require("../models/User");

//authenticate user
const jwt = require("jsonwebtoken");

module.exports = { checkUser: function(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Auth Error" });
  console.log(token)
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
}}

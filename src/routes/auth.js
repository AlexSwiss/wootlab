const express = require('express');
const Auth = require('../controllers/auth');
const { signIn } = require('../controllers/login');

const router = express.Router();


router.get('/', (req, res) => {
  res.status(200).json({message: "You are in the Auth Endpoint. Register or Login to test Authentication."});
});

router.post('/register', Auth.register);
router.post('/login', signIn)

module.exports = router;

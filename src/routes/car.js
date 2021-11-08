const express = require('express');

const Car = require('../controllers/car');
const checkAuth = require('../middlewares/jwt');

const { checkUser } = checkAuth;

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({message: "You are in the Car Endpoint."});
});

 router.post('/new',  checkUser, Car.add);
 
 router.get('/all', checkUser, Car.getAllCars);

// router.get('/update/:id', checkUser, Livestock.findOne);

// router.delete('/delete/:id', checkUser, Livestock.delete);


module.exports = router;

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

 router.get('/single/:id', checkUser, Car.findOne);

 router.delete('/delete/:id', checkUser, Car.delete);

 router.patch('/update/:id', checkUser, Car.updateCar);



module.exports = router;

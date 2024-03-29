const auth = require('./auth');
const car = require('./car');

module.exports = app => {
  app.get('/', (req, res) => {
    res.status(200).send({ message: "Welcome to our Ryda API..."});
  }); 

  app.use('/api/auth', auth);
  app.use('/api/car', car);

};

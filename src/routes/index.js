const auth = require('./auth');

module.exports = app => {
  app.get('/', (req, res) => {
    res.status(200).send({ message: "Welcome to the Wootlab API..."});
  }); 

  app.use('/api/auth', auth);

};

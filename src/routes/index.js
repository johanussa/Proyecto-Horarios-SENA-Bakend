const express = require('express');
const UserRoutes = require('./userRoutes');
const LoginRoute = require('./loginRoute');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/', LoginRoute);
  router.use('/users', UserRoutes);
}

module.exports = routerApi;
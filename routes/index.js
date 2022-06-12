const express = require('express');

const patientsRouter = require('./patients.router');
const officesRouter = require('./offices.router');
const usersRouter = require('./users.router');


function routesApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/patients', patientsRouter);
  router.use('/offices', officesRouter);
  router.use('/users', usersRouter);
}

module.exports = routesApi;

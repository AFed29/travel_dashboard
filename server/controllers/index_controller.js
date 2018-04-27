const express = require('express');
const router = new express.Router();
const createVisitedRouter = require('./visited_controller.js')
const createToVisitRouter = require('./to_visit_controller.js')


const createIndexRouter = function(dbConnection){

  router.use('/visited', createVisitedRouter(dbConnection));
  // router.use('/tovisit', createToVisitRouter(dbConnection));

  return router;
}

module.exports = createIndexRouter;

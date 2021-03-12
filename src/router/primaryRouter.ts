import express = require('express');
import FinanceController from '../controller/financeController';
import { swaggerDocument } from '../Swagger/swaggerDocument';
const swaggerUi = require('swagger-ui-express');

// TODO: Make a Swagger Router
function primaryRouter(): express.Router {
  const router = express.Router();
  const controller = new FinanceController();

  router.get("/home", controller.getAll);
  router.get('/fin/:id', controller.get);

  router.use('api-docs', swaggerUi.serve);
  router.get('api-docs', swaggerUi.setup(swaggerDocument));

  return router;
}

export default primaryRouter;

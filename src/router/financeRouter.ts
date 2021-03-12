import express = require('express');
import FinanceController from '../controller/financeController';

function financeRouter(): express.Router {
  const router = express.Router();
  const financeController = new FinanceController();
  router.get('/get', financeController.getAll);
  return router;
}

export default financeRouter;

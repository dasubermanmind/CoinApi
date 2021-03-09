import express = require("express")
import FinanceController from "../controller/financeController";
import { swaggerDocument } from "../Swagger/swaggerDocument";
const swaggerUi = require('swagger-ui-express');

// TODO: Make a Swagger Router
function primaryRouter(): express.Router{
    const router = express.Router();
    const controller  = new FinanceController();
    router.route("/fin").get(controller.getAll);
    router.route("/fin/:id").get(controller.get);
    router.use('/api-docs', swaggerUi.serve);
    router.get('/api-docs', swaggerUi.setup(swaggerDocument));

    return router;
}

export default primaryRouter;
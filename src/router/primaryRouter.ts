import express = require("express")
import FinanceController from "../controller/financeController";

function primaryRouter(): express.Router{
    const router = express.Router();
    const controller  = new FinanceController();
    router.get("/fin", controller.getAll);
    return router;
}

export default primaryRouter;
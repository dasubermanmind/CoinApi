import { Router } from 'express';
import express = require("express")
import FinanceController from "../controller/financeController";

function primaryRouter(): express.Router{

    const router = express.Router();
    const financeController  = new FinanceController();
    router.get("/get", financeController.getAll);
    return router;
}

export default primaryRouter;
import { NextFunction, Request, Response, Router } from 'express';
import financeController from '../controller/financeController';

class financeRouter{
    private router = Router();
    private controller = financeController;


    get _router() {
        return this.router;
    }

    constructor(){
        this.configure();
    }

    configure = ()=>{
        this.router.get('/', (request: Request, response: Response) =>{
            response.status(200).json(this.controller.get());
        });
    }
}

export = new financeRouter()._router;
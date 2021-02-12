import {Router} from 'express';
import financeRouter from './financeRouter';

class primaryRouter{

    private router = Router();
    private financeRouter = financeRouter;

    get _router(){
        return this.router;
    }

    constructor(){
        this.configure();
    }

    private configure = ()=>{
        this.router.use('/finance', this.financeRouter);
    };


}

export = new primaryRouter()._router;
import dotenv from 'dotenv';
import express = require("express");
import primaryRouter from './router/primaryRouter';
import {ConnectionOptions, createConnection} from 'typeorm';
import financeRouter from './router/financeRouter';

dotenv.config({
  path: '.env'
});

export interface Iresults{
  success: boolean;
  error: string;
}

class App {

  public application: express.Application;
  public prim_router = primaryRouter;
  public fin_router = financeRouter;
  public db: ConnectionOptions;

  constructor(db: ConnectionOptions){
    if(!db){
      console.log('no db configs found');
    }
    this.db = db;
    this.application = express.application;
  }

  public async initialize(): Promise<Iresults>{
    const results: Iresults = {success: false, error: ''};
    try{
      const dbApp = await createConnection(this.db);
      await dbApp.runMigrations();
    }catch(error){
      results.error = 'Db connect failed';
    }
    this.mountPoints();
    results.success = true;
    return results;
  }

  public mountPoints() : void {
    this.application.use('localhost:3000' + "/api", this.prim_router);
    this.application.use('localhost:3000' + '/finance', this.fin_router);
  }
}

export default App;

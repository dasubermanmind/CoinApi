import express = require("express");
import routers from './router';
import { ConnectionOptions, createConnection } from 'typeorm';
import "reflect-metadata";

export interface Iresults{
  success: boolean;
  error: string;
}

class App {

  public application: express.Application;
  public db: ConnectionOptions;

  constructor(db: ConnectionOptions){
    if(!db){
      console.log('no db configs found');
    }
    this.application = express();
    this.db = db;
  }

  public async initialize(): Promise<Iresults>{
    const results: Iresults = { success: false, error: '' };
    try{
      console.log('db');
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
    this.application.use('http://localhost:3000/', routers.primary());
  }
}

export default App;

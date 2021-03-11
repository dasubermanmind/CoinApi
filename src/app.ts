import express = require("express");
import session from "express-session";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import routers from './router';
import { ConnectionOptions, createConnection } from 'typeorm';
import "reflect-metadata";
import * as crypto from "crypto";

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

  public async sessionManagement(): Promise<void>{
    this.application.use(bodyParser.json());
    this.application.use(bodyParser.urlencoded({extended: true}));
    // TODO: Need to research and implement genuid()
    // TODO: Implement Redis data store
    this.application.use(session({
      secret: process.env.sessionSecret,
      cookie: {
        httpOnly: true,
        secure: true,
        sameSite: true,
        maxAge: 600000.
      }
    }));

    this.application.set('trust proxy',1);
    this.application.use(cookieSession({ keys: [process.env.cookieSession] }))
  }

  public mountPoints() : void {
    this.application.use('http://localhost:3000/', routers.primary());
  }
}

export default App;

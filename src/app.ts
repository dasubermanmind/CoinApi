import express = require("express");
import session from "express-session";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import routers from './router';
import { ConnectionOptions, createConnection } from 'typeorm';
import "reflect-metadata";
import { RedisClient } from "redis";
const redis = require('redis');
let RedisStore = require('connect-redis')(session);

export interface Iresults{
  success: boolean;
  error: string;
}

class App {

  public application: express.Application;
  public db: ConnectionOptions;
  private redisClient: RedisClient

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

  public async sessionManagement(): Promise<void> {

    this.redisClient = new RedisClient({
      port: 6379, // TODO: WHen updating the docker-compos make sure this matches
      host: '127.0.0.1',
      password  : process.env.REDIS_PASSWORD,
    });

    this.application.use(bodyParser.json());
    this.application.use(bodyParser.urlencoded({ extended: true }));
    // TODO: Need to research and implement genuid()
    // TODO: Implement Redis data store
    this.application.use(session({
      secret: process.env.SESSION_SECRET,
      cookie: {
        httpOnly: true,
        secure: true,
        sameSite: true,
        maxAge: 600000.
      },
      store: new RedisStore({ client: this.redisClient ,ttl: 86400}),
      resave: false
    }));

    /* This should go in user router/controller which ever makes more sense
    const sessionChecker = (request, response, next) => {
      if (request.session.user && request.cookies.user_sid) {
        response.redirect('/dashboard');
      } else {
        next();
      }
    };
    */
    this.application.set('trust proxy',1);
    this.application.use(cookieSession({ keys: [ process.env.COOKIE_SESSION ] }))
  }

  public mountPoints() : void {
    this.application.use('http://localhost:3000/', routers.primary());
  }
}

export default App;

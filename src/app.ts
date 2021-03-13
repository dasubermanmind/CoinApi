import express = require('express');
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import routers from './router';
import { ConnectionOptions, createConnection } from 'typeorm';
import 'reflect-metadata';
import { RedisClient } from 'redis';
import { IResults } from '@/Types/types';
import passport from 'passport';

class App {
  public application: express.Application;
  public db: ConnectionOptions;
  public redisClient: RedisClient;

  constructor(db: ConnectionOptions) {
    if (!db) {
      console.log('no db configs found');
    }

    this.application = express();
    this.db = db;
  }

  public async initialize(): Promise<IResults> {
    const results: IResults = { success: false, error: '' };
    try {
      console.log('db');
      const dbApp = await createConnection(this.db);
      await dbApp.runMigrations();
    } catch (error) {
      results.error = 'Db connect failed';
    }

    this.mountPoints();
    results.success = true;
    return results;
  }

  public async sessionManagement(): Promise<void> {
    let RedisStore = require('connect-redis')(express);

    this.redisClient = new RedisClient({
      port: 6379, // TODO: WHen updating the docker-compos make sure this matches
      host: '127.0.0.1'
    });

    this.application.use(bodyParser.json());
    this.application.use(bodyParser.urlencoded({ extended: true }));
    // TODO: Need to research and implement genuid()
    this.application.use(
      session({
        secret: process.env.SESSION_SECRET,
        cookie: {
          httpOnly: true,
          secure: true,
          sameSite: true,
          maxAge: 600000
        },
        store: new RedisStore({
          client: this.redisClient,
          ttl: 86400,
          prefix: `crypt-session:`
        }),
        resave: false
      })
    );

    this.application.set('trust proxy', 1);
    this.application.use(cookieSession({ keys: [process.env.COOKIE_SESSION] }));
  }

  public mountPoints(): void {
    this.application.use('/', routers.primary());
    this.application.use('/finance', routers.finance());
    this.application.use('/user', routers.user());
    // this.application.use(passport.initialize());
    // this.application.use(passport.session());
  }
}

export default App;

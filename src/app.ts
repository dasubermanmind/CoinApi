import dotenv from 'dotenv';
import express from 'express';
import primaryRouter from './router/primaryRouter';
import {ConnectionOptions, createConnection} from 'typeorm';
import {db} from './config';

dotenv.config({
  path: '.env'
});

export interface Iresults{
  success: boolean;
  error: string;
}


class Server {
  public app = express();
  public router = primaryRouter;
  private db: ConnectionOptions;

  constructor(db: ConnectionOptions){
    
    if(!db){
      console.log('no db configs found');
    }
    
    // initilize the db connection
    this.db = db;
  }

}

const server = new Server(db());

// server.init().then((ini: Iresults)=>{
//     // if(ini.success){
//     // }
//   });

server.app.use('/api', server.router);

((port = process.env.APP_PORT || 5000) => {
  server.app.listen(port, () => console.log(`> Listening on port ${port}`));
})();


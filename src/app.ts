import dotenv from 'dotenv';
import express from 'express';
import primaryRouter from './router/primaryRouter';

dotenv.config({
  path: '.env'
});

class Server {
  public app = express();
  public router = primaryRouter;
}

const server = new Server();

server.app.use('/api', server.router);

((port = process.env.APP_PORT || 5000) => {
  server.app.listen(port, () => console.log(`> Listening on port ${port}`));
})();


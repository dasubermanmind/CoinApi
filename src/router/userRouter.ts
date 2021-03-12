import express = require('express');

function userRouter(): express.Router {
  const router = express.Router();

  // user controller
  /*
    router.get('/fin', controller.getAll);
    router.get('/fin/:id', controller.get);
    */
  return router;
}

export default userRouter;

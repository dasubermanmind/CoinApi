import express = require('express');
import passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

function userRouter(): express.Router {
  const router = express.Router();

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT,
        clientSecret: process.env.GOOGLE_SECRET,
        callback: '/user/auth/google/callback'
      },
      (accessToken) => {
        console.log('accessToken', accessToken);
      }
    )
  );

  router.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  router.get('/user/auth/google/callback', passport.authenticate('google'));
  // user controller
  /*
    router.get('/fin', controller.getAll);
    router.get('/fin/:id', controller.get);
    */
  return router;
}

export default userRouter;

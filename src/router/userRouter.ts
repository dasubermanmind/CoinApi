import express = require('express');
import passport = require('passport');
import {createUser} from "../Repository/UserRepository";
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
      (accessToken, refreshToken, profile, done) => {
          console.log('profile', profile);
        createUser(profile);
        console.log('accessToken', accessToken);
        done();
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
  return router;
}

export default userRouter;

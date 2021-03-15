import express = require('express');
import passport = require('passport');
import { createUser } from '../Repository/UserRepository';
import { User } from '@/entities/user';
import UserController from '@/controller/userController';
const GoogleStrategy = require('passport-google-oauth20');

function userRouter(): express.Router {
  const router = express.Router();
  const controller = new UserController();

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

  passport.serializeUser((user: User, done) => {
    done(null, user);
  });

  passport.deserializeUser((user: User, done) => {
    done(null, user);
  });

  router.get('/user/auth/google/callback', passport.authenticate('google'));
  router.get(
    '/defineLater',
    controller.isUserAuthenticated,
    (request, response) => {
      response.send('Nice');
    }
  );

  router.get('/logout', (request, response) => {
    request.logout();
    response.redirect('/');
  });

  return router;
}

export default userRouter;

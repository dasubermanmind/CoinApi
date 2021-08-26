import { Request, Response } from 'express';
import { getUser } from '../Repository/UserRepository';

export default class UserController {
  get = async (request: Request, response: Response): Promise<Response> => {
    try {
      const { id } = request.params;
      const resp = getUser(parseInt(id));
      return response.status(200).send(resp);
    } catch (error) {
      console.error(error);
      return response.sendStatus(500);
    }
  };

  sessionChecker = (request: Request, response: Response, next) => {
    if (request.session[0] && request.cookies.user_sid) {
      response.redirect('/home');
    } else {
      next();
    }
  };

  isUserAuthenticated = (request, response, next): void => {
    if (request.user) {
      next();
    } else {
      response.send('Please login to have full functionality');
    }
  };
}

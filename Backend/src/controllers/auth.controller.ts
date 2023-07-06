import { NextFunction, Request, Response } from 'express';

import AuthService from './../services/auth.services';

export default class AuthController {

  static loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await AuthService.loginUser(req.body)
      .then(result => res.status(200).json(result))
      .catch(err => next(err));
  };

  static registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await AuthService.registerUser(req.body, res.locals.files)
      .then(message => res.status(200).json(message))
      .catch(err => next(err));
  };

  static changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await AuthService.changePassword(req.body, res.locals.user)
      .then(message => res.status(200).json(message))
      .catch(err => next(err));
  }

  static resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await AuthService.resetPassword(req.body)
      .then(user => res.status(200).json(user))
      .catch(err => next(err));
  }

  static sendResetPassEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await AuthService.sendResetPassEmail(req.body)
      .then(user => res.status(200).json(user))
      .catch(err => next(err));
  }
}

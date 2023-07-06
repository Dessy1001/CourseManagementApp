import { NextFunction, Request, Response } from 'express';

import UserService from './../services/user.service';

export default class UserController {

  static getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await UserService.getUsers()
      .then(result => res.status(200).json(result))
      .catch(err => next(err));
  };

  static getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log(req.params['id']);
    await UserService.getUserById(req.params['id'])
      .then(result => res.status(200).json(result))
      .catch(err => next(err));
  };

  static updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = req.params.id;
    const userData = req.body;
    
    await UserService.updateUser(userId, userData, res.locals.files)
      .then(updatedUser => res.status(200).json(updatedUser))
      .catch(err => next(err));
  };

  static deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log(req.params['email']);
    await UserService.deleteUser(req.params['id'])
      .then(message => res.status(200).json(message))
      .catch(err => next(err));
  }
}

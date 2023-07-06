import jsonwebtoken from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';

import { User } from './../models/user.model';

import { CustomError } from '../models/customError.model';

import { JWT_SECRET } from "./../config";

interface DecodedToken {
  _id: string;
}

export default class AuthorizationMiddleware {

  static authorizeMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers['authorization'];

    if (!token) {
      throw new CustomError('No authorization header!', 401);
    }

    jsonwebtoken.verify(token, JWT_SECRET, (err) => {
      if (err) {
        throw new CustomError('No authorization token!', 401);
      }
    });

    const decodedToken = await jwt.verify(token, JWT_SECRET) as DecodedToken;
    const userId = decodedToken._id;

    let user = await User
      .findOne({_id: userId})
      .catch(err => {
        throw new CustomError(err.message, 500);
      });

    if (!user) {
      throw new CustomError('No user found!', 404);
    };

    res.locals.user = user;
    next();
  }
}

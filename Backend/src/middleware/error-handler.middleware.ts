import { Request, Response, NextFunction } from 'express';
import { CustomError } from "./../models/customError.model";

export default function errorHandler(err: CustomError, req: Request, res: Response, next: NextFunction){

  const errStatus = err.status || 500;
  const errMsg = err.message || 'Something went wrong';

  res.status(errStatus).send(errMsg);
}

import express from 'express';

import ValidateMiddleware from './../middleware/validate.middleware';
import AuthorizationMiddleware from './../middleware/authorization-middleware';

import AuthController from './../controllers/auth.controller';

import { uploadMiddleware } from './../middleware/multer.middleware';

export const authRouter = express.Router();

authRouter.post('/login', ValidateMiddleware.validateLogin, AuthController.loginUser)
authRouter.post('/register', AuthorizationMiddleware.authorizeMiddleware, uploadMiddleware, ValidateMiddleware.validateNewUser, AuthController.registerUser);
authRouter.post('/password/change', AuthorizationMiddleware.authorizeMiddleware, ValidateMiddleware.validateChangePassword, AuthController.changePassword);
authRouter.post('/password/forgotten', ValidateMiddleware.validateForgottenPassword, AuthController.sendResetPassEmail);
authRouter.post('/password/reset', ValidateMiddleware.validatePasswordReset, AuthController.resetPassword);

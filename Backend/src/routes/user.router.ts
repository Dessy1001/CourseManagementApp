import express from 'express';

import UserController from '../controllers/user.controller';
import { uploadMiddleware } from '../middleware/multer.middleware';
import AuthorizationMiddleware from '../middleware/authorization-middleware';

export const usersRouter = express.Router();

usersRouter.use(AuthorizationMiddleware.authorizeMiddleware);

usersRouter.get('/', UserController.getUsers);
usersRouter.get('/:id', UserController.getUserById);

usersRouter.post('/:id', uploadMiddleware, UserController.updateUser);

usersRouter.delete('/:id', UserController.deleteUser);
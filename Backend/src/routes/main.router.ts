import express from 'express';

import { authRouter } from './auth.router';
import { coursesRouter } from './course.router';
import { usersRouter } from './user.router';

export const appRouter = express.Router();

appRouter.use('/api/auth', authRouter);
appRouter.use('/api/courses', coursesRouter);
appRouter.use('/api/users', usersRouter);

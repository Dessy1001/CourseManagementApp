import express from 'express';

import ValidateMiddleware from './../middleware/validate.middleware';

import CourseController from './../controllers/course.controller';
import AuthorizationMiddleware from '../middleware/authorization-middleware';

export const coursesRouter = express.Router();

coursesRouter.use(AuthorizationMiddleware.authorizeMiddleware);

coursesRouter.get('/:userId/courses', CourseController.getUsersCourses);
coursesRouter.get('/grade/:moduleId/:userId', CourseController.getModuleGrade)
coursesRouter.get('/:courseId/modules', CourseController.getModules);
coursesRouter.get('/modules/:id', CourseController.getModuleById);
coursesRouter.get('/:courseId/users', CourseController.getCourseUsers);

coursesRouter.get('/:id', CourseController.getCourseById);
coursesRouter.get('/', CourseController.getCourses);

coursesRouter.get('/:moduleId/lectures', CourseController.getLectures);
coursesRouter.get('/lectures/:lectureId', CourseController.getLectureById);

coursesRouter.get('/user-grades', CourseController.getUserGrades);

coursesRouter.post('/create-module', ValidateMiddleware.courseModuleValidator, CourseController.createCourseModule);
coursesRouter.post('/modules/:id', ValidateMiddleware.updateCourseModuleValidator, CourseController.updateCourseModule);

coursesRouter.post('/create-lecture', ValidateMiddleware.courseModuleLectureValidator, CourseController.createCourseModuleLecture);
coursesRouter.post('/lectures/:id', ValidateMiddleware.updateCourseModuleLectureValidator, CourseController.updateCourseModuleLecture);
coursesRouter.post('/:lectureId/add-user-grades',ValidateMiddleware.postLectureGradesValidator, CourseController.addUserGrades);

coursesRouter.post('/', ValidateMiddleware.courseValidator, CourseController.createCourse);
coursesRouter.post('/:id', ValidateMiddleware.updateCourseValidator, CourseController.updateCourse);

coursesRouter.delete('/modules/:id', CourseController.deleteModule);
coursesRouter.delete('/lectures/:id', CourseController.deleteLecture);
coursesRouter.delete('/:id', CourseController.deleteCourse);

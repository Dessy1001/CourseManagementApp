import { NextFunction, Request, Response } from 'express';

import CourseService from './../services/course.services';

export default class CourseController {

  // COURSES

  static getCourses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await CourseService.getCourses()
      .then(result => res.status(200).json(result))
      .catch(err => next(err));
  };

  static getUsersCourses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log(req.params);
    await CourseService.getUsersCourses(req.params['userId'])
      .then(result => res.status(200).json(result))
      .catch(err => next(err));
  };

  static getCourseById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await CourseService.getCourseById(req.params['id'])
      .then(result => res.status(200).json(result))
      .catch(err => next(err));
  };

  static getCourseUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await CourseService.getCourseUsers(req.params['courseId'])
      .then(user => res.status(200).json(user))
      .catch(err => next(err));
  }

  static createCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await CourseService.createCourse(req.body)
      .then(result => res.status(200).json(result))
      .catch(err => next(err));
  };

  static updateCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await CourseService.updateCourse(req.params.id, req.body)
      .then(result => res.status(200).json(result))
      .catch(err => next(err));
  };

  static deleteCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await CourseService.deleteCourse(req.params['id'])
      .then(user => res.status(200).json(user))
      .catch(err => next(err));
  };

  // MODULES

  static getModules = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await CourseService.getModules(req.params['courseId'])
      .then(result => res.status(200).json(result))
      .catch(err => next(err));
  };

  static getModuleById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await CourseService.getModuleById(req.params['id'])
      .then(result => res.status(200).json(result))
      .catch(err => next(err));
  };

  static getModuleGrade = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await CourseService.getModuleGrade(req.params['moduleId'], req.params['userId'])
      .then(result => res.status(200).json(result))
      .catch(err => next(err));
  };

  static updateCourseModule = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await CourseService.updateCourseModule(req.params.id, req.body.updateModule)
      .then(result => res.status(200).json(result))
      .catch(err => next(err));
  };

  static deleteModule = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await CourseService.deleteModule(req.params['id'])
      .then(user => res.status(200).json(user))
      .catch(err => next(err));
  }

  static createCourseModule = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await CourseService.createCourseModule(req.body.courseId, req.body.module)
      .then(user => res.status(200).json(user))
      .catch(err => next(err));
  };

  // LECTURES

  static getLectures = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await CourseService.getLectures(req.params['moduleId'])
      .then(result => res.status(200).json(result))
      .catch(err => next(err));
  };

  static getLectureById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await CourseService.getLectureById(req.params['lectureId'])
      .then(result => res.status(200).json(result))
      .catch(err => next(err));
  };

  static createCourseModuleLecture = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await CourseService.createCourseModuleLecture(req.body.moduleId, req.body.lecture)
      .then(user => res.status(200).json(user))
      .catch(err => next(err));
  }

  static updateCourseModuleLecture = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const lectureId = req.params.id;
    const updatedLecture = req.body.updateLecture;

    await CourseService.updateCourseModuleLecture(lectureId, updatedLecture)
      .then(result => res.status(200).json(result))
      .catch(err => next(err));
  };

  static deleteLecture = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await CourseService.deleteLecture(req.params['id'])
      .then(user => res.status(200).json(user))
      .catch(err => next(err));
  }

  // GRADES

  static getUserGrades = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await CourseService.getUserGrades()
      .then(result => res.status(200).json(result))
      .catch(err => next(err));
  };

  static addUserGrades = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await CourseService.addUserGrades(req.body)
      .then(user => res.status(200).json(user))
      .catch(err => next(err));
  }
}

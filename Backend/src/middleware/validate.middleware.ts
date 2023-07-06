import { body, validationResult, param } from "express-validator";
import { Request, Response, NextFunction } from "express";

export default class ValidateMiddleware {

	static validateNewUser = [
		body('email').exists().isString().isEmail().withMessage('Invalid email'),
		body('password').exists().isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
		body('firstName').exists().isString().notEmpty().withMessage('First name is required'),
		body('lastName').exists().isString().notEmpty().withMessage('Last name is required'),
		body('age').exists().isInt().withMessage('Invalid age'),
		body('city').exists().isString().notEmpty().withMessage('City is required'),
		body('country').exists().isString().notEmpty().withMessage('Country is required'),
		body('phone').exists().isString().notEmpty().withMessage('Phone is required'),
		body('repository').exists().isString().notEmpty().withMessage('Repository is required'),
		body('languages').optional().isArray({ min: 1 }).withMessage('At least one language is required'),
		body('languages.*.language').exists().isString().notEmpty().withMessage('Language name is required'),
		body('languages.*.level').exists().isString().notEmpty().withMessage('Language level is required'),
		body('picture').optional().notEmpty().withMessage('Picture is required'),
		body('resume').optional().notEmpty().withMessage('Resume is required'),
		body('courseIds.*').optional().isMongoId().withMessage('Invalid course ID'),
		(req: Request, res: Response, next: NextFunction) => {
			if (Object.keys(req.body).length > 13) {
				return res.status(400).json({ errors: [{ msg: 'Invalid request body' }] });
			}

			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
			next();
		}
	];

	static validateLogin = [
		body('email').exists().isString().isEmail().withMessage('Invalid email'),
		body('password').exists().isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
		(req: Request, res: Response, next: NextFunction) => {
			if (Object.keys(req.body).length > 2) {
				return res.status(400).json({ errors: [{ msg: 'Invalid request body' }] });
			}

			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
			next();
		}
	];

	static validateChangePassword = [
		body('currentPassword').exists().isString().isLength({ min: 6 }).withMessage('Old Password must be at least 6 characters long'),
		body('newPassword').exists().isString().isLength({ min: 6 }).withMessage('New Password must be at least 6 characters long'),
		body('token').exists().isString().withMessage('Token is required'),
		(req: Request, res: Response, next: NextFunction) => {
			if (Object.keys(req.body).length > 3) {
				return res.status(400).json({ errors: [{ msg: 'Invalid request body' }] });
			}

			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
			next();
		}
	];

	static courseValidator = [
		body('title').notEmpty().withMessage('Title is required'),
		body('description').notEmpty().withMessage('Description is required'),
		body('modules.*').isMongoId().withMessage('Invalid module ID'),
		body('startDate').isISO8601().withMessage('Invalid start date'),
		body('endDate').isISO8601().withMessage('Invalid end date'),
		body('userIds.*').isMongoId().withMessage('Invalid user ID'),
		(req: Request, res: Response, next: NextFunction) => {
			if (Object.keys(req.body).length > 6) {
				return res.status(400).json({ errors: [{ msg: 'Invalid request body' }] });
			}

			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
			next();
		}
	];

	static courseModuleValidator = [
		body('courseId').exists().isString().notEmpty().withMessage('Course ID is required'),
		body('module.title').exists().isString().notEmpty().withMessage('Title is required'),
		body('module.description').exists().isString().notEmpty().withMessage('Description is required'),
		body('module.lectures.*').isMongoId().withMessage('Invalid lecture ID'),
		body('module.startDate').isISO8601().withMessage('Invalid start date'),
		body('module.endDate').isISO8601().withMessage('Invalid end date'),
		(req: Request, res: Response, next: NextFunction) => {
			if (Object.keys(req.body).length > 6) {
				return res.status(400).json({ errors: [{ msg: 'Invalid request body' }] });
			}

			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
			next();
		}
	];

	static courseModuleLectureValidator = [
		body('moduleId').exists().isString().notEmpty().withMessage('Module ID is required'),
		body('lecture.title').exists().isString().notEmpty().withMessage('Title is required'),
		body('lecture.date').isISO8601().withMessage('Invalid date'),
		body('lecture.userGrades.*').isMongoId().withMessage('Invalid user grade ID'),
		(req: Request, res: Response, next: NextFunction) => {
			if (Object.keys(req.body).length > 4) {
				return res.status(400).json({ errors: [{ msg: 'Invalid request body' }] });
			}

			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
			next();
		}
	];

	static userGradeValidator = [
		body('lectureId').exists().isString().notEmpty().withMessage('Lecture ID is required'),
		body('userGrade.userId').isMongoId().withMessage('Invalid user ID'),
		body('userGrade.grade').isNumeric().withMessage('Grade must be a number'),
		(req: Request, res: Response, next: NextFunction) => {
			if (Object.keys(req.body).length > 3) {
				return res.status(400).json({ errors: [{ msg: 'Invalid request body' }] });
			}

			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
			next();
		}
	];

	static validateForgottenPassword = [
		body('email').exists().isString().isEmail().withMessage('Invalid email'),
		(req: Request, res: Response, next: NextFunction) => {

			if (Object.keys(req.body).length > 1) {
				return res.status(400).json({ errors: [{ msg: 'Invalid request body' }] });
			}

			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
			next();
		}
	];

	static validatePasswordReset = [
		body('newPassword').exists().isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
		(req: Request, res: Response, next: NextFunction) => {
			if (Object.keys(req.body).length > 2) {
				return res.status(400).json({ errors: [{ msg: 'Invalid request body' }] });
			}

			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
			next();
		}
	];

	static updateUserValidator = [
		body('role').optional().isInt().withMessage('Invalid role value'),
		body('email').optional().isString().isEmail().withMessage('Invalid email'),
		body('password').optional().isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
		body('firstName').optional().isString().notEmpty().withMessage('First name is required'),
		body('lastName').optional().isString().notEmpty().withMessage('Last name is required'),
		body('age').optional().isInt().withMessage('Invalid age'),
		body('city').optional().isString().notEmpty().withMessage('City is required'),
		body('country').optional().isString().notEmpty().withMessage('Country is required'),
		body('phone').optional().isString().notEmpty().withMessage('Phone is required'),
		body('repository').optional().isString().notEmpty().withMessage('Repository is required'),
		body('languages.*').optional().isString().notEmpty().withMessage('Language name is required'),
		body('languages.*.level').optional().notEmpty().withMessage('Language level is required'),
		body('picture').optional().notEmpty().withMessage('Picture is required'),
		body('resume').optional().notEmpty().withMessage('Resume is required'),
		body('courseIds.*').optional().isMongoId().withMessage('Invalid course ID'),
	];

	static updateCourseValidator = [
		param('id').exists().isMongoId().withMessage('Invalid course ID'),
		body('title').optional().notEmpty().withMessage('Title is required'),
		body('description').optional().notEmpty().withMessage('Description is required'),
		body('modules.*').optional().isMongoId().withMessage('Invalid module ID'),
		body('startDate').optional().isISO8601().withMessage('Invalid start date'),
		body('endDate').optional().isISO8601().withMessage('Invalid end date'),
		body('userIds.*').optional().isMongoId().withMessage('Invalid user ID'),
	];

	static updateCourseModuleValidator = [
		param('id').exists().isMongoId().withMessage('Invalid course module ID'),
		body('title').optional().notEmpty().withMessage('Title is required'),
		body('description').optional().notEmpty().withMessage('Description is required'),
		body('lectures.*').optional().isMongoId().withMessage('Invalid lecture ID'),
		body('startDate').optional().isISO8601().withMessage('Invalid start date'),
		body('endDate').optional().isISO8601().withMessage('Invalid end date'),
	];

	static updateCourseModuleLectureValidator = [
		param('id').exists().isMongoId().withMessage('Invalid course module lecture ID'),
		body('title').optional().notEmpty().withMessage('Title is required'),
		body('date').optional().isISO8601().withMessage('Invalid date'),
		body('userGrades.*.userId').optional().isMongoId().withMessage('Invalid user ID'),
		body('userGrades.*.grade').optional().isNumeric().withMessage('Grade must be a number'),
	];

	static postLectureGradesValidator = [
		body('lectureId').exists().isString().notEmpty().withMessage('Lecture ID is required'),
		body('userGrades').isArray().notEmpty().withMessage('User grades array is required'),
		body('userGrades.*.userId').exists().isString().notEmpty().withMessage('User ID is required'),
		body('userGrades.*.grade').exists().withMessage('Grade is required'),
	];
}

import { Request, Response, NextFunction } from 'express';

import fs from 'fs';

import multer from 'multer';

import { File } from '../models/file.model';
import { CustomError } from '../models/customError.model';

let storage = multer.diskStorage({
  destination: 'storage',
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

let upload = multer({ storage: storage }).fields([
  { name: 'picture', maxCount: 1 },
  { name: 'resume', maxCount: 1 },
]);

export const uploadMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  upload(req, res, async (err) => {
    if (!err) {
      if (req.files && 'picture' in req.files && 'resume' in req.files) {
        const pictureFiles = req.files['picture'] as Express.Multer.File[];
        const resumeFiles = req.files['resume'] as Express.Multer.File[];

        const pictureFile = pictureFiles[0];
        const resumeFile = resumeFiles[0];

        const pictureBuffer = fs.readFileSync(pictureFile.path);
        const resumeBuffer = fs.readFileSync(resumeFile.path);

        res.locals.files = { pictureBuffer, resumeBuffer };
      } else {
      }
    } else {
      throw new CustomError('Unable to upload files!', 404);
    }

    next();
  });
};

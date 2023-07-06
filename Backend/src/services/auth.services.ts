import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

import { User, IUser } from './../models/user.model';

import { JWT_SECRET } from './../config';

import { Token } from './../models/token.model';
import { sendEmail } from './../utils/sendEmail.util';
import { CustomError } from '../models/customError.model';
import { Course } from '../models/course.model';

interface UserLogin {
  email: string;
  password: string;
}

interface LoginResponse {
  user: IUser;
  token: string;
}

interface Params {
  [key: string]: string;
}

export default class AuthService {

  static async loginUser(body: UserLogin): Promise<LoginResponse> {
    const user = await User
      .findOne({ email: body.email })
      .catch(err => {
        throw new CustomError(err.message, 500);
      });

    if (!user) {
      throw new CustomError('No user found!', 404);
    }

    const validPassword = await bcryptjs.compare(body.password, user.password);

    if (!validPassword) {
      throw new CustomError('Invalid password', 400);
    }

    const token = jwt.sign({ _id: user._id }, JWT_SECRET);

    let result = {
      'user': user,
      'token': token
    }
    return result;
  }

  static async registerUser(body: IUser, files: any): Promise<IUser> {

    const user = new User(body);
    user.picture = files.pictureBuffer;
    user.resume = files.resumeBuffer;

    for (let courseId of user.courseIds) {
      let course = await Course
        .findById(courseId)
        .catch(error => {
          throw new CustomError(error.message, error.status);
        });

      if (!course) {
        throw new CustomError('No course found!', 400);
      }

      course.userIds.push(user.id);

      course
        .save()
        .catch(error => {
          throw new CustomError(error.message, error.status);
        });
    }

    await user
      .save()
      .catch(error => {
        throw new CustomError(error.message, error.status);
      });

    const text = `Username: ${body.email}\nPassword:${body.password}`;
    await sendEmail(user.email, 'Your CodeAcademy account.', text)
      .catch(error => {
        throw new CustomError(error.message, error.status);
      });

    return user;
  }

  static async changePassword(body: Params, userData: IUser): Promise<string> {
    const { currentPassword, newPassword } = body;
    const isPasswordValid = await bcryptjs.compare(currentPassword, userData.password);

    if (!isPasswordValid) {
      throw new CustomError('Current password is incorrect', 400);
    };

    let user = new User(userData);

    user.password = newPassword;

    await user
      .save()
      .catch((error) => {
        throw new CustomError(error.message, error.message);
      });

    return 'Password changed successfully!';
  }

  static async resetPassword(body: Params): Promise<string> {

    const token = await Token
      .findOne({ token: body.token })
      .catch(err => {
        throw new CustomError(err.message, 500);
      });

    if (!token) {
      throw new CustomError('No token found!', 404);
    }

    let user = await User
      .findOne({ _id: token.userId })
      .catch(err => {
        console.log('No User');
        throw new CustomError(err.message, 500);
      });

    if (!user) {
      throw new CustomError('No user found!', 404);
    }

    user.password = body.newPassword;

    await user
      .save()
      .catch((error) => {
        console.log("error!")
        throw new CustomError(error.message, error.message);
      });

    await Token
      .deleteOne({ _id: token._id })
      .catch((error) => {
        console.log("error!!")
        throw new CustomError(error.message, error.message);
      });

    return "Password reset sucessfully.";
  }

  static async sendResetPassEmail(body: Params): Promise<string> {

    if (!body.email && Object.keys(body).length > 1) {
      throw new CustomError('E-mail is required!', 400);
    }

    const user = await User
      .findOne({ email: body.email })
      .catch(err => {
        throw new CustomError(err.message, 500);
      });

    if (!user) {
      throw new CustomError('No user found!', 404);
    }

    let token = await Token
      .findOne({ email: body.email })
      .catch(err => {
        throw new CustomError(err.message, 500);
      });

    if (!token) {
      token = new Token({
        userId: user._id,
        token: jwt.sign({ _id: user._id }, JWT_SECRET)
      })
    }

    await token
      .save()
      .catch((error) => {
        throw new CustomError(error.message, error.message);
      });

    const link = `localhost:4200/reset?token=${token.token}`;
    await sendEmail(user.email, 'Password reset', link);

    return 'Password reset link sent to your email account!';
  }
}

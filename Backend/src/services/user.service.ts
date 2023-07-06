import { User, IUser } from './../models/user.model';
import { CustomError } from './../models/customError.model';
import { Course } from './../models/course.model';
import { Types } from 'mongoose';

interface UpdateData {
  firstName?: string;
  lastName?: string;
  age?: number;
  city?: string;
  country?: string;
  phone?: string;
  repository?: string;
  courseIds?: Types.ObjectId[];
}

export default class UserService {

  static async getUsers(): Promise<IUser[]> {
    const users = await User
      .find()
      .catch(err => {
        throw new CustomError(err.message, 500);
      });

    if (!users) {
      throw new CustomError('No users found!', 404);
    }

    return users;
  }

  static async getUserById(userId: string): Promise<IUser> {
    const user = await User
      .findById(userId)
      .catch(error => {
        throw new CustomError(error.message, error.status);
      });

    if (!user) {
      throw new CustomError('User not found!', 400);
    }
    return user;
  }

  static async updateUser(userId: string, updateData: UpdateData, files: any): Promise<IUser> {
    const { courseIds, ...updatedFields } = updateData;

    await User
      .updateOne({ _id: userId }, { $set: updatedFields })
      .catch((error) => {
        throw new CustomError(error.message, error.status);
      });

    let user = await User
      .findById(userId)
      .catch(error => {
        throw new CustomError(error.message, error.status);
      });

    if (!user) {
      throw new CustomError('No such user found', 400);
    }

    if (files) {
      user.picture = files.pictureBuffer;
      user.resume = files.resumeBuffer;
    }

    if (updateData.courseIds) {
      let courseIds = updateData.courseIds.toString().split(',').map(newCourseId => new Types.ObjectId(newCourseId));;

      console.log(courseIds);
      for (let newCourseId of courseIds) {
        if (!user.courseIds.includes(newCourseId)) {
          let course = await Course.findById(newCourseId).catch((error) => {
            throw new CustomError(error.message, error.status);
          });
    
          if (!course) {
            throw new CustomError('No such course found', 400);
          }
          user.courseIds.push(newCourseId);
          course.userIds.push(user.id);
    
          await course.save().catch((error) => {
            throw new CustomError(error.message, error.status);
          });
        }
      }
    }

    user
      .save()
      .catch(error => {
        throw new CustomError(error.message, error.status);
      });

    return user;
  }

  static async deleteUser(params: string): Promise<string> {
    await User
      .deleteOne({ _id: params })
      .catch(error => {
        throw new CustomError(error.message, error.status);
      });

    return 'User deleted!';
  }
}


import { User, IUser } from '../models/user.model';
import { Course, ICourse } from './../models/course.model';
import { IUserGrade, UserGrade } from './../models/user-grade.model';
import { CustomError } from './../models/customError.model';
import { CourseModule, ICourseModule } from './../models/course-module.model';
import { CourseModuleLecture, ICourseModuleLecture } from './../models/course-module-lecture.model';
import { Types } from 'mongoose';

interface UserGrade {
  userId: any;
  grade: any;
}

interface AddUserGradesBody {
  lectureId: any;
  userGrades: UserGrade[];
}

export default class CourseService {

  //COURSES

  static async getCourses(): Promise<ICourse[]> {
    const courses = await Course.find()
      .catch(error => {
        throw new CustomError(error.message, error.status);
      });

    return courses;
  }

  static async getUsersCourses(userId: string): Promise<Types.ObjectId[]> {
    const user = await User
      .findById(userId)
      .populate({
        path: 'courseIds',
        model: 'Course' // Replace 'Course' with the actual model name
      })
      .catch(error => {
        throw new CustomError(error.message, error.status);
      });

    if (!user) {
      throw new CustomError('No User Found!', 400);
    }

    return user.courseIds;
  }

  static async getCourseById(courseId: string): Promise<ICourse> {
    console.log(courseId);
    const course = await Course
      .findById(courseId)
      .catch(error => {
        throw new CustomError(error.message, error.status);
      });

    if (!course) {
      throw new CustomError('No course Found!', 400);
    }

    return course;
  }

  static async getCourseUsers(courseId: string): Promise<Types.ObjectId[]> {
    const course = await Course
      .findById(courseId)
      .populate('userIds')
      .catch(error => {
        throw new CustomError(error.message, error.status);
      });

    if (!course) {
      throw new CustomError('No such course found', 400);
    }

    return course.userIds;
  }

  static async createCourse(body: ICourse): Promise<ICourse> {
    const course = new Course(body);
    
    for (let userId of course.userIds) {
      let user = await User
        .findById(userId)
        .catch(error => {
          throw new CustomError(error.message, error.status);
        });

      if (!user) {
        throw new CustomError('No user with this Id', 400);
      }
      user.courseIds.push(course._id);

      user
        .save()
        .catch(error => {
          throw new CustomError(error.message, error.status);
        });
    }

    await course
      .save()
      .catch(error => {
        throw new CustomError(error.message, error.status);
      });

    return course;
  }

  static async deleteCourse(params: string): Promise<string> {
    const courseToDelete = await Course
      .findById(params)
      .catch(error => {
        throw new CustomError(error.message, error.status);
      });

    if (!courseToDelete) {
      throw new CustomError('No such course found!', 400);
    }
    const moduleIdsToDelete = courseToDelete?.modules;

    if (moduleIdsToDelete) {
      for (let module of moduleIdsToDelete) {
        let currentModule = await CourseModule
          .findOne({ '_id': module })
          .catch(error => {
            throw new CustomError(error.message, error.status);
          });

        if (currentModule) {
          for (let lecture of currentModule?.lectures) {
            await CourseModuleLecture
              .deleteOne({ '_id': lecture })
              .catch(error => {
                throw new CustomError(error.message, error.status);
              });
          }
        }

        await CourseModule
          .deleteOne({ '_id': currentModule })
          .catch(error => {
            throw new CustomError(error.message, error.status);
          });
      }
    }

    for (let userId of courseToDelete.userIds) {
      await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { courseIds: params } },
        { new: true }
      )
        .exec()
        .then((updatedUser) => {
          if (updatedUser) {
            console.log('User updated!');
          } else {
            throw new CustomError('User not found again', 400);
          }
        })
        .catch((error) => {
          throw new CustomError(error.message, error.status);
        });
    }

    await Course
      .deleteOne({ _id: params })
      .catch(error => {
        throw new CustomError(error.message, error.status);
      });

    return 'Course deleted!';
  }

  static async updateCourse(courseId: string, updatedCourse: any): Promise<ICourse> {
    await Course
      .updateOne({ _id: courseId }, { $set: updatedCourse.updateCourse })
      .catch(error => {
        throw new CustomError(error.message, error.status);
      });

    let course = await Course
      .findById(courseId)
      .catch(error => {
        throw new CustomError(error.message, error.status);
      });

    if (!course) {
      throw new CustomError('No such course found', 400);
    }

    for (let newUserId of updatedCourse.userIds) {
      if (!course.userIds.includes(newUserId)) {
        course.userIds.push(newUserId);
        let user = await User
          .findById(newUserId)
          .catch(error => {
            throw new CustomError(error.message, error.status);
          });

        if (!course) {
          throw new CustomError('No such course found', 400);
        }

        user?.courseIds.push(course.id);
        user?.save();
      }
    }

    course
      .save()
      .catch(error => {
        throw new CustomError(error.message, error.status);
      });

    return course;
  }

  //MODULES

  static async getModules(courseId: string): Promise<ICourseModule[]> {
    const course = await Course
      .findById(courseId)
      .populate('modules')
      .catch(error => {
        throw new CustomError(error.message, error.status);
      });

    if (!course) {
      throw new CustomError('No such course found', 400);
    }

    return course.modules;
  }

  static async getModuleById(moduleId: string): Promise<ICourseModule> {
    const module = await CourseModule
      .findById(moduleId)
      .catch(error => {
        throw new CustomError(error.message, error.status);
      });

    if (!module) {
      throw new CustomError('No such module found', 400);
    }

    return module;
  }

  static async getModuleGrade(moduleId: string, userId: string): Promise<number> {
    const module = await CourseModule.findById(moduleId).populate('lectures');

    if (!module) {
      throw new CustomError('No such module found', 400);
    }
    const lectures = module.lectures;
    let sumGrades = 0;
    let totalLectures = 0;

    const targetUserId = new Types.ObjectId(userId);

    lectures.forEach((lecture) => {
      const userGrades = lecture.userGrades;
      const userGrade = userGrades.find((grade) => grade.userId.equals(targetUserId));

      if (userGrade) {
        sumGrades += userGrade.grade;
        totalLectures++;
      }
    });

    const averageGrade = totalLectures > 0 ? sumGrades / totalLectures : 0;

    console.log(averageGrade);
    return averageGrade;
  }

  static async createCourseModule(courseId: string, module: ICourseModule): Promise<ICourseModule> {
    const course = await Course
      .findById(courseId)
      .catch(error => {
        throw new CustomError(error.message, error.status);
      });

    if (!course) {
      throw new CustomError('No such course found', 400);
    }

    const newModule = new CourseModule(module);

    await newModule
      .save()
      .catch(error => {
        throw new CustomError(error.message, error.status);
      });

    course.modules.push(newModule)

    await course
      .save()
      .catch(error => {
        throw new CustomError(error.message, error.status);
      });

    return newModule;
  }

  static async updateCourseModule(moduleId: string, data: any): Promise<ICourseModule> {
    const module = await CourseModule.findById(moduleId)
      .catch(error => {
        throw new CustomError(error.message, error.status);
      });

    if (!module) {
      throw new CustomError('No such module found', 400);
    }

    module.set(data);

    await module.save()
      .catch(error => {
        throw new CustomError(error.message, error.status);
      });

    return module;
  }

  static async deleteModule(params: string): Promise<string> {
    let moduleToDelete = await CourseModule
      .findById(params)
      .catch(error => {
        throw new CustomError(error.message, error.status);
      });

    if (moduleToDelete) {
      for (let lectureToDelete of moduleToDelete?.lectures) {
        await CourseModuleLecture
          .deleteOne({ '_id': lectureToDelete })
          .catch(error => {
            throw new CustomError(error.message, error.status);
          });
      }
    }

    await CourseModule
      .deleteOne({ _id: params })
      .catch(error => {
        throw new CustomError(error.message, error.status);
      });

    return 'Module deleted!';
  }

  //LECTURES

  static async getLectures(moduleId: string): Promise<ICourseModuleLecture[]> {
    const module = await CourseModule
      .findById(moduleId)
      .populate('lectures')
      .catch(error => {
        throw new CustomError(error.message, error.status);
      });

    if (!module) {
      throw new CustomError('No such course found', 400);
    }

    return module.lectures;
  }

  static async getLectureById(lectureId: string): Promise<ICourseModuleLecture> {
    const lecture = await CourseModuleLecture
      .findById(lectureId)
      .catch(error => {
        throw new CustomError(error.message, error.status);
      });

    if (!lecture) {
      throw new CustomError('No such lecture found', 400);
    }

    return lecture;
  }

  static async createCourseModuleLecture(moduleId: string, lecture: ICourseModuleLecture): Promise<ICourseModuleLecture> {
    const cousrseModule = await CourseModule
      .findById(moduleId)
      .catch(error => {
        throw new CustomError(error.message, error.status);
      });

    if (!cousrseModule) {
      throw new CustomError('No such module found', 400);
    }

    const newLecture = new CourseModuleLecture(lecture);

    await newLecture
      .save()
      .catch(error => {
        throw new CustomError(error.message, error.status);
      });

    cousrseModule.lectures.push(newLecture)

    await cousrseModule
      .save()
      .catch(error => {
        throw new CustomError(error.message, error.status);
      });

    return newLecture;
  }

  static async updateCourseModuleLecture(lectureId: string, updatedData: any): Promise<ICourseModuleLecture> {
    const lecture = await CourseModuleLecture
      .findByIdAndUpdate(lectureId, updatedData, { new: true })
      .catch(error => {
        throw new CustomError(error.message, error.status);
      });

    if (!lecture) {
      throw new CustomError('No such lecture found', 400);
    }

    return lecture;
  }

  static async deleteLecture(params: string): Promise<string> {
    await CourseModuleLecture
      .deleteOne({ _id: params })
      .catch(error => {
        throw new CustomError(error.message, error.status);
      });

    return 'Lecture deleted!';
  }

  //USER GRADES

  static async getUserGrades(): Promise<IUserGrade[]> {
    const userGrades = await UserGrade
      .find()
      .catch(error => {
        throw new CustomError(error.message, error.status);
      });

    return userGrades;
  }

  static async addUserGrades(body: AddUserGradesBody): Promise<IUserGrade[]> {
    const lecture = await CourseModuleLecture
      .findById(body.lectureId)
      .catch(error => {
        throw new CustomError(error.message, error.status);
      });

    if (!lecture) {
      throw new CustomError('No such lecture found', 400);
    }

    lecture.userGrades = body.userGrades;

    await lecture
      .save()
      .catch(error => {
        throw new CustomError(error.message, error.status);
      });

    return lecture.userGrades;
  }
}

import mongoose, { Schema, Types } from 'mongoose';
import { ICourseModuleLecture } from './course-module-lecture.model';

interface ICourseModule {
  title: string;
  description: string;
  lectures: ICourseModuleLecture[];
  startDate: Date;
  endDate: Date;
}

const CourseModuleSchema = new Schema<ICourseModule>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  lectures: [
    {
      type: Schema.Types.ObjectId,
      ref: 'CourseModuleLecture',
    },
  ],
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

CourseModuleSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
});

const CourseModule = mongoose.model<ICourseModule>('CourseModule', CourseModuleSchema);
type UserDoc = ReturnType<(typeof CourseModule)['hydrate']>;

export { CourseModule, UserDoc, ICourseModule };
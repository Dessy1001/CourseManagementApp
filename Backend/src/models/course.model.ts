import mongoose, { Schema, Types } from 'mongoose';
import { ICourseModule } from './course-module.model';

interface ICourse {
    id: string;
    title: string;
    description: string;
    modules: ICourseModule[];
    startDate: Date;
    endDate: Date;
    userIds: Types.ObjectId[];
}

const CourseSchema = new Schema<ICourse>({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    modules: [
        {
            type: Schema.Types.ObjectId,
            ref: 'CourseModule',
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
    userIds: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
});

CourseSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
});

const Course = mongoose.model<ICourse>('Course', CourseSchema);
type CourseDoc = ReturnType<(typeof Course)['hydrate']>;

export { Course, CourseDoc, ICourse };
import { ICourseModule } from "./course.module.model";

export interface ICourse {
    id?: string;
    title: string;
    description: string;
    modules: ICourseModule[];
    startDate: Date;
    endDate: Date;
    userIds: string[];
}